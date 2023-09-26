import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
	name: { type: String, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},

	likes: {
		type: Number,
		default: 0,
	},
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
