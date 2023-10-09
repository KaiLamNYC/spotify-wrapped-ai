import Playlist from "@/lib/models/playlist.model";
import Song from "@/lib/models/song.model";
import User from "@/lib/models/user.model";
import { connectToDB } from "@/lib/mongoose";
import { getAuthSession } from "@/lib/nextauth";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
	try {
		connectToDB();

		const body = await req.json();
		const session = await getAuthSession();

		//GETTING THE PLAYLIST FROM SPOTIFY
		const { data } = await axios.get(
			`https://api.spotify.com/v1/recommendations?limit=5&seed_tracks=${body.seed.join(
				"%2C"
			)}&&min_popularity=50`,
			{
				headers: {
					Authorization: `Bearer ${session?.user.accessToken}`,
				},
			}
		);
		//FIRST CREATE PLAYLIST IN DB
		const newPlaylist = new Playlist({
			author: session.user.mongodbId,
		});
		//AFTER THIS I HAVE ACCESS TO PLAYLIST OBJECT
		await newPlaylist.save();

		// NEED TO ADD PLAYLIST TO USER AND SAVE
		const user = await User.findOne({ email: session.user.email });
		user.createdPlaylists.push(newPlaylist._id);
		await user.save();

		//MAP OVER THE SONGS FROM SPOTIFY RECS AND CREATE THE SONGS DOCUMENTS W UPSERT
		const songPromises = data.tracks.map(async (track: any) => {
			//CHECKING IF TRACK EXISTS
			const existingTrack = await Song.findOne({ trackId: track.id });
			//IF NO TRACK EXISTS
			if (!existingTrack) {
				const newSong = await Song.create({
					artist: track.artists[0].name,
					name: track.name,
					trackId: track.id,
					album: track.album.name,
					img: track.album.images[0].url,
				});
				//PUSH TRACKID TO THE PLAYLIST
				// newPlaylist.songs.push(newSong._id);
				// await newPlaylist.save();
				return newSong._id;
			} else {
				//PUSH TRACKID TO THE PLAYLIST SINCE SONG EXISTS IN DB
				// newPlaylist.songs.push(existingTrack._id);
				// await newPlaylist.save();
				return existingTrack._id;
			}
		});

		// Wait for all song creation/upsert promises to complete
		const songIds = await Promise.all(songPromises);

		// Add the song IDs to the playlist
		newPlaylist.songs = songIds;

		await newPlaylist.save();

		return NextResponse.json({
			message: "success",
			payload: newPlaylist,
		});
	} catch (err) {
		return NextResponse.json({
			message: "error",
			payload: `${err}`,
		});
	}
}
