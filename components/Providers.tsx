"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// https://next-auth.js.org/getting-started/client#sessionprovider
import { SessionProvider } from "next-auth/react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { type ThemeProviderProps } from "next-themes/dist/types";
import React from "react";

// REACT QUERY STUFF
const queryClient = new QueryClient();

const Providers = ({
	children,
	session,
	...props
}: {
	children: React.ReactNode;
	session: any;
}) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SessionProvider session={session}>{children}</SessionProvider>
		</QueryClientProvider>
	);
};

export default Providers;
