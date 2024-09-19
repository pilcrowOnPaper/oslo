import { expect, test } from "vitest";
import { sha512 } from "./sha512.js";

test("sha512()", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(200));
	for (let i = 0; i < randomValues.byteLength + 1; i++) {
		const data = randomValues.slice(0, i);
		const result = sha512(data);
		const expected = new Uint8Array(await crypto.subtle.digest("SHA-512", data));
		expect(result).toStrictEqual(expected);
	}
});
