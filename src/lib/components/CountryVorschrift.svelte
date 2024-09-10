<script lang="ts">
  import { getFlagEmoji } from "../util";
  import Alternative from "./Alternative.svelte";

  export let wegevorschrift, rics_data;
  export let parent_country = null;
</script>

<div
  class="vorschrift"
  class:show-country={parent_country !== wegevorschrift.country}
>
  <div class="flag">
    {rics_data.getCountry(wegevorschrift.country)
      ? getFlagEmoji(rics_data.getCountry(wegevorschrift.country))
      : ""}
  </div>

  <div class="way">
    {#each wegevorschrift.way as part, i}
      {#if typeof part === "string"}
        {part}
      {:else}
        <Alternative
          parts={part}
          {rics_data}
          country={wegevorschrift.country}
        />
      {/if}
      {#if i !== wegevorschrift.way.length - 1}
        *{" "}
      {/if}
    {/each}
  </div>
</div>

<style>
  .vorschrift {
    display: inline-block;
    background-color: lightgray;
    height: 100%;
  }
  .flag {
    display: none;
  }
  .show-country {
    padding: 0.5em;
  }
  .show-country > .flag {
    display: block;
    padding-bottom: 1em;
  }
  .way {
    display: flex;
    align-items: center;
  }
</style>
