---
title: Configuration
description: Permission sets, instance options, trusted assemblies, signing, and the database-scoped details that shape how CLR code runs.
---

CLR configuration is small. It is a handful of instance options, a permission
set per assembly, and one trust decision. The skill is knowing what each
knob actually governs, because half the folklore about them is wrong.

## Permission sets

Every `CREATE ASSEMBLY` declares one. Declare the least you need: even
though strict security authorizes everything at the `UNSAFE` level, the
declared set is still enforced at runtime and still documents intent.

| Permission set | Allows | My take |
|---|---|---|
| `SAFE` | Computation, plus data access through the context connection | The default and the right answer for almost everything |
| `EXTERNAL_ACCESS` | Files, network, registry, environment via managed APIs | Occasionally justified for ingest; Windows only |
| `UNSAFE` | Unverifiable code, P/Invoke, mutable static state, threads | A last resort, and an automatic architecture-review trigger |

`SAFE` is the only set supported on Linux, in containers, and on Azure SQL
Managed Instance, which makes it a portability argument as well as a
safety one.

## Instance options

| Option | Default | What it governs |
|---|---|---|
| `clr enabled` | 0 | Master switch for executing user CLR code; immediate, no restart |
| `clr strict security` | 1 (SQL Server 2017+) | Authorizes every assembly as `UNSAFE`; requires signing or allowlisting |
| `lightweight pooling` | 0 | Must remain 0; the hosted CLR cannot run in fiber mode |

```sql
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

:::note

`clr enabled` gates *user* assemblies only. The system CLR types
(`hierarchyid`, `geometry`, `geography`) work regardless of the setting.
They are part of the engine, not guests in it.

:::

## Trusted assemblies

The allowlist lives in `master` and is keyed on the SHA-512 hash of an
exact binary. Trust the bits, not the name:

```sql
-- Register (hash is the SHA-512 of the reviewed DLL, 64 bytes)
EXEC sys.sp_add_trusted_assembly
    @hash = 0x8CA0A6F521EF4D3A9BD0C22E7F0A11BC0F334D5E,
    @description = N'PayrollClr 2.4.1, reviewed KK 2026-07-01';

-- Inspect
SELECT hash, description, create_date
FROM sys.trusted_assemblies;

-- Revoke
EXEC sys.sp_drop_trusted_assembly
    @hash = 0x8CA0A6F521EF4D3A9BD0C22E7F0A11BC0F334D5E;
```

Every rebuild produces a new hash. That is the point, but it means
re-registration is part of your deploy pipeline, not a one-time setup.
[Deployment](./deployment.md) shows the scripted version, hash generation
included.

## Signing

The production-grade alternative: sign the DLL with a certificate or
strong-name asymmetric key, import the public half into `master`, create a
login from it, and grant that login `UNSAFE ASSEMBLY`:

```sql
USE master;

CREATE CERTIFICATE ClrSigningCert
FROM EXECUTABLE FILE = N'C:\clr\PayrollClr.dll';

CREATE LOGIN ClrSigningLogin FROM CERTIFICATE ClrSigningCert;
GRANT UNSAFE ASSEMBLY TO ClrSigningLogin;
```

One grant covers every assembly signed with that key, rebuilds included.
The login cannot be used to connect; it exists to hold the permission. The
full walkthrough, including the asymmetric-key variant and the reasons to
prefer each, is in [Security](./security.md).

## Database-scoped considerations

- **Ownership shapes isolation.** App domains are created per database, per
  assembly owner. Keep assemblies `dbo`-owned unless you want deliberate
  isolation; scattered owners mean scattered app domains, each with its
  own load cost and its own recycle behavior.
- **Assemblies are data.** The binary lives in the database
  (`sys.assemblies`), so backups, restores, and availability-group replicas
  carry it automatically. Trust registrations in `master` do not travel;
  script them per instance.
- **`TRUSTWORTHY` is not a configuration option here.** It appears in every
  old forum answer as the quick fix for trust errors. It is a database-wide
  privilege escalation with a side effect of loading your DLL.
  [Security](./security.md) has the autopsy and the grown-up alternatives.
- **Visibility.** Dependency assemblies you catalog only so another
  assembly can reference them can be hidden from direct binding with
  `ALTER ASSEMBLY ... WITH VISIBILITY = OFF`. Nothing should
  `CREATE FUNCTION` against a helper library by accident.

Next: [Core Concepts](./core-concepts.md) for what these settings mean at
runtime, inside the engine.
