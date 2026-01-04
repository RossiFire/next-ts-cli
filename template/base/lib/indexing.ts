import type { Metadata } from "next";

export const allowIndexing = (): Pick<Metadata, "robots"> => {
	return {
		robots: {
			index: true,
			follow: true,
			googleBot: {
				index: true,
				follow: true,
			},
		},
	};
};
