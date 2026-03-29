<script>
  import { onMount } from 'svelte'
  import { ArrowLeft, Save, RotateCcw, ChevronDown, ChevronUp, Image as ImageIcon, FileText, Globe, MapPin, Star, Hotel, Ship, Plus, Trash2, Upload } from 'lucide-svelte'
  import { router } from '../stores/router.js'
  import { destinos } from '../data/destinos.js'

  let editedDestinos = []
  let expandedIndex = 0
  let saved = false
  let galleryUrlInputs = {}

  onMount(() => {
    const isAdmin = sessionStorage.getItem('iva-admin') === 'true'
    if (!isAdmin) {
      router.navigate('/admin/login')
      return
    }
    const stored = localStorage.getItem('iva-edits-destinos')
    if (stored) {
      try {
        editedDestinos = JSON.parse(stored)
      } catch {
        editedDestinos = JSON.parse(JSON.stringify(destinos))
      }
    } else {
      editedDestinos = JSON.parse(JSON.stringify(destinos))
    }
  })

  function save() {
    localStorage.setItem('iva-edits-destinos', JSON.stringify(editedDestinos))
    saved = true
    setTimeout(() => saved = false, 2000)
  }

  function resetAll() {
    if (confirm('¿Restaurar todos los datos originales? Se perderán todos los cambios.')) {
      editedDestinos = JSON.parse(JSON.stringify(destinos))
      localStorage.removeItem('iva-edits-destinos')
    }
  }

  function resetOne(i) {
    if (confirm('¿Restaurar este destino?')) {
      editedDestinos[i] = JSON.parse(JSON.stringify(destinos[i]))
      editedDestinos = editedDestinos
    }
  }

  function toggleSection(i) {
    expandedIndex = expandedIndex === i ? -1 : i
  }

  function addGalleryImage(destIdx) {
    const url = galleryUrlInputs[destIdx]
    if (!url) return
    if (!editedDestinos[destIdx].gallery) editedDestinos[destIdx].gallery = []
    editedDestinos[destIdx].gallery = [...editedDestinos[destIdx].gallery, url]
    editedDestinos = editedDestinos
    galleryUrlInputs[destIdx] = ''
  }

  function removeGalleryImage(destIdx, imgIdx) {
    editedDestinos[destIdx].gallery = editedDestinos[destIdx].gallery.filter((_, i) => i !== imgIdx)
    editedDestinos = editedDestinos
  }

  function addSleepArea(destIdx) {
    if (!editedDestinos[destIdx].whereToSleep) {
      editedDestinos[destIdx].whereToSleep = { intro: '', areas: [] }
    }
    editedDestinos[destIdx].whereToSleep.areas = [
      ...editedDestinos[destIdx].whereToSleep.areas,
      { name: '', description: '', bestFor: '', alojamientos: [] }
    ]
    editedDestinos = editedDestinos
  }

  function removeSleepArea(destIdx, areaIdx) {
    editedDestinos[destIdx].whereToSleep.areas = editedDestinos[destIdx].whereToSleep.areas.filter((_, i) => i !== areaIdx)
    editedDestinos = editedDestinos
  }

  function addAlojamiento(destIdx, areaIdx) {
    const area = editedDestinos[destIdx].whereToSleep.areas[areaIdx]
    if (!area.alojamientos) area.alojamientos = []
    area.alojamientos = [...area.alojamientos, { nombre: '', tipo: '', precio: 0, rating: 4.5, bookingUrl: '', imagen: '', descripcion: '' }]
    editedDestinos = editedDestinos
  }

  function removeAlojamiento(destIdx, areaIdx, alojIdx) {
    editedDestinos[destIdx].whereToSleep.areas[areaIdx].alojamientos = editedDestinos[destIdx].whereToSleep.areas[areaIdx].alojamientos.filter((_, i) => i !== alojIdx)
    editedDestinos = editedDestinos
  }

  function addActivity(destIdx) {
    if (!editedDestinos[destIdx].whatToDo) {
      editedDestinos[destIdx].whatToDo = { intro: '', activities: [] }
    }
    editedDestinos[destIdx].whatToDo.activities = [
      ...editedDestinos[destIdx].whatToDo.activities,
      { name: '', description: '', tip: '' }
    ]
    editedDestinos = editedDestinos
  }

  function removeActivity(destIdx, actIdx) {
    editedDestinos[destIdx].whatToDo.activities = editedDestinos[destIdx].whatToDo.activities.filter((_, i) => i !== actIdx)
    editedDestinos = editedDestinos
  }

  function addExcursion(destIdx) {
    editedDestinos[destIdx].excursions = [
      ...editedDestinos[destIdx].excursions,
      { id: `new-${Date.now()}`, title: '', description: '', image: '', price: 0, currency: '€', rating: 4.5, reviews: 0, duration: '', groupSize: '', affiliateUrl: '', provider: 'civitatis', highlights: [] }
    ]
    editedDestinos = editedDestinos
  }

  function removeExcursion(destIdx, exIdx) {
    editedDestinos[destIdx].excursions = editedDestinos[destIdx].excursions.filter((_, i) => i !== exIdx)
    editedDestinos = editedDestinos
  }

  function handleImageUpload(event, callback) {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = document.createElement('img')
      img.onload = () => {
        const MAX = 1200
        let w = img.naturalWidth, h = img.naturalHeight
        if (w > MAX || h > MAX) {
          if (w > h) { h = Math.round(h * MAX / w); w = MAX }
          else { w = Math.round(w * MAX / h); h = MAX }
        }
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        canvas.getContext('2d').drawImage(img, 0, 0, w, h)
        callback(canvas.toDataURL('image/webp', 0.8))
        editedDestinos = editedDestinos
      }
      img.src = e.target.result
    }
    reader.readAsDataURL(file)
    event.target.value = ''
  }

  function addDestino() {
    const d = {
      id: `new-${Date.now()}`,
      slug: '',
      name: '',
      country: '',
      region: '',
      tagline: '',
      description: '',
      heroImage: '',
      gallery: [],
      rating: 4.5,
      activitiesCount: 0,
      quickFacts: { bestTime: '', currency: '', language: '', timezone: '' },
      howToGet: { byPlane: '', byBoat: '', byCar: '' },
      whereToSleep: { intro: '', areas: [] },
      whatToDo: { intro: '', activities: [] },
      excursions: [],
      affiliateLinks: { skyscanner: '', booking: '' }
    }
    editedDestinos = [...editedDestinos, d]
    expandedIndex = editedDestinos.length - 1
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
  }

  function removeDestino(destIdx) {
    const name = editedDestinos[destIdx].name || 'este destino'
    if (!confirm(`¿Eliminar "${name}"? Esta acción no se puede deshacer.`)) return
    editedDestinos = editedDestinos.filter((_, i) => i !== destIdx)
    if (expandedIndex >= editedDestinos.length) expandedIndex = editedDestinos.length - 1
  }

  function logout() {
    sessionStorage.removeItem('iva-admin')
    router.navigate('/')
  }
</script>

<div class="min-h-screen bg-gray-50">
  <header class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button type="button" on:click={() => router.navigate('/')} class="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft class="w-5 h-5" />
          <span class="hidden sm:inline">Volver</span>
        </button>
        <h1 class="text-xl font-bold text-gray-900">Panel de Administración</h1>
      </div>
      <div class="flex items-center gap-3">
        {#if saved}
          <span class="text-green-600 text-sm font-medium">Guardado ✓</span>
        {/if}
        <button type="button" on:click={addDestino} class="flex items-center gap-1 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
          <Plus class="w-4 h-4" />
          Nuevo Destino
        </button>
        <button type="button" on:click={resetAll} class="flex items-center gap-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm transition-colors">
          <RotateCcw class="w-4 h-4" />
          Restaurar
        </button>
        <button type="button" on:click={save} class="flex items-center gap-1 px-4 py-2 bg-sky-pastel text-white rounded-lg text-sm font-medium hover:bg-sky-400 transition-colors">
          <Save class="w-4 h-4" />
          Guardar
        </button>
        <button type="button" on:click={logout} class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg text-sm transition-colors">
          Salir
        </button>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 py-6">
    {#each editedDestinos as dest, destIdx (dest.id)}
      <div class="mb-4 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <button
          type="button"
          on:click={() => toggleSection(destIdx)}
          class="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center gap-4">
            <img src={dest.heroImage} alt={dest.name} class="w-12 h-12 rounded-xl object-cover" />
            <div class="text-left">
              <h2 class="font-semibold text-gray-900">{dest.name}</h2>
              <p class="text-sm text-gray-500">{dest.country} · {dest.region}</p>
            </div>
          </div>
          {#if expandedIndex === destIdx}
            <ChevronUp class="w-5 h-5 text-gray-400" />
          {:else}
            <ChevronDown class="w-5 h-5 text-gray-400" />
          {/if}
        </button>

        {#if expandedIndex === destIdx}
          <div class="border-t border-gray-200 px-6 py-6 space-y-8">
            <div class="flex justify-end gap-2">
              <button type="button" on:click={() => removeDestino(destIdx)} class="flex items-center gap-1 text-sm text-red-500 hover:text-red-700">
                <Trash2 class="w-3 h-3" /> Eliminar destino
              </button>
              <button type="button" on:click={() => resetOne(destIdx)} class="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                <RotateCcw class="w-3 h-3" /> Restaurar este destino
              </button>
            </div>

            <!-- Info Basica -->
            <section>
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <FileText class="w-5 h-5 text-sky-600" />
                Información Básica
              </h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Nombre</label>
                  <input type="text" bind:value={dest.name} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Eslogan</label>
                  <input type="text" bind:value={dest.tagline} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">País</label>
                  <input type="text" bind:value={dest.country} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Región</label>
                  <input type="text" bind:value={dest.region} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Slug</label>
                  <input type="text" bind:value={dest.slug} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Rating</label>
                  <input type="number" step="0.1" bind:value={dest.rating} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Nº Actividades</label>
                  <input type="number" bind:value={dest.activitiesCount} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm text-gray-600 mb-1">Descripción</label>
                <textarea bind:value={dest.description} rows="4" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
              </div>
            </section>

            <!-- Imagenes -->
            <section>
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <ImageIcon class="w-5 h-5 text-sky-600" />
                Imágenes
              </h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-gray-600 mb-1">Imagen Hero</label>
                  <div class="flex gap-2">
                    <input type="url" bind:value={dest.heroImage} class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                    <label class="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg cursor-pointer transition-colors shrink-0" title="Subir imagen">
                      <Upload class="w-4 h-4 text-gray-500" />
                      <input type="file" accept="image/*" class="hidden" on:change={(e) => handleImageUpload(e, (dataUrl) => { dest.heroImage = dataUrl })} />
                    </label>
                  </div>
                  {#if dest.heroImage}
                    <img src={dest.heroImage} alt="Hero" class="mt-2 w-full h-32 object-cover rounded-lg" />
                  {/if}
                </div>
                <div>
                  <label class="block text-sm text-gray-600 mb-2">Galería</label>
                  {#if dest.gallery && dest.gallery.length > 0}
                    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      {#each dest.gallery as img, imgIdx}
                        <div class="relative group">
                          <img src={img} alt="Gallery {imgIdx}" class="w-full h-24 object-cover rounded-lg" />
                          <button
                            type="button"
                            on:click={() => removeGalleryImage(destIdx, imgIdx)}
                            class="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 class="w-3 h-3" />
                          </button>
                          <input
                            type="url"
                            value={img}
                            on:change={(e) => dest.gallery[imgIdx] = e.target.value}
                            class="mt-1 w-full px-2 py-1 border border-gray-300 rounded text-xs"
                          />
                        </div>
                      {/each}
                    </div>
                  {/if}
                  <div class="flex gap-2">
                    <input
                      type="url"
                      placeholder="URL de nueva imagen..."
                      value={galleryUrlInputs[destIdx] || ''}
                      on:input={(e) => galleryUrlInputs[destIdx] = e.target.value}
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <button type="button" on:click={() => addGalleryImage(destIdx)} class="flex items-center gap-1 px-3 py-2 bg-sky-pastel text-white rounded-lg text-sm hover:bg-sky-400 transition-colors">
                      <Plus class="w-4 h-4" />
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <!-- Quick Facts -->
            <section>
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <Globe class="w-5 h-5 text-sky-600" />
                Datos Rápidos
              </h3>
              {#if dest.quickFacts}
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Mejor época</label>
                    <input type="text" bind:value={dest.quickFacts.bestTime} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Moneda</label>
                    <input type="text" bind:value={dest.quickFacts.currency} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Idioma</label>
                    <input type="text" bind:value={dest.quickFacts.language} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Zona horaria</label>
                    <input type="text" bind:value={dest.quickFacts.timezone} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
              {/if}
            </section>

            <!-- Como Llegar -->
            <section>
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <MapPin class="w-5 h-5 text-sky-600" />
                Cómo Llegar
              </h3>
              {#if dest.howToGet}
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">En Avión</label>
                    <textarea bind:value={dest.howToGet.byPlane} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">En Ferry</label>
                    <textarea bind:value={dest.howToGet.byBoat} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">En Coche</label>
                    <textarea bind:value={dest.howToGet.byCar} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
                  </div>
                </div>
              {/if}
            </section>

            <!-- Donde Dormir -->
            <section>
              <div class="flex items-center justify-between mb-4">
                <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Hotel class="w-5 h-5 text-sky-600" />
                  Dónde Dormir
                </h3>
                <button type="button" on:click={() => addSleepArea(destIdx)} class="flex items-center gap-1 px-3 py-1.5 bg-sky-pastel text-white rounded-lg text-sm hover:bg-sky-400 transition-colors">
                  <Plus class="w-4 h-4" /> Zona
                </button>
              </div>
              {#if dest.whereToSleep}
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Introducción</label>
                    <textarea bind:value={dest.whereToSleep.intro} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
                  </div>
                  {#if dest.whereToSleep.areas}
                    {#each dest.whereToSleep.areas as area, areaIdx}
                      <div class="p-4 bg-gray-50 rounded-xl relative group">
                        <button type="button" on:click={() => removeSleepArea(destIdx, areaIdx)} class="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 class="w-4 h-4" />
                        </button>
                        <div class="grid md:grid-cols-3 gap-3 mb-4">
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">Nombre zona</label>
                            <input type="text" bind:value={area.name} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                          </div>
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">Descripción</label>
                            <input type="text" bind:value={area.description} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                          </div>
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">Ideal para</label>
                            <input type="text" bind:value={area.bestFor} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                          </div>
                        </div>

                        <div class="border-t border-gray-200 pt-3">
                          <div class="flex items-center justify-between mb-3">
                            <span class="text-xs font-semibold text-gray-600 uppercase tracking-wider">Alojamientos</span>
                            <button type="button" on:click={() => addAlojamiento(destIdx, areaIdx)} class="flex items-center gap-1 px-2 py-1 bg-emerald-500 text-white rounded text-xs hover:bg-emerald-600 transition-colors">
                              <Plus class="w-3 h-3" /> Alojamiento
                            </button>
                          </div>
                          {#if area.alojamientos && area.alojamientos.length > 0}
                            <div class="space-y-3">
                              {#each area.alojamientos as aloj, alojIdx}
                                <div class="p-3 bg-white rounded-lg border border-gray-200 relative group/aloj">
                                  <button type="button" on:click={() => removeAlojamiento(destIdx, areaIdx, alojIdx)} class="absolute top-2 right-2 p-0.5 text-red-400 hover:text-red-600 opacity-0 group-hover/aloj:opacity-100 transition-opacity">
                                    <Trash2 class="w-3 h-3" />
                                  </button>
                                  <div class="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                                    <div>
                                      <label class="block text-xs text-gray-400 mb-0.5">Nombre</label>
                                      <input type="text" bind:value={aloj.nombre} class="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
                                    </div>
                                    <div>
                                      <label class="block text-xs text-gray-400 mb-0.5">Tipo</label>
                                      <input type="text" bind:value={aloj.tipo} class="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
                                    </div>
                                    <div>
                                      <label class="block text-xs text-gray-400 mb-0.5">Precio/noche</label>
                                      <input type="number" bind:value={aloj.precio} class="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
                                    </div>
                                    <div>
                                      <label class="block text-xs text-gray-400 mb-0.5">Rating</label>
                                      <input type="number" step="0.1" bind:value={aloj.rating} class="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
                                    </div>
                                  </div>
                                  <div class="mb-2">
                                    <label class="block text-xs text-gray-400 mb-0.5">Descripción</label>
                                    <input type="text" bind:value={aloj.descripcion} class="w-full px-2 py-1.5 border border-gray-200 rounded text-xs" />
                                  </div>
                                  <div class="grid grid-cols-2 gap-2">
                                    <div>
                                      <label class="block text-xs text-blue-500 font-medium mb-0.5">URL Booking.com</label>
                                      <input type="url" bind:value={aloj.bookingUrl} placeholder="https://www.booking.com/hotel/es/..." class="w-full px-2 py-1.5 border border-blue-200 rounded text-xs focus:border-blue-400" />
                                    </div>
                                    <div>
                                      <label class="block text-xs text-gray-400 mb-0.5">Imagen</label>
                                      <div class="flex gap-1">
                                        <input type="url" bind:value={aloj.imagen} placeholder="URL o subir imagen..." class="flex-1 min-w-0 px-2 py-1.5 border border-gray-200 rounded text-xs" />
                                        <label class="flex items-center justify-center px-2 py-1.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded text-xs cursor-pointer transition-colors shrink-0" title="Subir imagen">
                                          <Upload class="w-3 h-3 text-gray-500" />
                                          <input type="file" accept="image/*" class="hidden" on:change={(e) => handleImageUpload(e, (dataUrl) => { aloj.imagen = dataUrl })} />
                                        </label>
                                      </div>
                                      {#if aloj.imagen}
                                        <img src={aloj.imagen} alt={aloj.nombre || 'Alojamiento'} class="mt-1 h-16 w-full object-cover rounded" />
                                      {/if}
                                    </div>
                                  </div>
                                </div>
                              {/each}
                            </div>
                          {:else}
                            <p class="text-xs text-gray-400 italic">Sin alojamientos. Añade uno con el botón de arriba.</p>
                          {/if}
                        </div>
                      </div>
                    {/each}
                  {/if}
                </div>
              {/if}
            </section>

            <!-- Que Hacer -->
            <section>
              <div class="flex items-center justify-between mb-4">
                <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Star class="w-5 h-5 text-sky-600" />
                  Qué Hacer
                </h3>
                <button type="button" on:click={() => addActivity(destIdx)} class="flex items-center gap-1 px-3 py-1.5 bg-sky-pastel text-white rounded-lg text-sm hover:bg-sky-400 transition-colors">
                  <Plus class="w-4 h-4" /> Actividad
                </button>
              </div>
              {#if dest.whatToDo}
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Introducción</label>
                    <textarea bind:value={dest.whatToDo.intro} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
                  </div>
                  {#if dest.whatToDo.activities}
                    {#each dest.whatToDo.activities as act, actIdx}
                      <div class="p-4 bg-gray-50 rounded-xl relative group">
                        <button type="button" on:click={() => removeActivity(destIdx, actIdx)} class="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 class="w-4 h-4" />
                        </button>
                        <div class="grid md:grid-cols-3 gap-3">
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">Nombre</label>
                            <input type="text" bind:value={act.name} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                          </div>
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">Descripción</label>
                            <input type="text" bind:value={act.description} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                          </div>
                          <div>
                            <label class="block text-xs text-gray-500 mb-1">Tip</label>
                            <input type="text" bind:value={act.tip} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                          </div>
                        </div>
                      </div>
                    {/each}
                  {/if}
                </div>
              {/if}
            </section>

            <!-- Excursiones -->
            <section>
              <div class="flex items-center justify-between mb-4">
                <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900">
                  <Ship class="w-5 h-5 text-sky-600" />
                  Excursiones
                </h3>
                <button type="button" on:click={() => addExcursion(destIdx)} class="flex items-center gap-1 px-3 py-1.5 bg-sky-pastel text-white rounded-lg text-sm hover:bg-sky-400 transition-colors">
                  <Plus class="w-4 h-4" /> Excursión
                </button>
              </div>
              {#if dest.excursions}
                <div class="space-y-4">
                  {#each dest.excursions as excursion, exIdx}
                    <div class="p-4 bg-gray-50 rounded-xl relative group">
                      <button type="button" on:click={() => removeExcursion(destIdx, exIdx)} class="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-100 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        <Trash2 class="w-4 h-4" />
                      </button>
                      <div class="grid md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Título</label>
                          <input type="text" bind:value={excursion.title} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">ID</label>
                          <input type="text" bind:value={excursion.id} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="block text-xs text-gray-500 mb-1">Descripción</label>
                        <textarea bind:value={excursion.description} rows="2" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"></textarea>
                      </div>
                      <div class="mb-3">
                        <label class="block text-xs text-gray-500 mb-1">Imagen</label>
                        <div class="flex gap-2">
                          <input type="url" bind:value={excursion.image} class="flex-1 min-w-0 px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                          <label class="flex items-center justify-center px-3 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg cursor-pointer transition-colors shrink-0" title="Subir imagen">
                            <Upload class="w-4 h-4 text-gray-500" />
                            <input type="file" accept="image/*" class="hidden" on:change={(e) => handleImageUpload(e, (dataUrl) => { excursion.image = dataUrl })} />
                          </label>
                        </div>
                        {#if excursion.image}
                          <img src={excursion.image} alt="Excursión" class="mt-2 h-20 object-cover rounded-lg" />
                        {/if}
                      </div>
                      <div class="grid md:grid-cols-4 gap-3 mb-3">
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Precio</label>
                          <input type="number" bind:value={excursion.price} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Moneda</label>
                          <input type="text" bind:value={excursion.currency} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Rating</label>
                          <input type="number" step="0.1" bind:value={excursion.rating} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Reseñas</label>
                          <input type="number" bind:value={excursion.reviews} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div class="grid md:grid-cols-3 gap-3 mb-3">
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Duración</label>
                          <input type="text" bind:value={excursion.duration} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Grupo</label>
                          <input type="text" bind:value={excursion.groupSize} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                        <div>
                          <label class="block text-xs text-gray-500 mb-1">Proveedor</label>
                          <input type="text" bind:value={excursion.provider} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                        </div>
                      </div>
                      <div class="mb-3">
                        <label class="block text-xs text-gray-500 mb-1">URL Afiliado</label>
                        <input type="url" bind:value={excursion.affiliateUrl} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1">Highlights (separados por coma)</label>
                        <input
                          type="text"
                          value={(excursion.highlights || []).join(', ')}
                          on:change={(e) => excursion.highlights = e.target.value.split(',').map(s => s.trim()).filter(Boolean)}
                          class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </section>

            <!-- Enlaces Afiliado -->
            <section>
              <h3 class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                <Globe class="w-5 h-5 text-sky-600" />
                Enlaces de Afiliado
              </h3>
              {#if dest.affiliateLinks}
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Skyscanner</label>
                    <input type="url" bind:value={dest.affiliateLinks.skyscanner} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                  <div>
                    <label class="block text-sm text-gray-600 mb-1">Booking</label>
                    <input type="url" bind:value={dest.affiliateLinks.booking} class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
                  </div>
                </div>
              {/if}
            </section>

          </div>
        {/if}
      </div>
    {/each}

    <!-- Bottom save bar -->
    <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end gap-3 rounded-t-2xl shadow-lg">
      <button type="button" on:click={resetAll} class="flex items-center gap-1 px-4 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg text-sm transition-colors">
        <RotateCcw class="w-4 h-4" />
        Restaurar todo
      </button>
      <button type="button" on:click={save} class="flex items-center gap-1 px-6 py-2 bg-sky-pastel text-white rounded-xl font-medium hover:bg-sky-400 transition-colors">
        <Save class="w-4 h-4" />
        Guardar cambios
      </button>
    </div>
  </div>
</div>
