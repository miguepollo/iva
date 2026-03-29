<script>
  import { MapPin, Star, ArrowRight } from 'lucide-svelte'
  import { router } from '../../stores/router.js'

  export let slug = ''
  export let name = ''
  export let country = ''
  export let image = ''
  export let description = ''
  export let rating = 4.8
  export let activities = 12

  function navigate(e) {
    e.preventDefault()
    router.navigate(`/destino/${slug}`)
  }
</script>

<a href={`#/destino/${slug}`} on:click={navigate} class="group block">
  <div class="relative bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 border border-gray-100/50">
    <div class="relative h-60 overflow-hidden">
      <img
        src={image}
        alt={name}
        loading="lazy"
        decoding="async"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

      <div class="absolute top-4 right-4 flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-sm">
        <Star class="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
        <span class="text-sm font-semibold text-gray-800">{rating}</span>
      </div>

      <div class="absolute bottom-4 left-4 right-4">
        <div class="flex items-center gap-1.5 text-white/80 mb-1.5">
          <MapPin class="w-3.5 h-3.5" />
          <span class="text-sm font-medium">{country}</span>
        </div>
        <h3 class="text-2xl font-bold text-white">{name}</h3>
      </div>
    </div>

    <div class="p-5">
      <p class="text-gray-500 text-sm line-clamp-2 mb-4 leading-relaxed">{description}</p>
      <div class="flex items-center justify-between">
        <span class="text-sky-600 text-sm font-semibold">{activities} actividades</span>
        <span class="flex items-center gap-1 text-coral-soft font-semibold text-sm group-hover:gap-2 transition-all duration-300">
          Explorar
          <ArrowRight class="w-4 h-4" />
        </span>
      </div>
    </div>
  </div>
</a>
