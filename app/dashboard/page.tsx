// import { useSession } from "next-auth/react";
// "use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {};

const Dashboard = async (props: Props) => {
	// const [topTracks, setTopTracks] = useState([]);
	// const { data: session } = useSession();

	// const authHeader = {
	// 	Authorization: `Bearer ${session.accessToken}`,
	// };

	// const response = await axios.get(
	// 	"https://api.spotify.com/v1/me/top/tracks?limit=3",
	// 	{
	// 		headers: authHeader,
	// 	}
	// );
	// const data = response.data;
	// setTopTracks(data.items);

	// console.log(session.user.accessToken);
	return (
		<div>
			<h1>DASHBOARD</h1>
			{/* <p>{session.accessToken}</p> */}
		</div>
	);
};

export default Dashboard;
