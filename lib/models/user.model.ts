import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},

	img: {
		type: String,
		required: true,
	},
	//USERS HISTORY OF CREATIONS
	createdPlaylists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Playlist",
		},
	],
	//USERS LIKED/FAVORITE PLAYLIST
	favoritePlaylists: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Playlist",
		},
	],
});

//IF DOESNT EXIST IN DB THEN IT CREATES THE MODEL OTHERWISE JUST READS FROM DB
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
