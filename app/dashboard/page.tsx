import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardSavedPlaylists from "@/components/dashboard/DashboardSavedPlaylists";
import DashboardTopArtists from "@/components/dashboard/DashboardTopArtists";
import DashboardTopTracks from "@/components/dashboard/DashboardTopTracks";
import LogOut from "@/components/LogOutButton";
import Navbar from "@/components/Navbar";
import PlaybackFooter from "@/components/PlaybackFooter";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const Dashboard = (props: Props) => {
	// const [userToken, setUserToken] = useState("");
	// const { data: session } = useSession();
	// const session = getAuthSession();
	// console.log(session);
	// if(!session?.accessToken){
	// 	redirect('/')
	// }

	return (
		<main className='p-4 flex flex-row'>
			<Navbar />

			<div className='grid grid-cols-5 grid-rows-8 gap-1'>
				<div className='col-span-5 row-span-2'>
					<DashboardHeader />
				</div>
				<div className='col-span-5 row-span-2 row-start-3'>
					<h4 className='text-xl'>Top artists of the year</h4>
					<DashboardTopArtists />
				</div>
				<div className='col-span-5 row-span-2 row-start-5'>
					<h4 className='text-xl'>Top tracks of the year</h4>
					{/* <DashboardTopTracks userToken={session?.user?.accessToken} /> */}
				</div>
				<div className='col-span-5 row-span-2 row-start-7'>
					<h4 className='text-xl bold'>Saved Playlists</h4>

					{/* <DashboardSavedPlaylists userToken={userToken} /> */}
				</div>
			</div>

			{/* <PlaybackFooter /> */}
		</main>
	);
};

export default Dashboard;
