export { encodeHex, decodeHex } from "./hex.js";
export { Base32Encoding, base32, base32hex } from "./base32.js";
export { Base64Encoding, base64, base64url } from "./base64.js";

export interface Encoding {
	encode: (data: Uint8Array) => string;
	decode: (data: string) => Uint8Array;
}
