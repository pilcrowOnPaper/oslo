import { expect, test } from "vitest";
import { sha1 } from "./sha1.js";

test("sha256()", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(200));
	for (let i = 0; i < randomValues.byteLength + 1; i++) {
		const data = randomValues.slice(0, i);
		const result = sha1(data);
		const expected = new Uint8Array(await crypto.subtle.digest("SHA-1", data));
		expect(result).toStrictEqual(expected);
	}
});
