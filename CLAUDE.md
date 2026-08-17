# うめむら半蔵門内科歯科 HP — Claudeへの作業指示書

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

## セキュリティ注意事項

### リンク先は必ず `/clinic/` にすること
- `public/` 内のHTML（booking.html, line-add.html 等）の「サイトに戻る」リンクは `href="/clinic/"` を使う
- **絶対に `href="/"` にしない** — VPSでは `/` がkatanolabポータル（Basic認証付き管理画面）に繋がるため、患者に内部システムが露出する
- 2026-06-25修正: booking.html（4箇所）、line-add.html（1箇所）を `/clinic/` に修正済み

### VPSデプロイ先
- パス: `/var/www/clinic-hp/`
- nginx: `https://katanolab.dev/clinic/` で配信
- デプロイ: `scp -i ~/.ssh/id_ed25519 public/* root@163.44.99.17:/var/www/clinic-hp/`

### booking.htmlのLIFF連携（2026-08-12修正）
- ホームページ本体の「予約する」ボタン（`App.jsx`の`BOOKING_URL`＝`siteConfig.js`）は、LIFF URL
  （`https://liff.line.me/2010663357-fZf1eaFF`）ではなく通常の`booking.html`を直接指している。
  そのため、LINEアプリ内でこのボタン経由で開いた場合でも、以前は`liff.isLoggedIn()`が自動でtrueに
  ならず、LINE UserIDが記録されないことがあった（既存の予約データ、全13件でLINE UserID列が
  空欄だったことから発覚）。
- 対応: `booking.html`の`initLiff()`に`liff.isInClient()`判定を追加し、LINEアプリ内で開かれているのに
  未ログインの場合だけ`liff.login()`を呼ぶように修正。通常の外部ブラウザ（LINEアプリ外）からの
  アクセス時は従来通り何もしない＝予約自体は引き続き誰でも可能（LINE非利用者の導線は変更していない）。
  「予約する」ボタン自体をLIFF URLへ変更する対応（案2）は見送り、この方式（案1）を採用。
- 動作確認: `?debug=1`をURLに付けると画面上部にLIFF初期化状況が表示される診断コードを
  一時的に追加済み（`DEBUG_MODE`・`renderLiffDebugBanner_()`）。通常アクセスには影響しない。
  不要になれば削除してよい。
- 34_メール配信基盤（旧34_SendGridメール配信）の将来のLINE化構想の検証を兼ねて、この機会に
  API2（`@434xzywa`）のpush送信テストも実施・成功を確認した（テスト用関数
  `testSendLinePushToSelf`/`_v2`/`_Debug`を、`予約」シートを参照する別GASプロジェクト
  （1日前/1時間前リマインド用）に追加。本番の`checkReminders`等は無変更）。
