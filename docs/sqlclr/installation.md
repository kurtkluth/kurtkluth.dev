---
title: Installation
description: Requirements, enabling CLR integration, and choosing a trust approach before the first assembly loads.
---

There is nothing to download. CLR integration has shipped inside the
engine since SQL Server 2005. "Installation" here means switching it on,
understanding what a modern instance demands before it will load your code,
and picking the trust approach that fits the environment.

## Requirements

| Requirement | Detail |
|---|---|
| SQL Server | 2005 onward. I recommend 2017 or later; `clr strict security` defines the modern trust model |
| Platform | Windows, Linux, containers. Linux and containers support `SAFE` assemblies only |
| Azure | Managed Instance: yes (`SAFE` only, deployed from binary literals). Azure SQL Database single databases and elastic pools: no |
| .NET | Target the .NET Framework (CLR 4). .NET Core and .NET 5+ binaries will not load |
| Scheduling | `lightweight pooling` must be 0; the hosted CLR does not run in fiber mode |

Since SQL Server 2012 the hosted runtime is CLR 4; SQL Server 2005 through
2008 R2 hosted CLR 2.0. Compile against .NET Framework 4.x; 4.7.2 is a
comfortable target. The compiler and language version matter less than the
IL they emit and the base libraries they reference.

## Enable CLR integration

`clr enabled` is the master switch: instance-wide, immediate, no restart.

```sql
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

Verify both switches while you are there (`clr strict security` is an
advanced option, hence the first two lines):

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;

SELECT name, value_in_use
FROM sys.configurations
WHERE name IN (N'clr enabled', N'clr strict security', N'lightweight pooling');
```

## Understand `clr strict security`

SQL Server 2017 changed the ground rules. Code Access Security, the .NET
mechanism that once made `SAFE` a meaningful sandbox, is no longer
supported as a security boundary, so the engine stopped pretending
otherwise. With `clr strict security` enabled (the default), every assembly
is authorized as if it were `UNSAFE`, whatever its declared permission set.
To load anything at all, one of two things must be true:

1. The assembly is signed with a certificate or asymmetric key whose
   corresponding server login holds the `UNSAFE ASSEMBLY` permission, or
2. The assembly's SHA-512 hash is registered in the instance's
   trusted-assembly allowlist.

The declared `PERMISSION_SET` still matters at runtime (a `SAFE` assembly
attempting file I/O still fails), but it is no longer what convinces the
engine to load you. [Security](./security.md) covers the full model.

:::warning

You can set `clr strict security` to 0 and get 2005-era behavior back. On a
disposable dev instance, fine. On anything that matters, leave it on. The
option exists because the old boundary was found wanting, not because
Microsoft enjoys breaking deployments.

:::

## Dev versus production trust

| Environment | Approach |
|---|---|
| Local dev, throwaway containers | Trusted-assembly allowlist (`sys.sp_add_trusted_assembly`); fast, per-binary, no PKI required |
| CI/CD pipelines | Register the built hash as a pipeline step; the hash doubles as an integrity check |
| Production | Sign assemblies with a certificate or asymmetric key; grant `UNSAFE ASSEMBLY` to the signing identity once |

Both roads are honest. Signing survives rebuilds without re-registration;
the allowlist pins the exact bits you reviewed. What is not on the menu is
`TRUSTWORTHY ON`. [Security](./security.md) explains why at length.

## Platform notes

- **Linux and containers.** Supported since SQL Server 2017, `SAFE` only,
  with no `EXTERNAL_ACCESS` and no `UNSAFE`. Deploy assemblies from binary literals
  rather than file paths so one script runs everywhere
  ([Deployment](./deployment.md)).
- **Azure SQL Managed Instance.** `SAFE` only, binary literals only; there
  is no filesystem to load from.
- **Availability groups.** Assemblies live inside the database and travel
  with it automatically. Trust registrations do not: trusted-assembly
  hashes and signing logins are server-scoped and must exist on every
  replica.

Next: [Configuration](./configuration.md) for the full option and
permission-set reference, or the [Quick Start](./quick-start.md) to get a
function running right now.
