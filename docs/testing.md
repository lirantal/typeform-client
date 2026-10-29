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

## Required Coverage Checks

CI runs Jest with the coverage thresholds in `package.json` and uploads
its coverage reports to Codecov for every contributor, including Dependabot.
Keep report selection consistent with the default branch: switching to LCOV
alone changed the reported percentage without any source changes.
The public repository uses the `lirantal` account's tokenless upload setting
in Codecov (Settings → Global Upload Token). No upload secret is passed to CI.
Upload failures fail CI. The Codecov GitHub App separately needs access to this
repository to publish coverage checks and PR comments.

Branch protection requires `codecov/project` and `codecov/patch` plus one
approving review. Keep these requirements enabled. `.codecov.yml` explicitly
enables both statuses with automatic targets and no allowed coverage drop.

If an upload completes but GitHub keeps showing expected checks, confirm that
the commit has finished processing on Codecov, then check the Codecov GitHub
App's repository access and the repository's integration settings. A successful
upload alone does not prove that Codecov can publish statuses to GitHub.
See [Codecov status configuration](https://docs.codecov.com/docs/commit-status)
and [upload authentication](https://docs.codecov.com/docs/codecov-tokens).
