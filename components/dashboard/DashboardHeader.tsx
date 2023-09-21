"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import LogOutButton from "../LogOutButton";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {};

const DashboardHeader = (props: Props) => {
	const { data: session } = useSession();
	return (
		<div className='flex'>
			<Avatar>
				<AvatarImage src={session?.user.image} />
			</Avatar>

			<h2 className='mr-4 text-4xl font-bold'>HELLO{session?.user.name}</h2>
			{/* <LogOutButton /> */}
		</div>
	);
};

export default DashboardHeader;
