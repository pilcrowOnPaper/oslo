---
title: "createJWTPayload()"
---

# `createJWTPayload()`

Creates a new JWT payload with registered claims.

## Definition

```ts
//$ TimeSpan=/reference/main/TimeSpan
//$ JWTHeader=/reference/jwt/JWTHeader
function createJWTPayload(options?: {
	expiresIn?: $$TimeSpan;
	issuer?: string;
	subject?: string;
	audiences?: string[];
	notBefore?: Date;
	includeIssuedTimestamp?: boolean;
	jwtId?: string;
}): $$JWTHeader;
```

### Parameters

- `options`:
  - `headers`: Custom headers
  - `expiresIn`: How long the JWT is valid for (for `exp` claim)
  - `issuer`: `iss` claim
  - `subject`: `sub` claim
  - `audiences`: `aud` claims
  - `notBefore`: `nbf` claim
  - `includeIssuedTimestamp` (default: `false`): Set to `true` to include `iat` claim
  - `jwtId`: `jti` claim
