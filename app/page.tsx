// import LogIn from "@/components/LogInButton";
import LogInButton from "@/components/LogInButton";
import { Button } from "@/components/ui/button";
import { getAuthSession } from "@/lib/nextauth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";

export default async function Home() {
	//REDIRECT IF LOGGED IN CAN TWEAK LATER
	const session = await getAuthSession();
	// if (session?.user) {
	// 	return redirect("/dashboard");
	// }
	// console.log(session.accessToken);

	return (
		<>
			<div className='flex items-center justify-center flex-col'>
				<h1>WELCOME TO SPOTIFY STATS</h1>
				<LogInButton />
				{session?.user ? <p>Hi {session.user.email}</p> : <p>please log in</p>}
				{/* <p>{session.accessToken}</p> */}
			</div>
		</>
	);
}
