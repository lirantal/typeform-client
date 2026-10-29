# Development

## Prerequisites

- Node.js compatible with this repository's packages and tooling.
- npm for dependency installation and scripts.

## Setup

```sh
npm ci --legacy-peer-deps
```

## Common Commands

- `pnpm lint` - runs lint checks.
- `pnpm test` - runs the test suite.
- `pnpm format` - formats supported files.

## Repository Notes

This repository is organized around the root package `@lirantal/typeform-client`.

## Tooling

Use Node.js 24 and the committed npm lockfile. ESLint uses `eslint.config.cjs`.
Install local hooks explicitly with `npm run prepare` after reviewing dependencies;
`.npmrc` intentionally disables automatic lifecycle scripts. Husky 9 reads
`.husky/`, and lint-staged uses the top-level file-pattern configuration.

Dependabot retains a 30-day cooldown for every version-update category.
Development major versions are proposed individually so incompatible tools are
not bundled into the regular development-dependency group. Security-update PRs
can still arrive before the cutoff; keep the install-time age gate enabled.

The legacy documentation generators still have conflicting peer declarations,
so installation retains `--legacy-peer-deps`. Engine, release-age and Git-source
restrictions remain configured in `.npmrc`; no engine or Git override is used.

`npm ci` does not recheck publication age for locked versions. Validate every
newly introduced locked version during dependency review, including transitives.
