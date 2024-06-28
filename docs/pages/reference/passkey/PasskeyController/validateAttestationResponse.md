---
title: "PasskeyController.validateAssertionResponse()"
---

# `PasskeyController.validateAttestationResponse()`

Validates a WebAuthn attestation response, including the signature, but not the attestation certificate. Throws an error on invalid response.

## Definition

```ts
//$ WebAuthnAttestationResponse=/reference/passkey/WebAuthnAttestationResponse
function validateAttestationResponse(
	response: $$WebAuthnAttestationResponse,
	challenge: Uint8Array
): Promise<void>;
```

### Parameters

- `response`: Attestation response
- `challenge`: Challenge used for creating the signature

## Example

```ts
//$ WebAuthnAttestationResponse=/reference/passkey/WebAuthnAttestationResponse
//$ passkeyController=/reference/passkey/PasskeyController
try {
	const response: $$WebAuthnAttestationResponse = {
		clientDataJSON,
		authenticatorData
	};
	await $$passkeyController.validateAttestationResponse(response, challenge);
} catch {
	// failed to validate
}
```
