---
title: "isWithinExpirationDate()"
---

# `isWithinExpirationDate()`

Checks if the current time is before the provided expiration `Date`.

## Definition

```ts
//$ TimeSpan=/reference/main/TimeSpan
function isWithinExpirationDate(expirationDate: Date): boolean;
```

### Parameters

- `expirationDate`

## Example

```ts
import { isWithinExpirationDate } from "oslo";

isWithinExpirationDate(tomorrow); // true
isWithinExpirationDate(yesterday); // false
```
