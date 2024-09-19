---
title: "AuthorizationURL.setS256CodeChallenge()"
---

# `AuthorizationURL.setS256CodeChallenge()`

Generates a code challenge by hashing the code verifier with SHA-256, and sets the `code_challenge` parameter and the`code_challenge_method` parameter. Use [`generateCodeVerifier()`](/reference/oauth2/generateCodeVerifier) to generate the code verifier.

## Definition

```ts
function setS256CodeChallenge(codeVerifier: string): void;
```

### Parameters

- `codeVerifier`

## Example

```ts
import { $$generateCodeVerifier } from "oslo/oauth2";

const codeVerifier = generateCodeVerifier();
url.setS256CodeChallenge(codeVerifier);
```
