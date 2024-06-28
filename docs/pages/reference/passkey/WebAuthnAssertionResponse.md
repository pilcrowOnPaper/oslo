---
title: "WebAuthnAssertionResponse"
---

# `WebAuthnAssertionResponse`

Represents a WebAuthn assertion response.

## Definition

```ts
interface WebAuthnAssertionResponse {
	clientDataJSON: Uint8Array;
	authenticatorData: Uint8Array;
	signature: Uint8Array;
}
```

### Properties

- `clientDataJSON`
- `authenticatorData`
- `signature`
