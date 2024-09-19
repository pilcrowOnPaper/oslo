---
title: "generateHOTP()"
---

# `generateHOTP()`

Generates a new HOTP, as defined in [RFC 4226](https://www.ietf.org/rfc/rfc4226.txt).

## Definition

```ts
function generateHOTP(secretKey: Uint8Array, counter: number, digits?: number): Promise<string>;
```

### Parameters

- `secretKey`: HMAC SHA-1 secret key
- `counter`
- `digits` (default: `6`)

## Example

```ts
import { generateHOTP } from "oslo/otp";
import { HMAC } from "oslo/crypto";

const secret = await new HMAC("SHA-1").generateKey();

let counter = 0;

const otp = await generateHOTP(secret, counter);
```
