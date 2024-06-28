import { sha256 } from "../crypto/index.js";
import { base64, base64url } from "../encoding/index.js";
import { addToDate, TimeSpan } from "../index.js";

export class OAuth2Client {
	public clientId: string;

	public authorizeEndpoint: string;
	public tokenEndpoint: string;

	private redirectURI: string | null = null;

	constructor(
		clientId: string,
		authorizeEndpoint: string,
		tokenEndpoint: string,
		options?: {
			redirectURI?: string;
		}
	) {
		this.clientId = clientId;
		this.authorizeEndpoint = authorizeEndpoint;
		this.tokenEndpoint = tokenEndpoint;
		if (options !== undefined && options.redirectURI !== undefined) {
			this.redirectURI = options.redirectURI;
		}
	}

	public createAuthorizationURL(): AuthorizationURL {
		const url = new AuthorizationURL(this.authorizeEndpoint, this.clientId);
		if (this.redirectURI !== null) {
			url.setRedirectURI(this.redirectURI);
		}
		return url;
	}

	public createAccessTokenRequestContext(authorizationCode: string): AccessTokenRequestContext {
		const request = new AccessTokenRequestContext(this.clientId, authorizationCode);
		if (this.redirectURI !== null) {
			request.setRedirectURI(this.redirectURI);
		}
		return request;
	}

	public createRefreshTokenRequestContext(refreshToken: string): RefreshTokenRequestContext {
		const request = new RefreshTokenRequestContext(this.clientId, refreshToken);
		return request;
	}

	public async sendAccessTokenRequest<_TokenResponseBody extends TokenResponseBody>(
		context: AccessTokenRequestContext
	): Promise<_TokenResponseBody> {
		return await this.sendTokenRequest(context);
	}

	public async sendRefreshTokenRequest<_TokenResponseBody extends TokenResponseBody>(
		context: RefreshTokenRequestContext
	): Promise<_TokenResponseBody> {
		return await this.sendTokenRequest(context);
	}

	private async sendTokenRequest<_TokenResponseBody extends TokenResponseBody>(
		context: OAuth2RequestContext
	): Promise<_TokenResponseBody> {
		const response = await fetch(context.toFetchRequest("POST", this.tokenEndpoint));
		const result: _TokenResponseBody | TokenErrorResponseBody = await response.json();
		if ("access_token" in result) {
			return result as _TokenResponseBody;
		}
		const request = new OAuth2Request("POST", this.tokenEndpoint, context.headers, context.body);
		if ("error_description" in result) {
			throw new OAuth2RequestError(request, {
				message: result.error,
				description: result.error_description
			});
		}
		throw new OAuth2RequestError(request, {
			message: result.error
		});
	}
}

export class TokenRevocationClient {
	public clientId: string;
	public tokenRevocationEndpoint: string;

	constructor(clientId: string, tokenRevocationEndpoint: string) {
		this.clientId = clientId;
		this.tokenRevocationEndpoint = tokenRevocationEndpoint;
	}

	public createAccessTokenRevocationRequestContext(
		accessToken: string
	): TokenRevocationRequestContext {
		const request = new TokenRevocationRequestContext(this.clientId, accessToken);
		request.setTokenTypeHint("access_token");
		return request;
	}

	public createRefreshTokenRevocationRequestContext(
		refreshToken: string
	): TokenRevocationRequestContext {
		const request = new TokenRevocationRequestContext(this.clientId, refreshToken);
		request.setTokenTypeHint("refresh_token");
		return request;
	}

	public async sendTokenRevocationRequest(context: TokenRevocationRequestContext): Promise<void> {
		const response = await fetch(context.toFetchRequest("POST", this.tokenRevocationEndpoint));
		if (response.status === 200) {
			return;
		}
		if (response.status === 503) {
			const retryAfterHeader = response.headers.get("Retry-After");
			if (retryAfterHeader === null) {
				throw new TokenRevocationRetryError();
			}
			const retryAfterSeconds = parseInt(retryAfterHeader);
			if (!Number.isNaN(retryAfterSeconds)) {
				throw new TokenRevocationRetryError({
					retryAfter: addToDate(new Date(), new TimeSpan(retryAfterSeconds, "s"))
				});
			}
			const retryAfterDate = parseDateString(retryAfterHeader);
			if (retryAfterDate !== null) {
				throw new TokenRevocationRetryError({
					retryAfter: retryAfterDate
				});
			}
			throw new TokenRevocationRetryError();
		}
		const result: TokenErrorResponseBody = await response.json();
		const request = new OAuth2Request(
			"POST",
			this.tokenRevocationEndpoint,
			context.headers,
			context.body
		);
		if ("error_description" in result) {
			throw new OAuth2RequestError(request, {
				message: result.error,
				description: result.error_description
			});
		}
		throw new OAuth2RequestError(request, {
			message: result.error
		});
	}
}

export class OAuth2Request {
	public method: string;
	public url: string;
	public headers: Headers;
	public body: URLSearchParams;

	constructor(method: string, url: string, headers: Headers, body: URLSearchParams) {
		this.method = method;
		this.url = url;
		this.headers = headers;
		this.body = body;
	}
}

export class AuthorizationURL extends URL {
	constructor(authorizeEndpoint: string, clientId: string) {
		super(authorizeEndpoint);
		this.searchParams.set("response_type", "code");
		this.searchParams.set("client_id", clientId);
	}

	public setRedirectURI(redirectURI: string): void {
		this.searchParams.set("redirect_uri", redirectURI);
	}

	public appendScopes(...scopes: string[]): void {
		if (scopes.length < 1) {
			return;
		}
		let scopeValue = scopes.join(" ");
		const existingScopes = this.searchParams.get("scope");
		if (existingScopes !== null) {
			scopeValue = " " + existingScopes;
		}
		this.searchParams.set("scope", scopeValue);
	}

	public setState(state: string): void {
		this.searchParams.set("state", state);
	}

	public setS256CodeChallenge(codeVerifier: string): void {
		const codeChallengeBytes = sha256(new TextEncoder().encode(codeVerifier));
		const codeChallenge = base64url.encode(codeChallengeBytes, {
			includePadding: false
		});
		this.searchParams.set("code_challenge", codeChallenge);
		this.searchParams.set("code_challenge_method", "S256");
	}

	public setPlainCodeChallenge(codeVerifier: string): void {
		this.searchParams.set("code_challenge", codeVerifier);
		this.searchParams.set("code_challenge_method", "plain");
	}
}

export class OAuth2RequestContext {
	public body = new URLSearchParams();
	public headers = new Headers();

	public clientId: string;

	constructor(clientId: string) {
		this.clientId = clientId;
		this.body.set("client_id", clientId);
		this.headers.set("Content-Type", "application/x-www-form-urlencoded");
		this.headers.set("Accept", "application/json");
		this.headers.set("User-Agent", "oslo");
	}

	public authenticateWithRequestBody(clientSecret: string): void {
		this.body.set("client_secret", clientSecret);
	}

	public authenticateWithHTTPBasicAuth(clientPassword: string): void {
		const authorizationHeader = base64.encode(
			new TextEncoder().encode(`${this.clientId}:${clientPassword}`)
		);
		this.headers.set("Authorization", authorizationHeader);
	}

	public toFetchRequest(method: string, url: string): Request {
		return new Request(url, {
			method,
			body: this.body,
			headers: this.headers
		});
	}
}

export class AccessTokenRequestContext extends OAuth2RequestContext {
	constructor(clientId: string, authorizationCode: string) {
		super(clientId);
		this.body.set("grant_type", "authorization_code");
		this.body.set("code", authorizationCode);
	}

	public setCodeVerifier(codeVerifier: string): void {
		this.body.set("code_verifier", codeVerifier);
	}

	public setRedirectURI(redirectURI: string): void {
		this.body.set("redirect_uri", redirectURI);
	}
}

export class RefreshTokenRequestContext extends OAuth2RequestContext {
	constructor(clientId: string, refreshToken: string) {
		super(clientId);
		this.body.set("grant_type", "refresh_token");
		this.body.set("refresh_token", refreshToken);
	}

	public appendScopes(...scopes: string[]): void {
		if (scopes.length < 1) {
			return;
		}
		let scopeValue = scopes.join(" ");
		const existingScopes = this.body.get("scope");
		if (existingScopes !== null) {
			scopeValue = scopeValue + " " + existingScopes;
		}
		this.body.set("scope", scopeValue);
	}
}

export class TokenRevocationRequestContext extends OAuth2RequestContext {
	constructor(clientId: string, token: string) {
		super(clientId);
		this.body.set("token", token);
	}

	public setTokenTypeHint(tokenType: "access_token" | "refresh_token"): void {
		this.body.set("token_type_hint", tokenType);
	}
}

export class OAuth2RequestError extends Error {
	public request: OAuth2Request;
	public description: string | null;
	constructor(
		request: OAuth2Request,
		options?: {
			message?: string;
			description?: string;
		}
	) {
		super(options?.message ?? "Unknown error");
		this.request = request;
		this.description = options?.description ?? null;
	}
}

export class TokenRevocationRetryError extends Error {
	public retryAfter: Date | null;
	constructor(options?: { retryAfter?: Date }) {
		super("retry revocation");
		this.retryAfter = options?.retryAfter ?? null;
	}
}

export interface TokenResponseBody {
	access_token: string;
	token_type: string;
	expires_in?: number;
	refresh_token?: string;
	scope?: string;
}

interface TokenErrorResponseBody {
	error: string;
	error_description?: string;
}

export function generateCodeVerifier(): string {
	const randomValues = new Uint8Array(32);
	crypto.getRandomValues(randomValues);
	return base64url.encode(randomValues, {
		includePadding: false
	});
}

export function generateState(): string {
	const randomValues = new Uint8Array(32);
	crypto.getRandomValues(randomValues);
	return base64url.encode(randomValues, {
		includePadding: false
	});
}

function parseDateString(dateString: string): Date | null {
	try {
		return new Date(dateString);
	} catch {
		return null;
	}
}
