import Image from "next/image";
import React from "react";
import LogOut from "../LogOutButton";
import { Avatar, AvatarImage } from "../ui/avatar";

type Props = {
	session: {
		user: {
			name: string;
			image: string;
			email: string;
		};
	};
};

const DashboardHeader = ({ session }: any) => {
	return (
		<div className='flex'>
			<Avatar>
				<AvatarImage src={session?.user.image} />
			</Avatar>

			<h2 className='mr-4 text-4xl font-bold'>{session?.user.name}</h2>
			<LogOut />
		</div>
	);
};

export default DashboardHeader;
