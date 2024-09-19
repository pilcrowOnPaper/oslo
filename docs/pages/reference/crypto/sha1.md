---
title: "sha1()"
---

# `sha1()`

Generates a SHA-1 hash. Performance is better or comparable to the Web Crypto API for data < 1000 bytes. Use the Web Crypto API directly (async) or API provided by your runtime if you need better performance.

## Definition

```ts
function sha1(data: Uint8Array): Uint8Array;
```

### Parameters

- `data`

## Example

```ts
import { sha1 } from "oslo/crypto";
import { encodeHex } from "oslo/encoding";

const data = new TextEncoder().encode("hello, world");
const hash = sha1(data);
const hexHash = encodeHex(hash);
```
