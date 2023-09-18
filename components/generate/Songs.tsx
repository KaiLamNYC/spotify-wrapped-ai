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
	const tags = Array.from({ length: 50 }).map(
		(_, i, a) => `v1.2.0-beta.${a.length - i}`
	);
	const testSongs = [
		{
			name: "search and rescue",
		},
		{
			name: "meltdown",
		},
		{
			name: "nothing",
		},
		{
			name: "mob ties",
		},
	];

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
	];

	const [searchSongs, setSearchSongs] = useState<{ name: string }[]>([]);
	return (
		<div>
			<p>Generate a playlist based on a song.</p>
			<SearchDialog />
		</div>
	);
};

export default Songs;
