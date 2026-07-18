---
sidebar_position: 9
title: Troubleshooting
description: The errors you will actually hit with SQLCLR, and how to fix them.
---

# Troubleshooting

## "Execution of user code in the .NET Framework is disabled"

CLR isn't enabled on the instance:

```sql
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

## CREATE ASSEMBLY fails with a strict-security error

> `CREATE or ALTER ASSEMBLY for assembly ... failed because assembly ... is
> not authorized for PERMISSION_SET = SAFE.`

This is **CLR strict security** on SQL Server 2017+. Sign the assembly and
grant `UNSAFE ASSEMBLY` to the key's login, or (dev only) register the hash
with `sp_add_trusted_assembly`. Full walkthrough in
[Security](/docs/sqlclr/security).

## "Assembly ... was not found in the SQL catalog"

Your assembly references another DLL that isn't registered. Dependencies must
be `CREATE ASSEMBLY`'d first (supported .NET Framework libraries are already
available; everything else must be registered explicitly). Keep dependency
graphs shallow — ideally none.

## NullReferenceException from a function

Almost always a raw CLR type used where NULL can arrive. Take `SqlString`,
`SqlInt32`, etc., and check `IsNull` before `.Value` — see
[Core Concepts](/docs/sqlclr/core-concepts).

## First call after idle is slow

The app domain was unloaded (memory pressure or idle timeout) and is being
re-created and JIT-compiled. Confirm in `sys.dm_clr_appdomains`; it's normal.
If it happens constantly, the server is under memory pressure — investigate
with `sys.dm_os_memory_clerks`.

## "Data access is not allowed in this context"

The function performed data access without declaring it:

```csharp
[SqlFunction(DataAccess = DataAccessKind.Read)]
```

Or it attempted data access somewhere it's not allowed (e.g. inside certain
function contexts). Declare honestly and re-deploy.

## Still stuck?

- Check `sys.dm_clr_loaded_assemblies`, `sys.dm_clr_appdomains`, and the
  SQL Server error log — CLR unload/reload events are recorded there.
- The [FAQ](/docs/sqlclr/faq) covers conceptual questions.
- The [general troubleshooting guide](/docs/guides/troubleshooting) covers
  site-wide issues.
