import path from "path";
import fs from "fs-extra";

import { PKG_ROOT } from "@/consts.js";
import type { Installer } from "@/installers/index.js";
import { addPackageDependency } from "@/utils/addPackageDependency.js";
import { addMcpServer } from "@/utils/addMcpServer.js";

export const supabaseInstaller: Installer = ({ projectDir }) => {
	addPackageDependency({
		projectDir,
		dependencies: ["@supabase/ssr", "@supabase/supabase-js"],
		devMode: false,
	});

	const extrasDir = path.join(PKG_ROOT, "template/extras");


	const supabaseDir = path.join(extrasDir, "supabase");
	
	
	const libContentSrc = path.join(supabaseDir, "supabase");
	const libContentDest = path.join(projectDir, "lib/supabase");

	const proxySrc = path.join(supabaseDir, "proxy.ts");
	const proxyDest = path.join(projectDir, "proxy.ts");
	fs.copySync(proxySrc, proxyDest);

	fs.copySync(libContentSrc, libContentDest);

	addMcpServer({
		serverName: "supabase",
		serverConfig: {
			type: "http",
			url: "https://mcp.supabase.com/mcp?project_ref=<YOUR_SUPABASE_PROJECT_ID>",
		},
		projectDir,
	});
};
