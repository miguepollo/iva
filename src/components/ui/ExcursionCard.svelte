<script>
  import { Star, Clock, Users, ExternalLink } from 'lucide-svelte'

  export let title = ''
  export let image = ''
  export let price = 0
  export let currency = '€'
  export let rating = 4.8
  export let reviews = 0
  export let duration = ''
  export let groupSize = ''
  export let affiliateUrl = '#'
  export let provider = 'civitatis'
  export let highlights = []

  const providerStyles = {
    civitatis: 'bg-gradient-to-r from-orange-400 to-orange-500',
    getyourguide: 'bg-gradient-to-r from-red-400 to-red-500',
    viator: 'bg-gradient-to-r from-yellow-500 to-amber-500',
  }
</script>

<div class="group bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 border border-gray-100/50">
  <div class="relative h-48 overflow-hidden">
    <img
      src={image}
      alt={title}
      loading="lazy"
      decoding="async"
      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
    <div class="absolute top-3 left-3 {providerStyles[provider] || 'bg-gray-500'} text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
      {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </div>
  </div>

  <div class="p-5">
    <h4 class="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-sky-600 transition-colors text-lg">
      {title}
    </h4>

    <div class="flex flex-wrap items-center gap-3 text-sm text-gray-400 mb-3">
      <div class="flex items-center gap-1.5">
        <Clock class="w-4 h-4" />
        <span>{duration}</span>
      </div>
      {#if groupSize}
        <div class="flex items-center gap-1.5">
          <Users class="w-4 h-4" />
          <span>{groupSize}</span>
        </div>
      {/if}
    </div>

    <div class="flex items-center gap-2 mb-4">
      <div class="flex items-center gap-0.5">
        {#each Array(5) as _, i}
          <Star
            class="w-4 h-4 {i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}"
          />
        {/each}
      </div>
      <span class="text-sm text-gray-400">({reviews.toLocaleString()})</span>
    </div>

    {#if highlights.length > 0}
      <div class="flex flex-wrap gap-1.5 mb-4">
        {#each highlights.slice(0, 3) as highlight}
          <span class="text-xs bg-sky-50 text-sky-600 px-2.5 py-1 rounded-full font-medium">
            {highlight}
          </span>
        {/each}
      </div>
    {/if}

    <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
      <div>
        <span class="text-xs text-gray-400">desde</span>
        <div class="text-2xl font-bold text-gray-900">{currency}{price}</div>
      </div>
      <a
        href={affiliateUrl}
        target="_blank"
        rel="noopener noreferrer sponsored"
        class="flex items-center justify-center gap-2 w-full sm:w-auto bg-gradient-to-r from-coral-soft to-pink-400 text-white px-5 py-2.5 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-200/50 transition-all duration-300 active:scale-95"
      >
        Reservar
        <ExternalLink class="w-4 h-4" />
      </a>
    </div>
  </div>
</div>
