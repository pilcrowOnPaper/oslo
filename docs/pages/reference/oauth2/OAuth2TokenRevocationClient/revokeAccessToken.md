---
title: "OAuth2TokenRevocationClient.revokeAccessToken()"
---

# `OAuth2TokenRevocationClient.revokeAccessToken()`

Revokes an access token. Will succeed if the token was revoked or if the token was already invalid.

This throws an [`OAuth2RequestError`](/reference/oauth2/OAuth2RequestError) on OAuth 2.0 error responses, [`OAuth2TokenRevocationRetryError`](/reference/oauth2/OAuth2TokenRevocationRetryError) if the token wasn't revoked, or one of the `fetch()` error when it fails to send a request.

## Definition

```ts
function revokeAccessToken(
	accessToken: string,
	options?: {
		credentials?: string;
	}
): Promise<URL>;
```

### Parameters

- `accessToken`
- `options`
  - `credentials`: Client password or secret for authenticating requests

## Example

```ts
//$ OAuth2RequestError=/reference/oauth2/OAuth2RequestError
//$ OAuth2TokenRevocationRetryError=/reference/oauth2/OAuth2TokenRevocationRetryError
import { $$OAuth2RequestError, $$OAuth2TokenRevocationRetryError } from "oslo/oauth2";

try {
	const url = oauth2Client.revokeAccessToken(accessToken, {
		credentials: clientSecret
	});
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// invalid credentials etc
	}
	if (e instanceof OAuth2TokenRevocationRetryError) {
		// retry again
	}
}
```