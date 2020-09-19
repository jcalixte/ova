<template>
  <footer class="footer-translation">
    <button class="button" @click="toggleLanguage">
      {{ t('toggle-lang') }}
    </button>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { locales } from '@/locales/message'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'FooterTranslation',
  setup() {
    const { t } = useI18n()

    const i18n = useI18n()

    return {
      t,
      toggleLanguage: () =>
        (i18n.locale.value =
          locales[(locales.indexOf(i18n.locale.value) + 1) % locales.length])
    }
  }
})
</script>

<style lang="scss" scoped>
.footer-translation {
}
</style>
