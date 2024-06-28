---
title: "OAuth2Client.createRefreshTokenRequestContext()"
---

# `OAuth2Client.createRefreshTokenRequestContext()`

Creates a new [`RefreshTokenRequestContext`](/reference/oauth2/RefreshTokenRequestContext) instance with the client ID. Use [`OAuth2Client.sendRefreshTokenRequest()`](/reference/oauth2/OAuth2Client/sendRefreshTokenRequest) to validate the authorization code.

## Definition

```ts
function createRefreshTokenRequestContext(refreshToken: string): RefreshTokenRequestContext;
```

### Parameters

- `refreshToken`

## Example

```ts
const context = client.createRefreshTokenRequestContext(code);
const tokens = await client.sendRefreshTokenRequest(context);
```
