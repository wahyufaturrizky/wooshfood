# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Local Development

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build and run the application for production:

```bash
# npm
npm install
npm run build
node .output/server/index.mjs
```

## Required Environment Variables
You will need to generate an API key from Odoo site before proceeding.
Examples:
NUXT_CORE_BASE_URL_QR=https://development.core.wooshfood.com
NUXT_X_ODOO_API_KEY_QR=d2198e1b0034501d96b08843f**********

NUXT_CORE_BASE_URL_BOOKING=https://development.core.wooshfood.com
NUXT_X_ODOO_API_KEY_BOOKING=d2198e1b0034501d96b08843f**********

NUXT_CORE_BASE_URL_LOYALTY=https://development.core.wooshfood.com
NUXT_X_ODOO_API_KEY_LOYALTY=d2198e1b0034501d96b08843f**********
