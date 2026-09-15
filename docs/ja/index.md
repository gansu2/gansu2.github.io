---
layout: default
title: "ホーム"
nav_order: 1
lang: ja
hreflang_alt: "en/index"
hreflang_lang: "en"
description: "GANSU2 — GPU 量子化学計算パッケージ。ライセンス制のシェアードライブラリとして配布。"
---

# GANSU2

GANSU2 は GPU で加速する量子化学計算パッケージ（Hartree–Fock、post-HF、周期系）で、
ライセンス制のシェアードライブラリとして配布されます。`pip` 一つで導入でき、
ネイティブライブラリと CLI は初回実行時に取得されます。

## インストール

```bash
pip install gansu2
```

wheel は小さく、GPU シェアードライブラリと `gansu2` CLI は初回実行時に
`~/.cache/gansu2/<version>/` へダウンロードされ、公開された SHA-256 で検証されます。
外部通信のないマシンでは、[最新リリース](https://github.com/gansu2/dist/releases/latest)
から取得し、`GANSU2_LIB` でシェアードライブラリを指定してください。

**動作要件:** Linux x86_64（manylinux_2_28 以降）、Python 3.8 以上、NVIDIA GPU
（Compute Capability 8.0 以上）と CUDA 12.x 互換ドライバ。

## 使い方

- [CLI]({{ '/ja/usage_cli/' | relative_url }}) — コマンドラインで計算を実行（`gansu2`）。
- [Python API]({{ '/ja/usage_python/' | relative_url }}) — `import gansu2`。
- [C API]({{ '/ja/usage_c_api/' | relative_url }}) — シェアードライブラリの ABI。
- [パラメータ]({{ '/ja/parameters/' | relative_url }}) — 全オプション一覧。

## ライセンス

ライセンスキーが無い場合、計算規模に上限（**Max Size**）が課されます。上限に達すると、
キー取得方法を示して実行を停止します。**精度や手法を勝手に落とすことはありません**。
キーは[ユーザーポータル](https://gansu2.github.io/portal/)（メニューからも到達可）で発行します。
`gansu2-license -s` でサインアップコードを取得し、ポータルで登録して無料ライセンスを受け取り、
`gansu2-license -k <KEY> -a` で有効化します。

ライセンスキーがあれば**商用を含むあらゆる用途で利用できます**。詳細は
[利用規約]({{ '/ja/TERMS/' | relative_url }})と
[ユーザーポータル利用規約]({{ '/ja/PORTAL_TOS.html' | relative_url }})を参照してください。
