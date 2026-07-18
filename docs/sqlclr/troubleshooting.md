---
title: Troubleshooting
description: The SQLCLR errors you will actually hit (6263, 10314, 6218, 6522, and friends), with causes and fixes.
---

Twenty-five years of other people's CLR incidents, condensed. Find your
error in the table, apply the fix, then read the matching section if you
would prefer not to meet it again.

## Quick reference

| Error | Message fragment | Cause | Fix |
|---|---|---|---|
| 6263 | "Execution of user code in the .NET Framework is disabled" | `clr enabled` is 0 | `EXEC sp_configure 'clr enabled', 1; RECONFIGURE;` (see [Installation](./installation.md)) |
| 10327 | "not authorized for PERMISSION_SET" at `CREATE ASSEMBLY` | Strict security refused the load: unsigned and not allowlisted | Sign, or `sp_add_trusted_assembly` (see [Security](./security.md)) |
| 10314 | "trying to load assembly id ... may not be trusted" at runtime | Trust or resource failure loading an already-cataloged assembly | Fix the trust chain; check memory pressure in the error log |
| 6218 | "failed verification" | Unverifiable IL in a `SAFE` or `EXTERNAL_ACCESS` assembly | Remove unsafe constructs; confirm the target framework |
| 6544 | "malformed or not a pure .NET assembly" | Built for .NET Core / .NET 5+, or mixed-mode C++/CLI | Rebuild targeting .NET Framework 4.x, pure managed |
| 6522 | "A .NET Framework error occurred during execution" | Your code threw an exception | Read the inner exception in the message (details below) |

## Error 6522: exceptions in your code

6522 is a wrapper, not a diagnosis. The payload is the real exception, full
stack trace included, and the top three inner exceptions I see are:

- **`SqlNullValueException`.** Code read `.Value` on a null SqlType. Guard
  with `IsNull`, or declare the function `WITH RETURNS NULL ON NULL INPUT`
  so the engine never calls you ([Core Concepts](./core-concepts.md)).
- **`SecurityException` or `HostProtectionException`.** A permission-set
  violation: `SAFE` code attempting file, network, or threading work. The
  runtime sandbox doing its job. Either the operation moves to
  `EXTERNAL_ACCESS` deliberately, or, usually better, the I/O leaves the
  engine entirely.
- **`FileLoadException`.** "The located assembly's manifest definition
  does not match the assembly reference." A version mismatch; next section.

Log the full message somewhere durable. The stack trace in 6522 is your
production telemetry.

## Assembly version mismatches

The engine resolves your dependencies from the catalog, by identity. If
`PayrollClr` was compiled against `SharedLib 2.1.0` but the catalog holds
`SharedLib 2.0.0`, the load fails at call time inside a 6522.

The fix is procedural, not technical: dependencies deploy together, in
dependency order, versions in lockstep. When upgrading, `ALTER ASSEMBLY`
the referenced assembly and the referencing assembly in the same migration
([Deployment](./deployment.md)). If you cannot say which catalog version a
build was compiled against, the hash-verification query in Deployment will
tell you.

## App domain unload and recycle messages

The error log will occasionally show lines like:

```
AppDomain 42 (PayrollDb.dbo[runtime].5) is marked for unload due to memory pressure.
AppDomain 42 (PayrollDb.dbo[runtime].5) unloaded.
```

This is the host being a host, not a malfunction, but it has consequences:

- **In-flight batches can fail** with an error stating the app domain was
  unloaded. Retry logic in callers earns its keep here.
- **The next call pays a cold start** (domain creation plus assembly load).
- **All static state is gone.** If anything behaves differently after these
  messages, some cache was carrying correctness it should not have.

Frequent memory-pressure unloads mean the CLR working set is fighting the
buffer pool: shrink per-call allocations and static caches, and revisit
`max server memory`. Deliberate unloads also follow `ALTER ASSEMBLY`,
`DROP ASSEMBLY`, and security configuration changes. Those are expected, and worth
correlating with deploy timestamps before blaming the engine.

## Permission-set violations

Worth its own note because the symptom misleads: the assembly catalogs
fine, the function creates fine, and the failure arrives at runtime as a
6522-wrapped `SecurityException` on the first call that touches the
forbidden resource. Strict security did not remove the runtime sandbox;
declared permission sets are still enforced during execution. Test every
code path, not just the happy one, before calling a `SAFE` assembly done.

## When you need more eyes

The runtime keeps honest books:

```sql
SELECT * FROM sys.dm_clr_properties;         -- host state and CLR version
SELECT * FROM sys.dm_clr_appdomains;         -- domains, state, cost
SELECT * FROM sys.dm_clr_loaded_assemblies;  -- what is actually in memory
SELECT * FROM sys.dm_clr_tasks;              -- CLR work in flight right now
```

Pair those with `sys.assemblies` and `sys.assembly_modules` for the catalog
view ([Security](./security.md)), and the SQL Server error log for the
unload history. Between the five, there is very little a CLR incident can
hide.
