"use client";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

// import useSpotify from "@/lib/useSpotify";
import axios from "axios";
import { Form } from "react-hook-form";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

// type Props = { setSeedSongs };

const SearchDialog = ({ setSeedSongs, seedSongs }: any) => {
	const [searchSongs, setSearchSongs] = useState<{ name: string }[]>([]);

	const [searchData, setSearchData] = useState();
	const { data: session } = useSession();
	// const spotifyApi = useSpotify();
	// console.log(`this is accesstoken: ${session?.user.accessToken}`);
	// console.log("The access token is " + spotifyApi.getAccessToken());

	const [searchInput, setSearchInput] = useState("");

	async function updateSearchResults(query: string) {
		const encodedQuery = encodeURIComponent(query);

		try {
			const response = await axios.get(
				`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=10`,
				{
					headers: {
						Authorization: `Bearer ${session?.user.accessToken}`,
					},
				}
			);
			setSearchData(response.data.tracks);
		} catch (error) {
			// Handle any errors here
			console.error("Error fetching search results:", error);
		}
	}

	const handleDelete = (current) => {
		setSeedSongs(seedSongs.filter((song) => song.id !== current.id));
	};

	return (
		<Dialog>
			<DialogTrigger>
				<Button>Select Songs</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Search For A Song</DialogTitle>
					<DialogDescription>Add up to 5 songs!</DialogDescription>
				</DialogHeader>
				<div className='flex flex-col'>
					{seedSongs.map((song, index) => (
						<Card key={index} className='flex flex-row justify-between'>
							<div className='flex flex-col'>
								<CardTitle>{song.name}</CardTitle>
								<CardDescription>{song.artist}</CardDescription>
							</div>

							<Button onClick={() => handleDelete(song)}>X</Button>
						</Card>
					))}
				</div>

				<Input
					placeholder='Enter song'
					type='text'
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Button
					onClick={async () => {
						console.log(session);
						// setSearchSongs(testSongs1);
						await updateSearchResults(searchInput);
						// await testStuff();
					}}
				>
					Search
				</Button>
				<ScrollArea className='h-72 w-full rounded-md border'>
					<div className='p-4'>
						<h4 className='mb-4 text-sm font-medium leading-none'>SONGS</h4>

						{searchData?.items.map((track, index) => (
							<div key={index}>
								<div className='text-sm flex justify-between'>
									<div>
										<p>{track.name}</p>
										<p>{track.artists[0].name}</p>
										<p>{track.id}</p>
									</div>

									<Button
										onClick={async () => {
											console.log("clicked");
											// form.setValue("seeds", seedSongs[0]);

											setSeedSongs([
												...seedSongs,
												{
													name: track.name,
													id: track.id,
													artist: track.artists[0].name,
												},
											]);
											// updateSearchResults(searchInput);
										}}
									>
										Add
									</Button>
								</div>
								<Separator className='my-2' />
							</div>
						))}

						<div className='text-sm'>END OF LIST</div>
					</div>
				</ScrollArea>
				{/* <DialogFooter>
					</DialogFooter> */}
			</DialogContent>
		</Dialog>
	);
};

export default SearchDialog;
