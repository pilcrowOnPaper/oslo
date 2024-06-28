import { bigEndian } from "../binary/uint.js";

export function random(): number {
	const buffer = new ArrayBuffer(8);
	const bytes = crypto.getRandomValues(new Uint8Array(buffer));

	// sets the exponent value (11 bits) to 01111111111 (1023)
	// since the bias is 1023 (2 * (11 - 1) - 1), 1023 - 1023 = 0
	// 2^0 * (1 + [52 bit number between 0-1]) = number between 1-2
	bytes[0] = 63;
	bytes[1] = bytes[1]! | 240;

	return new DataView(buffer).getFloat64(0) - 1;
}

export function generateRandomInteger(max: number): number {
	if (max < 0 || max > 2 ** 32 - 1) {
		throw new Error("Argument 'max' must be an unsigned 32 bit integer");
	}
	const bitLength = (max - 1).toString(2).length;
	const shift = bitLength % 8;
	const bytes = new Uint8Array(Math.ceil(bitLength / 8));

	crypto.getRandomValues(bytes);

	// This zeroes bits that can be ignored to increase the chance `result` < `max`.
	// For example, if `max` can be represented with 10 bits, the leading 6 bits of the random 16 bits (2 bytes) can be ignored.
	if (shift !== 0) {
		bytes[0] &= (1 << shift) - 1;
	}
	let result = bigEndian.uint32(bytes);
	while (result >= max) {
		crypto.getRandomValues(bytes);
		if (shift !== 0) {
			bytes[0] &= (1 << shift) - 1;
		}
		result = bigEndian.uint32(bytes);
	}
	return result;
}

export function generateRandomString(length: number, alphabet: string): string {
	let result = "";
	for (let i = 0; i < length; i++) {
		result += alphabet[generateRandomInteger(alphabet.length)];
	}
	return result;
}

type AlphabetPattern = "a-z" | "A-Z" | "0-9" | "-" | "_";

export function alphabet(...patterns: AlphabetPattern[]): string {
	const patternSet = new Set<AlphabetPattern>(patterns);
	let result = "";
	for (const pattern of patternSet) {
		if (pattern === "a-z") {
			result += "abcdefghijklmnopqrstuvwxyz";
		} else if (pattern === "A-Z") {
			result += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		} else if (pattern === "0-9") {
			result += "0123456789";
		} else {
			result += pattern;
		}
	}
	return result;
}

export function generateRandomBoolean(): boolean {
	const bytes = new Uint8Array(1);
	crypto.getRandomValues(bytes);
	return (bytes[0] & 0x01) === 1;
}
