import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
	artist: { type: String, required: true },
	//WHEN GENERATING PLAYLIST, NEED TO TRY TO SEARCH FOR EXISTING SONG FIRST BEFORE CREATING NEW SONG DOCUMENT
	name: {
		type: String,
		required: true,
	},
	id: {
		type: String,
		required: true,
	},
	img: {
		type: String,
		required: true,
	},
	album: {
		type: String,
		required: true,
	},
});

//IF DOESNT EXIST IN DB THEN IT CREATES THE MODEL OTHERWISE JUST READS FROM DB
const Song = mongoose.models.Song || mongoose.model("Song", songSchema);

export default Song;
