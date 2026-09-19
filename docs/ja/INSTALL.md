---
layout: default
title: インストール
nav_order: 1.5
lang: ja
hreflang_alt: "en/INSTALL"
hreflang_lang: "en"
permalink: /ja/INSTALL.html
---

# GANSU2 のインストール

## 動作要件

- **Linux x86_64**（`manylinux_2_28`、glibc ≥ 2.28 — 例: Ubuntu 20.04 以降）
- 新しめの CUDA ドライバが入った **NVIDIA GPU**
- **Python 3.8 以上**

## インストール

GANSU2 は小さな「薄い」wheel として PyPI で配布しています:

```bash
pip install gansu2
```

PyPI に到達できない環境では、同じ wheel が各リリースの
[リリース一覧](https://github.com/gansu2/dist/releases/latest)に添付されているので、
URL 指定でインストールできます。

wheel 本体は数 MB です。初回利用時に、GPU 共有ライブラリ（`libgansu2.so`）と
コマンドラインツール `gansu2` を同じリリースから取得し、
`~/.cache/gansu2/<version>/` にキャッシュします。各ファイルは公開されている
SHA-256 で検証されます。

## 動作確認

```bash
python -c "import gansu2; print('gansu2 imported OK')"
```

`gansu2` コマンド（または Python からの計算）を初めて実行したときに、GPU
ライブラリと CLI が一度だけ取得されます。詳しくは
[CLI ガイド](/ja/usage_cli/)・[Python API ガイド](/ja/usage_python/)
を参照してください。

## オフラインの共有ライブラリを使う

取得せずに特定の `libgansu2.so`（例: オフラインのコピー）を使いたい場合は、
import 前に `GANSU2_LIB` を設定します:

```bash
export GANSU2_LIB=/path/to/libgansu2.so
```

## 無料ライセンスキーの取得

小さな計算はライセンス無しで動きます。それより大きな計算には**無料ライセンス
キー**が必要で、全機能・無制限（商用利用を含む）で使えます。このキーは
*フローティング*ライセンスで、マシンに固定されず、1 つのキーで同時 1 計算です。

1. wheel に同梱の `gansu2-license` で 8 文字の**サインアップコード**を取得します
   （未認証の実行が上限に当たったときも、CLI が同じコードと URL を案内します）:

   ```bash
   gansu2-license -s
   ```

2. [ユーザーポータル](/portal/)でアカウントを作成し、登録フォームにサインアップ
   コードを入れて、**Start** を押して Free License を有効化します（30 日間が始まり、
   ポータルからいつでも延長できます）。ライセンスキーはメールで届きます。

3. キーをこのマシンに登録します:

   ```bash
   gansu2-license -k <あなたのキー> -a
   ```

これで上限なしに GANSU2 が動きます。
[利用規約](/ja/TERMS/)・[ポータルアカウント利用規約](/ja/PORTAL_TOS.html)
もあわせてご確認ください。
