"use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// https://next-auth.js.org/getting-started/client#sessionprovider
import { SessionProvider } from "next-auth/react";
// import { ThemeProvider as NextThemesProvider } from "next-themes";
// import { type ThemeProviderProps } from "next-themes/dist/types";
import React from "react";
//REACT QUERY
// const queryClient = new QueryClient();

const Providers = ({
	children,
	session,
	...props
}: {
	children: React.ReactNode;
	session: any;
}) => {
	return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
