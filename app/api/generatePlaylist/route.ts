import { getAuthSession } from "@/lib/nextauth";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		// const body = await req.json();
		//NEED TO TAKE THE SEED SONG AND THEN MAKE AXIOS REQUEST TO RECOMMENDATION ENDPOINT
		//NEED TO JOIN SEEDS AND SEPARATE WITH %2C IN URL
		//NEED ACCESSTOKEN
		// const { data } = await axios.get(
		// 	`https://api.spotify.com/v1/recommendations?limit=20&seed_tracks=${seed.join(
		// 		"%2C"
		// 	)}`,
		// 	{
		// 		headers: {
		// 			Authorization: `Bearer ${session?.user.accessToken}`,
		// 		},
		// 	}
		// );
		//CREATE PLAYLIST IN DATABASE WITH THE INFORMATION FROM SPOTIFY
		//ITERATE OVER THE ITEMS IN RESPONSE AND CREATE NEW SONG DOCUMENT FOR EACH, THEN CREATE PLAYLIST AS WELL
		//USE MAP TO CREATE THE SONGS, THEN USE THE IDS TO CREATE THE PLAYLIST
		//RETURN THE DATA BACK TO THE USER

		// const session = await getAuthSession();
		return NextResponse.json({
			message: "success",
		});
	} catch (err) {
		return NextResponse.json({
			message: "error",
		});
	}
}
// curl --request GET \
//   --url 'https://api.spotify.com/v1/recommendations?seed_tracks=0c6xIDDpzE81m2q797ordA%2C0c6xIDDpzE81m2q797ordA' \
//   --header 'Authorization: Bearer 1POdFZRZbvb...qqillRxMr2z'
