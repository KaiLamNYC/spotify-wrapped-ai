// "use client";
import Navbar from "@/components/Navbar";
import TopArtists from "@/components/wrapped/TopArtists";
import TopTracks from "@/components/wrapped/TopTracks";
import { useSession } from "next-auth/react";

import React, { useEffect, useState } from "react";

type Props = {};

const Wrapped = (props: Props) => {
	// const { data: session } = useSession();
	// const [userToken, setUserToken] = useState("");

	return (
		<div className='flex'>
			<Navbar />

			<div className='flex flex-col items-center'>
				<div className='flex flex-col items-center'>
					<h2>TOP ARTISTS</h2>
					<TopArtists />
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
