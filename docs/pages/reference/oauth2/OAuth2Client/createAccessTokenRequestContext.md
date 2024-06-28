---
title: "OAuth2Client.createAccessTokenRequestContext()"
---

# `OAuth2Client.createAccessTokenRequestContext()`

Creates a new [`AccessTokenRequestContext`](/reference/oauth2/AccessTokenRequestContext) instance with the client ID and redirect URI. Use [`OAuth2Client.sendAccessTokenRequest()`](/reference/oauth2/OAuth2Client/sendAccessTokenRequest) to validate the authorization code.

## Definition

```ts
function createAccessTokenRequestContext(authorizationCode: string): AccessTokenRequestContext;
```

### Parameters

- `authorizationCode`

## Example

```ts
const context = client.createAccessTokenRequestContext(code);
const tokens = await client.sendAccessTokenRequest(context);
```
