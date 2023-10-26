---
type: "interface"
---

# `JWT`

Represents a JWT.

```ts
interface JWT {
	value: string;
	headers: $$JWTHeader;
	payload: $$JWTPayload;
	algorithm: $$JWTAlgorithm;
	expiresAt: Date | null;
	issuer: string | null;
	subject: string | null;
	audience: string | null;
	notBefore: Date | null;
	issuedAt: Date | null;
	jwtId: string | null;
	parts: [header: string, payload: string, signature: string];
}
```

- `value`: JWT string
- `header`
- `payload`
- `algorithm`
- `expiresAt`: `exp` claim
- `issuer`: `iss` claim
- `subject`: `sub` claim
- `audience`: `aud` claim
- `notBefore`: `nbf` claim
- `issuedAt`: `iat` claim
- `jwtId`: `jti` claim
- `parts`: JWT string separated into 3 parts