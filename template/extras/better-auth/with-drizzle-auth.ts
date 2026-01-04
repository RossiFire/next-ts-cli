import "dotenv/config";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";

/* Here imports have errors because they are related to the final directory structure */
import { db } from "@/lib/db";

if (!process.env.BETTER_AUTH_GITHUB_CLIENT_ID || !process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET) {
  throw new Error("BETTER_AUTH_GITHUB_CLIENT_ID and BETTER_AUTH_GITHUB_CLIENT_SECRET must be set");
}

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET,
      redirectURI: "http://localhost:3000/api/auth/callback/github",
    },
  },
  // Make sure nextCookies() is the last plugin in the array
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
