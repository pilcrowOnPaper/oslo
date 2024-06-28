---
title: "oslo/oauth2"
---

# `oslo/oauth2`

Provides utilities for working OAuth 2.0 based on [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749), [RFC 7636](https://datatracker.ietf.org/doc/html/rfc7636), and [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009#section-2.2.1). Supports authorization grant type, refresh token, PKCE extension, and token revocation.

## Functions

- [`generateCodeVerifier()`](/reference/oauth2/generateCodeVerifier)
- [`generateState()`](/reference/oauth2/generateState)

## Classes

- [`OAuth2Client`](/reference/oauth2/OAuth2Client)
- [`OAuth2RequestError`](/reference/oauth2/OAuth2RequestError)
- [`TokenRevocationClient`](/reference/oauth2/TokenRevocationClient)
- [`TokenRevocationRetryError`](/reference/oauth2/TokenRevocationRetryError)

## Interfaces

- [`TokenResponseBody`](/reference/oauth2/TokenResponseBody)

## Types

- [`ResponseMode`](/reference/oauth2/ResponseMode)

## Examples

### OAuth 2.0 authorization grant type

```ts
//$ OAuth2Client=/reference/oauth2/OAuth2Client
import { OAuth2Client } from "oslo/oauth2";

const authorizeEndpoint = "https://github.com/login/oauth/authorize";
const tokenEndpoint = "https://github.com/login/oauth/access_token";

const client = new OAuth2Client(clientId, authorizeEndpoint, tokenEndpoint, {
	redirectURI: "http://localhost:3000/login/github/callback"
});
```

#### Create an authorization URL

```ts
//$ generateState=/reference/oauth2/generateState
//$ generateCodeVerifier=/reference/oauth2/generateCodeVerifier
import { $$generateState, $$generateCodeVerifier } from "oslo/oauth2";

const state = generateState();
const codeVerifier = generateCodeVerifier();

const url = client.createAuthorizationURL();
url.setRedirectURI("https://example.com/login/callback");
url.setState(state);
url.appendScopes("email", "openid");
url.setS256CodeChallenge(codeVerifier);
```

#### Validate an authorization code

```ts
//$ OAuth2RequestError=/reference/oauth2/OAuth2RequestError
//$ TokenResponseBody=/reference/oauth2/TokenResponseBody
import { $$OAuth2RequestError } from "oslo/oauth2";
import type { $$TokenResponseBody } from "oslo/oauth2";

if (!storedState || !state || storedState !== state) {
	// error
}

const context = client.createAccessTokenRequestContext(code);
context.authenticateWithHTTPBasicAuth(clientSecret);
context.setRedirectURI("https://example.com/login/callback");
context.setCodeVerifier(codeVerifier);

try {
	const tokens = await client.sendAccessTokenRequest<ResponseBody>(context);
	const accessToken = tokens.access_token;
	const refreshToken = tokens.refresh_token;
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// invalid credentials etc;
	}
	// unknown error
}

interface ResponseBody extends TokenResponseBody {
	refresh_token: string;
}
```

#### Refresh an access token

```ts
//$ OAuth2RequestError=/reference/oauth2/OAuth2RequestError
//$ TokenResponseBody=/reference/oauth2/TokenResponseBody
import { $$OAuth2RequestError } from "oslo/oauth2";
import type { $$TokenResponseBody } from "oslo/oauth2";

const context = client.createRefreshTokenRequestContext(code);
context.authenticateWithHTTPBasicAuth(clientSecret);

try {
	const tokens = await client.sendRefreshTokenRequest<ResponseBody>(context);
	const accessToken = tokens.access_token;
	const refreshToken = tokens.refresh_token;
} catch (e) {
	if (e instanceof OAuth2RequestError) {
		// invalid credentials etc;
	}
	// unknown error
}

interface ResponseBody extends TokenResponseBody {
	refresh_token: string;
}
```

### Token revocation

```ts
//$ TokenRevocationClient=/reference/oauth2/TokenRevocationClient
//$ OAuth2RequestError=/reference/oauth2/OAuth2RequestError
//$ TokenRevocationRetryError=/reference/oauth2/TokenRevocationRetryError
//$ TokenResponseBody=/reference/oauth2/TokenResponseBody
import {
	$$TokenRevocationClient,
	$$OAuth2RequestError,
	$$TokenRevocationRetryError
} from "oslo/oauth2";
import type { $$TokenResponseBody } from "oslo/oauth2";

const client = new TokenRevocationClient(clientId, tokenEndpoint);

const context = client.createAccessTokenRevocationRequestContext(accessToken);
const context = client.createRefreshTokenRevocationRequestContext(refreshToken);
context.authenticateWithHTTPBasicAuth(clientSecret);

try {
	await client.sendTokenRevocationRequest<ResponseBody>(context);
} catch (e) {
	if (e instanceof TokenRevocationRetryError) {
		// retry again
	}
	if (e instanceof OAuth2RequestError) {
		// invalid credentials etc;
	}
	// unknown error
}
```
