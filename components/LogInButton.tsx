"use client";

import { getAuthSession } from "@/lib/nextauth";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";

export default function LogIn() {
	const { data: session } = useSession();
	// const user = getAuthSession();
	// console.log(user);

	// console.log(session.accessToken);
	// if (session) {
	// 	return (
	// 		<>
	// 			Signed in as {session.user.email} <br />
	// 			<button onClick={() => signOut()}>Sign out</button>
	// 		</>
	// 	);
	// }
	return (
		<>
			<Button onClick={() => signIn("spotify").catch(console.error)}>
				log in here pls
			</Button>
		</>
	);
}
