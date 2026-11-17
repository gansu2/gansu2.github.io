---
layout: default
title: Methods and references
nav_order: 79
lang: en
hreflang_alt: "ja/methods_references"
hreflang_lang: "ja"
description: "The original papers behind the methods in GANSU2, and where GANSU2 follows a particular variant or implementation."
---

# Methods and references
{: .no_toc }

The methods in GANSU2 come from the literature below. When you publish results computed with GANSU2, please cite
the papers of the methods you used together with GANSU2 itself (see [Publications]({{ '/en/publications/' | relative_url }})).
Where GANSU2 implements a particular variant, or follows another program's conventions, the note says so.

Every reference was checked against its Crossref record or the publisher (November 2026).

1. TOC
{:toc}

## SCF

* **RHF, UHF, ROHF**
  * C. C. J. Roothaan, Rev. Mod. Phys. 23, 69 (1951). [doi:10.1103/RevModPhys.23.69](https://doi.org/10.1103/RevModPhys.23.69)
  * G. G. Hall, Proc. R. Soc. A 205, 541 (1951). [doi:10.1098/rspa.1951.0048](https://doi.org/10.1098/rspa.1951.0048)
  * J. A. Pople, R. K. Nesbet, J. Chem. Phys. 22, 571 (1954). [doi:10.1063/1.1740120](https://doi.org/10.1063/1.1740120)
  * C. C. J. Roothaan, Rev. Mod. Phys. 32, 179 (1960). [doi:10.1103/RevModPhys.32.179](https://doi.org/10.1103/RevModPhys.32.179)
* **ROHF coupling-coefficient sets** (`rohf_parameter_name`; default Roothaan). The sets are those compared in
  * C. F. Glaesemann, M. W. Schmidt, J. Phys. Chem. A 114, 8772 (2010). [doi:10.1021/jp101758y](https://doi.org/10.1021/jp101758y)
  * and their originals, among them R. McWeeny, G. Diercksen, J. Chem. Phys. 49, 4852 (1968) [doi:10.1063/1.1669970](https://doi.org/10.1063/1.1669970); M. F. Guest, V. R. Saunders, Mol. Phys. 28, 819 (1974) [doi:10.1080/00268977400102171](https://doi.org/10.1080/00268977400102171); J. S. Binkley, J. A. Pople, P. A. Dobosh, Mol. Phys. 28, 1423 (1974) [doi:10.1080/00268977400102701](https://doi.org/10.1080/00268977400102701); E. R. Davidson, Chem. Phys. Lett. 21, 565 (1973) [doi:10.1016/0009-2614(73)80309-4](https://doi.org/10.1016/0009-2614(73)80309-4); B. N. Plakhutin, E. V. Gorelik, N. N. Breslavskaya, J. Chem. Phys. 125, 204110 (2006) [doi:10.1063/1.2393223](https://doi.org/10.1063/1.2393223).
* **DIIS**
  * P. Pulay, Chem. Phys. Lett. 73, 393 (1980). [doi:10.1016/0009-2614(80)80396-4](https://doi.org/10.1016/0009-2614(80)80396-4)
  * P. Pulay, J. Comput. Chem. 3, 556 (1982). [doi:10.1002/jcc.540030413](https://doi.org/10.1002/jcc.540030413)
* **EDIIS, ADIIS**
  * K. N. Kudin, G. E. Scuseria, E. Cancès, J. Chem. Phys. 116, 8255 (2002). [doi:10.1063/1.1470195](https://doi.org/10.1063/1.1470195)
  * X. Hu, W. Yang, J. Chem. Phys. 132, 054109 (2010). [doi:10.1063/1.3304922](https://doi.org/10.1063/1.3304922)
* **Damping, optimal damping**
  * M. C. Zerner, M. Hehenberger, Chem. Phys. Lett. 62, 550 (1979). [doi:10.1016/0009-2614(79)80761-7](https://doi.org/10.1016/0009-2614(79)80761-7)
  * E. Cancès, C. Le Bris, Int. J. Quantum Chem. 79, 82 (2000). [doi:10.1002/1097-461X(2000)79:2<82::AID-QUA3>3.0.CO;2-I](https://doi.org/10.1002/1097-461X(2000)79:2%3C82::AID-QUA3%3E3.0.CO;2-I)
* **Second-order SCF** (Newton steps with a diagonal orbital-energy Hessian after DIIS)
  * G. B. Bacskay, Chem. Phys. 61, 385 (1981). [doi:10.1016/0301-0104(81)85156-7](https://doi.org/10.1016/0301-0104(81)85156-7)
* **Initial guesses.** GWH: M. Wolfsberg, L. Helmholz, J. Chem. Phys. 20, 837 (1952) [doi:10.1063/1.1700580](https://doi.org/10.1063/1.1700580).
  SAD: J. H. Van Lenthe, R. Zwaans, H. J. J. Van Dam, M. F. Guest, J. Comput. Chem. 27, 926 (2006) [doi:10.1002/jcc.20393](https://doi.org/10.1002/jcc.20393).
  MINAO projects the atomic occupations of the ANO-RCC-MB basis (see [Basis sets](#basis-sets)).

## Integrals

* **Rys quadrature** (two-electron integrals and their derivatives). The roots come from the modified Chebyshev
  algorithm over Boys-function moments, with a precomputed table up to 13 roots.
  * M. Dupuis, J. Rys, H. F. King, J. Chem. Phys. 65, 111 (1976). [doi:10.1063/1.432807](https://doi.org/10.1063/1.432807)
  * J. Rys, M. Dupuis, H. F. King, J. Comput. Chem. 4, 154 (1983). [doi:10.1002/jcc.540040206](https://doi.org/10.1002/jcc.540040206)
  * W. Gautschi, SIAM J. Sci. Stat. Comput. 3, 289 (1982). [doi:10.1137/0903018](https://doi.org/10.1137/0903018)
* **McMurchie–Davidson** (one-electron integrals, ECP, and a fallback for two-electron integrals)
  * L. E. McMurchie, E. R. Davidson, J. Comput. Phys. 26, 218 (1978). [doi:10.1016/0021-9991(78)90092-X](https://doi.org/10.1016/0021-9991(78)90092-X)
* **Obara–Saika** (one-electron integrals, ECP)
  * S. Obara, A. Saika, J. Chem. Phys. 84, 3963 (1986). [doi:10.1063/1.450106](https://doi.org/10.1063/1.450106)
  * S. Obara, A. Saika, J. Chem. Phys. 89, 1540 (1988). [doi:10.1063/1.455717](https://doi.org/10.1063/1.455717)
* **Boys function**: S. F. Boys, Proc. R. Soc. A 200, 542 (1950). [doi:10.1098/rspa.1950.0036](https://doi.org/10.1098/rspa.1950.0036)
  (GPU evaluation: see Publications.)
* **Integral screening and direct SCF**
  * J. Almlöf, K. Faegri, K. Korsell, J. Comput. Chem. 3, 385 (1982). [doi:10.1002/jcc.540030314](https://doi.org/10.1002/jcc.540030314)
  * M. Häser, R. Ahlrichs, J. Comput. Chem. 10, 104 (1989). [doi:10.1002/jcc.540100111](https://doi.org/10.1002/jcc.540100111)
* **Spherical harmonics**: H. B. Schlegel, M. J. Frisch, Int. J. Quantum Chem. 54, 83 (1995). [doi:10.1002/qua.560540202](https://doi.org/10.1002/qua.560540202)
* **Resolution of the identity (density fitting)**: RI-J, RI-K, direct RI.
  * J. L. Whitten, J. Chem. Phys. 58, 4496 (1973). [doi:10.1063/1.1679012](https://doi.org/10.1063/1.1679012)
  * B. I. Dunlap, J. W. D. Connolly, J. R. Sabin, J. Chem. Phys. 71, 3396 (1979). [doi:10.1063/1.438728](https://doi.org/10.1063/1.438728)
  * O. Vahtras, J. Almlöf, M. W. Feyereisen, Chem. Phys. Lett. 213, 514 (1993). [doi:10.1016/0009-2614(93)89151-7](https://doi.org/10.1016/0009-2614(93)89151-7)
  * K. Eichkorn, O. Treutler, H. Öhm, M. Häser, R. Ahlrichs, Chem. Phys. Lett. 240, 283 (1995). [doi:10.1016/0009-2614(95)00621-A](https://doi.org/10.1016/0009-2614(95)00621-A)
  * F. Weigend, Phys. Chem. Chem. Phys. 4, 4285 (2002). [doi:10.1039/b204199p](https://doi.org/10.1039/b204199p)
* **AutoAux** auxiliary basis (`-ag autoaux`). The paper's Eq. 9 is used with ⟨r⟩² (the published form has ⟨r⟩).
  * G. L. Stoychev, A. A. Auer, F. Neese, J. Chem. Theory Comput. 13, 554 (2017). [doi:10.1021/acs.jctc.6b01041](https://doi.org/10.1021/acs.jctc.6b01041)

## Density functional theory

* **Kohn–Sham**: W. Kohn, L. J. Sham, Phys. Rev. 140, A1133 (1965). [doi:10.1103/PhysRev.140.A1133](https://doi.org/10.1103/PhysRev.140.A1133)
* **Functionals.** Implemented in GANSU2 itself (derivatives by automatic differentiation) and checked against
  Libxc: S. Lehtola, C. Steigemann, M. J. T. Oliveira, M. A. L. Marques, SoftwareX 7, 1 (2018) [doi:10.1016/j.softx.2017.11.002](https://doi.org/10.1016/j.softx.2017.11.002).
  * VWN: S. H. Vosko, L. Wilk, M. Nusair, Can. J. Phys. 58, 1200 (1980). [doi:10.1139/p80-159](https://doi.org/10.1139/p80-159)
  * PW92: J. P. Perdew, Y. Wang, Phys. Rev. B 45, 13244 (1992). [doi:10.1103/PhysRevB.45.13244](https://doi.org/10.1103/PhysRevB.45.13244)
  * PBE: J. P. Perdew, K. Burke, M. Ernzerhof, Phys. Rev. Lett. 77, 3865 (1996). [doi:10.1103/PhysRevLett.77.3865](https://doi.org/10.1103/PhysRevLett.77.3865)
  * B88: A. D. Becke, Phys. Rev. A 38, 3098 (1988). [doi:10.1103/PhysRevA.38.3098](https://doi.org/10.1103/PhysRevA.38.3098)
  * LYP: C. Lee, W. Yang, R. G. Parr, Phys. Rev. B 37, 785 (1988) [doi:10.1103/PhysRevB.37.785](https://doi.org/10.1103/PhysRevB.37.785), in the form of B. Miehlich, A. Savin, H. Stoll, H. Preuss, Chem. Phys. Lett. 157, 200 (1989) [doi:10.1016/0009-2614(89)87234-3](https://doi.org/10.1016/0009-2614(89)87234-3)
  * B3LYP: A. D. Becke, J. Chem. Phys. 98, 5648 (1993) [doi:10.1063/1.464913](https://doi.org/10.1063/1.464913); P. J. Stephens, F. J. Devlin, C. F. Chabalowski, M. J. Frisch, J. Phys. Chem. 98, 11623 (1994) [doi:10.1021/j100096a001](https://doi.org/10.1021/j100096a001). `b3lyp` uses VWN-RPA (as Gaussian and PySCF do), `b3lyp5` VWN5 (as ORCA and Turbomole do).
  * PBE0: C. Adamo, V. Barone, J. Chem. Phys. 110, 6158 (1999). [doi:10.1063/1.478522](https://doi.org/10.1063/1.478522)
  * SCAN: J. Sun, A. Ruzsinszky, J. P. Perdew, Phys. Rev. Lett. 115, 036402 (2015). [doi:10.1103/PhysRevLett.115.036402](https://doi.org/10.1103/PhysRevLett.115.036402)
  * HSE06 (periodic systems): J. Heyd, G. E. Scuseria, M. Ernzerhof, J. Chem. Phys. 118, 8207 (2003) [doi:10.1063/1.1564060](https://doi.org/10.1063/1.1564060), erratum 124, 219906 (2006) [doi:10.1063/1.2204597](https://doi.org/10.1063/1.2204597); A. V. Krukau, O. A. Vydrov, A. F. Izmaylov, G. E. Scuseria, J. Chem. Phys. 125, 224106 (2006) [doi:10.1063/1.2404663](https://doi.org/10.1063/1.2404663). GANSU2 uses the ωPBE exchange hole of T. M. Henderson, B. G. Janesko, G. E. Scuseria, J. Chem. Phys. 128, 194105 (2008) [doi:10.1063/1.2921797](https://doi.org/10.1063/1.2921797), not the hole of the original paper (the two differ by about 1e-3 at ω = 0.11).
* **Integration grids.** The grid levels, radial formulas and NWChem-style pruning follow PySCF (see [Implementation basis](#implementation-basis)).
  * Becke partitioning: A. D. Becke, J. Chem. Phys. 88, 2547 (1988) [doi:10.1063/1.454033](https://doi.org/10.1063/1.454033), with Bragg–Slater radii: J. C. Slater, J. Chem. Phys. 41, 3199 (1964) [doi:10.1063/1.1725697](https://doi.org/10.1063/1.1725697)
  * Lebedev angular grids: V. I. Lebedev, D. N. Laikov, Dokl. Math. 59, 477 (1999).
  * Treutler–Ahlrichs radial grid (default): O. Treutler, R. Ahlrichs, J. Chem. Phys. 102, 346 (1995). [doi:10.1063/1.469408](https://doi.org/10.1063/1.469408)
  * Mura–Knowles: M. E. Mura, P. J. Knowles, J. Chem. Phys. 104, 9848 (1996) [doi:10.1063/1.471749](https://doi.org/10.1063/1.471749). The scale factor is 7.0 for groups 1–2 and 5.2 (PySCF's value) for the other elements; the paper uses 5.0.
  * Gauss–Chebyshev (as in PySCF): M. Krack, A. M. Köster, J. Chem. Phys. 108, 3226 (1998). [doi:10.1063/1.475719](https://doi.org/10.1063/1.475719)
  * SG-1: P. M. W. Gill, B. G. Johnson, J. A. Pople, Chem. Phys. Lett. 209, 506 (1993) [doi:10.1016/0009-2614(93)80125-9](https://doi.org/10.1016/0009-2614(93)80125-9), here with the weights of R. E. Stratmann, G. E. Scuseria, M. J. Frisch, Chem. Phys. Lett. 257, 213 (1996) [doi:10.1016/0009-2614(96)00600-8](https://doi.org/10.1016/0009-2614(96)00600-8).

## Ground-state correlation

* **MP2**: C. Møller, M. S. Plesset, Phys. Rev. 46, 618 (1934). [doi:10.1103/PhysRev.46.618](https://doi.org/10.1103/PhysRev.46.618)
* **RI-MP2**
  * M. Feyereisen, G. Fitzgerald, A. Komornicki, Chem. Phys. Lett. 208, 359 (1993). [doi:10.1016/0009-2614(93)87156-W](https://doi.org/10.1016/0009-2614(93)87156-W)
  * F. Weigend, M. Häser, Theor. Chem. Acc. 97, 331 (1997). [doi:10.1007/s002140050269](https://doi.org/10.1007/s002140050269)
* **SCS-MP2** (c_OS = 6/5, c_SS = 1/3): S. Grimme, J. Chem. Phys. 118, 9095 (2003). [doi:10.1063/1.1569242](https://doi.org/10.1063/1.1569242)
* **SOS-MP2** (c_OS = 1.3): Y. Jung, R. C. Lochan, A. D. Dutoi, M. Head-Gordon, J. Chem. Phys. 121, 9793 (2004). [doi:10.1063/1.1809602](https://doi.org/10.1063/1.1809602)
* **Laplace-transform MP2 and SOS-MP2.** The quadrature is a double-exponential substitution with the trapezoidal rule, not the minimax quadrature.
  * J. Almlöf, Chem. Phys. Lett. 181, 319 (1991). [doi:10.1016/0009-2614(91)80078-C](https://doi.org/10.1016/0009-2614(91)80078-C)
  * M. Häser, J. Almlöf, J. Chem. Phys. 96, 489 (1992). [doi:10.1063/1.462485](https://doi.org/10.1063/1.462485)
  * H. Takahasi, M. Mori, Publ. RIMS Kyoto Univ. 9, 721 (1973). [doi:10.2977/prims/1195192451](https://doi.org/10.2977/prims/1195192451)
* **MP3**: J. A. Pople, J. S. Binkley, R. Seeger, Int. J. Quantum Chem. Symp. 10, 1 (1976). [doi:10.1002/qua.560100802](https://doi.org/10.1002/qua.560100802)
* **MP4 (SDTQ)**: R. Krishnan, J. A. Pople, Int. J. Quantum Chem. 14, 91 (1978) [doi:10.1002/qua.560140109](https://doi.org/10.1002/qua.560140109); R. Krishnan, M. J. Frisch, J. A. Pople, J. Chem. Phys. 72, 4244 (1980) [doi:10.1063/1.439657](https://doi.org/10.1063/1.439657)
* **MP2 gradients**: N. C. Handy, H. F. Schaefer, J. Chem. Phys. 81, 5031 (1984). [doi:10.1063/1.447489](https://doi.org/10.1063/1.447489) The relaxed densities follow PySCF.
* **CC2**: O. Christiansen, H. Koch, P. Jørgensen, Chem. Phys. Lett. 243, 409 (1995). [doi:10.1016/0009-2614(95)00841-Q](https://doi.org/10.1016/0009-2614(95)00841-Q)
* **CCSD**
  * G. D. Purvis, R. J. Bartlett, J. Chem. Phys. 76, 1910 (1982). [doi:10.1063/1.443164](https://doi.org/10.1063/1.443164)
  * G. E. Scuseria, C. L. Janssen, H. F. Schaefer, J. Chem. Phys. 89, 7382 (1988). [doi:10.1063/1.455269](https://doi.org/10.1063/1.455269)
  * J. F. Stanton, J. Gauss, J. D. Watts, R. J. Bartlett, J. Chem. Phys. 94, 4334 (1991). [doi:10.1063/1.460620](https://doi.org/10.1063/1.460620)
* **CCSD(T)**: K. Raghavachari, G. W. Trucks, J. A. Pople, M. Head-Gordon, Chem. Phys. Lett. 157, 479 (1989). [doi:10.1016/S0009-2614(89)87395-6](https://doi.org/10.1016/S0009-2614(89)87395-6)
  ROHF reference (semicanonical orbitals): J. D. Watts, J. Gauss, R. J. Bartlett, J. Chem. Phys. 98, 8718 (1993). [doi:10.1063/1.464480](https://doi.org/10.1063/1.464480)
* **CCSD Λ equations, densities and gradients**: E. A. Salter, G. W. Trucks, R. J. Bartlett, J. Chem. Phys. 90, 1752 (1989). [doi:10.1063/1.456069](https://doi.org/10.1063/1.456069)
  UCCSD and the CC gradients follow PySCF.
* **Full CI.** String-based with link tables. The open-shell solver follows PySCF's `direct_spin1`.
  * P. J. Knowles, N. C. Handy, Chem. Phys. Lett. 111, 315 (1984). [doi:10.1016/0009-2614(84)85513-X](https://doi.org/10.1016/0009-2614(84)85513-X)
  * J. Olsen, B. O. Roos, P. Jørgensen, H. J. Aa. Jensen, J. Chem. Phys. 89, 2185 (1988). [doi:10.1063/1.455063](https://doi.org/10.1063/1.455063)

## Local correlation (DLPNO)

DLPNO-MP2, DLPNO-CCSD and DLPNO-CCSD(T) with Pipek–Mezey localization, PAO domains, PNOs from the LMP2 pair density,
strong / weak pairs, and the four ORCA-style presets. The triples are the semicanonical (T0); the iterative (T1) is not implemented.

* PNO methods: F. Neese, F. Wennmohs, A. Hansen, J. Chem. Phys. 130, 114108 (2009) [doi:10.1063/1.3086717](https://doi.org/10.1063/1.3086717); F. Neese, A. Hansen, D. G. Liakos, J. Chem. Phys. 131, 064103 (2009) [doi:10.1063/1.3173827](https://doi.org/10.1063/1.3173827)
* DLPNO-CCSD: C. Riplinger, F. Neese, J. Chem. Phys. 138, 034106 (2013). [doi:10.1063/1.4773581](https://doi.org/10.1063/1.4773581)
* DLPNO-CCSD(T0): C. Riplinger, B. Sandhoefer, A. Hansen, F. Neese, J. Chem. Phys. 139, 134101 (2013). [doi:10.1063/1.4821834](https://doi.org/10.1063/1.4821834)
* C. Riplinger, P. Pinski, U. Becker, E. F. Valeev, F. Neese, J. Chem. Phys. 144, 024109 (2016). [doi:10.1063/1.4939030](https://doi.org/10.1063/1.4939030)
* DLPNO-MP2: P. Pinski, C. Riplinger, E. F. Valeev, F. Neese, J. Chem. Phys. 143, 034108 (2015). [doi:10.1063/1.4926879](https://doi.org/10.1063/1.4926879)
* Open shell: M. Saitow, U. Becker, C. Riplinger, E. F. Valeev, F. Neese, J. Chem. Phys. 146, 164105 (2017). [doi:10.1063/1.4981521](https://doi.org/10.1063/1.4981521) (On UHF / ROHF, GANSU2's DLPNO-CCSD(T) solves UCCSD in the PNO space; it is not this paper's algorithm.)
* Presets: D. G. Liakos, M. Sparta, M. K. Kesharwani, J. M. L. Martin, F. Neese, J. Chem. Theory Comput. 11, 1525 (2015). [doi:10.1021/ct501129s](https://doi.org/10.1021/ct501129s)
* Densities: A. Datta, S. Kossmann, F. Neese, J. Chem. Phys. 145, 114101 (2016). [doi:10.1063/1.4962369](https://doi.org/10.1063/1.4962369)
* Pipek–Mezey: J. Pipek, P. G. Mezey, J. Chem. Phys. 90, 4916 (1989). [doi:10.1063/1.456588](https://doi.org/10.1063/1.456588)
* Domains: J. W. Boughton, P. Pulay, J. Comput. Chem. 14, 736 (1993). [doi:10.1002/jcc.540140615](https://doi.org/10.1002/jcc.540140615)

## Embedding (DMET)

* **DMET-CCSD, DMET-CCSD(T)**
  * G. Knizia, G. K.-L. Chan, Phys. Rev. Lett. 109, 186404 (2012). [doi:10.1103/PhysRevLett.109.186404](https://doi.org/10.1103/PhysRevLett.109.186404)
  * G. Knizia, G. K.-L. Chan, J. Chem. Theory Comput. 9, 1428 (2013). [doi:10.1021/ct301044e](https://doi.org/10.1021/ct301044e)
  * S. Wouters, C. A. Jiménez-Hoyos, Q. Sun, G. K.-L. Chan, J. Chem. Theory Comput. 12, 2706 (2016). [doi:10.1021/acs.jctc.6b00316](https://doi.org/10.1021/acs.jctc.6b00316)
  * Democratic energy partition: M. Nusspickel, G. H. Booth, Phys. Rev. X 12, 011046 (2022). [doi:10.1103/PhysRevX.12.011046](https://doi.org/10.1103/PhysRevX.12.011046)

## Multireference

* **CASSCF.** Two-step: trust-region Newton orbital steps with truncated conjugate gradients, and a Davidson CI solver.
  * B. O. Roos, P. R. Taylor, P. E. M. Siegbahn, Chem. Phys. 48, 157 (1980). [doi:10.1016/0301-0104(80)80045-0](https://doi.org/10.1016/0301-0104(80)80045-0)
  * T. Steihaug, SIAM J. Numer. Anal. 20, 626 (1983). [doi:10.1137/0720042](https://doi.org/10.1137/0720042)
  * Olsen et al. (1988), above, for the σ vector
  * P. Pulay, T. P. Hamilton, J. Chem. Phys. 88, 4926 (1988). [doi:10.1063/1.454704](https://doi.org/10.1063/1.454704)
  * Root tracking: R. Jonker, A. Volgenant, Computing 38, 325 (1987). [doi:10.1007/BF02278710](https://doi.org/10.1007/BF02278710)

## Excited states

* **Davidson diagonalization**: E. R. Davidson, J. Comput. Phys. 17, 87 (1975) [doi:10.1016/0021-9991(75)90065-0](https://doi.org/10.1016/0021-9991(75)90065-0);
  non-symmetric: K. Hirao, H. Nakatsuji, J. Comput. Phys. 45, 246 (1982) [doi:10.1016/0021-9991(82)90119-X](https://doi.org/10.1016/0021-9991(82)90119-X).
* **CIS**: J. B. Foresman, M. Head-Gordon, J. A. Pople, M. J. Frisch, J. Phys. Chem. 96, 135 (1992). [doi:10.1021/j100180a030](https://doi.org/10.1021/j100180a030)
* **CIS(D)**: M. Head-Gordon, R. J. Rico, M. Oumi, T. J. Lee, Chem. Phys. Lett. 219, 21 (1994). [doi:10.1016/0009-2614(94)00070-0](https://doi.org/10.1016/0009-2614(94)00070-0)
* **Natural transition orbitals**: R. L. Martin, J. Chem. Phys. 118, 4775 (2003). [doi:10.1063/1.1558471](https://doi.org/10.1063/1.1558471)
* **ADC(2)-s, ADC(2)-x**
  * J. Schirmer, Phys. Rev. A 26, 2395 (1982). [doi:10.1103/PhysRevA.26.2395](https://doi.org/10.1103/PhysRevA.26.2395)
  * A. B. Trofimov, J. Schirmer, J. Phys. B 28, 2299 (1995). [doi:10.1088/0953-4075/28/12/003](https://doi.org/10.1088/0953-4075/28/12/003)
  * J. Schirmer, A. B. Trofimov, J. Chem. Phys. 120, 11449 (2004). [doi:10.1063/1.1752875](https://doi.org/10.1063/1.1752875)
  * Review: A. Dreuw, M. Wormit, WIREs Comput. Mol. Sci. 5, 82 (2015). [doi:10.1002/wcms.1206](https://doi.org/10.1002/wcms.1206)
* **ω-dependent effective matrix** (`adc2_solver schur_omega`, also EOM-CC2): C. Hättig, F. Weigend, J. Chem. Phys. 113, 5154 (2000). [doi:10.1063/1.1290013](https://doi.org/10.1063/1.1290013)
* **SOS-ADC(2)** (`adc_c_c` 1.17, `adc_c_t` 1.3, as in Q-Chem): C. M. Krauter, M. Pernpointner, A. Dreuw, J. Chem. Phys. 138, 044107 (2013) [doi:10.1063/1.4776675](https://doi.org/10.1063/1.4776675); the scaling factor 1.3 of Jung et al. (2004), above.
  Laplace-transformed form: N. O. C. Winter, C. Hättig, J. Chem. Phys. 134, 184101 (2011) [doi:10.1063/1.3584177](https://doi.org/10.1063/1.3584177).
* **EOM-MP2**: J. F. Stanton, J. Gauss, J. Chem. Phys. 103, 1064 (1995). [doi:10.1063/1.469817](https://doi.org/10.1063/1.469817)
* **EOM-CC2**: Christiansen, Koch, Jørgensen (1995) and Hättig, Weigend (2000), above.
* **EOM-CCSD**: J. F. Stanton, R. J. Bartlett, J. Chem. Phys. 98, 7029 (1993). [doi:10.1063/1.464746](https://doi.org/10.1063/1.464746)
* **IP-EOM-CCSD** (σ vector as in PySCF's `eom_rccsd`)
  * J. F. Stanton, J. Gauss, J. Chem. Phys. 101, 8938 (1994). [doi:10.1063/1.468022](https://doi.org/10.1063/1.468022)
  * M. Nooijen, J. G. Snijders, J. Chem. Phys. 102, 1681 (1995). [doi:10.1063/1.468900](https://doi.org/10.1063/1.468900)
* **EA-EOM-CCSD** (σ vector as in PySCF): M. Nooijen, R. J. Bartlett, J. Chem. Phys. 102, 3629 (1995). [doi:10.1063/1.468592](https://doi.org/10.1063/1.468592)
* **STEOM-CCSD.** The effective Hamiltonian is assembled in the connected form used in CFOUR.
  * M. Nooijen, R. J. Bartlett, J. Chem. Phys. 106, 6441 (1997). [doi:10.1063/1.474000](https://doi.org/10.1063/1.474000)
  * M. Nooijen, R. J. Bartlett, J. Chem. Phys. 107, 6812 (1997). [doi:10.1063/1.474922](https://doi.org/10.1063/1.474922)
  * CFOUR: D. A. Matthews et al., J. Chem. Phys. 152, 214108 (2020). [doi:10.1063/5.0004837](https://doi.org/10.1063/5.0004837)
  * Automatic active space from CIS NTOs: A. K. Dutta, M. Nooijen, F. Neese, R. Izsák, J. Chem. Phys. 146, 074103 (2017). [doi:10.1063/1.4976130](https://doi.org/10.1063/1.4976130)
* **bt-PNO-STEOM-CCSD / DLPNO-STEOM-CCSD** (back-transformed DLPNO amplitudes)
  * A. K. Dutta, M. Nooijen, F. Neese, R. Izsák, J. Chem. Theory Comput. 14, 72 (2018). [doi:10.1021/acs.jctc.7b00802](https://doi.org/10.1021/acs.jctc.7b00802)
  * A. K. Dutta, M. Saitow, C. Riplinger, F. Neese, R. Izsák, J. Chem. Phys. 148, 244101 (2018). [doi:10.1063/1.5029470](https://doi.org/10.1063/1.5029470)
  * R. Berraud-Pache, F. Neese, G. Bistoni, R. Izsák, J. Chem. Theory Comput. 16, 564 (2020). [doi:10.1021/acs.jctc.9b00559](https://doi.org/10.1021/acs.jctc.9b00559)

## Solvation

* **C-PCM** with Gaussian surface charges and switching (SWIG), following PySCF's implementation (modified Bondi radii × 1.2).
  * V. Barone, M. Cossi, J. Phys. Chem. A 102, 1995 (1998). [doi:10.1021/jp9716997](https://doi.org/10.1021/jp9716997)
  * M. Cossi, N. Rega, G. Scalmani, V. Barone, J. Comput. Chem. 24, 669 (2003). [doi:10.1002/jcc.10189](https://doi.org/10.1002/jcc.10189)
  * A. Klamt, G. Schüürmann, J. Chem. Soc., Perkin Trans. 2, 799 (1993). [doi:10.1039/P29930000799](https://doi.org/10.1039/P29930000799)
  * D. M. York, M. Karplus, J. Phys. Chem. A 103, 11060 (1999). [doi:10.1021/jp992097l](https://doi.org/10.1021/jp992097l)
  * G. Scalmani, M. J. Frisch, J. Chem. Phys. 132, 114110 (2010). [doi:10.1063/1.3359469](https://doi.org/10.1063/1.3359469)
  * A. W. Lange, J. M. Herbert, J. Chem. Phys. 133, 244111 (2010). [doi:10.1063/1.3511297](https://doi.org/10.1063/1.3511297)
  * B. A. Gregersen, D. M. York, J. Chem. Phys. 122, 194110 (2005). [doi:10.1063/1.1899146](https://doi.org/10.1063/1.1899146)
  * A. Bondi, J. Phys. Chem. 68, 441 (1964). [doi:10.1021/j100785a001](https://doi.org/10.1021/j100785a001)

## Periodic systems

* Ewald summation: P. P. Ewald, Ann. Phys. 369, 253 (1921). [doi:10.1002/andp.19213690304](https://doi.org/10.1002/andp.19213690304)
* k-point meshes: H. J. Monkhorst, J. D. Pack, Phys. Rev. B 13, 5188 (1976). [doi:10.1103/PhysRevB.13.5188](https://doi.org/10.1103/PhysRevB.13.5188)
* Exchange uses `exxdiv = None` (no finite-size correction), as in PySCF.

## Gradients, Hessians and geometry optimization

* Coupled-perturbed HF and analytic second derivatives: J. A. Pople, R. Krishnan, H. B. Schlegel, J. S. Binkley, Int. J. Quantum Chem. 16 (S13), 225 (1979). [doi:10.1002/qua.560160825](https://doi.org/10.1002/qua.560160825)
* Optimizers
  * BFGS: C. G. Broyden, IMA J. Appl. Math. 6, 76 (1970) [doi:10.1093/imamat/6.1.76](https://doi.org/10.1093/imamat/6.1.76); R. Fletcher, Comput. J. 13, 317 (1970) [doi:10.1093/comjnl/13.3.317](https://doi.org/10.1093/comjnl/13.3.317); D. Goldfarb, Math. Comput. 24, 23 (1970) [doi:10.1090/S0025-5718-1970-0258249-6](https://doi.org/10.1090/S0025-5718-1970-0258249-6); D. F. Shanno, Math. Comput. 24, 647 (1970) [doi:10.1090/S0025-5718-1970-0274029-X](https://doi.org/10.1090/S0025-5718-1970-0274029-X)
  * DFP: R. Fletcher, M. J. D. Powell, Comput. J. 6, 163 (1963). [doi:10.1093/comjnl/6.2.163](https://doi.org/10.1093/comjnl/6.2.163)
  * Conjugate gradients: R. Fletcher, C. M. Reeves, Comput. J. 7, 149 (1964) [doi:10.1093/comjnl/7.2.149](https://doi.org/10.1093/comjnl/7.2.149); E. Polak, G. Ribière, RAIRO 3 (R1), 35 (1969) [doi:10.1051/m2an/196903R100351](https://doi.org/10.1051/m2an/196903R100351)
  * GDIIS: P. Császár, P. Pulay, J. Mol. Struct. 114, 31 (1984). [doi:10.1016/S0022-2860(84)87198-7](https://doi.org/10.1016/S0022-2860(84)87198-7)
  * Line search: L. Armijo, Pac. J. Math. 16, 1 (1966). [doi:10.2140/pjm.1966.16.1](https://doi.org/10.2140/pjm.1966.16.1)

## Basis sets

The bundled basis sets were taken from the Basis Set Exchange: B. P. Pritchard, D. Altarawy, B. Didier, T. D. Gibson, T. L. Windus, J. Chem. Inf. Model. 59, 4814 (2019). [doi:10.1021/acs.jcim.9b00725](https://doi.org/10.1021/acs.jcim.9b00725)

* STO-nG: W. J. Hehre, R. F. Stewart, J. A. Pople, J. Chem. Phys. 51, 2657 (1969). [doi:10.1063/1.1672392](https://doi.org/10.1063/1.1672392)
* 3-21G: J. S. Binkley, J. A. Pople, W. J. Hehre, J. Am. Chem. Soc. 102, 939 (1980). [doi:10.1021/ja00523a008](https://doi.org/10.1021/ja00523a008)
* 4-31G: R. Ditchfield, W. J. Hehre, J. A. Pople, J. Chem. Phys. 54, 724 (1971). [doi:10.1063/1.1674902](https://doi.org/10.1063/1.1674902)
* 6-31G: W. J. Hehre, R. Ditchfield, J. A. Pople, J. Chem. Phys. 56, 2257 (1972). [doi:10.1063/1.1677527](https://doi.org/10.1063/1.1677527)
* 6-31G\*: P. C. Hariharan, J. A. Pople, Theor. Chim. Acta 28, 213 (1973). [doi:10.1007/BF00533485](https://doi.org/10.1007/BF00533485)
* 6-311G\*\*: R. Krishnan, J. S. Binkley, R. Seeger, J. A. Pople, J. Chem. Phys. 72, 650 (1980). [doi:10.1063/1.438955](https://doi.org/10.1063/1.438955)
* cc-pVXZ: T. H. Dunning, J. Chem. Phys. 90, 1007 (1989). [doi:10.1063/1.456153](https://doi.org/10.1063/1.456153)
* aug-cc-pVXZ: R. A. Kendall, T. H. Dunning, R. J. Harrison, J. Chem. Phys. 96, 6796 (1992). [doi:10.1063/1.462569](https://doi.org/10.1063/1.462569)
* cc-pVXZ-PP: K. A. Peterson, D. Figgen, E. Goll, H. Stoll, M. Dolg, J. Chem. Phys. 119, 11113 (2003). [doi:10.1063/1.1622924](https://doi.org/10.1063/1.1622924)
* def2-SVP, def2-TZVP: F. Weigend, R. Ahlrichs, Phys. Chem. Chem. Phys. 7, 3297 (2005). [doi:10.1039/b508541a](https://doi.org/10.1039/b508541a)
* pob-TZVP: M. F. Peintinger, D. Vilela Oliveira, T. Bredow, J. Comput. Chem. 34, 451 (2013). [doi:10.1002/jcc.23153](https://doi.org/10.1002/jcc.23153)
* pob-*-rev2: D. Vilela Oliveira, J. Laun, M. F. Peintinger, T. Bredow, J. Comput. Chem. 40, 2364 (2019). [doi:10.1002/jcc.26013](https://doi.org/10.1002/jcc.26013)
* ANO-RCC: B. O. Roos, R. Lindh, P.-Å. Malmqvist, V. Veryazov, P.-O. Widmark, J. Phys. Chem. A 108, 2851 (2004) [doi:10.1021/jp031064+](https://doi.org/10.1021/jp031064%2B); J. Phys. Chem. A 109, 6575 (2005) [doi:10.1021/jp0581126](https://doi.org/10.1021/jp0581126)
* LANL2DZ: P. J. Hay, W. R. Wadt, J. Chem. Phys. 82, 270 (1985) [doi:10.1063/1.448799](https://doi.org/10.1063/1.448799); W. R. Wadt, P. J. Hay, J. Chem. Phys. 82, 284 (1985) [doi:10.1063/1.448800](https://doi.org/10.1063/1.448800); P. J. Hay, W. R. Wadt, J. Chem. Phys. 82, 299 (1985) [doi:10.1063/1.448975](https://doi.org/10.1063/1.448975)

Auxiliary basis sets:

* def2-universal-jkfit (the default for RI): F. Weigend, J. Comput. Chem. 29, 167 (2008) [doi:10.1002/jcc.20702](https://doi.org/10.1002/jcc.20702); F. Weigend, Phys. Chem. Chem. Phys. 8, 1057 (2006) [doi:10.1039/b515623h](https://doi.org/10.1039/b515623h)
* cc-pVXZ-JKFIT: F. Weigend, Phys. Chem. Chem. Phys. 4, 4285 (2002), above.
* cc-pVXZ-RIFIT: F. Weigend, A. Köhn, C. Hättig, J. Chem. Phys. 116, 3175 (2002). [doi:10.1063/1.1445115](https://doi.org/10.1063/1.1445115)
* def2-SVP-RIFIT: A. Hellweg, C. Hättig, S. Höfener, W. Klopper, Theor. Chem. Acc. 117, 587 (2007). [doi:10.1007/s00214-007-0250-5](https://doi.org/10.1007/s00214-007-0250-5)

## Numerical techniques

* **FP64 emulation on integer tensor cores (Ozaki scheme)**, used by CASSCF and, on GPUs with little FP64 throughput, by the tensor contractions
  * K. Ozaki, T. Ogita, S. Oishi, S. M. Rump, Numer. Algorithms 59, 95 (2012). [doi:10.1007/s11075-011-9478-1](https://doi.org/10.1007/s11075-011-9478-1)
  * H. Ootomo, K. Ozaki, R. Yokota, Int. J. High Perform. Comput. Appl. 38, 297 (2024). [doi:10.1177/10943420241239588](https://doi.org/10.1177/10943420241239588)
  * Y. Uchino, K. Ozaki, T. Imamura, Int. J. High Perform. Comput. Appl. 39, 462 (2025). [doi:10.1177/10943420241313064](https://doi.org/10.1177/10943420241313064)
* Hilbert curve ordering (DFT grids): J. Skilling, AIP Conf. Proc. 707, 381 (2004). [doi:10.1063/1.1751381](https://doi.org/10.1063/1.1751381)

## Implementation basis

Parts of GANSU2 follow PySCF's formulation and were validated against it: the DFT grid conventions, C-PCM,
the EOM-CCSD σ vectors, UCCSD, the CC and MP2 gradients and the open-shell FCI solver.

* Q. Sun et al., WIREs Comput. Mol. Sci. 8, e1340 (2018). [doi:10.1002/wcms.1340](https://doi.org/10.1002/wcms.1340)
* Q. Sun et al., J. Chem. Phys. 153, 024109 (2020). [doi:10.1063/5.0006074](https://doi.org/10.1063/5.0006074)
