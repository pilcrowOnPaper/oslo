import { bigEndian } from "../binary/uint.js";
import { HMAC } from "../crypto/signing-algorithm/hmac.js";

export async function generateHOTP(
	key: Uint8Array,
	counter: bigint,
	digits: number = 6
): Promise<string> {
	if (digits > 8) {
		throw new TypeError("Digits must be 8 or smaller");
	}
	const counterBytes = new Uint8Array(8);
	bigEndian.putUint64(counterBytes, counter, 0);
	const HS = await new HMAC("SHA-1").sign(key, counterBytes);
	const truncated = truncate(HS);
	const SNum = bigEndian.uint32(truncated);
	const D = SNum % 10 ** digits;
	return D.toString().padStart(digits, "0");
}

function truncate(data: Uint8Array): Uint8Array {
	const offset = data[data.byteLength - 1] & 0x0f;
	const result = data.slice(offset, offset + 4);
	result[0] &= 0x7f;
	return result;
}
