# Init
`command + shift + p`でdenoを検索しプロジェクトの初期化ができる。

# パッケージ管理
Denoにパッケージ管理はないので`deps.ts`に外部モジュールの依存をまとめるのが慣習らしい。

`export { red, blue, yellow } from "https://deno.land/std@0.151.0/fmt/colors.ts";`

# フォーマッター
`deno fmt file.ts`

# リンター
`deno lint file.ts`

# テストランナー
`deno test test.ts`

```ts
Deno.test("test name", () => {
  assertEquals(1+1, 2);
});
```

# その他コマンド
`deno info`

`deno compile`

