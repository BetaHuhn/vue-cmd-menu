<template>
  <footer class="h-16 relative w-full bg-black z-20 text-gray-500">
    <div class="h-full w-full container mx-auto px-4 lg:px-8 flex items-center justify-between">
      <div class="flex-shrink-0 flex-1 flex-col justify-start">
        <p class="text-sm md:text-base">Made by <a href="https://github.com" class="text-gray-300">@BetaHuhn</a></p>
      </div>
      <div v-if="settings.footerLinks" class="flex items-end ml-auto space-x-4">
         <a v-for="link in settings.footerLinks" :key="link.name" class="text-sm md:text-base" :href="link.href" target="_blank" rel="noopener" :title="link.name" :name="link.name">
          {{ link.name }}
				</a>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
				'settings',
				'lastRelease'
			]),
    availableLocales () {
      return this.$i18n.locales.filter(i => i.code !== this.$i18n.locale)
    },
    logo() {
				if (!this.settings.logo) {
					return
				}

				if (typeof this.settings.logo === 'object') {
					return this.settings.logo
				}

				return this.settings.logo
			},
  }
}
</script>
