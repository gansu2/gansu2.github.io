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
| SCF | RHF, UHF, ROHF, RKS / UKS / ROKS (Kohn-Sham DFT) |
| Ground-state correlation | MP2 / MP3 / MP4, CC2, CCSD, CCSD(T), FCI, plus spin-component-scaled and Laplace-transform MP2 variants |
| Local correlation | DLPNO-CCSD, DLPNO-CCSD(T), DMET-CCSD, DMET-CCSD(T) |
| Excited states | CIS, ADC(2)-s / ADC(2)-x, EOM-MP2 / CC2 / CCSD, IP- and EA-EOM-CCSD, STEOM-CCSD |
| Run types | Energy, analytical gradient, geometry optimization, analytical Hessian with vibrational frequencies |
| Periodic systems | Gamma-point PBC-RHF / UHF / ROHF / RKS / UKS, k-point Hartree-Fock and Kohn-Sham DFT |
| Integral handling | Stored, Direct-SCF, RI, Direct-RI, tensor hypercontraction |
| Hardware | Single GPU, multi-GPU, multi-node MPI for Full-CI, CPU-only fallback |
| Interfaces | CLI, Python, C ABI |

The [Parameters]({{ '/en/parameters/' | relative_url }}) page documents the options
named below; tuning options are listed under
[Advanced parameters]({{ '/en/parameters_advanced/' | relative_url }}).

## SCF methods

| Method | `--method` | Notes |
|---|---|---|
| Restricted Hartree-Fock | `rhf` | Default |
| Unrestricted Hartree-Fock | `uhf` | Open-shell and radical systems |
| Restricted open-shell Hartree-Fock | `rohf` | Selectable ROHF parameter sets, Roothaan among them |
| Restricted Kohn-Sham DFT | `rks` | Closed-shell |
| Unrestricted Kohn-Sham DFT | `uks` | Open-shell |
| Restricted open-shell Kohn-Sham DFT | `roks` | Open-shell |

Convergence acceleration uses DIIS by default, with an adjustable subspace size and
damping factor. Initial guesses available are core Hamiltonian, GWH, SAD and MINAO.
Charge and spin are set with `--charge` and `--beta_to_alpha`.

## Density functional theory

Kohn-Sham DFT is selected with `--method rks` (closed shell), `--method uks` or `--method roks` (open shell).

| | |
|---|---|
| Functionals | SVWN5 (LDA), PBE, BLYP (GGA), SCAN (meta-GGA), B3LYP, B3LYP5, PBE0 (hybrid) |
| Radial grids | Treutler, SG-1, Mura-Knowles, Gauss-Chebyshev, Delley |
| Grid levels | 0 to 9, using the same level table as PySCF, so energies compare directly at equal level |
| Coulomb build | Stored, direct with density-difference screening, RI-J, direct RI-J |
| Exchange-correlation build | Several algorithms, including an incremental scheme for large grids |

Grids are Becke-partitioned atom-centred grids with NWChem-style angular pruning.

Analytic RKS / UKS / ROKS gradients are available for every functional, including the meta-GGA SCAN
(Cartesian or spherical basis) (the grid response, i.e. the derivatives of the grid points and of the Becke weights, is included as PySCF's `grid_response=True`, so the gradient is that of the energy on the same grid; the TDA / TDDFT excited-state gradients (RKS and UKS) include it too; SG-1 grids leave it out; `GANSU2_DFT_GRID_RESPONSE=0` turns it off).

Excited states of an RKS or UKS reference come from linear-response TDDFT (`--post_hf_method tda` for the Tamm-Dancoff
approximation, `tddft` for the full response; RKS singlets and triplets, UKS spin-conserving states; Cartesian or spherical basis, LDA / GGA / global hybrids). Both have
analytic excited-state gradients and geometry optimization (`--grad_root`); on an RHF / UHF reference `tddft` is TDHF. With `--eri_method ri` the excitation energies use the RI tensor of the SCF, for large molecules.

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
| FCI | Factorial | Exact within the basis. Closed and open shell (UHF / ROHF reference). The MPI build shards the closed-shell CI vector across ranks and GPUs |

With a UHF reference (`-m UHF`) MP2, SCS-MP2, SOS-MP2, MP3, CC2, CCSD and CCSD(T) are available, with analytic
gradients for MP2, SCS-MP2, SOS-MP2, CC2, CCSD and CCSD(T). For excited states, CIS (UCIS, spin-conserving singles in the Tamm-Dancoff
approximation), ADC(2) (`adc2`), EOM-CC2 (`eom_cc2`, spin-conserving) and EOM-CCSD (`eom_ccsd` for spin-conserving
excitations, `ip_eom_ccsd`, `ea_eom_ccsd`) are available, with analytic excited-state gradients for UCIS, ADC(2), EOM-CC2 and EOM-CCSD
(`--grad_root`). UMP2 / SCS / SOS-UMP2, UMP3, UCC2, UCCSD, UCCSD(T), UCIS, ADC(2) and EOM-UCC2 / EOM-UCCSD run with the stored integrals or with RI
(`--eri_method ri`, through the four-index tensor of the RI factors) on the GPU; the coupled cluster ones keep the full spin-orbital integral tensor in memory, so they are intended for small and medium
molecules. With an ROHF reference (`-m ROHF`) CCSD, CCSD(T), EOM-CCSD, IP- and EA-EOM-CCSD run on
semicanonical orbitals (standard ROHF-CCSD(T); stored or RI integrals), with analytic gradients for CCSD, CCSD(T) and EOM-CCSD (with the ROHF orbital response, frozen core included). The other correlated and excited-state methods take an RHF
reference.

## Local and fragment-based correlation

For molecules beyond the reach of canonical coupled cluster.

**DLPNO-CCSD and DLPNO-CCSD(T)** use Pipek-Mezey localized occupied orbitals,
projected atomic orbitals with per-orbital atom domains, per-pair pair natural
orbital truncation, and strong/weak pair partitioning, with the singles coupled to
the doubles and the PNO truncation correction (ΔE_PNO). Four ORCA-compatible
truncation presets are provided, from loose to very tight; tightening them converges
to canonical CCSD. Perturbative triples are evaluated on per-triple triple natural
orbital bases. The RI approximation is required. DLPNO-CCSD / DLPNO-CCSD(T) on UHF and
ROHF references (and DLPNO-MP2 on UHF) are also available; on open-shell references
they are intended for small molecules, since memory and time are those of canonical UCCSD.

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
| EOM-MP2, EOM-CC2 | Equation-of-motion at MP2 and CC2 quality |
| EOM-CCSD | The most accurate single-reference option here |
| IP-EOM-CCSD, EA-EOM-CCSD | Ionization potentials and electron affinities |
| STEOM-CCSD | Similarity-transformed EOM-CCSD. Captures double excitations at singles cost |
| DLPNO-STEOM-CCSD | Local variant built on the DLPNO-CCSD ground state |
| CIS-NTO | State-averaged CIS in a natural-transition-orbital active space |

Singlet and triplet states are both available for CIS, the ADC(2) variants, EOM-MP2, EOM-CC2, EOM-CCSD and STEOM-CCSD, and oscillator strengths
are reported for singlets. ADC(2), EOM-MP2 and EOM-CC2 each
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
cc-pVnZ and similar sets.

## Periodic systems

Give an XYZ file an ASE-style extended-XYZ header with a `Lattice="..."` tag and
`gansu2` runs Gamma-point periodic Hartree-Fock instead of a molecular calculation.
No extra flag is needed, and the same thing works from the Python API through the
`lattice=` argument.

`-m uhf` and `-m rohf` run the Gamma-point periodic UHF / ROHF (the UHF / ROHF post-HF methods — UMP2 / MP3,
UCCSD(T), UCIS, EOM-UCCSD, ROHF-CC — are available on top of them), and `-m rks` / `-m uks --functional pbe|hse06`
the periodic restricted / unrestricted Kohn-Sham (at the Gamma point unless `--pbc_kmesh` is given). The unrestricted solver fills
each spin by its own Fermi level and shares a degenerate level at the Fermi energy equally (fractional
occupation), so an open shell in a degenerate set (OH, O2) gives the symmetric state, not a symmetry-broken
one. For 3D cells use `--pbc_jk_backend direct`.

`--pbc_kmesh n1,n2,n3` runs the closed-shell calculation on a Monkhorst-Pack k-mesh: Hartree-Fock for `-m rhf`
(`--pbc_xc hf`, the default) and Kohn-Sham with `--pbc_xc pbe|hse06`. The exchange carries no finite-size
(exxdiv) correction, the same convention as at the Gamma point, so an n-point mesh on the primitive cell is
equivalent to the n-cell Gamma-point supercell. Post-HF methods on a k-mesh are not available yet. A separate
`gansu2_krks` runner also takes lattice and k-mesh options.

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
| GPU | NVIDIA, Compute Capability 7.0 (Volta) and 8.0 and above, covering Ampere, Ada, Hopper and Blackwell. The aarch64 build covers 9.0 and above |
| Multi-GPU | RI-HF and DMET fragment-parallel execution |
| Multi-node | The MPI build shards the Full-CI vector across ranks and GPUs |
| CPU-only | `--cpu` runs HF, Kohn-Sham DFT (RKS / UKS / ROKS, Cartesian and spherical basis), the analytical gradients (HF, Kohn-Sham, MP2, SCS-MP2, SOS-MP2, CCSD, CCSD(T), CIS, UMP2, UCCSD, UCCSD(T), UCIS), Hessians, the RHF / UHF / ROHF post-HF energies, PCM, point charges and DMET-CCSD with multi-threaded CPU code, with no GPU required. GPU-only: periodic systems |

The published x86_64 shared library carries device code for Compute Capability 7.0, 8.0, 8.6,
8.9, 9.0, 10.0 and 12.0; the aarch64 library for 9.0, 10.0 and 12.0.

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
