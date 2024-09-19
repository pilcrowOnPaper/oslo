import { bigEndian } from "../../binary/uint.js";
import { rotr64 } from "./utils.js";

const K = [
	0x428a2f98d728ae22n,
	0x7137449123ef65cdn,
	0xb5c0fbcfec4d3b2fn,
	0xe9b5dba58189dbbcn,
	0x3956c25bf348b538n,
	0x59f111f1b605d019n,
	0x923f82a4af194f9bn,
	0xab1c5ed5da6d8118n,
	0xd807aa98a3030242n,
	0x12835b0145706fben,
	0x243185be4ee4b28cn,
	0x550c7dc3d5ffb4e2n,
	0x72be5d74f27b896fn,
	0x80deb1fe3b1696b1n,
	0x9bdc06a725c71235n,
	0xc19bf174cf692694n,
	0xe49b69c19ef14ad2n,
	0xefbe4786384f25e3n,
	0x0fc19dc68b8cd5b5n,
	0x240ca1cc77ac9c65n,
	0x2de92c6f592b0275n,
	0x4a7484aa6ea6e483n,
	0x5cb0a9dcbd41fbd4n,
	0x76f988da831153b5n,
	0x983e5152ee66dfabn,
	0xa831c66d2db43210n,
	0xb00327c898fb213fn,
	0xbf597fc7beef0ee4n,
	0xc6e00bf33da88fc2n,
	0xd5a79147930aa725n,
	0x06ca6351e003826fn,
	0x142929670a0e6e70n,
	0x27b70a8546d22ffcn,
	0x2e1b21385c26c926n,
	0x4d2c6dfc5ac42aedn,
	0x53380d139d95b3dfn,
	0x650a73548baf63den,
	0x766a0abb3c77b2a8n,
	0x81c2c92e47edaee6n,
	0x92722c851482353bn,
	0xa2bfe8a14cf10364n,
	0xa81a664bbc423001n,
	0xc24b8b70d0f89791n,
	0xc76c51a30654be30n,
	0xd192e819d6ef5218n,
	0xd69906245565a910n,
	0xf40e35855771202an,
	0x106aa07032bbd1b8n,
	0x19a4c116b8d2d0c8n,
	0x1e376c085141ab53n,
	0x2748774cdf8eeb99n,
	0x34b0bcb5e19b48a8n,
	0x391c0cb3c5c95a63n,
	0x4ed8aa4ae3418acbn,
	0x5b9cca4f7763e373n,
	0x682e6ff3d6b2b8a3n,
	0x748f82ee5defb2fcn,
	0x78a5636f43172f60n,
	0x84c87814a1f0ab72n,
	0x8cc702081a6439ecn,
	0x90befffa23631e28n,
	0xa4506cebde82bde9n,
	0xbef9a3f7b2c67915n,
	0xc67178f2e372532bn,
	0xca273eceea26619cn,
	0xd186b8c721c0c207n,
	0xeada7dd6cde0eb1en,
	0xf57d4f7fee6ed178n,
	0x06f067aa72176fban,
	0x0a637dc5a2c898a6n,
	0x113f9804bef90daen,
	0x1b710b35131c471bn,
	0x28db77f523047d84n,
	0x32caab7b40c72493n,
	0x3c9ebe0a15c9bebcn,
	0x431d67c49c100d4cn,
	0x4cc5d4becb3e42b6n,
	0x597f299cfc657e2an,
	0x5fcb6fab3ad6faecn,
	0x6c44198c4a475817n
];

// To avoid unnecessary array instantiation.
const w = new BigUint64Array(80);

export function sha384(data: Uint8Array): Uint8Array {
	const H = new BigUint64Array([
		0xcbbb9d5dc1059ed8n,
		0x629a292a367cd507n,
		0x9159015a3070dd17n,
		0x152fecd8f70e5939n,
		0x67332667ffc00b31n,
		0x8eb44a8768581511n,
		0xdb0c2e0d64f98fa7n,
		0x47b5481dbefa4fa4n
	]);

	const l = data.byteLength * 8;
	const targetLength = Math.ceil((data.length + 1 + 16) / 128) * 128;
	const buffer = new Uint8Array(targetLength);
	buffer[data.length] = 0x80;
	buffer.set(data);
	bigEndian.putUint64(buffer, BigInt(l), targetLength - 8);
	for (let i = 0; i < buffer.length; i += 128) {
		for (let t = 0; t < 16; t++) {
			w[t] =
				(BigInt(buffer[i + t * 8]) << 56n) |
				(BigInt(buffer[i + t * 8 + 1]) << 48n) |
				(BigInt(buffer[i + t * 8 + 2]) << 40n) |
				(BigInt(buffer[i + t * 8 + 3]) << 32n) |
				(BigInt(buffer[i + t * 8 + 4]) << 24n) |
				(BigInt(buffer[i + t * 8 + 5]) << 16n) |
				(BigInt(buffer[i + t * 8 + 6]) << 8n) |
				BigInt(buffer[i + t * 8 + 7]);
		}
		for (let t = 16; t < 80; t++) {
			const sigma1 =
				(rotr64(19n, w[t - 2]) ^ rotr64(61n, w[t - 2]) ^ (w[t - 2] >> 6n)) & 0xffffffffffffffffn;
			const sigma0 =
				(rotr64(1n, w[t - 15]) ^ rotr64(8n, w[t - 15]) ^ (w[t - 15] >> 7n)) & 0xffffffffffffffffn;
			w[t] = (sigma1 + w[t - 7] + sigma0 + w[t - 16]) & 0xffffffffffffffffn;
		}
		let a = H[0];
		let b = H[1];
		let c = H[2];
		let d = H[3];
		let e = H[4];
		let f = H[5];
		let g = H[6];
		let h = H[7];
		for (let t = 0; t < 80; t++) {
			const sigma1 = (rotr64(14n, e) ^ rotr64(18n, e) ^ rotr64(41n, e)) & 0xffffffffffffffffn;
			const ch = ((e & f) ^ (~e & g)) & 0xffffffffffffffffn;
			const t1 = (h + sigma1 + ch + K[t] + w[t]) & 0xffffffffffffffffn;
			const sigma0 = (rotr64(28n, a) ^ rotr64(34n, a) ^ rotr64(39n, a)) & 0xffffffffffffffffn;
			const maj = ((a & b) ^ (a & c) ^ (b & c)) & 0xffffffffffffffffn;
			const t2 = (sigma0 + maj) & 0xffffffffffffffffn;
			h = g;
			g = f;
			f = e;
			e = (d + t1) & 0xffffffffffffffffn;
			d = c;
			c = b;
			b = a;
			a = (t1 + t2) & 0xffffffffffffffffn;
		}
		H[0] = (a + H[0]) & 0xffffffffffffffffn;
		H[1] = (b + H[1]) & 0xffffffffffffffffn;
		H[2] = (c + H[2]) & 0xffffffffffffffffn;
		H[3] = (d + H[3]) & 0xffffffffffffffffn;
		H[4] = (e + H[4]) & 0xffffffffffffffffn;
		H[5] = (f + H[5]) & 0xffffffffffffffffn;
		H[6] = (g + H[6]) & 0xffffffffffffffffn;
		H[7] = (h + H[7]) & 0xffffffffffffffffn;
	}

	// Clean up.
	w.fill(0n);

	const result = new Uint8Array(48);
	for (let i = 0; i < 6; i++) {
		bigEndian.putUint64(result, H[i], i * 8);
	}
	return result;
}
