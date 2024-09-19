---
title: "validateJWT()"
---

# `validateJWT()`

Parses a JWT string and validates it, including the signature, expiration, and not-before date. Throws if the JWT is invalid or expired.

## Definition

```ts
//$ JWTAlgorithm=/reference/jwt/JWTAlgorithm
//$ TimeSpan=/reference/main/TimeSpan
//$ JWT=/reference/jwt/JWT
function validateJWT(algorithm: JWTAlgorithm, key: Uint8Array, jwt: string): Promise<$$JWT>;
```

### Parameters

- `algorithm`
- `key`: Secret key for HMAC, and private key for ECDSA and RSA
- `jwt`: JWT string

## Example

```ts
import { validateJWT } from "oslo/jwt";

try {
	const jwt = validateJWT(
		"HS256",
		key,
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiaGVsbG8ifQ.yP03DaEblJkk9mR-Y5L7YCMzJgHL-RDPx90aXz-cuAI"
	);
	const message = jwt.payload.message;
} catch {
	// invalid signature
	// expired token
	// inactive token (`nbf`)
}
```
