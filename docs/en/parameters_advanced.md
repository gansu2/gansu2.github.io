---
layout: default
title: Advanced parameters
nav_order: 5.5
lang: en
hreflang_alt: "ja/parameters_advanced"
hreflang_lang: "ja"
---

# Advanced parameters

These options tune solvers, thresholds and algorithms. The defaults are chosen to work for typical
calculations, and most users never need to change them. The commonly used options are described on the
[Parameters](parameters.md) page.

They are given in the same way as the other parameters: `--name value` on the command line, in a parameter
recipe file, or as keyword arguments in the Python API.

## SCF

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| schwarz_screening_threshold | double | 1.0e-12 | Two-electron integrals whose Schwarz bound $\sqrt{(\mu\nu\|\mu\nu)}\sqrt{(\lambda\sigma\|\lambda\sigma)}$ is below this value are skipped |
| soscf_start_threshold | double | 1.0e-4 | Energy change below which `convergence_method SOSCF` switches from DIIS to second-order steps |
| diis_include_transform | bool | false | Use the orthogonalized DIIS error $X(FPS-SPF)X^T$ instead of $FPS-SPF$ |
| rohf_parameter_name | string | Roothaan | ROHF Fock-matrix parameter set (see the table below) |
| lindep_threshold | double | 0 | Remove basis directions with overlap eigenvalue below this value (canonical orthogonalization; ~1e-7 for near-linearly-dependent bases; 0 = off). Energies only |
| int1e_method | string | hybrid | One-electron integral algorithm: `md` (McMurchie-Davidson), `os` (Obara-Saika), `hybrid` |
| eri_kernel_policy | string | auto | Integral algorithm per shell class for stored ERIs: `auto`, or a list such as `dddd=md,*=auto` (`hgp`, `rys`, `md`) |
| hash_fock_method | string | compact | Fock build for `eri_method hash`: `compact`, `indexed`, `fullscan` |

ROHF parameter sets (`rohf_parameter_name`):

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

## DFT

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| grid_scheme | string | treutler | Radial quadrature: `treutler`, `sg1`, `mura_knowles`, `gauss_chebyshev`, `delley` (`sg1` is a fixed grid and ignores `grid_level`) |
| dft_j_backend | string | auto | Coulomb-matrix build: `auto` (follows `eri_method`), `stored_j`, `direct_j`, `ri_j`, `direct_ri_j` (the RI variants need `-ag`) |
| dft_vxc_backend | string | grouped_v | Exchange-correlation potential build: `grouped_v`, `direct_v`, `stored_v` |
| dft_bin_capacity | int | 256 | Maximum number of grid points per group |

## Post-HF

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| fp64_emulation | string | auto | Emulated double precision on tensor cores for the large matrix products of `tensor_path`: `off`, `on`, `auto` (on for GPUs with low FP64 throughput). Results agree with native FP64 |

## Excited states

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| adc2_solver | string | auto | ADC(2) solver: `auto` (by GPU memory), `full` (singles+doubles Davidson), `schur_omega` (frequency-dependent Schur complement), `schur_static` (Schur complement at ω = 0; fastest, approximate) |
| eom_mp2_solver | string | auto | EOM-MP2 solver: same choices as `adc2_solver` |
| eom_cc2_solver | string | auto | EOM-CC2 solver: same choices as `adc2_solver` (`schur_omega` is exact for EOM-CC2) |
| adc_c_t | double | 1.3 | SOS-ADC(2): opposite-spin amplitude scaling $c_T$ |
| adc_c_c | double | 1.17 | SOS-ADC(2): opposite-spin coupling scaling $c_c$ |
| cis_nto_n_root_cis | int | 0 | CIS states averaged for the NTO active space (0 = `n_excited_states` + 4) |
| steom_n_root_cis | int | 0 | CIS states used by STEOM-CCSD (0 = `n_excited_states` + 4) |
| ip_eom_d_tol | double | 1.0e-5 | IP-EOM-CCSD: eigenvalue convergence |
| ip_eom_r_tol | double | 1.0e-7 | IP-EOM-CCSD: residual convergence |
| ip_eom_max_iter | int | 500 | IP-EOM-CCSD: maximum iterations |
| ea_eom_d_tol | double | 1.0e-5 | EA-EOM-CCSD: eigenvalue convergence |
| ea_eom_r_tol | double | 1.0e-7 | EA-EOM-CCSD: residual convergence |
| ea_eom_max_iter | int | 500 | EA-EOM-CCSD: maximum iterations |
| steom_d_tol | double | 1.0e-5 | STEOM-CCSD: eigenvalue convergence |
| steom_r_tol | double | 1.0e-7 | STEOM-CCSD: residual convergence |
| steom_max_iter | int | 500 | STEOM-CCSD: maximum iterations |

```bash
# ADC(2) with the full Davidson solver
gansu2 -x ../xyz/H2O.xyz -g cc-pvdz --post_hf_method adc2 --adc2_solver full
```

## Solvation

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| pcm_lebedev | int | 302 | Lebedev points per atomic sphere of the PCM cavity: 110, 194, 302 |
| pcm_include_mm | bool | false | The external point charges (`point_charges`) also polarize the continuum |

## DLPNO

For each `dlpno_t_cut_*`, `-1` means the value of `dlpno_preset`.

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| dlpno_localizer | string | pm | Occupied orbital localization: `pm` (Pipek-Mezey), `boys` (Foster-Boys), `ibo` |
| dlpno_t_cut_pno | double | -1 | PNO occupation cutoff |
| dlpno_t_cut_do | double | -1 | Linear-dependence cutoff of the domain PAOs (presets: 1e-6) |
| dlpno_t_cut_pairs | double | -1 | Strong/weak pair cutoff on the MP2 pair energy (Hartree) |
| dlpno_t_cut_mkn | double | -1 | Mulliken population threshold for the orbital domains |
| dlpno_t_cut_triples | double | -1 | (T): triples with a smaller estimated contribution are skipped (0 = off) |
| dlpno_t_cut_tno | double | -1 | (T): TNO occupation cutoff (0 = off) |
| dlpno_pair_distance_cutoff | double | 15.0 | Pairs whose orbital centres are farther apart (Bohr) are dropped (0 = off) |
| dlpno_max_iter | int | 100 | Maximum DLPNO-CCSD iterations |
| dlpno_diis_size | int | 6 | DIIS subspace size for DLPNO-CCSD |
| dlpno_sc_pno_iter | int | 1 | Rounds of self-consistent PNO refinement (0 = single-shot) |
| dlpno_pno_os_only | bool | false | Select PNOs from the opposite-spin amplitudes only (use with SOS-MP2 scaling) |

## DMET

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| dmet_threshold | double | 1.0e-6 | Bath orbitals with singular value below this are discarded |
| dmet_n_tol | double | 1.0e-5 | Tolerance on the total electron number in the μ search (4.2e-3 for benzene matches Vayesta's default) |
| dmet_mu_refine_ccsd | bool | false | Two-step μ optimization: HF density, then CCSD density |

## Periodic systems

| Parameter | Type | Default | Description |
| --- | --- | --- | --- |
| pbc_jk_backend | string | tensor | Gamma-point J/K build: `tensor`, or `direct` (recommended for 3D cells) |
| pbc_mp2_backend | string | exact | Gamma-point MP2: `exact`, or `ri` (needs `-ag`; much faster, small fitting error) |
| pbc_eta | double | 0.1 | Ewald splitting parameter; affects cost only (≤ 0 = automatic, for large cells) |
| pbc_rcut | double | 40.0 | Real-space lattice-sum cutoff (Bohr) |
| pbc_gcut_sigma | double | 7.0 | Reciprocal-space cutoff: $\|G\| \le 2\sqrt{\eta}\,\times$ this |
| pbc_xc_grid_reach | double | 25.0 | k-point DFT: neighbour search radius of the integration grid (Bohr); ~12 for small 3D cells |

