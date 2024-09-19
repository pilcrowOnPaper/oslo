---
title: "TokenRevocationRetryError"
---

# `TokenRevocationRetryError`

Extends [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

Error indicating that the token wasn't revoked (see [RFC 7009 section 2.2.1](https://datatracker.ietf.org/doc/html/rfc7009#section-2.2.1)).

## Constructor

```ts
function constructor(options?: { retryAfter?: Date }): this;
```

### Parameters

- `options`
  - `retryAfter`

## Properties

```ts
interface Properties {
	retryAfter: Date | null;
}
```

- `retryAfter`: `Retry-After` header
