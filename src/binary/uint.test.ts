import { expect, test } from "vitest";
import { bigEndian, littleEndian } from "./uint.js";
import { describe } from "vitest";

describe("bigEndian", () => {
	describe("bigEndian.uint8", () => {
		test("returns correct value", () => {
			expect(bigEndian.uint8(new Uint8Array([1]))).toBe(1);
		});
		test("excessive bytes", () => {
			expect(bigEndian.uint8(new Uint8Array([1, 2]))).toBe(2);
		});
		test("0 bytes", () => {
			expect(() => bigEndian.uint8(new Uint8Array([]))).toThrow();
		});
	});
	describe("bigEndian.uint16", () => {
		test("returns correct value", () => {
			expect(bigEndian.uint16(new Uint8Array([1, 2]))).toBe(258);
		});
		test("insufficient bytes", () => {
			expect(bigEndian.uint16(new Uint8Array([1]))).toBe(1);
		});
		test("excessive bytes", () => {
			expect(bigEndian.uint16(new Uint8Array([1, 2, 3]))).toBe(515);
		});
		test("0 bytes", () => {
			expect(() => bigEndian.uint16(new Uint8Array([]))).toThrow();
		});
	});
	describe("bigEndian.uint32", () => {
		test("returns correct value", () => {
			expect(bigEndian.uint32(new Uint8Array([1, 2, 3, 4]))).toBe(16909060);
		});
		test("insufficient bytes", () => {
			expect(bigEndian.uint32(new Uint8Array([1]))).toBe(1);
		});
		test("excessive bytes", () => {
			expect(bigEndian.uint32(new Uint8Array([1, 2, 3, 4, 5]))).toBe(33752069);
		});
		test("0 bytes", () => {
			expect(() => bigEndian.uint32(new Uint8Array([]))).toThrow();
		});
	});
	describe("bigEndian.uint64", () => {
		test("returns correct value", () => {
			expect(bigEndian.uint64(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]))).toBe(72623859790382856n);
		});
		test("insufficient bytes", () => {
			expect(bigEndian.uint64(new Uint8Array([1]))).toBe(1n);
		});
		test("excessive bytes", () => {
			expect(bigEndian.uint64(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9]))).toBe(
				144964032628459529n
			);
		});
		test("0 bytes", () => {
			expect(() => bigEndian.uint64(new Uint8Array([]))).toThrow();
		});
	});

	describe("bigEndian.putUint8", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(1);
			bigEndian.putUint8(data, 1, 0);
			expect(data).toStrictEqual(new Uint8Array([1]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(2);
			bigEndian.putUint8(data, 1, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(2);
			bigEndian.putUint8(data, 1, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 1]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => bigEndian.putUint8(data, 1, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(1);
			expect(() => bigEndian.putUint8(data, 1, 1)).toThrow();
		});
	});
	describe("bigEndian.putUint16", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(2);
			bigEndian.putUint16(data, 258, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 2]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(3);
			bigEndian.putUint16(data, 258, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 2, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(3);
			bigEndian.putUint16(data, 258, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 1, 2]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => bigEndian.putUint16(data, 1, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(2);
			expect(() => bigEndian.putUint16(data, 258, 1)).toThrow();
		});
	});
	describe("bigEndian.putUint32", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(4);
			bigEndian.putUint32(data, 16909060, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 2, 3, 4]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(5);
			bigEndian.putUint32(data, 16909060, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 2, 3, 4, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(5);
			bigEndian.putUint32(data, 16909060, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 1, 2, 3, 4]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => bigEndian.putUint32(data, 1, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(4);
			expect(() => bigEndian.putUint32(data, 16909060, 1)).toThrow();
		});
	});
	describe("bigEndian.putUint64", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(8);
			bigEndian.putUint64(data, 72623859790382856n, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(9);
			bigEndian.putUint64(data, 72623859790382856n, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(9);
			bigEndian.putUint64(data, 72623859790382856n, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => bigEndian.putUint64(data, 72623859790382856n, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(8);
			expect(() => bigEndian.putUint64(data, 72623859790382856n, 1)).toThrow();
		});
	});
});

describe("littleEndian", () => {
	describe("littleEndian.uint8", () => {
		test("returns correct value", () => {
			expect(littleEndian.uint8(new Uint8Array([1]))).toBe(1);
		});
		test("excessive bytes", () => {
			expect(littleEndian.uint8(new Uint8Array([2, 1]))).toBe(2);
		});
		test("0 bytes", () => {
			expect(() => littleEndian.uint8(new Uint8Array([]))).toThrow();
		});
	});
	describe("littleEndian.uint16", () => {
		test("returns correct value", () => {
			expect(littleEndian.uint16(new Uint8Array([2, 1]))).toBe(258);
		});
		test("insufficient bytes", () => {
			expect(littleEndian.uint16(new Uint8Array([1]))).toBe(1);
		});
		test("excessive bytes", () => {
			expect(littleEndian.uint16(new Uint8Array([3, 2, 1]))).toBe(515);
		});
		test("0 bytes", () => {
			expect(() => littleEndian.uint16(new Uint8Array([]))).toThrow();
		});
	});
	describe("littleEndian.uint32", () => {
		test("returns correct value", () => {
			expect(littleEndian.uint32(new Uint8Array([4, 3, 2, 1]))).toBe(16909060);
		});
		test("insufficient bytes", () => {
			expect(littleEndian.uint32(new Uint8Array([1]))).toBe(1);
		});
		test("excessive bytes", () => {
			expect(littleEndian.uint32(new Uint8Array([5, 4, 3, 2, 1]))).toBe(33752069);
		});
		test("0 bytes", () => {
			expect(() => littleEndian.uint32(new Uint8Array([]))).toThrow();
		});
	});
	describe("littleEndian.uint64", () => {
		test("returns correct value", () => {
			expect(littleEndian.uint64(new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1]))).toBe(
				72623859790382856n
			);
		});
		test("insufficient bytes", () => {
			expect(littleEndian.uint64(new Uint8Array([1]))).toBe(1n);
		});
		test("excessive bytes", () => {
			expect(littleEndian.uint64(new Uint8Array([9, 8, 7, 6, 5, 4, 3, 2, 1]))).toBe(
				144964032628459529n
			);
		});
		test("0 bytes", () => {
			expect(() => littleEndian.uint64(new Uint8Array([]))).toThrow();
		});
	});

	describe("littleEndian.putUint8", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(1);
			littleEndian.putUint8(data, 1, 0);
			expect(data).toStrictEqual(new Uint8Array([1]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(2);
			littleEndian.putUint8(data, 1, 0);
			expect(data).toStrictEqual(new Uint8Array([1, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(2);
			littleEndian.putUint8(data, 1, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 1]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => littleEndian.putUint8(data, 1, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(1);
			expect(() => littleEndian.putUint8(data, 1, 1)).toThrow();
		});
	});
	describe("littleEndian.putUint16", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(2);
			littleEndian.putUint16(data, 258, 0);
			expect(data).toStrictEqual(new Uint8Array([2, 1]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(3);
			littleEndian.putUint16(data, 258, 0);
			expect(data).toStrictEqual(new Uint8Array([2, 1, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(3);
			littleEndian.putUint16(data, 258, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 2, 1]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => littleEndian.putUint16(data, 1, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(2);
			expect(() => littleEndian.putUint16(data, 258, 1)).toThrow();
		});
	});
	describe("littleEndian.putUint32", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(4);
			littleEndian.putUint32(data, 16909060, 0);
			expect(data).toStrictEqual(new Uint8Array([4, 3, 2, 1]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(5);
			littleEndian.putUint32(data, 16909060, 0);
			expect(data).toStrictEqual(new Uint8Array([4, 3, 2, 1, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(5);
			littleEndian.putUint32(data, 16909060, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 4, 3, 2, 1]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => littleEndian.putUint32(data, 1, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(4);
			expect(() => littleEndian.putUint32(data, 16909060, 1)).toThrow();
		});
	});
	describe("littleEndian.putUint64", () => {
		test("sets correct value", () => {
			const data = new Uint8Array(8);
			littleEndian.putUint64(data, 72623859790382856n, 0);
			expect(data).toStrictEqual(new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1]));
		});
		test("excessive bytes", () => {
			const data = new Uint8Array(9);
			littleEndian.putUint64(data, 72623859790382856n, 0);
			expect(data).toStrictEqual(new Uint8Array([8, 7, 6, 5, 4, 3, 2, 1, 0]));
		});
		test("offset", () => {
			const data = new Uint8Array(9);
			littleEndian.putUint64(data, 72623859790382856n, 1);
			expect(data).toStrictEqual(new Uint8Array([0, 8, 7, 6, 5, 4, 3, 2, 1]));
		});
		test("insufficient space", () => {
			const data = new Uint8Array(0);
			expect(() => littleEndian.putUint64(data, 72623859790382856n, 0)).toThrow();
		});
		test("insufficient space with offset", () => {
			const data = new Uint8Array(8);
			expect(() => littleEndian.putUint64(data, 72623859790382856n, 1)).toThrow();
		});
	});
});
