import '@/registerServiceWorker'

import App from './App.vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { en } from '@/locales/en'
import { router } from '@/router'
import { store } from '@/store'

const i18n = createI18n({
  locale: 'en',
  messages: {
    en
  }
})

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
