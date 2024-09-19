---
title: "JWTPayload"
---

# `JWTPayload`

Represents a JWT payload.

## Definition

```ts
interface JWTPayload {
	exp?: number;
	iss?: string;
	aud?: string[] | string;
	jti?: string;
	nbf?: number;
	sub?: string;
	iat?: number;
	[claim: string]: any;
}
```

### Properties

- `exp`
- `iss`
- `aud`
- `jti`
- `nbf`
- `sub`
- `iat`
