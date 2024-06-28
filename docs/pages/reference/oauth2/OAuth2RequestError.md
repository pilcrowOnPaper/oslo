---
title: "OAuth2RequestError"
---

# `OAuth2RequestError`

Extends [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

Thrown when the endpoint returns the error response as defined in [RFC 6749 section 5.2](https://datatracker.ietf.org/doc/html/rfc6749#section-5.2).

## Constructor

```ts
//$ OAuth2Request=/reference/oauth2/OAuth2Request
function constructor(
	request: $$OAuth2Request,
	options?: {
		message?: string;
		description?: string;
	}
): this;
```

### Parameters

- `request`
- `options`
  - `message`
  - `description`

### Properties

```ts
interface Properties {
	request: OAuth2Request;
	description: string | null;
}
```

- `request`: The original request
- `description`: OAuth 2.0 error description
