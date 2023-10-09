import Navbar from "@/components/Navbar";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { getPlaylist } from "@/lib/user.actions";
import Image from "next/image";
import React from "react";

type Props = {};

const PlaylistPage = async ({ params }: { params: { id: string } }) => {
	const playlist = await getPlaylist(params.id);
	console.log(playlist);
	console.log("testing playlist page");

	return (
		<div className='flex'>
			<Navbar />

			<div className='flex flex-col justify-center items-center w-2/3 '>
				<h1>HERE IS YOUR GENERATED PLAYLIST</h1>
				<p>{playlist[0].name}</p>
				{/* <div>
					{playlist[0].songs.map((track, index) => (
						<div key={index}>
							<p>{track.name}</p>
						</div>
					))}
				</div> */}
				{/* <Table className='gap-1'>
					{playlist[0].songs.map((track, index) => (
						<TableRow key={index}>
							<TableCell className='font-bold'>{index + 1}</TableCell>
							<TableCell>
								<Image
									src={track.img}
									alt='album photo'
									width={40}
									height={40}
									// className='p-1'
								/>
							</TableCell>
							<TableCell className='font-semibold'>{track.name}</TableCell>
							<TableCell>{track.artist}</TableCell>
							<TableCell>{track.album}</TableCell>
						</TableRow>
					))}
				</Table> */}
				{playlist.length === 0 ? (
					<p>LOADING</p>
				) : (
					<Table>
						{playlist[0].songs.map((track, index) => (
							<TableRow key={index}>
								<TableCell>{track.name}</TableCell>
							</TableRow>
						))}
					</Table>
				)}
			</div>
		</div>
	);
};

export default PlaylistPage;
