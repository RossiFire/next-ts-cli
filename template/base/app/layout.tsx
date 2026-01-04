import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import { barrio, dmSans } from "@/lib/fonts";
import { allowIndexing } from "@/lib/indexing";
import { microdata } from "@/lib/microdata";
import { cn } from "@/lib/utils";
import { MicrodataScript } from "@/providers/MicrodataScript";
import "./globals.css";

const homePageMicrodata = microdata("WebSite", {
	name: "next-ts",
	url: process.env.NEXT_PUBLIC_BASE_URL,
	description:
		"next-ts is a Production-Ready and Scalable Next.js Template Starter. Stop wasting time setting up your _next_ big project, with next-ts it's all ready to go!",
	author: "next-ts",
	publisher: "next-ts",
	inLanguage: "en_US",
	isAccessibleForFree: true,
	image: `${process.env.NEXT_PUBLIC_BASE_URL}/public/myimage.png`,
	mainEntityOfPage: {
		"@type": "WebSite",
		"@id": process.env.NEXT_PUBLIC_BASE_URL,
	},
});

export const metaData: Metadata = {
	metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
	title: {
		default: "next-ts",
		template: "next-ts - %s",
	},
	description:
		"next-ts is a Production-Ready and Scalable Next.js Template Starter. Stop wasting time setting up your _next_ big project, with next-ts it's all ready to go!",
	keywords: ["next-ts"],
	authors: [{ name: "next-ts" }],
	creator: "next-ts",
	publisher: "next-ts",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	alternates: {
		canonical: process.env.NEXT_PUBLIC_BASE_URL,
	},
	...allowIndexing(),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={cn("bg-background", barrio.variable, dmSans.variable)}>
				{children}
				<MicrodataScript id="home-microdata" microdata={homePageMicrodata} />
				{process.env.GOOGLE_ANALYTICS_TAG && (
					<GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_TAG} />
				)}
			</body>
		</html>
	);
}
