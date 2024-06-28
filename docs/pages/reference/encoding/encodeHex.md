---
title: "encodeHex()"
---

# `encodeHex()`

Encodes data into lowercase hex based on [RFC 4648 §8](https://datatracker.ietf.org/doc/html/rfc4648#section-8). Use [`decodeHex()`](/reference/encoding/decodeHex) to decode hex strings.

## Definition

```ts
function encodeHex(data: Uint8Array): string;
```

### Parameters

- `data`

## Example

```ts
import { encodeHex } from "oslo/encoding";

const data = new TextEncoder("hello, world");
const encoded = encodeHex(data);
```
