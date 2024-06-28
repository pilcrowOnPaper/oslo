---
title: "TokenRevocationRequestContext.setTokenTypeHint()"
---

# `TokenRevocationRequestContext.setTokenTypeHint()`

Sets `token_type_hint` parameter.

## Definition

```ts
function setTokenTypeHint(tokenType: "access_token" | "refresh_token"): void;
```

### Parameters

- `tokenType`

## Example

```ts
context.setTokenTypeHint("access_token");
```
