import type { SigningAlgorithm } from "./shared.js";
import type { SHAHash } from "../sha/index.js";

export class HMAC implements SigningAlgorithm {
	private hash: SHAHash;
	constructor(hash: SHAHash) {
		this.hash = hash;
	}

	public async verify(key: Uint8Array, signature: Uint8Array, data: Uint8Array): Promise<boolean> {
		const cryptoKey = await crypto.subtle.importKey(
			"raw",
			key,
			{
				name: "HMAC",
				hash: this.hash
			},
			false,
			["verify"]
		);
		return await crypto.subtle.verify("HMAC", cryptoKey, signature, data);
	}

	public async sign(key: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
		const cryptoKey = await crypto.subtle.importKey(
			"raw",
			key,
			{
				name: "HMAC",
				hash: this.hash
			},
			false,
			["sign"]
		);
		const signature = new Uint8Array(await crypto.subtle.sign("HMAC", cryptoKey, data));
		return signature;
	}

	public async generateKey(): Promise<Uint8Array> {
		const cryptoKey: CryptoKey = await crypto.subtle.generateKey(
			{
				name: "HMAC",
				hash: this.hash
			},
			true,
			["sign"]
		);
		const key = new Uint8Array(await crypto.subtle.exportKey("raw", cryptoKey));
		return key;
	}
}
