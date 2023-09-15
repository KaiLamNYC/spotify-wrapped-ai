import { getAuthSession } from "@/lib/nextauth";
import Link from "next/link";
import React from "react";
import LogOutButton from "./LogOutButton";
import { Button } from "./ui/button";
type Props = {};

const Navbar = ({ session }: any) => {
	// const session = await getAuthSession();

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
