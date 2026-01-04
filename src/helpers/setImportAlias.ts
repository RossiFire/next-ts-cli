import { logger } from "@/utils/logger.js";
import fs from "fs";
import path from "path";

function replaceTextInFiles(
	directoryPath: string,
	search: string,
	replacement: string,
): void {
	const files = fs.readdirSync(directoryPath);

	try {
		files.forEach((file) => {
			const filePath = path.join(directoryPath, file);
			if (fs.statSync(filePath).isDirectory()) {
				replaceTextInFiles(filePath, search, replacement);
			} else {
				const data = fs.readFileSync(filePath, "utf8");
				const updatedData = data.replace(new RegExp(search, "g"), replacement);
				fs.writeFileSync(filePath, updatedData, "utf8");
			}
		});
	} catch (error) {
		logger.error(`Error setting import alias: ${error}`);
	}
}

export const setImportAlias = (projectDir: string, alias: string) => {
	try{
		const normalizedImportAlias = alias
		.replace(/\*/g, "") // remove any wildcards (@/* -> @/)
		.replace(/[^/]$/, "$&/"); // ensure trailing slash (@ -> @/)

	// update import alias in any files if not using the default
	replaceTextInFiles(projectDir, `@/`, normalizedImportAlias);
	} catch (error) {
		logger.error(`Error setting import alias: ${error}`);
	}
};
