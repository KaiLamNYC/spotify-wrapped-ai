import axios from "axios";

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
