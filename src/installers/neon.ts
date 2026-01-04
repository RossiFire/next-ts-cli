import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";
import { addPackageDependency } from "@/utils/addPackageDependency.js";

export const neonInstaller: Installer = ({ projectDir, packages }) => {
	addPackageDependency({
		projectDir,
		dependencies: ["@neondatabase/serverless"],
		devMode: false,
	});

    if(packages?.drizzle.inUse){
        const neonDrizzleSrc = path.join(PKG_ROOT, "template/extras/neon/index.ts");
        const neonDrizzleDest = path.join(projectDir, "lib/db/index.ts");
        fs.copySync(neonDrizzleSrc, neonDrizzleDest);
    }

    // We don't need any additional configuration for Neon,
    // Since its base configuration is done.
    // The env variable instead is already set up in the envVariablesInstaller.

};
