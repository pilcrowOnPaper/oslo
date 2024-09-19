import { ECDSA, HMAC, RSASSAPKCS1v1_5, RSASSAPSS } from "../crypto/index.js";
import { base64url } from "../encoding/index.js";
import { isWithinExpirationDate } from "../index.js";

import type { TimeSpan } from "../index.js";
import type { SigningAlgorithm } from "../crypto/index.js";

export type JWTAlgorithm =
	| "HS256"
	| "HS384"
	| "HS512"
	| "RS256"
	| "RS384"
	| "RS512"
	| "ES256"
	| "ES384"
	| "ES512"
	| "PS256"
	| "PS384"
	| "PS512";

export function createJWTHeader(algorithm: JWTAlgorithm): JWTHeader {
	const header: JWTHeader = {
		alg: algorithm,
		typ: "JWT"
	};
	return header;
}

export function createJWTPayload(options?: {
	expiresIn?: TimeSpan;
	issuer?: string;
	subject?: string;
	audiences?: string[];
	notBefore?: Date;
	includeIssuedTimestamp?: boolean;
	jwtId?: string;
}): JWTPayload {
	const payload: JWTPayload = {};
	if (options?.audiences !== undefined) {
		payload.aud = options.audiences;
	}
	if (options?.subject !== undefined) {
		payload.sub = options.subject;
	}
	if (options?.issuer !== undefined) {
		payload.iss = options.issuer;
	}
	if (options?.jwtId !== undefined) {
		payload.jti = options.jwtId;
	}
	if (options?.expiresIn !== undefined) {
		payload.exp = Math.floor(Date.now() / 1000) + options.expiresIn.seconds();
	}
	if (options?.notBefore !== undefined) {
		payload.nbf = Math.floor(options.notBefore.getTime() / 1000);
	}
	if (options?.includeIssuedTimestamp === true) {
		payload.iat = Math.floor(Date.now() / 1000);
	}
	return payload;
}

export async function createJWT(
	key: Uint8Array,
	header: JWTHeader,
	payload: JWTPayload
): Promise<string> {
	const textEncoder = new TextEncoder();
	const headerPart = base64url.encode(textEncoder.encode(JSON.stringify(header)), {
		includePadding: false
	});
	const payloadPart = base64url.encode(textEncoder.encode(JSON.stringify(payload)), {
		includePadding: false
	});
	const data = textEncoder.encode([headerPart, payloadPart].join("."));
	const signature = await getAlgorithm(header.alg).sign(key, data);
	const signaturePart = base64url.encode(signature, {
		includePadding: false
	});
	const value = [headerPart, payloadPart, signaturePart].join(".");
	return value;
}

export async function validateJWT(
	algorithm: JWTAlgorithm,
	key: Uint8Array,
	jwt: string
): Promise<JWT> {
	const parsedJWT = parseJWT(jwt);
	if (!parsedJWT) {
		throw new Error("Invalid JWT");
	}
	if (parsedJWT.algorithm !== algorithm) {
		throw new Error("Invalid algorithm");
	}
	if (parsedJWT.expiresAt && !isWithinExpirationDate(parsedJWT.expiresAt)) {
		throw new Error("Expired JWT");
	}
	if (parsedJWT.notBefore && Date.now() < parsedJWT.notBefore.getTime()) {
		throw new Error("Inactive JWT");
	}
	const signature = base64url.decode(parsedJWT.parts[2], {
		strict: false
	});
	const data = new TextEncoder().encode(parsedJWT.parts[0] + "." + parsedJWT.parts[1]);
	const validSignature = await getAlgorithm(parsedJWT.algorithm).verify(key, signature, data);
	if (!validSignature) {
		throw new Error("Invalid signature");
	}
	return parsedJWT;
}

export function parseJWT(token: string): JWT | null {
	const parts = token.split(".");
	if (parts.length !== 3) {
		return null;
	}
	const textDecoder = new TextDecoder();
	const rawHeader = base64url.decode(parts[0], {
		strict: false
	});
	const rawPayload = base64url.decode(parts[1], {
		strict: false
	});
	const header: unknown = JSON.parse(textDecoder.decode(rawHeader));
	if (typeof header !== "object" || header === null) {
		return null;
	}
	if (!("alg" in header) || !isValidAlgorithm(header.alg)) {
		return null;
	}
	if ("typ" in header && header.typ !== "JWT") {
		return null;
	}
	const payload: unknown = JSON.parse(textDecoder.decode(rawPayload));
	if (typeof payload !== "object" || payload === null) {
		return null;
	}
	const jwt: JWT = {
		value: token,
		header: header,
		payload: payload,
		parts: parts as [string, string, string],
		expiresAt: null,
		issuer: null,
		subject: null,
		audiences: null,
		notBefore: null,
		issuedAt: null,
		jwtId: null,
		algorithm: header.alg
	};
	if ("exp" in payload) {
		if (typeof payload.exp !== "number") {
			return null;
		}
		jwt.expiresAt = new Date(payload.exp * 1000);
	}
	if ("iss" in payload) {
		if (typeof payload.iss !== "string") {
			return null;
		}
		jwt.issuer = payload.iss;
	}
	if ("sub" in payload) {
		if (typeof payload.sub !== "string") {
			return null;
		}
		jwt.subject = payload.sub;
	}
	if ("aud" in payload) {
		if (!Array.isArray(payload.aud)) {
			if (typeof payload.aud !== "string") {
				return null;
			}
			jwt.audiences = [payload.aud];
		} else {
			for (const item of payload.aud) {
				if (typeof item !== "string") {
					return null;
				}
			}
			jwt.audiences = payload.aud;
		}
	}
	if ("nbf" in payload) {
		if (typeof payload.nbf !== "number") {
			return null;
		}
		jwt.notBefore = new Date(payload.nbf * 1000);
	}
	if ("iat" in payload) {
		if (typeof payload.iat !== "number") {
			return null;
		}
		jwt.issuedAt = new Date(payload.iat * 1000);
	}
	if ("jti" in payload) {
		if (typeof payload.jti !== "string") {
			return null;
		}
		jwt.jwtId = payload.jti;
	}
	return jwt;
}

export interface JWT {
	value: string;
	header: object;
	payload: object;
	parts: [header: string, payload: string, signature: string];
	algorithm: JWTAlgorithm;
	expiresAt: Date | null;
	issuer: string | null;
	subject: string | null;
	audiences: string[] | null;
	notBefore: Date | null;
	issuedAt: Date | null;
	jwtId: string | null;
}

function getAlgorithm(algorithm: JWTAlgorithm): SigningAlgorithm {
	if (algorithm === "ES256" || algorithm === "ES384" || algorithm === "ES512") {
		return new ECDSA(ecdsaDictionary[algorithm].hash, ecdsaDictionary[algorithm].curve);
	}
	if (algorithm === "HS256" || algorithm === "HS384" || algorithm === "HS512") {
		return new HMAC(hmacDictionary[algorithm]);
	}
	if (algorithm === "RS256" || algorithm === "RS384" || algorithm === "RS512") {
		return new RSASSAPKCS1v1_5(rsassapkcs1v1_5Dictionary[algorithm]);
	}
	if (algorithm === "PS256" || algorithm === "PS384" || algorithm === "PS512") {
		return new RSASSAPSS(rsassapssDictionary[algorithm]);
	}
	throw new TypeError("Invalid algorithm");
}

function isValidAlgorithm(maybeValidAlgorithm: unknown): maybeValidAlgorithm is JWTAlgorithm {
	if (typeof maybeValidAlgorithm !== "string") return false;
	return [
		"HS256",
		"HS384",
		"HS512",
		"RS256",
		"RS384",
		"RS512",
		"ES256",
		"ES384",
		"ES512",
		"PS256",
		"PS384",
		"PS512"
	].includes(maybeValidAlgorithm);
}

export interface JWTHeader {
	typ: "JWT";
	alg: JWTAlgorithm;
	[header: string]: any;
}

export interface JWTPayload {
	exp?: number;
	iss?: string;
	aud?: string[] | string;
	jti?: string;
	nbf?: number;
	sub?: string;
	iat?: number;
	[claim: string]: any;
}

export const ecdsaDictionary = {
	ES256: {
		hash: "SHA-256",
		curve: "P-256"
	},
	ES384: {
		hash: "SHA-384",
		curve: "P-384"
	},
	ES512: {
		hash: "SHA-512",
		curve: "P-521"
	}
} as const;

export const hmacDictionary = {
	HS256: "SHA-256",
	HS384: "SHA-384",
	HS512: "SHA-512"
} as const;

export const rsassapkcs1v1_5Dictionary = {
	RS256: "SHA-256",
	RS384: "SHA-384",
	RS512: "SHA-512"
} as const;

export const rsassapssDictionary = {
	PS256: "SHA-256",
	PS384: "SHA-384",
	PS512: "SHA-512"
} as const;
