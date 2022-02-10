<template>
  <div id="app">
    <CommandMenu :actions="commandItems" :theme="theme" :blur="blur">
      <template v-slot:icon="{ icon }">
        <Icon :name="icon" />
      </template>
    </CommandMenu>
    <div class="max-w-4xl w-full m-auto text-center py-6">
		<h1 class="text-5xl font-bold">Vue Command Menu</h1>
		<p class="text-xl mt-2">Build beautiful and extensible ⌘ + k menus with Vue</p>
		<div class="mt-8">
			<button class="bg-gray-900 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg" type="button" @click.prevent="$root.$emit('openCommandMenu')">Open Demo</button>
			<p class="text-base mt-1">or use ⌘ + K (Ctrl + k on Win)</p>
		</div>
		<img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
		<img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" />
		<img src="https://images.unsplash.com/photo-1618397746666-63405ce5d015?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" />
	</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CommandMenu from 'vue-cmd-menu/src/command.vue';
import { Action } from 'vue-cmd-menu/src/types'

export default Vue.extend({
  name: 'Landing',
  components: {
    CommandMenu
  },
  data() {
    return {
		theme: 'light',
		blur: true
	}
  },
  computed: {
    commandItems(): Action[] {
			return [
				{
					id: 'home',
					section: 'Navigation',
					text: 'Home',
          icon: 'home',
					action: () => {
						window.location.pathname = '/'
					}
				},
				{
					id: 'docs',
					section: 'Navigation',
					text: 'Docs',
          icon: 'docs',
					action: () => {
						window.location.pathname = '/docs'
					}
				},
				{
					id: 'contact',
					section: 'Navigation',
					text: 'Contact',
          icon: 'contact',
					action: () => {
						window.location.pathname = '/contact'
					}
				},
				{
					id: 'github',
					section: 'Navigation',
					text: 'GitHub',
          icon: 'GitHub',
					action: () => {
						window.location.href = 'https://github.com/BetaHuhn/vue-cmd-menu'
					}
				},
				{
					id: 'search-docs',
					icon: 'docsSearch',
					keybindings: [ 's' ],
					section: 'Documentation',
					text: 'Search Docs',
					tag: 'Docs',
					placeholder: 'Keyword to search for',
          			childActions: [
						{
							id: 'get-started',
							text: 'Get started',
							action: () => {
								alert('true')
							}
						},
						{
							id: 'installation',
							text: 'Installation',
							action: () => {
								alert('true')
							}
						}
					]
				},
				{
					id: 'confirm',
					icon: 'confirm',
					text: 'Confirm example',
					section: 'Examples',
					childTitle: 'Are you sure?',
					childActions: [
						{
							id: 'yes',
							text: 'Confirm',
							action: () => {
								alert('true')
							}
						},
						{
							id: 'no',
							text: 'Cancel',
							action: () => {
								alert('true')
							}
						}
					]
				},
				{
					id: 'input',
					icon: 'input',
					text: 'Input example',
					section: 'Examples',
					tag: 'Enter name',
					placeholder: 'Your name',
					action: (val) => {
						alert(`Hello ${ val }`)
					}
				},
				{
					id: 'child-actions',
					icon: 'search',
					text: 'Child actions example',
					section: 'Examples',
					tag: 'Actions',
					placeholder: 'Filter',
					childActions: [
						{
							id: 'action1',
							text: 'Action 1',
							action: () => {
								alert('Action 1')
							}
						},
						{
							id: 'action2',
							text: 'Action 2',
							action: () => {
								alert('Action 2')
							}
						}
					]
				},
				{
					id: 'change-theme',
					text: 'Toggle theme',
					icon: 'theme',
					section: 'Preferences',
					keybindings: [ 't' ],
					preventClose: true,
					action: () => {
						this.theme = this.theme === 'light' ? 'dark' : 'light'
					}
				},
				{
					id: 'toggle-blur',
					text: 'Toggle blur',
					icon: 'blur',
					section: 'Preferences',
					keybindings: [ 'b' ],
					preventClose: true,
					action: () => {
						this.blur = !this.blur
					}
				}
			]
		},
  }
});
</script>

<style type="text/css">
html {
  font-family: Inter UI, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

.actions {
	display: flex;
	align-items: center;
}

.actions p {
	color: #747474;
	margin-left: 0.5rem;
}

img {
	max-width: 95%;
	margin-top: 4rem;
	border-radius: 8px;
}
</style>