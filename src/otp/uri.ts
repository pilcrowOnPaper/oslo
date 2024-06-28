import { base32 } from "../encoding/index.js";

import type { TimeSpan } from "../index.js";

export function createTOTPKeyURI(
	issuer: string,
	accountName: string,
	secret: Uint8Array,
	options?: {
		digits?: number;
		period?: TimeSpan;
	}
): string {
	const [baseURI, params] = createKeyURIBase("totp", issuer, accountName, secret, options);
	if (options?.period !== undefined) {
		params.set("period", options.period.seconds().toString());
	}
	return baseURI + "?" + params.toString();
}

export function createHOTPKeyURI(
	issuer: string,
	accountName: string,
	secret: Uint8Array,
	options?: {
		counter?: number;
		digits?: number;
	}
): string {
	const [baseURI, params] = createKeyURIBase("hotp", issuer, accountName, secret, options);
	const counter = options?.counter ?? 0;
	params.set("counter", counter.toString());
	return baseURI + "?" + params.toString();
}

function createKeyURIBase(
	type: "totp" | "hotp",
	issuer: string,
	accountName: string,
	secret: Uint8Array,
	options?: {
		digits?: number;
	}
): [baseURI: string, params: URLSearchParams] {
	const encodedIssuer = encodeURIComponent(issuer);
	const encodedAccountName = encodeURIComponent(accountName);
	const baseURI = `otpauth://${type}/${encodedIssuer}:${encodedAccountName}`;
	const params = new URLSearchParams({
		secret: base32.encode(secret, {
			includePadding: false
		}),
		issuer
	});
	if (options?.digits !== undefined) {
		params.set("digits", options.digits.toString());
	}
	return [baseURI, params];
}
