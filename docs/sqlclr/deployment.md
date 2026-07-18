---
sidebar_position: 8
title: Deployment
description: Moving CLR assemblies through dev, test, and production safely.
---

# Deployment

## The deployable unit

A CLR deployment is two things, always versioned together:

1. The **assembly bytes** (`CREATE ASSEMBLY ... FROM 0x...` — hex literal
   deployment needs no file access on the server)
2. The **wrapper DDL** (`CREATE FUNCTION/PROCEDURE/AGGREGATE/TYPE ...
   AS EXTERNAL NAME ...`)

SSDT publish profiles generate both. For script-based pipelines, emit the hex
form so production servers never need the DLL on disk:

```sql
CREATE ASSEMBLY StringFunctions
FROM 0x4D5A90000300000004000000FFFF0000...  -- full assembly bytes
WITH PERMISSION_SET = SAFE;
```

## Upgrading in place

`ALTER ASSEMBLY` swaps bytes without dropping dependent objects, provided
method signatures used by SQL objects are unchanged:

```sql
ALTER ASSEMBLY StringFunctions
FROM 0x4D5A9000...
WITH UNCHECKED DATA;
```

If signatures changed, drop dependent objects, recreate the assembly, then
recreate the wrappers — in one migration script, in one transaction where
possible.

## Environment checklist

- [ ] `clr enabled = 1` on the target instance
- [ ] Signing key/login provisioned (see [Security](/docs/sqlclr/security))
- [ ] Permission set is the minimum required
- [ ] Wrapper DDL matches the assembly version being shipped
- [ ] Rollback script tested (previous assembly bytes retained)
- [ ] Smoke test: call each entry point once post-deploy

## Version drift detection

```sql
SELECT a.name,
       a.clr_name,
       am.assembly_class,
       am.assembly_method
FROM sys.assemblies a
JOIN sys.assembly_modules am ON am.assembly_id = a.assembly_id
WHERE a.is_user_defined = 1;
```

Compare `clr_name` (which embeds the version) across environments as part of
your release verification.
