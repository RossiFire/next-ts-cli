import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	return {
		// Base rules
		rules: [
			{
				userAgent: "*",
				allow: "/",
				disallow: ["/api/*", "/static/*", "/*.json$", "/*.xml$", "/admin/*", "/private/*"],
			},

			// Those rules are for blocking GPT and Common Crawl's web crawlers from indexing the site
			// If you want to allow them, you can remove the rules below
			{
				userAgent: "GPTBot",
				disallow: "/",
			},

			{
				userAgent: "CCBot",
				disallow: "/",
			},
		],
		sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`,
		host: process.env.NEXT_PUBLIC_BASE_URL,
	};
}
