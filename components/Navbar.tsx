import { getAuthSession } from "@/lib/nextauth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import LogOutButton from "./LogOutButton";
import { Button } from "./ui/button";
type Props = {};

const Navbar = (props: Props) => {
	// const session = await getAuthSession();
	// const { data: session } = useSession();

	return (
		<div className='mr-4 flex flex-col items-center'>
			<Link href='/dashboard'>
				<p className=''>HOME</p>
			</Link>
			<Link href='/wrapped'>
				<p>WRAPPED</p>
			</Link>
			<Link href='/generate'>
				<p>GENERATE</p>
			</Link>
			{/* <Button onClick={() => console.log(session)}>SESSION</Button> */}
			<LogOutButton />
		</div>
	);
};

export default Navbar;
