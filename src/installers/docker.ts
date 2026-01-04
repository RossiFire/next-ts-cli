import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";
import { addPackageScript } from "@/utils/addPackageScript.js";

export const dockerInstaller: Installer = ({ projectDir }) => {
	const extrasDir = path.join(PKG_ROOT, "template/extras");
	const dockerFilesDir = path.join(extrasDir, "docker");

	// Add docker files to base project
	fs.copySync(
		path.join(dockerFilesDir, "Dockerfile"),
		path.join(projectDir, "Dockerfile"),
	);
	fs.copySync(
		path.join(dockerFilesDir, "docker-compose.prod.yml"),
		path.join(projectDir, "docker-compose.prod.yml"),
	);
	fs.copySync(
		path.join(dockerFilesDir, ".dockerignore"),
		path.join(projectDir, ".dockerignore"),
	);

	addPackageScript({
		projectDir,
		scripts: {
			"docker:build": "docker compose -f docker-compose.prod.yml build",
			"docker:up": "docker compose -f docker-compose.prod.yml up -d",
			"docker:down": "docker compose -f docker-compose.prod.yml down",
			"docker:logs": "docker compose -f docker-compose.prod.yml logs -f",
			"docker:exec": "docker compose -f docker-compose.prod.yml exec app sh",
			"docker:exec:bash":
				"docker compose -f docker-compose.prod.yml exec app bash",
			"docker:exec:sh": "docker compose -f docker-compose.prod.yml exec app sh",
			"docker:exec:npm":
				"docker compose -f docker-compose.prod.yml exec app npm",
		},
	});
};
