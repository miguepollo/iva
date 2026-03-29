<script>
  import { ChevronDown } from 'lucide-svelte'
  import { slide } from 'svelte/transition'

  export let title = ''
  let isOpen = false

  function toggle() {
    isOpen = !isOpen
  }
</script>

<div class="border-b border-gray-100 last:border-b-0">
  <button
    on:click={toggle}
    type="button"
    class="w-full flex items-center justify-between py-4 text-left font-semibold text-gray-900 hover:text-sky-600 transition-colors"
  >
    <span class="text-lg">{title}</span>
    <ChevronDown
      class="w-5 h-5 text-gray-400 transition-transform duration-300"
      style="transform: rotate({isOpen ? '180deg' : '0deg'})"
    />
  </button>

  {#if isOpen}
    <div transition:slide={{ duration: 200 }} class="pb-4 text-gray-500 leading-relaxed">
      <slot />
    </div>
  {/if}
</div>
