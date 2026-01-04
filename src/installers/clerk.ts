import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";
import { addPackageDependency } from "@/utils/addPackageDependency.js";

export const clerkInstaller: Installer = ({ projectDir }) => {
	addPackageDependency({
		projectDir,
		dependencies: ["@clerk/nextjs"],
		devMode: false,
	});

	const extrasDir = path.join(PKG_ROOT, "template/extras");
	const clerkFilesDir = path.join(extrasDir, "clerk");

    // Add proxy file
	const proxySrc = path.join(clerkFilesDir, "proxy.ts");
	const proxyDest = path.join(projectDir, "proxy.ts");
	fs.copySync(proxySrc, proxyDest);


    // Add layout file
	const layoutSrc = path.join(clerkFilesDir, "layout.tsx");
	const layoutDest = path.join(projectDir, "app/layout.tsx");
	fs.copySync(layoutSrc, layoutDest);

};
