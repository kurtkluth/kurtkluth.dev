---
title: Security and Data Boundaries
description: SQL Server permissions, query limits, Jev opt-in, and the information SQLCLR MCP .NET + Jev can share with a client or TypeSafe.
---

SQLCLR MCP .NET + Jev runs locally as a stdio MCP server. It connects to SQL Server
using the connection string you configure. Give that connection a login with
only the permissions needed to inspect your database. The code rejects many
write statements, but its keyword filter is not a SQL security boundary;
SQL Server permissions are the effective control.

## What stays local

Catalog reads, deterministic schema findings, and bounded aggregate profiling
run against your SQL Server instance. Jev is disabled by default. Without Jev
enabled and requested for a call, no TypeSafe API request is made.

## What each tool returns

- `run_query` can return source row values to your MCP client. It accepts
  SELECT or WITH...SELECT and caps the returned row count. Treat the client
  conversation as another place where those values may be visible.
- `profile_table_data` returns sampled aggregate counts, not source rows.
- `analyze_entity_pair` returns local evidence and may call Jev when both
  configuration and the request opt in. Its outbound state is limited to
  selected catalog metadata and, if separately requested, aggregate counts.

Do not assume a sampled null or distinct count covers an entire table. Review
selected metadata before enabling external analysis on a sensitive database.

## Jev credentials

Set `Jev__Enabled=true` and supply `TYPESAFE_API_KEY` as a process environment
variable or a .NET User Secret for the server project. The environment takes
precedence. The API key is not read from `appsettings.json`. From the project
root, local development setup is:

```powershell
dotnet user-secrets set TYPESAFE_API_KEY "<your key>" --project sqlclr-mcp-dotnet.csproj
```

User Secrets keep the value out of the repository, but they are not encrypted.
Use a dedicated secret manager for deployment. Never commit the key or put it
in a public issue. See the
[repository configuration guide](https://github.com/kurtkluth/sqlclr-mcp-dotnet#configuration)
for timeouts, retries, and metadata limits.
