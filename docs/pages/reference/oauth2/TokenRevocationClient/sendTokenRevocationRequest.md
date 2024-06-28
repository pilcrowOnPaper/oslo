---
title: "TokenRevocationClient.revokeAccessToken()"
---

# `TokenRevocationClient.sendTokenRevocationRequest()`

Sends a token revocation request to the revocation endpoint. Succeeds if the token was revoked or if the token was already invalid.

This throws an [`OAuth2RequestError`](/reference/oauth2/OAuth2RequestError) on OAuth 2.0 error responses, [`TokenRevocationRetryError`](/reference/oauth2/TokenRevocationRetryError) if the token wasn't revoked, or one of the `fetch()` error when it fails to send a request.

## Definition

```ts
function sendTokenRevocationRequest(context: TokenRevocationRequestContext): Promise<URL>;
```

### Parameters

- `context`

## Example

```ts
//$ OAuth2RequestError=/reference/oauth2/OAuth2RequestError
//$ TokenRevocationRetryError=/reference/oauth2/TokenRevocationRetryError
import { $$OAuth2RequestError, $$TokenRevocationRetryError } from "oslo/oauth2";

const context = client.createAccessTokenRevocationRequestContext(accessToken);
try {
	const url = client.sendTokenRevocationRequest(context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// invalid credentials etc
	}
	if (e instanceof TokenRevocationRetryError) {
		// retry again
	}
}
```
