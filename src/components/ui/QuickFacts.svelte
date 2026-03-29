<script>
  import { fly } from 'svelte/transition'

  export let facts = []
</script>

<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  {#each facts as fact, i (fact.label)}
    <div
      in:fly={{ y: 20, delay: i * 100 }}
      class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-center hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
      <div class="flex justify-center mb-3">
        <div class="p-2 bg-sky-50 rounded-xl">
          <svelte:component this={fact.icon} class="w-5 h-5 text-sky-600" />
        </div>
      </div>
      <div class="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">{fact.label}</div>
      <div class="font-bold text-gray-900">{fact.value}</div>
    </div>
  {/each}
</div>
