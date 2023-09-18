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

import axios from "axios";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

type Props = {};

const SearchDialog = (props: Props) => {
	const tags = Array.from({ length: 50 }).map(
		(_, i, a) => `v1.2.0-beta.${a.length - i}`
	);

	const testSongs1 = [
		{
			name: "hello",
		},
		{
			name: "this",
		},
		{
			name: "is",
		},
		{
			name: "test",
		},
		{
			name: "hello",
		},
		{
			name: "this",
		},
		{
			name: "is",
		},
		{
			name: "test",
		},
		{
			name: "hello",
		},
		{
			name: "this",
		},
		{
			name: "is",
		},
		{
			name: "test",
		},
		{
			name: "hello",
		},
		{
			name: "this",
		},
		{
			name: "is",
		},
		{
			name: "test",
		},
		{
			name: "hello",
		},
		{
			name: "this",
		},
		{
			name: "is",
		},
		{
			name: "test",
		},
	];

	const [searchSongs, setSearchSongs] = useState<{ name: string }[]>([]);

	const [searchData, setSearchData] = useState();
	const { data: session } = useSession();

	const [searchInput, setSearchInput] = useState("");

	async function updateSearchResults(query: string, accessToken: string) {
		const encodedQuery = encodeURIComponent(query);

		try {
			const response = await axios.get(
				`https://api.spotify.com/v1/search?q=${encodedQuery}&type=track&limit=10`,
				{
					headers: {
						Authorization: `Bearer ${session.accessToken}`,
					},
				}
			);
			setSearchData(response.data.tracks);
		} catch (error) {
			// Handle any errors here
			console.error("Error fetching search results:", error);
		}
	}

	return (
		<Dialog>
			<DialogTrigger>
				<Button>Select Songs</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Search for song</DialogTitle>
					<DialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</DialogDescription>
				</DialogHeader>
				<Input
					placeholder='Enter song'
					type='text'
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
				/>
				<Button
					onClick={async () => {
						console.log(session?.accessToken);
						// setSearchSongs(testSongs1);
						// console.log(searchInput);
						await updateSearchResults(searchInput, session.accessToken);
						// console.log("finished sending");
						console.log(searchData);
					}}
				>
					Search
				</Button>
				<ScrollArea className='h-72 w-full rounded-md border'>
					<div className='p-4'>
						<h4 className='mb-4 text-sm font-medium leading-none'>SONGS</h4>
						{/* {tags.map((tag) => (
								<>
									<div key={tag} className='text-sm flex justify-between'>
										<div>
											<p>{tag}</p>
											<p>artist</p>
										</div>

										<Button>Add</Button>
									</div>
									<Separator className='my-2' />
								</>
							))} */}

						{/* {searchSongs.map((track, index) => (
							<>
								<div key={index}>
									<p>{track.name}</p>
								</div>
							</>
						))} */}

						{searchData?.items.map((track, index) => (
							<>
								<div key={index} className='text-sm flex justify-between'>
									<div>
										<p>{track.name}</p>
										<p>{track.artists[0].name}</p>
									</div>

									<Button>Add</Button>
								</div>
								<Separator className='my-2' />
							</>
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
