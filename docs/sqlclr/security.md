---
sidebar_position: 7
title: Security
description: Permission sets, CLR strict security, signing, and why to avoid TRUSTWORTHY.
---

# Security

CLR code runs inside your database engine. Treat every assembly like a
privileged deployment, because it is one.

## Permission sets

| Set | Can do | Use for |
|---|---|---|
| `SAFE` | Computation, context connection | Almost everything |
| `EXTERNAL_ACCESS` | Files, network, registry | Integrations that truly need it |
| `UNSAFE` | Anything, incl. unmanaged code | Rare, heavily reviewed cases |

Default to `SAFE`. Escalate only with a specific, documented reason.

## CLR strict security (SQL Server 2017+)

With `clr strict security = 1` (the default), SQL Server ignores the
`SAFE`/`EXTERNAL_ACCESS` distinction at load time and requires **every**
assembly to be trusted as if it were `UNSAFE`. You have three options:

### 1. Certificate / asymmetric key signing (production answer)

```sql
-- In master:
CREATE ASYMMETRIC KEY ClrSigningKey
FROM EXECUTABLE FILE = 'C:\clr\StringFunctions.dll';

CREATE LOGIN ClrSigningLogin FROM ASYMMETRIC KEY ClrSigningKey;
GRANT UNSAFE ASSEMBLY TO ClrSigningLogin;
```

Sign the DLL with a strong-name key at build time, register the key from the
binary, and grant `UNSAFE ASSEMBLY` to the key's login. The database itself
needs no weakening.

### 2. sp_add_trusted_assembly (acceptable for dev)

```sql
DECLARE @hash VARBINARY(64) =
    (SELECT HASHBYTES('SHA2_512', BulkColumn)
     FROM OPENROWSET(BULK 'C:\clr\StringFunctions.dll', SINGLE_BLOB) AS f);
EXEC sys.sp_add_trusted_assembly @hash, N'StringFunctions';
```

Hash-based trust; must be repeated on every rebuild.

### 3. TRUSTWORTHY ON (avoid)

Turning `TRUSTWORTHY` on lets a db_owner escalate toward sysadmin in some
configurations. Don't ship it; don't get used to it in dev either.

## Operational rules

- Review every use of `EXTERNAL_ACCESS`/`UNSAFE` like you'd review a service
  running as the SQL Server service account — because that's what it is.
- Keep CLR source in version control and build deployment DLLs from CI, so
  the bytes in `sys.assembly_files` are traceable to reviewed source.
- Grant `EXECUTE` on the wrapper objects, not `UNSAFE ASSEMBLY`, to callers.
- Audit with `sys.assemblies` (`permission_set_desc`) and
  `sys.trusted_assemblies`.
