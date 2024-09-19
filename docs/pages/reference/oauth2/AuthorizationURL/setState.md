---
title: "AuthorizationURL.setState()"
---

# `AuthorizationURL.setRedirectURI()`

Sets the state to the URL (`state`). Use [`generateState()`](/reference/oauth2/generateState) to generate the state.

## Definition

```ts
function setState(redirectURI: string): void;
```

### Parameters

- `redirectURI`

## Example

```ts
//$ generateState=/
import { $$generateState } from "oslo/oauth2";

const state = generateState();
url.setState(state);
```
