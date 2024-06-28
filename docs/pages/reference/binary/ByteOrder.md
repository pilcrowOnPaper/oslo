---
title: "ByteOrder"
---

# `ByteOrder`

## Definition

```ts
interface ByteOrder {
	uint8(data: Uint8Array): number;
	uint16(data: Uint8Array): number;
	uint32(data: Uint8Array): number;
	uint64(data: Uint8Array): bigint;
	putUint8(target: Uint8Array, value: number, offset?: number): void;
	putUint16(target: Uint8Array, value: number, offset?: number): void;
	putUint32(target: Uint8Array, value: number, offset?: number): void;
	putUint64(target: Uint8Array, value: bigint, offset?: number): void;
}
```

### Methods

- `uint8()`: Converts the last 1 bytes to an integer. Errors if the input is empty.
- `uint16()`: Converts the last 16 bytes to an integer. Errors if the input is empty.
- `uint32()`: Converts the last 32 bytes to an integer. Errors if the input is empty.
- `uint64()`: Converts the last 64 bytes to an integer. Errors if the input is empty.
- `putUint8()`: Puts the binary representation of the integer to the first 1 byte (+offset). Errors on insufficient space.
- `putUint16()`: Puts the binary representation of the integer to the first 2 byte (+offset). Errors on insufficient space.
- `putUint32()`: Puts the binary representation of the integer to the first 4 byte (+offset). Errors on insufficient space.
- `putUint64()`: Puts the binary representation of the integer to the first 8 byte (+offset). Errors on insufficient space.
