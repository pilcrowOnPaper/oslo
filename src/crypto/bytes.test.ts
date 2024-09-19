import { expect, test } from "vitest";
import { constantTimeEqual } from "./bytes.js";

test("compareBytes()", () => {
	const randomBytes = new Uint8Array(32);
	crypto.getRandomValues(randomBytes);
	expect(constantTimeEqual(randomBytes, randomBytes)).toBe(true);
	const anotherRandomBytes = new Uint8Array(32);
	crypto.getRandomValues(anotherRandomBytes);
	expect(constantTimeEqual(randomBytes, anotherRandomBytes)).toBe(false);
	expect(constantTimeEqual(new Uint8Array(0), new Uint8Array(1))).toBe(false);
});
