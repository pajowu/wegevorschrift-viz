<script lang="ts">
  import { DeutschlandtarifData } from "./data/deutschlandtarif";
  import { RicsData } from "./data/rics";
  import Viz from "./lib/Viz.svelte";
  const db = new DeutschlandtarifData();
  const rics_data = new RicsData();
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

  <Viz {input_value} {db} {rics_data} />
</main>

<style>
</style>
