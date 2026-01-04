import type { UserConfig } from "@commitlint/types";

export default {
	extends: ["@commitlint/config-conventional"],
	rules: {
		"type-enum": [
			2,
			"always",
			[
				"feat",
				"fix",
				"test",
				"ref",
				"refactor",
				"revert",
				"security",
				"build",
				"ci",
				"docs",
				"perf",
			],
		],
		"header-max-length": () => [0, "always", 50],
	},
} satisfies UserConfig;
