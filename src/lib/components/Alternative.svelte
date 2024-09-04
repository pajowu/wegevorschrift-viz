<script lang="ts">
  import CountryVorschrift from "./CountryVorschrift.svelte";

  export let parts, rics_data, country;
</script>

<div class="alt">
  {#each parts as part}
    <div class="part">
      {#each part as wegevorschrift}
        <CountryVorschrift
          {wegevorschrift}
          {rics_data}
          parent_country={country}
        />
      {/each}
    </div>
  {/each}
</div>

<style>
  .alt {
    display: inline-flex;
    flex-direction: column;
    text-align: center;
  }
  .part {
    border: 2px solid black;
    border-bottom: none;
    margin: 0 5px;
  }

  .part:last-child {
    border-bottom: 2px solid black;
  }
</style>
