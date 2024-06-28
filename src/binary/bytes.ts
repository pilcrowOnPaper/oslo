export function compareBytes(a: Uint8Array, b: Uint8Array): boolean {
	if (a.byteLength !== b.byteLength) {
		return false;
	}
	for (let i = 0; i < b.byteLength; i++) {
		if (a[i] !== b[i]) {
			return false;
		}
	}
	return true;
}

export function concatenateBytes(a: Uint8Array, b: Uint8Array): Uint8Array {
	const result = new Uint8Array(a.byteLength + b.byteLength);
	result.set(new Uint8Array(a), 0);
	result.set(new Uint8Array(b), a.byteLength);
	return result;
}
