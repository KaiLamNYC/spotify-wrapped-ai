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
import React from "react";
import { useForm } from "react-hook-form";
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

type Props = {};

const Songs = (props: Props) => {
	const form = useForm();
	const tags = Array.from({ length: 50 }).map(
		(_, i, a) => `v1.2.0-beta.${a.length - i}`
	);
	return (
		<div>
			<p>Generate a playlist based on a song.</p>
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
					<Input placeholder='Enter song' type='text' />
					<Button type='submit'>Search</Button>
					<ScrollArea className='h-72 w-48 rounded-md border'>
						<div className='p-4'>
							<h4>SONGS</h4>
							{tags.map((tag) => (
								<>
									<div key={tag} className='text-sm'>
										{tag}
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
		</div>
	);
};

export default Songs;
