# Contributing to AI Research Workspace

Thanks for helping improve AI Research Workspace. Please open an issue before starting a large change so the approach can be discussed.

## Local development

Follow the setup in [README.md](README.md). Use Node.js 24 and pnpm 11, then run:

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm build:eve
```

Do not commit `.env.local`, `.aiworkspace/`, linked project files, generated builds, or API credentials. Update the README and `.env.example` when changing setup or configuration. Explain behavior changes and how you checked them in pull requests.

## Contribution terms

AI Research Workspace is source available under the [PolyForm Noncommercial License 1.0.0](LICENSE.md), and when you submit a pull request, your contribution is licensed under the same terms as the rest of the project.

## Reporting problems

For bugs and feature requests, open a GitHub issue with steps to reproduce and the expected behavior. For vulnerabilities, follow [SECURITY.md](SECURITY.md) instead of posting details publicly.
