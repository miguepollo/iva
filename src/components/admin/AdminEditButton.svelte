<script>
  import { Pencil } from 'lucide-svelte'
  import { router } from '../../stores/router.js'

  function goToAdmin() {
    router.navigate('/admin/login')
  }
</script>

<div class="fixed bottom-6 right-6 z-30">
  <button
    type="button"
    on:click={goToAdmin}
    class="flex items-center gap-2 px-4 py-3 bg-coral-soft text-white rounded-xl shadow-lg hover:bg-pink-400 transition-colors font-medium"
    aria-label="Editar contenido"
  >
    <Pencil class="w-5 h-5" />
    <span class="hidden sm:inline">Editar</span>
  </button>
</div>
