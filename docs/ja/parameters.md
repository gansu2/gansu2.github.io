---
layout: default
title: "パラメータ"
nav_order: 5
lang: ja
hreflang_alt: "en/parameters"
hreflang_lang: "en"
---

{: .warning }
> **この日本語ページは準備中です。** 技術的な詳細は英語版が最新かつ正確です。 → [English version]({{ '/en/parameters/' | relative_url }})

---


# Parameter desctiption

> [!NOTE]
> Parameters excluding file paths are not case-sensitive.

## All parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| parameter_file | Parameter recipe file (command line only) | string | |
| xyzfilename | XYZ file | string | |
| gbsfilename | Gaussian basis set file | string | |
| auxiliary_gbsfilename | Path to auxiliary Gaussian basis set file for RI approximation (auto-generated if omitted) | string | |
| use_spherical | Use pure spherical-harmonic basis functions (5D/7F/9G, Molden ordering) instead of Cartesian Gaussians (6D/10F/15G) | bool | false |
| verbose | Verbose mode | bool | false |
| method | Method to use (RHF, UHF, ROHF, RKS) | string | RHF |
| charge | Charge of the molecule | int | 0 |
| beta_to_alpha | Number of shifted electrons from beta-spin to alpha-spin | int | 0 |
| maxiter | Maximum number of SCF iterations | int | 100 |
| convergence_energy_threshold | Energy convergence threshold | double | 1.0e-10 |
| int1e_method | Method to use for one-electron integrals | string | hybrid |
| eri_method | Method to use for two-electron repulsion integrals | string | stored |
| functional | DFT exchange-correlation functional (RKS): svwn5, pbe, blyp, scan, b3lyp, b3lyp5, pbe0 | string | svwn5 |
| grid_scheme | DFT radial grid scheme: treutler, sg1, mura_knowles, gauss_chebyshev, delley | string | treutler |
| grid_level | DFT grid level 0-9 (PySCF-compatible) | int | 1 |
| dft_j_backend | DFT Coulomb-matrix backend: auto, stored_j, direct_j, ri_j, direct_ri_j | string | auto |
| dft_vxc_backend | DFT V_xc backend: grouped_v, direct_v, stored_v, aixc_v | string | grouped_v |
| dft_partition | DFT grid binning: bgm, octree | string | bgm |
| dft_bin_capacity | DFT grid points per bin | int | 256 |
| post_hf_method | Post-Hartree-Fock method to use (FCI, MP2, SCS_MP2, SOS_MP2, LT_MP2, LT_SOS_MP2, MP3, MP4, CC2, CCSD, CCSD_T, CCSD_DENSITY, DMET_CCSD, DMET_CCSD_T, CIS, ADC2, SOS_ADC2, LT_SOS_ADC2, ADC2X, EOM_MP2, EOM_CC2, EOM_CCSD) | string | none |
| einsum | Run the einsum implementations (CCSD amplitudes, EOM-CCSD sigma) instead of the hand-written kernels | string (`off` / `on` / `auto`) | auto |
| fp64_emulation | FP64 Ozaki emulation on INT8 tensor cores for the large GEMMs of the einsum paths | string (`off` / `on` / `auto`) | auto |
| n_excited_states | Number of excited states to compute | int | 5 |
| davidson_extra_roots | Roots the Davidson solver tracks beyond `n_excited_states` (guards against missed roots) | string (`auto` or int ≥ 0) | auto |
| spin_type | Spin type for excited states (singlet, triplet) | string | singlet |
| adc2_solver | Solver for ADC(2) (auto, schur_static, schur_omega, full) | string | auto |
| eom_mp2_solver | Solver for EOM-MP2 (auto, schur_static, schur_omega, full) | string | auto |
| eom_cc2_solver | Solver for EOM-CC2 (auto, schur_static, schur_omega, full) | string | auto |
| schwarz_screening_threshold | Schwarz screening threshold | double | 1.0e-12 |
| initial_guess | Method to use for initial guess | string | core |
| convergence_method | Method to use for convergence | string | DIIS |
| damping_factor | Damping factor | double | 0.9 |
| diis_size | Number of previous Fock matrices to store | int | 8 |
| diis_include_transform | Include the transformation matrix in DIIS | bool | false |
| rohf_parameter_name | ROHF parameter set name | string | Roothaan |
| run_type | Type of calculation to perform | string | energy |
| optimizer | Optimization algorithm for geometry optimization | string | bfgs |
| mulliken | Perform Mulliken population analysis | bool | false |
| mayer | Perform Mayer bond order analysis | bool | false |
| wiberg | Perform Wiberg bond order analysis | bool | false |
| export_molden | Output Molden file (canonical MOs) | bool | false |
| export_lmo_molden | Output Molden file with Pipek-Mezey localized occupied orbitals (RHF/UHF/ROHF; see [DLPNO-CCSD / DLPNO-CCSD(T) parameters](#dlpno-ccsd--dlpno-ccsdt-parameters)) | bool | false |
| ecp_filename | Path to ECP file for effective core potentials | string | |
| num_gpus | Number of GPUs for multi-GPU RI-HF (-1 = auto-detect all available) | int | -1 |
| dmet_fragments | DMET fragment specification (e.g. `"{0,6} {1,7}"`); empty = auto-detect by X-H bonds | string | "" |
| dmet_threshold | SVD threshold for DMET bath orbital selection (σ < threshold excluded) | double | 1.0e-6 |
| dmet_n_tol | DMET bisection tolerance on \|Σ N_frag − N_elec\| (Vayesta-compat: 4.2e-3 for benzene) | double | 1.0e-5 |
| dmet_mu_refine_ccsd | DMET 2-stage μ optimization (Stage 1: HF density, Stage 2: CCSD-relaxed density) | bool | false |
| dlpno_preset | DLPNO truncation preset (loose / normal / tight / very_tight, ORCA-compatible). See [DLPNO-CCSD / DLPNO-CCSD(T) parameters](#dlpno-ccsd--dlpno-ccsdt-parameters) | string | normal |
| dlpno_localizer | DLPNO occupied localization method (pm / boys / ibo) | string | pm |
| dlpno_lmp2_max_iter | DLPNO LMP2 / CCSD T2 iter max (shared) | int | 100 |
| dlpno_lmp2_conv | DLPNO LMP2 residual convergence | double | 1e-8 |
| dlpno_sc_pno_iter | DLPNO self-consistent PNO refinement rounds | int | 1 |
| dlpno_pair_distance_cutoff | DLPNO pair distance pre-screening (Bohr) | double | 15.0 |
| dlpno_verbose | DLPNO log verbosity (0/1/2/3) | int | 1 |
| dlpno_compute_density | Build DLPNO Λ + 1-RDM after MP2/CCSD energy (Sub-phase 1+ of DLPNO-CCSD-Λ project, required for DMET integration / properties / dipole) | bool | false |
| opt_max_iter | Geometry optimization max iterations | int | 200 |
| opt_grad_threshold | Convergence: max gradient component (Hartree/Bohr) | double | 3.0e-4 |
| opt_rms_grad_threshold | Convergence: RMS gradient (Hartree/Bohr) | double | 2.0e-4 |
| opt_energy_threshold | Convergence: energy change (Hartree) | double | 1.0e-6 |
| opt_disp_threshold | Convergence: max displacement (Bohr) | double | 3.0e-4 |
| opt_step_max | Trust-region radius (Bohr) | double | 0.3 |




## Parameter parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| parameter_file | Parameter recipe file (command line only) | string | |

If the parameter recipe file is given, the parameters are read from the file. 
The parameters in the recipe file are overwritten by the other parameters.
This parameter is used only in the command line.

The contents of the parameter recipe file RHF_OptimalDamping.txt are a text file in which each line contains a parameter name and its value.
For example, the contents of the parameter recipe are as follows:
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
| gbsfilename | Path to Gaussian basis set file | string | |


#### xyzfilename - Path to XYZ file
If the input molecular is given by Molecule class, this parameter is ignored.

#### gbsfilename - Path to Gaussian basis set file
If the input basis set is given by BasisSet class, this parameter is ignored.
However, if ``sad'' is used as the initial guess, the basis set is required to set this parameter.



## General parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| verbose | Verbose mode | bool | false |
| method | Method to use (RHF, UHF, ROHF, RKS) | string | RHF |

#### verbose - Verbose mode
* default:  false
* true - Print additional information
* false - Do not print additional information

#### method - Method to use (RHF, UHF, ROHF)
* default:  RHF
* RHF - Restricted Hartree-Fock
* UHF - Unrestricted Hartree-Fock
* ROHF - Restricted Open-Shell Hartree-Fock
* RKS - 制限 Kohn-Sham（DFT）。[DFT parameters](#dft-parametersdft-パラメータ) を参照

## Molecule parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| charge | Charge of the molecule | int | 0 |
| beta_to_alpha | Number of shifted electrons from beta-spin to alpha-spin | int | 0 |

#### charge - Charge of the molecule
* default:  0
* Charge of the molecule (positive for cations, negative for anions)

#### beta_to_alpha - Number of shifted electrons from beta-spin to alpha-spin
* default:  0
* Number of shifted electrons from beta-spin to alpha-spin

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

## SCF parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| maxiter | Maximum number of SCF iterations | int | 100 |
| convergence_energy_threshold | Energy convergence threshold | double | 1.0e-10 |
| int1e_method | Method to use for one-electron integrals | string | hybrid |
| eri_method | Method to use for two-electron repulsion integrals | string | stored |
| schwarz_screening_threshold | Schwarz screening threshold | double | 1.0e-12 |
| initial_guess | Method to use for initial guess | string | core |
| convergence_method | Method to use for convergence | string | DIIS |
| damping_factor | Damping factor | double | 0.9 |
| diis_size | Number of previous Fock matrices to store | int | 8 |
| diis_include_transform | Include the transformation matrix in DIIS | bool | false |
| rohf_parameter_name | ROHF parameter set name | string | Roothaan |
| post_hf_method | Post-Hartree-Fock method to use | string | none |


#### maxiter - Maximum number of SCF iterations
* default:  100
* Maximum number of SCF iterations to perform

#### convergence_energy_threshold - Energy convergence threshold
* default:  1.0e-10
* Energy convergence threshold for the SCF iterations (|ΔE| between iterations).
* Post-HF energies depend on the orbitals to first order (the SCF energy only to second order), so a loose threshold shows up there first: with 1.0e-6 (the default up to 2026.10.27) the CCSD correlation energy of benzene/cc-pVDZ was off by 3.5e-6 Eh and with 1.0e-9 by 4e-7 Eh; 1.0e-10 agrees with 1.0e-11 to 1e-15. Raising it to 1.0e-6 saves 1–4 SCF iterations.

#### int1e_method - Method to use for one-electrion integrals (overlap integrals, kinetic energy integrals, and nuclear attraction integrals)
* default: hybrid
* md: McMurchie-Davidson algorithm
* os: Obara-Saika algorithm

#### eri_method - Method to use for two-electron repulsion integrals
* default: stored
* stored - Two-electron repulsion integrals are stored in the device memory
* RI - Resolution of the Identity (RI) approximation is used for the two-electron repulsion integrals (ERIs)
* Direct - Direct calculation of the two-electron repulsion integrals (ERIs) without any approximation (Direct-SCF)
* Direct_RI - Resolution of the Identity (RI) approximation, but three-center ERIs are directly computed without storing

#### auxiliary_gbsfilename - Auxiliary basis set file for RI approximation
* default: (empty)
* When `eri_method` is `RI` or `Direct_RI`, an auxiliary basis set is required.
* If a file path is specified (e.g., `-ag ../auxiliary_basis/cc-pvdz-rifit.gbs`), the auxiliary basis is loaded from the file.
* If omitted, the auxiliary basis is **automatically generated** from the primary basis using the product basis approach:
  1. Collect all primitive Gaussian exponents $\{\alpha_i\}$ from the primary basis for each element
  2. Generate pairwise sums $\alpha_i + \alpha_j$ ($i \le j$)
  3. Remove near-duplicate exponents (keep only if consecutive exponents differ by a factor of $\ge 2$)
  4. Create uncontracted auxiliary functions (coefficient = 1.0) for angular momenta $L = 0, 1, \ldots, 2L_{\max}$, where $L_{\max}$ is the maximum angular momentum in the primary basis
* The auto-generated auxiliary basis provides a quick approximation but is less accurate than purpose-built auxiliary basis sets (e.g., cc-pVDZ-RIFIT). Use explicit auxiliary basis files for production calculations.

#### use_spherical - Cartesian vs spherical-harmonic basis functions
* default: false (Cartesian)
* `false` — Cartesian Gaussians: 6 d-functions, 10 f-functions, 15 g-functions (GANSU2's native representation).
* `true` — pure spherical harmonics: 5 d-functions, 7 f-functions, 9 g-functions, in Molden m-ordering (e.g. d: 0, +1, −1, +2, −2). Use this to reproduce standard cc-pVnZ results from ORCA / PySCF / NWChem, which default to spherical functions for d and higher shells. For example, cc-pVDZ benzene RHF matches the ORCA spherical-d reference to ≤ 1e-9 Ha.
* Integrals are always computed in the Cartesian basis and then transformed to the spherical basis, so s and p shells are unchanged.
* **Supported with `--use_spherical 1`:** RHF / UHF / ROHF energy (stored, RI, multi-GPU distributed RI, Direct-RI / Semi-Direct-RI); RI post-HF (MP2, SCS/SOS-MP2, CCSD, CIS, EOM, ADC(2), DLPNO, STEOM); THC; all initial guesses (core / gwh / sad / minao for RHF; core / gwh / sad for UHF/ROHF); ECP; analytical energy gradient and geometry optimization (stored and RI, single- and multi-GPU); analytical Hessian and vibrational frequencies; Molden export; Mulliken / dipole analysis; Kohn-Sham DFT (RKS / UKS / ROKS, every J / V_xc backend; energies, gradients and geometry optimization — the DFT Fock matrices are built in the Cartesian basis from D_cart = Uᵀ D U and transformed back, which is exact; with RI-J the auxiliary basis stays Cartesian).
* **Cartesian-only (a clear error is raised under `--use_spherical 1`):** Direct-SCF and Hash ERIs. Run these in Cartesian (omit `--use_spherical`).

#### post_hf_method - Post-Hartree-Fock method to use
* default: none

Method names are case-insensitive. Hyphen variants are accepted (`scs-mp2` ≡ `scs_mp2`, `adc2-x` ≡ `adc2x`, `dmet-ccsd(t)` ≡ `dmet_ccsd_t`, etc.).

##### Ground-state correlation methods

| Value | Description |
| --- | --- |
| none | No post-HF method applied (HF only) |
| FCI | Full Configuration Interaction. Exact within the basis. Cost grows factorially — only feasible for very small systems. Runs single-GPU by default; when GANSU2 is built with `-DENABLE_MPI=ON` and launched under `mpirun` on more than one rank, the FCI vector is sharded across ranks/GPUs by the distributed solver (`fci_mpi`), making determinant spaces that exceed a single GPU's memory reachable (see [Multi-node / multi-GPU Full-CI](usage_cli.md#multi-node--multi-gpu-full-ci)) |
| MP2 | Møller–Plesset perturbation theory of 2nd order. Spin-orbital form: $E_{\mathrm{MP2}} = \tfrac{1}{4}\sum_{ijab} \frac{\|\langle ij\|\|ab\rangle\|^2}{\varepsilon_i+\varepsilon_j-\varepsilon_a-\varepsilon_b}$ with antisymmetrized $\langle ij\|\|ab\rangle = (ia\|jb) - (ib\|ja)$. Closed-shell (RMP2) reduces to $\sum_{ijab}\frac{(ia\|jb)\,[2(ia\|jb)-(ib\|ja)]}{\varepsilon_i+\varepsilon_j-\varepsilon_a-\varepsilon_b}$. Splits into opposite-spin (OS) and same-spin (SS) components |
| SCS_MP2 | Spin-Component-Scaled MP2 (Grimme 2003). $E = c_{\mathrm{OS}} E_{\mathrm{OS}} + c_{\mathrm{SS}} E_{\mathrm{SS}}$ with $c_{\mathrm{OS}} = 6/5$, $c_{\mathrm{SS}} = 1/3$. More accurate than MP2 at the same cost |
| SOS_MP2 | Scaled Opposite-Spin MP2 (Jung & Head-Gordon 2004). Drops the same-spin term and rescales: $E = 1.3 \cdot E_{\mathrm{OS}}$. Same-spin omission removes the exchange integral path, enabling cheaper algorithms |
| LT_MP2 | Laplace-Transform MP2. Replaces the orbital-energy denominator with $\frac{1}{x} \approx \sum_k w_k e^{-t_k x}$ (double-exponential quadrature). Decouples occupied/virtual indices, useful for RI-MP2 acceleration. Aliases: `lt-mp2`, `laplace_mp2` |
| LT_SOS_MP2 | Laplace transform applied to SOS-MP2. The combination of opposite-spin-only and Laplace decoupling gives $\mathcal{O}(N^4)$ scaling with RI. Aliases: `lt-sos-mp2`, `laplace_sos_mp2` |
| MP3 | MP3. Adds 3rd-order doubles correction over MP2. $\mathcal{O}(N^6)$ |
| MP4 | MP4 (full: SDQ + (T) contributions). $\mathcal{O}(N^7)$. Alias: `mp4` |
| CC2 | Coupled-Cluster with approximate doubles. Doubles are kept at MP1 quality but coupled iteratively to singles. $\mathcal{O}(N^5)$ |
| CCSD | Coupled-Cluster with Singles and Doubles. $\mathcal{O}(N^6)$. Iterative |
| CCSD_T | CCSD(T) — CCSD plus perturbative triples evaluated once at the converged CCSD amplitudes. The "gold standard" for ground-state correlation. $\mathcal{O}(N^7)$ for the (T) step |
| CCSD_DENSITY | CCSD + Λ-equation solve + 1-RDM construction. Used internally by DMET and for natural-orbital / property analysis. Same energy as CCSD; adds Λ + 1-RDM cost |
| DMET_CCSD | Density Matrix Embedding Theory with CCSD as the impurity solver. Auto-fragmentation by X–H bonds (or `dmet_fragments` manual spec). See [DMET-CCSD parameters](#dmet-ccsd-parameters) |
| DMET_CCSD_T | DMET-CCSD plus per-fragment perturbative triples evaluated at the converged $\mu_{\mathrm{DMET}}$. Aliases: `dmet-ccsd_t`, `dmet_ccsd(t)`, `dmet-ccsd(t)`, `dmet_ccsdt` |
| DLPNO_CCSD | Domain-based Local Pair Natural Orbital CCSD (Riplinger & Neese 2013, 2016). RHF; on a UHF reference (`-m uhf`) a small-molecule form that solves the UCCSD equations projected onto the PNO spaces (see the parameters section); requires RI. Pipek-Mezey occupied LMOs → PAO + per-LMO atom domains → per-pair PNO truncation → strong/weak-pair partitioning. Aliases: `dlpno-ccsd`. See [DLPNO-CCSD / DLPNO-CCSD(T) parameters](#dlpno-ccsd--dlpno-ccsdt-parameters) |
| DLPNO_CCSD_T | DLPNO-CCSD plus perturbative triples evaluated on per-triple TNO bases via batched GPU kernels. PySCF-equivalent 6-W formulation. Aliases: `dlpno-ccsd_t`, `dlpno_ccsd(t)`, `dlpno-ccsd(t)`, `dlpno_ccsdt` |

##### Excited-state methods

| Value | Description |
| --- | --- |
| CIS | Configuration Interaction Singles. Diagonalizes $\langle\Phi_i^a\|H-E_0\|\Phi_j^b\rangle$. Lowest-cost excited-state method ($\mathcal{O}(N^4)$); generally over-estimates excitation energies by ~1 eV |
| ADC2 | Algebraic Diagrammatic Construction of 2nd order, strict variant ADC(2)-s. M22 (doubles–doubles block) is purely diagonal: $D_2 = \varepsilon_a + \varepsilon_b - \varepsilon_i - \varepsilon_j$ |
| SOS_ADC2 | Scaled-opposite-spin ADC(2)-s (Krauter, Pernpointner, Dreuw, JCP 138, 044107 (2013); the Q-Chem SOSADC(2) model). Same-spin terms dropped, the opposite-spin $t_2$ in the singles block scaled by $c_T$ (`adc_c_t`, default 1.3) and the opposite-spin singles–doubles couplings by $c_c$ (`adc_c_c`, default 1.17). RI with exact denominators (Schur + ω iteration), singlets, single- and multi-GPU. Aliases: `sos-adc2`, `sos_adc(2)` |
| LT_SOS_ADC2 | `SOS_ADC2` with Laplace-transformed 2p2h denominators (30 points), $\mathcal{O}(N^4)$ per σ with RI; same energies as `SOS_ADC2` (H2O, naphthalene/cc-pVDZ: within 1e-8 Eh), several times faster. Multi-GPU runs gather the RI blocks on GPU 0. Aliases: `lt-sos-adc2`, `lt_sos_adc(2)` |
| ADC2X | ADC(2) extended (`adc(2)-x`). M22 includes first-order off-diagonal terms (oooo, vvvv, voov), giving lower (more accurate) excitation energies than ADC(2)-s. Always uses the full Davidson solver. Aliases: `adc2-x`, `adc(2)-x` |
| EOM_MP2 | Equation-of-Motion MP2 (≈ ADC(2) but Stanton–Bartlett style). M22 has off-diagonal couplings via T2 |
| EOM_CC2 | Equation-of-Motion CC2. Doubles kept at CC2 quality. M22 is exactly diagonal — Schur complement is exact (no approximation in `schur_omega`) |
| EOM_CCSD | Equation-of-Motion CCSD. Most accurate single-reference excited-state method available here |
| THC_SOS_ADC2 | SOS-ADC(2)-s (the `sos_adc2` model with the Laplace-folded doubles of `lt_sos_adc2`, singlets / triplets, frozen core) on the LS-THC integrals $V_{\mu\nu\lambda\sigma}\!\approx\!\sum_{PQ}X^P_\mu X^P_\nu Z_{PQ}X^Q_\lambda X^Q_\sigma$ (Becke–Lebedev grid); $Z = LL^T$ gives RI-shaped factors $B^K_{pq}=\sum_P X^P_pX^P_qL_{PK}$. Agrees with `lt_sos_adc2` to the THC error (H2O/cc-pVDZ 7e-6 Eh). Set `--eri_method ri` (with auxiliary basis) for the memory-light Phase 2.3 RI-Z path; `--eri_method stored` works at small scales. See [THC parameters](#thc-parameters). Aliases: `thc-sos-adc2`, `thc_sos_adc(2)` |
| IP_EOM_CCSD | Ionization-Potential EOM-CCSD — $(N-1)$-electron ionized states on top of the CCSD reference (ionization potentials / cationic states). RHF closed-shell only; stored or RI. Aliases: `ip-eom-ccsd`, `ipeom_ccsd`, `ipeom-ccsd` |
| EA_EOM_CCSD | Electron-Affinity EOM-CCSD — $(N+1)$-electron attached states (electron affinities / anionic states). RHF closed-shell only; stored or RI. Aliases: `ea-eom-ccsd`, `eaeom_ccsd`, `eaeom-ccsd` |
| STEOM_CCSD | Similarity-Transformed EOM-CCSD (Nooijen–Bartlett). Diagonalizes the doubly similarity-transformed Hamiltonian in the singles space, capturing double excitations at singles cost. **Automatically runs CIS-NTO + IP-EOM-CCSD + EA-EOM-CCSD as prerequisites.** RHF closed-shell only. Aliases: `steom-ccsd`, `steomccsd` |
| DLPNO_STEOM_CCSD | Local (linear-scaling-oriented) STEOM-CCSD. The DLPNO-CCSD ground state is back-transformed to the canonical basis and fed to canonical CIS-NTO + IP/EA-EOM + STEOM. RHF closed-shell; **requires RI**. Aliases: `dlpno-steom-ccsd`, `dlpno_steom`, `dlpnosteom` |
| CIS_NTO | State-averaged CIS with a natural-transition-orbital (NTO) active space. Primarily the STEOM prerequisite (P0); can also be run standalone. Alias: `cis-nto` |

For excited-state methods, see the [Excited state parameters](#excited-state-parameters) section for `n_excited_states`, `spin_type`, and per-method solver (`adc2_solver`, `eom_mp2_solver`, `eom_cc2_solver`).

#### schwarz_screening_threshold - schwarz screening threshold
* default:  1.0e-12
* Schwarz screening threshold for the two-electron repulsion integrals (ERIs)

Schwarz screening is used to reduce the computational cost of the two-electron repulsion integrals (ERIs).
Schwarz inequality is applied to the two-electron repulsion integrals (ERIs) to reduce the computational cost.
Schwarz inequality is given by the following inequality:
```math
\left|(\mu\nu|\lambda\sigma)\right| \le \sqrt{(\mu\nu|\mu\nu)} \sqrt{(\lambda\sigma|\lambda\sigma)}
```
where $(\mu\nu|\lambda\sigma)$ is the two-electron repulsion integral (ERI) of the basis functions $\phi_{\mu}$, $\phi_{\nu}$, $\phi_{\lambda}$, and $\phi_{\sigma}$:
```math
(\mu\nu|\lambda\sigma)=\iint \phi_{\mu}(\mathbf{r}_1) \phi_{\nu}(\mathbf{r}_1) \frac{1}{\mathbf{r}_{12}} \phi_{\lambda}(\mathbf{r}_2) \phi_{\sigma}(\mathbf{r}_2) d\mathbf{r}_1 d\mathbf{r}_2
```
Using Schwarz inequality, the two-electron repulsion integrals (ERIs) are calculated if $\sqrt{(\mu\nu|\mu\nu)} \sqrt{(\lambda\sigma|\lambda\sigma)}$ is greater than the Schwarz screening threshold.
Otherwise, the two-electron repulsion integrals (ERIs) are set to zero.

#### initial_guess - Method to use for initial guess
* default:  core
* core - Core Hamiltonian is used as the initial guess of the Fock matrix
* gwh - Generalized Wolfsberg-Helmholz method (GWH) is used as the initial guess of the Fock matrix
* sad - Superposition of Atomic Densities (SAD) is used as the initial guess of the Fock matrix
* density - Given density matrix is used as the initial guess of the Fock matrix
* minao - Minimal ANO (ANO-RCC-MB) projection initial guess (RHF)

#### convergence_method - Method to use for convergence
* default:  DIIS
* Damping - Damping method with constant damping factor
* OptimalDamping - Damping method with optimal damping factor (RHF, ROHF)
* DIIS - Direct Inversion of the Iterative Subspace (DIIS)
* SOSCF - Second-Order SCF (DIIS→SOSCF automatic switching, RHF)
* ADIIS - Augmented DIIS (RHF)
* EDIIS - Energy DIIS (RHF)
* AEDIIS - Automatic EDIIS→ADIIS→DIIS switching (RHF)

#### damping_factor - Damping factor for DIIS
* default:  0.9
* Damping factor for damping method

#### diis_size - Number of previous Fock matrices to store
* default:  8
* Number of previous Fock matrices to store for DIIS convergence algorithm

#### diis_include_transform - Includes the transformation matrix in DIIS
* default:  false
* true - Include the transformation matrix in DIIS for calculation of the error matrix $e$:
    * $e = X(FPS-SPF)X^T$
    * where $F$ is the Fock matrix, $P$ is the density matrix, and $S$ is the overlap matrix, and $X$ is the transformation matrix

* false - Do not include the transformation matrix for calculation of the error matrix $e$
    * $e = FPS - SPF$



#### rohf_parameter_name - ROHF parameter set name
* default:  Roothaan
* Parameter set name in computing the ROHF Fock matrix

| Parameter set name |  $A^{CC}$  |  $B^{CC}$  |  $A^{OO}$  |  $B^{OO}$  |  $A^{VV}$  |  $B^{VV}$  |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| Roothaan |  $-1/2$    |  $3/2$     |  $1/2$     |  $1/2$     |  $3/2$     |  $-1/2$    |
| McWeeny-Diercksen |  $1/3$     |  $2/3$     |  $1/3$     |  $1/3$     |  $2/3$     |  $1/3$     |
| Davidson |  $1/2$     |  $1/2$     |  $1$       |  $0$       |  $1$       |  $0$       |
| Guest-Saunders |  $1/2$     |  $1/2$     |  $1/2$     |  $1/2$     |  $1/2$     |  $1/2$     |
| Binkley-Pople-Dobosh |  $1/2$     |  $1/2$     |  $1$       |  $0$       |  $0$       |  $1$       | 
| Faegri-Manne |  $1/2$     |  $1/2$     |  $1$       |  $0$       |  $1/2$     |  $1/2$     |
| Goddard |  $1/2$     |  $1/2$     |  $1/2$     |  $0$       |  $1/2$     |  $1/2$     |
| Plakhutin-Gorelik-Breslavskaya |  $0$       |  $1$       |  $1$       |  $0$       |  $1$       |  $0$       | 

#### mulliken - Perform Mulliken population analysis
* default:  false
* true - Perform Mulliken population analysis after the SCF calculation
* false - Do not perform Mulliken population analysis

#### mayer - Perform Mayer bond order analysis
* default:  false
* true - Perform Mayer bond order analysis after the SCF calculation
* false - Do not perform Mayer bond order analysis

#### wiberg - Perform Wiberg bond order analysis
* default:  false
* true - Perform Wiberg bond order analysis after the SCF calculation
* false - Do not perform Wiberg bond order analysis

#### export_molden - Export Molden file
* default:  false
* true - Export Molden file after the SCF calculation (output filename: output.molden)
* false - Do not output Molden file

#### export_lmo_molden - Export Pipek-Mezey localized occupied orbitals
* default:  false
* true - Localize occupied MOs via Pipek-Mezey and write them to `output_lmo.molden`. Occupied block contains the LMOs (C_LMO = C_occ · U); virtual block keeps the canonical orbitals. For UHF, α and β are localized independently. For ROHF, doubly-occupied and singly-occupied subspaces are localized separately so closed-shell core and open-shell electrons do not mix. The orbital energies written for each LMO are the diagonal Fock-in-LMO-basis values $\varepsilon_i^{\mathrm{LMO}} = \sum_k |U_{ki}|^2 \cdot \varepsilon_k^{\mathrm{can}}$ (exact since canonical $F$ is diagonal in the canonical MO basis).
* false - Do not export localized orbitals

Compatible Molden viewers: [MOrbVis](https://yasuaki-ito.github.io/morbvis/), [Avogadro](https://avogadro.cc/), Jmol, VMD, [Pegamoid](https://github.com/Jellby/Pegamoid).


## DFT parameters（DFT パラメータ）

`--method rks` で制限 Kohn-Sham DFT を選択します。RKS は RHF の SCF 機構（初期推定・DIIS/SOSCF・収束判定）をそのまま使い、Fock 行列の交換項を数値積分した交換相関ポテンシャル $V_{xc}$ に置き換えます。開殻は `--method uks`（非制限 Kohn-Sham。UHF の SCF 機構と同じ汎関数を使い、AO 値をグリッド上に保持、J は正確な増分 direct。ハイブリッドの厳密交換は stored ERI から取るので AO テンソルが GPU に載る必要があります）。RKS / UKS の解析的勾配（`-r gradient` / `optimize`）は上の全汎関数で使えます（Cartesian / 球面調和基底。グリッドの重みの応答は含めず PySCF の既定と同じ。PySCF と 1e-8 Eh/bohr で一致）。`--method roks` は制限開殻版です（ROHF の SCF で、Kohn-Sham の α / β ポテンシャルから F_closed = (F_α + F_β)/2、F_open = F_α/2。エネルギーと勾配は UKS と同様）。meta-GGA の `scan`（SCAN。libxc の MGGA_X_SCAN + MGGA_C_SCAN と同じ。エネルギーと勾配、3 手法とも）は運動エネルギー密度 τ を使い、RKS では保存グリッドの V_xc 構築（`dft_vxc_backend stored_v`）に切り替えます。SCAN はポテンシャルが硬いので、勾配では SCF を 1e-13 まで収束させてください。

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| functional | 交換相関汎関数: `svwn5`（LDA、別名 `lda`, `svwn`）, `pbe`, `blyp`（GGA）, `scan`（meta-GGA）, `b3lyp`, `b3lyp5`, `pbe0`（ハイブリッド） | string | svwn5 |
| grid_scheme | 動径求積: `treutler`, `sg1`, `mura_knowles`, `gauss_chebyshev`, `delley` | string | treutler |
| grid_level | グリッド密度 0–9（PySCF 互換のレベル表、`sg1` では無視） | int | 1 |
| dft_j_backend | Coulomb 行列 (J) の構築法: `auto`, `stored_j`, `direct_j`, `ri_j`, `direct_ri_j` | string | auto |
| dft_vxc_backend | $V_{xc}$ の構築法: `grouped_v`, `direct_v`, `stored_v`, `aixc_v` | string | grouped_v |
| dft_partition | $V_{xc}$ 構築時のグリッド点の空間分割: `bgm`, `octree` | string | bgm |
| dft_bin_capacity | 1 ビンあたりの最大グリッド点数 | int | 256 |

#### functional - 交換相関汎関数
* default: svwn5
* svwn5 - Slater 交換 + VWN5 相関（LDA）
* pbe - Perdew-Burke-Ernzerhof 交換相関（GGA）
* blyp - Becke 88 交換 + LYP 相関（GGA）
* b3lyp - B3LYP ハイブリッド：交換 0.08 Slater + 0.72 B88 + 0.20 HF、相関 0.19 VWN-RPA + 0.81 LYP（元の定義。Gaussian、PySCF 2.3 以降と同じ）
* b3lyp5 - VWN-RPA の代わりに VWN5 を使う B3LYP（ORCA / Turbomole の B3LYP）
* pbe0 - PBE0 ハイブリッド：交換 0.75 PBE + 0.25 HF、PBE 相関
* ハイブリッドの厳密交換は、同じ密度での HF の Fock 構築から取ります（AO テンソルが GPU の空きの 30% に載れば stored、載らなければ direct。`dft_j_backend` によらない）。いずれも H2O/cc-pVDZ で PySCF（cart=True、同じグリッドレベル）と 1e-9 Eh で一致します。

#### grid_scheme / grid_level - 分子積分グリッド
* PySCF と同じ Becke 分割の原子中心グリッド（同じ動径・角度レベル表、NWChem 方式の角度プルーニング）です。`grid_level` は PySCF の `grids.level` と同じ意味で、同じレベルなら PySCF とエネルギーを直接比較できます（PySCF の既定はレベル 3）。
* 目安: 水はレベル 1 で約 1 万点、レベル 3 で約 3.4 万点。ベンゼンはレベル 1 で約 4.6 万点、レベル 3 で約 14.4 万点。
* `sg1` は固定の SG-1 グリッドで `grid_level` を無視します。

#### dft_j_backend - Coulomb 行列の構築法
* default: auto — `eri_method` に追従します: `stored` → `stored_j`, `ri` → `ri_j`, `direct_ri` → `direct_ri_j`, `direct` → `direct_j`。
* stored_j - 保存した $n_{ao}^4$ の ERI テンソルから J を作る（`eri_method stored` の RHF と同じメモリ量）
* direct_j - 密度差スクリーニング付きの on-the-fly J。高速カーネルは s/p 殻の組だけで、d 以上は汎用の遅いカーネルに落ちる（ベンゼン/6-31G(d)、A100 で SCF 1 回 8.6 s、`stored_j` なら 0.3 s）
* ri_j / direct_ri_j - $B$ テンソルを保存する／保存しない RI-J。どちらも補助基底（`-ag`）が必要。MP2 用補助基底（`*-rifit.gbs`）では RI-J の誤差が大きい（ベンゼンで約 9 mEh。同じ補助基底の PySCF の density-fitted RKS と一致）ので、絶対エネルギーが要るときは JK-fit 補助基底を使うこと。

#### dft_vxc_backend - 交換相関ポテンシャルの構築法
* default: grouped_v
* grouped_v - グリッド点を空間的にビン分け（`dft_partition`）し、ビンごとに AO をスクリーニングして密度と $V_{xc}$ の縮約をバッチ cuBLAS GEMM で行う。既定の分割 `bgm`（bond-group Morton: 各結合を囲む 6 シードのケージを主キーにし、その中を Morton 順に並べる）は細長い分子で各ビンの有効 AO 数を素の Morton 曲線より 20〜35 % 減らす。`octree` は代替
* direct_v / stored_v - 参照実装。`stored_v` は $n_{grid} \times n_{ao}$ の AO 行列全体をデバイスに保持する。3 つとも $10^{-12}$ Eh で一致
* aixc_v - アンカー付き差分 XC（anchored incremental XC）。数回のフルグリッド構築の後、多くの SCF ステップでは密度の*変化分*だけを代表点 20 % のサブグリッドで評価（control variate で補正）し、周期的にフルグリッドで再アンカーする。収束受理の直前には必ずフルグリッドで $V_{xc}$ を作り直す。A100・grid level 6・PBE（ナフタレン〜DHA、190〜520 基底）で $V_{xc}$ 構築 1 回の平均時間が `grouped_v` の 2.3〜2.6 分の 1 になり、収束エネルギーは $6 \times 10^{-7}$ Eh 以内で一致する。SCF 反復は 0〜10 回増えるので、SCF 全体での得は 1 反復に占める $V_{xc}$ の割合（グリッドが細かい・GGA）で決まる

#### 例
```bash
# PBE / cc-pVDZ、PySCF レベル 3 のグリッド
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --method rks --functional pbe --grid_level 3

# LDA + RI-J（補助基底が必要）
gansu2 -x ../xyz/Benzene.xyz -g 6-31g_st --method rks --functional svwn5 --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs
```

検証: `cart=True` かつ同じ `grid_level` の PySCF と、H2O（STO-3G, 6-31G, cc-pVDZ）とベンゼン（6-31G, 6-31G(d)）の全エネルギーが PBE で約 $10^{-7}$ Eh、SVWN5 で $7 \times 10^{-7}$ Eh 以内で一致します。

## Excited state parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| n_excited_states | Number of excited states to compute | int | 5 |
| davidson_extra_roots | Roots the Davidson solver tracks beyond `n_excited_states` (guards against missed roots) | string (`auto` or int ≥ 0) | auto |
| spin_type | Spin type for excited states | string | singlet |
| adc2_solver | Solver for ADC(2) | string | auto |
| eom_mp2_solver | Solver for EOM-MP2 | string | auto |
| eom_cc2_solver | Solver for EOM-CC2 | string | auto |

These parameters are used when `post_hf_method` is set to an excited state method (CIS, ADC2, ADC2X, EOM_MP2, EOM_CC2, EOM_CCSD).

#### einsum - einsum implementations
* default: auto
* on - Methods that have an einsum implementation run it instead of the hand-written kernels: the CCSD amplitude equations (the converged amplitudes then seed the standard CCSD loop, which confirms convergence in one or two native-FP64 iterations and runs (T) and the EOM hand-off unchanged) and the EOM-EE-CCSD sigma vector (the host-side build of the dressed intermediates is skipped). Needs the full MO ERI tensor in GPU memory (stored path, no RI); otherwise the standard path is used.
* auto - on for GPUs whose FP64 throughput is at most 1/8 of FP32 (consumer and workstation GPUs, GB10, B300, ...), off on A100 / H100 / H200 / B200-class GPUs.
* The einsum implementations follow the PySCF equations and agree with the standard ones to 1e-13 (EOM-EE / IP / EA-CCSD sigma, ADC(2) matrices, CCSD residual).

#### fp64_emulation - FP64 emulation for the einsum paths
* default: auto
* on - The large GEMMs of the einsum paths (min(M, N, K) >= 256) run on cuBLAS's fixed-point FP64 emulation (Ozaki scheme on INT8 tensor cores) with a 55-bit mantissa. Benzene/cc-pVDZ CCSD on GB10: 2.7x faster amplitude solve, correlation energy unchanged to 4e-13.
* auto - on for GPUs whose FP64 throughput is at most 1/8 of FP32, off otherwise.
* Only affects the einsum paths (see `einsum`).

#### n_excited_states - Number of excited states to compute
* default: 5
* Number of lowest excited states to compute. Must not exceed the singles dimension (nocc × nvir).

#### davidson_extra_roots - Extra roots tracked by the Davidson solver
* default: auto
* The Davidson solver only refines the lowest roots it tracks. A state that starts above them in the initial (singles-only) guess space never receives the doubles corrections that would bring it down, and is silently skipped (EOM-CCSD benzene/6-31G with 5 roots returned the 9th state as the 5th). The solver therefore tracks `n_excited_states` + this many roots, tests convergence on the requested roots only, and returns those.
* auto - max(4, ceil(n_excited_states/4)). When the extra buffers (2 × dimension per root) would not fit in GPU memory, or the solver falls back to managed memory, it is reduced to 2 — never to 0 — and a warning `Davidson missed-root protection weakened (extra roots n -> m, ...)` is printed: large solves with dense spectra are where a missed root is most likely. The total is capped at half of the subspace size. The log line `Davidson: nev=5 (tracking 9 internally; extra_roots=auto->4)` records the choice.
* This only keeps the requested lowest roots from being skipped. How many roots to request so that a particular (e.g. high-lying) state is reached is a separate choice, made with `n_excited_states` and the method's own root-count parameters.
* integer ≥ 0 - exactly that many extra roots. 0 restores the previous behavior (only the requested roots are tracked); only an explicit 0 turns the protection off.
* Applies to every Davidson-based method (CIS, ADC(2), EOM-MP2 / CC2 / CCSD, IP/EA-EOM-CCSD, STEOM, ...). Cost: each iteration applies the operator to up to that many more vectors.

#### spin_type - Spin type for excited states
* default: singlet
* singlet - Compute singlet excited states (default). Oscillator strengths are computed.
* triplet - Compute triplet excited states. Oscillator strengths are zero (spin-forbidden electric dipole transitions from singlet ground state).
* Supported methods: CIS, ADC2, ADC2X, EOM_CCSD, EOM_CC2, EOM_MP2, SOS_ADC2 / LT_SOS_ADC2 (RI, one or several GPUs), STEOM-CCSD. THC_SOS_ADC2 as SOS_ADC2. For triplet states the whole spin-adapted matrix differs from the singlet one: M11 (CIS + ISR correction), the singles–doubles couplings M12 / M21 and, for ADC(2)-x, the off-diagonal ring terms of M22 all take their triplet form (the doubles vector then carries both the α-β and the α-α amplitudes). Only the diagonal D2 and the oooo / vvvv parts of M22 are spin independent. Triplet ADC(2) / ADC(2)-x roots agree with a spin-orbital (UHF-based) ADC calculation.
* EOM-CCSD / EOM-CC2 / EOM-MP2 triplets (GPU only) solve the full singles-plus-doubles problem with Davidson in the spin-adapted triplet space (α-α doubles with i>j, a>b and α-β doubles antisymmetric under (ia)↔(jb)), whatever `eom_cc2_solver` / `eom_mp2_solver` says. EOM-CCSD follows PySCF's `eomee_ccsd_triplet` (agrees to 6e-8 Eh); EOM-MP2 agrees with a spin-orbital EOM-MBPT(2) built from the unrestricted EOM-CCSD matrix.
* SOS-ADC(2) triplets keep the opposite-spin model: M11 = triplet CIS + c_T × the opposite-spin second-order terms of the α-α minus α-β blocks, and the α-β doubles couple with the β particle-hole carrying −r. They agree with `script/pyscf_sos_adc2_reference.py ... triplet`.

#### adc2_solver - Solver for ADC(2)
* default: auto
* auto - Automatically selects `full` or `schur_omega` based on available GPU memory (80% threshold)
* full - Full Davidson in singles+doubles space. Exact but requires more GPU memory.
* schur_omega - ω-dependent Schur complement with self-consistent iteration. M_eff(ω) = M11 + M12·(ωI − D2)⁻¹·M21. Iterates each root until ω converges.
* schur_static - Single Schur complement at ω=0. M_eff = M11 − M12·D2⁻¹·M21. Fastest but least accurate.

#### eom_mp2_solver - Solver for EOM-MP2
* default: auto
* auto - Automatically selects `full` or `schur_omega` based on available GPU memory (80% threshold)
* full - Full Davidson in singles+doubles space. Exact but may encounter near-zero eigenvalues from the doubles null space.
* schur_omega - ω-dependent Schur complement with self-consistent iteration. Builds dense M_eff(ω) matrix and uses non-symmetric eigendecomposition. More accurate than schur_static.
* schur_static - Approximate Schur complement at ω=0 using Davidson. M22 off-diagonal (t2×r2 coupling) is ignored. Fast but approximate.

#### eom_cc2_solver - Solver for EOM-CC2
* default: auto
* auto - Automatically selects `full` or `schur_omega` based on available GPU memory (80% threshold)
* full - Full Davidson in singles+doubles space. Exact.
* schur_omega - ω-dependent Schur complement with self-consistent Davidson iteration. EXACT (M22 is purely diagonal, no approximation). Default and recommended.
* schur_static - Schur complement at ω=0 using Davidson. EXACT Schur (no M22 approximation) but ω=0 approximation remains.

Note: For EOM-CC2, M22 is exactly diagonal, so the Schur complement introduces NO approximation (unlike EOM-MP2 where M22 off-diagonal terms are ignored). The only approximation in `schur_static` is the ω=0 assumption.

#### ADC(2)-s vs ADC(2)-x

ADC(2) has two variants:

| | ADC(2)-s (`adc2`) | ADC(2)-x (`adc2x`) |
|---|---|---|
| M11 (singles) | CIS + ISR + self-energy | Same as ADC(2)-s |
| M12, M21 (coupling) | Coupling blocks | Same as ADC(2)-s |
| M22 (doubles) | Diagonal only: D2 = ε_a+ε_b−ε_i−ε_j | D2 + first-order off-diagonal terms (oooo, vvvv, voov) |

ADC(2)-x includes explicit electron correlation in the doubles space, generally giving lower (more accurate) excitation energies. ADC(2)-x always uses the full Davidson solver.

```bash
# CIS with 10 excited states
gansu2 -x ../xyz/H2O.xyz -g sto-3g --post_hf_method cis --n_excited_states 10

# ADC(2) with auto solver selection (default)
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2

# ADC(2)-x (extended)
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2x

# ADC(2) with explicit full Davidson solver
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2 --adc2_solver full

# Triplet excited states
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method cis --spin_type triplet
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2 --spin_type triplet
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2x --spin_type triplet
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_ccsd --spin_type triplet

# EOM-MP2 with schur_omega solver
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_mp2 --eom_mp2_solver schur_omega

# EOM-CC2 with full Davidson solver
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_cc2 --eom_cc2_solver full

# EOM-CCSD
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method eom_ccsd
```

## Geometry optimization parameters

| Parameter | Short | Description | Type | Default |
| --- | --- | --- | --- | --- |
| run_type | -r | Type of calculation | string | energy |
| optimizer | | Optimization algorithm | string | bfgs |

#### run_type - Type of calculation to perform

* default: energy
* energy - Single-point energy calculation only
* gradient - Single-point energy calculation followed by analytical energy gradient evaluation
* optimize - Geometry optimization using analytical energy gradients (BFGS by default)
* hessian - Single-point energy followed by analytical Hessian and harmonic vibrational frequencies (mass-weighted normal modes, IR intensities). Translational/rotational modes are projected out

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

GDIIS combines quasi-Newton steps with DIIS extrapolation. It maintains an internal BFGS inverse Hessian and a subspace of recent geometries and error vectors.
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

The search direction is simply $\mathbf{p} = -\mathbf{g}$. Uses Armijo backtracking line search with a trust radius. Convergence is slow due to zigzag behavior, but it is useful for debugging.

### Convergence criteria

The geometry optimization uses four convergence criteria:

| Criterion | Threshold | Description |
| --- | --- | --- |
| Max gradient | $3.0 \times 10^{-4}$ Hartree/Bohr | Maximum gradient component |
| RMS gradient | $2.0 \times 10^{-4}$ Hartree/Bohr | Root mean square of gradient |
| Energy change | $1.0 \times 10^{-6}$ Hartree | Absolute energy change between steps |
| Max displacement | $3.0 \times 10^{-4}$ Bohr | Maximum atomic displacement |

Convergence is declared when **both** gradient criteria (max and RMS) are satisfied, **or** when both energy change and max displacement criteria are satisfied.
The maximum number of optimization steps is 200 and the trust radius is 0.3 Bohr.

### Translational and rotational invariance

At each optimization step, the translational and rotational components are projected out from the gradient and the search direction using Gram-Schmidt orthogonalization against the 6 (or 5 for linear molecules) basis vectors spanning the translational and rotational degrees of freedom.

### Output control

| run_type | SCF iterations | Profiler | SAD log | Gradient |
| --- | --- | --- | --- | --- |
| energy | displayed | displayed | displayed | - |
| gradient | displayed | displayed | displayed | displayed |
| optimize | suppressed | suppressed | suppressed | used internally |

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


## DMET-CCSD parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| dmet_fragments | Fragment specification (e.g. `"{0,6} {1,7}"`); empty = auto-detect by X-H bonds | string | "" |
| dmet_threshold | SVD threshold for bath orbital selection (σ < threshold excluded) | double | 1.0e-6 |
| dmet_n_tol | Bisection tolerance on \|Σ N_frag − N_elec\| | double | 1.0e-5 |
| dmet_mu_refine_ccsd | 2-stage μ optimization (HF density → CCSD-relaxed density) | bool | false |

DMET-CCSD partitions the molecule into atom-localized fragments, builds a Schmidt-decomposed embedding cluster (fragment AOs + bath orbitals) for each, and solves CCSD on each cluster independently. A global chemical potential μ is bisected to satisfy the embedded-fragment density-consistency condition Σ N_frag = N_elec. Equivalent fragments are detected via embedding-Hamiltonian eigenvalue matching and reused.

For DMET-CCSD(T), pass `--post_hf_method dmet_ccsd_t` (or `dmet-ccsd_t`, `dmet_ccsdt`, `dmet_ccsd(t)`). The (T) perturbative-triples correction is computed per fragment at the converged μ_DMET using canonical denominators (small \|f_ov\| at the converged μ makes the canonical-(T) approximation acceptable), then summed across fragments with equivalent-fragment reuse.

#### dmet_fragments - Fragment specification
Empty string (default) triggers automatic detection: each heavy atom becomes a fragment, and each hydrogen joins its nearest heavy-atom fragment within 2.6 Bohr (≈ 1.38 Å). For example, benzene (C6H6) auto-detects 6 CH fragments.

Manual specification uses brace notation, atoms 0-indexed:
```bash
# 6 CH pairs in benzene (atoms C0/H6, C1/H7, ...)
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --post_hf_method dmet \
    --dmet_fragments "{0,6} {1,7} {2,8} {3,9} {4,10} {5,11}"
```

#### dmet_threshold - SVD threshold
Bath orbitals are constructed from the SVD of `C_lo_occ[frag_AOs, :]`. Singular values σ < `dmet_threshold` are excluded as numerical noise; σ ≥ 1 − 1e-12 are core orbitals (excluded from the active cluster, counted in n_core).

#### dmet_n_tol - Bisection tolerance
Bisection of μ stops when |Σ_F N_frag(μ) − N_elec| < `dmet_n_tol`. Default 1e-5 enforces strict density consistency. For Vayesta-compatible loose convergence (4.2e-3 for benzene, matching Vayesta's `max_elec_err = 1e-4 × N_elec`), pass `--dmet_n_tol 4.2e-3` (yields earlier termination, slightly different μ_DMET).

#### dmet_mu_refine_ccsd - 2-stage μ optimization
* **false** (default): single-stage CCSD-density bisection. Runs CCSD/Lambda/dm1 at every μ evaluation; the relaxed dm1 trace defines `N_frag(μ)`.
* **true**: two-stage refinement. Stage 1 performs HF-density bisection (fast, μ-continuous). Stage 2 refines around `μ_HF*` using CCSD-relaxed dm1 in a tight bracket. Falls back to Stage 1 result if Stage 2 hits a discontinuity (e.g. heteroatom OH fragments). Recommended only for paper-quality match with external DMET implementations; default is sufficient for most uses.

### DMET-STEOM CIS-guided automatic fragment extraction

For the excited-state driver (`post_hf_method=dmet_steom`), the chromophore fragment can be
extracted automatically from the excitation itself instead of being specified by hand. A
full-system state-averaged CIS-NTO is computed up front; each atom is scored by its
occupation-weighted hole+particle NTO Löwdin population, and the chromophore is the greedy
set of atoms that reaches the coverage target (capped by the cluster orbital budget). This is
distinct from the ground-state `dmet_fragments` above — it is only consulted on the
`dmet_steom` path, and an explicit `dmet_fragments` always takes priority.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| dmet_steom_auto_fragment | Auto-extract the chromophore fragment from CIS-NTO per-atom weights | bool | false |
| dmet_steom_auto_coverage | Cumulative per-atom NTO coverage target T | double | 0.92 |
| dmet_steom_auto_atom_floor | Per-atom NTO weight floor f (atoms below this are not candidates) | double | 0.01 |
| dmet_steom_auto_budget | Cluster orbital budget B (est. n_emb); 0 = auto per solver (canonical 460 / dlpno 700) | int | 0 |
| dmet_steom_auto_include_h | Attach bonded H to selected heavy atoms (default off: env C–H σ is covered by the Schmidt bath) | bool | false |
| dmet_steom_auto_n_cis | CIS state count for the extraction; 0 = auto (`max(steom_n_root_cis, n_excited_states+4)`) | int | 0 |
| dmet_steom_auto_max_expand | Max gauge-triggered fragment-expansion rounds (Phase B) | int | 1 |
| dmet_steom_auto_focus_states | Build the extraction NTO from only the lowest N CIS roots (0 = average over all n_cis); focuses the fragment on the target π→π*, avoiding n→π* contamination (RI path only) | int | 0 |
| dmet_steom_auto_json | Path to write per-state per-atom NTO localization as JSON (Phase C: for external state grouping / job splitting); empty = off (RI path only) | string | "" |
| dmet_steom_auto_xyz | Path to write the auto-selected chromophore fragment as an `.xyz` (paper / visualization); empty = off | string | "" |

The `dmet_steom_auto_json` output is consumed by `script/dmet_steom_group_states.py`, which
clusters the excited states by where they localize (cosine similarity of the per-atom vectors),
writes one fragment `.xyz` per spatial group, and emits a separate DMET-STEOM job per group — so
spatially distinct excitations (e.g. an anthraquinone π→π* and a remote n→π*) are solved in
independent clean clusters instead of one scattered state-average fragment.

The extraction prints a per-atom NTO weight table, the selected atoms with achieved coverage,
and warnings when the selection is floor-sensitive, hits the orbital budget, is delocalized
(above-floor atoms cannot reach the target → degenerates toward full STEOM), or spans more
than three disconnected regions (likely a mix of spatially distinct excitations). The
hoisted CIS-NTO is reused by the downstream NTO-bath gauge/augmentation (no recompute).

```bash
# CIS-guided auto fragment for DMET-STEOM (no manual --dmet_fragments)
gansu2 -x ../xyz/large_molecular/Doxorubicin.xyz -g cc-pvdz --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet_steom --n_excited_states 5 \
    --dmet_steom_auto_fragment 1 --dmet_cluster_solver dlpno --num_gpus 4
```

```bash
# Auto fragment detection, default tight tol
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet --num_gpus 4

# DMET-CCSD(T) — adds perturbative triples per fragment at μ_DMET
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet_ccsd_t --num_gpus 4

# Vayesta-compatible loose tolerance for benchmarking
gansu2 -x ../xyz/Benzene.xyz -g sto-3g --eri_method ri \
    -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method dmet --dmet_n_tol 4.2e-3

# Verbose per-fragment diagnostics (for debugging)
GANSU_DMET_VERBOSE=1 gansu2 ... --post_hf_method dmet
```


## DLPNO-CCSD / DLPNO-CCSD(T) parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| dlpno_preset | Truncation preset (`loose`, `normal`, `tight`, `very_tight`) — sets all `t_cut_*` cutoffs to ORCA-compatible values | string | normal |
| dlpno_localizer | Occupied localization method (`pm`, `boys`, `ibo`) | string | pm |
| dlpno_t_cut_pno | PNO occupation cutoff. `-1` = use preset value | double | -1 |
| dlpno_t_cut_do | PAO linear-dependence threshold (eigenvalue of the domain PAO overlap; presets use 1e-6 — unlike ORCA's TCutDO, a differential-overlap domain threshold). `-1` = preset | double | -1 |
| dlpno_t_cut_pairs | Strong/weak pair MP2 cutoff in Ha. `-1` = preset | double | -1 |
| dlpno_t_cut_mkn | Boughton-Pulay Mulliken cumulative threshold for domain selection. `-1` = preset | double | -1 |
| dlpno_t_cut_triples | Triple screening threshold for (T). `-1` = preset | double | -1 |
| dlpno_t_cut_tno | TNO occupation cutoff for (T). `-1` = preset | double | -1 |
| dlpno_pair_distance_cutoff | Pair distance pre-screening cutoff in Bohr. `0` = off | double | 15.0 |
| dlpno_max_iter | DLPNO-CCSD residual max iterations | int | 50 |
| dlpno_diis_size | DIIS subspace size for DLPNO-CCSD | int | 6 |
| dlpno_localizer_max_sweep | Pipek-Mezey / Boys Jacobi sweep upper bound | int | 200 |
| dlpno_localizer_conv | Localizer functional ΔL convergence threshold | double | 1e-10 |
| dlpno_lmp2_max_iter | LMP2 / CCSD T2 dressing iter max (shared cap) | int | 100 |
| dlpno_lmp2_conv | LMP2 residual convergence (max\|R\|) | double | 1e-8 |
| dlpno_sc_pno_iter | Self-consistent PNO refinement rounds (`0` = single-shot from semi-canonical guess) | int | 1 |
| dlpno_pno_os_only | PNO selection from opposite-spin amplitudes only (use with SOS-MP2 scaling) | bool | false |
| dlpno_verbose | `0`=summary, `1`=phase, `2`=per-pair profile, `3`=residual | int | 1 |
| export_lmo_molden | Write Pipek-Mezey localized occupied MOs to `output_lmo.molden` | bool | false |

DLPNO-CCSD and DLPNO-CCSD(T) (Riplinger, Neese, Pinski, Sandhoefer 2013/2016) achieve near-canonical CCSD(T) accuracy at near-linear scaling by exploiting four nested locality layers: (1) occupied LMOs (Pipek-Mezey), (2) projected atomic orbitals (PAO) + per-LMO atom domains, (3) per-pair PNO truncation, and (4) strong/weak-pair partitioning where weak pairs are reduced to MP2.

DLPNO-CCSD / DLPNO-CCSD(T) are implemented for the **closed-shell RHF** reference. DLPNO-MP2 also runs on a **UHF** reference (`-m uhf --post_hf_method dlpno_mp2`): the occupied orbitals of each spin are localised separately, the PAOs of a spin project out that spin's occupied space, αα / ββ / αβ pairs get their own PNOs (for αβ pairs separate α and β sides), and the PNOs come from the coupled LMP2 amplitudes in the domains (one self-consistent round, `dlpno_sc_pno_iter`). With all PNOs and full domains it reproduces canonical RI-UMP2. For αβ pairs each side's pair density also takes the other side's, carried over by the α/β virtual overlap (½ (T Tᵀ + M Tᵀ T Mᵀ), as the closed-shell ½ (T Tᵀ + Tᵀ T)); otherwise a pair whose integrals vanish by symmetry in one block (a σ LMO with a π LMO of a planar molecule) leaves directions empty that CCSD fills (`GANSU2_DLPNO_UHF_PNO_SYM=0` turns this off). DLPNO-CCSD on a UHF reference (`-m uhf --post_hf_method dlpno_ccsd`) solves the spin-orbital UCCSD equations projected onto these pair PNO spaces (the singles stay in the full virtual space) and adds the LMP2-level ΔE_PNO. The terms are still evaluated with the canonical spin-orbital tensors built from the AO integrals (nao⁴), so it has the truncation of DLPNO but the memory and time of canonical UCCSD: it is meant for small molecules and for measuring the truncation error. With all PNOs and full domains it reproduces canonical RI-UCCSD. Correlation energy above canonical (mEh, normal / very_tight): NH2 cc-pVDZ +0.05 / +0.03, phenyl radical cc-pVDZ +2.2 / +0.6. DLPNO-CCSD(T) on UHF and ROHF DLPNO are not available. The RI back-end (`--eri_method ri` plus an `-ag <aux>`) is required.

In the doubles residual, the ring (particle-hole) terms and the particle dressing contract the amplitudes of other pairs in their own PNO spaces with mixed-pair integrals, instead of projecting them into the PNO space of the output pair; with the projection a truncated calculation lands too shallow or too deep (benzene cc-pVDZ, normal: 1.4 mEh). The environment variables `GANSU2_DLPNO_RING_EXACT=0` (bare ring terms) and `GANSU2_DLPNO_DRESS_EXACT=0` (T2-dressed ring terms and particle dressing) restore the projected forms. The exact dressing keeps two AO intermediates of size (occupied × AO)² on the GPU and forms the rest for a chunk of occupied orbitals at a time (`GANSU2_DLPNO_DRESS_CHUNK` sets the chunk); when even that does not fit, the run keeps the projected dressing and prints a warning.

### dlpno_preset — ORCA-compatible preset values

| Preset | t_cut_pno | t_cut_do | t_cut_pairs | t_cut_triples | t_cut_tno |
| --- | --- | --- | --- | --- | --- |
| loose      | 1.0e-6   | 2.0e-2 | 1.0e-3 | 1.0e-6 | 1.0e-9  |
| normal     | 3.33e-7  | 1.0e-2 | 1.0e-4 | 1.0e-7 | 1.0e-9  |
| tight      | 1.0e-7   | 5.0e-3 | 1.0e-5 | 1.0e-8 | 1.0e-10 |
| very_tight | 1.0e-8   | 2.0e-3 | 1.0e-6 | 1.0e-9 | 1.0e-10 |

Individual `dlpno_t_cut_*` parameters override the preset when set to a non-negative value.

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

# Detailed per-section profile (debug)
gansu2 ... --post_hf_method dlpno_ccsd_t --dlpno_verbose 2

# Export Pipek-Mezey localized orbitals for visualization
gansu2 -x ../xyz/Benzene.xyz -g cc-pvdz --export_lmo_molden 1
```


## THC parameters

Used by `--post_hf_method thc_sos_adc2`. The grid+collocation+LS-THC infrastructure also serves the placeholder `thc_mp2` / `thc_sos_mp2` paths.

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| `thc_n_radial` | Treutler–Ahlrichs M3 radial points per atom | int | 50 |
| `thc_lebedev_order` | Lebedev angular order: 110, 194, or 302 | int | 194 |
| `thc_n_laplace` | Laplace quadrature points (THC-SOS-MP2; THC-SOS-ADC(2) uses the lt_sos_adc2 quadrature) | int | 12 |
| `thc_rel_cutoff` | LS-THC SVD relative cutoff for the rank of M | real | 1e-7 |
| `thc_sos_c_os` | Opposite-spin scaling factor for SOS-MP2 (ADC(2) uses internal 1.17) | real | 1.3 |
| `thc_density_threshold` | Drop grid points with electron density ρ ≤ threshold (Phase 2.3 (B)). 0 disables | real | 0 |
| `thc_b3a3`, `thc_b3`, `thc_a3` | Ignored since 2026-11-01 (terms of the former Coulomb-only THC-SOS-ADC(2) operator) | bool | |

### Recommended usage

* **THC-SOS-ADC(2)** — the full SOS-ADC(2)-s model on the THC integrals (since 2026-11-01; before, a Coulomb-only operator with a CIS M11 that gave CIS-level energies)
* **RI-Z path** — `--eri_method ri -ag <aux_basis>` selects the memory-light Phase 2.3 (A) path; the LS-THC core $Z$ is built from the RI 3-index tensor without ever materialising the analytic 4-index ERI. Multi-GPU is supported via auto-gather of `d_B_local_` to GPU 0
* **Density pruning** — `--thc_density_threshold 1e-8` typical. Drops grid points where the SCF density falls below threshold; preserves excitation-energy precision (8-digit agreement in H2O/sto-3g testing) and reduces N_g 3–10 %

### Memory budget

Per-GPU RAM cost on benzene/cc-pVDZ scale:

| Buffer | Size | n=15/L=194 (N_g=33232) |
| --- | --- | --- |
| 3 × N_g² | Y, ZY, T (Coulomb) | 26.5 GB |
| Z replica | LS-THC core | 8.8 GB |
| 3 × N_g² extra | B3+A3 (Z_occ, W, U) | 26.5 GB |
| Other (M, F, MT, X_mo, …) | ov × N_g · O(1) | ~1 GB |

A100 80 GB fits Coulomb-only at `thc_n_radial 20–25 / lebedev 194` and Coulomb+B3+A3 at `thc_n_radial 15 / lebedev 194` for benzene-class systems.

### Example

```bash
# Production: Phase 2.3 RI-Z + density pruning, Coulomb-only
gansu2 -x ../xyz/large_molecular/Benzene.xyz -g cc-pvdz -m RHF \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs \
    --post_hf_method thc_sos_adc2 \
    --n_excited_states 5 \
    --thc_n_radial 15 --thc_lebedev_order 194 --thc_n_laplace 8 \
    --thc_density_threshold 1e-8

```

## Hardware / backend parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| num_gpus | Number of GPUs for multi-GPU RI-HF | int | -1 |
| --cpu | Run entirely on CPU (no GPU required) | flag | off |
| --list-basis | List available built-in basis sets and exit | flag | — |

#### num_gpus - Number of GPUs for multi-GPU RI-HF

* default: -1 (auto-detect all visible GPUs)
* Multi-GPU parallelism is currently implemented for **RI-HF** (`eri_method = RI`) and **DMET fragment-parallel** execution. Other ERI methods (`stored`, `Direct`) run on a single GPU regardless of this setting
* Set to a positive integer to cap the number of GPUs used (e.g. `--num_gpus 2` on a 4-GPU node)
* For DMET, fragments are distributed across GPUs in Replicated mode (each GPU holds the full RI tensor) when memory permits; otherwise Distributed mode is used (RI tensor sharded by aux index, NCCL AllReduce for Fock build)

```bash
# Single-GPU RI-HF
gansu2 -x ../xyz/large_molecular/fullerene.xyz -g sto-3g \
    --eri_method ri -ag ../auxiliary_basis/cc-pvdz-rifit.gbs

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
* When the `--cpu` flag is passed, GANSU2 runs entirely on CPU using multi-threaded integral and tensor kernels. No NVIDIA GPU is required
* The number of CPU threads is taken from `GANSU2_NUM_THREADS`, else `OMP_NUM_THREADS`, else the CPUs the process may run on (its affinity mask). This applies to the host-side loops of GPU runs as well
* Supported: HF (RHF/UHF/ROHF), Kohn-Sham DFT (RKS / UKS / ROKS with every functional, Cartesian and spherical basis; J and the hybrid exchange from the stored ERI tensor), gradients (HF, MP2, Kohn-Sham, CCSD, CCSD(T), CIS, UMP2, UCCSD, UCCSD(T), UCIS), Hessians, the RHF post-HF energies (MP2/3/4, CCSD, CCSD(T), CIS, ADC(2), singlet and triplet EOM-CCSD / EOM-CC2 / EOM-MP2, FCI), the UHF / ROHF coupled cluster energies (UCCSD, UCCSD(T), UCIS, EOM-UCCSD EE / IP / EA, ROHF-CCSD / CCSD(T) / EOM-CCSD), external point charges (energies and gradients), C-PCM, DMET-CCSD
* GPU-only (a clear error under `--cpu`): periodic systems
* Performance is substantially lower than the GPU path; use for development, debugging, or environments without CUDA

```bash
gansu2 -x ../xyz/H2O.xyz -g sto-3g --cpu
gansu2 -x ../xyz/H2O.xyz -g sto-3g -r hessian --cpu
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method ccsd --cpu
```

#### --list-basis - List available basis sets

* Prints the names of all built-in basis sets shipped under `basis/` and exits without running a calculation
* Useful for discovering the exact basis name to pass to `-g`

```bash
gansu2 --list-basis
```


## ECP parameters

| Parameter | Description | Type | Default |
| --- | --- | --- | --- |
| ecp_filename | Path to ECP (Effective Core Potential) file | string | (none) |

#### ecp_filename - Effective Core Potential file

* default: (empty)
* **Most basis-set files already embed their ECP** — if the `.gbs` passed to `-g` contains `XX-ECP` blocks (e.g. `lanl2dz.gbs` has Cl/Br/I, `def2-svp.gbs` has I/Ir/Pt), the ECP is loaded and applied automatically; no `--ecp_filename` is needed. Which elements get an ECP is basis-dependent (e.g. def2 uses ECPs only for Z ≥ 37, so Br stays all-electron in def2-SVP but I uses a 28-electron-core ECP).
* `--ecp_filename` is the alternate route: load an ECP from a separate file (Gaussian-style ECP block convention, matching Basis Set Exchange). Useful when the basis `.gbs` has only orbital exponents.
* When an ECP is active, the listed elements' core electrons are replaced by a parameterized potential (`[ECP] N core electrons replaced ...` is printed) and the effective nuclear charge / electron count are reduced accordingly. Useful for heavy elements where relativistic / large-core effects matter.
* Works with both Cartesian and spherical (`--use_spherical`) bases, for energy and gradient.

```bash
# ECP embedded in the basis (no --ecp_filename needed)
gansu2 -x ../xyz/HI.xyz -g def2-svp                    # I: 28-core ECP, all-electron H
gansu2 -x ../xyz/HI.xyz -g def2-svp --use_spherical 1  # same, spherical basis

# ECP from a separate file
gansu2 -x ../xyz/heavy_atom.xyz -g cc-pvdz --ecp_filename ../basis/cc-pvdz-pp.ecp
```

