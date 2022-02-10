<template>
  <div class="pt-16">
    <AppHeader />

    <main class="mx-auto">
      <div class="flex flex-wrap">
        <AppNav />

        <Nuxt class="w-full" />
      </div>
    </main>

    <AppFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  head () {
    const i18nSeo = this.$nuxtI18nSeo()
    const previewUrl = this.settings.url.replace(/\/$/, '') + '/preview.png'

    return {
      bodyAttrs: {
        class: [...this.bodyClass, 'antialiased text-gray-700 leading-normal bg-white overflow-x-hidden']
      },
      ...i18nSeo,
      meta: (i18nSeo.meta || []).concat([
        // Open Graph
        { hid: 'og:site_name', property: 'og:site_name', content: this.settings.title },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'og:url', property: 'og:url', content: this.settings.url },
        { hid: 'og:image', property: 'og:image', content: previewUrl },
        // Twitter Card
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:site', name: 'twitter:site', content: this.settings.twitter },
        { hid: 'twitter:title', name: 'twitter:title', content: this.settings.title },
        { hid: 'twitter:image', name: 'twitter:image', content: previewUrl },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: this.settings.title }
      ])
    }
  },
  computed: {
    ...mapGetters([
      'settings'
    ]),
    bodyClass () {
      return this.$store.state.menu.open ? ['lg:h-auto overflow-y-hidden lg:overflow-y-auto'] : []
    }
  }
}
</script>

<style>
body {
  background-image: radial-gradient(#ddd 1px, transparent 0), radial-gradient(#ddd 1px, transparent 0);
    background-position: 0 0, 25px 25px;
    background-size: 50px 50px;
}
</style>