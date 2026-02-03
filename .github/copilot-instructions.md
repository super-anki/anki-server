# GitHub Copilot Instructions for Anki Server

## Development Workflow

### Branching Strategy

This project uses a **dev branch workflow** to separate feature development from releases:

- **`main` branch**: Production-ready code. Merges to this branch trigger automatic releases.
- **`dev` branch**: Development branch for feature integration. All feature branches should be created from and merged into `dev`.

### Creating New Features

1. **Always branch from `dev`**:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feat/your-feature-name
   ```

2. **Create Pull Requests targeting `dev`**:
   - When opening a PR, set the base branch to `dev`
   - Do not merge directly to `main` for regular features

3. **Conventional Commits**:
   - All commits and PR titles must follow [Conventional Commits](https://www.conventionalcommits.org/)
   - Format: `<type>(<scope>): <subject>`
   - Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `perf`, `test`, `build`, `ci`, `style`
   - Example: `feat: add battery monitoring endpoint`

### Branch Lifecycle

- **Feature branches** are automatically deleted after PR merge
- **Release process**: Periodically, `dev` is merged to `main` to trigger a release

### Code Standards

- Use TypeScript with strict typing
- Follow ESLint rules (run `npm run lint`)
- Write tests when applicable
- Ensure all CI checks pass before merging

## Project Structure

- `src/common/` - Shared utilities (logger, etc.)
- `src/http/handlers/` - API route handlers
- `src/services/` - Core services
- `src/types/` - TypeScript type definitions

## Key Commands

- `npm start` - Development server with auto-reload
- `npm run build` - Build for production
- `npm run lint` - Check code style
- `npm test` - Run tests
