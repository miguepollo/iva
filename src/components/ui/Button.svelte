<script>
  export let variant = 'primary'
  export let size = 'md'
  export let fullWidth = false
  export let href = null
  export let type = 'button'

  const variants = {
    primary: 'bg-gradient-to-r from-coral-soft to-pink-400 text-white hover:shadow-lg hover:shadow-pink-200/50',
    secondary: 'bg-gradient-to-r from-sky-pastel to-sky-400 text-white hover:shadow-lg hover:shadow-sky-200/50',
    outline: 'border-2 border-sky-pastel text-sky-600 hover:bg-sky-pastel hover:text-white',
    ghost: 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  $: classes = `
    inline-flex items-center justify-center font-medium rounded-xl
    transition-all duration-300 active:scale-95
    ${variants[variant]} ${sizes[size]}
    ${fullWidth ? 'w-full' : ''}
  `.trim()
</script>

{#if href}
  <a {href} class={classes} {...$$restProps}>
    <slot />
  </a>
{:else}
  <button {type} class={classes} {...$$restProps}>
    <slot />
  </button>
{/if}
