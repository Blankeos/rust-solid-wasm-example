## Rust Solid WASM Example

Steps I did (as notes):

1. Create this Solid project.
2. Install Rust
3. Install wasm-pack (Use cargo)
4. Create a new Rust project: `cargo new --lib hello-wasm`
5. In Cargo.toml, add `wasm-bindgen` as a dependency. (Handles the JS -> Rust communication type generation)
6. Write on the `lib.rs` (Make a function that I can use. Also call the prelude and macro for wasm_bindgen to setup)
7. Run `wasm-pack build --target web` on the `hello-wasm` project. It will create a `pkg` folder witht he compiled wasm files (Important files: `.wasm` the module, `.js` for imports, and `.d.ts` for types - I think self-explanatory).
