import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TopTracksLastMonth from "./TopTracksLastMonth";
import TopTracksLastSixMonths from "./TopTracksLastSixMonths";
import TopTracksLastYear from "./TopTracksLastYear";

type Props = { userToken: string };

const TopTracks = ({ userToken }: Props) => {
	return (
		<Tabs defaultValue='last-month'>
			<TabsList>
				<TabsTrigger value='last-month'>LAST MONTH</TabsTrigger>
				<TabsTrigger value='6-months'>6 MONTHS</TabsTrigger>

				<TabsTrigger value='all-time'>ALL TIME</TabsTrigger>
			</TabsList>

			<TabsContent value='last-month'>
				<TopTracksLastMonth userToken={userToken} />
			</TabsContent>
			<TabsContent value='6-months'>
				<TopTracksLastSixMonths userToken={userToken} />
			</TabsContent>
			<TabsContent value='all-time'>
				<TopTracksLastYear userToken={userToken} />
			</TabsContent>
		</Tabs>
	);
};

export default TopTracks;
