# @repo/schema

Zod スキーマによるランタイムバリデーション定義と推論型をエクスポートする共有パッケージ。フロントエンド・バックエンド双方で型安全を保証します。

## Directory Structure

```
src/
└── index.ts    # スキーマ定義・型エクスポート
```

## Exports

| エクスポート       | 種別         | 説明                                                 |
| ------------------ | ------------ | ---------------------------------------------------- |
| `userSchema`       | Zod スキーマ | ユーザーバリデーション（id, name, email）            |
| `createUserSchema` | Zod スキーマ | ユーザー作成バリデーション（id を除いた userSchema） |
| `User`             | 型           | `z.infer<typeof userSchema>`                         |
| `CreateUser`       | 型           | `z.infer<typeof createUserSchema>`                   |

## Usage

```ts
// スキーマ（バリデーション用）
import { userSchema, createUserSchema } from '@repo/schema'

// 型のみ（型チェック用）
import type { User, CreateUser } from '@repo/schema'
```

### バックエンドでのバリデーション

```ts
import { zValidator } from '@hono/zod-validator'
import { createUserSchema } from '@repo/schema'

app.post('/api/users', zValidator('json', createUserSchema), (c) => {
  const data = c.req.valid('json') // CreateUser 型
})
```

### フロントエンドでの型利用

```ts
import type { CreateUser } from '@repo/schema'

const createUser = async (data: CreateUser) => { ... }
```

## Notes

- ビルドステップなし。TypeScript ソースを直接エクスポート（Internal Packages パターン）
- Vite・tsx どちらもネイティブに TypeScript を解決するため `tsc` ビルドが不要
