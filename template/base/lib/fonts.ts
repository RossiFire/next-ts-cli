import { Barrio, DM_Sans } from "next/font/google";

const barrio = Barrio({
	weight: "400",
	subsets: ["latin"],
	variable: "--font-barrio",
});
const dmSans = DM_Sans({
	weight: ["400", "500", "700"],
	subsets: ["latin"],
	variable: "--font-dm-sans",
});

export { barrio, dmSans };
