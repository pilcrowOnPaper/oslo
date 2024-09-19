---
title: "OAuth2Client.createAuthorizationURL()"
---

# `OAuth2Client.createAuthorizationURL()`

Creates a new [`AuthorizationURL`](/reference/oauth2/AuthorizationURL) instance with the client ID and redirect URI.

## Definition

```ts
function createAuthorizationURL(): AuthorizationURL;
```

## Example

```ts
//$ generateState=/reference/oauth2/generateState
//$ generateCodeVerifier=/reference/oauth2/generateCodeVerifier
import { $$generateState, $$generateCodeVerifier } from "oslo/oauth2";

const state = generateState();
const codeVerifier = generateCodeVerifier();

const url = client.createAuthorizationURL();

url.setState(state);
url.setS256CodeChallenge(codeVerifier);
url.appendScopes("profile", "openid");
```
