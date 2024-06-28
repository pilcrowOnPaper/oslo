import type { KeyPair, SigningAlgorithm } from "./shared.js";
import type { SHAHash } from "../sha/index.js";

export class RSASSAPKCS1v1_5 implements SigningAlgorithm {
	private hash: SHAHash;
	constructor(hash: SHAHash) {
		this.hash = hash;
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
				name: "RSASSA-PKCS1-v1_5",
				hash: this.hash
			},
			false,
			["verify"]
		);
		return await crypto.subtle.verify("RSASSA-PKCS1-v1_5", cryptoKey, signature, data);
	}

	public async sign(privateKey: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
		const cryptoKey = await crypto.subtle.importKey(
			"pkcs8",
			privateKey,
			{
				name: "RSASSA-PKCS1-v1_5",
				hash: this.hash
			},
			false,
			["sign"]
		);
		const signature = new Uint8Array(
			await crypto.subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, data)
		);
		return signature;
	}

	public async generateKeyPair(modulusLength?: 2048 | 4096): Promise<KeyPair> {
		const cryptoKeyPair = await crypto.subtle.generateKey(
			{
				name: "RSASSA-PKCS1-v1_5",
				hash: this.hash,
				modulusLength: modulusLength ?? 2048,
				publicExponent: new Uint8Array([0x01, 0x00, 0x01])
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

export class RSASSAPSS {
	private hash: SHAHash;
	private saltLength: number;
	constructor(hash: SHAHash) {
		this.hash = hash;
		if (hash === "SHA-1") {
			this.saltLength = 20;
		} else if (hash === "SHA-256") {
			this.saltLength = 32;
		} else if (hash === "SHA-384") {
			this.saltLength = 48;
		} else {
			this.saltLength = 64;
		}
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
				name: "RSA-PSS",
				hash: this.hash
			},
			false,
			["verify"]
		);
		return await crypto.subtle.verify(
			{
				name: "RSA-PSS",
				saltLength: this.saltLength
			},
			cryptoKey,
			signature,
			data
		);
	}

	public async sign(privateKey: Uint8Array, data: Uint8Array): Promise<Uint8Array> {
		const cryptoKey = await crypto.subtle.importKey(
			"pkcs8",
			privateKey,
			{
				name: "RSA-PSS",
				hash: this.hash
			},
			false,
			["sign"]
		);
		const signature = new Uint8Array(
			await crypto.subtle.sign(
				{
					name: "RSA-PSS",
					saltLength: this.saltLength
				},
				cryptoKey,
				data
			)
		);
		return signature;
	}

	public async generateKeyPair(options?: { modulusLength?: 2048 | 4096 }): Promise<KeyPair> {
		const cryptoKeyPair = await crypto.subtle.generateKey(
			{
				name: "RSA-PSS",
				hash: this.hash,
				modulusLength: options?.modulusLength ?? 2048,
				publicExponent: new Uint8Array([0x01, 0x00, 0x01])
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
