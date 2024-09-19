import { describe, test, expect } from "vitest";
import { RSASSAPKCS1v1_5, RSASSAPSS } from "./rsa.js";

import type { SHAHash } from "../sha/index.js";

interface TestCase {
	hash: SHAHash;
}

const testCases: TestCase[] = [
	{
		hash: "SHA-1"
	},
	{
		hash: "SHA-256"
	},
	{
		hash: "SHA-384"
	},
	{
		hash: "SHA-512"
	}
];

describe.each(testCases)("RSASSAPKCS1v1_5($hash)", ({ hash }) => {
	test("Creates and verifies signature", async () => {
		const rsa = new RSASSAPKCS1v1_5(hash);
		const data = new TextEncoder().encode("Hello world!");
		const { publicKey, privateKey } = await rsa.generateKeyPair();
		const signature = await rsa.sign(privateKey, data);
		await expect(rsa.verify(publicKey, signature, data)).resolves.toBe(true);
	});
	test("Fails on invalid signature", async () => {
		const rsa = new RSASSAPKCS1v1_5(hash);
		const data = new TextEncoder().encode("Hello world!");
		const keyPairA = await rsa.generateKeyPair();
		const signature = await rsa.sign(keyPairA.privateKey, data);
		const keyPairB = await rsa.generateKeyPair();
		await expect(rsa.verify(keyPairB.publicKey, signature, data)).resolves.toBe(false);
	});
});

describe.each(testCases)("RSASSAPSS($hash)", ({ hash }) => {
	test("Creates and verifies signature", async () => {
		const rsa = new RSASSAPSS(hash);
		const data = new TextEncoder().encode("Hello world!");
		const { publicKey, privateKey } = await rsa.generateKeyPair();
		const signature = await rsa.sign(privateKey, data);
		await expect(rsa.verify(publicKey, signature, data)).resolves.toBe(true);
	});
	test("Fails on invalid signature", async () => {
		const rsa = new RSASSAPKCS1v1_5(hash);
		const data = new TextEncoder().encode("Hello world!");
		const keyPairA = await rsa.generateKeyPair();
		const signature = await rsa.sign(keyPairA.privateKey, data);
		const keyPairB = await rsa.generateKeyPair();
		await expect(rsa.verify(keyPairB.publicKey, signature, data)).resolves.toBe(false);
	});
});
