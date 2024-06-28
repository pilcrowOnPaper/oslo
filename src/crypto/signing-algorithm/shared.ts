export interface SigningAlgorithm {
	sign(key: Uint8Array, data: Uint8Array): Promise<Uint8Array>;
	verify(key: Uint8Array, signature: Uint8Array, data: Uint8Array): Promise<boolean>;
}

export interface KeyPair {
	publicKey: Uint8Array;
	privateKey: Uint8Array;
}
