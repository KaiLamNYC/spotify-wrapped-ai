"use client";
import Navbar from "@/components/Navbar";
import TopArtists from "@/components/wrapped/TopArtists";
import TopTracks from "@/components/wrapped/TopTracks";

import React from "react";

type Props = {};

const Wrapped = (props: Props) => {
	return (
		<div className='flex'>
			<Navbar />

			<div className='grid grid-cols-5 grid-rows-2 gap-1'>
				<div className='col-span-5'>
					<h2>TOP ARTISTS</h2>
					<TopArtists />
				</div>

				<div className='col-span-5 row-start-2'>
					<h2>TOP TRACKS</h2>
					<TopTracks />
				</div>
			</div>
		</div>
	);
};

export default Wrapped;
