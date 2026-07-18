---
title: FAQ
description: Straight answers to the SQLCLR questions I get most. Deprecation rumors, Azure support, performance, languages, and debugging.
---

The questions I actually get, with the answers I actually give.

## Is SQLCLR deprecated?

No. It is fully supported on SQL Server 2022 and 2025, on Windows, Linux,
and containers. What people half-remember is the 2017 `clr strict security`
change, which tightened the trust model. That is maintenance investment,
not a sunset notice. The things that did get deprecated are the ones SQLCLR
replaced: the `xp_` extended stored procedure API and Code Access Security
as a boundary.

## Does it work on Azure SQL Database?

Azure SQL Managed Instance: yes. `SAFE` assemblies only, deployed from
binary literals since there is no filesystem to load from. Azure SQL
Database single databases and elastic pools: no. If your estate depends on
CLR code, Managed Instance is the managed migration target.

## Which .NET version does it run?

The .NET Framework CLR, version 4, hosted inside the engine (SQL Server
2005 through 2008 R2 hosted CLR 2.0). .NET Core and .NET 5 and later are
not supported and their binaries will not catalog. Compile class libraries
targeting .NET Framework 4.x and stay within the supported base library
set.

## Which languages can I write it in?

Practically: C#, with VB.NET fully supported too. In principle, anything
that emits verifiable .NET Framework IL, but C# is the paved road, and 25
years in, I have yet to regret staying on it.

## Is SQLCLR faster than T-SQL?

Wrong axis. For data access (filtering, joining, aggregating), set-based
T-SQL wins, full stop. For per-row and per-group *compute* (regex,
parsing, custom math), CLR usually wins, often by an order of magnitude.
Two structural bonuses: CLR scalar functions do not force serial plans the
way classic T-SQL scalar UDFs did, and streaming CLR TVFs keep memory flat
where multi-statement TVFs materialize. Then measure, because your data
always has opinions.

## How do I debug SQLCLR code?

Mostly by not debugging it in the engine. Keep the logic in a plain class
library, unit test it outside SQL Server where the tooling is fast, and let
the SQLCLR surface be a thin shim over tested code. Visual Studio can
attach to a dev instance and hit breakpoints in managed code when you truly
need it, never on a shared server. In production, the stack traces inside
error 6522 are your telemetry ([Troubleshooting](./troubleshooting.md)).

## Can CLR code read files or call web services?

`EXTERNAL_ACCESS` makes it possible, on Windows. Whether it is wise is an
architecture question: my rule is bring compute to the data and take I/O
out of the engine. There are legitimate ingest cases. Do them
deliberately, signed and reviewed, and accept that they will never run on
Linux or Managed Instance.

## What happened to extended stored procedures?

The `xp_` ODS API, where I spent 1998 to 2005, is long deprecated, and
SQLCLR is its sanctioned successor. Managed replacements are verifiable,
app-domain isolated, and portable, none of which was true of a C DLL loaded
into the engine's address space. Migrating legacy `xp_` DLLs is one of my
core practice areas; see [sqlclr.com](https://sqlclr.com).

## How do I find out what CLR code is already on an instance?

`sys.assemblies` (filter `is_user_defined = 1`) for what exists and at what
permission set, `sys.assembly_modules` for the T-SQL objects bound into it,
`sys.trusted_assemblies` for the allowlist, and the `sys.dm_clr_*` DMVs for
what is loaded right now. Ready-made queries are in
[Security](./security.md).

## Does running user code in-process put the instance at risk?

Less than the phrase suggests, if the governance is real. The runtime is
hosted; the engine controls its memory, threads, and escalation, and app
domains isolate and contain failures. The genuine risk is organizational:
unreviewed code acquiring trust. Signing, allowlisting, and auditing exist
precisely so that only code someone answered for can load. Governed,
verifiable, maintainable, or not deployed.

## How does SQLCLR compare to R, Python, and Java external scripts?

Different boundary, different job. `sp_execute_external_script` runs out of
process and exchanges data in batches. That is right for statistics and ML over
frames. SQLCLR runs in-process with per-row and per-group granularity at
microsecond latencies. That is right for functions, streaming TVFs, and
aggregates. I have deployed both in the same estate without conflict.

## Didn't STRING_SPLIT and STRING_AGG make SQLCLR obsolete?

They absorbed the easy cases, and good riddance. The best CLR code is the
code you get to delete. What remains is everything T-SQL still cannot do:
regex, median and custom aggregates, stateful parsing, streaming
transforms. When a future version grows one of those natively, retire your
CLR version gladly. Less code inside the engine is always a win, even
mine.
