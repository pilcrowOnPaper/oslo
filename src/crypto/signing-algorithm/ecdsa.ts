import type { SHAHash } from "../sha/index.js";
import type { SigningAlgorithm, KeyPair } from "./shared.js";

export type ECDSACurve = "P-256" | "P-384" | "P-521";

export class ECDSA implements SigningAlgorithm {
	private hash: SHAHash;
	private curve: ECDSACurve;

	constructor(hash: SHAHash, curve: ECDSACurve) {
		this.hash = hash;
		this.curve = curve;
	}

	public async sign(privateKey: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
		const cryptoKey = await crypto.subtle.importKey(
			"pkcs8",
			privateKey,
			{
				name: "ECDSA",
				namedCurve: this.curve
			},
			false,
			["sign"]
		);
		const signature = new Uint8Array(
			await crypto.subtle.sign(
				{
					name: "ECDSA",
					hash: this.hash
				},
				cryptoKey,
				data
			)
		);
		return signature;
	}

	public async verify(
		publicKey: Uint8Array,
		signature: Uint8Array,
		data: Uint8Array
	): Promise<boolean> {
		const cryptoKey = await crypto.subtle.importKey(
			"spki",
			publicKey,
			{
				name: "ECDSA",
				namedCurve: this.curve
			},
			false,
			["verify"]
		);
		return await crypto.subtle.verify(
			{
				name: "ECDSA",
				hash: this.hash
			},
			cryptoKey,
			signature,
			data
		);
	}

	public async generateKeyPair(): Promise<KeyPair> {
		const cryptoKeyPair = await crypto.subtle.generateKey(
			{
				name: "ECDSA",
				namedCurve: this.curve
			},
			true,
			["sign"]
		);
		const privateKey = new Uint8Array(
			await crypto.subtle.exportKey("pkcs8", cryptoKeyPair.privateKey)
		);
		const publicKey = new Uint8Array(
			await crypto.subtle.exportKey("spki", cryptoKeyPair.publicKey)
		);
		return {
			privateKey,
			publicKey
		};
	}
}
