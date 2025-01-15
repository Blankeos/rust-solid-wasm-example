use wasm_bindgen::prelude::*;

//------

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

// ---

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

use rowboat::dataframe::*;

#[wasm_bindgen]
pub fn process_array() {
    let df = Dataframe::from_rows(
        vec!["id", "name", "score", "val"],
        vec![
            row!(1, "Sally", 23, true),
            row!(2, "Jasper", 41, false),
            row!(3, "Jake", 33, true),
        ],
    )
    .unwrap();

    console_log!("df: {:?}", df);

    df.print();
}
