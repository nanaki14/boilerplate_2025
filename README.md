# boilerplate_2025

Turborepo monorepo with React frontend, Hono backend, and shared packages.

## Tech Stack

### Monorepo
- **Turborepo** - Build system for monorepos
- **pnpm** - Package manager with workspace & catalog support

### Frontend (`apps/frontend`)
- **React 19** - UI library
- **Vite 8.0** (beta) - Build tool powered by Rolldown
- **TanStack Router** - Type-safe file-based routing
- **TanStack Query** - Data fetching and caching
- **Tailwind CSS 4** - Utility-first CSS framework

### Backend (`apps/backend`)
- **Hono** - Lightweight web framework
- **Zod** - Runtime validation via `@repo/schema`

### Shared Packages
- **@repo/schema** - Zod schemas with inferred types
- **@repo/types** - Shared TypeScript type definitions
- **@repo/typescript-config** - Shared tsconfig base configurations

### Testing
- **Vitest** - Unit testing framework
- **Testing Library** - React component testing
- **happy-dom** - Fast DOM implementation for tests

### Code Quality
- **oxlint** - Fast linter with type-aware rules
- **oxfmt** - Code formatter with import/Tailwind class sorting

### TypeScript
- **@typescript/native-preview (tsgo)** - Fast TypeScript type-checking
- **typescript** - Used by build tools (tsup)

## Project Structure

```
boilerplate_2025/
├── apps/
│   ├── frontend/           # React SPA (Vite + TanStack Router)
│   │   ├── src/
│   │   │   ├── routes/     # File-based routes
│   │   │   ├── utils/      # Utility functions
│   │   │   └── test/       # Test setup
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── vitest.config.ts
│   └── backend/            # Hono API server
│       └── src/
│           └── index.ts
├── packages/
│   ├── schema/             # @repo/schema - Zod schemas
│   │   └── src/index.ts
│   ├── types/              # @repo/types - Shared types
│   │   └── src/index.ts
│   └── typescript-config/  # @repo/typescript-config - Shared tsconfig
│       ├── base.json
│       ├── react.json
│       └── node.json
├── turbo.json              # Turborepo task pipeline
├── pnpm-workspace.yaml     # Workspace & catalog config
├── .oxlintrc.json          # Linter config
└── .oxfmtrc.json           # Formatter config
```

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
# Start all dev servers (frontend + backend)
pnpm dev

# Start specific app
pnpm turbo run dev --filter=@repo/frontend
pnpm turbo run dev --filter=@repo/backend

# Run tests
pnpm test

# Type checking
pnpm type-check

# Lint code
pnpm lint

# Format code
pnpm format
pnpm format:check
```

### Build

```bash
# Build all apps
pnpm build

# Build specific app
pnpm turbo run build --filter=@repo/frontend
pnpm turbo run build --filter=@repo/backend
```

## Shared Packages

### @repo/schema

Zod schemas for runtime validation. Exports both schemas and inferred types.

```ts
import { userSchema, createUserSchema } from '@repo/schema'
import type { User, CreateUser } from '@repo/schema'
```

### @repo/types

Shared TypeScript type definitions (no runtime dependencies).

```ts
import type { ApiResponse, User } from '@repo/types'
```

### @repo/typescript-config

Shared tsconfig base files. Each app/package extends one of these:

- `base.json` - Shared base configuration
- `react.json` - For React apps (extends base)
- `node.json` - For Node.js apps (extends base)

```json
{
  "extends": "@repo/typescript-config/react.json"
}
```

## pnpm Catalog

Shared dependency versions are managed via pnpm catalog in `pnpm-workspace.yaml`. Use `catalog:` as version specifier in `package.json`:

```json
{
  "dependencies": {
    "zod": "catalog:"
  }
}
```

## Frontend / Backend 単体で使う場合

このモノレポはフロントエンドのみ、またはバックエンドのみで使うこともできます。

### フロントエンドのみ

バックエンド (`apps/backend`) を削除し、Hono RPC 関連のコードを取り除きます。

1. `apps/backend/` を削除
2. `apps/frontend/package.json` から `@repo/backend` と `hono` を削除
3. `apps/frontend/src/lib/api.ts` を削除（または fetch ベースに書き換え）
4. `apps/frontend/src/lib/hooks.ts` の RPC クライアント呼び出しを通常の fetch に差し替え

```diff
 // apps/frontend/package.json
 "dependencies": {
-  "@repo/backend": "workspace:*",
   "@repo/schema": "workspace:*",
   "@repo/types": "workspace:*",
   "@tanstack/react-query": "^5.90.14",
   "@tanstack/react-router": "^1.144.0",
-  "hono": "catalog:",
   "react": "catalog:",
   "react-dom": "catalog:"
 }
```

### バックエンドのみ

フロントエンド (`apps/frontend`) を削除します。

1. `apps/frontend/` を削除
2. ルートの `.oxfmtrc.json` から `experimentalTailwindcss` セクションを削除（Tailwind CSS は不要）
3. 必要に応じて `packages/types`, `packages/schema` はそのまま利用可能

### 共通手順

どちらの場合も以下を実施してください。

```bash
# 不要な app を削除した後
pnpm install    # lockfile を再生成
pnpm build      # ビルド確認
```

`turbo.json`, `pnpm-workspace.yaml`, `packages/` はそのまま動作します。残った app とパッケージだけが対象になります。

## Notes

### Internal Packages Pattern
`@repo/schema` and `@repo/types` use the internal packages pattern - they export TypeScript source directly without a build step. Both Vite and tsx handle TypeScript resolution natively.

### Vite 8 Beta
This project uses Vite 8.0.0-beta powered by Rolldown. The `pnpm.overrides` configuration ensures Vitest uses the same Vite version.

### Ports
- Frontend dev server: `http://localhost:5173`
- Backend dev server: `http://localhost:3001`

## Scripts Reference

| Script | Description |
|--------|-------------|
| `dev` | Start all dev servers |
| `build` | Build all apps |
| `test` | Run all tests |
| `type-check` | TypeScript type checking |
| `lint` | Lint all packages |
| `format` | Format all code |
| `format:check` | Check formatting |
