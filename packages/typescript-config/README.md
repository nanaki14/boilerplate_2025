# @repo/typescript-config

モノレポ内の全アプリ・パッケージで共有する tsconfig ベース設定。各パッケージは用途に応じていずれかのファイルを `extends` します。

## Directory Structure

```
base.json     # 全設定の共通ベース
react.json    # React アプリ用（base.json を extends）
node.json     # Node.js アプリ用（base.json を extends）
```

## Configs

### base.json

全設定の共通ベース。strict モード・ESNext・bundler モジュール解決を有効化。

主な設定:

- `target`: ES2020
- `module`: ESNext / `moduleResolution`: bundler
- `strict`: true
- `noUnusedLocals` / `noUnusedParameters`: true
- `noUncheckedSideEffectImports`: true

### react.json

`base.json` を extends し、React / DOM 用の設定を追加。

追加設定:

- `lib`: `["ES2020", "DOM", "DOM.Iterable"]`
- `jsx`: `react-jsx`

### node.json

`base.json` を extends し、Node.js 用の設定を追加。

追加設定:

- `lib`: `["ES2020"]`（DOM なし）

## Usage

各パッケージの `tsconfig.json` で extends します。

```json
// React アプリ（apps/frontend）
{ "extends": "@repo/typescript-config/react.json" }

// Node.js アプリ（apps/backend）
{ "extends": "@repo/typescript-config/node.json" }

// 共有パッケージ
{ "extends": "@repo/typescript-config/base.json" }
```
