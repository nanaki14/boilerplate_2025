# boilerplate_2025

Turborepo モノレポ。React フロントエンド・Hono バックエンド・共有パッケージで構成されています。

## Tech Stack

### Monorepo
- **Turborepo** - タスクパイプラインとキャッシュを管理するビルドシステム
- **pnpm** - ワークスペース & カタログによる依存バージョン一元管理

### Frontend (`apps/frontend`)
- **React 19** - React Compiler プラグインによる自動最適化
- **Vite 8.0** (beta) - Rolldown ベースの高速ビルドツール
- **TanStack Router** - 型安全なファイルベースルーティング
- **TanStack Query** - データフェッチとキャッシング
- **Tailwind CSS 4** - Vite プラグイン統合のユーティリティ CSS

### Backend (`apps/backend`)
- **Hono** - 軽量 Web フレームワーク（Node.js サーバー）
- **Zod** - `@repo/schema` 経由のバリデーション
- **Hono RPC** - フロントエンドと共有する型安全 API クライアント

### Shared Packages
- **@repo/schema** - Zod スキーマと推論型
- **@repo/types** - 共有 TypeScript 型定義
- **@repo/typescript-config** - 共有 tsconfig ベース設定

### Testing
- **Vitest** - ユニットテストフレームワーク
- **Testing Library** - React コンポーネントテスト
- **happy-dom** - テスト用高速 DOM 実装

### Code Quality
- **oxlint** - Rust 製の高速リンター（型認識ルール対応）
- **oxfmt** - インポート順・Tailwind クラス順ソート対応フォーマッター

### TypeScript
- **tsgo** (`@typescript/native-preview`) - 高速型チェック
- **typescript** - ビルドツール（tsup）用

---

## Project Structure

```
boilerplate_2025/
├── apps/
│   ├── frontend/                    # React SPA
│   │   ├── src/
│   │   │   ├── components/          # グローバル共有コンポーネント
│   │   │   ├── lib/
│   │   │   │   └── api/             # API クライアント・クエリオプション
│   │   │   │       ├── client.ts    # Hono RPC クライアント
│   │   │   │       └── users.ts     # fetch 関数・queryOptions
│   │   │   ├── routes/              # ファイルベースルーティング
│   │   │   │   ├── __root.tsx       # ルートレイアウト
│   │   │   │   ├── index.tsx        # / ページ
│   │   │   │   ├── about.tsx        # /about ページ
│   │   │   │   └── users/           # /users ルート（ディレクトリ）
│   │   │   │       ├── index.tsx    # /users ページ
│   │   │   │       ├── -hooks.ts    # ルート専用 React Query フック
│   │   │   │       └── -components/ # ルート専用コンポーネント
│   │   │   ├── utils/               # ユーティリティ関数とテスト
│   │   │   └── test/                # テストセットアップ
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── vitest.config.ts
│   └── backend/                     # Hono API サーバー
│       └── src/
│           ├── index.ts             # サーバーエントリポイント（ポート 3001）
│           ├── app.ts               # Hono アプリ定義・CORS・ルート登録
│           └── routes/
│               └── users.ts         # /api/users エンドポイント
├── packages/
│   ├── schema/                      # @repo/schema - Zod スキーマ
│   │   └── src/index.ts
│   ├── types/                       # @repo/types - 共有型定義
│   │   └── src/index.ts
│   └── typescript-config/           # @repo/typescript-config - tsconfig
│       ├── base.json
│       ├── react.json
│       └── node.json
├── turbo.json                       # Turborepo タスクパイプライン
├── pnpm-workspace.yaml              # ワークスペース & カタログ設定
├── .oxlintrc.json                   # リンター設定
└── .oxfmtrc.json                    # フォーマッター設定
```

---

## Architecture Overview

### データフロー

```
Frontend                          Backend
──────────────────────────────    ────────────────────
lib/api/client.ts (Hono RPC)  →  app.ts
lib/api/users.ts (queryOptions)       └── routes/users.ts
routes/users/-hooks.ts (React)            └── @repo/schema (validation)
routes/users/-components/
```

### パッケージ依存関係

```
apps/frontend
  ├── @repo/backend   (型のみ: AppType)
  ├── @repo/schema    (型: User, CreateUser)
  └── @repo/types     (型: ApiResponse 等)

apps/backend
  ├── @repo/schema    (Zod バリデーション)
  └── @repo/types

packages/schema
  └── zod

packages/types
  └── (依存なし)
```

### Internal Packages パターン

`@repo/schema` と `@repo/types` はビルドステップなしで TypeScript ソースを直接エクスポートします。Vite と tsx がネイティブで TypeScript を解決するため、`tsc` によるビルドが不要です。

---

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
# フロントエンド・バックエンドを同時起動
pnpm dev

# 個別起動
pnpm turbo run dev --filter=@repo/frontend
pnpm turbo run dev --filter=@repo/backend
```

| サービス | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3001 |

---

## Scripts Reference

| Script | Description |
|--------|-------------|
| `pnpm dev` | 全開発サーバー起動 |
| `pnpm build` | 全アプリビルド |
| `pnpm test` | 全テスト実行 |
| `pnpm type-check` | TypeScript 型チェック |
| `pnpm lint` | 全パッケージ lint |
| `pnpm format` | コードフォーマット |
| `pnpm format:check` | フォーマットチェック |

### 個別実行

```bash
pnpm turbo run <script> --filter=@repo/frontend
pnpm turbo run <script> --filter=@repo/backend
pnpm turbo run <script> --filter=@repo/schema
```

---

## Shared Packages

### @repo/schema

Zod スキーマによるランタイムバリデーション。スキーマと推論型の両方をエクスポート。

```ts
import { userSchema, createUserSchema } from '@repo/schema'
import type { User, CreateUser } from '@repo/schema'
```

### @repo/types

ランタイム依存なしの共有 TypeScript 型定義。

```ts
import type { ApiResponse, User } from '@repo/types'
```

### @repo/typescript-config

共有 tsconfig ベースファイル。各アプリ・パッケージはいずれかを extends します。

| ファイル | 用途 |
|---------|-----|
| `base.json` | 共通ベース設定 |
| `react.json` | React アプリ用（DOM lib 追加） |
| `node.json` | Node.js アプリ用 |

```json
{ "extends": "@repo/typescript-config/react.json" }
```

---

## pnpm Catalog

共有依存バージョンは `pnpm-workspace.yaml` の catalog で一元管理します。`package.json` では `catalog:` を version specifier として使用します。

```json
{ "dependencies": { "zod": "catalog:" } }
```

---

## Frontend / Backend 単体で使う場合

### フロントエンドのみ

1. `apps/backend/` を削除
2. `apps/frontend/package.json` から `@repo/backend` と `hono` を削除
3. `apps/frontend/src/lib/api/client.ts` を削除（または fetch ベースに書き換え）
4. `apps/frontend/src/lib/api/users.ts` の RPC 呼び出しを通常の fetch に差し替え

### バックエンドのみ

1. `apps/frontend/` を削除
2. `.oxfmtrc.json` から `experimentalTailwindcss` セクションを削除

### 共通手順

```bash
pnpm install   # lockfile を再生成
pnpm build     # ビルド確認
```

---

## Notes

### Vite 8 Beta
Rolldown ベースの Vite 8.0.0-beta を使用しています。`pnpm.overrides` で Vitest が同じ Vite バージョンを使うよう設定されています。

### TanStack Router ファイルベースルーティング
`-` プレフィックスのファイル・ディレクトリはルーターに無視されます（例: `-hooks.ts`, `-components/`）。ルート専用のコンポーネントやフックをルートファイルに同居させる際に使用します。
