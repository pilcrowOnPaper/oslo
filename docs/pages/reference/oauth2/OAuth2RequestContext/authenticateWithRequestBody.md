---
title: "OAuth2RequestContext.authenticateWithRequestBody()"
---

# `OAuth2RequestContext.authenticateWithRequestBody()`

Sets the client secret as `client_secret` in the body.

## Definition

```ts
function authenticateWithRequestBody(clientSecret: string): void;
```

### Parameters

- `clientSecret`

## Example

```ts
context.authenticateWithRequestBody(clientSecret);
```
