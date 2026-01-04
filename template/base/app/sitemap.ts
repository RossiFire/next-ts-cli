import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
	const currentDate = new Date();

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: `${baseUrl}`,
			lastModified: currentDate,
			changeFrequency: "never" as const,
			priority: 1,
		},
	];

	return [...staticRoutes];
}
