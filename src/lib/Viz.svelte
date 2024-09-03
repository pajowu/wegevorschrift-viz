<script lang="ts">
  import { parse } from "./parser";
  import { translateWegevorschrift, unparseWegevorschrift } from "./util";

  export let input_value, db;

  function safeWrap<T>(fn: () => T): T | null {
    try {
      return fn();
    } catch {
      return null;
    }
  }
  $: translatePromise = safeWrap(() =>
    translateWegevorschrift(parse(input_value), db)
  );
</script>

{#await translatePromise}
  <p>loading</p>
{:then translated}
  <p>{unparseWegevorschrift(translated || [])}</p>
{/await}
