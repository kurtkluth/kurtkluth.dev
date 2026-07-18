---
title: Examples
description: Three complete SQLCLR examples (a regex scalar function, a streaming table-valued function, and a median aggregate) with C#, T-SQL, and performance notes.
---

Three worked examples, in the order I reach for them in real engagements.
Each is complete: C# on one side, T-SQL catalog objects on the other. All
three compile into a single assembly (`csc /target:library` against the
.NET Framework, exactly as in the [Quick Start](./quick-start.md)) and are
cataloged once with `CREATE ASSEMBLY SqlClrExamples ... WITH PERMISSION_SET = SAFE`.
Everything here is `SAFE`, so it runs on Linux and in containers unchanged.

## Example 1: regex scalar function

`LIKE` and `PATINDEX` run out of road quickly. This brings real regular
expressions to the engine:

```csharp
using System.Data.SqlTypes;
using System.Text.RegularExpressions;
using Microsoft.SqlServer.Server;

public static class RegexScalar
{
    [SqlFunction(IsDeterministic = true, IsPrecise = true)]
    public static SqlBoolean IsMatch(SqlString input, SqlString pattern)
    {
        if (input.IsNull || pattern.IsNull) { return SqlBoolean.Null; }
        return Regex.IsMatch(input.Value, pattern.Value, RegexOptions.CultureInvariant);
    }
}
```

```sql
CREATE FUNCTION dbo.RegexIsMatch (@input NVARCHAR(MAX), @pattern NVARCHAR(4000))
RETURNS BIT
AS EXTERNAL NAME SqlClrExamples.RegexScalar.IsMatch;
GO
SELECT dbo.RegexIsMatch(N'LN-482119', N'^[A-Z]{2}-\d{6}$');  -- 1
```

.NET caches recently used patterns (`Regex.CacheSize`, default 15), so a
fixed pattern is not recompiled per row. And unlike a classic T-SQL scalar
UDF, a CLR scalar function does not force a serial plan.

## Example 2: streaming table-valued function

A CLR TVF is an iterator: return an `IEnumerable`, and the engine pulls
rows as you yield them, converting each through a fill-row method, with no
intermediate table and flat memory:

```csharp
using System.Collections;
using System.Data.SqlTypes;
using System.Text.RegularExpressions;
using Microsoft.SqlServer.Server;

public static class RegexTvf
{
    [SqlFunction(FillRowMethodName = "FillMatchRow",
        TableDefinition = "Position INT, MatchText NVARCHAR(4000)")]
    public static IEnumerable Matches(SqlString input, SqlString pattern)
    {
        if (input.IsNull || pattern.IsNull) { yield break; }
        foreach (Match m in Regex.Matches(input.Value, pattern.Value)) { yield return m; }
    }

    public static void FillMatchRow(object row, out SqlInt32 position, out SqlString matchText)
    {
        Match m = (Match)row;
        position = m.Index + 1;   // T-SQL is 1-based; be a good neighbor
        matchText = m.Value;
    }
}
```

```sql
CREATE FUNCTION dbo.RegexMatches (@input NVARCHAR(MAX), @pattern NVARCHAR(4000))
RETURNS TABLE (Position INT, MatchText NVARCHAR(4000))
AS EXTERNAL NAME SqlClrExamples.RegexTvf.Matches;
GO
-- every loan number mentioned anywhere in the notes column
SELECT c.CustomerId, m.Position, m.MatchText
FROM dbo.Customers AS c
CROSS APPLY dbo.RegexMatches(c.Notes, N'[A-Z]{2}-\d{6}') AS m;
```

The `yield return` is the whole trick: materialize a list instead and you
have built a slower multi-statement TVF. (The T-SQL `RETURNS TABLE` clause
is authoritative for the shape; `TableDefinition` is tooling metadata.)

## Example 3: median, a user-defined aggregate

T-SQL still has no `MEDIAN`. A user-defined aggregate runs inside
`GROUP BY` like a native one: the engine calls `Init`, `Accumulate` per
row, `Merge` when it parallelizes, and `Terminate` for the answer. Median
needs every value, so the state serializes via `IBinarySerialize`:

```csharp
using System;
using System.Collections.Generic;
using System.Data.SqlTypes;
using System.IO;
using Microsoft.SqlServer.Server;

[Serializable]
[SqlUserDefinedAggregate(Format.UserDefined, MaxByteSize = -1,
    IsInvariantToNulls = true, IsInvariantToOrder = true)]
public struct Median : IBinarySerialize
{
    private List<double> values;

    public void Init() { values = new List<double>(); }
    public void Accumulate(SqlDouble value) { if (!value.IsNull) { values.Add(value.Value); } }
    public void Merge(Median other) { values.AddRange(other.values); }

    public SqlDouble Terminate()
    {
        if (values == null || values.Count == 0) { return SqlDouble.Null; }
        values.Sort();
        int mid = values.Count / 2;
        return values.Count % 2 == 1
            ? new SqlDouble(values[mid])
            : new SqlDouble((values[mid - 1] + values[mid]) / 2.0);
    }

    public void Read(BinaryReader reader)
    {
        int count = reader.ReadInt32();
        values = new List<double>(count);
        for (int i = 0; i < count; i++) { values.Add(reader.ReadDouble()); }
    }

    public void Write(BinaryWriter writer)
    {
        writer.Write(values.Count);
        foreach (double v in values) { writer.Write(v); }
    }
}
```

```sql
CREATE AGGREGATE dbo.Median (@value FLOAT)
RETURNS FLOAT
EXTERNAL NAME SqlClrExamples.Median;
GO
SELECT Region, dbo.Median(OrderTotal) AS MedianOrder
FROM dbo.Orders
GROUP BY Region;
```

## Performance notes

- **Scalar functions** pay a per-call transition cost. For real string
  work it is repaid many times over; for trivial expressions the built-ins
  win. Measure at your row counts.
- **The TVF streams.** Peak memory stays flat regardless of match count.
- **The median holds each group's values in memory** and serializes them
  between parallel workers. Fine at thousands of rows per group; at tens
  of millions, reconsider; a windowed `PERCENTILE_CONT` may serve better.
