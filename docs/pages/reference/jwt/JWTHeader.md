---
title: "JWTHeader"
---

# `JWTHeader`

Represents a JWT header.

## Definition

```ts
//$ JWTAlgorithm=/reference/jwt/JWTAlgorithm
interface JWT {
	typ: "JWT";
	alg: $$JWTAlgorithm;
	[header: string]: any;
}
```

### Properties

- `typ`
- `alg`
