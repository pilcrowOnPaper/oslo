class BigEndian implements ByteOrder {
	public uint8(data: Uint8Array): number {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		return data[data.length - 1];
	}

	public uint16(data: Uint8Array): number {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		if (data.byteLength > 1) {
			return (data[data.byteLength - 2] << 8) | data[data.byteLength - 1];
		}
		return data[data.byteLength - 1];
	}

	public uint32(data: Uint8Array): number {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		let result = 0;
		for (let i = 0; i < 4; i++) {
			let byte = 0;
			if (data.byteLength - i - 1 >= 0) {
				byte = data[data.byteLength - i - 1];
			}
			result |= byte << (i * 8);
		}
		return result;
	}

	public uint64(data: Uint8Array): bigint {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		let result = 0n;
		for (let i = 0; i < 8; i++) {
			let byte = 0n;
			if (data.byteLength - i - 1 >= 0) {
				byte = BigInt(data[data.byteLength - i - 1]);
			}
			result |= byte << BigInt(i * 8);
		}
		return result;
	}

	public putUint8(target: Uint8Array, value: number, offset: number): void {
		if (target.length < 1 + offset) {
			throw new TypeError("Not enough space");
		}
		target[offset] = value;
	}

	public putUint16(target: Uint8Array, value: number, offset: number): void {
		if (target.length < 2 + offset) {
			throw new TypeError("Not enough space");
		}
		target[offset] = value >> 8;
		target[offset + 1] = value & 0xff;
	}

	public putUint32(target: Uint8Array, value: number, offset: number): void {
		if (target.length < 4 + offset) {
			throw new TypeError("Not enough space");
		}
		for (let i = 0; i < 4; i++) {
			target[offset + i] = (value >> ((3 - i) * 8)) & 0xff;
		}
	}

	public putUint64(target: Uint8Array, value: bigint, offset: number): void {
		if (target.length < 8 + offset) {
			throw new TypeError("Not enough space");
		}
		for (let i = 0; i < 8; i++) {
			target[offset + i] = Number((value >> BigInt((7 - i) * 8)) & 0xffn);
		}
	}
}

class LittleEndian implements ByteOrder {
	public uint8(data: Uint8Array): number {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		return data[0];
	}

	public uint16(data: Uint8Array): number {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		return data[0] | ((data[1] ?? 0) << 8);
	}

	public uint32(data: Uint8Array): number {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		let result = 0;
		for (let i = 0; i < 4; i++) {
			result |= (data[i] ?? 0) << (i * 8);
		}
		return result;
	}

	public uint64(data: Uint8Array): bigint {
		if (data.byteLength === 0) {
			throw new TypeError("Empty byte array");
		}
		let result = 0n;
		for (let i = 0; i < 8; i++) {
			const byte = BigInt(data[i] ?? 0);
			result |= byte << BigInt(i * 8);
		}
		return result;
	}

	public putUint8(target: Uint8Array, value: number, offset: number): void {
		if (target.length < 1 + offset) {
			throw new TypeError("Not enough space");
		}
		target[offset] = value;
	}

	public putUint16(target: Uint8Array, value: number, offset: number): void {
		if (target.length < 2 + offset) {
			throw new TypeError("Not enough space");
		}
		target[offset + 1] = value >> 8;
		target[offset] = value & 0xff;
	}

	public putUint32(target: Uint8Array, value: number, offset: number): void {
		if (target.length < 4 + offset) {
			throw new TypeError("Not enough space");
		}
		for (let i = 0; i < 4; i++) {
			target[offset + i] = (value >> (i * 8)) & 0xff;
		}
	}

	public putUint64(target: Uint8Array, value: bigint, offset: number): void {
		if (target.length < 8 + offset) {
			throw new TypeError("Not enough space");
		}
		for (let i = 0; i < 8; i++) {
			target[offset + i] = Number((value >> BigInt(i * 8)) & 0xffn);
		}
	}
}

export const bigEndian = new BigEndian();

export const littleEndian = new LittleEndian();

export interface ByteOrder {
	uint8(data: Uint8Array): number;
	uint16(data: Uint8Array): number;
	uint32(data: Uint8Array): number;
	uint64(data: Uint8Array): bigint;
	putUint8(target: Uint8Array, value: number, offset: number): void;
	putUint16(target: Uint8Array, value: number, offset: number): void;
	putUint32(target: Uint8Array, value: number, offset: number): void;
	putUint64(target: Uint8Array, value: bigint, offset: number): void;
}
