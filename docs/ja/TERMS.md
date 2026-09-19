---
layout: default
title: "利用規約"
nav_order: 90
lang: ja
hreflang_alt: "en/TERMS"
hreflang_lang: "en"
---

# 利用規約

GANSU2 を利用することにより、以下の条件に同意したものとみなされます。

## 無保証

GANSU2 は **現状有姿（"as is"）** で提供され、商品性、特定目的への適合性、権利非侵害を含む
いかなる明示または黙示の保証も伴いません。作者および著作権者は、本ソフトウェアの利用から
生じるいかなる請求・損害・その他の責任についても、一切責任を負いません。

## ライセンスと許諾される利用

[ユーザーポータル](https://gansu2.github.io/portal/)で取得したライセンスキーにより、
ポータルのダッシュボードに表示される期間および **Max Size** の範囲で、
**商用を含むあらゆる用途で GANSU2 を利用できます**。

ライセンスキーが無くても GANSU2 は動作しますが、計算規模に上限（**Max Size**）が課されます。
上限に達すると、キー取得方法を示して実行を停止します。**精度や手法を勝手に落とすことはありません** ——
GANSU2 が上限に合わせて基底関数系・手法・精度を下げることはありません。

アカウントおよびライセンス固有の条件は
[ユーザーポータル利用規約]({{ '/ja/PORTAL_TOS.html' | relative_url }})に定めます。

## 禁止事項

著作権者の事前の書面による許可なく、以下の行為を行うことは禁止されます。

- 本ソフトウェアまたはそのライブラリの**リバースエンジニアリング**、逆アセンブル、逆コンパイル。
- 本ソフトウェアの全部または一部の第三者への**再配布**。
- 第三者への**サブライセンス**その他の権利付与。
- ライセンスの有効化・マシン紐付け・検証・レート制限の各機構の**回避**。

## 第三者コンポーネント

GANSU2 は **GANSU**（[BSD 3-Clause License](https://opensource.org/license/bsd-3-clause)、
Copyright (c) 2025-2026 Hiroshima University and Fujitsu Limited）を基にしています。

GANSU2 は以下の第三者コンポーネントを含む、またはリンクしています。

- **Eigen** — [MPL 2.0](https://www.mozilla.org/MPL/2.0/)。
- **OpenBLAS / LAPACK** — [BSD 3-Clause License](https://opensource.org/license/bsd-3-clause)（静的埋め込み）。
- **xxHash** — [BSD 2-Clause License](https://opensource.org/license/bsd-2-clause)。Copyright Yann Collet。
- **OpenSSL** — [Apache License 2.0](https://www.openssl.org/source/license.html)（静的リンク）。
- **GCC ランタイム**（`libgfortran`, `libquadmath`）— GPL v3 ＋ [GCC Runtime Library Exception](https://www.gnu.org/licenses/gcc-exception-3.1.html)。
- **NVIDIA CUDA ランタイム**（cuBLAS, cuSOLVER, cuSPARSE, NCCL, CUDA Runtime）— 利用者のマシン上で
  （通常は `nvidia-*-cu12` パッケージ経由で）取得され、[NVIDIA のライセンス条件](https://docs.nvidia.com/cuda/eula/)に従って利用されます。
