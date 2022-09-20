import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: 'https://mis-inventory.herokuapp.com/api'
    }
  },
  modules: [
    "@nuxt/ui",
    "@nuxtjs/supabase",
  ],
  unocss: {
    shortcuts: {
      'n-button-base': 'border n-border-base rounded shadow-sm op80 !outline-none',
      'n-button-hover': 'op100 !border-context text-context',
      'n-button-active': 'n-active-base bg-context/5',
    }
  }
})
