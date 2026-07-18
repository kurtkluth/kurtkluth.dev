---
sidebar_position: 4
title: Configuration
description: Instance and database configuration options that affect CLR integration.
---

# Configuration

## Instance-level options

| Option | Purpose | Recommended |
|---|---|---|
| `clr enabled` | Master switch for CLR integration | `1` where CLR is used |
| `clr strict security` | Treats all assemblies as `UNSAFE` unless signed/trusted (2017+) | Leave `1`; sign assemblies |
| `lightweight pooling` | Fiber mode — **incompatible** with CLR | `0` |

```sql
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

## Database-level options

### TRUSTWORTHY (avoid)

`ALTER DATABASE db SET TRUSTWORTHY ON` lets `EXTERNAL_ACCESS`/`UNSAFE`
assemblies run without signing — and also widens the attack surface of the
entire database. Prefer certificate or asymmetric-key signing; see
[Security](/docs/sqlclr/security).

### Assembly permission sets

Set per assembly at `CREATE ASSEMBLY` time:

- `SAFE` — computation only; no external access. Default and preferred.
- `EXTERNAL_ACCESS` — files, network, registry, environment.
- `UNSAFE` — unrestricted, including unmanaged code.

```sql
ALTER ASSEMBLY MyAssembly WITH PERMISSION_SET = EXTERNAL_ACCESS;
```

## Memory and monitoring

CLR memory comes from the SQL Server process. Keep an eye on it with:

```sql
SELECT type, pages_kb
FROM sys.dm_os_memory_clerks
WHERE type LIKE '%CLR%';

SELECT * FROM sys.dm_clr_appdomains;
SELECT * FROM sys.dm_clr_loaded_assemblies;
```

App domains are created per database/owner pair and unloaded under memory
pressure — a periodic first-call delay after idle periods is normal.
