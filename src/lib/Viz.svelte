<script lang="ts">
  import CountryVorschrift from "./components/CountryVorschrift.svelte";
  import { parse } from "./parser";
  import {
    getFlagEmoji,
    translateWegevorschrift,
    unparseWegevorschrift,
  } from "./util";

  export let input_value, db, rics_data;

  function safeWrap<T>(fn: () => T): T | null {
    try {
      return fn();
    } catch (e) {
      console.error(e);
      return null;
    }
  }
  $: translatePromise = safeWrap(() =>
    translateWegevorschrift(parse(input_value.trim()), db)
  );
</script>

{#await translatePromise}
  <p>loading</p>
{:then translated}
  <div class="wegelist">
    {#each translated || [] as wegevorschrift}
      <div>
        <CountryVorschrift {wegevorschrift} {rics_data} />
      </div>
    {/each}
  </div>
{/await}

<style>
  .wegelist {
    margin: 1em 0;
    display: flex;
    align-items: stretch;
  }
</style>
