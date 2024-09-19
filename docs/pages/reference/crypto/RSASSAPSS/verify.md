---
title: "RSASSAPSS.verify()"
---

# `RSASSAPSS.verify()`

Verifies a signature with a public key and returns `true` if the signature is valid. See [`RSASSAPSS`](/reference/crypto/RSASSAPSS) for an example.

## Definition

```ts
function sign(publicKey: Uint8Array, signature: Uint8Array, data: Uint8Array): Promise<boolean>;
```

### Parameters

- `publicKey`: Public key in SPKI format
- `signature`
- `data`: The original signed data
