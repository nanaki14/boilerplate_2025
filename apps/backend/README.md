# @repo/backend

Hono を使った軽量 API サーバー。型安全な RPC クライアントをフロントエンドと共有します。

## Tech Stack

| ツール | 役割 |
|-------|------|
| Hono | 軽量 Web フレームワーク |
| @hono/node-server | Node.js サーバーアダプター |
| @hono/zod-validator | Zod を使ったリクエストバリデーション |
| @repo/schema | Zod スキーマ・型（共有パッケージ） |
| tsx | TypeScript の直接実行（開発時） |
| tsup | プロダクションビルド |

## Directory Structure

```
src/
├── index.ts          # サーバーエントリポイント（ポート 3001 で起動）
├── app.ts            # Hono アプリ定義・CORS 設定・ルート登録・AppType エクスポート
└── routes/
    └── users.ts      # /api/users エンドポイント群
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/users` | ユーザー一覧取得 |
| `GET` | `/api/users/:id` | ユーザー1件取得 |
| `POST` | `/api/users` | ユーザー作成（JSON バリデーションあり） |

### Request / Response

**GET /api/users**
```json
{ "users": [{ "id": "1", "name": "Alice", "email": "alice@example.com" }] }
```

**GET /api/users/:id**
```json
{ "user": { "id": "1", "name": "Alice", "email": "alice@example.com" } }
```

**POST /api/users**
リクエスト: `{ "name": "string（必須）", "email": "string（メール形式）" }`
レスポンス: `{ "user": { "id": "uuid", ... } }` (201)

## Hono RPC

`app.ts` でエクスポートされる `AppType` をフロントエンドが import することで型安全な RPC クライアントが実現されます。

```ts
// apps/backend/src/app.ts
export type AppType = typeof app

// apps/frontend/src/lib/api/client.ts
import type { AppType } from '@repo/backend'
import { hc } from 'hono/client'
export const client = hc<AppType>('http://localhost:3001')
```

## Development

```bash
# 開発サーバー起動（http://localhost:3001）
# packages/ 以下の変更も watch 対象
pnpm dev

# ビルド（dist/ に ESM + 型定義を出力）
pnpm build

# テスト
pnpm test

# 型チェック
pnpm type-check

# Lint
pnpm lint
```

## Notes

- 現在のユーザーストアはインメモリ実装（サンプル用）。サーバー再起動でリセットされます。
- `@repo/backend` は `src/app.ts` を直接エクスポートしており、フロントエンドはビルド不要で型を参照できます（Internal Packages パターン）。
