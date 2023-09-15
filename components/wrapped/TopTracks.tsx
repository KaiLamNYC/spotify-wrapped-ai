import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {};

const TopTracks = (props: Props) => {
	return (
		<Tabs defaultValue='last-month'>
			<TabsList>
				<TabsTrigger value='last-month'>LAST MONTH</TabsTrigger>
				<TabsTrigger value='6-months'>6 MONTHS</TabsTrigger>

				<TabsTrigger value='all-time'>ALL TIME</TabsTrigger>
			</TabsList>
			<TabsContent value='all-time'>
				Make changes to your account here.
			</TabsContent>
			<TabsContent value='last-month'>Change your password here.</TabsContent>
			<TabsContent value='6-months'>
				Make changes to your account here.
			</TabsContent>
		</Tabs>
	);
};

export default TopTracks;
