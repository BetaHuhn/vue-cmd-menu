<template>
  <aside
    class="w-full lg:w-1/5 lg:block fixed lg:relative inset-0 mt-16 lg:mt-0 z-30 bg-gray-200 lg:bg-transparent lg:dark:bg-transparent"
    :class="{ 'block': menu, 'hidden': !menu }"
  >
    <div class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)">
      <ul v-if="isDocs" class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
        <li v-if="!settings.algolia" class="mb-4 lg:hidden">
          <AppSearch />
        </li>
        <li
          v-for="(docs, category, index) in categories"
          :key="category"
          class="mb-4"
          :class="{
            'active': isCategoryActive(docs),
            'lg:mb-0': index === Object.keys(categories).length - 1
          }"
        >
          <p
            v-if="category"
            class="mb-2 text-gray-600 uppercase tracking-wider font-bold text-sm lg:text-xs"
          >{{ category }}</p>
          <ul>
            <li v-for="doc of docs" :key="doc.slug" class="text-gray-600">
              <NuxtLink
                :to="localePath(doc.to)"
                class="px-2 rounded font-medium py-1 hover:text-primary-600 flex items-center justify-between"
                exact-active-class="text-primary-600 hover:text-primary-600 bg-gray-200"
              >
                {{ doc.menuTitle || doc.title }}
                <client-only>
                  <span
                    v-if="isDocumentNew(doc)"
                    class="animate-pulse rounded-full bg-primary-500 opacity-75 h-2 w-2"
                  />
                </client-only>
              </NuxtLink>
            </li>
          </ul>
        </li>
        <li v-if="menu" class="mb-4 lg:mb-0">
          <p class="mb-2 text-gray-500 uppercase tracking-wider font-bold text-sm lg:text-xs">More Links</p>
          <ul>
            <li v-for="nav in navLinks" :key="nav.name" class="text-gray-300">
              <a :href="nav.href"
                :title="nav.name" :name="nav.name"
                 class="px-2 rounded font-medium py-1 hover:text-primary-500 flex items-center justify-between">
                <p>{{ nav.name }}</p>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <ul v-else class="p-4 lg:py-8 lg:pl-0 lg:pr-8">
        <li v-for="nav in navLinks" :key="nav.name" class="lg:hidden space-x-2 text-center">
          <a :href="nav.href"
            :title="nav.name" :name="nav.name"
            class="text-gray-300 hover:text-primary-500 ml-4 flex-shrink-0">
            <p>{{ nav.name }}</p>
          </a>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'settings',
      'githubUrls'
    ]),
    menu: {
      get () {
        return this.$store.state.menu.open
      },
      set (val) {
        this.$store.commit('menu/toggle', val)
      }
    },
    categories () {
      return this.$store.state.categories[this.$i18n.locale]
    },
    isDocs() {
      return this.$route.path.startsWith('/docs')
    },
    navLinks() {
				const page = this.isDocs ? 'docs' : 'home'
				if (!this.settings.navLinks) return undefined
				return this.settings.navLinks.filter((link) => link.page === undefined || link.page === page)
			}
  },
  methods: {
    isCategoryActive (documents) {
      return documents.some(document => document.to === this.$route.fullPath)
    },
    isDocumentNew (document) {
      if (process.server) {
        return
      }
      if (!document.version || document.version <= 0) {
        return
      }

      const version = localStorage.getItem(`document-${document.slug}-version`)
      if (document.version > Number(version)) {
        return true
      }

      return false
    }
  }
}
</script>
