# `oslo`

A collection of auth-related utilities, including:

- `oslo/binary`: Utilities for working with byte arrays
- `oslo/cookie`: Cookie parsing and serialization
- `oslo/crypto`: Generate hashes, signatures, and random values
- `oslo/encoding`: Encode base64, base64url, base32, hex
- `oslo/jwt`: Create and verify JWTs
- `oslo/oauth2`: OAuth2 helpers
- `oslo/otp`: HOTP, TOTP
- `oslo/passkey`: Verify Web Authentication API attestations and assertions for passkeys

It's lightweight, runtime-agnostic, and fully typed.

Documentation: https://oslo.js.org

## Installation

```
npm i oslo
pnpm add oslo
yarn add oslo
```

## Node.js

For Node.js 16 & 18, you'll need to polyfill the Web Crypto API. This is not required in Node.js 20 or later.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when running Node.

```
node --experimental-global-webcrypto index.js
```
