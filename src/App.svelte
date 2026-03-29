<script>
  import { onMount } from 'svelte'
  import { Navbar, Footer } from './components/layout'
  import { Home, Destinos, DestinoDetalle, AdminLogin, AdminEdit } from './pages'

  let currentPage = 'home'
  let currentSlug = ''

  function updatePage() {
    const path = window.location.hash.slice(1) || '/'

    if (path === '/' || path === '') {
      currentPage = 'home'
    } else if (path === '/destinos') {
      currentPage = 'destinos'
    } else if (path.startsWith('/destino/')) {
      currentPage = 'detalle'
      currentSlug = path.split('/destino/')[1]?.split('?')[0] || ''
    } else if (path === '/admin/login') {
      currentPage = 'admin-login'
    } else if (path === '/admin') {
      currentPage = 'admin'
    } else {
      currentPage = 'home'
    }
  }

  onMount(() => {
    updatePage()
    window.addEventListener('hashchange', updatePage)

    return () => {
      window.removeEventListener('hashchange', updatePage)
    }
  })
</script>

<div class="min-h-screen flex flex-col">
  {#if currentPage === 'admin-login'}
    <AdminLogin />
  {:else if currentPage === 'admin'}
    <AdminEdit />
  {:else}
    <Navbar />
    <main class="flex-1">
      {#if currentPage === 'home'}
        <Home />
      {:else if currentPage === 'destinos'}
        <Destinos />
      {:else if currentPage === 'detalle'}
        <DestinoDetalle slug={currentSlug} />
      {/if}
    </main>
    <Footer />
  {/if}
</div>
