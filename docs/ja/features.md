---
layout: default
title: "機能"
nav_order: 1.2
lang: ja
hreflang_alt: "en/features"
hreflang_lang: "en"
description: "GANSU2 でできること — 計算手法、近似、物性、周期系、対応ハードウェア。"
---

# 機能
{: .no_toc }

1. TOC
{:toc}

## GANSU2 とは

GANSU2 は NVIDIA GPU のために設計された量子化学計算プログラムです。積分、SCF、
電子相関および励起状態のソルバまでが GPU 上で動くため、本来は計算機クラスタの
割り当てが必要な規模の計算を、ワークステーション 1 台の GPU でこなせます。
Hartree-Fock と Kohn-Sham DFT から、結合クラスタ、運動方程式法による励起状態まで
一般的な ab initio 手法を網羅し、さらに大きな分子に向けた局所相関・フラグメント
近似を備えています。

配布形態はライセンス制のシェアードライブラリで、`pip` 一つで導入できます。
コマンドライン、Python API、シェアードライブラリの C ABI という 3 つの
フロントエンドが同一のエンジンを共有します。

GANSU2 は広島大学と富士通株式会社によって開発されており、
オープンソースの GANSU プロジェクトを継承しています。

## 概要

| | |
|---|---|
| SCF | RHF、UHF、ROHF、RKS（閉殻 DFT） |
| 基底状態の電子相関 | MP2 / MP3 / MP4、CC2、CCSD、CCSD(T)、FCI、ならびにスピン成分スケーリングと Laplace 変換による MP2 の派生 |
| 局所相関 | DLPNO-CCSD、DLPNO-CCSD(T)、DMET-CCSD、DMET-CCSD(T) |
| 励起状態 | CIS、ADC(2)-s / ADC(2)-x、EOM-MP2 / CC2 / CCSD、IP-EOM-CCSD、EA-EOM-CCSD、STEOM-CCSD |
| 計算種別 | エネルギー、解析的勾配、構造最適化、解析的 Hessian と振動数 |
| 周期系 | Γ 点 PBC-RHF、k 点 Kohn-Sham DFT |
| 2 電子積分の扱い | 保持（stored）、Direct-SCF、RI、Direct-RI、テンソル超縮約 |
| ハードウェア | 単一 GPU、マルチ GPU、Full-CI の MPI マルチノード、CPU のみの実行 |
| インターフェース | CLI、Python、C ABI |

以下に挙げるオプションはすべて
[パラメータ]({{ '/ja/parameters/' | relative_url }})ページに記載があります。

## SCF 手法

| 手法 | `--method` | 備考 |
|---|---|---|
| 制限 Hartree-Fock | `rhf` | 既定 |
| 非制限 Hartree-Fock | `uhf` | 開殻系・ラジカル |
| 制限開殻 Hartree-Fock | `rohf` | Roothaan を含む ROHF パラメータセットを選択可 |
| 制限 Kohn-Sham DFT | `rks` | 閉殻のみ |

収束加速は既定で DIIS を用い、部分空間の大きさとダンピング係数を調整できます。
初期推定は core Hamiltonian、GWH、SAD、MINAO から選べます。電荷とスピンは
`--charge` と `--beta_to_alpha` で指定します。

## 密度汎関数理論

制限 Kohn-Sham DFT は `--method rks` で選択します。

| | |
|---|---|
| 交換相関汎関数 | SVWN5（LDA）、PBE（GGA） |
| 動径グリッド | Treutler、SG-1、Mura-Knowles、Gauss-Chebyshev、Delley |
| グリッドレベル | 0〜9。PySCF と同じレベル表を用いるため、同一レベルのエネルギーを直接比較できる |
| Coulomb 行列の構築 | stored、密度差スクリーニング付きの direct、RI-J、direct RI-J |
| 交換相関ポテンシャルの構築 | 空間ビニング + バッチ GEMM（既定）、direct、stored、アンカー付き差分法 |

グリッドは Becke 分割の原子中心グリッドで、NWChem 方式の角度方向プルーニングを
行います。アンカー付き差分法は、多くの SCF ステップで代表的な部分グリッド上の
密度変化のみを評価し、定期的に全グリッドで再アンカーします。グリッドレベル 6 の
PBE では交換相関ポテンシャル構築の平均時間が約 2.3〜2.6 倍速くなり、収束エネルギーの
差は 6e-7 Hartree 程度に収まります。

UKS / ROKS、ハイブリッド汎関数、meta-GGA、DFT の解析的勾配は未実装です。

## 基底状態の電子相関

| 手法 | スケーリング | 備考 |
|---|---|---|
| MP2 | | 異スピン成分と同スピン成分を分けて出力 |
| SCS-MP2、SOS-MP2 | | スピン成分スケーリング／異スピン成分のみのスケーリング |
| LT-MP2、LT-SOS-MP2 | RI 併用で O(N^4) | Laplace 変換により占有・非占有の添字を分離 |
| MP3 | O(N^6) | |
| MP4 | O(N^7) | SDQ と三重励起の寄与を含む完全版 |
| CC2 | O(N^5) | 二重励起を MP1 相当に留め、一重励起と反復的に結合 |
| CCSD | O(N^6) | |
| CCSD(T) | 三重励起部分が O(N^7) | 基底状態の電子相関で標準的な基準 |
| CCSD density | | Λ 方程式と 1 粒子縮約密度行列。物性計算・埋め込み法に使用 |
| FCI | 階乗的 | 基底関数内で厳密。MPI ビルドでは CI ベクトルをランクと GPU に分割 |

## 局所相関・フラグメント近似

正準の結合クラスタでは手が届かない分子のための手法です。

**DLPNO-CCSD / DLPNO-CCSD(T)** は Pipek-Mezey 局在化占有軌道、軌道ごとの原子
ドメインを持つ射影原子軌道、電子対ごとの PNO 打ち切り、強い対と弱い対の分割を
用います。打ち切りのプリセットは ORCA 互換で loose から very tight まで 4 段階です。
摂動的三重励起は三重項ごとの TNO 基底上でバッチ GPU カーネルにより評価します。
閉殻 RHF かつ RI が必要です。

**DMET-CCSD / DMET-CCSD(T)** は密度行列埋め込み理論を CCSD 不純物ソルバと
組み合わせます。フラグメントは X-H 結合から自動検出するか、原子番号で明示指定でき、
複数 GPU に分散できます。

## 励起状態

| 手法 | 備考 |
|---|---|
| CIS | 最も安価、O(N^4) |
| ADC(2)-s | 代数的ダイアグラム構成の strict 版。二重励起ブロックは対角 |
| ADC(2)-x | 拡張版。1 次の非対角項を含む |
| SOS-ADC(2)、LT-SOS-ADC(2) | 異スピン成分のみ／Laplace 変換を併用した派生 |
| THC-SOS-ADC(2) | テンソル超縮約により σ ベクトル構築が O(N^3) |
| EOM-MP2、EOM-CC2 | MP2 相当・CC2 相当の運動方程式法 |
| EOM-CCSD | 本パッケージで最も精度の高い単参照励起状態手法 |
| IP-EOM-CCSD、EA-EOM-CCSD | イオン化ポテンシャルと電子親和力 |
| STEOM-CCSD | 相似変換 EOM-CCSD。一重励起のコストで二重励起を捉える |
| DLPNO-STEOM-CCSD | DLPNO-CCSD 基底状態の上に構築した局所版 |
| CIS-NTO | 自然遷移軌道の活性空間による状態平均 CIS |

CIS と ADC(2) 系では一重項・三重項の両方を計算でき、一重項では振動子強度を出力
します。ADC(2)、EOM-MP2、EOM-CC2 ではソルバを選べます。一重＋二重励起空間での
完全 Davidson 法か、固定振動数あるいは自己無撞着振動数での Schur 補行列による
縮約です。既定では利用可能な GPU メモリから自動選択されます。

## 物性と計算種別

| `--run_type` | 得られるもの |
|---|---|
| `energy` | 一点エネルギー。既定 |
| `gradient` | 解析的エネルギー勾配 |
| `optimize` | 解析的勾配による構造最適化 |
| `hessian` | 解析的 Hessian、調和振動数、質量加重した基準振動、IR 強度 |

構造最適化のアルゴリズムは BFGS、Polak-Ribière 共役勾配法、GDIIS、Newton-Raphson
です。信頼領域の制御に加え、勾配の最大成分・RMS、エネルギー変化、変位にそれぞれ
独立した収束判定を設けています。Hessian からは並進・回転モードを射影除去します。

このほか、双極子モーメント、Mulliken 電子密度解析、Mayer および Wiberg 結合次数、
正準分子軌道の Molden 出力、可視化用の Pipek-Mezey 局在化占有軌道の Molden 出力が
利用できます。

## 積分と近似

| | |
|---|---|
| 1 電子積分 | McMurchie-Davidson、Obara-Saika、両者のハイブリッド |
| 2 電子積分 | デバイス上に保持、Direct-SCF、RI、Direct-RI |
| 補助基底 | ファイル指定、または主基底からの自動生成 |
| スクリーニング | しきい値を調整できる Schwarz スクリーニング |
| テンソル超縮約 | Becke-Lebedev グリッド上の最小二乗 THC。密度プルーニングとメモリ上限つき |
| 基底関数 | 既定は Cartesian Gauss 関数。`--use_spherical 1` で Molden 順の純粋球面調和関数 |

球面調和関数モードは、ORCA / PySCF / NWChem が cc-pVnZ 系で採用している規約を
再現します。cc-pVDZ のベンゼン RHF は ORCA の球面 d 参照値と 1e-9 Hartree 以内で
一致します。

## 周期系

XYZ ファイルのコメント行に ASE 形式の拡張 XYZ ヘッダ（`Lattice="..."` タグ）を
置くと、`gansu2` は分子計算ではなく Γ 点の周期 Hartree-Fock を実行します。
追加のフラグは不要です。Python API でも `lattice=` 引数で同じことができます。

k 点 Kohn-Sham DFT は別の実行ファイル `gansu2_krks` が担い、格子と k メッシュの
オプションを受け取ります。

## 基底関数と有効内殻ポテンシャル

GANSU2 は STO-3G から cc-pVQZ まで 22 種類の軌道基底と 7 種類の補助基底を同梱して
います。名前で指定すればパスは自動解決され、`gansu2 --list-basis` で一覧を表示
できます。Basis Set Exchange の Gaussian 形式ファイルをパス指定で使うこともできます。

有効内殻ポテンシャル (ECP) は基底関数ファイルに埋め込まれていれば自動的に適用され
ます。LANL2DZ や def2-SVP などの重元素がこれに該当します。別ファイルから ECP を
読み込むこともできます。ECP は Cartesian・球面調和のどちらの基底でも、エネルギーと
勾配の計算で利用できます。

## ハードウェア

| | |
|---|---|
| GPU | NVIDIA、Compute Capability 8.0 以上（Ampere、Ada、Hopper、Blackwell） |
| マルチ GPU | RI-HF と DMET のフラグメント並列。分散 Fock 構築には NCCL を使用 |
| マルチノード | MPI ビルドでは Full-CI ベクトルをランクと GPU に分割 |
| CPU のみ | `--cpu` で HF、勾配、Hessian、すべての post-HF 手法、DMET-CCSD が OpenMP カーネルで動作。GPU 不要 |

公開しているシェアードライブラリは Compute Capability 8.0 / 8.6 / 8.9 / 9.0 /
10.0 / 12.0 のデバイスコードを含みます。

## インターフェース

- **[CLI]({{ '/ja/usage_cli/' | relative_url }})** — `gansu2` コマンド。
  オプションはパラメータレシピファイルにまとめることもできます。
- **[Python API]({{ '/ja/usage_python/' | relative_url }})** — `import gansu2`。
  エネルギー、軌道エネルギーと係数、密度行列、力、Hessian、振動数が
  NumPy 配列で返ります。
- **[C API]({{ '/ja/usage_c_api/' | relative_url }})** — シェアードライブラリ自身の
  ABI。C / C++ や、FFI を持つ任意の言語から呼べます。

## 配布とライセンス

導入は `pip install gansu2` です。wheel は小さく、GPU シェアードライブラリと CLI は
初回実行時に取得され、公開された SHA-256 で検証されます。
[インストール]({{ '/ja/INSTALL.html' | relative_url }})を参照してください。

ライセンスキーが無い場合、計算規模に上限（**Max Size**）が課されます。上限に達すると
キーの取得方法を示して実行を停止し、精度や手法を勝手に落とすことはありません。
キーがあれば上限は解除され、商用を含むあらゆる用途で利用できます。キーは
[ユーザーポータル](https://gansu2.github.io/portal/)から無償で発行できます。
