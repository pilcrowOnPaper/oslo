---
title: "OAuth2Client"
---

# `OAuth2Client`

Client for OAuth 2.0 authorization code grant type, as defined in [RFC 6749](https://datatracker.ietf.org/doc/html/rfc6749). See [`oslo/oauth2`](/reference/oauth2) for a full example.

Use with [`TokenRevocationClient`](/reference/oauth2/TokenRevocationClient) to revoke tokens.

## Constructor

```ts
function constructor(
	clientId: string,
	authorizeEndpoint: string,
	tokenEndpoint: string,
	options?: {
		redirectURI?: string;
	}
): this;
```

### Parameters

- `clientId`
- `authorizeEndpoint`
- `tokenEndpoint`
- `options`
  - `redirectURI`

## Methods

- [`createAccessTokenRequestContext()`](/reference/oauth2/OAuth2Client/createAccessTokenRequestContext)
- [`createAuthorizationURL()`](/reference/oauth2/OAuth2Client/createAuthorizationURL)
- [`createRefreshTokenRequestContext()`](/reference/oauth2/OAuth2Client/createRefreshTokenRequestContext)
- [`sendAccessTokenRequest()`](/reference/oauth2/OAuth2Client/sendAccessTokenRequest)
- [`sendRefreshTokenRequest()`](/reference/oauth2/OAuth2Client/sendRefreshTokenRequest)

## Properties

```ts
interface Properties {
	clientId: string;
	authorizeEndpoint: string;
	tokenEndpoint: string;
}
```

- `clientId`
- `authorizeEndpoint`
- `tokenEndpoint`
