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

## Coverage Reporting

CI runs Jest with the coverage thresholds in `package.json` and uploads
its coverage reports to Codecov for every contributor, including Dependabot.
Keep report selection consistent with the default branch: switching to LCOV
alone changed the reported percentage without any source changes.
The public repository uses the `lirantal` account's tokenless upload setting
in Codecov (Settings → Global Upload Token). No upload secret is passed to CI.
Upload failures fail CI. Jest enforces the coverage thresholds in `package.json`.

This repository does not require Codecov's project or patch status checks.
They are disabled in `.codecov.yml` and removed from branch protection.
Coverage uploads and the Codecov dashboard remain enabled. Branch protection
still requires one approving review.

See [Codecov status configuration](https://docs.codecov.com/docs/commit-status)
and [upload authentication](https://docs.codecov.com/docs/codecov-tokens).

Jest 30 retains the existing coverage thresholds and snapshot formatting.
Release tooling uses Changesets CLI 3 with changesets/action 2; its publish,
version, commit-message and PR-title inputs are migrated together.
