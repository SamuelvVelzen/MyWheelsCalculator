# MyWheels Calculator

An unofficial community tool for estimating the cost of a [MyWheels](https://www.mywheels.nl/) trip. Pick your subscription, car type, rental period, distance, and optional extras to see a price breakdown you can share via URL.

**This project is not affiliated with MyWheels.** Rates are maintained manually and may not always match the latest official pricing.

## Features

- **Trip calculator** — estimate cost by subscription (Start / Plus / Pro), car type (Compact / Comfort / Extra / Premium), rental period, distance, and MyWheels Trips packages
- **Routes** — plan multiple trips and compare total cost
- **Shareable links** — calculator state is synced to URL query params
- **Bilingual** — Dutch and English
- **Dark mode** — system-aware theme toggle
- **Prerendered static build** — fast loads on GitHub Pages

## Tech stack

- [Angular 19](https://angular.dev/) with standalone components
- [Nx](https://nx.dev/) monorepo
- [Tailwind CSS 4](https://tailwindcss.com/)
- [date-fns](https://date-fns.org/), [Flatpickr](https://flatpickr.js.org/), [ng-icons](https://ng-icons.github.io/ng-icons/)

## Project structure

```
apps/MyWheelsCalculator/     Main Angular application
libs/feature/calculator/     Calculator logic and UI
libs/feature/routes/         Multi-route planning
libs/shared/ui/              Reusable UI components
libs/shared/util/            Translations, pipes, helpers
```

Path aliases: `@mwc/calculator`, `@mwc/routes`, `@mwc/ui`, `@mwc/util`

## Getting started

**Requirements:** Node.js 18+

```sh
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200).

To expose the dev server on your local network:

```sh
npm run start-remote
```

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Dev server |
| `npm run start-remote` | Dev server on `0.0.0.0:4200` |
| `npm run build:github-pages` | Production build for GitHub Pages |
| `npx nx build MyWheelsCalculator` | Standard production build |
| `npx nx serve-static MyWheelsCalculator` | Serve the static browser build locally |
| `npx nx test MyWheelsCalculator` | Unit tests |
| `npx nx lint MyWheelsCalculator` | ESLint |

## Deployment (GitHub Pages)

The site deploys automatically on every push to `main` via [GitHub Actions](.github/workflows/deploy.yml).

**One-time setup:**

1. Open the repo on GitHub → **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**

After the first successful deploy, the site will be available at:

**https://samuelvvelzen.github.io/MyWheelsCalculator/**

### Custom domain

To use your own domain instead of the `github.io` URL:

1. Add a `CNAME` file or configure the domain under **Settings → Pages**
2. Change `baseHref` in the `github-pages` build configuration to `/` (repo root)

### Local GitHub Pages build

```sh
npm run build:github-pages
```

Output is written to `dist/apps/MyWheelsCalculator/browser/`.

## License

MIT
