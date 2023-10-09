import Navbar from "@/components/Navbar";
import React from "react";

type Props = {};

const PlaylistPage = ({ params }) => {
	return (
		<div className='flex'>
			<Navbar />

			<div className='flex flex-col items-center'>
				<h1>THIS IS THE NUMBER {params.id} PLAYLIST</h1>
			</div>
		</div>
	);
};

export default PlaylistPage;
