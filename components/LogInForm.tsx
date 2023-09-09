"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type Props = {};

const LogInForm = (props: Props) => {
	return (
		<Card className='bg-white shadow-lg rounded-lg p-6 w-72'>
			<CardHeader className='space-y-1'>
				<CardTitle className='text-2xl font-semibold'>
					Log In With Spotify
				</CardTitle>
				<CardDescription>
					Click below to link your Spotify Account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					className='bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center justify-center transition duration-300'
					onClick={() => signIn("spotify").catch(console.error)}
				>
					<Icons.spotify className='mr-2 h-7 w-7' />
					Connect to Spotify
				</Button>
			</CardContent>
		</Card>
	);
};

export default LogInForm;
