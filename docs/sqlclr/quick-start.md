---
sidebar_position: 2
title: Quick Start
description: Deploy your first CLR function to SQL Server in about ten minutes.
---

# Quick Start

This walkthrough takes you from nothing to a working CLR scalar function.

## 1. Enable CLR integration

```sql
EXEC sp_configure 'show advanced options', 1;
RECONFIGURE;
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

## 2. Write a function

Create a class library targeting .NET Framework (SQL Server hosts the
.NET Framework CLR, not .NET Core/.NET 5+):

```csharp
using Microsoft.SqlServer.Server;
using System.Data.SqlTypes;
using System.Text.RegularExpressions;

public static class StringFunctions
{
    [SqlFunction(IsDeterministic = true, IsPrecise = true)]
    public static SqlBoolean RegexIsMatch(SqlString input, SqlString pattern)
    {
        if (input.IsNull || pattern.IsNull)
        {
            return SqlBoolean.Null;
        }
        return Regex.IsMatch(input.Value, pattern.Value);
    }
}
```

Build it to produce `StringFunctions.dll`.

## 3. Deploy the assembly

```sql
CREATE ASSEMBLY StringFunctions
FROM 'C:\clr\StringFunctions.dll'
WITH PERMISSION_SET = SAFE;
GO

CREATE FUNCTION dbo.RegexIsMatch(@input NVARCHAR(MAX), @pattern NVARCHAR(4000))
RETURNS BIT
AS EXTERNAL NAME StringFunctions.StringFunctions.RegexIsMatch;
GO
```

:::warning
On SQL Server 2017 and later, **CLR strict security** treats even `SAFE`
assemblies as `UNSAFE`, so plain `CREATE ASSEMBLY` will fail unless the
assembly is signed or trusted. See [Security](/docs/sqlclr/security) for the
right way to handle this in production, or use `sp_add_trusted_assembly` for
development.
:::

## 4. Use it

```sql
SELECT dbo.RegexIsMatch(N'kurt@kluthstudios.com',
                        N'^[^@\s]+@[^@\s]+\.[^@\s]+$') AS IsEmail;
-- Returns 1
```

That's the whole loop: write C#, build, `CREATE ASSEMBLY`, bind with
`CREATE FUNCTION ... AS EXTERNAL NAME`, and call it like any other function.

## Next steps

- [Installation](/docs/sqlclr/installation) for environment details
- [Examples](/docs/sqlclr/examples) for procedures, aggregates, and TVFs
- [Security](/docs/sqlclr/security) before you ship anything
