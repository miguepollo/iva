<script>
  import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-svelte'
  import { router } from '../stores/router.js'

  const ADMIN_PASSWORD = '20262026'

  let password = ''
  let showPassword = false
  let error = ''
  let shake = false

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('iva-admin', 'true')
      }
      router.navigate('/admin')
    } else {
      error = 'Contraseña incorrecta'
      shake = true
      setTimeout(() => shake = false, 600)
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Enter') handleLogin()
  }
</script>

<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
  <div class="w-full max-w-md">
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-16 h-16 bg-sky-pastel/20 rounded-2xl mb-4">
        <Lock class="w-8 h-8 text-sky-pastel" />
      </div>
      <h1 class="text-2xl font-bold text-white">Panel de Administración</h1>
      <p class="text-gray-400 mt-2">Introduce la contraseña para acceder</p>
    </div>

    <div class="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
      <div class="space-y-4">
        <div>
          <label for="admin-password" class="block text-sm text-gray-300 mb-2">Contraseña</label>
          <div class="relative">
            <input
              id="admin-password"
              type="password"
              bind:value={password}
              on:keydown={handleKeydown}
              placeholder="••••••••"
              class="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-pastel focus:border-transparent"
            />
            <button
              type="button"
              on:click={() => showPassword = !showPassword}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              {#if showPassword}
                <EyeOff class="w-5 h-5" />
              {:else}
                <Eye class="w-5 h-5" />
              {/if}
            </button>
          </div>
        </div>

        {#if error}
          <div class="flex items-center gap-2 text-red-400 text-sm" class:animate-shake={shake}>
            <AlertCircle class="w-4 h-4" />
            <span>{error}</span>
          </div>
        {/if}

        <button
          type="button"
          on:click={handleLogin}
          class="w-full py-3 bg-sky-pastel text-white rounded-xl font-medium hover:bg-sky-400 transition-colors"
        >
          Acceder
        </button>
      </div>
    </div>

    <button
      type="button"
      on:click={() => router.navigate('/')}
      class="block mx-auto mt-6 text-gray-500 hover:text-gray-300 text-sm transition-colors"
    >
      ← Volver al inicio
    </button>
  </div>
</div>

<style>
  :global(.animate-shake) {
    animation: shake 0.5s ease-in-out;
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
</style>
