import path from "path";
import fs from "fs-extra";

interface McpServerConfig {
	command?: string;
	args?: string[];
	url?: string;
	env?: Record<string, string>;
    type?: string;
}

interface CursorMcpJson {
	mcpServers?: Record<string, McpServerConfig & Omit<McpServerConfig, "type">>;
}

interface VsCodeMcpJson {
	servers?: Record<string, McpServerConfig>;
}


export const addMcpServer = (opts: {
	serverName: string;
	serverConfig: McpServerConfig;
	projectDir: string;
}) => {
	const { serverName, serverConfig, projectDir } = opts;

	
    addCursorMcpServer({
        serverName,
        serverConfig,
        projectDir,
    });

    addVsCodeMcpServer({
        serverName,
        serverConfig,
        projectDir,
    });
};



const addCursorMcpServer = (opts: {
	serverName: string;
	serverConfig: McpServerConfig;
	projectDir: string;
}) => {
	const { serverName, serverConfig, projectDir } = opts;

	const mcpJsonPath = path.join(projectDir, ".cusror/mpc.json");;

	fs.ensureDirSync(path.dirname(mcpJsonPath));

    const cursorConfig: Omit<McpServerConfig, "type"> = {
        args: serverConfig.args,
        command: serverConfig.command,
        env: serverConfig.env,
        url: serverConfig.url,
    };

	let mcpJson: CursorMcpJson = {};
	if (fs.existsSync(mcpJsonPath)) {
		mcpJson = fs.readJSONSync(mcpJsonPath) as CursorMcpJson;
	}

	// Initialize mcpServers if it doesn't exist
	if (!mcpJson.mcpServers) {
		mcpJson.mcpServers = {};
	}


	mcpJson.mcpServers[serverName] = { ...cursorConfig };

	// Write back to file
	fs.writeJSONSync(mcpJsonPath, mcpJson, {
		spaces: "\t",
	});
};


const addVsCodeMcpServer = (opts: {
	serverName: string;
	serverConfig: McpServerConfig;
	projectDir: string;
}) => {
	const { serverName, serverConfig, projectDir } = opts;

	const mcpJsonPath = path.join(projectDir, ".vscode/mcp.json");

	fs.ensureDirSync(path.dirname(mcpJsonPath));

	// Read existing config or create new one
	let mcpJson: VsCodeMcpJson = {};
	if (fs.existsSync(mcpJsonPath)) {
		mcpJson = fs.readJSONSync(mcpJsonPath) as VsCodeMcpJson;
	}

	// Initialize servers if it doesn't exist
	if (!mcpJson.servers) {
		mcpJson.servers = {};
	}

	// Add or update the server configuration
	mcpJson.servers[serverName] = { ...serverConfig };

	// Write back to file
	fs.writeJSONSync(mcpJsonPath, mcpJson, {
		spaces: "\t",
	});
};
