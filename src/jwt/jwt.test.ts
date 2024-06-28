import { describe, test, expect } from "vitest";
import {
	createJWT,
	createJWTHeader,
	createJWTPayload,
	ecdsaDictionary,
	hmacDictionary,
	parseJWT,
	rsassapkcs1v1_5Dictionary,
	rsassapssDictionary,
	validateJWT
} from "./jwt.js";

import { HMAC } from "../crypto/signing-algorithm/hmac.js";
import { ECDSA } from "../crypto/signing-algorithm/ecdsa.js";
import { RSASSAPKCS1v1_5, RSASSAPSS } from "../crypto/signing-algorithm/rsa.js";
import { addToDate, TimeSpan } from "../index.js";

import type { JWT } from "./jwt.js";

test.each(["ES256", "ES384", "ES512"] as const)(
	"Create and validate JWT with %s",
	async (algorithm) => {
		const { publicKey, privateKey } = await new ECDSA(
			ecdsaDictionary[algorithm].hash,
			ecdsaDictionary[algorithm].curve
		).generateKeyPair();
		const header = createJWTHeader(algorithm);
		const payload = {
			message: "hello"
		};
		const jwt = await createJWT(privateKey, header, payload);
		const validatedJWT = await validateJWT(algorithm, publicKey, jwt);
		expect(validatedJWT.algorithm).toBe(algorithm);
		expect(validatedJWT.header).toStrictEqual({
			typ: "JWT",
			alg: algorithm
		});
		expect(validatedJWT.payload).toStrictEqual({
			message: "hello"
		});
	}
);

test.each(["RS256", "RS384", "RS512"] as const)(
	"Create and validate JWT with %s",
	async (algorithm) => {
		const { publicKey, privateKey } = await new RSASSAPKCS1v1_5(
			rsassapkcs1v1_5Dictionary[algorithm]
		).generateKeyPair();
		const header = createJWTHeader(algorithm);
		const payload = {
			message: "hello"
		};
		const jwt = await createJWT(privateKey, header, payload);
		const validatedJWT = await validateJWT(algorithm, publicKey, jwt);
		expect(validatedJWT.algorithm).toBe(algorithm);
		expect(validatedJWT.header).toStrictEqual({
			typ: "JWT",
			alg: algorithm
		});
		expect(validatedJWT.payload).toStrictEqual({
			message: "hello"
		});
	}
);

test.each(["PS256", "PS384", "PS512"] as const)(
	"Create and validate JWT with %s",
	async (algorithm) => {
		const { publicKey, privateKey } = await new RSASSAPSS(
			rsassapssDictionary[algorithm]
		).generateKeyPair();
		const header = createJWTHeader(algorithm);
		const payload = {
			message: "hello"
		};
		const jwt = await createJWT(privateKey, header, payload);
		const validatedJWT = await validateJWT(algorithm, publicKey, jwt);
		expect(validatedJWT.algorithm).toBe(algorithm);
		expect(validatedJWT.header).toStrictEqual({
			typ: "JWT",
			alg: algorithm
		});
		expect(validatedJWT.payload).toStrictEqual({
			message: "hello"
		});
	}
);

test.each(["HS256", "HS384", "HS512"] as const)(
	"Create and validate JWT with %s",
	async (algorithm) => {
		const key = await new HMAC(hmacDictionary[algorithm]).generateKey();
		const header = createJWTHeader(algorithm);
		const payload = {
			message: "hello"
		};
		const jwt = await createJWT(key, header, payload);
		const validatedJWT = await validateJWT(algorithm, key, jwt);
		expect(validatedJWT.algorithm).toBe(algorithm);
		expect(validatedJWT.header).toStrictEqual({
			typ: "JWT",
			alg: algorithm
		});
		expect(validatedJWT.payload).toStrictEqual({
			message: "hello"
		});
	}
);

describe("createJWT() and validateJWT()", () => {
	test("Creates the correct JWT value", async () => {
		const key = new Uint8Array([
			8, 138, 53, 76, 210, 41, 194, 216, 13, 70, 56, 196, 237, 57, 69, 41, 152, 114, 223, 150, 169,
			154, 191, 89, 202, 118, 249, 18, 34, 208, 18, 101, 70, 236, 76, 178, 117, 129, 106, 71, 253,
			79, 99, 9, 64, 208, 102, 50, 118, 72, 107, 46, 120, 2, 240, 217, 103, 66, 63, 52, 248, 23,
			140, 46
		]);
		const header = createJWTHeader("HS256");
		const payload = createJWTPayload({
			audiences: ["_audience"],
			issuer: "_issuer",
			subject: "_subject",
			jwtId: "_jwtId"
		});
		payload.message = "hello";
		payload.count = 100;
		expect(createJWT(key, header, payload)).resolves.not.toThrowError();
	});
});

test("parseJWT()", async () => {
	const key = await new HMAC("SHA-256").generateKey();
	const currDateSeconds = Math.floor(Date.now() / 1000);
	const header = createJWTHeader("HS256");
	header.kid = "_kid";
	const payload = createJWTPayload({
		audiences: ["_audience"],
		issuer: "_issuer",
		subject: "_subject",
		jwtId: "_jwtId",
		expiresIn: new TimeSpan(1, "h"),
		notBefore: new Date(),
		includeIssuedTimestamp: true
	});
	payload.message = "hello";
	const jwt = await createJWT(key, header, payload);
	const expected: JWT = {
		algorithm: "HS256",
		expiresAt: new Date((currDateSeconds + new TimeSpan(1, "h").seconds()) * 1000),
		notBefore: new Date(currDateSeconds * 1000),
		issuedAt: new Date(currDateSeconds * 1000),
		audiences: ["_audience"],
		issuer: "_issuer",
		subject: "_subject",
		jwtId: "_jwtId",
		value: jwt,
		parts: jwt.split(".") as [string, string, string],
		header: {
			kid: "_kid",
			typ: "JWT",
			alg: "HS256"
		},
		payload: {
			message: "hello",
			aud: ["_audience"],
			iss: "_issuer",
			sub: "_subject",
			jti: "_jwtId",
			exp: currDateSeconds + new TimeSpan(1, "h").seconds(),
			iat: currDateSeconds,
			nbf: currDateSeconds
		}
	};
	expect(parseJWT(jwt)).toEqual(expected);
});

describe("validateJWT()", () => {
	test("Checks expiration", async () => {
		const key = await new HMAC("SHA-256").generateKey();
		const header = createJWTHeader("HS256");
		const payload1 = createJWTPayload({
			expiresIn: new TimeSpan(-1, "s")
		});
		const payload2 = createJWTPayload({
			expiresIn: new TimeSpan(0, "s")
		});
		const jwt1 = await createJWT(key, header, payload1);
		const jwt2 = await createJWT(key, header, payload2);
		await expect(validateJWT("HS256", key, jwt1)).rejects.toThrowError();
		await expect(validateJWT("HS256", key, jwt2)).rejects.toThrowError();
	});
	test("Checks not before time", async () => {
		const key = await new HMAC("SHA-256").generateKey();
		const header = createJWTHeader("HS256");
		const payload1 = createJWTPayload({
			notBefore: addToDate(new Date(), new TimeSpan(60, "s"))
		});
		const payload2 = createJWTPayload({
			notBefore: new Date()
		});
		const jwt1 = await createJWT(key, header, payload1);
		const jwt2 = await createJWT(key, header, payload2);
		await expect(validateJWT("HS256", key, jwt1)).rejects.toThrowError();
		await expect(validateJWT("HS256", key, jwt2)).resolves.not.toThrowError();
	});
	test("Throws on invalid algorithm", async () => {
		const key = await new HMAC("SHA-256").generateKey();
		const header = createJWTHeader("HS256");
		const jwt = await createJWT(key, header, {});
		await expect(validateJWT("HS512", key, jwt)).rejects.toThrowError();
	});
	test("Throws on invalid signature", async () => {
		const key = await new HMAC("SHA-256").generateKey();
		const header = createJWTHeader("HS256");
		const jwt = await createJWT(key, header, {});
		const invalidKey = await new HMAC("SHA-256").generateKey();
		await expect(validateJWT("HS512", invalidKey, jwt)).rejects.toThrowError();
	});
	test("Throws on invalid JWT", async () => {
		const key = await new HMAC("SHA-256").generateKey();
		await expect(validateJWT("HS256", key, "huhuihdeuihdiheud")).rejects.toThrowError();
		await expect(
			validateJWT("HS256", key, "huhuihdeuihdiheudheiuhdehd.dededed.deded")
		).rejects.toThrowError();
	});
});
