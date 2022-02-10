import theme from './theme'

export default theme({
	server: {
		port: 3000,
		host: '0.0.0.0'
	},
	docs: {
		primaryColor: '#89B3E2',
		liveEdit: process.env.LIVE_EDIT || false
	},
	build: {
		postcss: null, 
	},
	components: true,
	head: {
		title: 'Vue CMD Menu',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{
				charset: 'utf-8'
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1'
			},
			{
				hid: 'title',
				name: 'title',
				content: 'Vue CMD Menu'
			},
			{
				hid: 'description',
				name: 'description',
				content: 'Build beautiful and extensible Command + k menus with Vue.'
			},
		]
	},
	modules: [
		'@blokwise/dynamic'
	],
	buildModules: [
		'@nuxtjs/ackee',
		'@nuxt/typescript-build'
	],
	ackee: {
		server: 'https://stats.mxis.ch',
		domainId: '38bf3d25-6935-4759-b9d4-23cb0b9bfb3a',
		detailed: true,
		ignoreLocalhost: false,
		ignoreOwnVisits: true
	}
})