---
title: Quick Start
description: From an empty database to your first C# function running inside SQL Server, in five copy-pasteable steps.
---

This is the fastest honest path to a working SQLCLR function on SQL Server
2017 or later. Honest means no `TRUSTWORTHY ON` and no disabling
`clr strict security`. We trust one specific binary, catalog it, bind it,
and call it.

You need an instance where you are `sysadmin` (a dev box or container) and
a Windows machine to compile on; the .NET Framework compiler ships with
the operating system.

## 1. Enable CLR integration

```sql
EXEC sp_configure 'clr enabled', 1;
RECONFIGURE;
```

Takes effect immediately, no restart. Leave `clr strict security` alone;
it defaults to on, and every step below works with it on, which is exactly
how production should run.

## 2. Write the function

Save this as `TitleCase.cs`. Note the `Sql*` types and the null check: the
engine speaks in nullable database types, and your code must too (see
[Core Concepts](./core-concepts.md)).

```csharp
using System.Data.SqlTypes;
using System.Globalization;
using Microsoft.SqlServer.Server;

public static class StringFunctions
{
    [SqlFunction(IsDeterministic = true, IsPrecise = true)]
    public static SqlString TitleCase(SqlString input)
    {
        if (input.IsNull)
        {
            return SqlString.Null;
        }

        TextInfo text = CultureInfo.InvariantCulture.TextInfo;
        return new SqlString(text.ToTitleCase(input.Value.ToLowerInvariant()));
    }
}
```

## 3. Compile it

SQLCLR hosts the .NET Framework CLR (not .NET 6, 8, or 9), so use the
Framework compiler. Every Windows machine already has one:

```bash
C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe /target:library /out:C:\clr\SqlClrDemo.dll TitleCase.cs
```

## 4. Trust it, catalog it, bind it

Under strict security the engine refuses assemblies it has no reason to
trust. The quick answer is the trusted-assembly allowlist: hash the exact
bits, register the hash, then create the assembly and the T-SQL function
that binds to it. The path below is read by the SQL Server service, not
your workstation; on a local dev instance they are the same machine.

```sql
USE master;

DECLARE @bits VARBINARY(MAX) =
    (SELECT BulkColumn
     FROM OPENROWSET(BULK N'C:\clr\SqlClrDemo.dll', SINGLE_BLOB) AS a);

EXEC sys.sp_add_trusted_assembly
    @hash = HASHBYTES('SHA2_512', @bits),
    @description = N'SqlClrDemo quick start';
GO

USE YourDatabase;
GO

CREATE ASSEMBLY SqlClrDemo
FROM N'C:\clr\SqlClrDemo.dll'
WITH PERMISSION_SET = SAFE;
GO

CREATE FUNCTION dbo.TitleCase (@input NVARCHAR(4000))
RETURNS NVARCHAR(4000)
AS EXTERNAL NAME SqlClrDemo.StringFunctions.TitleCase;
```

`EXTERNAL NAME` is `assembly.class.method`; the assembly name is the one
you gave `CREATE ASSEMBLY`, not the file name.

## 5. Call it

```sql
SELECT dbo.TitleCase(N'the engine will run my c# now');
-- The Engine Will Run My C# Now
```

That is the whole loop: compile, trust, catalog, bind, call.

:::warning

The allowlist trusts these exact bits. Rebuild the DLL and the hash
changes, so you register the new hash before redeploying. For production,
signing scales better across rebuilds; see [Security](./security.md).

:::

## Where next

- [Installation](./installation.md) covers requirements, platforms, and what `clr strict security` actually checks.
- [Examples](./examples.md) has regex functions, a streaming TVF, and a median aggregate.
- [Deployment](./deployment.md) turns the same steps into repeatable scripts with embedded binaries.
