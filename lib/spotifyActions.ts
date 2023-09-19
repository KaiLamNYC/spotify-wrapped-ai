import axios from "axios";
import SpotifyWebApi from "spotify-web-api-node";

export const fetchUserTopTracks = async (userToken: string) => {
	const authHeader = {
		Authorization: `Bearer ${userToken}`,
	};
	const response = await axios.get(
		"https://api.spotify.com/v1/me/top/tracks?limit=5",
		{ headers: authHeader }
	);
	const tracks = response.data;
	return tracks;
};

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

const queryParamString = new URLSearchParams(params);
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifyWebApi({
	clientId: process.env.SPOTIFY_CLIENT_ID,
	clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;

export { LOGIN_URL };
