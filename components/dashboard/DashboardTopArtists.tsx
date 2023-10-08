"use client";
import { getAuthSession } from "@/lib/nextauth";
// import { fetchUserTopTracks } from "@/lib/userActions";
// import useSpotify from "@/lib/useSpotify";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

type Props = {};

const DashboardTopArtists = (props: Props) => {
	const { data: session } = useSession();
	console.log(session);
	const authHeader = {
		Authorization: `Bearer ${session?.user.accessToken}`,
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["artists"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=5",
				{ headers: authHeader }
			);
			return data.data.items;
		},

		cacheTime: 24 * 60 * 60 * 1000 + 3000000,
		retry: 10,
		staleTime: 24 * 60 * 60 * 1000,
	});

	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching tracks {error.message}</span>;
	}

	return (
		<div className='grid grid-cols-5 gap-4'>
			{data.map((artist, index) => (
				<Card key={index} className='flex flex-col items-center'>
					<Avatar className='w-24 h-24 mt-2'>
						<AvatarImage src={artist?.images[0].url} />
					</Avatar>
					<CardTitle className='text-lg'>{artist.name}</CardTitle>

					<CardDescription>{artist.type}</CardDescription>
				</Card>
			))}
		</div>
	);
};

export default DashboardTopArtists;
