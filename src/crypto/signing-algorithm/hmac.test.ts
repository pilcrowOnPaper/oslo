import { describe, test, expect } from "vitest";
import { HMAC } from "../index.js";

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

describe.each(testCases)("HMAC($hash)", ({ hash }) => {
	test("Creates and verifies signature", async () => {
		const hmac = new HMAC(hash);
		const data = new TextEncoder().encode("Hello world!");
		const key = await hmac.generateKey();
		const signature = await hmac.sign(key, data);
		await expect(hmac.verify(key, signature, data)).resolves.toBe(true);
	});
	test("Fails on invalid signature", async () => {
		const hmac = new HMAC(hash);
		const data = new TextEncoder().encode("Hello world!");
		const keyA = await hmac.generateKey();
		const signature = await hmac.sign(keyA, data);
		const keyB = await hmac.generateKey();
		await expect(hmac.verify(keyB, signature, data)).resolves.toBe(false);
	});
});
