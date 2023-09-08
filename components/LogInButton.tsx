"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function LogIn() {
	const { data: session } = useSession();
	if (session) {
		return (
			<>
				Signed in as {session.user.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn("spotify").catch(console.error)}>
				Sign in
			</button>
		</>
	);
}
