"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import LogOutButton from "../LogOutButton";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {};
//THIS WILL BE ALL DATABASE STUFF
//TAKING NAME IMAGE FROM DB
//ALSO MAYBE STUFF LIKE NUMBER OF PLAYLISTS ETC
const DashboardHeader = (props: Props) => {
	const { data: session } = useSession();
	console.log(session);
	return (
		<div className='flex flex-row items-center p-2'>
			<Avatar className='w-36 h-36 mr-4'>
				<AvatarImage src={`${session?.user.image}`} />
			</Avatar>
			<div className='flex flex-col p-2'>
				<h2 className='mr-4 text-4xl font-bold'>HELLO {session?.user.name}</h2>
				<p>Generated Playlists: 5</p>
			</div>

			{/* <LogOutButton /> */}
		</div>
	);
};

export default DashboardHeader;
