export function rotl32(n: number, x: number): number {
	return ((x << n) | (x >>> (32 - n))) >>> 0;
}

export function rotr32(n: number, x: number): number {
	return ((x << (32 - n)) | (x >>> n)) >>> 0;
}

export function rotr64(n: bigint, x: bigint): bigint {
	return (x << (64n - n)) | ((x >> n) & 0xffffffffffffffffn);
}
