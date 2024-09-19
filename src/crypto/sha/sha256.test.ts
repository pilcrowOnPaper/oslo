import { expect, test } from "vitest";
import { sha256 } from "./sha256.js";

test("sha256()", async () => {
	const randomValues = crypto.getRandomValues(new Uint8Array(200));
	for (let i = 0; i < randomValues.byteLength + 1; i++) {
		const data = randomValues.slice(0, i);
		const result = sha256(data);
		const expected = new Uint8Array(await crypto.subtle.digest("SHA-256", data));
		expect(result).toStrictEqual(expected);
	}
});
