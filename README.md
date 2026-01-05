<div align="center">

```
                   __          __                     __ __ 
.-----.-----.--.--|  |_ ______|  |_.-----.______.----|  |__|
|     |  -__|_   _|   _|______|   _|__ --|______|  __|  |  |
|__|__|_____|__.__|____|      |____|_____|      |____|__|__|
```

**Minimal CLI to scaffold a production-ready Next.js applications**

[![npm version](https://img.shields.io/npm/v/next-ts-cli.svg)](https://www.npmjs.com/package/next-ts-cli)
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/next-ts-cli?style=flat&color=%231dd1a1)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22.0.0-brightgreen.svg)](https://nodejs.org/)

[Getting Started](#getting-started) •
[Integrations](#integrations) •
[Core Stack](#core-stack) •
[CLI Options](#cli-options) •
[Contributing](#contributing)

</div>


## Getting Started

### Quick start

```bash
# npm
npx next-ts-cli@latest

# pnpm
pnpm create next-ts-cli

# yarn
yarn create next-ts-cli

# bun
bun next-ts-cli
```
The CLI will guide you through the setup process:

```
◆ Project name
│ my-awesome-app
│
◆ What authentication provider would you like to use?
│ ○ None  ○ BetterAuth  ○ Clerk  ● Supabase

etc...
```

### Non-interactive usage
You can also scaffold the project without the interactive configuration. **--cli** command is required to do that.
```bash
# npm
npx next-ts-cli my-app --cli --supabase --drizzle --shadcnui --stripe
```



## Integrations

🔐 **Authentication** — Choose between Clerk, Supabase or BetterAuth for authenticating your app

🗄️ **Database** — Select between Neon database or Supabase to store users and stuff.

⚙️ **ORM** — Drizzle ORM integration for type-safe database queries

💳 **Stripe** — Stripe Payments integration with checkout sessions and webhooks

🐳 **Docker** — Production Dockerfile and docker-compose configuration

🎨 **Shadcn/ui** - With neutral configuration to start building compound components 

💡 **AI Integration** - Vercel AI Gateway for building AI apps


_*These integrations are all optional, so not required to scaffold the core project_

Beside these, there is also another automatic feature:

📁 **MCP Configurations** - Dynamically MCP Servers for Cursor and VSCode loaded bases on selected integrations 


## Core Stack
The core project structure contains the following features:

🌐 **Next.js** - With App router and always up to date.

💨 **Tailwind CSS v4** - Style fast and efficiently with the latest version of Tailwind CSS.

🐶 **Husky** - Automatically lint your commit messages, code, and run tests upon committing or pushing.

🔹 **Biome** - Fast linting and formatter tool (~35x faster than Prettier)

➿ **Conventional Commits** - Define commit messages convention in your project

💡 **SEO** - Metadata, Microdata, Sitemap, robots.txt and Manifest. Having online presence has never been easier

📊 **Google Analytics** - Natively integrated with Next.js

🔨 **Jest** - Last but not least, make Test Driven Development your standard 

## CLI Options

| Flag | Description |
|------|-------------|
| `--cli` | Run in CLI mode (non-interactive) |
| `-d, --default` | Scaffold the project without any additional integrations |
| `-a, --alias <alias>` | Set custom import alias (default: `@/`) |
| `-v, --version` | Display version number |
| `--docker` | Include Docker configuration (CLI mode) |
| `--drizzle` | Include Drizzle ORM (CLI mode) |
| `--supabase` | Include Supabase auth (CLI mode) |
| `--betterauth` | Include BetterAuth (CLI mode) |
| `--clerk` | Include Clerk.js (CLI mode) |
| `--neon` | Include Neon database (CLI mode) |
| `--stripe` | Include Stripe integration (CLI mode) |
| `--shadcnui` | Include Shadcn UI (CLI mode) |
| `--vercelAi` | Include Vercel AI Gateway (CLI mode) |

**Note:** Package flags (`--docker`, `--drizzle`, etc.) must be used with `--cli` flag to skip interactive prompts.

### Examples

```bash
# Create with defaults
npx next-ts-cli my-app --cli -d

# Create with specific packages (CLI mode)
npx next-ts-cli my-app --cli --drizzle --betterauth --stripe

# Custom import alias
npx next-ts-cli my-app --cli -a "~/"

# Full stack example
npx next-ts-cli my-app --cli --drizzle --betterauth --stripe --docker --shadcnui
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a Pull Request.

### Quick Setup

```bash
# Fork and clone
gh repo fork rossifire/next-ts-cli
gh repo clone <your-github-name>/next-ts-cli

# Install dependencies
pnpm install

# Start development
pnpm dev
```

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Credits

This project is inspired by [create-t3-app](https://github.com/t3-oss/create-t3-app).

<div align="center">

**Made with ❤️ by [Daniele Rossino](https://github.com/RossiFire)**

[⭐ Star on GitHub](https://github.com/RossiFire/next-ts-cli) • [🐛 Report Bug](https://github.com/RossiFire/next-ts-cli/issues) • [✨ Request Feature](https://github.com/RossiFire/next-ts-cli/issues)

</div>


