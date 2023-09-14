"use client";
import DashboardSavedPlaylists from "@/components/dashboard/DashboardSavedPlaylists";
import DashboardTopArtists from "@/components/dashboard/DashboardTopArtists";
import DashboardTopTracks from "@/components/dashboard/DashboardTopTracks";
import LogOut from "@/components/LogOutButton";
import { Card, CardHeader } from "@/components/ui/card";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const Dashboard = (props: Props) => {
	const [userToken, setUserToken] = useState("");
	const { data: session } = useSession();

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

	useEffect(() => {
		if (session && session?.accessToken) {
			setUserToken(session?.accessToken);
		}

		// const fetchUserTopTracks = async () => {
		// 	const data = await axios.get(
		// 		"https://api.spotify.com/v1/me/top/tracks?limit=5",
		// 		{ headers: authHeader }
		// 	);
		// 	console.log(data);
		// 	// setUserTopTracks(data);
		// };
		// fetchUserTopTracks();
	}, [session]);
	console.log(session);
	return (
		<main className='p-8 '>
			{/* <div className='flex items-center'>
				<h2 className='mr-2 text-3xl font-bold tracking-tight'>Dashboard</h2>
				<LogOut />
			</div> */}

			<div className='grid grid-cols-5 grid-rows-9 gap-4'>
				<div className='col-span-5 row-span-2'>user profile</div>
				<div className='col-span-5 row-span-2 row-start-3'>
					<DashboardTopArtists userToken={userToken} />
				</div>
				<div className='col-span-5 row-span-3 row-start-5'>
					<DashboardTopTracks userToken={userToken} />
				</div>
				<div className='col-span-5 row-span-2 row-start-8'>
					<DashboardSavedPlaylists userToken={userToken} />
				</div>
			</div>

			{/* <div className='grid grid-cols-2 grid-rows-2 gap-4'>
				<div className='col-span-2'>
					<Card>
						<CardHeader>User Profile</CardHeader>
					</Card>
				</div>
				<div className='row-start-2'>
					<Card>
						<CardHeader>User Profile</CardHeader>
					</Card>
				</div>
				<div className='row-start-2'>
					<Card>
						<CardHeader>User Profile</CardHeader>
					</Card>
				</div>
			</div> */}

			{/* <h2>{session?.user.name} Top Songs</h2> */}
		</main>
	);
};

export default Dashboard;
