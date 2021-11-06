# 1 
# reduxToolkitから始めていいのか？
はじめていいです。デフォルトはReduxToolkitになりバニラのReduxの知識は必要ありません。

# Redux Toolkitとは？
Reduxを簡単に実装するライブラリ。
Reduxの開発元もおススメしている。
TS製。
ロジックの簡素化ができる。
⇒action creatorを書く必要がない。よってロジックが簡素化
⇒immerが組み込まれている。
    ⇒immutableな状態を維持するような仕組み。開発者が意識する必要なくimmutableな状態が維持できる。よってロジックが簡素化。
ReduxThunkが標準で組み込まれている。
⇒ReduxThunkは非同期処理を書くときに利用。インストールを意識しなくてよい。
Redux DevTools Extensionの設定が不要。
⇒ブラウザでReduxの中身を確認するためのデバックツール。これを利用するための設定がすでに組み込まれている。

## 状態管理フローの比較（旧・新）
### ReduxToolkit


# 2
## 環境構築
### templateのインストール
```ts
npx create-react-app my-app --template redux-typescript
```

### 拡張機能のインストール
・ES7 React/Redux/GraphQL/React-Native snippets
rafcでコンポーネントのひな形を作れる。
(リアクトアローファンクション)

### パッケージのインストール
・ESLint
・Prettier

上記二つのインストールしたあとに「.eslintrc.json」を作成して以下を記述
```ts
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  "plugins": ["@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "env": { "browser": true, "node": true, "es6": true },
  "rules": {
     "適当なルール なければ書かなくてもいいです。"
  }
}
```
【参考】
これのほうがよい？
https://qiita.com/shinji0320/items/254cfbb89f6672aa8f06


https://qiita.com/madono/items/a134e904e891c5cb1d20

### 便利なパッケージをインストール
node-sass⇒cssではなくscssファイルでスタイルを定義する
react-hook-form
MUI

```
//node-sass
yarn add node-sass
//react-hook-form
yarn add react-hook-form
// mui
yarn add @mui/material @emotion/react @emotion/styled @mui/icons-material
// mui icon
yarn add @mui/icons-material
```

# 3
## UI構築