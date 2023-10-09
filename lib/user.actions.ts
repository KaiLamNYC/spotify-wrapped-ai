import Playlist from "./models/playlist.model";
import Song from "./models/song.model";

import { connectToDB } from "./mongoose";

export async function getPlaylist(id) {
	connectToDB();

	try {
		const playlist = await Playlist.find({ _id: id })
			.populate({
				path: "songs",
				model: Song,
				select: "name img album artist", // Select the fields you want to populate
			})
			.exec();

		if (!playlist) {
			return "no playlist found";
		}

		return playlist;
	} catch (err) {
		console.error(err);
	}
}
