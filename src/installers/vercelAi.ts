import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";
import { addPackageDependency } from "@/utils/addPackageDependency.js";

export const vercelAiInstaller: Installer = ({ projectDir }) => {
	addPackageDependency({
		projectDir,
		dependencies: ["ai", "@ai-sdk/react"],
		devMode: false,
	});

	const extrasDir = path.join(PKG_ROOT, "template/extras");
	const vercelAiFilesDir = path.join(extrasDir, "vercel-ai");

	const vercelAiRouteSrc = path.join(vercelAiFilesDir, "route.ts");
	const vercelAiRouteDest = path.join(projectDir, "app/api/chat/route.ts");

	fs.copySync(vercelAiRouteSrc, vercelAiRouteDest);
};
