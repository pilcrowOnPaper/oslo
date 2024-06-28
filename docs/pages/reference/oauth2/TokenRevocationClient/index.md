---
title: "TokenRevocationClient"
---

# `TokenRevocationClient`

Client for OAuth 2.0 token revocation, as defined in [RFC 7009](https://datatracker.ietf.org/doc/html/rfc7009).

## Constructor

```ts
function constructor(clientId: string, tokenRevocationEndpoint: string): this;
```

### Parameters

- `clientId`
- `tokenRevocationEndpoint`

## Methods

- [`createAccessTokenRevocationRequestContext()`](/reference/oauth2/TokenRevocationClient/createAccessTokenRevocationRequestContext)
- [`createRefreshTokenRevocationRequestContext()`](/reference/oauth2/TokenRevocationClient/createRefreshTokenRevocationRequestContext)
- [`sendTokenRevocationRequest()`](/reference/oauth2/TokenRevocationClient/sendTokenRevocationRequest)

## Properties

```ts
interface Properties {
	clientId: string;
	tokenRevocationEndpoint: string;
}
```

- `clientId`
- `tokenRevocationEndpoint`
