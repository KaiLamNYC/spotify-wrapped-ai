import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	name: { type: String, required: true, default: "AI Playlist" },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	//FOR LATER TO SORT BY LATEST ETC
	createdAt: {
		type: Date,
		default: Date.now,
	},
	//TO SORT BY LIKES
	likes: {
		type: Number,
		default: 0,
	},
	//SONGS WITHIN THAT PLAYLIST
	songs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Song",
		},
	],
});

//IF DOESNT EXIST IN DB THEN IT CREATES THE MODEL OTHERWISE JUST READS FROM DB
const Playlist =
	mongoose.models.Playlist || mongoose.model("Playlist", playlistSchema);

export default Playlist;
