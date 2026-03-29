<script>
  import { onMount } from 'svelte'
  import { MapPin, Calendar, Globe, Clock, Plane, Ship, Car, Hotel, Star, ExternalLink, ArrowLeft } from 'lucide-svelte'
  import { ExcursionCard, QuickFacts, Tabs } from '../components/ui'
  import { AdminEditButton } from '../components/admin'
  import { getDestinationBySlug } from '../data/destinos.js'
  import { router } from '../stores/router.js'

  export let slug = ''

  let scrollY = 0

  $: destination = getDestinationBySlug(slug)

  function navigate(path) {
    router.navigate(path)
  }

  function renderStars(rating) {
    const full = Math.floor(rating)
    let html = '<div class="flex items-center gap-0.5">'
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        html += '<svg class="w-3.5 h-3.5 text-amber-400 fill-amber-400" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
      } else {
        html += '<svg class="w-3.5 h-3.5 text-gray-200" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>'
      }
    }
    html += '</div>'
    return html
  }

  $: quickFactsData = destination ? [
    { icon: Calendar, label: 'Mejor época', value: destination.quickFacts?.bestTime },
    { icon: Globe, label: 'Moneda', value: destination.quickFacts?.currency },
    { icon: MapPin, label: 'Idioma', value: destination.quickFacts?.language },
    { icon: Clock, label: 'Zona horaria', value: destination.quickFacts?.timezone },
  ].filter(f => f.value) : []

  $: tabsContent = destination ? [
    {
      id: 'como-llegar',
      label: 'Cómo Llegar',
      condition: destination.howToGet?.byPlane || destination.howToGet?.byBoat || destination.howToGet?.byCar,
      content: {
        render: () => {
          const items = []
          if (destination.howToGet?.byPlane) {
            items.push(`
              <div class="flex items-start gap-4 p-3 rounded-xl hover:bg-sky-50/50 transition-colors">
                <div class="p-2 bg-sky-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-sky-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">En Avión</p>
                  <p class="text-gray-500 text-sm mt-1">${destination.howToGet.byPlane}</p>
                </div>
              </div>
            `)
          }
          if (destination.howToGet?.byBoat) {
            items.push(`
              <div class="flex items-start gap-4 p-3 rounded-xl hover:bg-sky-50/50 transition-colors">
                <div class="p-2 bg-blue-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/><path d="M12 1v4"/></svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">En Ferry</p>
                  <p class="text-gray-500 text-sm mt-1">${destination.howToGet.byBoat}</p>
                </div>
              </div>
            `)
          }
          if (destination.howToGet?.byCar) {
            items.push(`
              <div class="flex items-start gap-4 p-3 rounded-xl hover:bg-sky-50/50 transition-colors">
                <div class="p-2 bg-emerald-100 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>
                </div>
                <div>
                  <p class="font-semibold text-gray-900">En Coche</p>
                  <p class="text-gray-500 text-sm mt-1">${destination.howToGet.byCar}</p>
                </div>
              </div>
            `)
          }
          return `
            <div class="space-y-4">
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h4 class="font-semibold mb-4 text-gray-900">Transporte</h4>
                <div class="space-y-4">
                  ${items.join('')}
                </div>
              </div>
            </div>
          `
        }
      }
    },
    {
      id: 'donde-dormir',
      label: 'Dónde Dormir',
      condition: destination.whereToSleep?.areas?.length > 0,
      content: {
        render: () => {
          const areas = destination.whereToSleep.areas
          return `
            <div class="space-y-10">
              ${destination.whereToSleep.intro ? `<p class="text-gray-500 text-lg">${destination.whereToSleep.intro}</p>` : ''}
              ${areas.map(area => `
                <div>
                  <div class="flex items-center gap-3 mb-5">
                    <div class="p-2 bg-coral-soft/15 rounded-xl">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-coral-soft" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z"/><path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16"/><path d="M8 7h.01"/><path d="M16 7h.01"/><path d="M12 7h.01"/><path d="M12 11h.01"/><path d="M16 11h.01"/><path d="M8 11h.01"/></svg>
                    </div>
                    <div>
                      <h3 class="text-xl font-bold text-gray-900">${area.name || ''}</h3>
                      <p class="text-gray-400 text-sm">${[area.description, area.bestFor ? 'Ideal para: ' + area.bestFor : ''].filter(Boolean).join(' · ')}</p>
                    </div>
                  </div>
                  ${area.alojamientos && area.alojamientos.length > 0 ? `
                    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      ${area.alojamientos.map(aloj => `
                        <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                          <div class="relative h-40 overflow-hidden">
                            ${aloj.imagen ? `<img src="${aloj.imagen}" alt="${aloj.nombre}" loading="lazy" decoding="async" class="w-full h-full object-cover" />` : ''}
                            ${aloj.tipo ? `<div class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-gray-700">${aloj.tipo}</div>` : ''}
                            ${aloj.bookingUrl ? '<div class="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">Booking</div>' : ''}
                            <div class="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/40 to-transparent"></div>
                          </div>
                          <div class="p-4">
                            <h4 class="font-bold text-gray-900 mb-1">${aloj.nombre || ''}</h4>
                            ${aloj.descripcion ? `<p class="text-gray-400 text-sm mb-3 line-clamp-2">${aloj.descripcion}</p>` : ''}
                            <div class="flex items-center justify-between">
                              <div class="flex items-center gap-2">
                                ${aloj.rating ? renderStars(aloj.rating) : ''}
                                ${aloj.rating ? `<span class="text-xs text-gray-400">${aloj.rating}</span>` : ''}
                              </div>
                              ${aloj.precio ? `
                              <div class="text-right">
                                <span class="text-xs text-gray-400">desde</span>
                                <span class="text-lg font-bold text-gray-900 ml-1">${aloj.precio}€</span>
                                <span class="text-xs text-gray-400">/noche</span>
                              </div>
                              ` : ''}
                            </div>
                            ${aloj.bookingUrl ? `
                              <div class="mt-3 pt-3 border-t border-gray-100">
                                <a href="${aloj.bookingUrl}" target="_blank" rel="noopener noreferrer sponsored" class="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-coral-soft to-pink-400 text-white rounded-lg text-sm font-semibold hover:shadow-md transition-all duration-300 active:scale-95">
                                  Reservar en Booking.com
                                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                                </a>
                              </div>
                            ` : ''}
                          </div>
                        </div>
                      `).join('')}
                    </div>
                  ` : '<p class="text-gray-400 text-sm">Próximamente más alojamientos.</p>'}
                </div>
              `).join('')}
              ${destination.affiliateLinks?.booking ? `
              <div class="text-center pt-6">
                <a
                  href="${destination.affiliateLinks.booking}"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-coral-soft to-pink-400 text-white px-8 py-3.5 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300 active:scale-95"
                >
                  Ver todos los alojamientos en Booking.com
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                </a>
              </div>
              ` : ''}
            </div>
          `
        }
      }
    },
    {
      id: 'que-hacer',
      label: 'Qué Hacer',
      condition: destination.whatToDo?.activities?.length > 0,
      content: {
        render: () => `
          <div class="space-y-6">
            ${destination.whatToDo.intro ? `<p class="text-gray-500">${destination.whatToDo.intro}</p>` : ''}
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              ${destination.whatToDo.activities.map(act => `
                <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  ${act.name ? `<h4 class="font-semibold mb-2">${act.name}</h4>` : ''}
                  ${act.description ? `<p class="text-gray-500 text-sm mb-3">${act.description}</p>` : ''}
                  ${act.tip ? `
                  <div class="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-3 text-sm text-sky-700 border border-sky-100">
                    <strong>Tip:</strong> ${act.tip}
                  </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>
        `
      }
    },
  ].filter(t => t.condition) : []

  onMount(() => {
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

    const sections = document.querySelectorAll('.section-reveal')
    sections.forEach(s => observer.observe(s))

    return () => {
      window.removeEventListener('scroll', handleScroll)
      sections.forEach(s => observer.unobserve(s))
    }
  })
</script>

<svelte:head>
  <title>{destination?.name || 'Cargando...'} | Iva Viajes</title>
  <meta name="description" content={destination?.tagline || 'Guía de viaje'} />
</svelte:head>

{#if destination}
  <section class="relative h-[65vh] sm:h-[75vh] md:h-[80vh] min-h-[450px] sm:min-h-[550px] flex items-end overflow-hidden">
    <div class="absolute inset-0">
      <img
        src={destination.heroImage}
        alt={destination.name}
        class="w-full h-full object-cover"
        style="transform: translateZ(0) translateY({Math.min(scrollY * 0.25, 200)}px) scale(1.1)"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
    </div>

    <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/30 to-transparent pointer-events-none z-10"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-5 sm:px-4 pb-10 sm:pb-14 w-full">
      <button
        on:click={() => navigate('/destinos')}
        class="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span class="text-sm font-medium">Volver</span>
      </button>

      {#if destination.country || destination.region}
        <div class="flex items-center gap-2 text-white/60 mb-3 text-sm">
          <MapPin class="w-4 h-4" />
          <span>{[destination.country, destination.region].filter(Boolean).join(' · ')}</span>
        </div>
      {/if}
      <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-3 sm:mb-4 leading-tight">{destination.name}</h1>
      {#if destination.tagline}
        <p class="text-lg sm:text-xl text-white/80 max-w-2xl mb-5 sm:mb-6 leading-relaxed">{destination.tagline}</p>
      {/if}
      {#if destination.rating || destination.activitiesCount}
        <div class="flex flex-wrap items-center gap-4">
          {#if destination.rating}
            <div class="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <Star class="w-4 h-4 text-amber-400 fill-amber-400" />
              <span class="text-white font-semibold">{destination.rating}</span>
            </div>
          {/if}
          {#if destination.activitiesCount}
            <span class="text-white/60 text-sm font-medium">{destination.activitiesCount} actividades</span>
          {/if}
        </div>
      {/if}
    </div>
  </section>

  {#if quickFactsData.length > 0}
    <section class="py-10 sm:py-14 bg-cream relative">
      <div class="max-w-7xl mx-auto px-5 sm:px-4 section-reveal">
        <QuickFacts facts={quickFactsData} />
      </div>
    </section>
  {/if}

  {#if destination.description}
    <section class="py-10 sm:py-14 bg-cream">
      <div class="max-w-7xl mx-auto px-5 sm:px-4 section-reveal">
        <div class="max-w-3xl">
          <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-5">Descubre {destination.name}</h2>
          <p class="text-base sm:text-lg text-gray-500 leading-relaxed">{destination.description}</p>
        </div>
      </div>
    </section>
  {/if}

  {#if tabsContent.length > 0}
    <section class="py-10 sm:py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 section-reveal">
        <Tabs tabs={tabsContent} />
      </div>
    </section>
  {/if}

  {#if destination.excursions && destination.excursions.length > 0}
    <section class="py-14 sm:py-20 bg-cream">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-10 sm:mb-14 section-reveal">
          <span class="inline-block text-sm font-semibold text-coral-soft tracking-wider uppercase mb-3">Experiencias</span>
          <h2 class="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Excursiones en {destination.name}
          </h2>
          <p class="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">Las mejores actividades seleccionadas.</p>
        </div>

        <div class="grid sm:grid-cols-2 gap-6 sm:gap-8">
          {#each destination.excursions as excursion}
            <div class="section-reveal">
              <ExcursionCard {...excursion} />
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if destination.gallery && destination.gallery.length > 0}
    <section class="py-10 sm:py-14 bg-white">
      <div class="max-w-7xl mx-auto px-4 section-reveal">
        <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Galería</h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {#each destination.gallery as image, i}
            <div class="relative aspect-square rounded-2xl overflow-hidden group">
              <img src={image} alt={`${destination.name} ${i + 1}`} loading="lazy" decoding="async" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
            </div>
          {/each}
        </div>
      </div>
    </section>
  {/if}

  {#if destination.affiliateLinks?.skyscanner || destination.affiliateLinks?.booking}
    <section class="py-14 sm:py-20 relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700"></div>
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-10 left-10 w-24 h-24 border border-white/30 rounded-full"></div>
        <div class="absolute bottom-10 right-10 w-40 h-40 border border-white/20 rounded-full"></div>
      </div>

      <div class="max-w-4xl mx-auto px-4 text-center relative z-10 section-reveal">
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 sm:mb-8">¿Preparado para visitar {destination.name}?</h2>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          {#if destination.affiliateLinks?.skyscanner}
            <a
              href={destination.affiliateLinks.skyscanner}
              target="_blank"
              rel="noopener noreferrer sponsored"
              class="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 hover:shadow-xl active:scale-95 text-base sm:text-lg"
            >
              <Plane class="w-5 h-5" />
              Buscar Vuelos
            </a>
          {/if}
          {#if destination.affiliateLinks?.booking}
            <a
              href={destination.affiliateLinks.booking}
              target="_blank"
              rel="noopener noreferrer sponsored"
              class="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-coral-soft to-pink-400 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300 active:scale-95 text-base sm:text-lg"
            >
              <Hotel class="w-5 h-5" />
              Buscar Hoteles
            </a>
          {/if}
        </div>
      </div>
    </section>
  {/if}

  <AdminEditButton section={destination.slug} data={destination} />
{:else}
  <div class="min-h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-2xl font-bold text-gray-900 mb-4">Destino no encontrado</h1>
      <button on:click={() => navigate('/')} class="text-sky-600 hover:underline">
        Volver al inicio
      </button>
    </div>
  </div>
{/if}
