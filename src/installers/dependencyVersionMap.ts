/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
	// Better-Auth
	"better-auth": "^1.5.6",

	// Drizzle
	"drizzle-kit": "^0.31.10",
	"drizzle-orm": "^0.45.1",
	"postgres": "^3.4.8",

	// TailwindCSS
	"tailwindcss": "^4.2.2",
	"postcss": "^8.5.8",
	"@tailwindcss/postcss": "^4.2.2",

	// biome
	"@biomejs/biome": "2.4.8",

	// Supabase
	"@supabase/ssr": "^0.9.0",
	"@supabase/supabase-js": "^2.100.0",

	// Stripe
	"@stripe/react-stripe-js": "^5.6.1",
	"@stripe/stripe-js": "^8.11.0",
	"stripe": "^20.4.1",

	// Clerk
	"@clerk/nextjs": "^7.0.6",

	// Neon
	"@neondatabase/serverless": "^1.0.2",

	// Vercel AI Gateway
	"ai": "^6.0.137",
	"@ai-sdk/react": "^3.0.139",

} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
