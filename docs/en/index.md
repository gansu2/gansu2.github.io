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

GANSU2 is a GPU-accelerated quantum-chemistry package (Hartree–Fock, post-HF, and
periodic systems) distributed as a licensed shared library. It installs with a
single `pip` command; the native library and CLI are fetched on first use.

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
