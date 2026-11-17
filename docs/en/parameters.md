---
layout: default
title: Parameters
nav_order: 5
lang: en
hreflang_alt: "ja/parameters"
hreflang_lang: "ja"
---

# Parameters

> [!NOTE]
> Parameters excluding file paths are not case-sensitive.

This page describes the options used in everyday calculations. Options for tuning
solvers, thresholds and algorithms are listed on the
[Advanced parameters](parameters_advanced.md) page; most users never need them.

Every parameter can be given on the command line as `--name value`, in a
[parameter recipe file](#parameter-recipe-file), or as a keyword argument in the
Python API (`mol.run(name=value)`).

## All parameters

| Parameter | Short | Description | Type | Default |
| --- | --- | --- | --- | --- |
| parameter_file | -p | Parameter recipe file (command line only) | string | |
| xyzfilename | -x | XYZ file | string | |
| gbsfilename | -g | Basis set name or Gaussian basis set file | string | |
| auxiliary_gbsfilename | -ag | Auxiliary basis set file for RI (def2-universal-jkfit if omitted) | string | |
| ecp_filename | -ecp | Effective core potential file | string | |
| point_charges | | External point charges file | string | |
| method | -m | SCF method: RHF, UHF, ROHF, RKS, UKS, ROKS | string | RHF |
| charge | -c | Charge of the molecule | int | 0 |
| beta_to_alpha | | Number of electrons moved from beta to alpha spin | int | 0 |
| use_spherical | | Pure spherical-harmonic basis functions instead of Cartesian | bool | false |
| frozen_core | | Frozen core orbitals in post-HF: none, auto, or a number | string | none |
| num_gpus | | Number of GPUs (-1 = all visible GPUs) | int | -1 |
| verbose | -v | Verbose output | bool | false |
| run_type | -r | energy, gradient, optimize, hessian | string | energy |
| post_hf_method | | Post-Hartree-Fock method | string | none |
| tensor_path | | Fast tensor-contraction path of the post-HF methods (`off` / `on` / `auto`) | string | auto |
| casscf_active | | CASSCF active space: `6e,6o` or 0-based orbital numbers such as `16,19-22,29` | string | |
| casscf_roots | | CASSCF: number of CI roots | int | 1 |
| casscf_target_root | | CASSCF: root to optimize (from 0) in a state-specific run | int | 0 |
| casscf_objective | | CASSCF: `SS` (one state) or `SA` (state average) | string | SS |
| casscf_weights | | CASSCF: state weights of a state average, `uniform` or one per root | string | uniform |
| casscf_multiplicity | | CASSCF: spin multiplicity of the CI states, or `any` | string | (reference) |
| casscf_maxiter | | CASSCF: maximum macro iterations | int | 50 |
| n_excited_states | | Number of excited states | int | 5 |
| spin_type | | Spin of the excited states: singlet, triplet | string | singlet |
| grad_root | | Excited state whose gradient is computed (1 = lowest) | int | 1 |
| cis_d | | CIS(D) corrections to the CIS excitation energies | bool | false |
| eri_method | | Two-electron integral method | string | stored |
| maxiter | | Maximum number of SCF iterations | int | 100 |
| convergence_energy_threshold | | SCF energy convergence threshold (Hartree) | double | 1.0e-10 |
| initial_guess | | Initial guess: core, gwh, sad, minao, density | string | core |
| convergence_method | | SCF convergence method | string | DIIS |
| damping_factor | | Damping factor | double | 0.9 |
| diis_size | | Number of previous Fock matrices kept by DIIS | int | 8 |
| density_in | | Read a converged density to restart the SCF | string | |
| density_out | | Write the converged density | string | |
| functional | | DFT exchange-correlation functional | string | svwn5 |
| grid_level | | DFT integration grid level 0–9 | int | 1 |
| mulliken | | Mulliken population analysis | bool | false |
| mayer | | Mayer bond order analysis | bool | false |
| wiberg | | Wiberg bond order analysis | bool | false |
| export_molden | | Write canonical MOs to a Molden file | bool | false |
| export_lmo_molden | | Write Pipek-Mezey localized occupied MOs to a Molden file | bool | false |
| optimizer | | Geometry optimization algorithm | string | bfgs |
| opt_max_iter | | Geometry optimization: maximum steps | int | 200 |
| opt_grad_threshold | | Convergence: max gradient component (Hartree/Bohr) | double | 3.0e-4 |
| opt_rms_grad_threshold | | Convergence: RMS gradient (Hartree/Bohr) | double | 2.0e-4 |
| opt_energy_threshold | | Convergence: energy change (Hartree) | double | 1.0e-6 |
| opt_disp_threshold | | Convergence: max displacement (Bohr) | double | 3.0e-4 |
| opt_step_max | | Trust-region radius (Bohr) | double | 0.3 |
| opt_follow_root | | Excited-state optimization: follow the state by transition-density overlap (1) or keep the root number `grad_root` (0) | int | 1 |
| pcm_eps | | C-PCM dielectric constant (0 = no solvent) | double | 0 |
| dlpno_preset | | DLPNO truncation preset: loose, normal, tight, very_tight | string | normal |
| dmet_fragments | | DMET fragment specification; empty = automatic | string | "" |
| pbc_kmesh | | Monkhorst-Pack k-mesh `n1,n2,n3` for periodic systems | string | 1,1,1 |
| pbc_xc | | Method on a k-mesh: hf, pbe, hse06 | string | (hf) |
| pbc_band_path | | k-path for a band structure (fractional coordinates) | string | |
| pbc_band_points | | k-points per band-path segment | int | 41 |

Command-line-only flags: `--cpu` (CPU-only execution) and `--list-basis` (list the built-in basis sets);
see [Hardware](#hardware).

## Parameter recipe file

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| parameter_file | Parameter recipe file (command line only) | string | |

If the parameter recipe file is given, the parameters are read from the file.
Parameters given on the command line override those in the recipe file.
This parameter is used only on the command line (`-p`).

The recipe file is a text file in which each line contains a parameter name and its value, for example:
```
xyzfilename = ../xyz/H2O.xyz
gbsfilename = ../basis/sto-3g.gbs
method = RHF
convergence_method = OptimalDamping
```

## Input parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| xyzfilename | Path to XYZ file | string | |
| gbsfilename | Basis set name or path to Gaussian basis set file | string | |
| auxiliary_gbsfilename | Path to auxiliary basis set file for RI | string | |
| ecp_filename | Path to ECP file | string | |
| point_charges | Path to external point charges file | string | |

#### xyzfilename - Path to XYZ file
Geometry in Angstrom. If the molecule is given by the Molecule class (Python API), this parameter is ignored.
An ASE-style extended-XYZ header with a `Lattice="..."` tag selects a periodic calculation
(see [Periodic systems](#periodic-system-parameters)).

#### gbsfilename - Basis set
A built-in basis set name (`gansu2 --list-basis` lists them) or the path to a Gaussian-format basis file.
If the basis set is given by the BasisSet class, this parameter is ignored.
However, if `sad` is used as the initial guess, this parameter must be set.

Different basis sets per element or per atom: `-g "<default>;<El>=<basis>;<atoms>=<basis>;..."` (`,` also separates
the entries; the default is optional; element symbols are case-insensitive; `<atoms>` are 1-based atom indices in the
xyz order, `3`, `5-7` or `2+4`, and win over the element entries), e.g. `-g "cc-pvdz;O=aug-cc-pvtz;I=def2-svp"` or
`-g "cc-pvdz;3=aug-cc-pvdz"`. Each element or atom takes its basis functions, and an ECP embedded in that file, from
its own basis set; atoms of one element must have the same ECP. With `--initial_guess sad` every basis set used needs
its `.sad` file. Without `-ag`, RI takes def2-universal-jkfit per element (generated, or with `-ag autoaux` AutoAux,
from the primary basis of each atom that has its own entry).

#### auxiliary_gbsfilename - Auxiliary basis set file for RI approximation
* default: (empty)
* When `eri_method` is `RI` or `Direct_RI`, an auxiliary basis set is required.
* If a file path is specified (e.g., `-ag ../auxiliary_basis/cc-pvdz-rifit.gbs`), the auxiliary basis is loaded from the file.
* `-ag autoaux` generates the **AutoAux** set (G. L. Stoychev, A. A. Auer, F. Neese, *J. Chem. Theory Comput.* **13**, 554 (2017)) from the primary basis for every element: even-tempered uncontracted shells meant for both Coulomb / exchange and correlation fitting. Not available for periodic systems; elements with an ECP are generated like all-electron ones.
* If omitted, the bundled **def2-universal-jkfit** (H–Rn) is used for the elements it covers; for any other element an auxiliary set is **generated** from the primary basis (product basis approach):
  1. For each auxiliary angular momentum $L = 0, 1, \ldots, \min(2L_{\max}, 4)$ ($L_{\max}$: the largest angular momentum of the primary basis), take the sums $\alpha_i + \alpha_j$ of the primitive exponents of the primary shell pairs $(l_A, l_B)$ whose product contains $L$ ($|l_A - l_B| \le L \le l_A + l_B$)
  2. Thin them out (keep an exponent only if it is at least twice the previous kept one)
  3. Create uncontracted auxiliary functions (coefficient = 1.0)
* The same auxiliary set is used for the SCF and for the correlated method. Measured on cc-pVDZ (Cartesian, 11 small molecules), error against exact ERIs in mEh, mean / max:

  | auxiliary set | functions (mean) | RI-HF | MP2 correlation |
  |---|---|---|---|
  | def2-universal-jkfit (default) | 195 | 0.036 / 0.11 | 0.084 / 0.17 |
  | generated (`GANSU2_AUTOAUX_DEFAULT=generate`) | 271 | 0.036 / 0.09 | 0.043 / 0.11 |
  | `-ag autoaux` | 249 | 0.084 / 0.29 | 0.036 / 0.12 |
  | `-ag ../auxiliary_basis/cc-pvdz-rifit.gbs` | 138 | 3.1 / 16 | 0.060 / 0.14 |

  def2-universal-jkfit is the best choice for HF / DFT. For correlated methods (MP2, CCSD, EOM, ...) the generated set or AutoAux halves the correlation error. The RI-fitting sets (`*-rifit`) are fitted for the correlation energy only: with them the RI-HF energy is off by 1–16 mEh, so do not use them with `eri_method` RI for the whole calculation.
* `GANSU2_AUTOAUX_DEFAULT=generate` generates the auxiliary set for every element; `GANSU2_DEFAULT_AUXILIARY_BASIS=<file>` replaces def2-universal-jkfit.

#### ecp_filename - Effective Core Potential file
* default: (empty)
* **Most basis-set files already embed their ECP** — if the `.gbs` passed to `-g` contains `XX-ECP` blocks (e.g. `lanl2dz.gbs` has Cl/Br/I, `def2-svp.gbs` has I/Ir/Pt), the ECP is loaded and applied automatically; no `--ecp_filename` is needed. Which elements get an ECP is basis-dependent (e.g. def2 uses ECPs only for Z ≥ 37, so Br stays all-electron in def2-SVP but I uses a 28-electron-core ECP).
* `--ecp_filename` (`-ecp`) loads an ECP from a separate file (Gaussian-style ECP blocks, as on the Basis Set Exchange). Use it when the basis `.gbs` has only orbital exponents.
* When an ECP is active, the listed elements' core electrons are replaced by a parameterized potential (`[ECP] N core electrons replaced ...` is printed) and the effective nuclear charge / electron count are reduced accordingly.
* Works with both Cartesian and spherical (`--use_spherical`) bases, for energy and gradient.

```bash
# ECP embedded in the basis (no --ecp_filename needed)
gansu2 -x ../xyz/HI.xyz -g def2-svp                    # I: 28-core ECP, all-electron H
gansu2 -x ../xyz/HI.xyz -g def2-svp --use_spherical 1  # same, spherical basis

# ECP from a separate file
gansu2 -x ../xyz/heavy_atom.xyz -g cc-pvdz --ecp_filename ../basis/cc-pvdz-pp.ecp
```

#### point_charges - External point charges
* default: (empty)
* A text file with one charge per line: `x y z q` (coordinates in Angstrom, charge in units of e).
* The charges enter the one-electron Hamiltonian and the nuclear repulsion. Energies and gradients are available for molecular RHF / UHF / ROHF / RKS.
* With `pcm_eps` the charges can also polarise the continuum (see `pcm_include_mm` on the [Advanced parameters](parameters_advanced.md#solvation) page).

## General parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| method | SCF method | string | RHF |
| verbose | Verbose mode | bool | false |

#### method - SCF method
* default:  RHF
* RHF - Restricted Hartree-Fock
* UHF - Unrestricted Hartree-Fock
* ROHF - Restricted Open-Shell Hartree-Fock
* RKS - Restricted Kohn-Sham (DFT); see [DFT parameters](#dft-parameters)
* UKS - Unrestricted Kohn-Sham (DFT)
* ROKS - Restricted Open-Shell Kohn-Sham (DFT)

#### verbose - Verbose mode
* default:  false
* true - Print additional information
* false - Do not print additional information

## Molecule parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| charge | Charge of the molecule | int | 0 |
| beta_to_alpha | Number of electrons moved from beta-spin to alpha-spin | int | 0 |
| use_spherical | Pure spherical-harmonic basis functions | bool | false |
| frozen_core | Frozen core orbitals in post-HF methods | string | none |

#### charge - Charge of the molecule
* default:  0
* Charge of the molecule (positive for cations, negative for anions)

#### beta_to_alpha - Number of shifted electrons from beta-spin to alpha-spin
* default:  0
* Number of electrons moved from beta-spin to alpha-spin (sets the spin multiplicity)

### How are the electrons assigned to the alpha and beta spins?
Given parameters:
* $Z$ - The total number of positive charges in the nucleus of atoms in the molecule (= number of protons)
* $c$ - The charge of the molecule
* $u$ - The number of shifted electrons from beta-spin to alpha-spin


The numbers of electrons (alpha- and beta-spin electrons)
* $N$ - The total number of electrons in the molecule
* $N_{\alpha}$ - The number of electrons with alpha spin
* $N_{\beta}$ - The number of electrons with beta spin

are calculated as follows:
* $N = Z - c$
* $N_{\alpha} = \left\lceil \frac{N}{2} \right\rceil + u$
* $N_{\beta} = \left\lfloor \frac{N}{2} \right\rfloor - u$

When the number of electrons is odd, the number of alpha-spin electrons is greater than the number of beta-spin electrons by one.
If any of the following conditions are met, an exception is thrown:
* $N < 1$ (no electrons in the molecule)
* $N_{\beta} < 0$ (the number of beta-spin electrons is negative)

#### use_spherical - Cartesian vs spherical-harmonic basis functions
* default: false (Cartesian)
* `false` — Cartesian Gaussians: 6 d-functions, 10 f-functions, 15 g-functions.
* `true` — pure spherical harmonics: 5 d-functions, 7 f-functions, 9 g-functions, in Molden m-ordering (e.g. d: 0, +1, −1, +2, −2). Use this to reproduce standard cc-pVnZ results from ORCA / PySCF / NWChem, which default to spherical functions for d and higher shells.
* s and p shells are the same in both representations.
* **Supported with `--use_spherical 1`:** RHF / UHF / ROHF energy (stored, RI, multi-GPU RI, Direct-RI); RI post-HF (MP2, SCS/SOS-MP2, CCSD, CIS, EOM, ADC(2), DLPNO, STEOM); THC; all initial guesses (core / gwh / sad / minao for RHF; core / gwh / sad for UHF/ROHF); ECP; analytical energy gradient and geometry optimization (stored and RI, single- and multi-GPU); analytical Hessian and vibrational frequencies; Molden export; Mulliken / dipole analysis; Kohn-Sham DFT (RKS / UKS / ROKS; energies, gradients and geometry optimization).
* **Cartesian-only (a clear error is raised under `--use_spherical 1`):** `eri_method` `direct` and `hash`. Run these in Cartesian (omit `--use_spherical`).

#### frozen_core - Frozen core orbitals
* default: none
* none (or 0) - All electrons are correlated
* auto - Freeze the chemical core of each atom (1s for Li–Ne, up to 2p for Na–Ar, up to 3p for K–Kr, up to 4p for Rb–Xe). For atoms with an ECP, only the core orbitals not already replaced by the ECP are frozen
* integer n - Freeze the n lowest occupied orbitals
* Applies to the post-HF methods; the SCF is unchanged. The number of frozen orbitals is printed.

## SCF parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| maxiter | Maximum number of SCF iterations | int | 100 |
| convergence_energy_threshold | Energy convergence threshold | double | 1.0e-10 |
| eri_method | Method for two-electron repulsion integrals | string | stored |
| initial_guess | Method for the initial guess | string | core |
| convergence_method | Method for convergence | string | DIIS |
| damping_factor | Damping factor | double | 0.9 |
| diis_size | Number of previous Fock matrices to store | int | 8 |
| density_in | Read a converged density to start the SCF | string | |
| density_out | Write the converged density | string | |

#### maxiter - Maximum number of SCF iterations
* default:  100
* Maximum number of SCF iterations to perform

#### convergence_energy_threshold - Energy convergence threshold
* default:  1.0e-10
* Energy convergence threshold for the SCF iterations (|ΔE| between iterations, Hartree).
* Post-HF energies depend on the orbitals to first order (the SCF energy only to second order), so a loose threshold shows up there first. Loosening it to 1.0e-6 saves a few SCF iterations but can shift correlation energies by about 1e-6 Hartree.
* Tighten it (1.0e-12 or below) for UHF gradients and excited-state gradients.

#### eri_method - Method for two-electron repulsion integrals
* default: stored
* stored - Two-electron repulsion integrals (ERIs) are computed once and stored in the device memory
* RI - Resolution of the Identity (RI) approximation; requires an auxiliary basis (`-ag`, or def2-universal-jkfit by default)
* Direct - Direct calculation of the ERIs in every iteration without storing them (Direct-SCF). For systems whose ERIs do not fit in memory
* Direct_RI - RI approximation with the three-center integrals computed on the fly instead of stored
* hash - ERIs above the screening threshold are stored in a compact (sparse) format (RHF, Cartesian basis)

Use `stored` for small and medium molecules, and `RI` (with a fitted auxiliary basis such as `cc-pvdz-rifit`)
for larger ones and for the RI-based post-HF methods.

#### initial_guess - Method for the initial guess
* default:  core
* core - Core Hamiltonian is used as the initial guess of the Fock matrix
* gwh - Generalized Wolfsberg-Helmholz method (GWH)
* sad - Superposition of Atomic Densities (SAD); recommended for molecules larger than H2
* minao - Minimal ANO (ANO-RCC-MB) projection initial guess (RHF)
* density - Start from a given density matrix (see `density_in`)

#### density_in / density_out - SCF restart
* default: (empty)
* `density_out` writes the converged total density to the given file after the SCF (before any post-HF step, so the file is kept even if the post-HF step is interrupted).
* `density_in` reads such a file and starts the SCF from it. The basis (number of basis functions) must match.
* Available for RHF and periodic RHF.

```bash
gansu2 -x mol.xyz -g cc-pvdz --density_out mol.dens
gansu2 -x mol.xyz -g cc-pvdz --density_in mol.dens --post_hf_method ccsd
```

#### convergence_method - Method for convergence
* default:  DIIS
* Damping - Damping method with constant damping factor
* OptimalDamping - Damping method with optimal damping factor (RHF, ROHF)
* DIIS - Direct Inversion of the Iterative Subspace (DIIS)
* SOSCF - Second-Order SCF (DIIS→SOSCF automatic switching, RHF)
* ADIIS - Augmented DIIS (RHF)
* EDIIS - Energy DIIS (RHF)
* AEDIIS - Automatic EDIIS→ADIIS→DIIS switching (RHF)

If DIIS does not converge, try `SOSCF`, `AEDIIS`, or a `sad` initial guess.

#### damping_factor - Damping factor
* default:  0.9
* Damping factor for the damping method (0 ≤ damping_factor ≤ 1)

#### diis_size - Number of previous Fock matrices to store
* default:  8
* Number of previous Fock matrices stored by the DIIS convergence algorithm

## Post-HF methods

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| post_hf_method | Post-Hartree-Fock method | string | none |
| tensor_path | Fast tensor-contraction path of the post-HF methods | string | auto |

#### post_hf_method - Post-Hartree-Fock method
* default: none

Method names are case-insensitive. Hyphen variants are accepted (`scs-mp2` ≡ `scs_mp2`, `adc2-x` ≡ `adc2x`, `dmet-ccsd(t)` ≡ `dmet_ccsd_t`, etc.).

##### Ground-state correlation methods

| Value | Description |
| --- | --- |
| none | No post-HF method applied (HF only) |
| FCI | Full Configuration Interaction. Exact within the basis. Cost grows factorially — only feasible for very small systems. With the MPI-enabled build launched under `mpirun` on more than one rank, the FCI vector is distributed across ranks/GPUs, so determinant spaces larger than one GPU's memory can be reached (see [Multi-node / multi-GPU Full-CI](usage_cli.md#multi-node--multi-gpu-full-ci)). On a UHF / ROHF reference (`-m uhf` / `-m rohf`, stored or RI integrals) the open-shell solver (single GPU) correlates every electron (the frozen core is ignored). |
| MP2 | Møller–Plesset perturbation theory of 2nd order. Spin-orbital form: $E_{\mathrm{MP2}} = \tfrac{1}{4}\sum_{ijab} \frac{\|\langle ij\|\|ab\rangle\|^2}{\varepsilon_i+\varepsilon_j-\varepsilon_a-\varepsilon_b}$ with antisymmetrized $\langle ij\|\|ab\rangle = (ia\|jb) - (ib\|ja)$. Closed-shell (RMP2) reduces to $\sum_{ijab}\frac{(ia\|jb)\,[2(ia\|jb)-(ib\|ja)]}{\varepsilon_i+\varepsilon_j-\varepsilon_a-\varepsilon_b}$. Splits into opposite-spin (OS) and same-spin (SS) components |
| SCS_MP2 | Spin-Component-Scaled MP2 (Grimme 2003). $E = c_{\mathrm{OS}} E_{\mathrm{OS}} + c_{\mathrm{SS}} E_{\mathrm{SS}}$ with $c_{\mathrm{OS}} = 6/5$, $c_{\mathrm{SS}} = 1/3$. More accurate than MP2 at the same cost |
| SOS_MP2 | Scaled Opposite-Spin MP2 (Jung & Head-Gordon 2004). Drops the same-spin term and rescales: $E = 1.3 \cdot E_{\mathrm{OS}}$. Omitting the same-spin term enables cheaper algorithms |
| LT_MP2 | Laplace-Transform MP2. Replaces the orbital-energy denominator with $\frac{1}{x} \approx \sum_k w_k e^{-t_k x}$, decoupling the occupied and virtual indices. Useful with RI. Aliases: `lt-mp2`, `laplace_mp2` |
| LT_SOS_MP2 | Laplace transform applied to SOS-MP2. $\mathcal{O}(N^4)$ scaling with RI. Aliases: `lt-sos-mp2`, `laplace_sos_mp2` |
| MP3 | MP3. Adds the 3rd-order doubles correction over MP2. $\mathcal{O}(N^6)$ |
| MP4 | MP4 (full: SDQ + (T) contributions). $\mathcal{O}(N^7)$ |
| CC2 | Coupled-Cluster with approximate doubles. Doubles are kept at MP1 quality but coupled iteratively to singles. $\mathcal{O}(N^5)$ |
| CCSD | Coupled-Cluster with Singles and Doubles. $\mathcal{O}(N^6)$. Iterative |
| CCSD_T | CCSD(T) — CCSD plus perturbative triples evaluated once at the converged CCSD amplitudes. The "gold standard" for ground-state correlation. $\mathcal{O}(N^7)$ for the (T) step |
| CCSD_DENSITY | CCSD + Λ-equation solve + 1-RDM construction, for natural-orbital / property analysis. Same energy as CCSD; adds the Λ + 1-RDM cost |
| DMET_CCSD | Density Matrix Embedding Theory with CCSD as the impurity solver. Automatic fragmentation by X–H bonds (or `dmet_fragments`). Alias: `dmet`. See [DMET parameters](#dmet-ccsd-parameters) |
| DMET_CCSD_T | DMET-CCSD plus per-fragment perturbative triples evaluated at the converged $\mu_{\mathrm{DMET}}$. Aliases: `dmet-ccsd_t`, `dmet_ccsd(t)`, `dmet-ccsd(t)`, `dmet_ccsdt` |
| DLPNO_MP2 | Domain-based Local Pair Natural Orbital MP2. RHF or UHF reference; requires RI. Alias: `dlpno-mp2` |
| DLPNO_CCSD | Domain-based Local Pair Natural Orbital CCSD (Riplinger & Neese 2013, 2016); requires RI. Aliases: `dlpno-ccsd`, `dlpno`. See [DLPNO parameters](#dlpno-ccsd--dlpno-ccsdt-parameters) |
| DLPNO_CCSD_T | DLPNO-CCSD plus perturbative triples evaluated on per-triple TNO bases. Aliases: `dlpno-ccsd_t`, `dlpno_ccsd(t)`, `dlpno-ccsd(t)`, `dlpno_ccsdt` |
| CASSCF | Complete Active Space SCF: full CI in an active space, with the orbitals optimized (two-step). RHF, UHF or ROHF reference; `eri_method` stored, ri or direct; one state or a state average. GPU only, command line only (not in the Python / C API). See [CASSCF parameters](#casscf-parameters) |

##### Excited-state methods

| Value | Description |
| --- | --- |
| CIS | Configuration Interaction Singles. Diagonalizes $\langle\Phi_i^a\|H-E_0\|\Phi_j^b\rangle$. Lowest-cost excited-state method ($\mathcal{O}(N^4)$); generally over-estimates excitation energies by ~1 eV. With `cis_d` the CIS(D) correction is added |
| TDA | Linear-response TDDFT in the Tamm-Dancoff approximation on an RKS reference (`--method rks`) or a UKS reference (`--method uks`: the α / β blocks with the stored integrals, small and medium molecules). LDA, GGA and global hybrids; singlets and triplets on RKS, the spin-conserving states on UKS; Cartesian or spherical basis. On an RHF reference it is CIS. Alias: `tddft_tda` |
| TDDFT | Linear-response TDDFT (full RPA, $(A-B)(A+B)$ form) on an RKS or UKS reference; time-dependent Hartree-Fock (TDHF) on an RHF or UHF reference. Singlets and triplets (`--spin_type triplet`), Cartesian or spherical basis. Aliases: `rpa`, `tdhf`. With `--eri_method ri -ag <aux>` (TDA and TDDFT) the response integrals come from the SCF's RI-J tensor, so large molecules fit; for hybrids the response exchange is then fitted too (a JK fitting set such as cc-pvdz-jkfit; ~1e-5 Eh against the exact integrals). Gradients and optimizations: pure functionals stay on RI (the RI-J derivatives, no four-index arrays); hybrids stay on RI with `--dft_k_backend ri` (the SCF exchange is then RI-K as well; naphthalene / cc-pVDZ B3LYP in 90 s and 2.6 GB on a DGX Spark), otherwise they use the exact integrals |
| ADC2 | Algebraic Diagrammatic Construction of 2nd order, strict variant ADC(2)-s. M22 (doubles–doubles block) is purely diagonal: $D_2 = \varepsilon_a + \varepsilon_b - \varepsilon_i - \varepsilon_j$ |
| SOS_ADC2 | Scaled-opposite-spin ADC(2)-s (Krauter, Pernpointner, Dreuw, JCP 138, 044107 (2013); the Q-Chem SOSADC(2) model). Same-spin terms dropped and the opposite-spin terms scaled (`adc_c_t`, `adc_c_c` on the [Advanced parameters](parameters_advanced.md#excited-states) page). Requires RI; single- and multi-GPU. Aliases: `sos-adc2`, `sos_adc(2)` |
| LT_SOS_ADC2 | `SOS_ADC2` with Laplace-transformed doubles denominators, $\mathcal{O}(N^4)$ per iteration with RI; same energies as `SOS_ADC2` at lower cost. Aliases: `lt-sos-adc2`, `lt_sos_adc(2)` |
| ADC2X | ADC(2) extended (`adc(2)-x`). M22 includes first-order off-diagonal terms (oooo, vvvv, voov), giving lower excitation energies than ADC(2)-s. Aliases: `adc2-x`, `adc(2)-x` |
| EOM_MP2 | Equation-of-Motion MP2 (≈ ADC(2) but Stanton–Bartlett style). M22 has off-diagonal couplings via T2 |
| EOM_CC2 | Equation-of-Motion CC2. Doubles kept at CC2 quality |
| EOM_CCSD | Equation-of-Motion CCSD. Most accurate single-reference excited-state method available here |
| IP_EOM_CCSD | Ionization-Potential EOM-CCSD — $(N-1)$-electron ionized states on top of the CCSD reference (ionization potentials / cationic states). RHF closed-shell (and UHF / ROHF references); stored or RI. Aliases: `ip-eom-ccsd`, `ipeom_ccsd`, `ipeom-ccsd` |
| EA_EOM_CCSD | Electron-Affinity EOM-CCSD — $(N+1)$-electron attached states (electron affinities / anionic states). RHF closed-shell (and UHF / ROHF references); stored or RI. Aliases: `ea-eom-ccsd`, `eaeom_ccsd`, `eaeom-ccsd` |
| STEOM_CCSD | Similarity-Transformed EOM-CCSD (Nooijen–Bartlett). Diagonalizes the doubly similarity-transformed Hamiltonian in the singles space, capturing double excitations at singles cost. **Automatically runs CIS-NTO + IP-EOM-CCSD + EA-EOM-CCSD as prerequisites.** RHF closed-shell only. Aliases: `steom-ccsd`, `steomccsd` |
| DLPNO_STEOM_CCSD | STEOM-CCSD on a DLPNO-CCSD ground state. RHF closed-shell; **requires RI**. Aliases: `dlpno-steom-ccsd`, `dlpno_steom`, `dlpnosteom` |
| CIS_NTO | State-averaged CIS with a natural-transition-orbital (NTO) active space. Primarily the STEOM prerequisite; can also be run standalone. Alias: `cis-nto` |

With a UHF reference, MP2, SCS/SOS-MP2, MP3, CCSD, CCSD(T), CIS and EOM-CCSD (EE / IP / EA) are available; with an
ROHF reference, CCSD, CCSD(T) and EOM-CCSD (EE / IP / EA). The other methods take an RHF reference.

For excited-state methods, see the [Excited state parameters](#excited-state-parameters) section.

#### tensor_path - Fast tensor-contraction path
* default: auto
* auto - on for GPUs, off for `--cpu`.
* on - The post-HF methods that have it (CC2, CCSD, (T), EOM-CCSD / CC2 / MP2, IP / EA-EOM-CCSD, ADC(2)-x, MP2 / CCSD gradients) use the fast tensor-contraction path. It is usually much faster and gives the same results, but needs more GPU memory.
* off - The standard path. Use it when a calculation runs out of GPU memory.
* Large calculations whose integrals do not fit on the GPU use the standard path automatically.

## CASSCF parameters

CASSCF runs after the SCF with `--post_hf_method casscf` and needs `--casscf_active`. `--casscf_help` lists the
options (`--casscf_help advanced` also the solver options). The same names can be used in a parameter recipe file.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| casscf_active | Active space: `<n>e,<m>o` (n electrons in m orbitals around the Fermi level, by orbital energy) or 0-based orbital numbers (`26,30-36`) | string | |
| casscf_roots | Number of CI roots | int | 1 |
| casscf_target_root | Root to optimize (from 0) in a state-specific run | int | 0 |
| casscf_objective | `SS` (one state) or `SA` (average of the roots) | string | SS |
| casscf_weights | Weights of a state average: `uniform` or one comma-separated weight per root (sum 1) | string | uniform |
| casscf_multiplicity | Spin multiplicity of the CI states, or `any` | string | that of the reference |
| casscf_maxiter | Maximum macro iterations | int | 50 |
| casscf_convergence_energy_threshold | Energy change at convergence (Hartree) | double | 1.0e-10 |
| casscf_convergence_gradient_threshold | Orbital gradient at convergence | double | 1.0e-6 |

* The reference is RHF, UHF or ROHF; `eri_method` is stored, ri or direct (`direct` keeps no AO integrals, so it
  reaches sizes that do not fit in `stored` without the RI approximation). Other integral methods are not supported.
* CASSCF is GPU only and runs from the command line only; it is not available in the Python or C API.
* With `<n>e,<m>o` the active orbitals are picked by orbital energy. Where orbitals are (nearly) degenerate, the
  calculation can end in a different local solution from another program; give the orbital numbers to fix the
  active space (for example, the six π orbitals of benzene).
* The log prints the active space as a `replay:` line that reproduces the same selection.

## DFT parameters

Kohn-Sham density functional theory is selected with `--method rks` (closed shell), `--method uks`
(unrestricted) or `--method roks` (restricted open shell). The SCF options (initial guess, convergence method,
thresholds) apply as for Hartree-Fock. Analytic gradients (`-r gradient` / `optimize`) are available for RKS, UKS
and ROKS with every functional below, in Cartesian or spherical basis (the grid response, i.e. the derivatives of the grid points and of the Becke weights, is included as PySCF's `grid_response=True`, so the gradient is that of the energy on the same grid; the TDA / TDDFT excited-state gradients (RKS and UKS) include it too; SG-1 grids leave it out; `GANSU2_DFT_GRID_RESPONSE=0` turns it off).

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| functional | Exchange-correlation functional: `svwn5` (LDA; aliases `lda`, `svwn`), `pbe`, `blyp` (GGA), `scan` (meta-GGA), `b3lyp`, `b3lyp5`, `pbe0` (hybrid) | string | svwn5 |
| grid_level | Grid density 0–9 (same level table as PySCF) | int | 1 |

Grid scheme and the J / $V_{xc}$ build algorithms are on the [Advanced parameters](parameters_advanced.md#dft) page.

#### functional - Exchange-correlation functional
* default: svwn5
* svwn5 - Slater exchange + VWN5 correlation (LDA)
* pbe - Perdew-Burke-Ernzerhof exchange and correlation (GGA)
* blyp - Becke 88 exchange + LYP correlation (GGA)
* scan - SCAN meta-GGA (exchange and correlation). SCAN potentials are stiff: converge the SCF to 1e-13 for gradients
* b3lyp - B3LYP hybrid: 0.08 Slater + 0.72 B88 + 0.20 HF exchange, 0.19 VWN-RPA + 0.81 LYP correlation (the original definition, as in Gaussian)
* b3lyp5 - B3LYP with VWN5 instead of VWN-RPA (the B3LYP of ORCA / Turbomole)
* pbe0 - PBE0 hybrid: 0.75 PBE + 0.25 HF exchange, PBE correlation
* Hybrids add the exact exchange computed from the same density. With UKS, hybrids need the stored two-electron integrals to fit in GPU memory.

#### grid_level - Molecular integration grid
* default: 1
* The grid is a Becke-partitioned atom-centred grid with NWChem-style angular pruning, using the same radial/angular level table as PySCF. `grid_level` therefore has the same meaning as PySCF's `grids.level`, and energies can be compared directly at the same level (PySCF's default is level 3).
* Typical sizes: water level 1 ≈ 10k points, level 3 ≈ 34k; benzene level 1 ≈ 46k, level 3 ≈ 144k.
* Raise the level for accurate energies and gradients; level 3 is a common choice.

#### RI-J
With `--eri_method ri` the Coulomb matrix is built with the RI approximation and an auxiliary basis (`-ag`). With an
MP2-fit auxiliary basis (`*-rifit.gbs`) the RI-J error in the absolute energy is large (several mEh for benzene); use
a JK-fit auxiliary basis when the absolute energy matters.

#### dft_k_backend - Exact exchange of hybrid functionals
* default: exact
* exact - the exact exchange from the four-index integrals (stored when they fit, else direct), also with RI-J
* ri - RI-K with the auxiliary basis of RI-J (needs `--eri_method ri` / `--dft_j_backend ri_j`; use a JK-fit set). The energy changes by the RI-K error (about 1e-5 Eh for water / cc-pVDZ with cc-pvdz-jkfit); gradients, and TDA / TDDFT gradients, then need no four-index arrays

#### Examples
```bash
# PBE / cc-pVDZ on a level-3 grid
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --method rks --functional pbe --grid_level 3

# LDA with RI-J (auxiliary basis required)
gansu2 -x ../xyz/Benzene.xyz -g 6-31g_st --method rks --functional svwn5 --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs

# Open-shell B3LYP
gansu2 -x ../xyz/O2.xyz -g cc-pvdz --method uks --functional b3lyp --beta_to_alpha 1
```

## Excited state parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| n_excited_states | Number of excited states to compute | int | 5 |
| spin_type | Spin type for excited states | string | singlet |
| grad_root | Excited state whose gradient is computed | int | 1 |
| cis_d | CIS(D) corrections | bool | false |

These parameters are used when `post_hf_method` is set to an excited-state method (CIS, ADC2, ADC2X, EOM_MP2, EOM_CC2, EOM_CCSD, ...).
Solver choices and convergence thresholds are on the [Advanced parameters](parameters_advanced.md#excited-states) page.

#### n_excited_states - Number of excited states to compute
* default: 5
* Number of lowest excited states to compute. Must not exceed the singles dimension (nocc × nvir).
* To reach a particular high-lying state, request enough states that it is among the lowest `n_excited_states`.

#### spin_type - Spin type for excited states
* default: singlet
* singlet - Compute singlet excited states (default). Oscillator strengths are computed.
* triplet - Compute triplet excited states. Oscillator strengths are zero (spin-forbidden electric dipole transitions from the singlet ground state).
* Triplets are supported for CIS, TDA, TDDFT, ADC2, ADC2X, EOM_CCSD, EOM_CC2, EOM_MP2 (GPU only for the EOM methods), SOS_ADC2 / LT_SOS_ADC2 and STEOM-CCSD.

#### grad_root - Excited-state gradient
* default: 1
* With an excited-state method and `-r gradient` (or `optimize`), the gradient of state `grad_root` is computed (1 = lowest excited state).
* Available for CIS (RHF reference, singlet or triplet; UHF reference) ADC(2) (RHF reference: singlets with `--eri_method stored` or `ri`, triplets with `stored`; UHF reference with `stored` or `ri`; GPU) SOS-ADC(2) (RHF reference, singlet or triplet, `--eri_method ri`, GPU; small and medium molecules) and TDA / TDDFT (on an RKS reference: TDDFT in the Tamm-Dancoff approximation or the full response; on a UKS reference likewise, and TDHF on a UHF reference, with the stored integrals; on an RHF reference: CIS or TDHF with `--eri_method stored`. Singlets and triplets, Cartesian or spherical basis, frozen core, LDA / GGA / global hybrids, GPU; with the grid response (grid points and Becke weights) as the ground-state Kohn-Sham gradient, GANSU2_DFT_GRID_RESPONSE=0 leaves it out) and EOM-CC2 (RHF reference, singlets or triplets (triplets in the spin-orbital form, as EOM-CCSD: benzene / cc-pVDZ in about 20 minutes); UHF reference, the spin-conserving states (the CC2 ground state likewise); `--eri_method stored` or `ri`, GPU; the differentiated energy is E(CC2) + omega; benzene / cc-pVDZ in about 3 minutes on a DGX Spark) and EOM-CCSD (RHF reference, singlets or triplets, `--eri_method stored` or `ri`; UHF reference, the spin-conserving EOM-EE-UCCSD states with `--eri_method stored` or `ri`; ROHF reference, likewise on the semicanonical orbitals with `stored` or `ri`; Cartesian or spherical basis, GPU; E(CCSD) + omega; singlets in the RHF form with the memory of the CCSD gradient (benzene / cc-pVDZ in about 5 minutes on a DGX Spark), triplets in the spin-orbital form stored as α/β spin blocks (benzene / cc-pVDZ in about 20 minutes and 28 GB on a DGX Spark)). Excited-state gradients are sensitive to the SCF convergence; tighten `convergence_energy_threshold` (e.g. 1e-14).
* With `-r optimize`, the state is followed from step to step: the root optimized is the one whose transition density overlaps most with that of the state at the previous geometry, so the optimization stays on the same state when the roots change order (`opt_follow_root 0` keeps the root number instead). Changes of root and overlaps below 0.5 are reported; only the `n_excited_states` lowest roots are searched.

```bash
gansu2 -x h2o.xyz -g cc-pvdz --post_hf_method cis -r gradient --grad_root 2
```

#### cis_d - CIS(D) corrections
* default: false
* true - Add the perturbative doubles correction CIS(D) to the CIS excitation energies (RI, singlets).

#### ADC(2)-s vs ADC(2)-x

ADC(2) has two variants:

| | ADC(2)-s (`adc2`) | ADC(2)-x (`adc2x`) |
|---|---|---|
| M11 (singles) | CIS + ISR + self-energy | Same as ADC(2)-s |
| M12, M21 (coupling) | Coupling blocks | Same as ADC(2)-s |
| M22 (doubles) | Diagonal only: D2 = ε_a+ε_b−ε_i−ε_j | D2 + first-order off-diagonal terms (oooo, vvvv, voov) |

ADC(2)-x includes explicit electron correlation in the doubles space, generally giving lower excitation energies than ADC(2)-s.

```bash
# CIS with 10 excited states
gansu2 -x ../xyz/H2O.xyz -g sto-3g --post_hf_method cis --n_excited_states 10

# ADC(2)
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2

# ADC(2)-x (extended)
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2x

# Triplet excited states
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method cis --spin_type triplet
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2 --spin_type triplet
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_ccsd --spin_type triplet

# EOM-MP2 / EOM-CC2 / EOM-CCSD
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_mp2
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_cc2
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_ccsd
```

## Geometry optimization parameters

| Parameter | Short | Description | Type | Default |
| --- | --- | --- | --- | --- |
| run_type | -r | Type of calculation | string | energy |
| optimizer | | Optimization algorithm | string | bfgs |
| opt_max_iter | | Maximum number of optimization steps | int | 200 |
| opt_grad_threshold | | Convergence: max gradient component (Hartree/Bohr) | double | 3.0e-4 |
| opt_rms_grad_threshold | | Convergence: RMS gradient (Hartree/Bohr) | double | 2.0e-4 |
| opt_energy_threshold | | Convergence: energy change (Hartree) | double | 1.0e-6 |
| opt_disp_threshold | | Convergence: max displacement (Bohr) | double | 3.0e-4 |
| opt_step_max | | Trust-region radius (Bohr) | double | 0.3 |
| opt_follow_root | | Excited-state optimization: follow the state by transition-density overlap (1) or keep the root number `grad_root` (0) | int | 1 |

#### run_type - Type of calculation to perform

* default: energy
* energy - Single-point energy calculation only
* gradient - Single-point energy calculation followed by analytical energy gradient evaluation
* optimize - Geometry optimization using analytical energy gradients (BFGS by default)
* hessian - Single-point energy followed by analytical Hessian and harmonic vibrational frequencies (mass-weighted normal modes, IR intensities). Translational/rotational modes are projected out

Gradients are available for HF, Kohn-Sham DFT, and for the post-HF methods MP2, SCS-MP2, SOS-MP2, CCSD,
CCSD(T), CIS, ADC(2) and SOS-ADC(2)
(see [Energy Gradient](usage_cli.md#5-energy-gradient)). Other post-HF methods stop with an error rather than
returning the HF gradient.

```bash
# Single-point energy (default)
gansu2 -x ../xyz/H2O.xyz -g sto-3g

# Energy gradient
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r gradient

# Geometry optimization
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r optimize

# Analytical Hessian + vibrational frequencies
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r hessian
```

#### optimizer - Optimization algorithm for geometry optimization

* default: bfgs

This parameter is used only when `run_type` is set to `optimize`.

##### Quasi-Newton methods

Quasi-Newton methods build and update an approximate inverse Hessian matrix $H^{-1}$ to determine the search direction $\mathbf{p} = -H^{-1} \mathbf{g}$.
All quasi-Newton methods use Armijo backtracking line search with a trust radius.

| Value | Algorithm | Hessian update formula |
| --- | --- | --- |
| bfgs | Broyden-Fletcher-Goldfarb-Shanno | $H'^{-1} = H^{-1} + \frac{(\mathbf{s}^T \mathbf{y} + \mathbf{y}^T H^{-1} \mathbf{y})}{(\mathbf{s}^T \mathbf{y})^2} \mathbf{s}\mathbf{s}^T - \frac{H^{-1}\mathbf{y}\mathbf{s}^T + \mathbf{s}\mathbf{y}^T H^{-1}}{\mathbf{s}^T \mathbf{y}}$ |
| dfp | Davidon-Fletcher-Powell | $H'^{-1} = H^{-1} + \frac{\mathbf{s}\mathbf{s}^T}{\mathbf{y}^T\mathbf{s}} - \frac{H^{-1}\mathbf{y}\mathbf{y}^T H^{-1}}{\mathbf{y}^T H^{-1}\mathbf{y}}$ |
| sr1 | Symmetric Rank-1 | $H'^{-1} = H^{-1} + \frac{(\mathbf{s}-H^{-1}\mathbf{y})(\mathbf{s}-H^{-1}\mathbf{y})^T}{(\mathbf{s}-H^{-1}\mathbf{y})^T\mathbf{y}}$ |

where $\mathbf{s} = \mathbf{x}_{k+1} - \mathbf{x}_k$ (position change) and $\mathbf{y} = \mathbf{g}_{k+1} - \mathbf{g}_k$ (gradient change).

* **BFGS** is the most robust and widely used method. Maintains positive definiteness of the Hessian.
* **DFP** is the dual of BFGS. Updates the Hessian directly rather than the inverse. Generally less robust than BFGS.
* **SR1** can capture negative curvature in the Hessian, which may be useful for transition state searches. Does not guarantee positive definiteness.

The Hessian update is skipped when the curvature condition is not met ($\mathbf{s}^T\mathbf{y} \le 10^{-10}$ for BFGS/DFP, or $|(\mathbf{s}-H^{-1}\mathbf{y})^T\mathbf{y}| < 10^{-8} \|\mathbf{y}\| \|\mathbf{s}-H^{-1}\mathbf{y}\|$ for SR1).

##### Newton-Raphson

| Value | Algorithm |
| --- | --- |
| newton | Newton-Raphson with the analytical Hessian |

##### Conjugate gradient methods

Conjugate gradient methods determine the search direction as $\mathbf{d}_k = -\mathbf{g}_k + \beta_k \mathbf{d}_{k-1}$, where $\beta_k$ is the conjugate gradient coefficient.
These methods do not require storage of an $N \times N$ Hessian matrix, making them memory-efficient for large systems.
All CG methods use Armijo backtracking line search with a trust radius.

| Value | Algorithm | $\beta_k$ |
| --- | --- | --- |
| cg-fr | Fletcher-Reeves | $\beta_k = \frac{\|\mathbf{g}_{k+1}\|^2}{\|\mathbf{g}_k\|^2}$ |
| cg-pr | Polak-Ribière | $\beta_k = \frac{\mathbf{g}_{k+1}^T(\mathbf{g}_{k+1} - \mathbf{g}_k)}{\|\mathbf{g}_k\|^2}$ |
| cg-hs | Hestenes-Stiefel | $\beta_k = \frac{\mathbf{g}_{k+1}^T(\mathbf{g}_{k+1} - \mathbf{g}_k)}{\mathbf{d}_k^T(\mathbf{g}_{k+1} - \mathbf{g}_k)}$ |
| cg-dy | Dai-Yuan | $\beta_k = \frac{\|\mathbf{g}_{k+1}\|^2}{\mathbf{d}_k^T(\mathbf{g}_{k+1} - \mathbf{g}_k)}$ |

Automatic restart: When $\beta_k < 0$, the method restarts with steepest descent ($\beta_k = 0$).
Descent check: If $\mathbf{g}_k^T \mathbf{d}_k \ge 0$ (not a descent direction), the search direction is reset to $-\mathbf{g}_k$.

##### GDIIS (Geometry Direct Inversion in the Iterative Subspace)

| Value | Algorithm |
| --- | --- |
| gdiis | GDIIS |

GDIIS combines quasi-Newton steps with DIIS extrapolation. It maintains a BFGS inverse Hessian and a subspace of recent geometries and error vectors.
At each step, the error vector $\mathbf{e}_i = -H^{-1}\mathbf{g}_i$ is computed and the DIIS equation

```math
\min_{\mathbf{c}} \sum_{ij} c_i B_{ij} c_j \quad \text{subject to} \quad \sum_i c_i = 1
```

is solved, where $B_{ij} = \mathbf{e}_i \cdot \mathbf{e}_j$. The new geometry is obtained as $\mathbf{x}_{\mathrm{new}} = \sum_i c_i (\mathbf{x}_i + \mathbf{e}_i)$.

GDIIS does not use line search (the step is directly accepted). The maximum subspace size is 6.

##### Steepest descent

| Value | Algorithm |
| --- | --- |
| sd | Steepest Descent |

The search direction is simply $\mathbf{p} = -\mathbf{g}$. Uses Armijo backtracking line search with a trust radius. Convergence is slow due to zigzag behavior.

### Convergence criteria

The geometry optimization uses four convergence criteria:

| Criterion | Parameter | Default | Description |
| --- | --- | --- | --- |
| Max gradient | `opt_grad_threshold` | $3.0 \times 10^{-4}$ Hartree/Bohr | Maximum gradient component |
| RMS gradient | `opt_rms_grad_threshold` | $2.0 \times 10^{-4}$ Hartree/Bohr | Root mean square of gradient |
| Energy change | `opt_energy_threshold` | $1.0 \times 10^{-6}$ Hartree | Absolute energy change between steps |
| Max displacement | `opt_disp_threshold` | $3.0 \times 10^{-4}$ Bohr | Maximum atomic displacement |

Convergence is declared when **both** gradient criteria (max and RMS) are satisfied, **or** when both energy change and max displacement criteria are satisfied.
The maximum number of optimization steps is `opt_max_iter` (200) and the trust radius is `opt_step_max` (0.3 Bohr).
Each SCF after the first starts from the density converged at the previous geometry. For excited states (CIS, ADC(2)) and open-shell post-HF energies the SCF threshold `convergence_energy_threshold` is tightened to 1e-12 during the optimization (the excitation energy is first order in the orbital error), and a trial step whose SCF does not converge is treated as a failed line-search step.

At each optimization step, the translational and rotational components are projected out from the gradient and the search direction (6 degrees of freedom, or 5 for linear molecules).
During `optimize`, the per-step SCF output is suppressed.

```bash
# Geometry optimization with BFGS (default)
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r optimize

# Geometry optimization with Polak-Ribière conjugate gradient
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r optimize --optimizer cg-pr

# Geometry optimization with GDIIS
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r optimize --optimizer gdiis

# UHF geometry optimization with SAD initial guess
gansu2 -x ../xyz/O2.xyz -g sto-3g -m UHF --initial_guess sad -r optimize
```

## Analysis and output parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| mulliken | Mulliken population analysis | bool | false |
| mayer | Mayer bond order analysis | bool | false |
| wiberg | Wiberg bond order analysis | bool | false |
| export_molden | Write canonical MOs to `output.molden` | bool | false |
| export_lmo_molden | Write localized occupied MOs to `output_lmo.molden` | bool | false |

#### mulliken - Perform Mulliken population analysis
* default:  false
* true - Perform Mulliken population analysis after the SCF calculation

#### mayer - Perform Mayer bond order analysis
* default:  false
* true - Perform Mayer bond order analysis after the SCF calculation

#### wiberg - Perform Wiberg bond order analysis
* default:  false
* true - Perform Wiberg bond order analysis after the SCF calculation

#### export_molden - Export Molden file
* default:  false
* true - Export Molden file after the SCF calculation (output filename: output.molden)

#### export_lmo_molden - Export Pipek-Mezey localized occupied orbitals
* default:  false
* true - Localize occupied MOs via Pipek-Mezey and write them to `output_lmo.molden`. The occupied block contains the LMOs; the virtual block keeps the canonical orbitals. For UHF, α and β are localized independently. For ROHF, doubly-occupied and singly-occupied subspaces are localized separately so closed-shell core and open-shell electrons do not mix. The orbital energy written for each LMO is the diagonal Fock matrix element in the LMO basis.

Compatible Molden viewers: [MOrbVis](https://yasuaki-ito.github.io/morbvis/), [Avogadro](https://avogadro.cc/), Jmol, VMD, [Pegamoid](https://github.com/Jellby/Pegamoid).

```bash
gansu2 -x ../xyz/Benzene.xyz -g cc-pvdz --export_molden 1 --export_lmo_molden 1
```

## Solvation parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| pcm_eps | C-PCM dielectric constant; 0 = no continuum | double | 0 |

#### pcm_eps - Continuum solvation (C-PCM)
* default: 0 (gas phase)
* A positive value turns on the conductor-like polarizable continuum model with that dielectric constant (e.g. 78.3553 for water). The ground-state reaction field is included in the SCF (Cartesian or spherical basis).
* Cavity resolution and coupling to point charges are on the [Advanced parameters](parameters_advanced.md#solvation) page.

```bash
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --pcm_eps 78.3553
```

## DMET-CCSD parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| dmet_fragments | Fragment specification (e.g. `"{0,6} {1,7}"`); empty = auto-detect by X-H bonds | string | "" |

DMET-CCSD partitions the molecule into atom-localized fragments, builds a Schmidt-decomposed embedding cluster (fragment AOs + bath orbitals) for each, and solves CCSD on each cluster independently. A global chemical potential μ is adjusted so that the fragment electron numbers add up to the total number of electrons. Equivalent fragments are detected and computed only once. Fragments can be distributed across GPUs (`num_gpus`).

For DMET-CCSD(T), pass `--post_hf_method dmet_ccsd_t` (or `dmet-ccsd_t`, `dmet_ccsdt`, `dmet_ccsd(t)`). The (T) correction is computed per fragment at the converged μ_DMET and summed across fragments.

Bath threshold and μ convergence options are on the [Advanced parameters](parameters_advanced.md#dmet) page.

#### dmet_fragments - Fragment specification
Empty string (default) triggers automatic detection: each heavy atom becomes a fragment, and each hydrogen joins its nearest heavy-atom fragment within 2.6 Bohr (≈ 1.38 Å). For example, benzene (C6H6) auto-detects 6 CH fragments.

Manual specification uses brace notation, atoms 0-indexed:
```bash
# 6 CH pairs in benzene (atoms C0/H6, C1/H7, ...)
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --post_hf_method dmet \
    --dmet_fragments "{0,6} {1,7} {2,8} {3,9} {4,10} {5,11}"
```

```bash
# Auto fragment detection
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet --num_gpus 4

# DMET-CCSD(T) — adds perturbative triples per fragment at μ_DMET
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet_ccsd_t --num_gpus 4

# Vayesta-compatible loose tolerance for benchmarking (dmet_n_tol: advanced)
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet --dmet_n_tol 4.2e-3
```

## DLPNO-CCSD / DLPNO-CCSD(T) parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| dlpno_preset | Truncation preset (`loose`, `normal`, `tight`, `very_tight`) — sets all `t_cut_*` cutoffs | string | normal |

DLPNO-CCSD and DLPNO-CCSD(T) (Riplinger, Neese, Pinski, Sandhoefer 2013/2016) achieve near-canonical CCSD(T) accuracy at near-linear scaling by exploiting four nested locality layers: (1) occupied LMOs (Pipek-Mezey), (2) projected atomic orbitals (PAO) + per-LMO atom domains, (3) per-pair PNO truncation, and (4) strong/weak-pair partitioning where weak pairs are reduced to MP2. The singles are coupled to the doubles, and the PNO truncation correction (ΔE_PNO) is added.

* The RI back-end (`--eri_method ri` plus an `-ag <aux>`) is required.
* RHF is the main reference. DLPNO-MP2 also runs on a UHF reference, and DLPNO-CCSD / DLPNO-CCSD(T) on UHF and ROHF references (`-m uhf` / `-m rohf`). On open-shell references DLPNO-CCSD is intended for small molecules: memory and time are those of canonical UCCSD. DLPNO-MP2 on ROHF is not available.
* On very large systems where the singles terms would not fit in memory, the run falls back to DLPNO-CCD and prints a warning.

### dlpno_preset — preset values

The presets use ORCA-compatible threshold values (LoosePNO / NormalPNO / TightPNO / VeryTightPNO):

| Preset | t_cut_pno | t_cut_pairs | t_cut_mkn | t_cut_triples | t_cut_tno |
| --- | --- | --- | --- | --- | --- |
| loose      | 1.0e-6   | 1.0e-3 | 1.0e-3 | 1.0e-6 | 1.0e-9  |
| normal     | 3.33e-7  | 1.0e-4 | 1.0e-3 | 1.0e-7 | 1.0e-9  |
| tight      | 1.0e-7   | 1.0e-5 | 1.0e-3 | 1.0e-8 | 1.0e-10 |
| very_tight | 1.0e-8   | 1.0e-6 | 1.0e-4 | 1.0e-9 | 1.0e-10 |

Tighter presets approach canonical CCSD(T) at higher cost. The individual `dlpno_t_cut_*` parameters on the
[Advanced parameters](parameters_advanced.md#dlpno) page override the preset when set to a non-negative value.

### Examples

```bash
# DLPNO-CCSD on water hexamer (normal preset)
gansu2 -x ../xyz/large_molecular/water_hexamer.xyz -g cc-pvdz \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dlpno_ccsd --dlpno_preset normal --num_gpus 8

# DLPNO-CCSD(T) with tight preset for benchmarking
gansu2 -x ../xyz/large_molecular/water_hexamer.xyz -g cc-pvdz \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dlpno_ccsd_t --dlpno_preset tight --num_gpus 8

# Export Pipek-Mezey localized orbitals for visualization
gansu2 -x ../xyz/Benzene.xyz -g cc-pvdz --export_lmo_molden 1
```

## Periodic system parameters

An XYZ file with an ASE-style `Lattice="..."` header runs a periodic calculation (see
[Periodic Systems](usage_cli.md#periodic-systems-pbc)). Without `pbc_kmesh` the calculation is done at the
Gamma point (`-m rhf`, `uhf`, `rohf`, `rks`, `uks`).

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| pbc_kmesh | Monkhorst-Pack k-mesh `n1,n2,n3` (Gamma-centred) | string | 1,1,1 |
| pbc_xc | Method on a k-mesh: `hf`, `pbe`, `hse06` | string | (hf for `-m rhf`) |
| pbc_band_path | k-path for a band structure: fractional vertices separated by spaces | string | |
| pbc_band_points | k-points per band-path segment | int | 41 |

Lattice-sum cutoffs and integral back-ends are on the [Advanced parameters](parameters_advanced.md#periodic-systems) page.

#### pbc_kmesh / pbc_xc - k-point calculations
* `pbc_kmesh` other than `1,1,1` runs the closed-shell calculation on that Monkhorst-Pack mesh: Hartree-Fock with `pbc_xc hf` (the default for `-m rhf`), Kohn-Sham with `pbc_xc pbe` or `hse06`.
* An n-point mesh on the primitive cell is equivalent to the n-cell Gamma-point supercell (no finite-size exchange correction is applied at either).
* Post-HF methods and gradients are not available on a k-mesh.

```bash
gansu2 -x chain.xyz -g sto-3g --pbc_kmesh 1,1,4
gansu2 -x chain.xyz -g sto-3g --pbc_kmesh 1,1,4 --pbc_xc pbe
```

#### pbc_band_path / pbc_band_points - Band structure
* `pbc_band_path` lists the vertices of a k-path in fractional reciprocal coordinates, separated by spaces, optionally labelled (`G:0,0,0 X:0,0,0.5`). At least two vertices are required.
* After the SCF, band energies along the path are written to `band.dat` and `band.svg`, with `pbc_band_points` k-points per segment.
* Available for periodic Hartree-Fock (`-m rhf`). The bands are those of the core Hamiltonian (the two-electron term is not included): they show the shape and symmetry of the bands but not the band energies, so do not read gaps from them. The output is labelled accordingly.

```bash
gansu2 -x chain.xyz -g sto-3g --pbc_band_path "G:0,0,0 X:0,0,0.5" --pbc_band_points 61
```

## Hardware

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| num_gpus | Number of GPUs | int | -1 |
| --cpu | Run entirely on CPU (no GPU required) | flag | off |
| --list-basis | List available built-in basis sets and exit | flag | — |

#### num_gpus - Number of GPUs

* default: -1 (use all visible GPUs)
* Multi-GPU parallelism is used for RI (`eri_method = RI`) calculations, the RI post-HF methods that support it, and DMET fragment-parallel execution. Other ERI methods (`stored`, `Direct`) run on a single GPU regardless of this setting
* Set to a positive integer to cap the number of GPUs used (e.g. `--num_gpus 2` on a 4-GPU node)

```bash
# Single-GPU RI-HF
gansu2 -x ../xyz/large_molecular/fullerene.xyz -g sto-3g \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs --num_gpus 1

# 4-GPU RI-HF
gansu2 -x ../xyz/large_molecular/fullerene.xyz -g sto-3g \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs --num_gpus 4

# Multi-GPU DMET-CCSD(T) on water hexamer
gansu2 -x ../xyz/H2O_hexamer_prism_opt.xyz -g sto-3g \
    --eri_method ri -ag ../auxiliary_basis/def2-svp-rifit.gbs \
    --post_hf_method dmet_ccsd_t --num_gpus 4
```

#### --cpu - CPU-only execution

* default: off (GPU is used)
* When the `--cpu` flag is passed, GANSU2 runs entirely on CPU with multi-threaded code. No NVIDIA GPU is required
* The number of CPU threads is taken from `GANSU2_NUM_THREADS`, else `OMP_NUM_THREADS`, else the CPUs the process may run on (its affinity mask). This applies to the host-side work of GPU runs as well
* Supported: HF (RHF/UHF/ROHF), Kohn-Sham DFT (RKS / UKS / ROKS with every functional, Cartesian and spherical basis), gradients (HF, MP2, SCS-MP2, SOS-MP2, Kohn-Sham, CCSD, CCSD(T), CIS, UMP2, UCCSD, UCCSD(T), UCIS), Hessians, the RHF post-HF energies (MP2/3/4, CCSD, CCSD(T), CIS, ADC(2), singlet and triplet EOM-CCSD / EOM-CC2 / EOM-MP2, FCI), the UHF / ROHF coupled cluster energies (UCCSD, UCCSD(T), UCIS, EOM-UCCSD EE / IP / EA, ROHF-CCSD / CCSD(T) / EOM-CCSD), external point charges (energies and gradients), C-PCM, DMET-CCSD
* GPU-only (a clear error under `--cpu`): periodic systems
* Performance is substantially lower than on the GPU; use it for small tests or environments without CUDA

```bash
gansu2 -x ../xyz/H2O.xyz -g sto-3g --cpu
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r hessian --cpu
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method ccsd --cpu
```

#### --list-basis - List available basis sets

* Prints the names of all built-in basis sets and exits without running a calculation
* Useful for discovering the exact basis name to pass to `-g`

```bash
gansu2 --list-basis
```

## Environment variables

| Variable | Description |
| --- | --- |
| `GANSU2_NUM_THREADS` | Number of CPU threads (falls back to `OMP_NUM_THREADS`, then to the CPUs available to the process) |
| `OMP_NUM_THREADS` | Used for the thread count when `GANSU2_NUM_THREADS` is not set |
| `GANSU2_LIB` | Path to a `libgansu2.so` to use instead of the cached download (see [Python API](usage_python.md)) |
