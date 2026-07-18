---
sidebar_position: 10
title: FAQ
description: Frequently asked questions about SQL Server CLR integration.
---

# FAQ

### Is SQLCLR still supported by Microsoft?

Yes. CLR integration remains a supported SQL Server feature, including in
current releases. What changed over time is the security posture — "CLR
strict security" (2017+) requires assemblies to be signed or explicitly
trusted.

### Can I use .NET 8 / .NET Core?

No. SQL Server hosts the **.NET Framework** CLR (CLR 4). Assemblies must
target .NET Framework. If your logic needs modern .NET, host it outside the
database (a service, an external script, or an Azure Function) and call it
from your application layer.

### Is CLR faster than T-SQL?

For **set-based data access: no** — T-SQL wins, usually by a lot. For
**row-by-row computation** — string parsing, regex, custom aggregation,
numeric algorithms — CLR is often dramatically faster than the T-SQL
equivalent (scalar UDFs, WHILE loops, cursor logic).

### Does CLR work on Linux SQL Server?

Yes, with limits: SQL Server on Linux supports `SAFE` assemblies.
`EXTERNAL_ACCESS` and `UNSAFE` are restricted compared to Windows.

### Does CLR work in Azure SQL Database?

Azure SQL **Managed Instance** supports CLR. Azure SQL **Database**
(single database / elastic pool) does not.

### Can a bad assembly crash my server?

The hosting model is designed to prevent it: SQL Server controls memory and
threading, and will unload an app domain rather than fail the process for
`SAFE` code. `UNSAFE` assemblies, by definition, can do anything — which is
why they require the highest trust to register.

### Where does my DLL live after deployment?

Inside the database. `CREATE ASSEMBLY` copies the bytes into
`sys.assembly_files`; the file on disk is no longer needed and is not
consulted again.
