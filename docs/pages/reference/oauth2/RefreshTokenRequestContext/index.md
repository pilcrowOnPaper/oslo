---
title: "RefreshTokenRequestContext"
---

# `RefreshTokenRequestContext`

Extends [`OAuth2RequestContext`](/reference/oauth2/OAuth2RequestContext).

Represents an OAuth 2.0 refresh token request context. On initialization:

- Sets `client_id` parameter
- Sets `grant_type` parameter to `refresh_token`
- Sets `refresh_token` parameter
- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(clientId: string, refreshToken: string): this;
```

### Parameters

- `clientId`
- `refreshToken`

## Methods

- [`appendScopes()`](/reference/oauth2/RefreshTokenRequestContext/appendScopes)

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
