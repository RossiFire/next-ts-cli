import path from "path";
import fs from "fs-extra";

import type { PkgInstallerMap } from "@/installers/index.js";

interface GenerateReadmeOptions {
  projectDir: string;
  projectName: string;
  packages: PkgInstallerMap;
}

export const generateReadme = ({ projectDir, projectName, packages }: GenerateReadmeOptions) => {
  const content = generateReadmeContent(projectName, packages);
  fs.writeFileSync(path.join(projectDir, "README.md"), content);
};

const generateReadmeContent = (projectName: string, packages: PkgInstallerMap): string => {
  const sections: string[] = [];

  // Header
  sections.push(`# ${projectName}

This project was bootstrapped with [next-ts-cli](https://github.com/RossiFire/next-ts-cli).

## Base Tech Stack

- **Next.js 16** — React framework with App Router
- **Tailwind CSS 4** — Utility-first CSS
- **Husky** — Git hooks
- **Commitlint** — Commit message linting
- **Lint-staged** — Run linters on staged files
- **Biome** — Linter and formatter
- **Jest** — Testing framework`);

  // Optional packages
  const features: string[] = [];
  if (packages.clerk.inUse) features.push("- **Clerk** — Fast authentication");
  if (packages.betterAuth.inUse) features.push("- **BetterAuth** — Flexible authentication");
  if (packages.supabase.inUse) features.push("- **Supabase** — Auth & database with real-time capabilities");
  if (packages.drizzle.inUse) features.push("- **Drizzle ORM** — Type-safe database queries");
  if (packages.shadcnui.inUse) features.push("- **Shadcn UI** — UI library");
  if (packages.stripe.inUse) features.push("- **Stripe** — Payment checkout and webhooks boilerplate to easily create SaaS features");
  if (packages.docker.inUse) features.push("- **Docker** — Containerization");
  if (packages.vercelAi.inUse) features.push("- **Vercel AI Gateway** — AI capabilities witsh chat API route boilerplate");
  if (features.length > 0) {
    sections.push(`\n### Selected Integrations\n\n${features.join("\n")}`);
  }

  // Scripts
  sections.push(`
## Getting Started

\`\`\`bash
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| \`npm run dev\` | Start development server |
| \`npm run build\` | Build for production |
| \`npm run start\` | Start production server |
| \`npm run lint\` | Lint code |
| \`npm run test\` | Run tests |`);

  // Docker scripts
  if (packages.docker.inUse) {
    sections.push(`| \`npm run docker:build\` | Build Docker image |
| \`npm run docker:up\` | Start containers |
| \`npm run docker:down\` | Stop containers |`);
  }

  // Drizzle scripts
  if (packages.drizzle.inUse) {
    sections.push(`| \`npm run db:generate\` | Generate migrations |
| \`npm run db:migrate\` | Run migrations |
| \`npm run db:studio\` | Open Drizzle Studio |`);
  }

  // Environment variables
  const envVars: string[] = [];
  if (packages.drizzle.inUse) {
    envVars.push("DATABASE_URL=");
  }
  if (packages.betterAuth.inUse) {
    envVars.push("BETTER_AUTH_SECRET=", "BETTER_AUTH_URL=http://localhost:3000");
  }
  if (packages.supabase.inUse) {
    envVars.push("NEXT_PUBLIC_SUPABASE_URL=", "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=");
  }
  if (packages.stripe.inUse) {
    envVars.push("STRIPE_SECRET_KEY=", "STRIPE_WEBHOOK_SECRET=", "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=");
  }
  if (packages.clerk.inUse) {
    envVars.push("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=", "CLERK_SECRET_KEY=");
  }
  if (packages.vercelAi.inUse) {
    envVars.push("AI_GATEWAY_API_KEY=");
  }

  return sections.join("\n");
};

