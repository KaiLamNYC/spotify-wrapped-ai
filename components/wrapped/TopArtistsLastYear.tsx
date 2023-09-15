import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardDescription, CardTitle } from "../ui/card";

type Props = {
	userToken: string;
};

const TopArtistsLastYear = ({ userToken }: Props) => {
	const authHeader = {
		Authorization: `Bearer ${userToken}`,
	};

	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["topArtistLastYear"],
		queryFn: async () => {
			const data = await axios.get(
				"https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=10",
				{ headers: authHeader }
			);
			return data.data.items;
		},
		cacheTime: 168 * 60 * 60 * 1000 + 3000000,
		staleTime: 168 * 60 * 60 * 1000,
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

export default TopArtistsLastYear;
