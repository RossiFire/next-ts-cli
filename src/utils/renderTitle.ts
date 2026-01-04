import gradient from "gradient-string";

import { TITLE_TEXT } from "@/consts.js";
import { getUserPkgManager } from "@/utils/getUserPkgManager.js";

const colors = [
	"#003f5b",
	"#5f5195",
	"#cc4c91",
	"#ff6f4e",
	"#ff7030",
	"#f10062",
	"#b1008f",
	"#2c19a8",
];

export const renderTitle = () => {
	const nextTsGradient = gradient(colors);

	// resolves weird behavior where the ascii is offset
	const pkgManager = getUserPkgManager();
	if (pkgManager === "yarn" || pkgManager === "pnpm") {
		console.log("");
	}
	console.log(nextTsGradient.multiline(TITLE_TEXT));
};
