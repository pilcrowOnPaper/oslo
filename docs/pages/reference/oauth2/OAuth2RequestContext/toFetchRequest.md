---
title: "OAuth2RequestContext.toFetchRequest()"
---

# `OAuth2RequestContext.toFetchRequest()`

Creates a new web API `Request` using the context's headers and body.

## Definition

```ts
function toFetchRequest(method: string, url: string): void;
```

### Parameters

- `method`
- `url`

## Example

```ts
const response = await fetch(context.toFetchRequest("POST", endpoint));
```
