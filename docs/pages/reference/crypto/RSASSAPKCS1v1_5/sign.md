---
title: "RSASSAPKCS1v1_5.sign()"
---

# `RSASSAPKCS1v1_5.sign()`

Signs data with a private key and returns the signature. See [`RSASSAPKCS1v1_5`](/reference/crypto/RSASSAPKCS1v1_5) for an example.

## Definition

```ts
function sign(privateKey: Uint8Array, data: Uint8Array): Promise<Uint8Array>;
```

### Parameters

- `privateKey`: Private key in PKCS#8 format
- `data`: Data to sign
