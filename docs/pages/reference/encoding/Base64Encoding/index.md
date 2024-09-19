---
title: "Base64Encoding"
---

# `Base64Encoding`

Radix 64 encoding/decoding scheme. Characters are case sensitive. Use [`base64`](/reference/encoding/base64) or [`base64url`](/reference/encoding/base64url) for Base 64 encoding based on [RFC 4648](https://rfc-editor.org/rfc/rfc4648.html).

## Constructor

```ts
function constructor(alphabet: string): this;
```

### Parameters

- `alphabet`: A string of 64 characters

## Methods

- [`decode()`](/reference/encoding/Base64Encoding/decode)
- [`encode()`](/reference/encoding/Base64Encoding/encode)

## Example

```ts
import { Base64Encoding } from "oslo/encoding";

const base64 = new Base64Encoding(
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
);
const encoded = base64.encode(data);
const decoded = base64.decode(encoded);
```
