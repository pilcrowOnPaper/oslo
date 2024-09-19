---
title: "TOTPController.generate()"
---

# `TOTPController.generate()`

Generates a new TOTP.

## Definition

```ts
function generate(secretKey: Uint8Array): Promise<string>;
```

### Parameters

- `secretKey`: HMAC SHA-1 secret key
