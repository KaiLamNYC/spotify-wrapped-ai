"use client";
import { getAuthSession } from "@/lib/nextauth";
import { fetchUserTopTracks } from "@/lib/userActions";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

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

	return (
		<div className='className="grid grid-cols-1 grid-rows-5 gap-4'>
			{data.map((track, index) => (
				<Card key={index}>
					<CardTitle>{track.name}</CardTitle>
					<CardContent>{track.artists[0].name}</CardContent>
				</Card>
			))}
		</div>
	);
};

export default DashboardTopTracks;
