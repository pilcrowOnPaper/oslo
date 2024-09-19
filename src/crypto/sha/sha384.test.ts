import { expect, test } from "vitest";
import { sha384 } from "./sha384.js";

test("sha384()", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(200));
	for (let i = 0; i < randomValues.byteLength + 1; i++) {
		const data = randomValues.slice(0, i);
		const result = sha384(data);
		const expected = new Uint8Array(await crypto.subtle.digest("SHA-384", data));
		expect(result).toStrictEqual(expected);
	}
});
