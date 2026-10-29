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
`coverage/lcov.info` to Codecov for every contributor, including Dependabot.
The public repository currently accepts tokenless uploads; `CODECOV_TOKEN` can
also be supplied as an Actions secret and a Dependabot secret if authentication
is required in the future. Upload failures fail CI.

Branch protection requires `codecov/project` and `codecov/patch` plus one
approving review. Keep these requirements enabled. `.codecov.yml` explicitly
enables both statuses with automatic targets and no allowed coverage drop.

If an upload completes but GitHub keeps showing expected checks, confirm that
the commit has finished processing on Codecov, then check the Codecov GitHub
App's repository access and the repository's integration settings. A successful
upload alone does not prove that Codecov can publish statuses to GitHub.
See [Codecov status configuration](https://docs.codecov.com/docs/commit-status)
and [upload authentication](https://docs.codecov.com/docs/codecov-tokens).
