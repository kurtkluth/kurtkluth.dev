---
title: SQLCLR MCP .NET Tools
description: Explore the SQL Server MCP tool groups and sample prompts for catalog review, bounded querying, and database architecture.
---

SQLCLR MCP .NET exposes tools through an MCP client. The client chooses tools
from your request; you can also name a tool explicitly.

| Task | Tools |
|---|---|
| Find databases and tables | `list_databases`, `list_tables`, `describe_table`, `get_database_schema` |
| Inspect relationships and access paths | `list_foreign_keys`, `list_indexes`, `list_constraints`, `list_statistics` |
| Inspect other catalog objects | `list_views`, `list_triggers`, `list_procedures`, `list_functions`, `list_synonyms`, `list_types`, `list_sequences`, `list_partitions`, `list_extended_properties`, `list_schemas`, `list_permissions` |
| Query and inspect plans | `run_query`, `explain_query` |
| Review a database model | `review_database_schema`, `profile_table_data`, `analyze_entity_pair` |

All tools accept an optional `database` argument to target another database on
the configured SQL Server instance. Large schema dumps or object definitions
can fill the client context, so start with narrower catalog tools when possible.

## Try these prompts

> List tables in the `Sales` schema, then describe `Sales.SalesOrderHeader`.

> Call `review_database_schema` for `AdventureWorks` and show each finding with
> its catalog evidence.

> Profile `CustomerID` and `AccountNumber` on `Sales.Customer` using a bounded
> sample. Explain which counts are sampled.

> Compare `Production.TransactionHistory` and
> `Production.TransactionHistoryArchive` as entity concepts. Show declared
> relationships, deterministic findings, and any optional Jev judgments in
> separate sections.

`run_query` returns source rows from a capped SELECT result. `explain_query`
asks SQL Server for an estimated plan without executing the SELECT. The
architect profiling tool returns aggregate counts without source rows.

The [repository README](https://github.com/kurtkluth/sqlclr-mcp-dotnet#tools)
has the full tool reference and parameters. Read
[Architect Analysis](./architect-analysis.md) for the meaning and limits of
the three architect tools.
