---
title: Security
description: CLR strict security in depth. Why TRUSTWORTHY is the wrong shortcut, how to sign assemblies properly, and how to audit what is deployed.
---

Security is where SQLCLR reputations are made and lost. The feature is not
dangerous; undisciplined trust decisions are. This page is the discipline.

## CLR strict security, in depth

Before SQL Server 2017, `SAFE` meant something: Code Access Security
constrained what the IL could do, and the engine treated the permission set
as a boundary. Then the .NET team stopped supporting CAS as a security
boundary (determined attackers could break out of it), and SQL Server did
the honest thing. `clr strict security` (on by default since 2017) makes
the engine authorize **every** assembly, whatever its declared set, as if
it were `UNSAFE`.

Loading `UNSAFE` code has always had strict requirements, and now they
apply to everything. One of these must be true:

1. An identity vouches for the code: a login derived from the assembly's
   signing certificate or asymmetric key, holding the `UNSAFE ASSEMBLY`
   permission.
2. The instance explicitly allowlists the binary by its SHA-512 hash.

There is a third, historical path (database `TRUSTWORTHY ON` combined with
the owner's permissions), and it is the subject of the next section.

The declared permission set still gates runtime behavior: `SAFE` code
attempting file I/O still throws. Treat that as a guardrail, not a
boundary. The boundary is your review of what you sign.

## Why `TRUSTWORTHY ON` is the wrong shortcut

:::danger

`ALTER DATABASE ... SET TRUSTWORTHY ON` makes CLR trust errors go away,
which is why every old forum thread suggests it. Do not.

:::

- **It is database-wide.** You wanted to trust one reviewed assembly; you
  elevated everything the database's principals can produce, now and in the
  future.
- **It composes with ownership into escalation.** A `TRUSTWORTHY` database
  owned by `sa` (the default when a sysadmin restores one) lets any
  `db_owner` manufacture a path to sysadmin.
- **It does not even persist honestly.** The flag resets to `OFF` on every
  restore and attach, so teams script it back on automatically, and a
  one-time shortcut quietly becomes standing policy that nobody remembers
  approving.
- **It audits terribly.** A reviewer sees a database-wide waiver where a
  signed artifact should be.

Signing costs perhaps an hour the first time. `TRUSTWORTHY` costs an
architecture review the day someone competent finds it.

## Signing with a certificate

Sign the DLL itself (Authenticode), then teach the instance to recognize
the signature. One-time setup per signing key, per instance:

```bash
# 1. Sign the built DLL with your code-signing certificate
signtool sign /f ClrSigning.pfx /p <password> /fd SHA256 SqlClrExamples.dll
```

```sql
-- 2. Import the certificate's public half into master, straight from the DLL
USE master;

CREATE CERTIFICATE ClrSigningCert
FROM EXECUTABLE FILE = N'C:\clr\SqlClrExamples.dll';

-- 3. Create a login to hold the grant (it cannot be used to connect)
CREATE LOGIN ClrSigningLogin FROM CERTIFICATE ClrSigningCert;
GRANT UNSAFE ASSEMBLY TO ClrSigningLogin;
```

From here, `CREATE ASSEMBLY` succeeds in any database on the instance for
anything signed with that certificate, rebuilds included. Yes, the grant
says `UNSAFE ASSEMBLY` even for `SAFE` assemblies: under strict security,
that is the level at which all trust is expressed.

## Signing with an asymmetric key

The strong-name variant needs no Authenticode tooling, just the .NET SDK:

```bash
sn -k SqlClrKey.snk
csc /target:library /keyfile:SqlClrKey.snk /out:SqlClrExamples.dll *.cs
```

```sql
USE master;

CREATE ASYMMETRIC KEY SqlClrKey
FROM EXECUTABLE FILE = N'C:\clr\SqlClrExamples.dll';

CREATE LOGIN SqlClrKeyLogin FROM ASYMMETRIC KEY SqlClrKey;
GRANT UNSAFE ASSEMBLY TO SqlClrKeyLogin;
```

Same shape, same result. I default to certificates in shops that run a PKI
and asymmetric keys everywhere else.

## Allowlisting with trusted assemblies

`sys.sp_add_trusted_assembly` registers the SHA-512 of an exact binary in
`master`. No keys, no signatures; the instance trusts those bits and only
those bits:

```sql
EXEC sys.sp_add_trusted_assembly
    @hash = 0x8CA0A6F521EF4D3A9BD0C22E7F0A11BC0F334D5E,
    @description = N'SqlClrExamples 2.1.0, reviewed KK 2026-07-15';
```

Every rebuild changes the hash, so registration belongs in the deploy
pipeline. In regulated environments I treat that as a feature: the
allowlist *is* the record of exactly which bits were approved and when.
Remember it is server-scoped; every availability-group replica needs the
same entries, or your first failover is a CLR outage.

## Audit what is deployed

Trust decisions decay unless inspected. Three queries I run on every
engagement:

```sql
-- What CLR code exists, and at what permission level?
SELECT name, permission_set_desc, clr_name, create_date, modify_date
FROM sys.assemblies
WHERE is_user_defined = 1;

-- What T-SQL objects bind into it?
SELECT OBJECT_SCHEMA_NAME(am.object_id) AS schema_name,
       OBJECT_NAME(am.object_id)        AS module_name,
       a.name                           AS assembly_name,
       am.assembly_class, am.assembly_method
FROM sys.assembly_modules AS am
JOIN sys.assemblies       AS a ON a.assembly_id = am.assembly_id
WHERE a.is_user_defined = 1;

-- What has the instance been told to trust?
SELECT hash, description, create_date
FROM sys.trusted_assemblies;
```

Cross-check deployed bits against build artifacts with
`HASHBYTES('SHA2_512', content)` over `sys.assembly_files`; the query
lives in [Deployment](./deployment.md), along with keeping all of this
repeatable instead of archaeological.
