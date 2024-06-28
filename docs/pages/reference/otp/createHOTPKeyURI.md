---
title: "createHOTPKeyURI()"
---

# `createHOTPKeyURI()`

Creates a new [key URI](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) for HOTP.

## Definition

```ts
function createHOTPKeyURI(
	issuer: string,
	accountName: string,
	secret: Uint8Array,
	options?: {
		counter?: number;
		digits?: number;
	}
): string;
```

### Parameters

- `issuer`: Your company/website name
- `accountName`: Account identifier (e.g. username)
- `secret`: HOTP secret key
- `options`
  - `counter` (default: `0`): Counter count
  - `digits` (default: `6`): OTP digits

## Example

```ts
import { createHOTPKeyURI } from "oslo/otp";
import { HMAC } from "oslo/crypto";

const secret = await new HMAC("SHA-1").generateKey();

const issuer = "My website";
const accountName = "user@example.com";

const uri = createHOTPKeyURI(issuer, accountName, secret);
```
