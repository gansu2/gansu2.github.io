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

GANSU2 は GPU で加速する量子化学計算パッケージで、ライセンス制のシェアード
ライブラリとして配布され、`pip` 一つで導入できます。積分、SCF、電子相関および
励起状態のソルバまでが GPU 上で動くため、本来は計算機クラスタの割り当てが必要な
規模の計算を、ワークステーション 1 台の GPU でこなせます。

広島大学と富士通株式会社によって開発されており、オープンソースの GANSU
プロジェクトを継承しています。

## できること

- **自己無撞着場** — RHF、UHF、ROHF、閉殻 Kohn–Sham DFT。
- **基底状態の電子相関** — MP2 から MP4、CC2、CCSD、CCSD(T)、Full-CI。
  正準の手法では手が届かない分子には DLPNO・DMET の局所近似。
- **励起状態** — CIS、ADC(2)、EOM-MP2 / CC2 / CCSD、イオン化・電子付加の
  EOM-CCSD、STEOM-CCSD。
- **構造とスペクトル** — 解析的勾配、構造最適化、解析的 Hessian、
  IR 強度つきの調和振動数。
- **周期系** — Γ 点の周期 Hartree–Fock、k 点 Kohn–Sham DFT。
- **手元のハードウェアに合わせて** — GPU 1 枚、複数 GPU、MPI による
  マルチノード Full-CI、GPU が無ければ CPU のみでも動作。

手法・近似・対応ハードウェアの詳細は
[機能一覧]({{ '/ja/features/' | relative_url }})を参照してください。

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

- [機能]({{ '/ja/features/' | relative_url }}) — GANSU2 で計算できること。
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
