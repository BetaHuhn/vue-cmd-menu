<template>
	<nav class="fixed top-0 z-40 w-full bg-white bg-opacity-75 backdrop-filter backdrop-blur-md border-b"
		:class="{ 'shadow border-transparent': scrolled, 'absolute': !isDocs }" @click="scrollToTop">
		<div class="container mx-auto flex-1 px-4 lg:px-8">
			<div class="flex items-center justify-between h-16">
				<div class="lg:w-1/5 flex items-center pr-4" @click.stop="noop">
					<NuxtLink :to="localePath('/')" class="flex-shrink-0 flex-1 font-bold text-lg"
						:aria-label="`${settings.title} Logo`">
						<span v-if="!logo">{{ settings.title }}</span>
						<img v-if="logo" :src="logo" class="h-10" :alt="settings.title" />
					</NuxtLink>
				</div>
				<div v-if="settings.layout !== 'single' && isDocs" class="flex-1 flex justify-start w-4/6">
					<AppSearchAlgolia v-if="settings.algolia" :options="settings.algolia" :settings="settings" />
					<AppSearch v-else class="hidden lg:block" />
				</div>
				<div class="lg:w-1/5 flex items-center pl-4 lg:pl-8"
					:class="{ 'justify-between': lastRelease && settings.layout !== 'single', 'justify-end': !lastRelease || settings.layout === 'single' }">
					<NuxtLink v-if="lastRelease" :to="localePath('/releases')"
						class="font-semibold leading-none text-gray-700 hover:text-gray-500 text-base mr-4"
						exact-active-class="text-gray-500">{{ lastRelease.name }}</NuxtLink>
					<div class="flex items-center">
						<div v-if="navLinks" class="flex items-center">
							<a v-for="nav in navLinks" :key="nav.name" :href="nav.href"
								@click="trackClick(nav.name)"
								data-splitbee-event="Click Nav" :data-splitbee-event-type="nav.name"
								:title="nav.name" :name="nav.name"
								class="text-gray-600 hover:text-gray-500 ml-4 flex-shrink-0"
								:class="{ 'hidden lg:block': settings.layout !== 'single' }">
								<p>{{ nav.name }}</p>
							</a>
						</div>

						<button v-if="settings.layout !== 'single'"
							class="lg:hidden p-2 rounded-md text-gray-700 focus:outline-none -mr-2"
							aria-label="Menu" @click.stop="menu = !menu">
							<IconX v-if="menu" class="w-5 h-5" />
							<IconMenu v-else class="w-5 h-5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		data() {
			return {
				scrolled: 0
			}
		},
		computed: {
			...mapGetters([
				'settings',
				'lastRelease'
			]),
			menu: {
				get() {
					return this.$store.state.menu.open
				},
				set(val) {
					this.$store.commit('menu/toggle', val)
				}
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
			isDocs() {
				return this.$route.path.startsWith('/docs')
			},
			navLinks() {
				const page = this.isDocs ? 'docs' : 'home'
				if (!this.settings.navLinks) return undefined
				return this.settings.navLinks.filter((link) => link.page === undefined || link.page === page)
			}
		},
		beforeMount() {
			window.addEventListener('scroll', this.handleScroll)
		},
		beforeDestroy() {
			window.removeEventListener('scroll', this.handleScroll)
		},
		methods: {
			trackClick(name) {
				this.$ackee.action('395a0f04-31d6-49bd-bf6e-a5050a8fc031', {
					key: `Nav ${ name }`,
					value: 1
				})
			},
			handleScroll() {
				this.scrolled = window.scrollY > 0
			},
			scrollToTop() {
				if (window.innerWidth >= 1280) {
					return
				}
				window.scrollTo(0, 0)
			},
			noop() {}
		}
	}
</script>