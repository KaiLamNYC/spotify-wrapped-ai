"use client";
import { playlistGenerateSchema } from "@/app/schemas/form/generate";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import TestCard from "../TestCard";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import SearchDialog from "./SearchDialog";

type Props = {};

type Input = z.infer<typeof playlistGenerateSchema>;

const Songs = (props: Props) => {
	const [seedSongs, setSeedSongs] = useState([]);

	const form = useForm<Input>({
		resolver: zodResolver(playlistGenerateSchema),
		// CAN JUST SET DEFAULT VALUE TO RANDOM POPULAR ARTIST
		defaultValues: {
			seeds: "",
		},
	});

	const { mutate: generatePlaylist, isLoading } = useMutation({
		//THIS IS THE FUNCTION THAT MUTATES THE DATA IN OUR DATABASE
		mutationFn: async ({ seeds }: Input) => {
			//THIS ENDPOINT CREATES THE GAME AND THE QUESTIONS
			const response = await axios.post("/api/game", { seeds });
			//RETURNING THE GAMEID TO REDIRECT
			return response.data;
		},
	});

	function onSubmit(values: z.infer<typeof playlistGenerateSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	const setValues = () => {
		form.setValue("seeds", seedSongs[0]);
	};
	form.watch();

	// form.handleSubmit(onSubmit)
	return (
		<div>
			<p>Generate a playlist based on a song.</p>
			{/* <p>test</p> */}
			{seedSongs.map((song, index) => (
				<p key={index}>{song}</p>
			))}

			{/* <SearchDialog setSeedSongs={setSeedSongs} seedSongs={seedSongs} /> */}
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<SearchDialog setSeedSongs={setSeedSongs} seedSongs={seedSongs} />

					<FormField
						control={form.control}
						name='seeds'
						render={({ field }) => (
							<FormItem>
								<FormLabel>SEED SONGS</FormLabel>
								<FormControl>
									<Input
										placeholder='hello'
										{...field}
										// onChange={(e) => {
										// 	form.setValue("seeds", e.target.value);
										// }}
										value={seedSongs[0]}
									/>
								</FormControl>

								<FormDescription>
									{/* {seedSongs.map((song, index) => (
										<p key={index}>{song}</p>
									))} */}
									DESCRIPTION
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='button' onClick={setValues}>
						CONFIRM SONGS
					</Button>
					<Button type='submit'>GENERATE</Button>
				</form>
			</Form>
		</div>
	);
};

export default Songs;
