import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import TopTracksLastMonth from "./TopTracksLastMonth";
import TopTracksLastSixMonths from "./TopTracksLastSixMonths";
import TopTracksLastYear from "./TopTracksLastYear";

type Props = {};

const TopTracks = (props: Props) => {
	return (
		<Tabs defaultValue='last-month'>
			<TabsList>
				<TabsTrigger value='last-month'>LAST MONTH</TabsTrigger>
				<TabsTrigger value='6-months'>6 MONTHS</TabsTrigger>

				<TabsTrigger value='all-time'>ALL TIME</TabsTrigger>
			</TabsList>

			<TabsContent value='last-month'>
				<TopTracksLastMonth />
			</TabsContent>
			<TabsContent value='6-months'>
				<TopTracksLastSixMonths />
			</TabsContent>
			<TabsContent value='all-time'>
				<TopTracksLastYear />
			</TabsContent>
		</Tabs>
	);
};

export default TopTracks;
