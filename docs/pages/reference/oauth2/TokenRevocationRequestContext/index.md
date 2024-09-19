---
title: "TokenRevocationRequestContext"
---

# `TokenRevocationRequestContext`

Extends [`OAuth2RequestContext`](/reference/oauth2/OAuth2RequestContext).

Represents an OAuth 2.0 token revocation request context. On initialization:

- Sets `client_id` parameter
- Sets `token` parameter
- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(clientId: string, token: string): this;
```

### Parameters

- `clientId`
- `token`: Either an access or refresh token

## Methods

- [`setTokenTypeHint()`](/reference/oauth2/OAuth2RequestContext/setTokenTypeHint)

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
