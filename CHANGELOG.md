# oslo

## 2.0.0-next.0

## Major changes

- Breaking: Update `OAuth2RequestError`
- Breaking: Update `OAuth2Client`
- Breaking: Remove `oslo/password`
- Breaking: Remove `oslo/request`
- Breaking: Update `createJWT()` and `validateJWT()` parameters
- Breaking: Replace `oslo/webauthn` with `oslo/passkey`
- Breaking: Rename `createDate()` to `addToDate()`
- Breaking: Remove `encodeBase32()`, `decodeBase32()`, `encodeBase64()`, `decodeBase64()`, `encodeBase64url()`, and `decodeBase64url()`,
- Breaking: Functions only accept `Uint8Array` instead of `TypedArray | ArrayBuffer`

## Minor changes

- Feat: Add `SigningAlgorithm` interface
- Feat: Add `createJWTHeader()` and `createJWTPayload()`
- Feat: `sha1()`, `sha256()`, `sha384()`, and `sha512()` is synchronous
- Feat: Add `TokenRevocationClient`, `TokenRevocationRetryError`, and `TokenRevocationRequestContext`
- Feat: Add `oslo/binary`
- Feat: Add `OAuth2RequestError`
- Feat: Add `OAuth2RequestContext`, `AccessTokenRequestContext`, `RefreshTokenRequestContext`, and `OAuth2Request`
- Feat: Add `generateRandomBoolean()`
