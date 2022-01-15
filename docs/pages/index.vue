<template>
  <div id="app">
    <CommandMenu :actions="commandItems" :theme="theme" :blur="blur">
      <template v-slot:icon="{ icon }">
        <Icon :name="icon" />
      </template>
    </CommandMenu>
    <div class="container">
		<h1>Vue Command Menu</h1>
		<p>Build beautiful and extensible Command + k menus with Vue</p>
		<div class="actions">
			<button type="button" @click.prevent="$root.$emit('openCommandMenu')">Open CMD Menu</button>
			<p>or use CMD + K</p>
		</div>
		<img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80" />
		<img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" />
		<img src="https://images.unsplash.com/photo-1618397746666-63405ce5d015?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80" />
	</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CommandMenu from '../../src/command.vue';
import { Action } from '../../src/types'

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
						window.location.href = 'https://github.com/BetaHuhn/vue-command-menu'
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

.container {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1rem;
}

.actions {
	display: flex;
	align-items: center;
}

.actions p {
	color: #747474;
	margin-left: 0.5rem;
}

h1 {
	margin-top: 10rem;
	margin-bottom: 0.5rem;
}

button {
    appearance: none;
    background: none;
    border: 0;
    outline: 0;
    padding: 0;
    cursor: pointer;
    color: #fff;
    font-family: inherit;
    background: rgb(27, 27, 27);
    padding: 0.7rem 0.8rem;
    border-radius: 8px;
    box-sizing: border-box;
}

img {
	max-width: 95%;
	margin-top: 4rem;
	border-radius: 8px;
}
</style>
