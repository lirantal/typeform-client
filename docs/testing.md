# Testing

## Test Command

Run the test suite with:

```sh
npm run test
```

## Linting

Run lint checks with:

```sh
npm run lint
```

## Expectations

- Add or update tests for behavior changes.
- Run the relevant package-level checks before opening a PR.
- Keep generated coverage, build output, and dependency folders out of commits.

Jest 30 retains the existing coverage thresholds and snapshot formatting.
Release tooling uses Changesets CLI 3 with changesets/action 2; its publish,
version, commit-message and PR-title inputs are migrated together.
