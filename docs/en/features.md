---
layout: default
title: Features
nav_order: 1.2
lang: en
hreflang_alt: "ja/features"
hreflang_lang: "ja"
description: "What GANSU2 can do: methods, approximations, properties, periodic systems and hardware support."
---

# Features
{: .no_toc }

1. TOC
{:toc}

## What GANSU2 is

GANSU2 is a quantum-chemistry program written for NVIDIA GPUs from the ground up.
Integrals, SCF, and the correlated and excited-state solvers all run on the device,
so a single workstation GPU covers work that would otherwise need a cluster
allocation. It spans the usual range of ab-initio methods, from Hartree-Fock and
Kohn-Sham DFT through coupled cluster and equation-of-motion excited states, and
adds local and fragment-based approximations for larger molecules.

It is distributed as a licensed shared library and installs with one `pip` command.
Three front ends share the same engine: a command-line driver, a Python API, and the
C ABI of the shared library itself.

GANSU2 is developed at Hiroshima University with Fujitsu Limited, and continues the
earlier open-source GANSU project.

## At a glance

| | |
|---|---|
| SCF | RHF, UHF, ROHF, RKS (closed-shell DFT) |
| Ground-state correlation | MP2 / MP3 / MP4, CC2, CCSD, CCSD(T), FCI, plus spin-component-scaled and Laplace-transform MP2 variants |
| Local correlation | DLPNO-CCSD, DLPNO-CCSD(T), DMET-CCSD, DMET-CCSD(T) |
| Excited states | CIS, ADC(2)-s / ADC(2)-x, EOM-MP2 / CC2 / CCSD, IP- and EA-EOM-CCSD, STEOM-CCSD |
| Run types | Energy, analytical gradient, geometry optimization, analytical Hessian with vibrational frequencies |
| Periodic systems | Gamma-point PBC-RHF, k-point Kohn-Sham DFT |
| Integral handling | Stored, Direct-SCF, RI, Direct-RI, tensor hypercontraction |
| Hardware | Single GPU, multi-GPU, multi-node MPI for Full-CI, CPU-only fallback |
| Interfaces | CLI, Python, C ABI |

The [Parameters]({{ '/en/parameters/' | relative_url }}) page documents every option
named below.

## SCF methods

| Method | `--method` | Notes |
|---|---|---|
| Restricted Hartree-Fock | `rhf` | Default |
| Unrestricted Hartree-Fock | `uhf` | Open-shell and radical systems |
| Restricted open-shell Hartree-Fock | `rohf` | Selectable ROHF parameter sets, Roothaan among them |
| Restricted Kohn-Sham DFT | `rks` | Closed-shell only |

Convergence acceleration uses DIIS by default, with an adjustable subspace size and
damping factor. Initial guesses available are core Hamiltonian, GWH, SAD and MINAO.
Charge and spin are set with `--charge` and `--beta_to_alpha`.

## Density functional theory

Restricted Kohn-Sham DFT is selected with `--method rks`.

| | |
|---|---|
| Functionals | SVWN5 (LDA), PBE (GGA) |
| Radial grids | Treutler, SG-1, Mura-Knowles, Gauss-Chebyshev, Delley |
| Grid levels | 0 to 9, using the same level table as PySCF, so energies compare directly at equal level |
| Coulomb build | Stored, direct with density-difference screening, RI-J, direct RI-J |
| Exchange-correlation build | Spatially binned batched GEMM (default), direct, stored, and an anchored incremental scheme |

Grids are Becke-partitioned atom-centred grids with NWChem-style angular pruning.
The anchored incremental scheme evaluates only the density change on a representative
sub-grid for most SCF steps and re-anchors periodically. At grid level 6 with PBE
this cuts the mean exchange-correlation build time by a factor of roughly 2.3 to 2.6
while keeping converged energies within about 6e-7 Hartree.

UKS and ROKS, hybrid and meta-GGA functionals, and DFT analytical gradients are not
implemented yet.

## Correlated ground states

| Method | Scaling | Notes |
|---|---|---|
| MP2 | | Opposite-spin and same-spin components reported separately |
| SCS-MP2, SOS-MP2 | | Spin-component-scaled and scaled-opposite-spin variants |
| LT-MP2, LT-SOS-MP2 | O(N^4) with RI | Laplace-transform denominators decouple occupied and virtual indices |
| MP3 | O(N^6) | |
| MP4 | O(N^7) | Full SDQ plus triples contributions |
| CC2 | O(N^5) | Doubles at MP1 quality, coupled iteratively to singles |
| CCSD | O(N^6) | |
| CCSD(T) | O(N^7) for the triples step | The usual reference point for ground-state correlation |
| CCSD density | | Lambda equations and the one-particle reduced density matrix, for properties and embedding |
| FCI | Factorial | Exact within the basis. The MPI build shards the CI vector across ranks and GPUs |

## Local and fragment-based correlation

For molecules beyond the reach of canonical coupled cluster.

**DLPNO-CCSD and DLPNO-CCSD(T)** use Pipek-Mezey localized occupied orbitals,
projected atomic orbitals with per-orbital atom domains, per-pair pair natural
orbital truncation, and strong/weak pair partitioning. Four ORCA-compatible
truncation presets are provided, from loose to very tight. Perturbative triples are
evaluated on per-triple triple natural orbital bases with batched GPU kernels.
Closed-shell RHF with RI is required.

**DMET-CCSD and DMET-CCSD(T)** apply density matrix embedding theory with CCSD as the
impurity solver. Fragments are detected automatically from X-H bonds or specified by
atom index, and they can be distributed across GPUs.

## Excited states

| Method | Notes |
|---|---|
| CIS | Lowest cost, O(N^4) |
| ADC(2)-s | Strict algebraic diagrammatic construction, diagonal doubles block |
| ADC(2)-x | Extended, with first-order off-diagonal terms |
| SOS-ADC(2), LT-SOS-ADC(2) | Scaled-opposite-spin and Laplace-transform variants |
| THC-SOS-ADC(2) | Tensor hypercontraction, O(N^3) sigma build |
| EOM-MP2, EOM-CC2 | Equation-of-motion at MP2 and CC2 quality |
| EOM-CCSD | The most accurate single-reference option here |
| IP-EOM-CCSD, EA-EOM-CCSD | Ionization potentials and electron affinities |
| STEOM-CCSD | Similarity-transformed EOM-CCSD. Captures double excitations at singles cost |
| DLPNO-STEOM-CCSD | Local variant built on the DLPNO-CCSD ground state |
| CIS-NTO | State-averaged CIS in a natural-transition-orbital active space |

Singlet and triplet states are both available for CIS and the ADC(2) variants, and
oscillator strengths are reported for singlets. ADC(2), EOM-MP2 and EOM-CC2 each
offer a choice of solver: full Davidson in the singles-plus-doubles space, or a
Schur-complement reduction evaluated at fixed or self-consistent frequency. The
default picks one from the available GPU memory.

## Properties and run types

| `--run_type` | Result |
|---|---|
| `energy` | Single-point energy. The default |
| `gradient` | Analytical energy gradient |
| `optimize` | Geometry optimization driven by analytical gradients |
| `hessian` | Analytical Hessian, harmonic frequencies, mass-weighted normal modes and IR intensities |

Geometry optimization offers BFGS, Polak-Ribiere conjugate gradient, GDIIS and
Newton-Raphson, with trust-region control and separate thresholds on maximum and RMS
gradient, energy change and displacement. Translational and rotational modes are
projected out of the Hessian.

Also available: dipole moment, Mulliken population analysis, Mayer and Wiberg bond
orders, Molden export of canonical molecular orbitals, and Molden export of
Pipek-Mezey localized occupied orbitals for visualization.

## Integrals and approximations

| | |
|---|---|
| One-electron integrals | McMurchie-Davidson, Obara-Saika, or a hybrid of the two |
| Two-electron integrals | Stored on the device, Direct-SCF, RI, or Direct-RI |
| Auxiliary basis | Supplied as a file, or generated automatically from the primary basis |
| Screening | Schwarz screening with an adjustable threshold |
| Tensor hypercontraction | Least-squares THC on a Becke-Lebedev grid, with density pruning and a memory budget |
| Basis functions | Cartesian Gaussians by default. Pure spherical harmonics in Molden ordering with `--use_spherical 1` |

Spherical-harmonic mode reproduces the convention that ORCA, PySCF and NWChem use for
cc-pVnZ and similar sets. Benzene RHF in cc-pVDZ matches the ORCA spherical-d
reference to within 1e-9 Hartree.

## Periodic systems

Give an XYZ file an ASE-style extended-XYZ header with a `Lattice="..."` tag and
`gansu2` runs Gamma-point periodic Hartree-Fock instead of a molecular calculation.
No extra flag is needed, and the same thing works from the Python API through the
`lattice=` argument.

k-point Kohn-Sham DFT is provided by a separate `gansu2_krks` runner, which takes
lattice and k-mesh options.

## Basis sets and effective core potentials

GANSU2 ships 22 orbital basis sets and 7 auxiliary basis sets, from STO-3G through
cc-pVQZ. They are selected by name and resolved automatically, and
`gansu2 --list-basis` prints the list. Any Gaussian-format basis file from the Basis
Set Exchange can be passed by path instead.

Effective core potentials are applied automatically when the basis file embeds them,
which covers the heavy elements of sets such as LANL2DZ and def2-SVP. A separate ECP
file can be supplied instead. ECPs work in both Cartesian and spherical bases, for
energies and gradients.

## Hardware

| | |
|---|---|
| GPU | NVIDIA, Compute Capability 8.0 and above, covering Ampere, Ada, Hopper and Blackwell |
| Multi-GPU | RI-HF and DMET fragment-parallel execution, with NCCL for distributed Fock builds |
| Multi-node | The MPI build shards the Full-CI vector across ranks and GPUs |
| CPU-only | `--cpu` runs HF, gradients, Hessians, every post-HF method and DMET-CCSD on OpenMP kernels, with no GPU required |

The published shared library carries device code for Compute Capability 8.0, 8.6,
8.9, 9.0, 10.0 and 12.0.

## Interfaces

- **[CLI]({{ '/en/usage_cli/' | relative_url }})** — the `gansu2` command. Options can
  also be collected in a parameter recipe file.
- **[Python API]({{ '/en/usage_python/' | relative_url }})** — `import gansu2`. Energies,
  orbital energies and coefficients, density matrices, forces, Hessians and
  frequencies come back as NumPy arrays.
- **[C API]({{ '/en/usage_c_api/' | relative_url }})** — the shared library's own ABI,
  for callers in C, C++ or any language with a foreign-function interface.

## Distribution and licensing

Installation is `pip install gansu2`. The wheel is small; the GPU shared library and
the CLI are fetched on first use and verified against their published SHA-256
checksums. See [Installation]({{ '/en/INSTALL.html' | relative_url }}).

Without a license key the workload size is capped (**Max Size**). Reaching the cap
stops the run with instructions for obtaining a key, and nothing is silently reduced.
A key lifts the cap and permits any use, including commercial use. Keys are issued
free of charge from the [User Portal](https://gansu2.github.io/portal/).
