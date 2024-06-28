---
title: "AuthorizationURL"
---

# `AuthorizationURL`

Extends `URL`.

Represents an authorization request URL, as defined in [RFC 6749 section 4.1.1](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1).

## Constructor

```ts
function constructor(authorizeEndpoint: string, clientId: string): this;
```

### Parameters

- `authorizeEndpoint`
- `clientId`

## Methods

- [`appendScopes()`](/reference/oauth2/AuthorizationURL/appendScopes)
- [`setPlainCodeChallenge()`](/reference/oauth2/AuthorizationURL/setPlainCodeChallenge)
- [`setRedirectURI()`](/reference/oauth2/AuthorizationURL/setRedirectURI)
- [`setS256CodeChallenge()`](/reference/oauth2/AuthorizationURL/setS256CodeChallenge)
- [`setState()`](/reference/oauth2/AuthorizationURL/setState)