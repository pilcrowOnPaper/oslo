---
title: "TokenRevocationClient.createRefreshTokenRevocationRequestContext()"
---

# `TokenRevocationClient.createRefreshTokenRevocationRequestContext()`

Creates a new [`TokenRevocationRequestContext`](/reference/oauth2/TokenRevocationRequestContext) instance with the client ID and `token_type_hint` set to `refresh_token`. Use [`TokenRevocationClient.sendTokenRevocationRequest()`](/reference/oauth2/TokenRevocationClient) to revoke the token.

## Definition

```ts
function createRefreshTokenRevocationRequestContext(
	refreshToken: string
): TokenRevocationRequestContext;
```

### Parameters

- `accessToken`

## Example

```ts
const context = client.createRefreshTokenRevocationRequestContext(refreshToken);
const tokens = await client.sendTokenRevocationRequest(context);
```
