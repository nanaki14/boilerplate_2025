# @repo/web-spa

React 19 + Vite 8 で構築した SPA。TanStack Router によるファイルベースルーティングと TanStack Query によるデータフェッチを採用しています。

## Tech Stack

| ツール          | 役割                                             |
| --------------- | ------------------------------------------------ |
| React 19        | UI ライブラリ（React Compiler による自動最適化） |
| Vite 8.0 (beta) | Rolldown ベースのビルドツール                    |
| TanStack Router | 型安全なファイルベースルーティング               |
| TanStack Query  | データフェッチ・キャッシング・ミューテーション   |
| Hono RPC        | バックエンドとの型共有 API クライアント          |
| Tailwind CSS 4  | Vite プラグイン統合のユーティリティ CSS          |
| Vitest          | ユニットテスト                                   |
| oxlint          | 型認識対応の高速リンター                         |

## Directory Structure

```
src/
├── components/                  # グローバル共有コンポーネント
│   ├── error-boundary.tsx       # React Error Boundary（クラスコンポーネント）
│   └── error-fallback.tsx       # エラー表示 UI・404 ページ
│
├── lib/
│   └── api/                     # API 通信レイヤー（React 非依存）
│       ├── client.ts            # Hono RPC クライアントのインスタンス
│       └── users.ts             # users の fetch 関数・queryOptions
│
├── routes/                      # ファイルベースルーティング（TanStack Router）
│   ├── __root.tsx               # ルートレイアウト（ナビゲーション・エラー境界）
│   ├── index.tsx                # / ページ
│   ├── about.tsx                # /about ページ
│   └── users/                   # /users ルート（ディレクトリ構造）
│       ├── index.tsx            # /users ページ・ルート定義
│       ├── -hooks.ts            # ルート専用 React Query フック
│       └── -components/         # ルート専用コンポーネント（ルーターに無視される）
│           ├── user-list.tsx    # ユーザー一覧
│           └── create-user-form.tsx  # ユーザー作成フォーム
│
├── utils/                       # ユーティリティ関数
│   ├── math.ts                  # 汎用計算関数
│   └── math.test.ts             # ユニットテスト
│
├── test/
│   └── setup.ts                 # Vitest + Testing Library セットアップ
│
├── main.tsx                     # アプリエントリポイント
├── index.css                    # Tailwind CSS インポート
└── vite-env.d.ts                # Vite 環境変数型定義
```

## Architecture

### レイヤー設計

```
routes/*/index.tsx          ← ページコンポーネント（ルート定義）
routes/*/-hooks.ts          ← React Query フック（ルート関心のみ）
routes/*/-components/       ← ルート専用 UI コンポーネント
lib/api/*.ts                ← fetch 関数・queryOptions（純粋関数）
lib/api/client.ts           ← Hono RPC クライアント
```

**`lib/api/`** には React に依存しない純粋な API 通信コードを置きます。`queryOptions` も含め、`prefetchQuery` 等でルート外から再利用できます。

**`routes/<name>/-hooks.ts`** にはそのルートでのみ使われる `useQuery` / `useMutation` フックを置きます。`-` プレフィックスにより TanStack Router のルート探索対象から除外されます。

**`routes/<name>/-components/`** にはそのルートにのみ関心が閉じているコンポーネントを置きます。

### TanStack Router ファイル命名規約

| パターン                  | 意味                                         |
| ------------------------- | -------------------------------------------- |
| `routes/foo.tsx`          | `/foo` ルート（フラット）                    |
| `routes/foo/index.tsx`    | `/foo` ルート（ディレクトリ）                |
| `routes/__root.tsx`       | ルートレイアウト                             |
| `routes/foo/-bar.ts`      | ルーターに無視されるファイル（プライベート） |
| `routes/foo/-components/` | ルーターに無視されるディレクトリ             |

## Development

```bash
# 開発サーバー起動（http://localhost:5173）
pnpm dev

# ビルド
pnpm build

# テスト
pnpm test

# 型チェック
pnpm type-check

# Lint
pnpm lint
```

## Path Aliases

`@/` は `./src/` に解決されます。

```ts
import { client } from '@/lib/api/client'
```

## Environment

開発時はバックエンドが `http://localhost:3001` で動いている必要があります（`lib/api/client.ts` でハードコード）。
