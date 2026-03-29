<script>
  import { onMount } from 'svelte'
  import { Plane, Palmtree, Compass, Star, ArrowRight, MapPin, Search, Sparkles, Heart, Globe, Users } from 'lucide-svelte'
  import { Button, DestinationCard } from '../components/ui'
  import { getEditedDestinos } from '../data/destinos.js'
  import { router } from '../stores/router.js'

  let destinos = []
  let sections = []

  const features = [
    { icon: Palmtree, title: 'Destinos de Ensueño', description: 'Calas escondidas, ciudades históricas y rincones mágicos.', gradient: 'from-emerald-400 to-teal-500' },
    { icon: Compass, title: 'Guías Detalladas', description: 'Cómo llegar, dónde dormir y qué hacer en cada lugar.', gradient: 'from-blue-400 to-indigo-500' },
    { icon: Star, title: 'Excursiones Top', description: 'Las mejores actividades con las valoraciones más altas.', gradient: 'from-amber-400 to-orange-500' },
  ]

  const stats = [
    { value: '5', suffix: '+', label: 'Destinos', icon: MapPin },
    { value: '50', suffix: '+', label: 'Actividades', icon: Compass },
    { value: '10k', suffix: '+', label: 'Viajeros', icon: Users },
    { value: '4.9', suffix: '', label: 'Valoración', icon: Star },
  ]

  function navigate(path) {
    router.navigate(path)
  }

  function cardImage(url) {
    return url.replace(/w=1920/, 'w=600').replace(/h=1080/, 'h=400')
  }

  onMount(() => {
    destinos = getEditedDestinos()

    function handleScroll() {
      scrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

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

    sections = document.querySelectorAll('.section-reveal')
    sections.forEach(s => observer.observe(s))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      sections.forEach(s => observer.unobserve(s))
    }
  })
</script>

<svelte:head>
  <title>Iva Viajes | Guías de Viaje para Soñadores</title>
  <meta name="description" content="Descubre los destinos más increíbles del mundo. Guías de viaje detalladas, recomendaciones y excursiones." />
</svelte:head>

<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <div class="absolute inset-0">
    <img
      src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80&auto=format"
      alt="Beach"
      fetchpriority="high"
      class="w-full h-full object-cover"
      style="transform: translateZ(0) translateY({Math.min(scrollY * 0.3, 200)}px) scale(1.15)"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70"></div>
  </div>

  <div class="absolute top-20 left-10 w-64 h-64 bg-sky-pastel/20 rounded-full blur-3xl animate-float pointer-events-none"></div>
  <div class="absolute bottom-32 right-10 w-80 h-80 bg-coral-soft/20 rounded-full blur-3xl animate-float-delayed pointer-events-none"></div>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-lavender-soft/10 rounded-full blur-3xl animate-float-slow pointer-events-none"></div>

  <div class="relative z-10 max-w-5xl mx-auto px-5 sm:px-4 text-center pt-20">
    <div class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-md rounded-full px-5 py-2.5 mb-8 border border-white/20 animate-fade-in">
      <Sparkles class="w-4 h-4 text-yellow-300" />
      <span class="text-white/90 text-sm font-medium tracking-wide">Tu próxima aventura empieza aquí</span>
    </div>

    <h1 class="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] animate-fade-in-up" style="animation-delay: 0.1s">
      Descubre el mundo
      <span class="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-pastel via-white to-coral-soft">con Iva Viajes</span>
    </h1>

    <p class="text-base sm:text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style="animation-delay: 0.2s">
      Guías de viaje auténticas, consejos de expertos y los mejores planes para viajeros soñadores.
    </p>

    <div class="max-w-xl mx-auto mb-10 animate-fade-in-up" style="animation-delay: 0.3s">
      <div class="relative bg-white/10 backdrop-blur-xl rounded-2xl p-2 border border-white/20 shadow-2xl">
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
          <div class="flex items-center flex-1">
            <Search class="w-5 h-5 text-white/50 ml-4" />
            <input
              type="text"
              placeholder="Busca tu próximo destino..."
              class="flex-1 px-4 py-3.5 bg-transparent text-white placeholder-white/50 focus:outline-none text-base sm:text-lg"
            />
          </div>
          <Button variant="primary" on:click={() => navigate('/destinos')} class="sm:ml-1">
            <Plane class="w-5 h-5 sm:mr-2" />
            <span class="hidden sm:inline">Explorar</span>
            <span class="sm:hidden">Buscar</span>
          </Button>
        </div>
      </div>
    </div>

    <div class="flex flex-wrap justify-center gap-3 animate-fade-in-up" style="animation-delay: 0.4s">
      {#each destinos.slice(0, 4) as d}
        <button
          on:click={() => navigate(`/destino/${d.slug}`)}
          class="bg-white/10 backdrop-blur-sm text-white/90 px-5 py-2.5 rounded-full hover:bg-white/25 transition-all duration-300 text-sm border border-white/10 hover:border-white/30 hover:scale-105"
        >
          {d.name}
        </button>
      {/each}
    </div>
  </div>

  <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-gentle">
    <div class="w-8 h-12 rounded-full border-2 border-white/30 flex items-start justify-center pt-2">
      <div class="w-1.5 h-3 bg-white/50 rounded-full"></div>
    </div>
  </div>
</section>

<section class="py-8 bg-gradient-to-r from-sky-pastel/10 via-cream to-coral-soft/10 relative">
  <div class="max-w-7xl mx-auto px-5 sm:px-4">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-6 section-reveal">
      {#each stats as stat, i}
        <div class="flex flex-col items-center text-center py-4">
          <div class="flex items-baseline gap-0.5 mb-1">
            <span class="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</span>
            <span class="text-xl font-bold gradient-text">{stat.suffix}</span>
          </div>
          <span class="text-sm text-gray-500 font-medium">{stat.label}</span>
        </div>
      {/each}
    </div>
  </div>
</section>

  <section class="py-16 sm:py-24 bg-cream mesh-gradient relative overflow-hidden">
  <div class="max-w-7xl mx-auto px-5 sm:px-4">
    <div class="text-center mb-16 section-reveal">
      <span class="inline-block text-sm font-semibold text-sky-600 tracking-wider uppercase mb-3">Por qué elegirnos</span>
      <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">¿Por qué viajar con nosotros?</h2>
      <p class="text-lg text-gray-500 max-w-2xl mx-auto">Más que guías, somos tu compañero de aventuras.</p>
    </div>

    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {#each features as feature, i}
        <div class="group section-reveal stagger-{i + 1} glass-card-premium p-6 sm:p-8 hover-lift cursor-pointer">
          <div class="w-16 h-16 bg-gradient-to-br {feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg">
            <svelte:component this={feature.icon} class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
          <p class="text-gray-500 leading-relaxed">{feature.description}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<section id="destinos" class="py-16 sm:py-24 bg-white relative">
  <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cream to-transparent pointer-events-none"></div>
  <div class="max-w-7xl mx-auto px-5 sm:px-4 relative">
    <div class="flex flex-col md:flex-row md:items-end md:justify-between mb-14 section-reveal">
      <div>
        <span class="inline-block text-sm font-semibold text-coral-soft tracking-wider uppercase mb-3">Destinos</span>
        <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">Destinos Destacados</h2>
        <p class="text-lg text-gray-500">Los lugares más increíbles que hemos descubierto para ti.</p>
      </div>
      <button
        on:click={() => navigate('/destinos')}
        class="group flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-700 mt-6 md:mt-0 transition-colors"
      >
        Ver todos
        <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>

    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {#each destinos as d, i}
        <div class="section-reveal stagger-{(i % 3) + 1}">
          <DestinationCard
            slug={d.slug}
            name={d.name}
            country={d.country}
            image={cardImage(d.heroImage)}
            description={d.tagline}
            rating={d.rating}
            activities={d.activitiesCount}
          />
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="py-16 sm:py-24 relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700"></div>
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-10 left-10 w-32 h-32 border border-white/30 rounded-full"></div>
    <div class="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"></div>
    <div class="absolute top-1/2 right-1/4 w-20 h-20 border border-white/20 rounded-full"></div>
  </div>

  <div class="max-w-4xl mx-auto px-5 sm:px-4 text-center relative z-10 section-reveal">
    <Heart class="w-10 h-10 sm:w-12 sm:h-12 text-coral-soft mx-auto mb-6 animate-pulse-soft" />
    <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">¿Listo para tu próxima aventura?</h2>
    <p class="text-base sm:text-lg text-white/70 mb-8 sm:mb-10 max-w-2xl mx-auto">Únete a miles de viajeros que ya confían en nosotros para planificar sus viajes soñados.</p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        on:click={() => navigate('/destinos')}
        class="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 active:scale-95 text-base sm:text-lg"
      >
        <MapPin class="w-5 h-5" />
        Explorar Destinos
      </button>
      <button
        on:click={() => navigate('/destinos')}
        class="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 text-base sm:text-lg"
      >
        <Star class="w-5 h-5" />
        Ver Excursiones
      </button>
    </div>
  </div>
</section>
