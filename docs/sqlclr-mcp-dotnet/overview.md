---
title: SQLCLR MCP .NET + Jev Overview
description: A read-only MCP server for SQL Server catalog exploration, deterministic schema review, bounded profiling, and optional Jev entity analysis.
---

SQLCLR MCP .NET + Jev lets an MCP client inspect a SQL Server database through a
locally launched .NET server. It exposes catalog tools, bounded SELECT queries,
estimated plans, and a first set of database architect tools. It is a developer
tool that you run beside your MCP client, not a browser app or a SQL CLR assembly.

The architect workflow has two layers:

1. **SQL Server evidence.** Catalog metadata and bounded aggregate profiling
   support deterministic findings about keys, foreign keys, indexes, and
   possible relationships.
2. **Optional Jev context.** For a selected pair of tables, Jev can judge whether
   names and structure suggest a shared concept or an undeclared relationship.
   These answers are advisory and reported separately from catalog findings.

The current architect tools are `review_database_schema`, `profile_table_data`,
and `analyze_entity_pair`. Broad entity discovery, normalization judgments, and
database-model recommendations are goals, not automatic outputs of this preview.

## What you can do today

- Inspect tables, columns, keys, indexes, views, routines, constraints,
  statistics, permissions, and other SQL Server catalog objects.
- Execute capped read-only SELECT queries and inspect an estimated plan without
  running its query.
- Review missing primary keys, disabled or untrusted foreign keys, foreign keys
  without a leading unfiltered index, and conservative relationship candidates.
- Profile explicitly selected columns with sampled null and distinct counts.
  The profiling tool does not return source rows.
- Compare two tables using local evidence and, if enabled, Jev judgments on
  selected metadata and optional aggregate counts.

Start with the [Quick Start](./quick-start.md), explore the
[tools and examples](./tools.md), then read how
[architect analysis](./architect-analysis.md) separates evidence from advice.
For connection and data-sharing limits, see [Security and Data](./security.md).

The [project page](/projects/sqlclr-mcp-dotnet) has the portfolio view. Source,
releases, and issues live in the
[GitHub repository](https://github.com/kurtkluth/sqlclr-mcp-dotnet).
