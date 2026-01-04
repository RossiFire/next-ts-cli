import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { AvailableDependencies } from "@/installers/dependencyVersionMap.js";
import type { Installer } from "@/installers/index.js";
import { addPackageDependency } from "@/utils/addPackageDependency.js";

export const betterAuthInstaller: Installer = ({ projectDir, packages }) => {
	const usingDrizzle = packages?.drizzle.inUse;

	const deps: AvailableDependencies[] = ["better-auth"];

	addPackageDependency({
		projectDir,
		dependencies: deps,
		devMode: false,
	});

	const extrasDir = path.join(PKG_ROOT, "template/extras");
	const betterAuthDir = path.join(extrasDir, "better-auth");

	const apiHandlerRelPath = "api/auth/[...all]/route.ts";

	/* Copy API Handler */
	const apiHandlerSrc = path.join(betterAuthDir, apiHandlerRelPath);
	const apiHandlerDest = path.join(projectDir, "app", apiHandlerRelPath);
	fs.copySync(apiHandlerSrc, apiHandlerDest);

	/* Copy Auth Config */
	const authConfigSrc = path.join(
		betterAuthDir,
		usingDrizzle ? "with-drizzle-auth.ts" : "base-auth.ts",
	);
	const authConfigDest = path.join(projectDir, "lib", "auth.ts");
	fs.copySync(authConfigSrc, authConfigDest);
};
