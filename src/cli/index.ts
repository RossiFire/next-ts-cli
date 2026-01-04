import * as p from "@clack/prompts";
import { Command } from "commander";

import { CREATE_NEXT_TS_CLI, DEFAULT_APP_NAME } from "@/consts.js";
import type { AvailablePackages } from "@/installers/index.js";
import { getVersion } from "@/utils/getVersion.js";
import { IsTTYError } from "@/utils/isTTYError.js";
import { logger } from "@/utils/logger.js";
import { validateAppName } from "@/utils/validateAppName.js";
import { validateImportAlias } from "@/utils/validateImportAlias.js";

interface CliFlags {
	default: boolean;
	alias: string;

	/** @internal Used in CLI mode. */
	cli: boolean;
	/** @internal Used in CLI mode. */
	drizzle: boolean;
	/** @internal Used in CLI mode. */
	supabase: boolean;
	/** @internal Used in CLI mode. */
	betterauth: boolean;
	/** @internal Used in CLI mode. */
	docker: boolean;
	/** @internal Used in CLI mode. */
	stripe: boolean;
	/** @internal Used in CLI mode. */
	shadcnui: boolean;
	/** @internal Used in CLI mode. */
	clerk: boolean;
	/** @internal Used in CLI mode. */
	neon: boolean;
	/** @internal Used in CLI mode. */
	vercelAi: boolean;
}

interface CliResults {
	appName: string;
	packages: AvailablePackages[];
	flags: CliFlags;
}

const defaultOptions: CliResults = {
	appName: DEFAULT_APP_NAME,
	packages: [],
	flags: {
		default: false,
		cli: false,
		drizzle: false,
		supabase: false,
		betterauth: false,
		alias: "@/",
		docker: false,
		stripe: false,
		shadcnui: false,
		clerk: false,
		neon: false,
		vercelAi: false
	},
};

export const runCli = async (): Promise<CliResults> => {
	const cliResults = defaultOptions;

	const program = new Command()
		.name(CREATE_NEXT_TS_CLI)
		.description(
			"A CLI for creating production-ready web applications with the Next.js",
		)
		.argument(
			"[dir]",
			"The name of the application, as well as the name of the directory to create",
		)
		.option("--cli", "Run in CLI mode (non-interactive)", false)
		.option(
			"-d, --default",
			"Scaffold the project without any additional integrations",
			false,
		)
		.option(
			"-a, --alias [alias]",
			"Explicitly tell the CLI to use a custom import alias",
			defaultOptions.flags.alias,
		)
		.option(
			"--drizzle [boolean]",
			"Experimental: Boolean value if we should install Drizzle. Must be used in conjunction with `--cli`.",
			(value) => !!value && value !== "false",
		)
		.option(
			"--docker [boolean]",
			"Experimental: Boolean value if we should install Docker. Must be used in conjunction with `--cli`.",
			(value) => !!value && value !== "false",
		)
		.option(
			"--stripe [boolean]",
			"Experimental: Boolean value if we should install Stripe. Must be used in conjunction with `--cli`.",
			(value) => !!value && value !== "false",
		)
		.option(
			"--shadcnui [boolean]",
			"Experimental: Boolean value if we should install Shadcn UI. Must be used in conjunction with `--cli`.",
			(value) => !!value && value !== "false",
		)
		.option(
			"--betterauth [boolean]",
			"Experimental: Boolean value if we should install BetterAuth. Must be used in conjunction with `--cli`. Not valid with --clerk",
			(value) => !!value && value !== "false",
		)
		.option(
			"--clerk [boolean]",
			"Experimental: Boolean value if we should install Clerk.js . Must be used in conjunction with `--cli`. Not valid with --betterAuth",
			(value) => !!value && value !== "false",
		)
		.option(
			"--supabase [boolean]",
			"Experimental: Boolean value if we should install Supabase. Must be used in conjunction with `--cli`. Not valid with --betterAuth or --clerk",
			(value) => !!value && value !== "false",
		)
		.option(
			"--neon [boolean]",
			"Experimental: Boolean value if we should install Neon. Must be used in conjunction with `--cli`.",
			(value) => !!value && value !== "false",
		)
		.option(
			"--vercelAi [boolean]",
			"Experimental: Boolean value if we should install Vercel AI Gateway. Must be used in conjunction with `--cli`.",
			(value) => !!value && value !== "false",
		)
		.version(getVersion(), "-v, --version", "Display the version number")
		.parse(process.argv);

	// FIXME: TEMPORARY WARNING WHEN USING YARN 3. SEE ISSUE #57
	if (process.env.npm_config_user_agent?.startsWith("yarn/3")) {
		logger.warn(`  WARNING: It looks like you are using Yarn 3. This is currently not supported,
  and likely to result in a crash. Please run next-ts-cli with another
  package manager such as pnpm, npm, or Yarn Classic.`);
	}

	// Needs to be separated outside the if statement to correctly infer the type as string | undefined
	const cliProvidedName = program.args[0];
	if (cliProvidedName) {
		cliResults.appName = cliProvidedName;
	}

	cliResults.flags = program.opts();

	if (cliResults.flags.cli) {
		cliResults.packages = [];
		if (cliResults.flags.docker) cliResults.packages.push("docker");
		if (cliResults.flags.drizzle) cliResults.packages.push("drizzle");
		if (cliResults.flags.supabase) cliResults.packages.push("supabase");
		if (cliResults.flags.betterauth) cliResults.packages.push("betterAuth");
		if (cliResults.flags.clerk) cliResults.packages.push("clerk");
		if (cliResults.flags.vercelAi) cliResults.packages.push("vercelAi");

		if (cliResults.flags.supabase && cliResults.flags.betterauth){
			logger.warn("Incompatible combination Supabase and BetterAuth. Exiting.");
			process.exit(0);
		}
		if (cliResults.flags.clerk && cliResults.flags.betterauth){
			logger.warn("Incompatible combination Clerk and BetterAuth. Exiting.");
			process.exit(0);
		}
		if (cliResults.flags.supabase && cliResults.flags.clerk){
			logger.warn("Incompatible combination Supabase and Clerk. Exiting.");
			process.exit(0);
		}
		
		if (cliResults.flags.stripe) cliResults.packages.push("stripe");
		if (cliResults.flags.shadcnui) cliResults.packages.push("shadcnui");
		return cliResults;
	}

	if (cliResults.flags.default) {
		return cliResults;
	}

	// Explained below why this is in a try/catch block
	try {
		if (process.env.TERM_PROGRAM?.toLowerCase().includes("mintty")) {
			logger.warn(`  WARNING: It looks like you are using MinTTY, which is non-interactive. This is most likely because you are
  using Git Bash. If that's that case, please use Git Bash from another terminal, such as Windows Terminal.`);

			throw new IsTTYError("Non-interactive environment");
		}

		const project = await p.group(
			{
				...(!cliProvidedName && {
					name: () =>
						p.text({
							message: "Project name",
							defaultValue: cliProvidedName,
							placeholder: defaultOptions.appName,
							validate: validateAppName,
						}),
				}),
				authentication: () => {
					return p.select({
						message: "What authentication provider would you like to use?",
						options: [
							{ value: "none", label: "None" },
							{ value: "better-auth", label: "BetterAuth" },
							{ value: "clerk", label: "Clerk" },
							{ value: "supabase", label: "Supabase" },
						],
						initialValue: "none",
					});
				},
				database: ({ results }) => {
					// Skip prompt if Supabase was selected, since it has already its own db
					if (results.authentication === "supabase") {
						return;
					}
					return p.select({
						message: "What database would you like to use?",
						options: [
							{ value: "none", label: "None" },
							{ value: "neon", label: "Neon" },
						],
						initialValue: "none",
					});
				},
				orm: () => {
					return p.select({
						message: "What ORM Database would you like to use?",
						options: [
							{ value: "none", label: "None" },
							{ value: "drizzle", label: "Drizzle" },
						],
						initialValue: "none",
					});
				},
				importAlias: () => {
					return p.text({
						message: "Custom import aliases",
						defaultValue: defaultOptions.flags.alias,
						placeholder: defaultOptions.flags.alias,
						validate: validateImportAlias,
					});
				},
				additionalConfig: () => {
					return p.multiselect({
						message: "Select additional tools to install (press enter to skip)",
						options: [
							{ value: "docker", label: "Docker" },
							{ value: "stripe", label: "Stripe" },
							{ value: "shadcnui", label: "Shadcn UI" },
							{ value: "vercelAi", label: "Vercel AI Gateway" },
						],
						required: false
					});
				},
			},
			{
				onCancel() {
					process.exit(1);
				},
			},
		);

		const packages: AvailablePackages[] = [];
		const additionalConfig = project.additionalConfig as string[];
		if (project.orm === "drizzle") packages.push("drizzle");
		if (project.authentication === "better-auth") packages.push("betterAuth");
		if (project.authentication === "clerk") packages.push("clerk");
		if (
			additionalConfig.includes("supabase") ||
			project.authentication === "supabase"
		)
		packages.push("supabase");
		if (project.database === "neon") packages.push("neon");
		if (additionalConfig.includes("docker")) packages.push("docker");
		if (additionalConfig.includes("stripe")) packages.push("stripe");
		if (additionalConfig.includes("shadcnui")) packages.push("shadcnui");
		if (additionalConfig.includes("vercelAi")) packages.push("vercelAi");
		return {
			appName: project.name ?? cliResults.appName,
			packages,
			flags: {
				...cliResults.flags,
				alias: project.importAlias ?? cliResults.flags.alias,
			},
		};
	} catch (err) {
		// If the user is not calling next-ts-cli from an interactive terminal, inquirer will throw an IsTTYError
		// If this happens, we catch the error, tell the user what has happened, and then continue to run the program with a default next-ts-cli app
		if (err instanceof IsTTYError) {
			logger.warn(`
  ${CREATE_NEXT_TS_CLI} needs an interactive terminal to provide options`);

			const shouldContinue = await p.confirm({
				message: `Continue scaffolding a default next-ts-cli?`,
				initialValue: true,
			});

			if (!shouldContinue) {
				logger.info("Exiting...");
				process.exit(0);
			}

			logger.info(
				`Bootstrapping a default next-ts-cli in ./${cliResults.appName}`,
			);
		} else {
			throw err;
		}
	}

	return cliResults;
};
