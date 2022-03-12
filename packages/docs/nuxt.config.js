import theme from './theme'

const title = 'Vue CMD Menu'
const description = 'Build beautiful and extensible Command + k menus with Vue.'

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
		title: title,
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
				content: title
			},
			{
				hid: 'description',
				name: 'description',
				content: description
			},
		]
	},
	pwa: {
		meta: {
			name: title,
			description: description
		}
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
		domainId: '2e61c492-a718-4791-a054-674efdd1a16c',
		detailed: true,
		ignoreLocalhost: false,
		ignoreOwnVisits: true
	}
})