<script>
  import { fly } from 'svelte/transition'

  export let tabs = []
  export let activeTab = ''

  $: currentTab = activeTab || tabs[0]?.id

  function setTab(id) {
    activeTab = id
  }
</script>

<div>
  <div class="flex gap-2 p-1.5 bg-gray-100/80 rounded-2xl mb-8 overflow-x-auto">
    {#each tabs as tab (tab.id)}
      <button
        on:click={() => setTab(tab.id)}
        class="relative px-5 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 whitespace-nowrap"
        class:text-white={currentTab === tab.id}
        class:text-gray-500={currentTab !== tab.id}
        class:hover:text-gray-700={currentTab !== tab.id}
      >
        {#if currentTab === tab.id}
          <div
            in:fly={{ x: -20 }}
            class="absolute inset-0 bg-gradient-to-r from-sky-500 to-sky-400 rounded-xl shadow-md shadow-sky-200/50"
          />
        {/if}
        <span class="relative z-10">{tab.label}</span>
      </button>
    {/each}
  </div>

  {#each tabs as tab (tab.id)}
    {#if currentTab === tab.id}
      <div in:fly={{ y: 10, duration: 200 }}>
        {#if tab.content?.render}
          {@html tab.content.render()}
        {:else}
          <svelte:component this={tab.content} />
        {/if}
      </div>
    {/if}
  {/each}
</div>
