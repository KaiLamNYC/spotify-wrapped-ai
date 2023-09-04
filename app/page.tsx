"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
	// const router = useRouter();
	// const clientID = process.env.CLIENT_ID;
	// console.log(clientID);

	// const params = new URLSearchParams();
	// params.append("client_id", clientID);
	// params.append("response_type", "code");
	// params.append("redirect_uri", "http://localhost:3000/callback");
	// params.append("scope", "user-read-private user-read-email ");

	// const handleLogIn = (e: any) => {
	// 	// e.preventDefault();
	// 	// console.log("testing login stuff");
	// 	// redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
	// 	// router.push("/callback");
	// 	window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
	// };
	return (
		<>
			<h1>WELCOME TO SPOTIFY STATS</h1>

			{/* <Button onClick={handleLogIn}>LOG IN</Button> */}
		</>
	);
}
