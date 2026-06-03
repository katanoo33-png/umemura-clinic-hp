# うめむら半蔵門内科歯科 HP — Codexへの作業指示書

## ⚠️ 最重要ルール：設定を壊さないために

### ✅ 依頼の種類別 → 編集するファイル

| 依頼内容 | 編集ファイル | 禁止事項 |
|---------|------------|---------|
| ロゴの変更 | `src/siteConfig.js` の `LOGO` セクション | App.jsx を書き直さない |
| 写真URLの変更 | `src/siteConfig.js` の `DEFAULT_IMAGES` | App.jsx を書き直さない |
| カラーテーマのデフォルト変更 | `src/siteConfig.js` の `SITE_DEFAULTS` | App.jsx を書き直さない |
| クリニック情報の変更 | `src/siteConfig.js` の `CLINIC` | App.jsx を書き直さない |
| 医師情報の変更 | `src/siteConfig.js` の `DOCTORS` | App.jsx を書き直さない |
| 診療内容の変更 | `src/siteConfig.js` の `SERVICES` | App.jsx を書き直さない |
| UIコンポーネントの変更 | `src/App.jsx` の 該当コンポーネントのみ str_replace | ファイル全体を書き直さない |
| 新機能の追加 | `src/App.jsx` に追記 | 既存コードを削除しない |

### 🚫 絶対に禁止

- `App.jsx` を `create_file` で上書きすること（設定・写真がすべてリセットされる）
- `siteConfig.js` を `create_file` で上書きすること（同上）
- 修正箇所以外のコードを削除・変更すること

### ✅ 正しい編集方法

```
# ロゴを画像に変更する場合
str_replace siteConfig.js の LOGO セクションの type と logoUrl のみ変更

# 写真URLを変更する場合
str_replace siteConfig.js の DEFAULT_IMAGES の該当キーのみ変更

# コンポーネントのスタイルを変更する場合
str_replace App.jsx の該当部分のみ変更
```

## ファイル構成

```
src/
├── siteConfig.js   ← 設定・コンテンツ（写真/ロゴ/テーマ/クリニック情報）
└── App.jsx         ← UIコンポーネント・ロジック
```

## 設定の永続化の仕組み

- **siteConfig.js** — コードとしてのデフォルト値（Gitで管理）
- **localStorage** — ブラウザで変更した設定（写真差し替え、テーマ切替など）
- **settings.json** — エクスポート/インポートによる設定ファイル

ユーザーがブラウザで写真を差し替えたり、設定パネルでテーマを変えたりした場合、
その情報はlocalStorageに保存され、siteConfig.jsのデフォルト値より優先されます。

## 新機能追加の指針

新機能（FAQセクション、お問い合わせフォームなど）を追加する場合：
1. `App.jsx` の末尾 `export default function App()` より前に、新しいコンポーネント関数を追加
2. `App.jsx` の `<App>` 内の適切な位置にコンポーネントを挿入（str_replace）
3. 設定が必要な場合は `siteConfig.js` に追記
