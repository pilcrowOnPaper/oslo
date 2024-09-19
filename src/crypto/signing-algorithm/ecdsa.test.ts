import { describe, test, expect } from "vitest";
import { ECDSA } from "../index.js";

import type { ECDSACurve } from "./ecdsa.js";
import type { SHAHash } from "../sha/index.js";

interface TestCase {
	hash: SHAHash;
	curve: ECDSACurve;
}

const testCases: TestCase[] = [
	{
		hash: "SHA-1",
		curve: "P-256"
	},
	{
		hash: "SHA-256",
		curve: "P-256"
	},
	{
		hash: "SHA-384",
		curve: "P-384"
	},
	{
		hash: "SHA-512",
		curve: "P-521"
	}
];

describe.each(testCases)("ECDSA($hash, $curve)", ({ hash, curve }) => {
	test("Creates and verifies signature", async () => {
		const ecdsa = new ECDSA(hash, curve);
		const data = new TextEncoder().encode("Hello world!");
		const { publicKey, privateKey } = await ecdsa.generateKeyPair();
		const signature = await ecdsa.sign(privateKey, data);
		await expect(ecdsa.verify(publicKey, signature, data)).resolves.toBe(true);
	});
	test("Fails on invalid signature", async () => {
		const ecdsa = new ECDSA(hash, curve);
		const data = new TextEncoder().encode("Hello world!");
		const keyPairA = await ecdsa.generateKeyPair();
		const signature = await ecdsa.sign(keyPairA.privateKey, data);
		const keyPairB = await ecdsa.generateKeyPair();
		await expect(ecdsa.verify(keyPairB.publicKey, signature, data)).resolves.toBe(false);
	});
});
