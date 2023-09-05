import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

//JUST TESTING ALL SCOPES ON PERSONAL ACCOUNT
const scopes = [
	"user-read-email",
	// "user-read-private",
	"playlist-read-private",
	"user-read-currently-playing",
	"user-modify-player-state",
	"user-top-read",
	"playlist-modify-public",
	"playlist-modify-private",
	"playlist-read-collaborative",
].join(",");

const params = {
	scope: scopes,
};

const LOGIN_URL =
	"https://accounts.spotify.com/authorize?" +
	new URLSearchParams(params).toString();

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
	pages: {
		signIn: "/login",
	},
	callbacks: {},
};

export default NextAuth(authOptions);
