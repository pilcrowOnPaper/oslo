---
title: "TOTPController.verify()"
---

# `TOTPController.verify()`

Verifies the TOTP.

## Definition

```ts
function verify(secretKey: Uint8Array, totp: string): Promise<boolean>;
```

### Parameters

- `secretKey`: HMAC secret key
- `totp`: TOTP
