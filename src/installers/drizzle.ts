import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";
import { addPackageDependency } from "@/utils/addPackageDependency.js";
import { addPackageScript } from "@/utils/addPackageScript.js";

export const drizzleInstaller: Installer = ({ projectDir }) => {
	addPackageDependency({
		projectDir,
		dependencies: ["drizzle-kit"],
		devMode: true,
	});
	addPackageDependency({
		projectDir,
		dependencies: ["drizzle-orm", "postgres"],
		devMode: false,
	});

	const extrasDir = path.join(PKG_ROOT, "template/extras");
	const drizzleDir = path.join(extrasDir, "drizzle");

	const configFileSrc = path.join(drizzleDir, "drizzle.config.ts");
	const configFileDest = path.join(projectDir, "drizzle.config.ts");
	fs.copySync(configFileSrc, configFileDest);

	const dbFolderSrc = path.join(drizzleDir, "db");
	const dbFolderDest = path.join(projectDir, "lib/db");
	fs.copySync(dbFolderSrc, dbFolderDest);

	addPackageScript({
		projectDir,
		scripts: {
			"db:push": "drizzle-kit push",
			"db:studio": "drizzle-kit studio",
			"db:generate": "drizzle-kit generate",
			"db:migrate": "drizzle-kit migrate",
		},
	});
};
