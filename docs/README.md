# site/ — GANSU2 公開ドキュメントのソース

これは **https://gansu2.github.io/** の真実の源（just-the-docs / Jekyll、JA/EN 二言語）。
編集して `bash ../script/deploy_docs.sh` を実行すると公開される。

## 構成
- `en/` … 英語ページ、`ja/` … 日本語ページ（**両言語で同じファイル名**にする）
- `index.md` … ルート `/` を `/en/` へリダイレクトする stub（中身は置かない）
- `_config.yml` … Jekyll 設定（`permalink: pretty`、検索有効）
- `_includes/components/sidebar.html` … `page.lang` で左ナビを出し分ける override
- `_includes/header_custom.html` … ヘッダ右上の EN/JA トグル（サーバサイド、JS 不要）
- `_includes/head_custom.html` … MathJax（`$...$`）

## ページの front-matter（例）
```yaml
---
layout: default
title: "CLI"            # 左ナビ・見出しに出る
nav_order: 2            # 左ナビの順序（EN/JA で揃える）
lang: en                # en または ja
hreflang_alt: "ja/usage_cli"   # 相手言語ページ（<lang>/<name>）
hreflang_lang: "ja"
---
```
`PORTAL_TOS.md` だけは `permalink: /en/PORTAL_TOS.html`（ja は `/ja/PORTAL_TOS.html`）を明示。

## 追加・更新して公開する
1. `en/<name>.md` と `ja/<name>.md` を作る／直す（`nav_order` を揃える）
2. リポジトリ直下で `bash script/deploy_docs.sh`
   - `site/` → `gansu2.github.io/docs/` に rsync、orphan 1 コミットで force-push
   - GitHub Actions (pages.yml) が 1〜2 分でビルド・公開
   - push 権が要る（`gansu2` org owner なら可）。`~/gansu2.github.io` は自動 clone される

## 注意
- ポータル（`docs/portal/`）は deploy で触らない設計。config.js は環境依存で上書き厳禁
  （詳細は リポジトリ直下 CLAUDE.md「ドキュメント公開」）
- 技術リファレンス 4 ページ（usage_*, parameters）の JA は現在ドラフト（英語本文＋「準備中」告知）
