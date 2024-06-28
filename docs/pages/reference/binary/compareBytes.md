---
title: "compareBytes()"
---

# `compareBytes()`

Compares the value of 2 `Uint8Array` and returns `true` if they match exactly. This is NOT constant time.

## Definition

```ts
function compareBytes(a: Uint8Array, b: Uint8Array): boolean;
```

### Parameters

- `a`
- `b`

## Example

```ts
import { compareBytes } from "oslo/binary";

const a = new Uint8Array([0, 1, 2]);
const b = new Uint8Array([0, 1, 2]);
const equal = compareBytes(a, b);
```
