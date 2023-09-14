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
		staleTime: 60000,
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
		<div className='grid grid-cols-1 grid-rows-5 gap-2'>
			{data.map((track, index) => (
				<Card key={index} className='flex flex-row items-center'>
					{/* <Avatar className='mr-2'>
						<AvatarImage src={track?.album.images[0].url} />
					</Avatar> */}
					<CardDescription className=''>{index + 1}</CardDescription>
					<Image
						src={track?.album.images[0].url}
						alt='album photo'
						width={60}
						height={60}
						className='p-1'
					/>
					<CardTitle className='text-lg mr-12'>{track.name}</CardTitle>

					<CardDescription className='mr-4'>
						{track.artists[0].name}
					</CardDescription>
					<CardDescription className='mr-5'>{track.album.name}</CardDescription>
					<Heart className='mr-5' />
					<CardDescription className='mr-2'>
						{millisToMinutesAndSeconds(track.duration_ms)}
					</CardDescription>
				</Card>
			))}
		</div>
	);
};

export default DashboardTopTracks;
