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
	const form = useForm<Input>({
		resolver: zodResolver(playlistGenerateSchema),
		defaultValues: {
			seeds: "",
		},
	});
	const [seedSongs, setSeedSongs] = useState([]);

	function onSubmit(values: z.infer<typeof playlistGenerateSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
	}

	form.watch();
	return (
		<div>
			<p>Generate a playlist based on a song.</p>
			{/* <p>test</p> */}
			{seedSongs.map((song, index) => (
				<p key={index}>{song}</p>
			))}
			<SearchDialog setSeedSongs={setSeedSongs} seedSongs={seedSongs} />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					<FormField
						control={form.control}
						name='seeds'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Username</FormLabel>
								<FormControl>
									<Input placeholder='shadcn' {...field} />
								</FormControl>
								<FormDescription>
									This is your public display name.
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit'>Submit</Button>
				</form>
			</Form>
		</div>
	);
};

export default Songs;
