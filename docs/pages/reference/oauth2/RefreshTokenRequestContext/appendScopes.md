---
title: "RefreshTokenRequestContext.appendScopes()"
---

# `RefreshTokenRequestContext.appendScopes()`

Adds scopes to the `scope` parameter by appending them to existing ones. 

## Definition

```ts
function appendScopes(...scopes: string[]): void;
```

### Parameters

- `scopes`

## Example

```ts
context.appendScopes("profile", "email");
context.appendScopes("openid");
```
