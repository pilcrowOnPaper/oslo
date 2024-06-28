---
title: "HMAC.verify()"
---

# `HMAC.verify()`

Verifies a signature with a public key and returns `true` if the signature is valid. See [`HMAC`](/reference/crypto/HMAC) for an example.

## Definition

```ts
function sign(secretKey: Uint8Array, signature: Uint8Array, data: Uint8Array): Promise<boolean>;
```

### Parameters

- `secretKey`: Secret key in raw format
- `signature`
- `data`: The original signed data
