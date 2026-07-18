---
title: Core Concepts
description: How the hosted CLR actually works inside SQL Server. App domains, memory, threading, assembly loading, and the contract your code signs.
---

You can use SQLCLR for years without knowing any of this. You cannot
operate it well without knowing most of it. This page is the mental model I
wish every team had before their first production deploy.

## A guest under house rules

SQL Server does not simply spin up the CLR in its process and hope. The
engine loads the runtime through the CLR hosting layer and takes over the
resources a runtime normally gets from the operating system:

- **Memory.** CLR allocations are served through SQL Server's memory
  manager, are visible in the memory clerks
  (`sys.dm_os_memory_clerks`), and since SQL Server 2012 are governed by
  `max server memory` like everything else. A leaky cache in your assembly
  is not "just .NET memory"; it is memory the buffer pool wanted.
- **Threads and scheduling.** Managed code runs on SQLOS workers, on the
  engine's schedulers, cooperating with every other task on the box. Code
  that spins, blocks on external resources, or sleeps is holding a worker
  hostage.
- **Escalation.** The host decides what happens when things go wrong.
  Resource pressure or a fatal condition can escalate from aborting your
  thread to unloading your entire app domain. That is deliberate, to protect the
  server.

The practical reading: the engine is the landlord. Your code is a tenant
with a good lease and no equity.

## App domains

The unit of isolation (and of eviction) is the app domain. The engine
creates one per database, per assembly owner, loads your assemblies into
it, and unloads it when it sees fit: memory pressure, `ALTER ASSEMBLY` or
`DROP ASSEMBLY`, security configuration changes.

Two operational consequences:

- **Cold starts.** The first CLR call after an unload pays for domain
  creation and assembly loading. Intermittent slow first calls in the
  morning usually mean unload messages in the error log overnight.
- **Statics do not persist.** Anything cached in static state vanishes on
  unload, silently. Design caches as conveniences, never as correctness.

`sys.dm_clr_appdomains` shows what is loaded right now, with state and
cost.

## Assembly loading

`CREATE ASSEMBLY` copies the binary *into the database*. The bits live in
`sys.assemblies` and `sys.assembly_files`, not on disk. From then on the
file you compiled is irrelevant: backups carry the code, restores and
availability-group replicas rehydrate it, and there is no DLL to go missing
on some node at 2 a.m. One of the feature's genuinely great design
decisions.

Framework assemblies are the exception: those load from the server's .NET
Framework installation, and only a documented, tested subset is supported
(`System`, `System.Data`, `System.Xml`, and friends). Your own dependency
assemblies must each be cataloged with `CREATE ASSEMBLY`, referenced-first,
in dependency order.

## The boundary contract

What in-engine code owes the engine:

- **Verifiable IL** for `SAFE` and `EXTERNAL_ACCESS`. No pointers, no
  unverifiable constructs. The engine checks at `CREATE ASSEMBLY` time.
- **No mutable static state** outside `UNSAFE`. Static `readonly` fields
  are permitted and useful; anything else is a correctness bug waiting for
  an app domain recycle or a concurrent caller.
- **Data access through the context connection.** The caller's own
  session and transaction, no new login, no distributed transaction:

```csharp
using (SqlConnection conn = new SqlConnection("context connection=true"))
{
    conn.Open();
    // runs inside the caller's session and transaction
}
```

- **Honest flags.** `IsDeterministic` and `IsPrecise` gate whether a
  function may feed persisted computed columns and indexed views. Lie and
  you corrupt data politely.
- **Exceptions surface as error 6522** to the T-SQL caller, inner detail
  and stack included. Catch what you can genuinely handle; let real
  failures fail loudly.
- **Cooperation with cancellation.** A killed batch aborts your thread.
  Long-running loops must not swallow thread aborts or wedge inside calls
  the host cannot interrupt.

## SqlTypes and null handling

Parameters and return values cross the boundary as `System.Data.SqlTypes`
structs, types that carry database semantics, including null:

| T-SQL type | SqlType | Notes |
|---|---|---|
| `int`, `bigint` | `SqlInt32`, `SqlInt64` | |
| `nvarchar` | `SqlString` or `SqlChars` | `SqlChars` streams; prefer it for `MAX`-sized values |
| `varbinary` | `SqlBytes` or `SqlBinary` | `SqlBytes` streams |
| `bit` | `SqlBoolean` | |
| `float` | `SqlDouble` | |
| `decimal`, `numeric` | `SqlDecimal` | Engine precision rules, not .NET `decimal` |
| `datetime` | `SqlDateTime` | `datetime2` maps to plain `DateTime` |
| `uniqueidentifier` | `SqlGuid` | |
| `xml` | `SqlXml` | |

Every SqlType has `IsNull` and a `Null` singleton. Reading `.Value` on a
null instance throws `SqlNullValueException`, the single most common cause
of error 6522 I see in code review:

```csharp
[SqlFunction]
public static SqlInt32 SafeLength(SqlString input)
{
    if (input.IsNull)
    {
        return SqlInt32.Null;
    }
    return input.Value.Length;
}
```

When a function should simply return null for null input, say so in T-SQL
with `WITH RETURNS NULL ON NULL INPUT`; the engine skips the call
entirely. Faster, and one less branch to test.

Next: the contract applied in [Examples](./examples.md), and what its
violations look like in [Troubleshooting](./troubleshooting.md).
