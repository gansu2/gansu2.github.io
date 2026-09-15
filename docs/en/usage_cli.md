---
layout: default
title: CLI
nav_order: 2
lang: en
hreflang_alt: "ja/usage_cli"
hreflang_lang: "ja"
---

# GANSU2 CLI Usage Guide

## Quick Start

Install from PyPI. The wheel is small; the `gansu2` command and the GPU shared
library are fetched on first use and cached under `~/.cache/gansu2/<version>/`.

```bash
pip install gansu2
```

```bash
# Run a calculation
gansu2 -x h2o.xyz -g sto-3g -m RHF
```

## Preparing Input Files

### XYZ File Format

XYZ files specify molecular geometry. Format: number of atoms, comment line, then atom coordinates in Angstrom.

**H2 molecule** (`h2.xyz`):
```
2
Hydrogen molecule
H  0.000  0.000  0.000
H  0.000  0.000  0.740
```

**H2O molecule** (`h2o.xyz`):
```
3
Water molecule
O   0.000   0.000   0.127
H   0.000   0.758  -0.509
H   0.000  -0.758  -0.509
```

**NH3 molecule** (`nh3.xyz`):
```
4
Ammonia
N   0.000   0.000   0.117
H   0.000   0.939  -0.273
H   0.813  -0.470  -0.273
H  -0.813  -0.470  -0.273
```

**CH4 molecule** (`ch4.xyz`):
```
5
Methane
C   0.000   0.000   0.000
H   0.629   0.629   0.629
H  -0.629  -0.629   0.629
H  -0.629   0.629  -0.629
H   0.629  -0.629  -0.629
```

**Benzene** (`benzene.xyz`):
```
12
Benzene
C   0.000   1.387   0.000
C   1.201   0.693   0.000
C   1.201  -0.693   0.000
C   0.000  -1.387   0.000
C  -1.201  -0.693   0.000
C  -1.201   0.693   0.000
H   0.000   2.469   0.000
H   2.138   1.235   0.000
H   2.138  -1.235   0.000
H   0.000  -2.469   0.000
H  -2.138  -1.235   0.000
H  -2.138   1.235   0.000
```

### Periodic Systems (PBC)

Give the geometry an ASE-style extended-XYZ header — a `Lattice="..."` tag on
the comment line, nine numbers for rows a, b, c in Angstrom — and `gansu2`
automatically runs a Gamma-point periodic Hartree–Fock (PBC-RHF) instead of a
molecular calculation. No extra flag is required.

**Water in a cubic cell** (`h2o_pbc.xyz`) — the `Lattice=` tag is what triggers
the periodic path:

```
3
Lattice="12.0 0.0 0.0 0.0 12.0 0.0 0.0 0.0 12.0"
O  0.000  0.000  0.127
H  0.000  0.758 -0.509
H  0.000 -0.758 -0.509
```

```bash
gansu2 -x h2o_pbc.xyz -g sto-3g
```

k-point Kohn–Sham DFT (KRKS) is provided by the separate `gansu2_krks` runner;
run it with no arguments to see the lattice and k-mesh options.

### Basis Sets

Basis sets are specified by name. GANSU2 automatically resolves the path.

| Name | Description | Typical use |
|------|-------------|-------------|
| `sto-3g` | Minimal basis | Quick tests |
| `3-21g` | Split-valence | Preliminary calculations |
| `6-31g` | Split-valence | General use |
| `6-31g_st` | With polarization (6-31G*) | Better accuracy |
| `cc-pvdz` | Correlation-consistent DZ | Post-HF calculations |
| `cc-pvtz` | Correlation-consistent TZ | High-accuracy post-HF |
| `cc-pvqz` | Correlation-consistent QZ | Benchmark calculations |

By default GANSU2 uses **Cartesian** Gaussians (6 d-functions, 10 f, 15 g). To match the **spherical-harmonic** convention used by ORCA / PySCF / NWChem for cc-pVnZ and similar basis sets (5 d, 7 f, 9 g), add `--use_spherical 1`. See [Example 2b](#2b-spherical-harmonic-basis).

---

## Basic Usage

### Syntax
```
gansu2 -x <xyz_file> -g <basis> [options]
```

### Options

| Option | Description | Default |
|--------|-------------|---------|
| `-x` | XYZ file path | (required) |
| `-g` | Basis set name or path | (required) |
| `-m` | Method: `RHF`, `UHF`, `ROHF`, `RKS` (DFT) | `RHF` |
| `-r` | Run type: `energy`, `gradient`, `optimize`, `hessian` | `energy` |
| `-c` | Molecular charge | `0` |
| `--post_hf_method` | Post-HF method (see below) | `none` |
| `--n_excited_states` | Number of excited states | `3` |
| `--eri_method` | ERI method: `stored`, `RI`, `direct`, `hash` | `stored` |
| `--functional` | DFT functional for `RKS`: `svwn5`, `pbe` | `svwn5` |
| `--grid_level` | DFT grid level 0–9 (PySCF-compatible) | `1` |
| `--convergence_method` | SCF convergence: `DIIS`, `SOSCF`, etc. | `DIIS` |
| `--initial_guess` | Initial guess: `core`, `gwh`, `sad`, `minao` | `core` |
| `--optimizer` | Geometry optimizer (see below) | `bfgs` |
| `--use_spherical` | Spherical-harmonic basis (5D/7F/9G) instead of Cartesian (6D/10F/15G) | `0` |
| `--num_gpus` | Number of GPUs for multi-GPU RI (-1 = auto-detect all) | `-1` |
| `--cpu` | Force CPU-only execution | (off) |
| `--list-basis` | List available basis sets and exit | |
| `-p` | Parameter recipe file | (none) |

### DFT (Kohn-Sham)

```bash
gansu2 -x H2O.xyz -g cc-pvdz --method rks --functional pbe --grid_level 3
```

`--functional` accepts `svwn5` (LDA) and `pbe` (GGA); `--grid_level` 0–9 follows PySCF's grid levels. RKS only (closed shell). See [DFT parameters](parameters.html#dft-parameters).

### Post-HF Methods

| Value | Method |
|-------|--------|
| `none` | HF only |
| `mp2` | MP2 |
| `mp3` | MP3 |
| `mp4` | MP4 |
| `cc2` | CC2 |
| `ccsd` | CCSD |
| `ccsd_t` | CCSD(T) |
| `ccsd_density` | CCSD + Lambda + 1-RDM |
| `dmet` | DMET-CCSD (fragment-based correlation, multi-GPU, auto X-H bond fragmentation) |
| `dmet_ccsd_t` | DMET-CCSD(T) — same fragment construction plus perturbative triples per fragment |
| `dlpno_ccsd` | DLPNO-CCSD (closed-shell RHF, local-correlation CCSD, requires RI) |
| `dlpno_ccsd_t` | DLPNO-CCSD(T) — perturbative triples on per-triple TNO bases, multi-GPU batched |
| `fci` | Full CI |
| `cis` | CIS excited states |
| `adc2` | ADC(2) excited states |
| `sos_adc2` | SOS-ADC(2) excited states |
| `lt_sos_adc2` | Laplace-transform SOS-ADC(2) (O(N⁴) with RI) |
| `adc2x` | ADC(2)-x excited states |
| `thc_sos_adc2` | Tensor Hypercontraction SOS-ADC(2) (O(N³) sigma; `--eri_method ri` recommended) |
| `eom_mp2` | EOM-MP2 excited states |
| `eom_cc2` | EOM-CC2 excited states |
| `eom_ccsd` | EOM-CCSD excited states |
| `ip_eom_ccsd` | IP-EOM-CCSD — (N−1)-electron ionized states (RHF) |
| `ea_eom_ccsd` | EA-EOM-CCSD — (N+1)-electron attached states (RHF) |
| `steom_ccsd` | STEOM-CCSD (auto-runs CIS-NTO + IP/EA-EOM; RHF) |
| `dlpno_steom_ccsd` | DLPNO-STEOM-CCSD — local STEOM (RHF, requires RI) |

### Optimizers

`bfgs`, `dfp`, `sr1`, `gdiis`, `newton`, `cg-fr`, `cg-pr`, `cg-hs`, `cg-dy`, `sd`

---

## Examples

### 1. Basic HF Energy

```bash
cat > h2o.xyz << 'EOF'
3
Water
O   0.000   0.000   0.127
H   0.000   0.758  -0.509
H   0.000  -0.758  -0.509
EOF

gansu2 -x h2o.xyz -g sto-3g
```

### 2. Different Basis Sets

```bash
gansu2 -x h2o.xyz -g sto-3g        # Minimal basis
gansu2 -x h2o.xyz -g cc-pvdz       # Double-zeta
gansu2 -x h2o.xyz -g cc-pvtz       # Triple-zeta
```

### 2b. Spherical-Harmonic Basis

By default GANSU2 uses Cartesian Gaussians (6D/10F/15G). Add `--use_spherical 1`
to use pure spherical harmonics (5D/7F/9G, Molden ordering), matching the
ORCA / PySCF / NWChem convention for cc-pVnZ and similar basis sets.

```bash
# Cartesian (default) vs spherical RHF energy
gansu2 -x h2o.xyz -g cc-pvdz                       # Cartesian (25 basis functions)
gansu2 -x h2o.xyz -g cc-pvdz --use_spherical 1     # Spherical (24 basis functions)

# Works across stored / RI / multi-GPU and gradients + optimization
gansu2 -x benzene.xyz -g cc-pvdz --use_spherical 1
gansu2 -x h2o.xyz -g cc-pvdz --eri_method ri -ag cc-pvdz-rifit.gbs \
        -r optimize --use_spherical 1 --num_gpus 4
```

Spherical basis is supported for RHF/UHF/ROHF energy (stored, RI, multi-GPU
distributed RI), RI post-HF (MP2/CCSD/CIS/EOM/ADC(2)/DLPNO/STEOM), THC, all
initial guesses (core/gwh/sad/minao for RHF; core/gwh/sad for UHF/ROHF), ECP,
analytical gradient and geometry optimization, analytical Hessian and
vibrational frequencies, and Molden export. Direct-SCF/Hash ERIs and the
(experimental) MP2 gradient remain Cartesian-only and raise a clear error under
`--use_spherical 1`.

### 3. Post-HF Correlation Energy

```bash
# MP2
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method mp2

# CCSD
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method ccsd

# CCSD(T)
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method ccsd_t

# Full CI (exact, small molecules only)
gansu2 -x h2o.xyz -g sto-3g --post_hf_method fci
```

#### Multi-node / multi-GPU Full-CI

The Full-CI vector grows factorially and quickly exceeds a single GPU's memory
(e.g. C₂/6-31g has ~3.4×10⁸ determinants and does not fit one GPU). GANSU2 ships a
distributed solver (`fci_mpi`) that shards the FCI vector across MPI ranks — one
GPU per rank — using NCCL collectives for the Davidson sigma builds (alpha-string
row-block partitioning, with AllGather/ReduceScatter overlapped against compute).

Multi-node Full-CI uses the MPI-enabled distributed solver (`fci_mpi`), provided
as a separate artifact — it is not part of the standard `pip install gansu2`
wheel. With that build available, launch it with `mpirun`:

Launch with `mpirun` through the `script/gansu2_mpi.sh` wrapper, which pins each
rank to exactly one GPU (`CUDA_VISIBLE_DEVICES=$LOCAL_RANK`) so every rank sees
its GPU as device 0:

```bash
# 2 ranks → 2 GPUs
mpirun -np 2 --bind-to none ../script/gansu2_mpi.sh \
       gansu2 -x ../xyz/C2.xyz -g 6-31g --post_hf_method fci
```

The dispatch is automatic: with more than one rank the distributed `fci_mpi`
solver runs; with `-np 1` (or a non-MPI build) the single-GPU `fci()` path is
used and results are byte-identical to before. The two paths agree to machine
precision (H₂O/sto-3g cross-check: single-GPU vs. 2-rank FCI energy differ by
~1×10⁻¹³ Ha).

> [!NOTE]
> `script/gansu2_mpi.sh` resolves the node-local rank from Open MPI, MVAPICH2,
> Slurm (`srun`), or MPICH/Intel MPI environment variables, so the same wrapper
> works across launchers and scales to multiple nodes unchanged (one GPU per rank).

### 4. Excited State Calculations

```bash
# CIS — 10 excited states
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method cis --n_excited_states 10

# ADC(2) — accurate excited states
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method adc2

# EOM-CCSD — gold standard for excited states
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method eom_ccsd

# STEOM-CCSD — auto-runs CIS-NTO + IP-EOM + EA-EOM (RI recommended)
gansu2 -x h2o.xyz -g cc-pvdz --eri_method ri -ag cc-pvdz-rifit.gbs \
        --post_hf_method steom_ccsd --n_excited_states 5

# THC-SOS-ADC(2) — O(N^3) sigma build for larger systems
gansu2 -x h2o.xyz -g cc-pvdz --eri_method ri -ag cc-pvdz-rifit.gbs \
        --post_hf_method thc_sos_adc2 --n_excited_states 5

# Triplet states
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method adc2 --spin_type triplet
```

### 4b. DMET-CCSD (Fragment-Based Correlation)

DMET-CCSD partitions the molecule into atom-localized fragments, builds an embedding cluster (fragment AOs + Schmidt-decomposed bath orbitals) for each, and runs CCSD per cluster. Total correlation is reconstructed by democratic projection. Multi-GPU fragment parallelism gives near-linear speedup with the number of unique fragments.

```bash
# Auto fragment detection (recommended): each heavy atom + nearest H atoms
# Benzene → 6 CH fragments, 2 unique by symmetry
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet --num_gpus 4

# DMET-CCSD(T) — perturbative triples added per fragment at converged μ_DMET
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet_ccsd_t --num_gpus 4

# Manual fragment specification (atom indices, 0-indexed)
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --post_hf_method dmet \
    --dmet_fragments "{0,6} {1,7} {2,8} {3,9} {4,10} {5,11}"

# Vayesta-compatible loose tolerance (faster bisection, ~1% N deviation)
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --post_hf_method dmet \
    --dmet_n_tol 4.2e-3

# Per-fragment debug output (max|f_ov|, ε spectrum, D_cluster eigenvalues)
GANSU_DMET_VERBOSE=1 gansu2 ../xyz/Benzene.xyz -g sto-3g --post_hf_method dmet
```

The output reports both T-amplitude democratic energy and the standard QC-DMET (Vayesta-convention) energy:

```
---- DMET-CCSD Summary ----
  Chemical potential μ_DMET (CCSD-relaxed): -1.144e-03 Ha
  Total DMET-CCSD correlation energy (T-amp democratic): -0.3043 Ha
  Total DMET-CCSD correlation energy (DMET, Vayesta):    -0.4938 Ha
  HF energy:                              -227.8926 Ha
  DMET-CCSD total energy (DMET):          -228.3864 Ha
```

### 4c. DLPNO-CCSD / DLPNO-CCSD(T) (Local Correlation)

DLPNO-CCSD and DLPNO-CCSD(T) (Riplinger & Neese, 2013/2016) exploit four nested locality layers — occupied LMO localization (Pipek-Mezey), projected atomic orbitals + per-LMO atom domains, per-pair PNO truncation, and strong/weak-pair partitioning — to achieve near-canonical CCSD(T) accuracy at near-linear scaling. GANSU2 implements the **closed-shell RHF** variant with GPU-accelerated per-triple kernels (cuBLAS batched DGEMM, memory-aware chunked flush) and multi-GPU per-triple parallelism. The RI back-end is required.

```bash
# DLPNO-CCSD on water hexamer (normal preset)
gansu2 -x ../xyz/large_molecular/water_hexamer.xyz -g cc-pvdz \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dlpno_ccsd --dlpno_preset normal --num_gpus 8

# DLPNO-CCSD(T) — adds perturbative triples (TNO basis, PySCF-equivalent 6-W formula)
gansu2 -x ../xyz/large_molecular/water_hexamer.xyz -g cc-pvdz \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dlpno_ccsd_t --dlpno_preset normal --num_gpus 8

# Tighter accuracy (closer to canonical, larger PNO/TNO basis)
gansu2 ... --post_hf_method dlpno_ccsd_t --dlpno_preset tight

# Per-section profile (DLPNO-(T) triple loop breakdown)
gansu2 ... --post_hf_method dlpno_ccsd_t --dlpno_verbose 2
```

ORCA-compatible truncation presets: `loose` / `normal` (default) / `tight` / `very_tight`. See [DLPNO-CCSD / DLPNO-CCSD(T) parameters](parameters.md#dlpno-ccsd--dlpno-ccsdt-parameters) for the underlying `t_cut_*` cutoffs and fine-tuning options.

### 4d. Exporting Localized Orbitals

The Pipek-Mezey localization from the DLPNO pipeline can be repurposed to write occupied LMOs to a Molden file for visualization in Avogadro / Jmol / VMD / MOrbVis. Works for any SCF method (RHF / UHF / ROHF) — DLPNO is not actually run.

```bash
# Closed-shell: 1 localization, writes occupied LMOs + canonical virtuals
gansu2 -x ../xyz/Benzene.xyz -g cc-pvdz --export_lmo_molden 1
# → output_lmo.molden

# UHF: α and β occupied blocks localized independently
gansu2 -x ../xyz/radical.xyz -g cc-pvdz -m UHF --export_lmo_molden 1
```

For ROHF, doubly-occupied and singly-occupied subspaces are localized separately so closed-shell core and open-shell electrons do not mix. Pass `--export_molden 1 --export_lmo_molden 1` together to emit both canonical (`output.molden`) and localized (`output_lmo.molden`) files in a single run.

### 5. Energy Gradient

```bash
# Stored-ERI analytical gradient
gansu2 -x h2o.xyz -g cc-pvdz -r gradient

# RI-native analytical gradient (3c/2c integral derivatives), single- or multi-GPU
gansu2 -x h2o.xyz -g cc-pvdz --eri_method ri -ag cc-pvdz-rifit.gbs -r gradient
gansu2 -x h2o.xyz -g cc-pvdz --eri_method ri -ag cc-pvdz-rifit.gbs -r gradient --num_gpus 4

# Spherical-basis gradient
gansu2 -x h2o.xyz -g cc-pvdz --eri_method ri -ag cc-pvdz-rifit.gbs -r gradient --use_spherical 1
```

Analytical gradients are available for RHF/UHF (stored, Direct) and RHF (RI,
single- and multi-GPU), in both Cartesian and spherical bases. Post-HF gradients
(MP2/CCSD/...) are not yet supported.

### 6. Geometry Optimization

```bash
# Create a distorted H2
cat > h2_stretched.xyz << 'EOF'
2
Stretched H2
H  0.000  0.000  0.000
H  0.000  0.000  1.500
EOF

# Optimize with BFGS (default)
gansu2 -x h2_stretched.xyz -g cc-pvdz -r optimize

# Optimize with Newton-Raphson (uses analytical Hessian)
gansu2 -x h2_stretched.xyz -g cc-pvdz -r optimize --optimizer newton
```

### 7. Vibrational Frequencies (Hessian)

```bash
gansu2 -x h2o.xyz -g cc-pvdz -r hessian
```

### 8. UHF for Open-Shell Systems

```bash
# Hydrogen atom (1 electron)
cat > h_atom.xyz << 'EOF'
1
Hydrogen atom
H  0.000  0.000  0.000
EOF

gansu2 -x h_atom.xyz -g cc-pvdz -m UHF
```

### 9. Charged Molecules

```bash
# OH- anion
cat > oh.xyz << 'EOF'
2
Hydroxide
O  0.000  0.000  0.000
H  0.000  0.000  0.970
EOF

gansu2 -x oh.xyz -g cc-pvdz -c -1
```

### 10. RI Approximation for Large Molecules

```bash
# Explicit auxiliary basis
gansu2 -x benzene.xyz -g cc-pvdz --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs

# Auto-generated auxiliary basis
gansu2 -x benzene.xyz -g cc-pvdz --eri_method ri
```

### 11. CCSD Density Matrix (for DMET)

```bash
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method ccsd_density
```

### 12. CPU-Only Mode

```bash
gansu2 -x h2o.xyz -g sto-3g --cpu
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method ccsd --cpu
```

### 13. Using a Parameter Recipe File

```bash
cat > recipe.txt << 'EOF'
method = RHF
convergence_method = DIIS
initial_guess = sad
eri_method = stored
EOF

gansu2 -p recipe.txt -x h2o.xyz -g cc-pvdz --post_hf_method mp2
```

---

### 14. List Available Basis Sets

```bash
gansu2 --list-basis
```

---

## Full Parameter Reference

See [parameters.md](parameters.md) for the complete list of all parameters, types, and defaults.

---

## Tips

- **Basis set names are case-insensitive**: `cc-pvdz`, `CC-PVDZ`, `cc-pVDZ` all work.
- **SAD initial guess** (`--initial_guess sad`) is recommended for faster SCF convergence on molecules larger than H2.
- **RI approximation** (`--eri_method ri`) dramatically reduces memory usage for larger molecules. Performance is comparable to stored ERI for small molecules.
- **GPU acceleration** is automatic when an NVIDIA GPU is detected. Use `--cpu` to force CPU execution for benchmarking or debugging.
