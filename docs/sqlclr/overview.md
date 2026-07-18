---
title: SQLCLR Overview
description: What SQLCLR is, what CLR integration gives you inside SQL Server, and when in-engine code has earned its place.
---

Some engineers work near the database. I work inside it.

SQLCLR is SQL Server's CLR integration: the engine hosts the .NET Common
Language Runtime in-process, and compiled .NET code (C#, almost always)
becomes callable from T-SQL like any native object. No service hop, no
dragging rows out to an app tier and back. The code executes where the data
lives, under the engine's supervision, subject to the engine's rules.

I have worked this boundary for 25 years, across three eras: `xp_` DLLs and
the ODS API (1998 to 2005), CLR integration and `PERMISSION_SET` (2005 to 2016),
and CLR strict security on Windows, Linux, and Kubernetes (2017 to today).
These docs are the distillation: how the hosted runtime actually works, how
to run it safely in production, and (just as important) when to leave it
alone.

## What CLR integration gives you

Five object types, each cataloged in the database and invoked from T-SQL:

| Object type | What it is |
|---|---|
| Scalar functions | One value in, one out: regex, parsing, hashing, real algorithms |
| Streaming table-valued functions | A C# `IEnumerable` exposed as a rowset, streamed row by row |
| Stored procedures | Procedural logic and result sets, written in C# instead of T-SQL |
| User-defined aggregates | Custom aggregation that runs native in `GROUP BY`: median, percentiles, and friends |
| User-defined types | New column types with behavior; powerful, and a long-term commitment |

The canonical shape has not changed since 2005:

```sql
CREATE ASSEMBLY MyLibrary
FROM N'C:\clr\MyLibrary.dll'
WITH PERMISSION_SET = SAFE;

CREATE PROCEDURE dbo.DoRealWork
AS EXTERNAL NAME MyLibrary.Procedures.DoRealWork;
```

Everything else in this documentation is detail on doing that safely,
repeatably, and in a way your auditors can live with.

## When SQLCLR earns its place

CLR code belongs in the engine when the work is compute-heavy and
row-by-row, when the alternative is either a tortured T-SQL expression or
shipping millions of rows across the wire to be processed somewhere else:

- Parsing and validation: regex matching, tokenizing, format checking.
- Custom aggregation: median, weighted averages, and anything `GROUP BY`
  should do but T-SQL does not offer.
- Algorithms that are awkward in set-based SQL: state machines, string
  distance, binary decoding.
- Streaming transformation of large inputs through a table-valued function.

## When it does not

Plain data access. If the job is filtering, joining, and aggregating rows
with operators the engine already has, set-based T-SQL wins; it is what
the optimizer understands and what the next DBA can read. A CLR routine
that opens the context connection to run queries it could have been handed
as a rowset is overhead wearing a costume.

:::tip

The test I apply before writing a line of C#: can I say, in one sentence,
what this code computes that the engine cannot? If the sentence starts with
"it selects", stop and write T-SQL.

:::

## The house rules

Code that lives inside the engine must earn its place there: governed,
verifiable, maintainable. Concretely: it declares the least permission it
needs, it is signed or allowlisted so trust is explicit
([Security](./security.md)), it respects the hosted runtime's rules on
memory, threads, and nulls ([Core Concepts](./core-concepts.md)), and it
deploys from scripts anyone can rerun ([Deployment](./deployment.md)).

## Where to go next

- [Quick Start](./quick-start.md) gets a working C# function inside SQL Server in five steps.
- [Installation](./installation.md) covers requirements, platforms, and the trust model since 2017.
- [Configuration](./configuration.md) covers permission sets, `sp_configure` options, trusted assemblies.
- [Examples](./examples.md) has regex functions, a streaming TVF, and a median aggregate, complete.
- [Troubleshooting](./troubleshooting.md) lists the errors you will actually hit, with causes and fixes.
- [FAQ](./faq.md) answers deprecation rumors, Azure support, performance, and the rest.

This hub is the reference; the companion site at
[sqlclr.com](https://sqlclr.com) covers the practice, meaning consulting,
migration work, and the longer story. The
[SQLCLR project page](/projects/sqlclr) has the portfolio view.
