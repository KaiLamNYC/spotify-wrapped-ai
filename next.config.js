/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "i.scdn.co",
				port: "",
				pathname: "/image/**",
			},
		],
	},
};

module.exports = nextConfig;
