---
title: "oslo/jwt"
---

# `oslo/jwt`

Provides utilities for working with JWTs. Supports the following algorithms:

- HMAC: `HS256`, `HS384`, `HS512`
- ECDSA: `ES256`, `ES384`, `ES512`
- RSASSA-PKCS1-v1.5: `RS256`, `RS384`, `RS512`
- RSASSA-PSS: `PS256`, `PS384`, `PS512`

## Functions

- [`createJWT()`](/reference/jwt/createJWT)
- [`createJWTHeader()`](/reference/jwt/createJWTHeader)
- [`createJWTPayload()`](/reference/jwt/createJWTPayload)
- [`parseJWT()`](/reference/jwt/parseJWT)
- [`validateJWT()`](/reference/jwt/validateJWT)

## Interfaces

- [`JWT`](/reference/jwt/JWT)
- [`JWTHeader`](/reference/jwt/JWTHeader)
- [`JWTPayload`](/reference/jwt/JWTPayload)

## Types

- [`JWTAlgorithm`](/reference/jwt/JWTAlgorithm)
