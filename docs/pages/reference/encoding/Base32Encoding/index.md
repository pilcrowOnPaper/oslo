---
title: "Base32Encoding"
---

# `Base32Encoding`

Radix 32 encoding/decoding scheme. Characters are case sensitive. Use [`base32`](/reference/encoding/base32) or [`base32hex`](/reference/encoding/base32hex) for Base 32 encoding based on [RFC 4648](https://rfc-editor.org/rfc/rfc4648.html).

## Constructor

```ts
function constructor(alphabet: string): this;
```

### Parameters

- `alphabet`: A string of 32 characters

## Methods

- [`decode()`](/reference/encoding/Base32Encoding/decode)
- [`encode()`](/reference/encoding/Base32Encoding/encode)

## Example

```ts
import { Base32Encoding } from "oslo/encoding";

const base32 = new Base32Encoding("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");
const encoded = base32.encode(data);
const decoded = base32.decode(encoded);
```
