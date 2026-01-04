import { DEFAULT_APP_NAME } from "@/consts.js";
import type { InstallerOptions } from "@/installers/index.js";
import { getUserPkgManager } from "@/utils/getUserPkgManager.js";
import { logger } from "@/utils/logger.js";

// This logs the next steps that the user should take in order to advance the project
export const logNextSteps = async ({
	projectName = DEFAULT_APP_NAME
}: Pick<InstallerOptions, "projectName">) => {
	const pkgManager = getUserPkgManager();

	logger.info("Next steps:");
	if (projectName !== ".") {
		logger.info(`  cd ${projectName}`);
	}

	if (["npm", "bun"].includes(pkgManager)) {
		logger.info(`  ${pkgManager} run dev`);
	} else {
		logger.info(`  ${pkgManager} dev`);
	}
};
