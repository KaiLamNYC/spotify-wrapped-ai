"use client";
import { getAuthSession } from "@/lib/nextauth";
import { fetchUserTopTracks } from "@/lib/userActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";

type Props = {
	userToken: string;
};

const DashboardTopArtists = ({ userToken }: Props) => {
	const [userTopTracks, setUserTopTracks] = useState([]);
	const authHeader = {
		Authorization: `Bearer ${userToken}`,
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["artists"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api.spotify.com/v1/me/top/artists?limit=5",
				{ headers: authHeader }
			);
			return data.data.items;
		},
		staleTime: 60000,
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
