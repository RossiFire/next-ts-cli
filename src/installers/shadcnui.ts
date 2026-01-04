import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";

export const shadcnUIInstaller: Installer = ({ projectDir }) => {
	const extrasDir = path.join(PKG_ROOT, "template/extras");
	const shadcnUIDir = path.join(extrasDir, "shadcnui");

	const componentJsonFileSrc = path.join(shadcnUIDir, "components.json");
	const componentJsonFileDest = path.join(projectDir, "components.json");
	fs.copySync(componentJsonFileSrc, componentJsonFileDest);

	const globalCssFileSrc = path.join(shadcnUIDir, "globals.css");
	const globalCssFileDest = path.join(projectDir, "app/globals.css");
	fs.writeFileSync(
		globalCssFileDest,
		fs.readFileSync(globalCssFileSrc, "utf8"),
	);
};
