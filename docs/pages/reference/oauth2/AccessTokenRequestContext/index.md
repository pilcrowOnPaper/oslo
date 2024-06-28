---
title: "AccessTokenRequestContext"
---

# `AccessTokenRequestContext`

Extends [`OAuth2RequestContext`](/reference/oauth2/OAuth2RequestContext).

Represents an OAuth 2.0 access token request context. On initialization:

- Sets `client_id` parameter
- Sets `grant_type` parameter to `authorization_code`
- Sets `code` parameter
- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(clientId: string, authorizationCode: string): this;
```

### Parameters

- `clientId`
- `authorizationCode`

## Methods

- [`setCodeVerifier()`](/reference/oauth2/AccessTokenRequestContext/authenticateWithHTTPBasicAuth)
- [`setRedirectURI()`](/reference/oauth2/AccessTokenRequestContext/authenticateWithHTTPBasicAuth)

### `OAuth2RequestContext`

- [`authenticateWithHTTPBasicAuth()`](/reference/oauth2/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`authenticateWithRequestBody()`](/reference/oauth2/OAuth2RequestContext/authenticateWithRequestBody)
- [`toFetchRequest()`](/reference/oauth2/OAuth2RequestContext/toFetchRequest)

## Properties

### `OAuth2RequestContext`

```ts
interface Properties {
	clientId: string;
	headers: Headers;
	body: URLSearchParams;
}
```

- `clientId`
- `headers`
- `body`
