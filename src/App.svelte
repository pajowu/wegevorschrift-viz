<script lang="ts">
  import { DeutschlandtarifData } from "./data/deutschlandtarif";
  import Viz from "./lib/Viz.svelte";
  const db = new DeutschlandtarifData();
  let updatePromise = db.update();
  console.log("ltkz", db);

  let input_value = "";
</script>

<main>
  <h1>Wegevorschrift</h1>

  {#await updatePromise}
    <p>Loading data</p>
  {:catch}
    <p>Warning: Failed to load data</p>
  {/await}

  <input bind:value={input_value} />

  <Viz {input_value} {db} />
</main>

<style>
</style>
