---
layout: default
title: "Terms and Conditions"
nav_order: 90
lang: en
hreflang_alt: "ja/TERMS"
hreflang_lang: "ja"
---

# Terms and Conditions

By using GANSU2, you agree to the following terms.

## Disclaimer of Warranty

GANSU2 is provided **"as is"**, without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose, and non-infringement. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability arising from the use of the software.

## License and Permitted Use

A license key obtained through the [User Portal](https://gansu2.github.io/portal/) permits **any use of GANSU2, including commercial use**, subject to the period and **Max Size** limit shown on your portal dashboard.

Without a license key, GANSU2 still runs, but the workload size is limited (**Max Size**). When the limit is reached the run stops with a message explaining how to obtain a key; **nothing is silently reduced** — GANSU2 never lowers the basis set, method, or accuracy to fit a limit.

Account- and license-specific terms are set out in the [User Portal Account Terms of Service]({{ '/en/PORTAL_TOS.html' | relative_url }}).

## Prohibited Actions

The following actions are prohibited without prior written permission from the copyright holder:

- **Reverse engineering**, disassembly, or decompilation of the software or its libraries.
- **Redistribution** of the software, in whole or in part, to third parties.
- **Sublicensing** or granting any rights in the software to third parties.
- **Circumventing** the license activation, machine-binding, verification, or rate-limit mechanisms.

## Third-Party Components

GANSU2 is derived from **GANSU**, licensed under the [BSD 3-Clause License](https://opensource.org/license/bsd-3-clause), Copyright (c) 2025-2026 Hiroshima University and Fujitsu Limited.

GANSU2 also includes or links the following third-party components:

- **Eigen** — [MPL 2.0](https://www.mozilla.org/MPL/2.0/).
- **OpenBLAS / LAPACK** — [BSD 3-Clause License](https://opensource.org/license/bsd-3-clause) (statically embedded).
- **xxHash** — [BSD 2-Clause License](https://opensource.org/license/bsd-2-clause). Copyright Yann Collet.
- **OpenSSL** — [Apache License 2.0](https://www.openssl.org/source/license.html) (statically linked).
- **GCC runtime** (`libgfortran`, `libquadmath`) — GPL v3 with the [GCC Runtime Library Exception](https://www.gnu.org/licenses/gcc-exception-3.1.html).
- **NVIDIA CUDA runtime** (cuBLAS, cuSOLVER, cuSPARSE, NCCL, CUDA Runtime) — obtained on your machine (typically via the `nvidia-*-cu12` packages) and used under [NVIDIA's license terms](https://docs.nvidia.com/cuda/eula/).
