<script>
  import { onMount } from 'svelte'
  import { Plane, Menu, X, Search } from 'lucide-svelte'
  import { router } from '../../stores/router.js'

  let isScrolled = false
  let isMobileMenuOpen = false
  let activeHash = '/'

  const navLinks = [
    { href: '#/', label: 'Inicio', path: '/' },
    { href: '#/destinos', label: 'Destinos', path: '/destinos' },
  ]

  onMount(() => {
    function handleScroll() {
      isScrolled = window.scrollY > 20
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    router.init()

    activeHash = window.location.hash.slice(1) || '/'
    window.addEventListener('hashchange', () => {
      activeHash = window.location.hash.slice(1) || '/'
    })

    return () => window.removeEventListener('scroll', handleScroll)
  })

  function navigate(path) {
    router.navigate(path)
    isMobileMenuOpen = false
  }

  $: headerClasses = isScrolled
    ? 'fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl shadow-lg shadow-black/5 transition-all duration-500'
    : 'fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/30 to-transparent transition-all duration-500'
</script>

<header class={headerClasses}>
  <nav class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 md:h-20">
      <a href="#/" on:click|preventDefault={() => navigate('/')} class="flex items-center gap-2.5 group">
        <div class="p-2 bg-gradient-to-br from-sky-pastel to-sky-400 rounded-xl group-hover:shadow-lg group-hover:shadow-sky-pastel/30 transition-all duration-300">
          <Plane class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold {isScrolled ? 'text-gray-900' : 'text-white'} transition-colors duration-300">
          Iva<span class="gradient-text-warm">Viajes</span>
        </span>
      </a>

      <div class="hidden md:flex items-center gap-1">
        {#each navLinks as link}
          <a
            href={link.href}
            on:click|preventDefault={() => navigate(link.path)}
            class="relative px-4 py-2 rounded-lg font-medium transition-colors duration-300
              {isScrolled
                ? (activeHash === link.path ? 'text-sky-600' : 'text-gray-600 hover:text-sky-600')
                : (activeHash === link.path ? 'text-white' : 'text-white/70 hover:text-white')}"
          >
            {#if activeHash === link.path}
              <span class="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-sky-pastel to-coral-soft rounded-full"></span>
            {/if}
            {link.label}
          </a>
        {/each}
      </div>

      <div class="hidden md:flex items-center gap-3">
        <button class="p-2.5 rounded-xl transition-colors duration-300 {isScrolled ? 'text-gray-500 hover:text-sky-600 hover:bg-gray-100' : 'text-white/70 hover:text-white hover:bg-white/10'}">
          <Search class="w-5 h-5" />
        </button>
        <button
          on:click={() => navigate('/destinos')}
          class="bg-gradient-to-r from-coral-soft to-pink-400 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300 active:scale-95"
        >
          Explorar
        </button>
      </div>

      <button
        on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
        class="md:hidden p-2 rounded-lg {isScrolled ? 'text-gray-600' : 'text-white'}"
      >
        {#if isMobileMenuOpen}
          <X class="w-6 h-6" />
        {:else}
          <Menu class="w-6 h-6" />
        {/if}
      </button>
    </div>

    {#if isMobileMenuOpen}
      <div class="md:hidden bg-white/95 backdrop-blur-xl rounded-2xl mb-4 overflow-hidden shadow-xl border border-gray-100">
        <div class="p-4 space-y-1">
          {#each navLinks as link}
            <a
              href={link.href}
              on:click|preventDefault={() => navigate(link.path)}
              class="block px-4 py-3 text-gray-600 hover:text-sky-600 hover:bg-sky-50 rounded-xl transition-colors font-medium {activeHash === link.path ? 'bg-sky-50 text-sky-600' : ''}"
            >
              {link.label}
            </a>
          {/each}
          <div class="pt-2">
            <button
              on:click={() => navigate('/destinos')}
              class="block w-full bg-gradient-to-r from-coral-soft to-pink-400 text-white px-4 py-3 rounded-xl font-medium text-center"
            >
              Explorar Destinos
            </button>
          </div>
        </div>
      </div>
    {/if}
  </nav>
</header>
