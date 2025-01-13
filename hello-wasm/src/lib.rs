use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}

#[wasm_bindgen]
pub fn run_100_000_iterations() -> i32 {
    let mut i: i32 = 0;

    for _ in 0..100_000 {
        i += 1;
    }

    i
}
