---
sidebar_position: 3
title: Installation
description: Requirements and setup for SQL Server CLR integration development.
---

# Installation

## Requirements

- **SQL Server** 2012 or later (2017+ recommended; note the
  [CLR strict security](/docs/sqlclr/security) changes it introduced).
  CLR integration is included in every edition, including Express.
- **.NET Framework SDK / Visual Studio** with the *SQL Server Data Tools*
  (SSDT) workload, or the `Microsoft.SqlServer.Server` reference for plain
  class libraries.
- Permission to run `sp_configure` and `CREATE ASSEMBLY` on the target
  instance (`ALTER SETTINGS` and `CREATE ASSEMBLY` permissions, typically
  sysadmin in development).

## Enable CLR on the instance

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

Verify:

```sql
SELECT name, value_in_use
FROM sys.configurations
WHERE name IN ('clr enabled', 'clr strict security');
```

## Project setup

### Option A — SSDT database project (recommended)

1. Create a **SQL Server Database Project** in Visual Studio.
2. Add a *SQLCLR* item (function, stored procedure, aggregate, or type).
3. Set the target platform to match your SQL Server version.
4. Publish — SSDT generates the `CREATE ASSEMBLY` and wrapper DDL for you.

### Option B — plain class library

1. Create a .NET Framework class library (match the CLR version your
   SQL Server hosts — CLR 4 for SQL Server 2012+).
2. Reference `System.Data` and use the `Microsoft.SqlServer.Server`
   namespace attributes.
3. Deploy by hand with `CREATE ASSEMBLY` as shown in the
   [Quick Start](/docs/sqlclr/quick-start).

:::note
SQL Server hosts the **.NET Framework** runtime. Assemblies targeting
.NET Core / .NET 5+ cannot be loaded by CLR integration.
:::

## Verify the install

```sql
SELECT * FROM sys.assemblies WHERE is_user_defined = 1;
SELECT * FROM sys.assembly_modules;
```

If your assembly and its modules appear, you're ready for the
[Examples](/docs/sqlclr/examples).
