# Release

This project uses Changesets CLI 3 with changesets/action 2. The CLI and action
are migrated together because action 1 targets CLI 2. The action 2 workflow uses
`publish-script`, `version-script`, `commit-message`, and `pr-title` inputs.

## Record a change

For published package behavior changes, run `npm exec changeset` or write a
patch changeset under `.changeset/` using the package name from `package.json`.
CI-only, tooling-only and test-only changes usually do not need a version bump.

## Version and publish

The release workflow runs on `master` and creates a release PR or publishes
using the configured scripts. For an intentional manual release, use:

```sh
npm run version
npm run build
npm run release
```

`npm run release` publishes packages; do not run it merely to validate a PR.
The legacy documentation tools require `npm ci --legacy-peer-deps` for setup.
Engine, source and release-age settings remain in `.npmrc`.
