// Shared buffer.

import { bigEndian } from "../../binary/uint.js";
import { rotl32 } from "./utils.js";

// To avoid unnecessary array instantiation.
const w = new Uint32Array(80);

// Faster or comparable to Web Crypto < 2000 bytes.
export function sha1(data: Uint8Array): Uint8Array {
	const H = new Uint32Array([0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0]);

	const l = data.byteLength * 8;
	const targetLength = Math.ceil((data.length + 1 + 8) / 64) * 64;
	const buffer = new Uint8Array(targetLength);
	buffer.set(data);
	buffer[data.length] = 0x80;
	bigEndian.putUint32(buffer, l, targetLength - 4);

	for (let i = 0; i < buffer.length; i += 64) {
		for (let t = 0; t < 16; t++) {
			w[t] =
				((buffer[i + t * 4] << 24) |
					(buffer[i + t * 4 + 1] << 16) |
					(buffer[i + t * 4 + 2] << 8) |
					buffer[i + t * 4 + 3]) >>>
				0;
		}
		for (let t = 16; t < 80; t++) {
			w[t] = rotl32(1, (w[t - 3] ^ w[t - 8] ^ w[t - 14] ^ w[t - 16]) >>> 0);
		}
		let a = H[0];
		let b = H[1];
		let c = H[2];
		let d = H[3];
		let e = H[4];
		for (let t = 0; t < 80; t++) {
			let F, K: number;
			if (t < 20) {
				F = ((b & c) ^ (~b & d)) >>> 0;
				K = 0x5a827999;
			} else if (t < 40) {
				F = (b ^ c ^ d) >>> 0;
				K = 0x6ed9eba1;
			} else if (t < 60) {
				F = ((b & c) ^ (b & d) ^ (c & d)) >>> 0;
				K = 0x8f1bbcdc;
			} else {
				F = (b ^ c ^ d) >>> 0;
				K = 0xca62c1d6;
			}
			const T = (rotl32(5, a) + e + F + w[t] + K) | 0;
			e = d;
			d = c;
			c = rotl32(30, b);
			b = a;
			a = T;
		}
		H[0] = (H[0] + a) | 0;
		H[1] = (H[1] + b) | 0;
		H[2] = (H[2] + c) | 0;
		H[3] = (H[3] + d) | 0;
		H[4] = (H[4] + e) | 0;
	}

	// Clean up.
	w.fill(0);

	const result = new Uint8Array(20);
	for (let i = 0; i < 5; i++) {
		bigEndian.putUint32(result, H[i], i * 4);
	}
	return result;
}
