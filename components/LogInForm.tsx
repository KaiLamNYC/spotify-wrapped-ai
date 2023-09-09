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
		<Card>
			<CardHeader className='space-y-1'>
				<CardTitle className='text-2xl'>Log In With Spotify</CardTitle>
				<CardDescription>
					Click below to link your Spotify Account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					className='w-full'
					onClick={() => signIn("spotify").catch(console.error)}
				>
					<Icons.spotify className='mr-2 h-7 w-7' />
					Connect to Spotify
				</Button>
				{/* <div className='grid grid-cols-2 gap-6'>
					<Button variant='outline'>
						<Icons.gitHub className='mr-2 h-4 w-4' />
						Github
					</Button>
					<Button variant='outline'>
						<Icons.google className='mr-2 h-4 w-4' />
						Google
					</Button>
				</div> */}
				{/* <div className='relative'>
					<div className='absolute inset-0 flex items-center'>
						<span className='w-full border-t' />
					</div>
					<div className='relative flex justify-center text-xs uppercase'>
						<span className='bg-background px-2 text-muted-foreground'>
							Or continue with
						</span>
					</div>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='email'>Email</Label>
					<Input id='email' type='email' placeholder='m@example.com' />
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='password'>Password</Label>
					<Input id='password' type='password' />
				</div> */}
			</CardContent>
			{/* <CardFooter>
				
			</CardFooter> */}
		</Card>
	);
};

export default LogInForm;
