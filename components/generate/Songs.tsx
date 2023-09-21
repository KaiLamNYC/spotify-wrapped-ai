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
import React, { useState } from "react";
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
import SearchDialog from "./SearchDialog";

type Props = {};

const Songs = (props: Props) => {
	const form = useForm();
	const [seedSongs, setSeedSongs] = useState([]);

	return (
		<div>
			<p>Generate a playlist based on a song.</p>
			{/* <p>test</p> */}
			{seedSongs.map((song, index) => (
				<p key={index}>{song}</p>
			))}
			<SearchDialog setSeedSongs={setSeedSongs} seedSongs={seedSongs} />
		</div>
	);
};

export default Songs;
