---
title: "PasskeyController.validateAssertionResponse()"
---

# `PasskeyController.validateAssertionResponse()`

Validates a WebAuthn assertion response, including the signature. Supports ES256 (algorithm id `-7`) and RS256 (algorithm id `-257`). Throws an error on invalid response.

## Definition

```ts
//$ WebAuthnAssertionResponse=/reference/passkey/WebAuthnAssertionResponse
function validateAssertionResponse(
	algorithm: "ES256" | "RS256",
	publicKey: Uint8Array,
	response: $$WebAuthnAssertionResponse,
	challenge: Uint8Array
): Promise<void>;
```

### Parameters

- `algorithm`: Algorithm used for creating the signature
- `publicKey`: Users's public key stored in the database
- `response`: Attestation response
- `challenge`: Challenge used for creating the signature

## Example

```ts
//$ WebAuthnAssertionResponse=/reference/passkey/WebAuthnAssertionResponse
//$ passkeyController=/reference/passkey/PasskeyController
try {
	const response: $$WebAuthnAssertionResponse = {
		clientDataJSON,
		authenticatorData,
		signature
	};
	await $$passkeyController.validateAssertionResponse("ES256", publicKey, response, challenge);
} catch {
	// failed to validate
}
```
