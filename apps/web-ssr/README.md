# @repo/web-ssr

React 19 + TanStack Start で構築した SSR アプリケーション。TanStack Router によるファイルベースルーティングとサーバーサイドレンダリング（SSR）・Server Functions を採用しています。

## Tech Stack

| ツール | 役割 |
|-------|------|
| React 19 | UI ライブラリ |
| TanStack Start | SSR フレームワーク（Vite Environment API ベース） |
| TanStack Router | 型安全なファイルベースルーティング |
| Server Functions | `createServerFn` によるサーバー側データ取得・ミューテーション |
| Tailwind CSS 4 | ユーティリティ CSS |
| oxlint | 型認識対応の高速リンター |

## SPA との違い

| 項目 | `web-spa` (SPA) | `web-ssr` (SSR) |
|-----|----------------|----------------|
| ビルドツール | Vite (`vite.config.ts`) | Vite + TanStack Start plugin (`vite.config.ts`) |
| エントリポイント | `src/main.tsx` | `app/client.tsx` + `app/ssr.tsx` |
| データ取得 | TanStack Query (クライアント) | Server Functions + loader |
| HTML 生成 | クライアントサイド | サーバーサイド |
| CSS | `src/index.css` | `app/index.css?url` (`head()` で注入) |

## Directory Structure

```
app/
├── routes/                      # ファイルベースルーティング（TanStack Router）
│   ├── __root.tsx               # ルートレイアウト（HTML ドキュメント全体）
│   ├── index.tsx                # / ページ（Server Function で時刻取得）
│   ├── about.tsx                # /about ページ
│   └── users/                   # /users ルート
│       ├── index.tsx            # /users ページ（Server Function でユーザー取得）
│       └── -components/         # ルート専用コンポーネント
│           ├── user-list.tsx    # ユーザー一覧（SSR データを props で受け取る）
│           └── create-user-form.tsx  # ユーザー作成フォーム（Server Function でミューテーション）
│
├── client.tsx                   # クライアントサイドエントリ（ハイドレーション）
├── router.tsx                   # ルーター生成
├── ssr.tsx                      # サーバーサイドエントリ（SSR ハンドラー）
└── index.css                    # Tailwind CSS インポート

vite.config.ts                   # Vite + TanStack Start plugin 設定
tsconfig.json                    # TypeScript 設定
```

## Architecture

### Server Functions

`createServerFn` を使ってサーバー側でのみ実行されるロジックを定義します。

```ts
// GET: データ取得
const fetchUsers = createServerFn().handler(async () => {
  const res = await fetch(`${API_BASE_URL}/api/users`)
  return res.json()
})

// POST: ミューテーション（バリデーション付き）
const createUser = createServerFn({ method: 'POST' })
  .validator(createUserSchema)
  .handler(async ({ data }) => {
    // サーバーでのみ実行される
  })
```

### SSR フロー

```
1. リクエスト受信 → app/ssr.tsx
2. ルートの loader が実行（createServerFn 呼び出し）
3. HTML をサーバーでレンダリング（Streaming SSR）
4. クライアントでハイドレーション → app/client.tsx
```

### ルートレイアウト

`__root.tsx` が HTML ドキュメント全体を管理します（`<html>`, `<head>`, `<body>`）。
CSS は `head()` の `links` で注入します。

```tsx
export const Route = createRootRoute({
  head: () => ({
    meta: [...],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
})
```

## Development

```bash
# 環境変数を設定
cp .env.example .env

# 開発サーバー起動（http://localhost:3000）
pnpm dev

# ビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# 型チェック
pnpm type-check

# Lint
pnpm lint
```

## Path Aliases

`@/` は `./app/` に解決されます。

```ts
import { something } from '@/utils/something'
```

## Environment

| 変数 | デフォルト | 説明 |
|-----|---------|-----|
| `API_BASE_URL` | `http://localhost:3001` | バックエンド API のベース URL |
