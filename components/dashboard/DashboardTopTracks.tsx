"use client";
import { getAuthSession } from "@/lib/nextauth";
import { fetchUserTopTracks } from "@/lib/userActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { Table, TableCell, TableRow } from "../ui/table";

type Props = {
	userToken: string;
};

const DashboardTopTracks = ({ userToken }: Props) => {
	const [userTopTracks, setUserTopTracks] = useState([]);
	const authHeader = {
		Authorization: `Bearer ${userToken}`,
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["tracks"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api.spotify.com/v1/me/top/tracks?limit=5",
				{ headers: authHeader }
			);
			console.log(data.data.items);
			return data.data.items;
		},
		cacheTime: 24 * 60 * 60 * 1000 + 3000000,

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
					// <Card key={index} className='flex flex-row items-center'>
					// 	{/* <Avatar className='mr-2'>
					// 		<AvatarImage src={track?.album.images[0].url} />
					// 	</Avatar> */}
					// 	<CardDescription className=''>{index + 1}</CardDescription>
					// <Image
					// 	src={track?.album.images[0].url}
					// 	alt='album photo'
					// 	width={60}
					// 	height={60}
					// 	className='p-1'
					// />
					// 	<CardTitle className='text-lg mr-12'>{track.name}</CardTitle>

					// 	<CardDescription className='mr-4'>
					// 		{track.artists[0].name}
					// 	</CardDescription>
					// 	<CardDescription className='mr-5'>{track.album.name}</CardDescription>
					// 	<Heart className='mr-5' />
					// 	<CardDescription className='mr-2'>
					// 		{millisToMinutesAndSeconds(track.duration_ms)}
					// 	</CardDescription>
					// </Card>

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
