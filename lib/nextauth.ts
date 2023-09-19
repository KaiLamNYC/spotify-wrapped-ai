import axios from "axios";
import { DefaultSession, getServerSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

//TYPESCRIPT STUFF
// https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties
// declare module "next-auth" {
// 	interface Session extends DefaultSession {
// 		user: {
// 			id: string;
// 		} & DefaultSession["user"];
// 	}
// }

// declare module "next-auth/jwt" {
// 	interface JWT {
// 		id: string;
// 	}
// }

//JUST TESTING ALL SCOPES ON PERSONAL ACCOUNT
const scopes = [
	"user-read-email",
	"user-read-private",
	"user-top-read",
	"user-library-modify",
	"playlist-modify-public",
	"playlist-modify-private",
].join(",");

const params = {
	scope: scopes,
};

const LOGIN_URL =
	"https://accounts.spotify.com/authorize?" +
	new URLSearchParams(params).toString();

async function refreshAccessToken(token) {
	try {
		const params = new URLSearchParams();
		params.append("grant_type", "refresh_token");
		params.append("refresh_token", token.refreshToken);
		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				Authorization:
					"Basic " +
					new Buffer.from(
						process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_SECRET
					).toString("base64"),
			},
			body: params,
		});
		const data = await response.json();
		return {
			...token,
			accessToken: data.access_token,
			//IF NO REFRESH TOKEN THEN JUST PASS SAME TOKEN AS BEFORE
			refreshToken: data.refresh_token ?? token.refreshToken,
			accessTokenExpires: Date.now() + data.expires_in * 1000,
		};
	} catch (e) {
		return {
			...token,
			error: "refresh access token error",
		};
	}
}
// async function refreshAccessToken(token) {
// 	const params = new URLSearchParams();
// 	params.append("grant_type", "refresh_token");
// 	params.append("refresh_token", token.refreshToken);
// 	const response = await fetch("https://accounts.spotify.com/api/token", {
// 		method: "POST",
// 		headers: {
// 			Authorization:
// 				"Basic " +
// 				new Buffer.from(
// 					process.env.SPOTIFY_CLIENT_ID +
// 						":" +
// 						process.env.SPOTIFY_CLIENT_SECRET
// 				).toString("base64"),
// 		},
// 		body: params,
// 	});
// 	const data = await response.json();
// 	return {
// 		...token,
// 		accessToken: data.access_token,
// 		refreshToken: data.refresh_token ?? token.refreshToken,
// 		accessTokenExpires: Date.now() + data.expires_in * 1000,
// 	};
// }

export const authOptions = {
	// Configure one or more authentication providers
	providers: [
		SpotifyProvider({
			clientId: process.env.SPOTIFY_CLIENT_ID as string,
			clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET as string,
	// pages: {
	// 	signIn: "/login",
	// },
	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		async jwt({ token, account }) {
			// Persist the OAuth access_token to the token right after signin

			//SIGN IN FOR THE FIRST TIME
			if (account) {
				token.accessToken = account.access_token;
				token.refreshToken = account.refresh_token;
				token.accessTokenExpires = account.expires_at;
				return token;
			}
			//ALREADY SIGNED IN
			//CHECK ACCESS TOKEN IF EXPIRED
			if (Date.now() < token.accessTokenExpires * 1000) {
				console.log("existing access token is valid");
				return token;
			}

			//ACCESS TOKEN EXPIRED NEED TO REFRESH
			console.log("access token expired refreshing");
			return await refreshAccessToken(token);
		},
		//ADDING ACCESSTOKEN TO SESSION
		async session({ session, token, user }) {
			session.accessToken = token.accessToken;

			return session;
		},
	},
};

export const getAuthSession = () => {
	return getServerSession(authOptions);
};
