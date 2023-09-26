import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type Props = {};

const TestCard = (props: Props) => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["testStuff"],
		queryFn: async () => {
			const data = await axios.get(
				"https://jsonplaceholder.typicode.com/posts/1"
			);
			return data.data;
		},
		// retry: 10,
		// cacheTime: 24 * 60 * 60 * 1000 + 3000000,
		// staleTime: 24 * 60 * 60 * 1000,
	});

	if (isLoading) {
		return <div>Loading....</div>;
	}
	if (isError) {
		return <span>Error fetching tracks {error.message}</span>;
	}
	return (
		<>
			<div>
				<h2>TEST STUFF</h2>
				<p>{data.body}</p>
			</div>
		</>
	);
};

export default TestCard;
