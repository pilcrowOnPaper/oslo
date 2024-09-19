---
title: "TokenRevocationClient.createAccessTokenRevocationRequestContext()"
---

# `TokenRevocationClient.createAccessTokenRevocationRequestContext()`

Creates a new [`TokenRevocationRequestContext`](/reference/oauth2/TokenRevocationRequestContext) instance with the client ID and `token_type_hint` set to `access_token`. Use [`TokenRevocationClient.sendTokenRevocationRequest()`](/reference/oauth2/TokenRevocationClient/sendTokenRevocationRequest) to revoke the token.

## Definition

```ts
function createAccessTokenRevocationRequestContext(
	accessToken: string
): TokenRevocationRequestContext;
```

### Parameters

- `accessToken`

## Example

```ts
const context = client.createAccessTokenRevocationRequestContext(accessToken);
const tokens = await client.sendTokenRevocationRequest(context);
```
