import { expect, test } from "vitest";

import { compareBytes, concatenateBytes } from "./bytes.js";

test("compareBytes()", () => {
	const randomBytes = new Uint8Array(32);
	crypto.getRandomValues(randomBytes);
	expect(compareBytes(randomBytes, randomBytes)).toBe(true);
	const anotherRandomBytes = new Uint8Array(32);
	crypto.getRandomValues(anotherRandomBytes);
	expect(compareBytes(randomBytes, anotherRandomBytes)).toBe(false);
	expect(compareBytes(new Uint8Array(0), new Uint8Array(1))).toBe(false);
});

test("concatenateBytes()", () => {
	const a = new Uint8Array([0, 1]);
	const b = new Uint8Array([2, 3, 4]);
	expect(concatenateBytes(a, b)).toStrictEqual(new Uint8Array([0, 1, 2, 3, 4]));
});
