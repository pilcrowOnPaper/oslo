---
title: "OAuth2RequestContext.authenticateWithHTTPBasicAuth()"
---

# `OAuth2RequestContext.authenticateWithHTTPBasicAuth()`

Sets the `Authorization` header for HTTP basic auth with the client password.

## Definition

```ts
function authenticateWithHTTPBasicAuth(clientPassword: string): void;
```

### Parameters

- `clientPassword`

## Example

```ts
context.authenticateWithHTTPBasicAuth(clientSecret);
```
