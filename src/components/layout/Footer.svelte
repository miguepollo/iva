<script>
  import { Plane, Instagram, Twitter, Youtube, Mail, Heart } from 'lucide-svelte'

  const footerLinks = {
    destinos: [
      { label: 'Menorca', href: '#/destino/menorca-espana' },
      { label: 'Mallorca', href: '#/destino/mallorca-espana' },
      { label: 'Ibiza', href: '#/destino/ibiza-espana' },
      { label: 'Tenerife', href: '#/destino/tenerife-espana' },
    ],
    recursos: [
      { label: 'Guías de Viaje', href: '#/guias' },
      { label: 'Blog', href: '#/blog' },
      { label: 'Consejos', href: '#/consejos' },
    ],
    legal: [
      { label: 'Privacidad', href: '#/privacidad' },
      { label: 'Afiliados', href: '#/afiliados' },
      { label: 'Contacto', href: '#/contacto' },
    ],
  }

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ]
</script>

<div class="relative">
  <div class="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cream to-transparent pointer-events-none z-10"></div>
</div>

<footer class="bg-gradient-to-b from-gray-900 via-gray-900 to-black text-gray-300 relative overflow-hidden">
  <div class="absolute inset-0 opacity-5">
    <div class="absolute top-0 left-1/4 w-96 h-96 bg-sky-pastel rounded-full blur-[128px]"></div>
    <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-coral-soft rounded-full blur-[128px]"></div>
  </div>

  <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-16 md:py-20 relative">
    <div class="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
      <div class="col-span-2 lg:col-span-2">
        <a href="#/" class="flex items-center gap-2.5 mb-5 group">
          <div class="p-2 bg-gradient-to-br from-sky-pastel to-sky-400 rounded-xl group-hover:shadow-lg group-hover:shadow-sky-pastel/20 transition-all duration-300">
            <Plane class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-white">
            Iva<span class="text-coral-soft">Viajes</span>
          </span>
        </a>
        <p class="text-gray-400 mb-8 max-w-sm leading-relaxed">
          Tu guía de confianza para descubrir los destinos más increíbles del mundo. Viajes auténticos, recuerdos inolvidables.
        </p>
        <div class="flex flex-col sm:flex-row gap-2">
          <div class="relative flex-1">
            <Mail class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="email"
              placeholder="Tu email"
              class="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-sky-pastel/50 focus:bg-white/10 transition-all duration-300"
            />
          </div>
          <button class="bg-gradient-to-r from-coral-soft to-pink-400 text-white px-5 py-3 rounded-xl font-medium hover:shadow-lg hover:shadow-pink-500/20 transition-all duration-300 active:scale-95 whitespace-nowrap">
            Suscribir
          </button>
        </div>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Destinos</h4>
        <ul class="space-y-3">
          {#each footerLinks.destinos as link}
            <li>
              <a href={link.href} class="text-gray-400 hover:text-sky-pastel transition-colors duration-300 text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Recursos</h4>
        <ul class="space-y-3">
          {#each footerLinks.recursos as link}
            <li>
              <a href={link.href} class="text-gray-400 hover:text-sky-pastel transition-colors duration-300 text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <div>
        <h4 class="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h4>
        <ul class="space-y-3">
          {#each footerLinks.legal as link}
            <li>
              <a href={link.href} class="text-gray-400 hover:text-sky-pastel transition-colors duration-300 text-sm">
                {link.label}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </div>
  </div>

  <div class="border-t border-white/5">
    <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6">
      <div class="flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-gray-500 text-sm flex items-center gap-1.5">
          © {new Date().getFullYear()} IvaViajes. Hecho con
          <Heart class="w-3.5 h-3.5 text-coral-soft fill-coral-soft" />
          para viajeros.
        </p>
        <div class="flex items-center gap-3">
          {#each socialLinks as social}
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              class="p-2.5 rounded-lg text-gray-500 hover:text-sky-pastel hover:bg-white/5 transition-all duration-300"
              aria-label={social.label}
            >
              <svelte:component this={social.icon} class="w-4 h-4" />
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</footer>
