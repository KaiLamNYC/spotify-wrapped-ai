"use client";
import { getAuthSession } from "@/lib/nextauth";
// import { fetchUserTopTracks } from "@/lib/userActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

type Props = {
	userToken: string;
};

const DashboardSavedPlaylists = ({ userToken }: Props) => {
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

	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching tracks {error.message}</span>;
	}

	return (
		<div className='grid grid-cols-5 gap-4'>
			{data.map((track, index) => (
				<Card key={index}>
					<CardTitle>{track.name}</CardTitle>
					<CardContent>{track.artists[0].name}</CardContent>
				</Card>
			))}
		</div>
	);
};

export default DashboardSavedPlaylists;
