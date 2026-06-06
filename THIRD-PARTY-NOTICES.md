# Third-Party Notices — Logcat On

Logcat On (the "Software") is proprietary, closed-source software licensed under its
End User License Agreement (see [`LICENSE`](./LICENSE)). It includes and/or redistributes
the third-party open-source software listed below, each licensed under **its own terms**.
Those licenses govern the corresponding components, and nothing in the Software's EULA
limits your rights under them.

> **Maintenance note.** Section 5 (the dependency inventory) is auto-generated from
> `cargo metadata` and `license-checker`. Before a public release, regenerate the verbatim
> per-package copyright/license texts with tooling (e.g. `cargo-bundle-licenses` and
> `license-checker --production --files`) so the shipped notice carries each component's
> exact notice.

---

## 1. Redistributed binary tools (bundled as resources)

These Google / Android tools are redistributed **unmodified** under the Apache License 2.0.
Each ships with its license file alongside the binary:

| Tool | License | License file |
|---|---|---|
| Android Platform Tools (`adb`) | Apache-2.0 | `src-tauri/resources/platform-tools/LICENSE-platform-tools.txt` |
| `aapt2` | Apache-2.0 | `src-tauri/resources/aapt2-bundle/LICENSE-aapt2-bundle.txt` |
| `bundletool` | Apache-2.0 | `src-tauri/resources/bundletool/LICENSE-bundletool.txt` |

The full Apache License 2.0 text is reproduced in those files and is also available at
<https://www.apache.org/licenses/LICENSE-2.0>.

## 2. Fonts

- **Geist Mono** — bundled via `@fontsource-variable/geist-mono`, self-hosted as `.woff2`.
  Licensed under the **SIL Open Font License 1.1 (OFL-1.1)**. "Geist" is a **Reserved Font
  Name**. License: <https://github.com/vercel/geist-font/blob/main/LICENSE.TXT>.

OFL-1.1 permits the font to be used, embedded, and redistributed (including within this
Software) but **not sold on its own**, and the Reserved Font Name may not be used to
designate a modified version without permission.

## 3. Weak-copyleft (MPL-2.0) components

The following are licensed under the **Mozilla Public License 2.0** and are used
**unmodified**:

- Rust: `cssparser`, `cssparser-macros`, `dtoa-short`, `option-ext`, `selectors`
- JavaScript (build-time): `lightningcss` (and its platform binaries)

MPL-2.0 is **file-level** copyleft: it expressly permits inclusion in a larger proprietary
work. Because these components are used unmodified, there is no source-disclosure obligation
for the Software itself; the Source Code Form of each is available from its upstream project
at the version pinned in `Cargo.lock` / the JS lockfile. MPL-2.0 text:
<https://www.mozilla.org/MPL/2.0/>.

## 4. License texts (open-source families used)

The components in Section 5 are distributed under the licenses below (Apache-2.0, MPL-2.0,
and OFL-1.1 are reproduced/linked in Sections 1–3). Each component's own copyright notice
travels with that component in its upstream distribution.

### MIT License

```
MIT License

Copyright (c) <year> <copyright holders — see each package>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

### ISC License

```
ISC License

Copyright (c) <year> <copyright holders — see each package>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
```

### BSD 2-Clause License

```
Copyright (c) <year> <copyright holders — see each package>

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

### BSD 3-Clause License

```
Copyright (c) <year> <copyright holders — see each package>

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors
   may be used to endorse or promote products derived from this software
   without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES ARE DISCLAIMED. IN NO EVENT SHALL THE
COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```

Other licenses that may appear in Section 5 (e.g. Apache-2.0, MPL-2.0, OFL-1.1, Unicode,
CC0, Zlib) are governed by their standard texts, available from the SPDX license list at
<https://spdx.org/licenses/>.

---

## 5. Full dependency inventory (auto-generated)

Generated from the dependency graph; some entries are build-time only and are listed
conservatively for completeness. SPDX identifiers are as declared by each package.

### Rust crates (Cargo dependency graph)

- actix-codec 0.5.2 — MIT OR Apache-2.0
- actix-http 3.12.1 — MIT OR Apache-2.0
- actix-router 0.5.4 — MIT OR Apache-2.0
- actix-rt 2.11.0 — MIT OR Apache-2.0
- actix-server 2.6.0 — MIT OR Apache-2.0
- actix-service 2.0.3 — MIT OR Apache-2.0
- actix-utils 3.0.1 — MIT OR Apache-2.0
- actix-web 4.13.0 — MIT OR Apache-2.0
- addr2line 0.25.1 — Apache-2.0 OR MIT
- adler2 2.0.1 — 0BSD OR MIT OR Apache-2.0
- aho-corasick 1.1.4 — Unlicense OR MIT
- alloc-no-stdlib 2.0.4 — BSD-3-Clause
- alloc-stdlib 0.2.2 — BSD-3-Clause
- android_system_properties 0.1.5 — MIT/Apache-2.0
- anes 0.1.6 — MIT OR Apache-2.0
- anstyle 1.0.14 — MIT OR Apache-2.0
- anyhow 1.0.102 — MIT OR Apache-2.0
- arbitrary 1.4.2 — MIT OR Apache-2.0
- async-broadcast 0.7.2 — MIT OR Apache-2.0
- async-channel 2.5.0 — Apache-2.0 OR MIT
- async-executor 1.14.0 — Apache-2.0 OR MIT
- async-io 2.6.0 — Apache-2.0 OR MIT
- async-lock 3.4.2 — Apache-2.0 OR MIT
- async-process 2.5.0 — Apache-2.0 OR MIT
- async-recursion 1.1.1 — MIT OR Apache-2.0
- async-signal 0.2.14 — Apache-2.0 OR MIT
- async-task 4.7.1 — Apache-2.0 OR MIT
- async-trait 0.1.89 — MIT OR Apache-2.0
- atk 0.18.2 — MIT
- atk-sys 0.18.2 — MIT
- atomic-waker 1.1.2 — Apache-2.0 OR MIT
- autocfg 1.5.0 — Apache-2.0 OR MIT
- backtrace 0.3.76 — MIT OR Apache-2.0
- base64 0.21.7 — MIT OR Apache-2.0
- base64 0.22.1 — MIT OR Apache-2.0
- bit-set 0.8.0 — Apache-2.0 OR MIT
- bit-vec 0.8.0 — Apache-2.0 OR MIT
- bitflags 1.3.2 — MIT/Apache-2.0
- bitflags 2.11.1 — MIT OR Apache-2.0
- block-buffer 0.10.4 — MIT OR Apache-2.0
- block2 0.6.2 — MIT
- blocking 1.6.2 — Apache-2.0 OR MIT
- brotli 8.0.2 — BSD-3-Clause AND MIT
- brotli-decompressor 5.0.0 — BSD-3-Clause/MIT
- bumpalo 3.20.2 — MIT OR Apache-2.0
- bytemuck 1.25.0 — Zlib OR Apache-2.0 OR MIT
- byteorder 1.5.0 — Unlicense OR MIT
- bytes 1.11.1 — MIT
- bytestring 1.5.1 — MIT OR Apache-2.0
- cairo-rs 0.18.5 — MIT
- cairo-sys-rs 0.18.2 — MIT
- camino 1.2.2 — MIT OR Apache-2.0
- cargo-platform 0.1.9 — MIT OR Apache-2.0
- cargo_metadata 0.19.2 — MIT
- cargo_toml 0.22.3 — Apache-2.0 OR MIT
- cast 0.3.0 — MIT OR Apache-2.0
- cc 1.2.61 — MIT OR Apache-2.0
- cesu8 1.1.0 — Apache-2.0/MIT
- cfb 0.7.3 — MIT
- cfg-expr 0.15.8 — MIT OR Apache-2.0
- cfg-if 1.0.4 — MIT OR Apache-2.0
- cfg_aliases 0.1.1 — MIT
- cfg_aliases 0.2.1 — MIT
- chrono 0.4.44 — MIT OR Apache-2.0
- ciborium 0.2.2 — Apache-2.0
- ciborium-io 0.2.2 — Apache-2.0
- ciborium-ll 0.2.2 — Apache-2.0
- clap 4.6.1 — MIT OR Apache-2.0
- clap_builder 4.6.0 — MIT OR Apache-2.0
- clap_lex 1.1.0 — MIT OR Apache-2.0
- combine 4.6.7 — MIT
- concurrent-queue 2.5.0 — Apache-2.0 OR MIT
- convert_case 0.10.0 — MIT
- cookie 0.18.1 — MIT OR Apache-2.0
- core-foundation 0.10.1 — MIT OR Apache-2.0
- core-foundation-sys 0.8.7 — MIT OR Apache-2.0
- core-graphics 0.25.0 — MIT OR Apache-2.0
- core-graphics-types 0.2.0 — MIT OR Apache-2.0
- cpufeatures 0.2.17 — MIT OR Apache-2.0
- crash-context 0.6.3 — MIT OR Apache-2.0
- crash-handler 0.6.3 — MIT OR Apache-2.0
- crc32fast 1.5.0 — MIT OR Apache-2.0
- criterion 0.5.1 — Apache-2.0 OR MIT
- criterion-plot 0.5.0 — MIT/Apache-2.0
- crossbeam-channel 0.5.15 — MIT OR Apache-2.0
- crossbeam-utils 0.8.21 — MIT OR Apache-2.0
- crunchy 0.2.4 — MIT
- crypto-common 0.1.7 — MIT OR Apache-2.0
- cssparser 0.36.0 — MPL-2.0
- cssparser-macros 0.6.1 — MPL-2.0
- ctor 0.8.0 — Apache-2.0 OR MIT
- ctor-proc-macro 0.0.7 — Apache-2.0 OR MIT
- darling 0.23.0 — MIT
- darling_core 0.23.0 — MIT
- darling_macro 0.23.0 — MIT
- dbus 0.9.11 — Apache-2.0/MIT
- debugid 0.8.0 — Apache-2.0
- deranged 0.5.8 — MIT OR Apache-2.0
- derive_arbitrary 1.4.2 — MIT OR Apache-2.0
- derive_more 2.1.1 — MIT
- derive_more-impl 2.1.1 — MIT
- digest 0.10.7 — MIT OR Apache-2.0
- dirs 6.0.0 — MIT OR Apache-2.0
- dirs-sys 0.5.0 — MIT OR Apache-2.0
- dispatch2 0.3.1 — Zlib OR Apache-2.0 OR MIT
- displaydoc 0.2.5 — MIT OR Apache-2.0
- dlopen2 0.8.2 — MIT
- dlopen2_derive 0.4.3 — MIT
- dom_query 0.27.0 — MIT
- dpi 0.1.2 — Apache-2.0 AND MIT
- dtoa 1.0.11 — MIT OR Apache-2.0
- dtoa-short 0.3.5 — MPL-2.0
- dtor 0.3.0 — Apache-2.0 OR MIT
- dtor-proc-macro 0.0.6 — Apache-2.0 OR MIT
- dunce 1.0.5 — CC0-1.0 OR MIT-0 OR Apache-2.0
- dyn-clone 1.0.20 — MIT OR Apache-2.0
- either 1.15.0 — MIT OR Apache-2.0
- embed-resource 3.0.9 — MIT
- embed_plist 1.2.2 — MIT OR Apache-2.0
- encoding_rs 0.8.35 — (Apache-2.0 OR MIT) AND BSD-3-Clause
- endi 1.1.1 — MIT
- enumflags2 0.7.12 — MIT OR Apache-2.0
- enumflags2_derive 0.7.12 — MIT OR Apache-2.0
- equivalent 1.0.2 — Apache-2.0 OR MIT
- erased-serde 0.4.10 — MIT OR Apache-2.0
- errno 0.3.14 — MIT OR Apache-2.0
- event-listener 5.4.1 — Apache-2.0 OR MIT
- event-listener-strategy 0.5.4 — Apache-2.0 OR MIT
- fastrand 2.4.1 — Apache-2.0 OR MIT
- fdeflate 0.3.7 — MIT OR Apache-2.0
- field-offset 0.3.6 — MIT OR Apache-2.0
- filetime 0.2.29 — MIT/Apache-2.0
- find-msvc-tools 0.1.9 — MIT OR Apache-2.0
- findshlibs 0.10.2 — MIT OR Apache-2.0
- flate2 1.1.9 — MIT OR Apache-2.0
- fnv 1.0.7 — Apache-2.0 / MIT
- foldhash 0.1.5 — Zlib
- foldhash 0.2.0 — Zlib
- foreign-types 0.5.0 — MIT/Apache-2.0
- foreign-types-macros 0.2.3 — MIT/Apache-2.0
- foreign-types-shared 0.3.1 — MIT/Apache-2.0
- form_urlencoded 1.2.2 — MIT OR Apache-2.0
- futures-channel 0.3.32 — MIT OR Apache-2.0
- futures-core 0.3.32 — MIT OR Apache-2.0
- futures-executor 0.3.32 — MIT OR Apache-2.0
- futures-io 0.3.32 — MIT OR Apache-2.0
- futures-lite 2.6.1 — Apache-2.0 OR MIT
- futures-macro 0.3.32 — MIT OR Apache-2.0
- futures-sink 0.3.32 — MIT OR Apache-2.0
- futures-task 0.3.32 — MIT OR Apache-2.0
- futures-util 0.3.32 — MIT OR Apache-2.0
- gdk 0.18.2 — MIT
- gdk-pixbuf 0.18.5 — MIT
- gdk-pixbuf-sys 0.18.0 — MIT
- gdk-sys 0.18.2 — MIT
- gdkwayland-sys 0.18.2 — MIT
- gdkx11 0.18.2 — MIT
- gdkx11-sys 0.18.2 — MIT
- generic-array 0.14.7 — MIT
- getrandom 0.2.17 — MIT OR Apache-2.0
- getrandom 0.3.4 — MIT OR Apache-2.0
- getrandom 0.4.2 — MIT OR Apache-2.0
- gimli 0.32.3 — MIT OR Apache-2.0
- gio 0.18.4 — MIT
- gio-sys 0.18.1 — MIT
- glib 0.18.5 — MIT
- glib-macros 0.18.5 — MIT
- glib-sys 0.18.1 — MIT
- glob 0.3.3 — MIT OR Apache-2.0
- gobject-sys 0.18.0 — MIT
- goblin 0.8.2 — MIT
- gtk 0.18.2 — MIT
- gtk-sys 0.18.2 — MIT
- gtk3-macros 0.18.2 — MIT
- half 2.7.1 — MIT OR Apache-2.0
- hashbrown 0.12.3 — MIT OR Apache-2.0
- hashbrown 0.15.5 — MIT OR Apache-2.0
- hashbrown 0.17.0 — MIT OR Apache-2.0
- heck 0.4.1 — MIT OR Apache-2.0
- heck 0.5.0 — MIT OR Apache-2.0
- hermit-abi 0.5.2 — MIT OR Apache-2.0
- hex 0.4.3 — MIT OR Apache-2.0
- home 0.5.12 — MIT OR Apache-2.0
- hostname 0.4.2 — MIT
- html5ever 0.38.0 — MIT OR Apache-2.0
- http 0.2.12 — MIT OR Apache-2.0
- http 1.4.0 — MIT OR Apache-2.0
- http-body 1.0.1 — MIT
- http-body-util 0.1.3 — MIT
- httparse 1.10.1 — MIT OR Apache-2.0
- httpdate 1.0.3 — MIT OR Apache-2.0
- hyper 1.9.0 — MIT
- hyper-rustls 0.27.9 — Apache-2.0 OR ISC OR MIT
- hyper-util 0.1.20 — MIT
- iana-time-zone 0.1.65 — MIT OR Apache-2.0
- iana-time-zone-haiku 0.1.2 — MIT OR Apache-2.0
- ico 0.5.0 — MIT
- icu_collections 2.2.0 — Unicode-3.0
- icu_locale_core 2.2.0 — Unicode-3.0
- icu_normalizer 2.2.0 — Unicode-3.0
- icu_normalizer_data 2.2.0 — Unicode-3.0
- icu_properties 2.2.0 — Unicode-3.0
- icu_properties_data 2.2.0 — Unicode-3.0
- icu_provider 2.2.0 — Unicode-3.0
- id-arena 2.3.0 — MIT/Apache-2.0
- ident_case 1.0.1 — MIT/Apache-2.0
- idna 1.1.0 — MIT OR Apache-2.0
- idna_adapter 1.2.2 — Apache-2.0 OR MIT
- impl-more 0.1.9 — MIT OR Apache-2.0
- indexmap 1.9.3 — Apache-2.0 OR MIT
- indexmap 2.14.0 — Apache-2.0 OR MIT
- infer 0.19.0 — MIT
- ipnet 2.12.0 — MIT OR Apache-2.0
- iri-string 0.7.12 — MIT OR Apache-2.0
- is-docker 0.2.0 — MIT
- is-terminal 0.4.17 — MIT
- is-wsl 0.4.0 — MIT
- itertools 0.10.5 — MIT/Apache-2.0
- itoa 1.0.18 — MIT OR Apache-2.0
- javascriptcore-rs 1.1.2 — MIT
- javascriptcore-rs-sys 1.1.1 — MIT
- jni 0.21.1 — MIT/Apache-2.0
- jni 0.22.4 — MIT OR Apache-2.0
- jni-macros 0.22.4 — MIT OR Apache-2.0
- jni-sys 0.3.1 — MIT OR Apache-2.0
- jni-sys 0.4.1 — MIT OR Apache-2.0
- jni-sys-macros 0.4.1 — MIT OR Apache-2.0
- js-sys 0.3.97 — MIT OR Apache-2.0
- json-patch 3.0.1 — MIT/Apache-2.0
- jsonptr 0.6.3 — MIT OR Apache-2.0
- keyboard-types 0.7.0 — MIT OR Apache-2.0
- language-tags 0.3.2 — MIT/Apache-2.0
- lazy_static 1.5.0 — MIT OR Apache-2.0
- leb128fmt 0.1.0 — MIT OR Apache-2.0
- libappindicator 0.9.0 — Apache-2.0 OR MIT
- libappindicator-sys 0.9.0 — Apache-2.0 OR MIT
- libc 0.2.186 — MIT OR Apache-2.0
- libdbus-sys 0.2.7 — Apache-2.0/MIT
- libloading 0.7.4 — ISC
- libredox 0.1.16 — MIT
- linux-raw-sys 0.12.1 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- linux-raw-sys 0.4.15 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- litemap 0.8.2 — Unicode-3.0
- local-waker 0.1.4 — MIT OR Apache-2.0
- lock_api 0.4.14 — MIT OR Apache-2.0
- log 0.4.29 — MIT OR Apache-2.0
- lru-slab 0.1.2 — MIT OR Apache-2.0 OR Zlib
- mach2 0.4.3 — BSD-2-Clause OR MIT OR Apache-2.0
- markup5ever 0.38.0 — MIT OR Apache-2.0
- memchr 2.8.0 — Unlicense OR MIT
- memmap2 0.9.10 — MIT OR Apache-2.0
- memoffset 0.9.1 — MIT
- mime 0.3.17 — MIT OR Apache-2.0
- minidump-common 0.21.2 — MIT
- minidump-writer 0.8.9 — MIT
- minidumper 0.8.3 — MIT OR Apache-2.0
- minidumper-child 0.2.2 — MIT OR Apache-2.0
- minisign-verify 0.2.5 — MIT
- miniz_oxide 0.8.9 — MIT OR Zlib OR Apache-2.0
- mio 1.2.0 — MIT
- muda 0.19.1 — Apache-2.0 OR MIT
- ndk 0.9.0 — MIT OR Apache-2.0
- ndk-sys 0.6.0+11769913 — MIT OR Apache-2.0
- new_debug_unreachable 1.0.6 — MIT
- nix 0.28.0 — MIT
- nix 0.31.3 — MIT
- num-conv 0.2.1 — MIT OR Apache-2.0
- num-derive 0.4.2 — MIT OR Apache-2.0
- num-traits 0.2.19 — MIT OR Apache-2.0
- num_enum 0.7.6 — BSD-3-Clause OR MIT OR Apache-2.0
- num_enum_derive 0.7.6 — BSD-3-Clause OR MIT OR Apache-2.0
- objc2 0.6.4 — MIT
- objc2-app-kit 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-cloud-kit 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-core-data 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-core-foundation 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-core-graphics 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-core-image 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-core-location 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-core-text 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-encode 4.1.0 — MIT
- objc2-exception-helper 0.1.1 — Zlib OR Apache-2.0 OR MIT
- objc2-foundation 0.3.2 — MIT
- objc2-io-surface 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-osa-kit 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-quartz-core 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-ui-kit 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-user-notifications 0.3.2 — Zlib OR Apache-2.0 OR MIT
- objc2-web-kit 0.3.2 — Zlib OR Apache-2.0 OR MIT
- object 0.37.3 — Apache-2.0 OR MIT
- once_cell 1.21.4 — MIT OR Apache-2.0
- oorandom 11.1.5 — MIT
- open 5.3.4 — MIT
- openssl-probe 0.2.1 — MIT OR Apache-2.0
- option-ext 0.2.0 — MPL-2.0
- ordered-stream 0.2.0 — MIT OR Apache-2.0
- os_info 3.15.0 — MIT
- osakit 0.3.1 — MIT OR Apache-2.0
- pango 0.18.3 — MIT
- pango-sys 0.18.0 — MIT
- parking 2.2.1 — Apache-2.0 OR MIT
- parking_lot 0.12.5 — MIT OR Apache-2.0
- parking_lot_core 0.9.12 — MIT OR Apache-2.0
- pathdiff 0.2.3 — MIT/Apache-2.0
- percent-encoding 2.3.2 — MIT OR Apache-2.0
- phf 0.11.3 — MIT
- phf 0.13.1 — MIT
- phf_codegen 0.13.1 — MIT
- phf_generator 0.11.3 — MIT
- phf_generator 0.13.1 — MIT
- phf_macros 0.11.3 — MIT
- phf_macros 0.13.1 — MIT
- phf_shared 0.11.3 — MIT
- phf_shared 0.13.1 — MIT
- pin-project-lite 0.2.17 — Apache-2.0 OR MIT
- piper 0.2.5 — MIT OR Apache-2.0
- pkg-config 0.3.33 — MIT OR Apache-2.0
- plain 0.2.3 — MIT/Apache-2.0
- plist 1.9.0 — MIT
- png 0.17.16 — MIT OR Apache-2.0
- png 0.18.1 — MIT OR Apache-2.0
- polling 3.11.0 — Apache-2.0 OR MIT
- potential_utf 0.1.5 — Unicode-3.0
- powerfmt 0.2.0 — MIT OR Apache-2.0
- ppv-lite86 0.2.21 — MIT OR Apache-2.0
- precomputed-hash 0.1.1 — MIT
- prettyplease 0.2.37 — MIT OR Apache-2.0
- proc-macro-crate 1.3.1 — MIT OR Apache-2.0
- proc-macro-crate 2.0.2 — MIT OR Apache-2.0
- proc-macro-crate 3.5.0 — MIT OR Apache-2.0
- proc-macro-error 1.0.4 — MIT OR Apache-2.0
- proc-macro-error-attr 1.0.4 — MIT OR Apache-2.0
- proc-macro2 1.0.106 — MIT OR Apache-2.0
- procfs-core 0.16.0 — MIT OR Apache-2.0
- quick-xml 0.39.2 — MIT
- quinn 0.11.9 — MIT OR Apache-2.0
- quinn-proto 0.11.14 — MIT OR Apache-2.0
- quinn-udp 0.5.14 — MIT OR Apache-2.0
- quote 1.0.45 — MIT OR Apache-2.0
- r-efi 5.3.0 — MIT OR Apache-2.0 OR LGPL-2.1-or-later
- r-efi 6.0.0 — MIT OR Apache-2.0 OR LGPL-2.1-or-later
- rand 0.8.6 — MIT OR Apache-2.0
- rand 0.9.4 — MIT OR Apache-2.0
- rand_chacha 0.9.0 — MIT OR Apache-2.0
- rand_core 0.6.4 — MIT OR Apache-2.0
- rand_core 0.9.5 — MIT OR Apache-2.0
- range-map 0.2.0 — MIT/Apache-2.0
- raw-window-handle 0.6.2 — MIT OR Apache-2.0 OR Zlib
- redox_syscall 0.5.18 — MIT
- redox_users 0.5.2 — MIT
- ref-cast 1.0.25 — MIT OR Apache-2.0
- ref-cast-impl 1.0.25 — MIT OR Apache-2.0
- regex 1.12.3 — MIT OR Apache-2.0
- regex-automata 0.4.14 — MIT OR Apache-2.0
- regex-lite 0.1.9 — MIT OR Apache-2.0
- regex-syntax 0.8.10 — MIT OR Apache-2.0
- reqwest 0.12.28 — MIT OR Apache-2.0
- reqwest 0.13.3 — MIT OR Apache-2.0
- rfd 0.16.0 — MIT
- ring 0.17.14 — Apache-2.0 AND ISC
- rustc-demangle 0.1.27 — MIT/Apache-2.0
- rustc-hash 2.1.2 — Apache-2.0 OR MIT
- rustc_version 0.4.1 — MIT OR Apache-2.0
- rustix 0.38.44 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- rustix 1.1.4 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- rustls 0.23.40 — Apache-2.0 OR ISC OR MIT
- rustls-native-certs 0.8.3 — Apache-2.0 OR ISC OR MIT
- rustls-pki-types 1.14.1 — MIT OR Apache-2.0
- rustls-platform-verifier 0.7.0 — MIT OR Apache-2.0
- rustls-platform-verifier-android 0.1.1 — MIT OR Apache-2.0
- rustls-webpki 0.103.13 — ISC
- rustversion 1.0.22 — MIT OR Apache-2.0
- ryu 1.0.23 — Apache-2.0 OR BSL-1.0
- same-file 1.0.6 — Unlicense/MIT
- schannel 0.1.29 — MIT
- schemars 0.8.22 — MIT
- schemars 0.9.0 — MIT
- schemars 1.2.1 — MIT
- schemars_derive 0.8.22 — MIT
- scopeguard 1.2.0 — MIT OR Apache-2.0
- scroll 0.12.0 — MIT
- scroll_derive 0.12.1 — MIT
- security-framework 3.7.0 — MIT OR Apache-2.0
- security-framework-sys 2.17.0 — MIT OR Apache-2.0
- selectors 0.36.1 — MPL-2.0
- semver 1.0.28 — MIT OR Apache-2.0
- sentry 0.42.0 — MIT
- sentry-actix 0.42.0 — MIT
- sentry-backtrace 0.42.0 — MIT
- sentry-contexts 0.42.0 — MIT
- sentry-core 0.42.0 — MIT
- sentry-debug-images 0.42.0 — MIT
- sentry-panic 0.42.0 — MIT
- sentry-rust-minidump 0.13.0 — MIT OR Apache-2.0
- sentry-tracing 0.42.0 — MIT
- sentry-types 0.42.0 — MIT
- serde 1.0.228 — MIT OR Apache-2.0
- serde-untagged 0.1.9 — MIT OR Apache-2.0
- serde_core 1.0.228 — MIT OR Apache-2.0
- serde_derive 1.0.228 — MIT OR Apache-2.0
- serde_derive_internals 0.29.1 — MIT OR Apache-2.0
- serde_json 1.0.149 — MIT OR Apache-2.0
- serde_repr 0.1.20 — MIT OR Apache-2.0
- serde_spanned 0.6.9 — MIT OR Apache-2.0
- serde_spanned 1.1.1 — MIT OR Apache-2.0
- serde_urlencoded 0.7.1 — MIT/Apache-2.0
- serde_with 3.19.0 — MIT OR Apache-2.0
- serde_with_macros 3.19.0 — MIT OR Apache-2.0
- serialize-to-javascript 0.1.2 — MIT OR Apache-2.0
- serialize-to-javascript-impl 0.1.2 — MIT OR Apache-2.0
- servo_arc 0.4.3 — MIT OR Apache-2.0
- sha2 0.10.9 — MIT OR Apache-2.0
- shlex 1.3.0 — MIT OR Apache-2.0
- signal-hook-registry 1.4.8 — MIT OR Apache-2.0
- simd-adler32 0.3.9 — MIT
- simd_cesu8 1.1.1 — Apache-2.0 OR MIT
- simdutf8 0.1.5 — MIT OR Apache-2.0
- siphasher 1.0.3 — MIT/Apache-2.0
- slab 0.4.12 — MIT
- smallvec 1.15.1 — MIT OR Apache-2.0
- smart-default 0.7.1 — MIT
- socket2 0.5.10 — MIT OR Apache-2.0
- socket2 0.6.3 — MIT OR Apache-2.0
- softbuffer 0.4.8 — MIT OR Apache-2.0
- soup3 0.5.0 — MIT
- soup3-sys 0.5.0 — MIT
- stable_deref_trait 1.2.1 — MIT OR Apache-2.0
- string_cache 0.9.0 — MIT OR Apache-2.0
- string_cache_codegen 0.6.1 — MIT OR Apache-2.0
- strsim 0.11.1 — MIT
- subtle 2.6.1 — BSD-3-Clause
- swift-rs 1.0.7 — MIT OR Apache-2.0
- syn 1.0.109 — MIT OR Apache-2.0
- syn 2.0.117 — MIT OR Apache-2.0
- sync_wrapper 1.0.2 — Apache-2.0
- synstructure 0.13.2 — MIT
- system-deps 6.2.2 — MIT OR Apache-2.0
- tao 0.35.0 — Apache-2.0
- tao-macros 0.1.3 — MIT OR Apache-2.0
- tar 0.4.46 — MIT OR Apache-2.0
- target-lexicon 0.12.16 — Apache-2.0 WITH LLVM-exception
- tauri 2.11.0 — Apache-2.0 OR MIT
- tauri-build 2.6.0 — Apache-2.0 OR MIT
- tauri-codegen 2.6.0 — Apache-2.0 OR MIT
- tauri-macros 2.6.0 — Apache-2.0 OR MIT
- tauri-plugin 2.6.0 — Apache-2.0 OR MIT
- tauri-plugin-dialog 2.7.1 — Apache-2.0 OR MIT
- tauri-plugin-fs 2.5.1 — Apache-2.0 OR MIT
- tauri-plugin-opener 2.5.4 — Apache-2.0 OR MIT
- tauri-plugin-process 2.3.1 — Apache-2.0 OR MIT
- tauri-plugin-sentry 0.5.0 — MIT OR Apache-2.0
- tauri-plugin-updater 2.10.1 — Apache-2.0 OR MIT
- tauri-runtime 2.11.0 — Apache-2.0 OR MIT
- tauri-runtime-wry 2.11.0 — Apache-2.0 OR MIT
- tauri-utils 2.9.0 — Apache-2.0 OR MIT
- tauri-winres 0.3.6 — MIT
- tempfile 3.27.0 — MIT OR Apache-2.0
- tendril 0.5.0 — MIT OR Apache-2.0
- thiserror 1.0.69 — MIT OR Apache-2.0
- thiserror 2.0.18 — MIT OR Apache-2.0
- thiserror-impl 1.0.69 — MIT OR Apache-2.0
- thiserror-impl 2.0.18 — MIT OR Apache-2.0
- time 0.3.47 — MIT OR Apache-2.0
- time-core 0.1.8 — MIT OR Apache-2.0
- time-macros 0.2.27 — MIT OR Apache-2.0
- tinystr 0.8.3 — Unicode-3.0
- tinytemplate 1.2.1 — Apache-2.0 OR MIT
- tinyvec 1.11.0 — Zlib OR Apache-2.0 OR MIT
- tinyvec_macros 0.1.1 — MIT OR Apache-2.0 OR Zlib
- tokio 1.52.2 — MIT
- tokio-macros 2.7.0 — MIT
- tokio-rustls 0.26.4 — MIT OR Apache-2.0
- tokio-util 0.7.18 — MIT
- toml 0.8.2 — MIT OR Apache-2.0
- toml 0.9.12+spec-1.1.0 — MIT OR Apache-2.0
- toml 1.1.2+spec-1.1.0 — MIT OR Apache-2.0
- toml_datetime 0.6.3 — MIT OR Apache-2.0
- toml_datetime 0.7.5+spec-1.1.0 — MIT OR Apache-2.0
- toml_datetime 1.1.1+spec-1.1.0 — MIT OR Apache-2.0
- toml_edit 0.19.15 — MIT OR Apache-2.0
- toml_edit 0.20.2 — MIT OR Apache-2.0
- toml_edit 0.25.11+spec-1.1.0 — MIT OR Apache-2.0
- toml_parser 1.1.2+spec-1.1.0 — MIT OR Apache-2.0
- toml_writer 1.1.1+spec-1.1.0 — MIT OR Apache-2.0
- tower 0.5.3 — MIT
- tower-http 0.6.8 — MIT
- tower-layer 0.3.3 — MIT
- tower-service 0.3.3 — MIT
- tracing 0.1.44 — MIT
- tracing-attributes 0.1.31 — MIT
- tracing-core 0.1.36 — MIT
- tracing-subscriber 0.3.23 — MIT
- tray-icon 0.23.1 — MIT OR Apache-2.0
- try-lock 0.2.5 — MIT
- typeid 1.0.3 — MIT OR Apache-2.0
- typenum 1.20.0 — MIT OR Apache-2.0
- uds 0.4.2 — Apache-2.0 OR MIT
- uds_windows 1.2.1 — MIT
- uname 0.1.1 — MIT/Apache-2.0
- unic-char-property 0.9.0 — MIT/Apache-2.0
- unic-char-range 0.9.0 — MIT/Apache-2.0
- unic-common 0.9.0 — MIT/Apache-2.0
- unic-ucd-ident 0.9.0 — MIT/Apache-2.0
- unic-ucd-version 0.9.0 — MIT/Apache-2.0
- unicode-ident 1.0.24 — (MIT OR Apache-2.0) AND Unicode-3.0
- unicode-segmentation 1.13.2 — MIT OR Apache-2.0
- unicode-xid 0.2.6 — MIT OR Apache-2.0
- untrusted 0.9.0 — ISC
- ureq 3.3.0 — MIT OR Apache-2.0
- ureq-proto 0.6.0 — MIT OR Apache-2.0
- url 2.5.8 — MIT OR Apache-2.0
- urlpattern 0.3.0 — MIT
- utf-8 0.7.6 — MIT OR Apache-2.0
- utf8-zero 0.8.1 — MIT OR Apache-2.0
- utf8_iter 1.0.4 — Apache-2.0 OR MIT
- uuid 1.23.1 — Apache-2.0 OR MIT
- valuable 0.1.1 — MIT
- version-compare 0.2.1 — MIT
- version_check 0.9.5 — MIT/Apache-2.0
- vswhom 0.1.0 — MIT
- vswhom-sys 0.1.3 — MIT
- walkdir 2.5.0 — Unlicense/MIT
- want 0.3.1 — MIT
- wasi 0.11.1+wasi-snapshot-preview1 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wasip2 1.0.3+wasi-0.2.9 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wasip3 0.4.0+wasi-0.3.0-rc-2026-01-06 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wasm-bindgen 0.2.120 — MIT OR Apache-2.0
- wasm-bindgen-futures 0.4.70 — MIT OR Apache-2.0
- wasm-bindgen-macro 0.2.120 — MIT OR Apache-2.0
- wasm-bindgen-macro-support 0.2.120 — MIT OR Apache-2.0
- wasm-bindgen-shared 0.2.120 — MIT OR Apache-2.0
- wasm-encoder 0.244.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wasm-metadata 0.244.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wasm-streams 0.5.0 — MIT OR Apache-2.0
- wasmparser 0.244.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- web-sys 0.3.97 — MIT OR Apache-2.0
- web-time 1.1.0 — MIT OR Apache-2.0
- web_atoms 0.2.4 — MIT OR Apache-2.0
- webkit2gtk 2.0.2 — MIT
- webkit2gtk-sys 2.0.2 — MIT
- webpki-root-certs 1.0.7 — CDLA-Permissive-2.0
- webpki-roots 1.0.7 — CDLA-Permissive-2.0
- webview2-com 0.38.2 — MIT
- webview2-com-macros 0.8.1 — MIT
- webview2-com-sys 0.38.2 — MIT
- which 6.0.3 — MIT
- winapi 0.3.9 — MIT/Apache-2.0
- winapi-i686-pc-windows-gnu 0.4.0 — MIT/Apache-2.0
- winapi-util 0.1.11 — Unlicense OR MIT
- winapi-x86_64-pc-windows-gnu 0.4.0 — MIT/Apache-2.0
- window-vibrancy 0.6.0 — Apache-2.0 OR MIT
- windows 0.61.3 — MIT OR Apache-2.0
- windows-collections 0.2.0 — MIT OR Apache-2.0
- windows-core 0.61.2 — MIT OR Apache-2.0
- windows-core 0.62.2 — MIT OR Apache-2.0
- windows-future 0.2.1 — MIT OR Apache-2.0
- windows-implement 0.60.2 — MIT OR Apache-2.0
- windows-interface 0.59.3 — MIT OR Apache-2.0
- windows-link 0.1.3 — MIT OR Apache-2.0
- windows-link 0.2.1 — MIT OR Apache-2.0
- windows-numerics 0.2.0 — MIT OR Apache-2.0
- windows-result 0.3.4 — MIT OR Apache-2.0
- windows-result 0.4.1 — MIT OR Apache-2.0
- windows-strings 0.4.2 — MIT OR Apache-2.0
- windows-strings 0.5.1 — MIT OR Apache-2.0
- windows-sys 0.45.0 — MIT OR Apache-2.0
- windows-sys 0.52.0 — MIT OR Apache-2.0
- windows-sys 0.59.0 — MIT OR Apache-2.0
- windows-sys 0.60.2 — MIT OR Apache-2.0
- windows-sys 0.61.2 — MIT OR Apache-2.0
- windows-targets 0.42.2 — MIT OR Apache-2.0
- windows-targets 0.52.6 — MIT OR Apache-2.0
- windows-targets 0.53.5 — MIT OR Apache-2.0
- windows-threading 0.1.0 — MIT OR Apache-2.0
- windows-version 0.1.7 — MIT OR Apache-2.0
- windows_aarch64_gnullvm 0.42.2 — MIT OR Apache-2.0
- windows_aarch64_gnullvm 0.52.6 — MIT OR Apache-2.0
- windows_aarch64_gnullvm 0.53.1 — MIT OR Apache-2.0
- windows_aarch64_msvc 0.42.2 — MIT OR Apache-2.0
- windows_aarch64_msvc 0.52.6 — MIT OR Apache-2.0
- windows_aarch64_msvc 0.53.1 — MIT OR Apache-2.0
- windows_i686_gnu 0.42.2 — MIT OR Apache-2.0
- windows_i686_gnu 0.52.6 — MIT OR Apache-2.0
- windows_i686_gnu 0.53.1 — MIT OR Apache-2.0
- windows_i686_gnullvm 0.52.6 — MIT OR Apache-2.0
- windows_i686_gnullvm 0.53.1 — MIT OR Apache-2.0
- windows_i686_msvc 0.42.2 — MIT OR Apache-2.0
- windows_i686_msvc 0.52.6 — MIT OR Apache-2.0
- windows_i686_msvc 0.53.1 — MIT OR Apache-2.0
- windows_x86_64_gnu 0.42.2 — MIT OR Apache-2.0
- windows_x86_64_gnu 0.52.6 — MIT OR Apache-2.0
- windows_x86_64_gnu 0.53.1 — MIT OR Apache-2.0
- windows_x86_64_gnullvm 0.42.2 — MIT OR Apache-2.0
- windows_x86_64_gnullvm 0.52.6 — MIT OR Apache-2.0
- windows_x86_64_gnullvm 0.53.1 — MIT OR Apache-2.0
- windows_x86_64_msvc 0.42.2 — MIT OR Apache-2.0
- windows_x86_64_msvc 0.52.6 — MIT OR Apache-2.0
- windows_x86_64_msvc 0.53.1 — MIT OR Apache-2.0
- winnow 0.5.40 — MIT
- winnow 0.6.26 — MIT
- winnow 0.7.15 — MIT
- winnow 1.0.2 — MIT
- winreg 0.55.0 — MIT
- winsafe 0.0.19 — MIT
- wit-bindgen 0.51.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wit-bindgen 0.57.1 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wit-bindgen-core 0.51.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wit-bindgen-rust 0.51.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wit-bindgen-rust-macro 0.51.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wit-component 0.244.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- wit-parser 0.244.0 — Apache-2.0 WITH LLVM-exception OR Apache-2.0 OR MIT
- writeable 0.6.3 — Unicode-3.0
- wry 0.55.0 — Apache-2.0 OR MIT
- x11 2.21.0 — MIT
- x11-dl 2.21.0 — MIT
- xattr 1.6.1 — MIT OR Apache-2.0
- yoke 0.8.2 — Unicode-3.0
- yoke-derive 0.8.2 — Unicode-3.0
- zbus 5.15.0 — MIT
- zbus_macros 5.15.0 — MIT
- zbus_names 4.3.2 — MIT
- zerocopy 0.8.48 — BSD-2-Clause OR Apache-2.0 OR MIT
- zerocopy-derive 0.8.48 — BSD-2-Clause OR Apache-2.0 OR MIT
- zerofrom 0.1.7 — Unicode-3.0
- zerofrom-derive 0.1.7 — Unicode-3.0
- zeroize 1.8.2 — Apache-2.0 OR MIT
- zerotrie 0.2.4 — Unicode-3.0
- zerovec 0.11.6 — Unicode-3.0
- zerovec-derive 0.11.3 — Unicode-3.0
- zip 2.4.2 — MIT
- zip 4.6.1 — MIT
- zmij 1.0.21 — MIT
- zopfli 0.8.3 — Apache-2.0
- zvariant 5.11.0 — MIT
- zvariant_derive 5.11.0 — MIT
- zvariant_utils 3.3.1 — MIT

### JavaScript / npm (production dependencies)

- @esbuild/darwin-arm64@0.27.7 — MIT
- @fontsource-variable/geist-mono@5.2.7 — OFL-1.1
- @jridgewell/gen-mapping@0.3.13 — MIT
- @jridgewell/remapping@2.3.5 — MIT
- @jridgewell/resolve-uri@3.1.2 — MIT
- @jridgewell/sourcemap-codec@1.5.5 — MIT
- @jridgewell/trace-mapping@0.3.31 — MIT
- @rollup/rollup-darwin-arm64@4.60.2 — MIT
- @sentry-internal/browser-utils@10.56.0 — MIT
- @sentry-internal/feedback@10.56.0 — MIT
- @sentry-internal/replay-canvas@10.56.0 — MIT
- @sentry-internal/replay@10.56.0 — MIT
- @sentry/browser@10.56.0 — MIT
- @sentry/core@10.56.0 — MIT
- @tailwindcss/node@4.2.4 — MIT
- @tailwindcss/oxide-darwin-arm64@4.2.4 — MIT
- @tailwindcss/oxide@4.2.4 — MIT
- @tailwindcss/vite@4.2.4 — MIT
- @tanstack/react-virtual@3.13.24 — MIT
- @tanstack/virtual-core@3.14.0 — MIT
- @tauri-apps/api@2.11.0 — Apache-2.0 OR MIT
- @tauri-apps/plugin-dialog@2.7.1 — MIT OR Apache-2.0
- @tauri-apps/plugin-fs@2.5.1 — MIT OR Apache-2.0
- @tauri-apps/plugin-opener@2.5.4 — MIT OR Apache-2.0
- @tauri-apps/plugin-process@2.3.1 — MIT OR Apache-2.0
- @tauri-apps/plugin-updater@2.10.1 — MIT OR Apache-2.0
- @types/estree@1.0.8 — MIT
- @types/node@25.6.0 — MIT
- @types/react@19.2.14 — MIT
- class-variance-authority@0.7.1 — Apache-2.0
- clsx@2.1.1 — MIT
- csstype@3.2.3 — MIT
- detect-libc@2.1.2 — Apache-2.0
- enhanced-resolve@5.21.0 — MIT
- esbuild@0.27.7 — MIT
- fdir@6.5.0 — MIT
- fsevents@2.3.3 — MIT
- graceful-fs@4.2.11 — ISC
- jiti@2.6.1 — MIT
- lightningcss-darwin-arm64@1.32.0 — MPL-2.0
- lightningcss@1.32.0 — MPL-2.0
- logcat-on@0.4.2 — UNLICENSED
- lucide-react@1.14.0 — ISC
- magic-string@0.30.21 — MIT
- nanoid@3.3.12 — MIT
- picocolors@1.1.1 — ISC
- picomatch@4.0.4 — MIT
- postcss@8.5.13 — MIT
- react-dom@19.2.5 — MIT
- react@19.2.5 — MIT
- rollup@4.60.2 — MIT
- scheduler@0.27.0 — MIT
- source-map-js@1.2.1 — BSD-3-Clause
- tailwind-merge@3.5.0 — MIT
- tailwindcss@4.2.4 — MIT
- tapable@2.3.3 — MIT
- tinyglobby@0.2.16 — MIT
- undici-types@7.19.2 — MIT
- vite@7.3.2 — MIT
- zustand@5.0.12 — MIT
