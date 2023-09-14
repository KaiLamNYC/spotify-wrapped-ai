// import LogIn from "@/components/LogInButton";
import LogInButton from "@/components/LogInButton";
import LogInForm from "@/components/LogInForm";
import Navbar from "@/components/Navbar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default async function Home() {
	//REDIRECT IF LOGGED IN CAN TWEAK LATER
	const session = await getAuthSession();
	if (session?.user) {
		return redirect("/dashboard");
	}
	// console.log(session.accessToken);

	return (
		<div className='flex items-center justify-center flex-col mt-20'>
			<h1 className='text-4xl font-bold mb-4 text-center'>
				Welcome to Your Spotify Wrapped + AI
			</h1>
			<h2 className='text-lg text-center mb-8'>
				Unleash the Power of AI for Personalized Playlists, Mood-Boosting Beats,
				and Explore Your Spotify Wrapped Insights!
			</h2>
			<LogInForm />
		</div>
	);
}
