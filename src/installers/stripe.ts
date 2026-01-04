import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";
import { addPackageScript } from "@/utils/addPackageScript.js";
import { addPackageDependency } from "@/utils/addPackageDependency.js";
import { addMcpServer } from "@/utils/addMcpServer.js";

export const stripeInstaller: Installer = ({ projectDir }) => {
	addPackageDependency({
		projectDir,
		dependencies: ["stripe", "@stripe/stripe-js", "@stripe/react-stripe-js"],
		devMode: false,
	});

	const extrasDir = path.join(PKG_ROOT, "template/extras");
	const stripeFilesDir = path.join(extrasDir, "stripe");

	const checkoutSessionRouteSrc = path.join(stripeFilesDir, "checkout_session");
	const checkoutSessionRouteDest = path.join(
		projectDir,
		"app/api/checkout_session",
	);
	fs.copySync(checkoutSessionRouteSrc, checkoutSessionRouteDest);

	const webhookRouteSrc = path.join(stripeFilesDir, "webhook/stripe/route.ts");
	const webhookRouteDest = path.join(
		projectDir,
		"app/api/webhook/stripe/route.ts",
	);
	fs.copySync(webhookRouteSrc, webhookRouteDest);

	addPackageScript({
		projectDir,
		scripts: {
			"webhook:local":
				"stripe listen --forward-to localhost:3000/api/webhook/stripe",
		},
	});
	addMcpServer({
		serverName: "stripe",
		serverConfig: {
			type: "http",
			url: "https://mcp.stripe.com",
		},
		projectDir,
	});
};
