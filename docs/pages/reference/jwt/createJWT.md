---
title: "createJWT()"
---

# `createJWT()`

Creates a new JWT. The algorithm is based on the header.

## Definition

```ts
//$ JWTHeader=/reference/jwt/JWTHeader
//$ JWTPayload=/reference/jwt/JWTPayload
function createJWT(key: Uint8Array, header: $$JWTHeader, payload: $$JWTPayload): Promise<string>;
```

### Parameters

- `key`: Secret key for HMAC, and private key for ECDSA and RSA
- `header`
- `payload`

## Example

```ts
//$ HMAC=/reference/crypto/HMAC
//$ createJWTHeader=/reference/jwt/createJWTHeader
//$ createJWTPayload=/reference/jwt/createJWTHeader
import { $$HMAC } from "oslo/crypto";
import { createJWT, $$createJWTHeader, $$createJWTPayload } from "oslo/jwt";
import { $$TimeSpan } from "oslo";

const key = await new HMAC("SHA-256").generateKey();

const header = createJWTHeader("HS256");

const basePayload = createJWTPayload({
	expiresIn: new TimeSpan(30, "d"),
	issuer,
	subject,
	audiences,
	includeIssuedTimestamp: true
});

const payload = {
	message: "hello, world",
	...basePayload
};

const jwt = await createJWT(key, header, payload);
```
