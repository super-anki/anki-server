# Contributing to Anki Server

Thank you for your interest in contributing to Anki Server! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please be respectful and constructive in all interactions.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/anki-server.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feat/my-feature` or `git checkout -b fix/my-bugfix`

## Development Workflow

### Making Changes

1. Make your changes in the appropriate files
2. Follow the existing code style (enforced by ESLint)
3. Add or update tests if applicable
4. Run linting: `npm run lint`
5. Run tests: `npm test`
6. Build the project: `npm run build`

### Code Style

- Use 2 spaces for indentation
- No semicolons (enforced by ESLint)
- Use double quotes for strings
- Use TypeScript type imports: `import type { ... }`
- Follow existing patterns in the codebase

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `chore`: Maintenance tasks
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `build`: Build system changes
- `ci`: CI/CD changes
- `style`: Code style changes (formatting, etc.)

**Examples:**
```
feat: add support for car battery monitoring
fix: resolve connection timeout on car disconnect
docs: update API endpoint documentation
chore: update dependencies
```

### Pull Requests

1. Push your branch to your fork
2. Create a Pull Request against the `main` branch
3. Ensure your PR title follows conventional commits format
4. Provide a clear description of your changes
5. Link any related issues

**PR Title Format:**
```
feat: add new feature
fix: resolve specific bug
docs: update documentation
```

### Continuous Integration

All PRs must pass:
- ✅ Linting (`npm run lint`)
- ✅ Build (`npm run build`)
- ✅ Tests (`npm test`)
- ✅ Conventional commit validation (PR title)

GitHub Actions will automatically run these checks on your PR.

## Project Structure

```
anki-server/
├── src/
│   ├── common/          # Shared utilities
│   ├── http/handlers/   # API route handlers
│   ├── services/        # Core services
│   ├── types/           # TypeScript types
│   └── index.ts         # Entry point
├── .github/             # GitHub Actions workflows
└── dist/                # Build output (gitignored)
```

## Adding New Features

### Adding a New Endpoint

1. Create a new handler in `src/http/handlers/cars/` or `src/http/handlers/track/`
2. Export a function that accepts `Request` and `Response`
3. Add the route to `src/services/api.ts`
4. Update the README with the new endpoint documentation

Example:
```typescript
// src/http/handlers/cars/my-feature.ts
import { CarStore } from "@super-anki/anki-sdk"
import type { Request, Response } from "express"
import { Factory } from "@/common/logger"

export function MyFeatureHandler(req: Request, res: Response) {
  const car = CarStore.getInstance().getCar(req.params.id)
  
  // Your logic here
  
  Factory.getInstance().debug(`My feature executed for car ${car?.id}`)
  
  res.json({
    id: car?.id,
    status: "success",
  })
}
```

## Testing

Currently, the project has minimal test coverage. Contributions to improve testing are welcome!

When adding tests:
- Place test files next to the code they test
- Use `.test.ts` or `.spec.ts` suffix
- Follow existing testing patterns if any

## Release Process

**Note**: First-time setup of release automation requires additional configuration. See [RELEASE_SETUP.md](RELEASE_SETUP.md) for complete setup instructions.

Releases are automated via GitHub Actions:

1. Merge PRs to `main` branch
2. Release Please action creates a release PR
3. Merge the release PR to trigger:
   - Version bump
   - Changelog generation
   - GitHub Release creation
   - npm package publication to GitHub Packages

## Dependencies

### Updating Dependencies

Regular dependency updates are handled by Dependabot.

For manual updates:
```bash
npm update
npm run build
npm test
```

### @super-anki/anki-sdk

Updates to the core SDK are automatically detected by Dependabot daily. These updates should be reviewed and merged promptly to keep the server in sync with the SDK.

## Getting Help

- 💬 Open a [Discussion](https://github.com/super-anki/anki-server/discussions)
- 🐛 Report bugs via [Issues](https://github.com/super-anki/anki-server/issues)
- 📖 Check the [README](README.md) for usage documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
