/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
	},
};

module.exports = nextConfig;
