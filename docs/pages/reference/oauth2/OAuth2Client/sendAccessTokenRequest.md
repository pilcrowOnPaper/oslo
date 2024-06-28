---
title: "OAuth2Client.sendAccessTokenRequest()"
---

# `OAuth2Client.sendAccessTokenRequest()`

Sends a POST request to the token endpoint using the provided [`AccessTokenRequestContext`](/reference/oauth2/AccessTokenRequestContext) and returns the JSON-parsed response body. Use [`OAuth2Client.createAccessTokenRequestContext()`](/reference/oauth2/OAuth2Client/createAccessTokenRequestContext) for creating the context. You can define the response body type with `_TokenResponseBody` type parameter.

This throws a [`OAuth2RequestError`](/reference/oauth2/OAuth2RequestError) on OAuth 2.0 error responses, and `fetch()` error when it fails to connect to the endpoint.

See [`oslo/oauth2`](/reference/oauth2) for a full example.

## Definition

```ts
function sendAccessTokenRequest<_TokenResponseBody extends TokenResponseBody>(
	context: AccessTokenRequestContext
): Promise<_TokenResponseBody>;
```

### Parameters

- `context

### Type parameters

- `_TokenResponseBody`: JSON-parsed success response body from the token endpoint

## Example

```ts
//$ OAuth2RequestError=/reference/oauth2/OAuth2RequestError
//$ TokenResponseBody=/reference/oauth2/TokenResponseBody
import { $$OAuth2RequestError } from "oslo/oauth2";
import type { $$TokenResponseBody } from "oslo/oauth2";

const context = client.createAccessTokenRequestContext(code);

try {
	const tokens = await client.sendAccessTokenRequest<ResponseBody>(context);
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// invalid credentials etc
	}
	// unknown error
}

interface ResponseBody extends TokenResponseBody {
	refresh_token: string;
}
```
