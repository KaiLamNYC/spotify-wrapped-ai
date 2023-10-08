"use client";

// import useSpotify from "@/lib/useSpotify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Table, TableCell, TableRow } from "../ui/table";

type Props = {};
const DashboardTopTracks = (props: Props) => {
	// const [userTopTracks, setUserTopTracks] = useState([]);
	// const spotifyApi = useSpotify();
	const { data: session, status } = useSession();

	const authHeader = {
		Authorization: `Bearer ${session?.user.accessToken}`,
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["tracks"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=5",
				{ headers: authHeader }
			);
			console.log(data.data.items);
			return data.data.items;
		},
		cacheTime: 24 * 60 * 60 * 1000 + 3000000,
		retry: 10,
		staleTime: 24 * 60 * 60 * 1000,
	});

	//THIS USES CLIENT
	// https://next-auth.js.org/getting-started/client#usesession
	// const { data: session } = useSession();

	//THIS USES ASYNC ON SERVER SIDE
	// https://next-auth.js.org/configuration/nextjs#getserversession
	// console.log(session);
	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching tracks {error.message}</span>;
	}

	function millisToMinutesAndSeconds(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
	}

	return (
		<div>
			<Table className='gap-1'>
				{data.map((track, index) => (
					<TableRow key={index}>
						<TableCell className='font-bold'>{index + 1}</TableCell>
						<TableCell>
							<Image
								src={track?.album.images[0].url}
								alt='album photo'
								width={40}
								height={40}
								// className='p-1'
							/>
						</TableCell>
						<TableCell className='font-semibold'>{track.name}</TableCell>
						<TableCell>{track.artists[0].name}</TableCell>
						<TableCell>{track.album.name}</TableCell>
						<TableCell>
							{millisToMinutesAndSeconds(track.duration_ms)}
						</TableCell>
					</TableRow>
				))}
			</Table>
		</div>
	);
};

export default DashboardTopTracks;
