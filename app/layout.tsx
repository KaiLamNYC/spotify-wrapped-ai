// RootLayout.tsx
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Spotify",
	description: "AI Spotify App",
};

export default function RootLayout({
	children,
	session,
}: {
	children: React.ReactNode;
	session: any;
}) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<SessionProvider session={session}>{children}</SessionProvider>
			</body>
		</html>
	);
}
