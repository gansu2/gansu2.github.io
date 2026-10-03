---
layout: default
title: Home
nav_order: 1
description: "GANSU2 — GPU-accelerated quantum chemistry, distributed as a licensed shared library."
lang: en
hreflang_alt: "ja/index"
hreflang_lang: "ja"
---

# GANSU2

GANSU2 is a GPU-accelerated quantum-chemistry package, distributed as a licensed
shared library and installed with a single `pip` command. Integrals, SCF, and the
correlated and excited-state solvers all run on the device, so one workstation GPU
covers work that would otherwise need a cluster allocation.

It is developed at Hiroshima University with Fujitsu Limited, and continues the
earlier open-source GANSU project.

## What it does

- **Self-consistent field** — RHF, UHF, ROHF, and closed-shell Kohn–Sham DFT.
- **Ground-state correlation** — MP2 through MP4, CC2, CCSD, CCSD(T) and Full-CI,
  with DLPNO and DMET local approximations for molecules beyond the canonical range.
- **Excited states** — CIS, ADC(2), EOM-MP2 / CC2 / CCSD, ionization and
  electron-attachment EOM-CCSD, and STEOM-CCSD.
- **Structure and spectra** — analytical gradients, geometry optimization, analytical
  Hessians, and harmonic vibrational frequencies with IR intensities.
- **Periodic systems** — Gamma-point periodic Hartree–Fock and k-point Kohn–Sham DFT.
- **Whatever hardware you have** — one GPU, several GPUs, multi-node Full-CI over MPI,
  or a CPU-only run when there is no GPU at all.

See the [full feature list]({{ '/en/features/' | relative_url }}) for methods,
approximations, and the supported hardware in detail.

## Install

```bash
pip install gansu2
```

The wheel is small. The GPU shared library and the `gansu2` CLI are downloaded on
first use and cached under `~/.cache/gansu2/<version>/`, each verified against its
published SHA-256. On a machine without outbound access, download them from the
[latest release](https://github.com/gansu2/dist/releases/latest) and point
`GANSU2_LIB` at the shared library.

**Requirements:** Linux x86_64 (manylinux_2_28+), Python 3.8+, an NVIDIA GPU
(Compute Capability 8.0+) with a CUDA 12.x-compatible driver.

## Using it

- [Features]({{ '/en/features/' | relative_url }}) — what GANSU2 can compute.
- [CLI]({{ '/en/usage_cli/' | relative_url }}) — run calculations from the command line (`gansu2`).
- [Python API]({{ '/en/usage_python/' | relative_url }}) — `import gansu2`.
- [C API]({{ '/en/usage_c_api/' | relative_url }}) — the shared-library ABI.
- [Parameters]({{ '/en/parameters/' | relative_url }}) — the full option list.

## Licensing

Without a license key the workload size is limited (**Max Size**). When the limit
is reached the run stops with a message explaining how to obtain a key — nothing is
silently reduced. Keys are issued from the
[User Portal](https://gansu2.github.io/portal/), also linked in the navigation menu:
run `gansu2-license -s` to get a sign-up code, register it at the portal to receive
a free license, then `gansu2-license -k <KEY> -a`.

A license key permits **any use, including commercial use**. See the [Terms and Conditions]({{ '/en/TERMS/' | relative_url }}) and the [User Portal Account Terms of Service]({{ '/en/PORTAL_TOS.html' | relative_url }}).
