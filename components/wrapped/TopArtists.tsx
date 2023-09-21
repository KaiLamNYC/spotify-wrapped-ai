import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import React from "react";
import TopArtistsLastMonth from "./TopArtistsLastMonth";
import TopArtistsLastSixMonths from "./TopArtistsLastSixMonths";
import TopArtistsLastYear from "./TopArtistsLastYear";

type Props = {};

const TopArtists = (props: Props) => {
	return (
		<Tabs defaultValue='last-month'>
			<div className='flex justify-center'>
				<TabsList className=''>
					<TabsTrigger value='last-month'>LAST MONTH</TabsTrigger>
					<TabsTrigger value='6-months'>6 MONTHS</TabsTrigger>

					<TabsTrigger value='all-time'>ALL TIME</TabsTrigger>
				</TabsList>
			</div>

			<TabsContent value='last-month'>
				<TopArtistsLastMonth />
			</TabsContent>

			<TabsContent value='6-months'>
				<TopArtistsLastSixMonths />
			</TabsContent>
			<TabsContent value='all-time'>
				<TopArtistsLastYear />
			</TabsContent>
		</Tabs>
	);
};

export default TopArtists;
