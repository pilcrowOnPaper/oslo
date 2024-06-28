---
title: "OAuth2RequestContext"
---

# `OAuth2RequestContext`

Represents an OAuth 2.0 request context. On initialization:

- Sets `client_id` parameter
- Sets `User-Agent` header to `oslo`
- Sets `Content-Type` header to `application/x-www-form-urlencoded`
- Sets `Accept` header to `application/json`

## Constructor

```ts
function constructor(clientId: string): this;
```

### Parameters

- `clientId`

## Methods

- [`authenticateWithHTTPBasicAuth()`](/reference/oauth2/OAuth2RequestContext/authenticateWithHTTPBasicAuth)
- [`authenticateWithRequestBody()`](/reference/oauth2/OAuth2RequestContext/authenticateWithRequestBody)
- [`toFetchRequest()`](/reference/oauth2/OAuth2RequestContext/toFetchRequest)

## Properties

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
