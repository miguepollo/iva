<script>
  import { onMount } from 'svelte'
  import { MapPin, Search, Filter } from 'lucide-svelte'
  import { DestinationCard } from '../components/ui'
  import { getEditedDestinos } from '../data/destinos.js'

  let destinos = []
  let searchTerm = ''
  let sortBy = 'popularidad'

  $: filteredDestinos = destinos.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  onMount(() => {
    destinos = getEditedDestinos()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const sections = document.querySelectorAll('.section-reveal')
    sections.forEach(s => observer.observe(s))

    return () => sections.forEach(s => observer.unobserve(s))
  })
</script>

<svelte:head>
  <title>Todos los Destinos | Iva Viajes</title>
</svelte:head>

<section class="pt-32 pb-20 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-b from-sky-pastel/10 via-cream to-cream"></div>
  <div class="absolute top-20 right-0 w-72 h-72 bg-sky-pastel/10 rounded-full blur-3xl pointer-events-none"></div>
  <div class="absolute bottom-0 left-0 w-96 h-96 bg-coral-soft/10 rounded-full blur-3xl pointer-events-none"></div>

  <div class="max-w-7xl mx-auto px-5 sm:px-4 relative">
    <div class="text-center section-reveal">
      <span class="inline-block text-sm font-semibold text-sky-600 tracking-wider uppercase mb-3">Explora</span>
      <h1 class="text-3xl sm:text-4xl md:text-6xl font-bold text-gray-900 mb-4">Todos los Destinos</h1>
      <p class="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-8 sm:mb-10">
        Explora nuestra colección de destinos cuidadosamente seleccionados.
      </p>

      <div class="max-w-2xl mx-auto flex flex-col sm:flex-row gap-3">
        <div class="flex-1 relative">
          <Search class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            bind:value={searchTerm}
            placeholder="Buscar destino..."
            class="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-gray-200 focus:outline-none focus:border-sky-pastel focus:ring-2 focus:ring-sky-pastel/20 transition-all duration-300 shadow-sm"
          />
        </div>
        <button class="flex items-center justify-center gap-2 px-6 py-3.5 bg-white rounded-2xl border border-gray-200 hover:border-sky-pastel transition-colors shadow-sm">
          <Filter class="w-5 h-5 text-gray-500" />
          <span class="text-gray-700">Filtros</span>
        </button>
      </div>
    </div>
  </div>
</section>

<section class="py-12 bg-cream">
  <div class="max-w-7xl mx-auto px-5 sm:px-4">
    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 section-reveal gap-3">
      <p class="text-gray-500">
        <span class="font-semibold text-gray-900">{filteredDestinos.length}</span> destinos encontrados
      </p>
      <select bind:value={sortBy} class="w-full sm:w-auto bg-white rounded-xl border border-gray-200 px-4 py-2.5 text-gray-700 focus:outline-none focus:border-sky-pastel cursor-pointer">
        <option value="popularidad">Ordenar por: Popularidad</option>
        <option value="rating">Ordenar por: Rating</option>
        <option value="az">Ordenar por: A-Z</option>
      </select>
    </div>

    {#if filteredDestinos.length > 0}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {#each filteredDestinos as d, i}
          <div class="section-reveal stagger-{(i % 3) + 1}">
            <DestinationCard
              slug={d.slug}
              name={d.name}
              country={d.country}
              image={d.heroImage}
              description={d.tagline}
              rating={d.rating}
              activities={d.activitiesCount}
            />
          </div>
        {/each}
      </div>
    {:else}
      <div class="text-center py-20 section-reveal">
        <MapPin class="w-16 h-16 text-gray-200 mx-auto mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 mb-2">No hay destinos</h3>
        <p class="text-gray-500">Pronto añadiremos nuevos lugares increíbles.</p>
      </div>
    {/if}
  </div>
</section>

<section class="py-20 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700"></div>
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-10 left-10 w-24 h-24 border border-white/30 rounded-full"></div>
    <div class="absolute bottom-10 right-20 w-36 h-36 border border-white/20 rounded-full"></div>
  </div>

  <div class="max-w-4xl mx-auto px-5 sm:px-4 text-center relative z-10 section-reveal">
    <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">¿No encuentras tu destino?</h2>
    <p class="text-base sm:text-lg text-white/70 mb-8">Suscríbete y te avisaremos cuando añadamos nuevos lugares.</p>
    <div class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        placeholder="Tu email"
        class="flex-1 px-5 py-3.5 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white/40"
      />
      <button class="bg-white text-gray-900 px-6 py-3.5 rounded-xl font-semibold hover:bg-gray-100 transition-colors whitespace-nowrap">
        Notificarme
      </button>
    </div>
  </div>
</section>
