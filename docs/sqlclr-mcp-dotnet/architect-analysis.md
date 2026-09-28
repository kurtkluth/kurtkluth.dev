---
title: Database Architect Analysis
description: How SQLCLR MCP .NET + Jev combines catalog evidence, bounded aggregate profiles, and optional Jev judgments without automatic schema changes.
---

The architect tools are designed for review, not automatic schema changes.
They make the distinction between SQL Server facts and semantic interpretation
visible in the result.

## Deterministic review

`review_database_schema` reads a catalog snapshot. It reports missing primary
keys, disabled or untrusted foreign keys, foreign keys without a leading
unfiltered index, and conservative possible missing relationships. It also
derives declared relationship cardinality and optionality from keys and
nullability. Findings carry catalog evidence so you can verify them in SQL
Server. A finding is a review prompt, not proof that a constraint or index
should be added.

## Bounded data quality signals

`profile_table_data` accepts explicit table and column selections. It samples
within configured limits and returns null counts and, for supported types,
distinct counts. It does not return source rows. The sample has no ordering
guarantee, so its counts are not whole-table quality claims.

## Entity-pair analysis with Jev

`analyze_entity_pair` compares two selected tables and always keeps local
findings and declared relationships available. Semantic analysis is a separate
per-call opt-in and requires Jev to be enabled in server configuration. Its
outbound state contains selected names, types, nullability, keys, and
relationships. Optional profiling can add aggregate counts. It does not send
source row values, SQL definitions, connection details, or credentials to Jev.

Jev answers can suggest whether two tables express the same concept, whether
a relationship seems missing, or what entity pattern they resemble. The
answers include a model version and are advisory. If Jev is unavailable, the
local findings remain in the result. The tool does not generate or apply DDL.

## Current evaluation status

An initial evaluation used eight provisionally labeled table pairs from
AdventureWorks and WideWorldImporters. The semantic scores overlapped between
some positive and negative missing-relationship cases, and one negative pair
was repeatedly classified as a duplicate concept. No automatic review
threshold has been selected. Read the
[evaluation report](https://github.com/kurtkluth/sqlclr-mcp-dotnet/blob/main/docs/jev-evaluation-2026-09-28.md)
for the case set and limitations.

The longer-term goal is a database architect that can discover entities,
review normalization, detect duplicate concepts, analyze data quality, and
recommend model improvements. Those workflows need more labeled examples
and evidence rules before they can be treated as reliable outputs.
