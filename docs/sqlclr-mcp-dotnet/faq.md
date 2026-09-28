---
title: SQLCLR MCP .NET FAQ
description: Common questions about the SQL Server MCP server, database architect preview, local setup, and optional Jev analysis.
---

## Is this a website or a SQL CLR assembly?

Neither. It is a locally launched .NET MCP server that connects to SQL Server.
The name identifies its place in the SQLCLR developer tool family. The
[SQLCLR documentation](../sqlclr/overview.md) covers .NET assemblies that
execute inside SQL Server, which is a separate subject.

## Do I need Jev or a TypeSafe API key?

No. Catalog tools, capped queries, deterministic review, and bounded
profiling work with Jev disabled. Jev is only used when configured and
requested for `analyze_entity_pair`.

## Will it change my schema?

The available architect tools do not apply DDL. The read-only query guard is
defense in depth; use a SQL Server login without write permissions to enforce
the boundary.

## Can it find every duplicate concept or missing relationship?

No. The current entity-pair tool compares tables you select. It does not scan
an entire model for duplicates, and semantic scores are not calibrated for
automatic recommendations. The [architect analysis guide](./architect-analysis.md)
explains the first evaluation.

## Why does the server need an MCP client?

It speaks MCP over standard input and output. A client launches the server,
lists its tools, and presents results in a conversation or other interface.
The project does not ship a separate interactive desktop UI.

## Where do I report a problem?

Use [GitHub Issues](https://github.com/kurtkluth/sqlclr-mcp-dotnet/issues)
for bugs or feature requests. Include the tool name, server version, and a
sanitized example. Do not include credentials or private row values.
