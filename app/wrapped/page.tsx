"use client";
import Navbar from "@/components/Navbar";
import TopArtists from "@/components/wrapped/TopArtists";
import TopTracks from "@/components/wrapped/TopTracks";
import { useSession } from "next-auth/react";

import React from "react";

type Props = {};

const Wrapped = (props: Props) => {
	const { data: session } = useSession();
	return (
		<div className='flex'>
			<Navbar />

			<div className='flex flex-col items-center'>
				<div>
					<h2>TOP ARTISTS</h2>
					<TopArtists userToken={session?.accessToken} />
				</div>
				<div>
					<h2>TOP TRACKS</h2>
					<TopTracks />
				</div>
			</div>
		</div>
	);
};

export default Wrapped;
