/*
 * This maps the necessary packages to a version.
 * This improves performance significantly over fetching it from the npm registry.
 */
export const dependencyVersionMap = {
	// Better-Auth
	"better-auth": "^1.4.10",

	// Drizzle
	"drizzle-kit": "^0.31.5",
	"drizzle-orm": "^0.41.0",
	"postgres": "^3.4.7",

	// TailwindCSS
	"tailwindcss": "^4.0.15",
	"postcss": "^8.5.3",
	"@tailwindcss/postcss": "^4.0.15",

	// biome
	"@biomejs/biome": "^2.3.10",

	// Supabase
	"@supabase/ssr": "^0.8.0",
	"@supabase/supabase-js": "^2.89.0",

	// Stripe
	"@stripe/react-stripe-js": "^5.4.1",
	"@stripe/stripe-js": "^8.6.0",
	"stripe": "^20.1.0",

	// Clerk
	"@clerk/nextjs": "^6.36.5",

	// Neon
	"@neondatabase/serverless": "^1.0.2",

	// Vercel AI Gateway
    "ai": "^6.0.6",
    "@ai-sdk/react": "^3.0.6",

} as const;
export type AvailableDependencies = keyof typeof dependencyVersionMap;
