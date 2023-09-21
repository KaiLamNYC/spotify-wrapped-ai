import axios from "axios";
import { DefaultSession, getServerSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "./spotifyActions";

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

async function refreshAccessToken(token) {
	try {
		//SETTING TOKENS
		spotifyApi.setAccessToken(token.accessToken);
		spotifyApi.setRefreshToken(token.refreshToken);

		//GETTING BACK NEW ACCESS TOKEN
		const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
		console.log("refershed token", refreshedToken);

		return {
			...token,
			accessToken: refreshedToken.accessToken,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			//REPLACE IF NEW ONE CAME BACK OTHERWISE KEEP OLD ONE SINCE DOESNT EXPIRE
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (e) {
		console.log(e);
		return {
			...token,
			error: "RefreshAccessTokenError",
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

	// https://next-auth.js.org/configuration/callbacks
	callbacks: {
		async jwt({ token, account, user }) {
			// Persist the OAuth access_token to the token right after signin

			//SIGN IN FOR THE FIRST TIME
			if (account) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: Date.now() + account.expires_at * 1000,
				};
			}

			// ALREADY LOGGED IN
			//Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				console.log("existing access token is valid");
				return token;
			}

			//ACCESS TOKEN EXPIRED NEED TO REFRESH
			console.log("access token expired refreshing");
			return await refreshAccessToken(token);
		},
		//ADDING ACCESSTOKEN TO SESSION
		async session({ session, token }) {
			session.user.accessToken = token.accessToken;
			// session.user.refreshToken = token.refreshToken;
			// session.user.username = token.username;

			return session;
		},
	},
};

export const getAuthSession = () => {
	return getServerSession(authOptions);
};
