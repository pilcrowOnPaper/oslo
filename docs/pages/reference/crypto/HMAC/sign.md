---
title: "HMAC.sign()"
---

# `HMAC.sign()`

Signs data with a private key and returns the signature. See [`HMAC`](/reference/crypto/HMAC) for an example.

## Definition

```ts
function sign(secretKey: Uint8Array, data: Uint8Array): Promise<Uint8Array>;
```

### Parameters

- `secretKey`: Secret key in raw format
- `data`: Data to sign
