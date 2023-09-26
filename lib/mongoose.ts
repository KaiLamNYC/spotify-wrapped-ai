import mongoose from "mongoose";

//VAR TO CHECK IF WERE CONNECTED TO MONGOOSE
let isConnected = false;

export const connectToDB = async () => {
	mongoose.set("strictQuery", true);
	//IF NO URI SET IN ENV VAR
	if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");
	//IF ALREADY CONNECTED TO DB
	if (isConnected) return console.log("Already connected to MONGODB");

	try {
		await mongoose.connect(process.env.MONGODB_URL);
		isConnected = true;
		console.log("Connected to MONGODB");
	} catch (err) {
		console.log(err);
	}
};
