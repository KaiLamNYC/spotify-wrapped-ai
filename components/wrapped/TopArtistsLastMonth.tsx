"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";

type Props = {};

const TopArtistsLastMonth = (props: Props) => {
	const { data: session } = useSession();
	const authHeader = {
		Authorization: `Bearer ${session?.user?.accessToken}`,
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["topArtistLastMonth"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=10",
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
		<div className='flex flex-row flex-wrap'>
			{data.map((artist, index) => (
				<Card key={index} className='flex items-center flex-col p-4 w-56'>
					<Avatar className='w-24 h-24 mt-2'>
						<AvatarImage src={artist?.images[0].url} />
					</Avatar>
					<CardTitle className='text-lg whitespace-normal'>
						{artist.name}
					</CardTitle>

					<CardDescription>{artist.type}</CardDescription>
				</Card>
			))}
		</div>
	);
};

export default TopArtistsLastMonth;
