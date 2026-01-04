import path from "path";

import { installPackages } from "@/helpers/installPackages.js";
import { scaffoldProject } from "@/helpers/scaffoldProject.js";
import { generateReadme } from "@/helpers/generateReadme.js";
import type { PkgInstallerMap } from "@/installers/index.js";
import { getUserPkgManager } from "@/utils/getUserPkgManager.js";

interface CreateProjectOptions {
	projectName: string;
	packages: PkgInstallerMap;
	scopedAppName: string;
	alias: string;
}

export const createProject = async ({
	projectName,
	scopedAppName,
	packages,
}: CreateProjectOptions) => {
	const pkgManager = getUserPkgManager();
	const projectDir = path.resolve(process.cwd(), projectName);

	// Bootstraps the base Next.js application
	await scaffoldProject({
		projectName,
		projectDir,
		pkgManager,
		scopedAppName,
	});

	// Install the selected packages
	installPackages({
		projectName,
		scopedAppName,
		projectDir,
		pkgManager,
		packages,
	});

	// Generate README based on selected packages
	generateReadme({ projectDir, projectName, packages });

	return projectDir;
};
