"use client";
import { getAuthSession } from "@/lib/nextauth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const DashboardWrapped = (props: Props) => {
	const [userToken, setUserToken] = useState("");
	// const session = getAuthSession();
	const { data: session } = useSession();
	useEffect(() => {
		if (session && session.accessToken) {
			setUserToken(session.accessToken);
		}
	});
	console.log(session);

	const authHeader = {
		Authorization: `Bearer ${userToken}`,
	};
	const { data, isLoading } = useQuery({
		queryFn: async () => {
			const { data } = await axios.get(
				"https://api.spotify.com/v1/me/top/tracks?limit=5",
				{ headers: authHeader }
			);
			return data;
		},
	});

	// const { data, isLoading } = useQuery({
	// 	queryFn: async () => {
	// 		const { data } = await axios.get("");
	// 	},
	// });

	//THIS USES CLIENT
	// https://next-auth.js.org/getting-started/client#usesession
	// const { data: session } = useSession();

	//THIS USES ASYNC ON SERVER SIDE
	// https://next-auth.js.org/configuration/nextjs#getserversession
	// console.log(session);

	return (
		<>
			{/* <div>{session}</div> */}
			<div>{userToken}</div>
			<div>{isLoading ? "loading data pls wait" : "done!"}</div>
			<h2>{session?.user.name} Top Songs</h2>
			{!isLoading && data && data.items && (
				<ul>
					{data.items.map((track, index) => (
						<li key={index}>
							<strong>{track.name}</strong> by {track.artists[0].name}
						</li>
					))}
				</ul>
			)}

			{/* <div>{data}</div> */}
		</>
	);
};

export default DashboardWrapped;
