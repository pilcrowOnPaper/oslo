---
title: "createTOTPKeyURI()"
---

# `createTOTPKeyURI()`

Creates a new [key URI](https://github.com/google/google-authenticator/wiki/Key-Uri-Format) for TOTP. Only supports HMAC SHA-1.

## Definition

```ts
//$ TimeSpan=/reference/main/TimeSpan
function createTOTPKeyURI(
	issuer: string,
	accountName: string,
	secret: Uint8Array,
	options?: {
		digits?: number;
		period?: $$TimeSpan;
	}
): string;
```

### Parameters

- `issuer`: Your company/website name
- `accountName`: Account identifier (e.g. username)
- `secret`: TOTP secret key
- `options`
  - `digits` (default: `6`): OTP digits
  - `period` (default: `30s`): How long the OTP is valid for at max

## Example

```ts
import { createTOTPKeyURI } from "oslo/otp";
import { HMAC } from "oslo/crypto";

const secret = await new HMAC("SHA-1").generateKey();

const issuer = "My website";
const accountName = "user@example.com";

const uri = createTOTPKeyURI(issuer, accountName, secret);
```
