"use client";

import { Button } from "@/components/ui/button";
// import { signIn } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const CallbackPage = ({ searchParams }: any) => {
	const code = searchParams.code;

	const handleLogOut = () => {};
	return (
		<>
			<h1>LOGGED IN!</h1>
			<h2>{code}</h2>
			<Button>LOG OUT</Button>
		</>
	);
};

export default CallbackPage;
