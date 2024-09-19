---
title: "addToDate()"
---

# `addToDate()`

Creates a new `Date` by adding the provided time-span to the one provided. Supports negative time spans.

## Definition

```ts
//$ TimeSpan=/reference/main/TimeSpan
function addToDate(date: Date, timeSpan: $$TimeSpan): Date;
```

### Parameters

- `date`
- `timeSpan`

## Example

```ts
import { addToDate, TimeSpan } from "oslo";

const tomorrow = addToDate(new Date(), new TimeSpan(1, "d"));
```
