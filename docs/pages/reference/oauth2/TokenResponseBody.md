---
title: "TokenResponseBody"
---

# `TokenResponseBody`

Represents the JSON-parsed success response body from the token endpoint. You can extend this interface to include properties such as `refresh_token`.

## Definition

```ts
interface TokenResponseBody {
	access_token: string;
	token_type: string;
	expires_in?: number;
	refresh_token?: string;
	scope?: string;
}
```

### Properties

- `access_token`
- `token_type`
- `expires_in`
- `refresh_token`
- `scope`
