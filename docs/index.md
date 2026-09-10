---
layout: default
title: "GANSU2 Test Site"
nav_order: 1
---

# GANSU2 Test Site

This site is used for testing.

## Download

The current build is attached to the
[latest release](https://github.com/gansu2/dist/releases/latest).

```bash
pip install ./gansu2-<version>-py3-none-manylinux_2_28_x86_64.whl
```

Linux x86_64 only. Remaining dependencies are resolved by pip.

The wheel is small; the native components are fetched on first use and cached
under `~/.cache/gansu2/<version>/`, each verified against its published SHA-256.
On a machine without outbound access, download them from the same release and
point `GANSU2_LIB` at the shared library.

## Licensing

Without a license key the workload size is limited. When the limit is reached
the run stops with a message explaining how to obtain a key; nothing is
silently reduced.

Keys are issued from the [User Portal](https://gansu2.github.io/portal/),
also reachable from the navigation menu.
