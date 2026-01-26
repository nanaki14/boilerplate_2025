# boilerplate_2025

Modern React application boilerplate with cutting-edge tooling.

## Tech Stack

### Core
- **React 19.2** - UI library
- **TypeScript** - Type safety with [@typescript/native-preview](https://github.com/microsoft/TypeScript)
- **Vite 8.0** (beta) - Build tool powered by Rolldown

### Routing & State Management
- **TanStack Router 1.144** - Type-safe routing
- **TanStack Query 5.90** - Data fetching and caching

### Styling
- **Tailwind CSS 4.1** - Utility-first CSS framework

### Testing
- **Vitest 4.0** - Unit testing framework
- **Testing Library** - React component testing
- **happy-dom** - Fast DOM implementation for tests

### Code Quality
- **oxc (oxlint + oxfmt)** - Fast linting and formatting
  - oxlint 1.41 - Linter with type-aware rules
  - oxfmt 0.26 - Code formatter with import/class sorting
- **oxlint-tsgolint 0.11** - TypeScript-specific linting rules

### Build & Development
- **pnpm** - Fast, disk space efficient package manager
- **tsgo** - TypeScript compiler from @typescript/native-preview

## Editor Setup

### Required Plugins

#### VS Code / Cursor
1. **[Oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)** - For linting and formatting
   - Install from VS Code Marketplace: `oxc.oxc-vscode`
   - Already configured in `.vscode/settings.json`

2. **TypeScript Workspace Version**
   - The project uses `@typescript/native-preview`
   - When prompted, select "Use Workspace Version" for TypeScript
   - Or manually: `Cmd+Shift+P` → "TypeScript: Select TypeScript Version" → "Use Workspace Version"

### Configuration Files

- `.vscode/settings.json` - VS Code workspace settings
- `.oxfmtrc.json` - Oxfmt formatter configuration
- `.npmrc` - pnpm configuration for rolldown bindings
- `tsconfig.json` - TypeScript configuration
- `vitest.config.ts` - Test configuration

## Getting Started

### Prerequisites
- Node.js 22+
- pnpm 10.16+

### Installation

```bash
pnpm install
```

### Development

```bash
# Start development server
pnpm dev

# Run tests
pnpm test

# Type checking
pnpm type-check

# Lint code
pnpm lint

# Format code
pnpm format

# Check formatting
pnpm format:check
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Project Structure

```
boilerplate_2025/
├── src/
│   ├── routes/         # TanStack Router routes
│   ├── utils/          # Utility functions
│   ├── test/           # Test setup
│   ├── main.tsx        # Application entry point
│   └── index.css       # Global styles
├── .vscode/            # VS Code configuration
├── package.json
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## Notes

### Vite 8 Beta
This project uses Vite 8.0.0-beta, which is powered by Rolldown. The `pnpm.overrides` configuration ensures Vitest uses the same Vite version.

### oxfmt Features
- **Import Sorting**: Automatically organizes imports by type (side-effect, builtin, external, internal, etc.)
- **Tailwind Class Sorting**: Sorts Tailwind CSS classes in `className` attributes and `cn`/`clsx` functions

### TypeScript Native Preview
The project uses `@typescript/native-preview` (tsgo) for faster TypeScript compilation. Make sure your editor is configured to use the workspace TypeScript version.

## Scripts Reference

| Script | Description |
|--------|-------------|
| `dev` | Start development server |
| `build` | Build for production |
| `preview` | Preview production build |
| `test` | Run tests in watch mode |
| `type-check` | Run TypeScript type checking |
| `lint` | Lint code with oxlint |
| `format` | Format code with oxfmt |
| `format:check` | Check if code is formatted |
