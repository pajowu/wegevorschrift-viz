<script lang="ts">
  import { DeutschlandtarifData } from "./data/deutschlandtarif";
  import Viz from "./lib/Viz.svelte";
  const db = new DeutschlandtarifData();
  let updatePromise = db.update();
  console.log("ltkz", db);

  let input_value = "";
</script>

<main>
  {#await updatePromise}
    <p>Loading data</p>
  {:then}
    <h1>Wegevorschrift</h1>

    <input bind:value={input_value} />

    <Viz {input_value} {db} />
  {/await}
</main>

<style>
</style>
