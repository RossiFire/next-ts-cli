import type { PackageManager } from "@/utils/getUserPkgManager.js";
import { envVariablesInstaller } from "@/installers/envVars.js";
import { betterAuthInstaller } from "./betterAuth.js";
import { drizzleInstaller } from "./drizzle.js";
import { dockerInstaller } from "./docker.js";
import { supabaseInstaller } from "./supabase.js";
import { stripeInstaller } from "./stripe.js";
import { shadcnUIInstaller } from "./shadcnui.js";
import { clerkInstaller } from "./clerk.js";
import { neonInstaller } from "./neon.js";
import { vercelAiInstaller } from "./vercelAi.js";
// Turning this into a const allows the list to be iterated over for programmatically creating prompt options
// Should increase extensibility in the future
export const availablePackages = [
	"docker",
	"betterAuth",
	"supabase",
	"drizzle",
	"envVariables",
	"stripe",
	"shadcnui",
	"clerk",
	"neon",
	"vercelAi"
] as const;
export type AvailablePackages = (typeof availablePackages)[number];

export interface InstallerOptions {
	projectDir: string;
	pkgManager: PackageManager;
	packages?: PkgInstallerMap;
	projectName: string;
	scopedAppName: string;
}

export type Installer = (opts: InstallerOptions) => void;

export type PkgInstallerMap = Record<
	AvailablePackages,
	{
		inUse: boolean;
		installer: Installer;
	}
>;

export const buildPkgInstallerMap = (
	packages: AvailablePackages[],
): PkgInstallerMap => ({
	docker: {
		inUse: packages.includes("docker"),
		installer: dockerInstaller,
	},
	betterAuth: {
		inUse: packages.includes("betterAuth"),
		installer: betterAuthInstaller,
	},
	drizzle: {
		inUse: packages.includes("drizzle"),
		installer: drizzleInstaller,
	},
	envVariables: {
		inUse: true,
		installer: envVariablesInstaller,
	},
	supabase: {
		inUse: packages.includes("supabase"),
		installer: supabaseInstaller,
	},
	stripe: {
		inUse: packages.includes("stripe"),
		installer: stripeInstaller,
	},
	shadcnui: {
		inUse: packages.includes("shadcnui"),
		installer: shadcnUIInstaller,
	},
	clerk: {
		inUse: packages.includes("clerk"),
		installer: clerkInstaller,
	},
	neon: {
		inUse: packages.includes("neon"),
		installer: neonInstaller,
	},
	vercelAi: {
		inUse: packages.includes("vercelAi"),
		installer: vercelAiInstaller,
	}
});
