---
layout: default
title: C API
nav_order: 4
lang: en
hreflang_alt: "ja/usage_c_api"
hreflang_lang: "ja"
---

# GANSU2 C API Reference

## Overview

The GANSU2 C API (`gansu2_api.h`) provides a stable, language-agnostic interface to GANSU2's quantum chemistry engine. It uses opaque handles and `extern "C"` linkage, making it callable from virtually any programming language.

**Shared library**: `libgansu2.so` (Linux) / `libgansu2.dylib` (macOS)

**Header**: `include/gansu2_api.h`

## Getting the shared library

`libgansu2.so` ships with the `gansu2` Python wheel and is also fetched on first
use to `~/.cache/gansu2/<version>/`. Install it with `pip install gansu2`, or
download it from the [latest release](https://github.com/gansu2/dist/releases/latest).
The C header `gansu2_api.h` is bundled with the wheel (`include/gansu2_api.h`).

---

## API Reference

### Lifecycle

#### `gansu2_init`
```c
void gansu2_init(int force_cpu);
```
Initialize the GANSU2 runtime. Call once before any other function.
- `force_cpu = 0`: Auto-detect GPU
- `force_cpu = 1`: Force CPU-only mode

#### `gansu2_finalize`
```c
void gansu2_finalize(void);
```
Finalize the GANSU2 runtime. Call at program exit.

#### `gansu2_create`
```c
gansu2_handle_t gansu2_create(void);
```
Create a new calculation context. Returns an opaque handle.

#### `gansu2_destroy`
```c
void gansu2_destroy(gansu2_handle_t h);
```
Destroy a calculation context and free all associated resources.

---

### Configuration

#### `gansu2_set`
```c
int gansu2_set(gansu2_handle_t h, const char* key, const char* value);
```
Set an arbitrary parameter. Returns 0 on success.

Common keys: `"xyzfilename"`, `"gbsfilename"`, `"method"`, `"post_hf_method"`, `"run_type"`, `"eri_method"`, `"initial_guess"`, `"convergence_method"`, `"n_excited_states"`, `"optimizer"`, `"quiet"`.

See [parameters.md](parameters.md) for the full list.

Special key: `"quiet"` — set to `"true"` to suppress stdout during `gansu2_run`.

#### Convenience functions
```c
int gansu2_set_xyz(gansu2_handle_t h, const char* path);      // set xyzfilename
int gansu2_set_basis(gansu2_handle_t h, const char* path);     // set gbsfilename
int gansu2_set_method(gansu2_handle_t h, const char* method);  // set method
int gansu2_set_post_hf(gansu2_handle_t h, const char* post_hf); // set post_hf_method
```

Any `post_hf_method` value from [parameters.md](parameters.md) is accepted as a string, including the correlation methods (`"mp2"`, `"ccsd"`, `"ccsd_t"`, `"dlpno_ccsd"`, `"fci"`, …) and the excited-state / spectroscopy methods (`"cis"`, `"adc2"`, `"thc_sos_adc2"`, `"eom_ccsd"`, `"ip_eom_ccsd"`, `"ea_eom_ccsd"`, `"steom_ccsd"`, `"dlpno_steom_ccsd"`, …). For excited-state methods, set `"n_excited_states"` and read the results with `gansu2_get_excited_state_report`.

---

### Execution

#### `gansu2_run`
```c
int gansu2_run(gansu2_handle_t h);
```
Run the calculation (SCF + post-HF if configured). Returns 0 on success, nonzero on error.

---

### Results

#### `gansu2_get_total_energy`
```c
double gansu2_get_total_energy(gansu2_handle_t h);
```
HF total energy (electronic + nuclear repulsion) in Hartree.

#### `gansu2_get_post_hf_energy`
```c
double gansu2_get_post_hf_energy(gansu2_handle_t h);
```
Post-HF correlation energy in Hartree. Returns 0 if no post-HF method was used.

#### `gansu2_get_nuclear_repulsion_energy`
```c
double gansu2_get_nuclear_repulsion_energy(gansu2_handle_t h);
```
Nuclear repulsion energy in Hartree.

#### `gansu2_get_num_basis`
```c
int gansu2_get_num_basis(gansu2_handle_t h);
```
Number of basis functions (nao).

#### `gansu2_get_num_electrons`
```c
int gansu2_get_num_electrons(gansu2_handle_t h);
```
Number of electrons.

#### `gansu2_get_num_atoms`
```c
int gansu2_get_num_atoms(gansu2_handle_t h);
```
Number of atoms.

#### `gansu2_get_orbital_energies`
```c
int gansu2_get_orbital_energies(gansu2_handle_t h, double* buf, int buf_size);
```
Copy orbital energies into `buf`. Returns number of values written, or -1 on error. Buffer must have at least `num_basis` elements.

#### `gansu2_get_mo_coefficients`
```c
int gansu2_get_mo_coefficients(gansu2_handle_t h, double* buf, int buf_size);
```
Copy MO coefficient matrix (nao x nao, row-major) into `buf`. Returns `nao*nao` on success.

#### `gansu2_get_ccsd_1rdm_mo`
```c
int gansu2_get_ccsd_1rdm_mo(gansu2_handle_t h, double* buf, int buf_size);
```
Copy CCSD 1-RDM in MO basis (nao x nao, row-major) into `buf`. Only available after running with `post_hf_method = "ccsd_density"`.

#### `gansu2_get_excited_state_report`
```c
const char* gansu2_get_excited_state_report(gansu2_handle_t h);
```
Returns a formatted string with excited state energies, oscillator strengths, and dominant transitions. Pointer is valid until `gansu2_destroy`.

#### `gansu2_get_excited_states`
```c
int gansu2_get_excited_states(gansu2_handle_t h, double* energies_out, double* osc_out, int n_max);
```
Excited-state data as raw arrays (after a CIS/ADC/EOM/STEOM run). Writes up to `n_max` excitation energies (Hartree) into `energies_out` and oscillator strengths into `osc_out`; either pointer may be `NULL` to skip it. Returns the number of states written, or -1 on error.

### Derivatives and molecular properties

#### `gansu2_get_energy_gradient`
```c
int gansu2_get_energy_gradient(gansu2_handle_t h, double* buf, int len);
```
Analytic energy gradient (nuclear forces), computed on demand. Writes `3*num_atoms` values (dE/dx, dE/dy, dE/dz per atom, Hartree/Bohr). Returns `3*num_atoms`, -1 on error, or -2 if unavailable for the current method. `len` must be ≥ `3*num_atoms`.

#### `gansu2_get_hessian`
```c
int gansu2_get_hessian(gansu2_handle_t h, double* buf, int len);
```
Analytic Hessian d²E/dR_i dR_j (Hartree/Bohr²), `3N x 3N` row-major, computed on demand. Returns `(3*num_atoms)^2`, -1 on error, or -2 if unavailable. `len` must be ≥ `(3*num_atoms)^2`.

#### `gansu2_get_frequencies`
```c
int gansu2_get_frequencies(gansu2_handle_t h, double* buf, int len);
```
Harmonic vibrational frequencies (cm⁻¹), computed on demand (Hessian + mass-weighting + translation/rotation projection + diagonalization). Imaginary modes are returned as negative values. Returns the number of frequencies (3N − 5 or 3N − 6), -1 on error, or -2 if unavailable. `len` should be ≥ `3*num_atoms`.

#### `gansu2_get_dipole`
```c
int gansu2_get_dipole(gansu2_handle_t h, double* xyz);
```
Ground-state SCF dipole moment in atomic units (e·Bohr). Writes 3 doubles (mu_x, mu_y, mu_z) into `xyz`. Multiply by 2.5417464157 for Debye. Closed-shell RHF only. Returns 0 on success, -1 on error, -3 if not RHF.

---

## Usage Examples

### C

```c
#include "gansu2_api.h"
#include <stdio.h>

int main() {
    gansu2_init(0);

    gansu2_handle_t h = gansu2_create();
    gansu2_set_xyz(h, "H2O.xyz");
    gansu2_set_basis(h, "cc-pvdz");
    gansu2_set_method(h, "RHF");
    gansu2_set_post_hf(h, "ccsd");
    gansu2_set(h, "quiet", "true");

    if (gansu2_run(h) == 0) {
        double e_hf   = gansu2_get_total_energy(h);
        double e_corr = gansu2_get_post_hf_energy(h);
        printf("HF energy:   %.8f Hartree\n", e_hf);
        printf("CCSD corr:   %.8f Hartree\n", e_corr);
        printf("Total:       %.8f Hartree\n", e_hf + e_corr);
        printf("nao=%d, ne=%d\n", gansu2_get_num_basis(h), gansu2_get_num_electrons(h));
    }

    gansu2_destroy(h);
    gansu2_finalize();
    return 0;
}
```

Compile:
```bash
gcc -o my_calc my_calc.c -L/path/to/lib -lgansu2 -lstdc++ -lm   # -L: the directory holding libgansu2.so
```

### Rust

```rust
use std::ffi::CString;
use std::os::raw::{c_int, c_double, c_char, c_void};

extern "C" {
    fn gansu2_init(force_cpu: c_int);
    fn gansu2_finalize();
    fn gansu2_create() -> *mut c_void;
    fn gansu2_destroy(h: *mut c_void);
    fn gansu2_set_xyz(h: *mut c_void, path: *const c_char) -> c_int;
    fn gansu2_set_basis(h: *mut c_void, path: *const c_char) -> c_int;
    fn gansu2_set(h: *mut c_void, key: *const c_char, val: *const c_char) -> c_int;
    fn gansu2_run(h: *mut c_void) -> c_int;
    fn gansu2_get_total_energy(h: *mut c_void) -> c_double;
    fn gansu2_get_post_hf_energy(h: *mut c_void) -> c_double;
}

fn main() {
    unsafe {
        gansu2_init(0);
        let h = gansu2_create();
        let xyz = CString::new("H2O.xyz").unwrap();
        let basis = CString::new("cc-pvdz").unwrap();
        let quiet_k = CString::new("quiet").unwrap();
        let quiet_v = CString::new("true").unwrap();
        let post = CString::new("post_hf_method").unwrap();
        let ccsd = CString::new("ccsd").unwrap();

        gansu2_set_xyz(h, xyz.as_ptr());
        gansu2_set_basis(h, basis.as_ptr());
        gansu2_set(h, quiet_k.as_ptr(), quiet_v.as_ptr());
        gansu2_set(h, post.as_ptr(), ccsd.as_ptr());
        gansu2_run(h);

        let e = gansu2_get_total_energy(h) + gansu2_get_post_hf_energy(h);
        println!("E = {:.8} Hartree", e);

        gansu2_destroy(h);
        gansu2_finalize();
    }
}
```

### Julia

```julia
const lib = "libgansu2.so"

ccall((:gansu2_init, lib), Cvoid, (Cint,), 0)
h = ccall((:gansu2_create, lib), Ptr{Cvoid}, ())

ccall((:gansu2_set_xyz, lib), Cint, (Ptr{Cvoid}, Cstring), h, "H2O.xyz")
ccall((:gansu2_set_basis, lib), Cint, (Ptr{Cvoid}, Cstring), h, "cc-pvdz")
ccall((:gansu2_set, lib), Cint, (Ptr{Cvoid}, Cstring, Cstring), h, "post_hf_method", "ccsd")
ccall((:gansu2_set, lib), Cint, (Ptr{Cvoid}, Cstring, Cstring), h, "quiet", "true")
ccall((:gansu2_run, lib), Cint, (Ptr{Cvoid},), h)

e_hf   = ccall((:gansu2_get_total_energy, lib), Cdouble, (Ptr{Cvoid},), h)
e_corr = ccall((:gansu2_get_post_hf_energy, lib), Cdouble, (Ptr{Cvoid},), h)
println("E = $(e_hf + e_corr) Hartree")

ccall((:gansu2_destroy, lib), Cvoid, (Ptr{Cvoid},), h)
ccall((:gansu2_finalize, lib), Cvoid, ())
```

### JavaScript (Node.js with ffi-napi)

```javascript
const ffi = require('ffi-napi');
const ref = require('ref-napi');

const gansu2 = ffi.Library('./libgansu2.so', {
    'gansu2_init':               ['void',   ['int']],
    'gansu2_finalize':           ['void',   []],
    'gansu2_create':             ['pointer', []],
    'gansu2_destroy':            ['void',   ['pointer']],
    'gansu2_set_xyz':            ['int',    ['pointer', 'string']],
    'gansu2_set_basis':          ['int',    ['pointer', 'string']],
    'gansu2_set':                ['int',    ['pointer', 'string', 'string']],
    'gansu2_run':                ['int',    ['pointer']],
    'gansu2_get_total_energy':   ['double', ['pointer']],
    'gansu2_get_post_hf_energy': ['double', ['pointer']],
});

gansu2.gansu2_init(0);
const h = gansu2.gansu2_create();
gansu2.gansu2_set_xyz(h, 'H2O.xyz');
gansu2.gansu2_set_basis(h, 'cc-pvdz');
gansu2.gansu2_set(h, 'post_hf_method', 'ccsd');
gansu2.gansu2_set(h, 'quiet', 'true');
gansu2.gansu2_run(h);

const E = gansu2.gansu2_get_total_energy(h) + gansu2.gansu2_get_post_hf_energy(h);
console.log(`E = ${E.toFixed(8)} Hartree`);

gansu2.gansu2_destroy(h);
gansu2.gansu2_finalize();
```

---

## Thread Safety

The C API is **NOT thread-safe**. GPU state is global. Do not call `gansu2_run` concurrently from multiple threads. Sequential calls with separate handles are safe.

## Error Handling

- Functions returning `int` return 0 on success, nonzero on error.
- Functions returning `double` return 0.0 if the handle is invalid or calculation has not been run.
- Error messages are printed to stderr.
