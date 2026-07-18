---
sidebar_position: 6
title: Examples
description: Copy-ready CLR examples — functions, table-valued functions, aggregates, and procedures.
---

# Examples

All examples target the `SAFE` permission set unless noted.

## Scalar function: Regex replace

```csharp
[SqlFunction(IsDeterministic = true, IsPrecise = true)]
public static SqlString RegexReplace(
    SqlString input, SqlString pattern, SqlString replacement)
{
    if (input.IsNull || pattern.IsNull || replacement.IsNull)
    {
        return SqlString.Null;
    }
    return Regex.Replace(input.Value, pattern.Value, replacement.Value);
}
```

```sql
SELECT dbo.RegexReplace(N'order-00042', N'\D', N'');  -- 00042
```

## Table-valued function: Split with positions

```csharp
[SqlFunction(FillRowMethodName = "FillSplitRow",
    TableDefinition = "Position INT, Item NVARCHAR(4000)")]
public static IEnumerable SplitString(SqlString input, SqlString separator)
{
    if (input.IsNull) yield break;
    var parts = input.Value.Split(
        new[] {separator.Value}, StringSplitOptions.None);
    for (var i = 0; i < parts.Length; i++)
    {
        yield return new KeyValuePair<int, string>(i + 1, parts[i]);
    }
}

public static void FillSplitRow(
    object row, out SqlInt32 position, out SqlString item)
{
    var pair = (KeyValuePair<int, string>)row;
    position = pair.Key;
    item = pair.Value;
}
```

Streaming TVFs (`yield return`) start returning rows immediately instead of
buffering the whole result.

## User-defined aggregate: Median

```csharp
[Serializable]
[SqlUserDefinedAggregate(Format.UserDefined, MaxByteSize = -1)]
public struct Median : IBinarySerialize
{
    private List<double> values;

    public void Init() => values = new List<double>();

    public void Accumulate(SqlDouble value)
    {
        if (!value.IsNull) values.Add(value.Value);
    }

    public void Merge(Median other) => values.AddRange(other.values);

    public SqlDouble Terminate()
    {
        if (values == null || values.Count == 0) return SqlDouble.Null;
        values.Sort();
        int mid = values.Count / 2;
        return values.Count % 2 == 1
            ? values[mid]
            : (values[mid - 1] + values[mid]) / 2.0;
    }

    public void Read(BinaryReader r)
    {
        int count = r.ReadInt32();
        values = new List<double>(count);
        for (int i = 0; i < count; i++) values.Add(r.ReadDouble());
    }

    public void Write(BinaryWriter w)
    {
        w.Write(values.Count);
        foreach (var v in values) w.Write(v);
    }
}
```

```sql
SELECT Department, dbo.Median(Salary) AS MedianSalary
FROM dbo.Employees
GROUP BY Department;
```

## Stored procedure: returning a result set

```csharp
[SqlProcedure]
public static void GetPrimes(SqlInt32 upTo)
{
    var record = new SqlDataRecord(
        new SqlMetaData("Prime", SqlDbType.Int));
    SqlContext.Pipe.SendResultsStart(record);
    for (int n = 2; n <= upTo.Value; n++)
    {
        if (IsPrime(n))
        {
            record.SetInt32(0, n);
            SqlContext.Pipe.SendResultsRow(record);
        }
    }
    SqlContext.Pipe.SendResultsEnd();
}
```

`SqlContext.Pipe` streams rows back to the client as they're produced.
