import '@/registerServiceWorker'

import App from './App.vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { messages } from '@/locales/message'
import { router } from '@/router/router'
import { store } from '@/store/store'

const i18n = createI18n({
  locale: 'en',
  messages
})

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
