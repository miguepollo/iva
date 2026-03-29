import { writable } from 'svelte/store'

// Router store simple basado en hash
function createRouter() {
  const { subscribe, set, update } = writable({
    path: typeof window !== 'undefined' ? window.location.hash.slice(1) || '/' : '/',
    params: {},
  })

  return {
    subscribe,
    navigate: (path) => {
      if (typeof window !== 'undefined') {
        window.location.hash = path
        set({ path, params: {} })
      }
    },
    init: () => {
      if (typeof window !== 'undefined') {
        window.addEventListener('hashchange', () => {
          const path = window.location.hash.slice(1) || '/'
          set({ path, params: {} })
        })
      }
    },
  }
}

export const router = createRouter()

// Destino seleccionado
export const selectedDestination = writable(null)

// Modo edición
export const editMode = writable(false)
export const editSection = writable(null)

// Admin edits store (localStorage)
function createEditsStore() {
  const stored = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('iva-edits') || '{}')
    : {}

  const { subscribe, set, update } = writable(stored)

  return {
    subscribe,
    saveEdit: (section, data) => {
      update(edits => {
        edits[section] = data
        if (typeof window !== 'undefined') {
          localStorage.setItem('iva-edits', JSON.stringify(edits))
        }
        return edits
      })
    },
    clearEdit: (section) => {
      update(edits => {
        delete edits[section]
        if (typeof window !== 'undefined') {
          localStorage.setItem('iva-edits', JSON.stringify(edits))
        }
        return edits
      })
    },
    clearAll: () => {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('iva-edits')
      }
      set({})
    },
    export: () => {
      if (typeof window !== 'undefined') {
        const edits = localStorage.getItem('iva-edits') || '{}'
        const blob = new Blob([edits], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `iva-edits-${new Date().toISOString().split('T')[0]}.json`
        a.click()
        URL.revokeObjectURL(url)
      }
    },
  }
}

export const edits = createEditsStore()
