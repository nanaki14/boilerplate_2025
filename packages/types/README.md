# @repo/types

ランタイム依存なしの共有 TypeScript 型定義パッケージ。型のみを提供するため、どのパッケージからも軽量に参照できます。

## Directory Structure

```
src/
└── index.ts    # 型定義エクスポート
```

## Exports

| エクスポート | 説明 |
|------------|------|
| `ApiResponse<T>` | API レスポンスの共通ラッパー型 |
| `User` | ユーザーオブジェクトの型定義 |

### ApiResponse\<T\>

```ts
type ApiResponse<T> = {
  success: boolean
  data: T
  error?: string
}
```

## Usage

```ts
import type { ApiResponse, User } from '@repo/types'

// API レスポンスの型付け
const response: ApiResponse<User[]> = await fetch('/api/users').then(r => r.json())
```

## Notes

- ランタイムコードなし（型定義のみ）
- ビルドステップなし。TypeScript ソースを直接エクスポート（Internal Packages パターン）
- Zod スキーマが必要な場合は `@repo/schema` を使用してください
