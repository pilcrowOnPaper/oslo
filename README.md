# `oslo`

> This package is _highly_ experimental - use at your own risk

A collection of utilities for auth, including:

- `oslo/cookie`: Cookie parsing and serialization
- `oslo/crypto`: Generate hashes and signatures
- `oslo/encoding`: Encode base64, base64url, base32, hex
- `oslo/jwt`: Create and verify JWTs
- `oslo/oauth2`: OAuth2 helpers
- `oslo/otp`: HOTP, TOTP
- `oslo/password`: Password hashing
- `oslo/random`: Generate cryptographically strong random values
- `oslo/request`: CSRF protection
- `oslo/session`: Session management
- `oslo/webauthn`: Verify Web Authentication API attestations and assertions

Aside from `oslo/password`, every module works in any environment, including Node.js, Cloudflare Workers, Deno, and Bun.

Documentation: https://oslo.js.org

## Installation

```
npm i oslo
pnpm add oslo
yarn add oslo
```

## Node.js

For Node.js 16 & 18, you need to polyfill the Web Crypto API. This is not required in Node.js 20.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when running Node.

```
node --experimental-global-webcrypto index.js
```
