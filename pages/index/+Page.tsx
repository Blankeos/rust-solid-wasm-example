import getTitle from "@/utils/get-title";
import { createSignal, onMount } from "solid-js";
import { createStore } from "solid-js/store";
import { useMetadata } from "vike-metadata-solid";
import init, { add, process_array, run_100_000_iterations } from "../../hello-wasm/pkg/hello_wasm";

export default function Page() {
  useMetadata({
    title: getTitle("Home"),
  });

  const [store, setStore] = createStore<{ a: number; b: number; result: string | undefined }>({
    a: 1,
    b: 5,
    result: undefined,
  });
  const [wasmModuleHasInitialized, setWasmModuleHasInitialized] = createSignal(false);

  onMount(async () => {
    await init();
    setWasmModuleHasInitialized(true);
  });

  const [iterationsResult, setIterationsResult] = createStore<{
    js?: number;
    rust?: number;
  }>({});

  function run100_000Iterations() {
    const jsStart = performance.now();
    let _num = 0;
    for (let i = 0; i < 100_000; i++) {
      _num += 1;
    }
    const jsResult = performance.now() - jsStart;

    const rsStart = performance.now();
    run_100_000_iterations();
    const rsResult = performance.now() - rsStart;

    setIterationsResult({
      js: jsResult,
      rust: rsResult,
    });
  }

  return (
    <>
      <div>
        <h1>
          My Solid + Wasm (Rust) app (Initialized: {wasmModuleHasInitialized() ? "yes" : "no"})
        </h1>
        <input
          type="number"
          value={store.a}
          onInput={(e) => setStore("a", parseInt(e.target.value))}
        />
        +
        <input
          type="number"
          value={store.b}
          onInput={(e) => setStore("b", parseInt(e.target.value))}
        />
        <br />
        <button
          onClick={() => {
            const result = add(store.a, store.b);

            setStore("result", `${result} from rust!`);

            console.log(result, "from rust!");
          }}
        >
          Add
        </button>
        <div>Result: {store.result}</div>
        <br />
        <h2>Run 100_000 iterations (i think Rust is faster)</h2>{" "}
        <button onClick={run100_000Iterations}>Run!</button>
        <p>JS: {iterationsResult.js}</p>
        <p>Rust: {iterationsResult.rust}</p>
        <br />
        <h2>Process CSV</h2>
        <button
          onClick={() => {
            process_array();
          }}
        >
          Process
        </button>
      </div>
    </>
  );
}
