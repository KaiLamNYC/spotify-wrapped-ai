"use client";
import { playlistGenerateSchema } from "@/app/schemas/form/generate";
import { Button } from "@/components/ui/button";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";

import { userAgent } from "next/server";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import SearchDialog from "./SearchDialog";

type Props = {};

const Songs = (props: Props) => {
	const [seedSongs, setSeedSongs] = useState([]);

	//AFTER GENERATE PLAYLIST ONSUCCESS NEED TO REDIRECT TO NEW PAGE WITH LOADED PLAYLIST
	// const { mutate: generatePlaylist, isLoading } = useMutation({
	// 	//THIS IS THE FUNCTION THAT MUTATES THE DATA IN OUR DATABASE
	// 	mutationFn: async ({ seeds }: Input) => {
	// 		//THIS ENDPOINT CREATES THE GAME AND THE QUESTIONS
	// 		const response = await axios.post("/api/generatePlaylist", { seeds });
	// 		//RETURNING THE GAMEID TO REDIRECT
	// 		return response.data;
	// 	},
	// });

	const handleSubmit = async (e) => {
		e.preventDefault();
		// console.log(seedSongs);
		const response = await axios.post("/api/generatePlaylist", {
			seed: seedSongs.map((song) => song.id),
		});
		console.log(response.data);

		return response.data;
	};

	const handleDelete = (current) => {
		setSeedSongs(seedSongs.filter((song) => song.id !== current.id));
	};

	return (
		<div>
			<h2 className='text-lg'>Generate a playlist based on a song.</h2>
			{/* <p>test</p> */}

			<SearchDialog setSeedSongs={setSeedSongs} seedSongs={seedSongs} />
			<form onSubmit={handleSubmit}>
				{seedSongs.map((song, index) => (
					<Card key={index} className='flex flex-row justify-between'>
						<div className='flex flex-col'>
							<CardTitle>{song.name}</CardTitle>
							<CardDescription>{song.artist}</CardDescription>
						</div>

						<Button onClick={() => handleDelete(song)}>X</Button>
					</Card>
				))}
				<Button type='submit'>GENERATE</Button>
			</form>
			{/* <Button onClick={handleTest}>TEST SESSION</Button> */}
		</div>
	);
};

export default Songs;
