---
title: SQLCLR MCP .NET + Jev Quick Start
description: Build the .NET 10 SQL Server MCP server, set a read-only connection, and register it with an MCP client.
---

## Requirements

- The [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0) to build
  from source.
- A reachable SQL Server instance and a login that can read the databases you
  want to inspect. Use a least-privilege login for real data.
- An MCP client that can launch a local stdio server. The examples below use
  Claude Code and Claude Desktop.

Clone or download the
[SQLCLR MCP .NET + Jev repository](https://github.com/kurtkluth/sqlclr-mcp-dotnet).
From its root, build and publish the server to a location outside the source
checkout:

```powershell
dotnet build sqlclr-mcp-dotnet.slnx -c Release
dotnet publish sqlclr-mcp-dotnet.csproj -c Release -o "$env:USERPROFILE\.mcp\sqlclr-mcp-dotnet"
```

Publish the project file explicitly so test projects are not copied into the
server directory. On Windows, the launcher is `sqlclr-mcp-dotnet.exe`.

## Connect SQL Server

Set `SQLCLR_CONNECTION_STRING` in the environment used to launch the MCP
server. For example, with Windows integrated authentication:

```text
Server=localhost;Initial Catalog=AdventureWorks;Integrated Security=True;TrustServerCertificate=True;Encrypt=True
```

The optional `database` argument on a tool can select another database on the
same server. It does not change the server or credentials.

## Register with Claude Code

Adjust the server, database, and executable path for your computer:

```powershell
claude mcp add sqlclr -s user -e 'SQLCLR_CONNECTION_STRING=Server=localhost;Initial Catalog=AdventureWorks;Integrated Security=True;TrustServerCertificate=True;Encrypt=True' -- 'C:\Users\<you>\.mcp\sqlclr-mcp-dotnet\sqlclr-mcp-dotnet.exe'
claude mcp list
```

You can also register the executable in a client's MCP JSON configuration.
The [repository README](https://github.com/kurtkluth/sqlclr-mcp-dotnet#deploy)
includes a Claude Desktop example.

## First questions

Ask your MCP client to list the tables in `AdventureWorks`, describe a table,
then review the schema. To select a specific tool, ask it to call
`review_database_schema` with the database name and an optional schema filter.

Jev is disabled by default. Local catalog review and profiling work without a
TypeSafe account. See [Architect Analysis](./architect-analysis.md) before
enabling semantic judgments, and [Security and Data](./security.md) for what
each tool can reveal.
