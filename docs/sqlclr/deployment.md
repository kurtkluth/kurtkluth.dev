---
title: Deployment
description: Repeatable SQLCLR deploy scripts, in-place upgrades with ALTER ASSEMBLY, CI/CD, engine upgrades, and Linux/container notes.
---

A SQLCLR deployment you cannot rerun from a script is a liability with a
version number. Everything on this page serves one goal: any engineer, any
environment, same result.

## The deploy script shape

Order matters twice. Building up: assembly first, then the T-SQL modules
that bind to it (and referenced assemblies before the assemblies that
reference them). Tearing down is the exact reverse; the engine refuses to
drop an assembly while modules still bind to it.

```sql
-- Teardown, idempotent ('FS' = CLR scalar function)
IF OBJECT_ID(N'dbo.RegexIsMatch', N'FS') IS NOT NULL
    DROP FUNCTION dbo.RegexIsMatch;
IF EXISTS (SELECT 1 FROM sys.assemblies WHERE name = N'SqlClrExamples')
    DROP ASSEMBLY SqlClrExamples;

-- Build up
CREATE ASSEMBLY SqlClrExamples
FROM 0x4D5A90000300000004000000FFFF0000...   -- full DLL as a binary literal
WITH PERMISSION_SET = SAFE;

CREATE FUNCTION dbo.RegexIsMatch (@input NVARCHAR(MAX), @pattern NVARCHAR(4000))
RETURNS BIT
AS EXTERNAL NAME SqlClrExamples.RegexScalar.IsMatch;
```

## `ALTER ASSEMBLY` for in-place upgrades

Dropping an assembly means dropping every bound object, and its
permissions, and anything scripted against it. When the new build keeps the
same public method signatures, swap the bits in place instead:

```sql
ALTER ASSEMBLY SqlClrExamples
FROM 0x4D5A90000300000004000000FFFF0000...;   -- the new build
```

Rules of the road:

- Methods referenced by cataloged modules must still exist with matching
  signatures; otherwise the statement fails and names the binding it broke.
- If persisted computed columns or indexes depend on the assembly's
  functions, add `WITH UNCHECKED DATA` and schedule a verification pass;
  you are asserting the new code computes the same values as the old.
- Under strict security the *new* bits need trust too. Register the new
  hash before the `ALTER`, or sign; signatures survive rebuilds.
- The app domain recycles on next use. Expect one cold call.

## Binary literals beat file paths

`FROM N'C:\clr\...'` requires the engine's service account to read that
path at deploy time. That is fine on a workstation, impossible on Managed
Instance, awkward in containers, and a silent dependency on a filesystem
being in the right state. Embedding the assembly as hex makes the script
self-contained and source-controllable:

```powershell
$bytes = [System.IO.File]::ReadAllBytes("bin\Release\SqlClrExamples.dll")
$hex   = '0x' + [System.BitConverter]::ToString($bytes).Replace('-', '')
$hash  = (Get-FileHash "bin\Release\SqlClrExamples.dll" -Algorithm SHA512).Hash
# splice $hex and "0x$hash" into the migration script template
```

A 100 KB assembly becomes a 200 KB script. SSMS grumbles; `sqlcmd` does not
care.

## CI/CD

The pipeline shape I deploy everywhere:

1. **Build** deterministically. Pin the compiler and target framework, so
   the hash is reproducible from source.
2. **Generate** the migration script: `sp_add_trusted_assembly` with the
   new hash (skip if signing), `CREATE` or `ALTER ASSEMBLY` with embedded
   bits, then module DDL.
3. **Apply** with `sqlcmd` or your migration runner. The script is plain
   T-SQL, so Flyway and DbUp are perfectly happy.
4. **Verify** that deployed bits match built bits:

```sql
SELECT a.name, HASHBYTES('SHA2_512', af.content) AS deployed_hash
FROM sys.assemblies     AS a
JOIN sys.assembly_files AS af ON af.assembly_id = a.assembly_id
WHERE a.is_user_defined = 1;
```

5. **Smoke-test** one call per module. A single `SELECT dbo.RegexIsMatch(...)`
   in the pipeline has caught more bad deploys than any amount of review.

## Upgrading SQL Server with assemblies in place

Assemblies are database content, so engine upgrades carry them forward;
the IL does not need recompiling. What does need attention:

- **Crossing into 2017 or later:** `clr strict security` turns on, and
  unsigned, unlisted assemblies stop loading. Sign or allowlist *before*
  the upgrade, not during the incident afterward.
- **Ancient estates** (2005 through 2008 R2) hosted CLR 2.0; SQL Server
  2012 onward hosts CLR 4. Compatibility is good, but retest anything that
  touches serialization or culture-sensitive string handling.
- Run the pipeline's smoke tests against the new version before cutover.
  Same tests, new engine.

## Linux, containers, Kubernetes

- **`SAFE` only.** Audit before replatforming:
  `SELECT name, permission_set_desc FROM sys.assemblies WHERE is_user_defined = 1;`
  Anything `EXTERNAL_ACCESS` or `UNSAFE` needs a redesign, not a lift.
- **Deploy from binary literals.** A container filesystem is not a deploy
  target.
- **The assembly travels inside the database**, so pod restarts, failovers,
  and replica seeding need nothing extra. The server-scoped trust
  registrations do: apply trusted-assembly hashes and signing logins to
  every replica and node image, or the first failover becomes a CLR outage
  ([Security](./security.md)).

Signed, audited, Windows plus Linux plus k8s. The same bits everywhere is
the entire appeal.
