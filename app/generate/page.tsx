import Navbar from "@/components/Navbar";
import Songs from "@/components/generate/Songs";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

type Props = {};

const GeneratePage = (props: Props) => {
	// const { data: session } = useSession();

	// const [userToken, setUserToken] = useState("");

	return (
		<div className='flex'>
			<Navbar />
			<div className='flex flex-col justify-center items-center w-full '>
				<h1>GENERATE YOUR AI PLAYLIST BELOW</h1>
				<Tabs defaultValue='mood'>
					<TabsList className='grid w-[300px] grid-cols-3'>
						<TabsTrigger value='mood'>Mood</TabsTrigger>
						<TabsTrigger value='song'>Song</TabsTrigger>
						<TabsTrigger value='artist'>Artist</TabsTrigger>
					</TabsList>
					<TabsContent value='mood'>
						<p>Generate a playlist based on a mood or occasion.</p>
						<Input type='text' placeholder='Describe the mood or ocassion...' />
						<Button>Generate</Button>
					</TabsContent>
					<TabsContent value='song'>
						<Songs />
					</TabsContent>
					<TabsContent value='artist'>
						<p>Generate a playlist based on an artist.</p>
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
};

export default GeneratePage;
