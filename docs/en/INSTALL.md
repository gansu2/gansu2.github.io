---
layout: default
title: Installation
nav_order: 1.5
lang: en
hreflang_alt: "ja/INSTALL"
hreflang_lang: "ja"
permalink: /en/INSTALL.html
---

# Installing GANSU2

## Requirements

- **Linux x86_64** (`manylinux_2_28`, glibc ≥ 2.28 — e.g. Ubuntu 20.04 or newer)
- An **NVIDIA GPU** with a recent CUDA driver
- **Python 3.8+**

## Install

GANSU2 ships as a small "thin" wheel on PyPI:

```bash
pip install gansu2
```

If PyPI is not reachable from your machine, the same wheel is attached to every
release on the [releases page](https://github.com/gansu2/dist/releases/latest)
and can be installed by URL.

The wheel itself is only a few MB. On first use, GANSU2 downloads the GPU shared
library (`libgansu2.so`) and the `gansu2` command-line tool from the same
release and caches them under `~/.cache/gansu2/<version>/`, each file verified
against its published SHA-256.

## Verify

```bash
python -c "import gansu2; print('gansu2 imported OK')"
```

The first time you run the `gansu2` command (or a calculation from Python), the
GPU library and CLI are fetched once — see the
[CLI guide](/en/usage_cli/) and the [Python API guide](/en/usage_python/).

## Using an offline shared library

To point at a specific `libgansu2.so` instead of fetching it (for example an
offline copy), set `GANSU2_LIB` before importing:

```bash
export GANSU2_LIB=/path/to/libgansu2.so
```

## Getting a free license key

Small calculations run with no license at all. Anything larger needs a **free
license key**, which grants full, unlimited use (commercial use included). The
key is a *floating* license — it is not tied to a machine, and one key runs one
calculation at a time.

1. Get an 8-character **sign-up code** from the tool bundled in the wheel
   (an unlicensed run that hits the size limit prints the same code and URL):

   ```bash
   gansu2-license -s
   ```

2. Open the [User Portal](/portal/), create an account, enter the sign-up code
   in the registration form, and press **Start** to activate your Free License
   (this begins the 30-day period, which you can renew from the portal at any
   time). Your license key is emailed to you.

3. Register the key on this machine:

   ```bash
   gansu2-license -k <YOUR-KEY> -a
   ```

GANSU2 now runs without the size limit. See the
[Terms and Conditions](/en/TERMS/) and the
[Portal Account Terms of Service](/en/PORTAL_TOS.html).
