<template>
  <div id="app">
    <CommandMenu :actions="commandItems"></CommandMenu>
    <div class="container">
      <h1>Command Menu</h1>
      <button type="button" @click.prevent="$root.$emit('openCommandMenu')">Show</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CommandMenu from '@/command.vue';
import { Action } from '../command'
// import AddIcon from './AddIcon.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    CommandMenu
  },
  data() {
    return {}
  },
  computed: {
    commandItems(): Action[] {
			return [
				{
					id: 'create-note',
					keybindings: [ '+' ],
					text: 'Create a new note',
					tag: 'New Note',
          // icon: AddIcon,
					placeholder: 'Enter a name for your note',
					action: (val) => {
						 alert(val)
					}
				},
				{
					id: 'open-note',
					keybindings: [ 'o' ],
					text: 'Open another note',
					tag: 'Open Note',
					placeholder: 'Name of the note',
          action: (val) => {
						 alert(val)
					}
				},
				{
					id: 'focus-mode',
					keybindings: [ 'f' ],
					text: 'Toggle focus mode',
          keywords: [ 'test', 'hello' ],
					action: () => {
						 alert('Focus mode')
					}
				},
				{
					id: 'delete-note',
					keybindings: [ 'd' ],
					text: 'Delete this note',
					childTitle: 'Are you sure you want to delete this note?',
					childActions: [
						{
							icon: 'check',
							id: 'yes',
							text: 'Confirm',
							action: () => {
                alert('true')
              }
						},
						{
							icon: 'close',
							id: 'no',
							text: 'Cancel',
							action: () => {
                alert('true')
              }
						}
					]
				},
				{
					id: 'copy-link',
					text: 'Copy link',
					keybindings: [ 'u' ],
					action: () => {
						alert('Copy link')
					}
				},
				{
					id: 'go-home',
					text: 'Go home',
					keybindings: [ 'backspace' ],
					action: () => {
						window.location.pathname = '/'
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
</style>
