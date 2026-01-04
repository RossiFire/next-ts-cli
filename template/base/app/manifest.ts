import type { MetadataRoute } from "next";

export default function Manifest(): MetadataRoute.Manifest {
	return {
		name: "My App",
		short_name: "My App",
		description: "My App Description",
		start_url: "/",
		display: "browser",
		background_color: "#ffffff",
		theme_color: "#ffffff",
		orientation: "portrait",
		icons: [
			{
				src: "/icons/icon-192x192.png",
				sizes: "192x192",
				type: "image/png",
				purpose: "maskable",
			},
			{
				src: "/icons/icon-512x512.png",
				sizes: "512x512",
				type: "image/png",
				purpose: "maskable",
			},
		],
		categories: ["productivity", "utilities"],
		lang: "en",
		dir: "auto",
		scope: "/",
		prefer_related_applications: false,
	};
}
