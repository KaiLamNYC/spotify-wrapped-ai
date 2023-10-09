import axios from "axios";
import { DefaultSession, getServerSession } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import User from "./models/user.model";
import { connectToDB } from "./mongoose";
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
		// const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
		// console.log("refershed token", refreshedToken);
		const body = {
			grant_type: "refresh_token",
			refresh_token: token.refreshToken,
		};
		let refreshedToken = {};
		const response = await axios
			.post("https://accounts.spotify.com/api/token", body, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization:
						"Basic " +
						Buffer.from(
							process.env.SPOTIFY_CLIENT_ID +
								":" +
								process.env.SPOTIFY_CLIENT_SECRET
						).toString("base64"),
				},
			})
			.then((response) => {
				if (response.status === 200) {
					refreshedToken = response.data;
				}
			})
			.catch((error) => {
				// Handle any errors here
				console.error(error);
			});

		return {
			...token,
			accessToken: refreshedToken.access_token,
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
				spotifyApi.setAccessToken(account.access_token);
				spotifyApi.setRefreshToken(account.refresh_token);
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000,
				};
			}

			// ALREADY LOGGED IN
			//Return previous token if the access token has not expired yet
			if (Date.now() < token.accessTokenExpires) {
				console.log(`existing token is valid: ${token.accessTokenExpires}`);
				return token;
			}

			//ACCESS TOKEN EXPIRED NEED TO REFRESH
			console.log("access token expired refreshing");
			return await refreshAccessToken(token);
		},
		//ADDING ACCESSTOKEN TO SESSION
		async session({ session, token }) {
			session.user.accessToken = token.accessToken;

			//SEARCHING DB WITH EMAIL FROM SESSION
			const sessionUser = await User.findOne({ email: session.user.email });
			//SETTING THE NEW IMAGE
			session.user.image = sessionUser.img;
			//SETTING SPOTIFY ID FOR CREATE PLAYLIST
			session.user.spoifyId = sessionUser.spotifyId;
			//SETTING MONGODB ID
			session.user.mongodbId = sessionUser._id;
			return session;
		},
		async signIn({ profile }) {
			// console.log(profile);
			try {
				await connectToDB();
				//CHECK IF USER EXISTS IN DB
				const userExists = await User.findOne({ email: profile.email });

				//CREATING IF DOESNT EXIST
				if (!userExists) {
					const user = await User.create({
						name: profile.display_name,
						//TAKING THE LARGER IMAGE FROM THE IMAGE ARRAY
						img: profile.images[1].url,
						email: profile.email,
						spotifyId: profile.id,
					});
				}

				//IF NOT THEN CREATE USER
				return true;
			} catch (err) {
				console.log(err);
				return false;
			}
		},
	},
};

export const getAuthSession = () => {
	return getServerSession(authOptions);
};
