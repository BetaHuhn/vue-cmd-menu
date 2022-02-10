<template>
  <transition name="cmd-menu-fade">
    <div
      v-if="open"
      :ref="name"
      class="cmd-menu"
      :data-name="name"
      :class="{ 'cmd-menu-shadow': shadow, 'cmd-menu-blur': blur, 'cmd-menu-overlay': overlay }"
      @click="handleOverlayClick($event)"
	  :style="`--cmd-theme: ${ theme }`"
	  :data-theme="theme"
	  :data-blur="blur"
    >
      <div class="cmd-menu-inside">
		<div class="cmd-menu-header">
			<slot name="header"></slot>
		</div>
        <div class="cmd-menu-search-wrapper">
          <div v-if="currentItem && currentItem.tag" class="cmd-menu-tag">
            <p>{{ currentItem.tag }}</p>
          </div>
          <span v-if="currentItem && currentItem.childTitle" class="cmd-menu-search">{{ currentItem.childTitle }}</span>
          <input
            v-else
            id="cmd-menu-search"
            ref="cmd-menu-search"
            type="search"
            name="search"
            class="cmd-menu-search"
            :placeholder="currentItem ? currentItem.placeholder : placeholder"
            autocomplete="off"
            autofocus
            @input="handleInput($event)"
            @keyup="handleArrowKeys($event)"
          />
        </div>
        <div v-if="!currentItem || results.length > 0" ref="cmd-menu-results" class="cmd-menu-results-wrapper" @keyup="handleArrowKeys($event)">
          <slot name="results" v-bind="{ data: items }">
            <div v-for="(section, name) in sections" :key="name" class="cmd-menu-results">
				<div v-if="name !== '_all'" class="section">{{ name }}</div>
				<a v-for="item in section" :key="item.id" href="#" @click.prevent="handleClick(item)" @mouseover="$event.target.focus()">
					<div v-if="item.icon" class="icon">
						<component v-if="typeof item.icon == 'object'" v-bind:is="item.icon"></component>
						<slot v-else name="icon" :icon="item.icon" :id="item.id">
							<component v-bind:is="item.icon"></component>
						</slot>
					</div>
					<p>{{ item.text }}</p>
					<div v-if="item.keybindings" class="keybindings">
					<span v-for="key in ['⌘', ...item.keybindings]" :key="key" class="keybinding">{{ key }}</span>
					</div>
				</a>
            </div>
          </slot>
        </div>
		<div class="cmd-menu-footer">
			<slot name="footer">
				<p><span class="keybinding" @click="closeOmnibar">ESC</span> to close</p>
			</slot>
		</div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Fuse from 'fuse.js'

import { Action } from './types'

interface Data {
  search: string
  results: Array<Action>
  keys: Record<string, boolean>
  open: boolean
  currentItem?: any
}

interface Methods {
  handleArrowKeys(e: KeyboardEvent): void
  handleKeyDown(e: KeyboardEvent): void
  handleKeyUp(e: KeyboardEvent): void
  openOmnibar(id?: string): void
  resetOmnibar(): void
  closeOmnibar(): void
  handleInput(e: KeyboardEvent): void
  openChild(item: Action): void
  handleOverlayClick(e: MouseEvent): void
  handleClick(item: Action): void
  executeAction(action: (value?: string | Action) => any, item?: string | Action): void
}

interface Computed {
	items: Array<Action>
	sections: Record<string, Array<Action>>
}

interface Props {
  name: string | boolean | null
  keybinding: Array<string> | null
  shadow: boolean
  overlay: boolean
  nestedSearch: boolean
  fuseOptions: Fuse.IFuseOptions<string>
  actions: Array<Action>
  placeholder: string
  theme: string
  blur: boolean
}

// selector list for elements that can be focused
const FOCUSABLE = 'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'

export default Vue.extend<Data, Methods, Computed, Props>({
	name: 'Omnibar',
	props: {
		// namespace the modal so it can be opened/closed with a named event
		name: {
			type: [ String, Boolean ],
			required: false,
			default: ''
		},
		// which key combo to use to open the modal
		keybinding: {
			type: [ Array ],
			required: false,
			default: () => [ 'meta', 'k' ] as Array<string>
		},
		// add a shadow
		shadow: {
			type: Boolean,
			required: false,
			default: true
		},
		// add an overlay
		overlay: {
			type: Boolean,
			required: false,
			default: true
		},
		// search nested actions
		nestedSearch: {
			type: Boolean,
			required: false,
			default: false
		},
		// additional fuseOptions to pass to Fuse
		fuseOptions: {
			type: Object,
			required: false,
			default: () => ({})
		},
		// the list to search in
		actions: {
			type: [ Object, Array ],
			required: true
		},
		// The search inputs placeholder
		placeholder: {
			type: String,
			required: false,
			default: 'Type a command or search'
		},
		theme: {
			type: String,
			required: false,
			default: 'light'
		},
		blur: {
			type: Boolean,
			required: false,
			default: true
		}
	},
	data() {
		return {
			search: '',
			results: [],
			keys: {},
			open: false,
			currentItem: undefined
		}
	},
	beforeMount() {
		window.addEventListener('keydown', this.handleKeyDown)
		window.addEventListener('keyup', this.handleKeyUp)
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.handleKeyDown)
		window.removeEventListener('keyup', this.handleKeyUp)
	},
	mounted() {
		// allow the modal to be opened/closed programmatically
		const evtOpen = this.name ? `openCommandMenu.${ this.name }` : 'openCommandMenu'
		this.$root.$on(evtOpen, this.openOmnibar)
		const evtClose = this.name ? `closeCommandMenu.${ this.name }` : 'closeCommandMenu'
		this.$root.$on(evtClose, this.closeOmnibar)
	},
	computed: {
		items() {
			if (this.search) {
				return this.results
			}

			return this.actions.filter((item) => item.hidden !== true)
		},
		sections() {
			const items = this.search || this.currentItem ? this.results : this.actions.filter((item) => item.hidden !== true)

			const data = items.reduce((pre, cur) => {
				if (!cur.section) cur.section = '_all'
				if (!(cur.section in pre)) pre[cur.section] = []

				pre[cur.section].push(cur)

				return pre
			}, {} as any)

			return data
		}
	},
	methods: {
		handleArrowKeys(e: KeyboardEvent) {
			const currentTarget = (this.$refs['cmd-menu-results'] as HTMLElement)

			if (!currentTarget) {
				return
			}

			// prevent scrolling with space and arrow keys when fired on the cmd-menu
			if ([ 'Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight' ].includes(e.code)) {
				e.preventDefault()
			}

			const key = e.key
			const target = e.target as HTMLElement

			const items = Array.from(currentTarget.querySelectorAll(FOCUSABLE)) as Array<HTMLElement>
			const currentIndex = items.indexOf(target)

			const firstElement = items[0]
			const lastElement = items[items.length - 1]

			if (currentIndex === -1) {
				if (e.key === 'ArrowDown' && firstElement) {
					firstElement.focus()
				}

				if (e.key === 'ArrowUp' && lastElement) {
					lastElement.focus()
				}

				return
			}

			const list = (this.$refs['cmd-menu-search'] as HTMLInputElement)

			if (key === 'ArrowDown') {
				if (currentIndex + 1 === items.length) {
					if (list === undefined) {
						firstElement.focus()
						return
					}
					return list.focus()
				}

				items[currentIndex + 1].focus()
			}

			if (key === 'ArrowUp') {
				if (currentIndex - 1 === -1) {
					if (list === undefined) {
						lastElement.focus()
						return
					}

					return list.focus()
				}

				items[currentIndex - 1].focus()
			}
		},
		handleKeyDown(e: KeyboardEvent) {
			const key = e.key.toLowerCase() as typeof e.key

			// Handle custom keybindings specified by the items
			if (this.keys.meta) {
				const item = this.actions.find((item) => item.keybindings && item.keybindings.includes(key))
				if (item) {
					e.preventDefault()

					// Execute action directly
					if (item.action !== undefined && item.childActions === undefined && item.childTitle === undefined) {
						this.executeAction(item.action)
						return
					}

					this.openOmnibar(item.id)
					return
				}
			}

			if (this.open) {
				// if escape is pressed and the modal is open, and you are not focused on the search input or the input is blank
				if (key === 'escape' && (document.activeElement !== this.$refs['cmd-menu-search'] || this.search === '')) {
					this.closeOmnibar()
				}

				// On backspace remove the current tag
				if (key === 'backspace' && this.currentItem && this.search.length === 0) {
					this.resetOmnibar();
					(this.$refs['cmd-menu-search'] as HTMLInputElement).focus()
					return
				}

				if (key === 'enter' && (document.activeElement === this.$refs['cmd-menu-search'])) {
					// Click on list item if it is the only one left
					if (this.results.length === 1) {
						const currentTarget = (this.$refs['cmd-menu-results'] as HTMLElement)
						const items = Array.from(currentTarget.querySelectorAll(FOCUSABLE)) as Array<HTMLElement>
						const item = items[0]
						item.click()
						return
					}

					// Execute the defined action for a specified item
					if (this.results.length === 0 && this.currentItem) {
						if (!this.currentItem.action) {
							return
						}

						this.executeAction(this.currentItem.action, this.search)
						return
					}
				}
			}

			if (!e.isComposing && !e.repeat && (this.keybinding !== null && this.keybinding.includes(key))) {
				this.keys[key] = true
			}

			const allKeys = this.keybinding !== null && Object.values(this.keys).filter(Boolean).length === this.keybinding.length
			if (allKeys && this.open === false) {
				e.preventDefault()
				this.openOmnibar()

				// Unset keys to prevent them from getting stuck
				this.keybinding?.forEach((key: string) => {
					this.keys[key] = false
				})
			}
		},
		handleKeyUp(e: KeyboardEvent) {
			const key = e.key.toLowerCase() as typeof e.key
			if (!e.isComposing && !e.repeat && (this.keybinding !== null && this.keybinding.includes(key))) {
				this.keys[key] = false
			}
		},
		openOmnibar(id) {
			this.open = true
			this.$emit('open')

			if (id) {
				const item = this.actions.find((item: any) => item.id === id)
				if (!item) return

				this.openChild(item)
			}

			// nextTick if after v-if transition is done
			this.$nextTick(() => {
				document.body.style.overflow = 'hidden';

				// Prefill the search input with an optional value
				if (this.currentItem && this.currentItem.value) {
					(this.$refs['cmd-menu-search'] as HTMLInputElement).value = this.currentItem.value
					this.search = this.currentItem.value
				}

				// timeout so that the keys being pressed are not captured in the focused input
				setTimeout(() => {
					if (this.$refs['cmd-menu-search']) {
						(this.$refs['cmd-menu-search'] as HTMLInputElement).focus()
					}
				})
			})
		},
		resetOmnibar() {
			if (this.$refs['cmd-menu-search']) {
				(this.$refs['cmd-menu-search'] as HTMLInputElement).value = ''
			}

			this.search = ''
			this.results = []
			this.currentItem = undefined
		},
		closeOmnibar() {
			this.resetOmnibar()
			this.$emit('close')
			this.open = false
			document.body.style.overflow = 'unset';
		},
		handleInput(e: KeyboardEvent) {
			this.search = (e.target as HTMLInputElement).value || ''

			if (this.currentItem && !this.currentItem.childActions) {
				return
			}

			const data = this.currentItem && this.currentItem.childActions ? this.currentItem.childActions : this.actions

			if (!this.search) {
				this.results = data
				return
			}

			const fuse = new Fuse(data, {
				minMatchCharLength: 1,
				ignoreLocation: true,
				keys: [
					'text',
					'keywords',
					'section',
					...(this.nestedSearch ? ['childActions.text', 'childActions.keywords'] : [])
				],
				threshold: 0.3,
				...this.fuseOptions
			})

			const indexes = fuse.search(this.search)

			this.results = indexes.length > 0 ?
				indexes.map(({ refIndex }) => {
					return data[refIndex]
				}) :
				[]
		},
		handleOverlayClick({ target }) {
			if ((target as HTMLElement).matches('.cmd-menu')) {
				this.closeOmnibar()
			}
		},
		openChild(item: Action) {
			this.currentItem = item

			if (item.childActions) {
				this.results = item.childActions
			}

			if (item.childTitle) {
				this.$nextTick(() => {
					const currentTarget = (this.$refs['cmd-menu-results'] as HTMLElement)
					const items = Array.from(currentTarget.querySelectorAll(FOCUSABLE)) as Array<HTMLElement>

					items[0].focus()
				})
			}
		},
		handleClick(item: Action) {
			this.$emit('click', item)

			if (item.childActions || item.childTitle) {
				(this.$refs['cmd-menu-search'] as HTMLInputElement).focus();
				(this.$refs['cmd-menu-search'] as HTMLInputElement).value = item.value || ''
				this.search = item.value || ''

				if (item.childActions) {
					this.openChild(item)
				} else {
					this.currentItem = item
					this.results = []
				}

				return
			}

			if (item.action) {
				this.executeAction(item.action, item)
			}
		},
		executeAction(action, item: string | Action | undefined) {
			const res = action(item)

			if (res !== undefined && typeof res === 'object' && res.id !== undefined) {
				this.resetOmnibar()
				this.currentItem = res

				if (res.value) {
					(this.$refs['cmd-menu-search'] as HTMLInputElement).value = res.value
					this.search = res.value;

					(this.$refs['cmd-menu-search'] as HTMLInputElement).focus()
				}

				return
			}

			const preventClose = item && typeof item !== 'string' ? item.preventClose || false : false

			if (this.open && !preventClose) {
				this.closeOmnibar()
			}
		}
	}
})
</script>

<style scoped>
.cmd-menu[data-theme=dark] {
    --background: rgb(43, 46, 59);
    --background-2nd: rgb(38, 39, 49);
    --background-light: rgb(34, 36, 43);
	--background-overlay: rgba(0, 0, 0, 0.5);

    --text: #BAC0DC;
    --text-light: #CFD2E3;
    --text-dark:#7B809F;

    --accent: #7387C9;
}

.cmd-menu[data-theme=dark][data-blur=true] {
	--background: rgb(43, 46, 59, 0.90);
    --background-2nd: rgb(34, 35, 45, 0.80);
    --background-light: rgba(32, 35, 46, 0.75);
}

.cmd-menu[data-theme=light] {
    --background: rgba(255, 255, 255);
    --background-2nd: rgb(236, 236, 236);
    --background-light: rgb(226, 226, 226);
	--background-overlay: rgba(163, 163, 163, 0.5);

    --text: #444;
    --text-light: #111;
    --text-dark:#666;

    --accent: #7387C9;
}

.cmd-menu[data-theme=light][data-blur=true] {
	--background: rgba(255, 255, 255, 0.75);
    --background-2nd: rgba(183, 183, 183, 0.40);
    --background-light: rgba(181, 181, 181, 0.40);
}

.cmd-menu {
    /* Values */
    --border-radius: 8px;
    --click-scale-factor: 0.95;
	 position: fixed;
	 top: 0;
	 left: 0;
	 right: 0;
	 bottom: 0;
	 z-index: 100;
	 width: 100%;
	 height: 100%;
	 padding: 1rem;
	 box-sizing: border-box;
	 overscroll-behavior: contain;
	 color: var(--text);
}
 .cmd-menu-fade-enter-active, .cmd-menu-fade-leave-active {
	 transition: opacity 200ms ease;
}
 .cmd-menu-fade-enter, .cmd-menu-fade-leave-to {
	 opacity: 0;
}
 .cmd-menu.cmd-menu-overlay {
	 background-color: var(--background-overlay);
}
 .cmd-menu.cmd-menu-shadow .cmd-menu-inside {
	 box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
.cmd-menu.cmd-menu-blur .cmd-menu-inside {
	 backdrop-filter: blur(15px) brightness(1.5);
}
 .cmd-menu-inside {
	 padding: 0;
	 background: var(--background);
	 max-width: 600px;
	 max-height: min(400px, calc(100vh - 20% - 2rem));
	 width: 95%;
	 top: 20%;
	 left: 50%;
	 transform: translateX(-50%);
	 position: absolute;
	 z-index: 2;
	 display: flex;
	 flex-direction: column;
	 border-radius: var(--border-radius);
}
.cmd-menu-header {
	border-bottom: 1px solid var(--background-2nd);
}
 .cmd-menu-search-wrapper {
	 display: flex;
	 align-items: center;
	 width: 100%;
}
 .cmd-menu-tag {
	 border-radius: var(--border-radius);
	 padding: 0.5rem 0.8rem;
	 background: var(--background-light);
	 margin-right: -0.5rem;
	 margin-left: 0.5rem;
	 font-weight: 500;
}
 .cmd-menu-tag p {
	 margin: 0;
	 font-size: 0.8rem;
}
 .cmd-menu-search {
	 flex-grow: 1;
	 appearance: none;
	 background: none;
	 border: 0;
	 outline: 0;
	 padding: 1rem 1rem;
	 color: var(--text);
	 font-family: inherit;
	 font-size: 1rem;
}
 .cmd-menu-results-wrapper {
	 border-top: 1px solid var(--background-2nd);
	 overflow-y: auto;
}
 .cmd-menu-results a {
	 display: flex;
	 align-items: center;
	 width: 100%;
	 padding: 0.6rem 1rem;
	 box-sizing: border-box;
	 color: var(--text-dark);
	 text-decoration: none;
	 border-left: 2px solid transparent;
}
 .cmd-menu-results a p {
	 margin: 0;
}
 .cmd-menu-results a .icon {
	 margin-right: 0.5rem;
	 display: flex;
}
 .cmd-menu-results a:focus {
	 outline: 0;
	 background: var(--background-2nd);
	 color: var(--text);
	 border-left: 2px solid var(--text);
}
 .cmd-menu-results .section {
	 font-size: 0.8rem;
	 padding: 0.2rem 1rem;
	 box-sizing: border-box;
	 color: var(--text-dark);
	 margin-top: 0.5rem;
 }
 .cmd-menu-footer {
	 border-top: 1px solid var(--background-2nd);
	 font-size: 0.8rem;
	 color: var(--text-dark);
}
 .cmd-menu-footer p {
	 margin: 0;
	 padding: 0.5rem 0.5rem;
}
 .cmd-menu .keybindings {
	 margin-left: auto;
	 display: flex;
	 align-items: center;
}
 .cmd-menu .keybinding {
	 background: var(--background-light);
	 border-radius: 5px;
	 padding: 0.2rem 0.5rem;
	 margin-left: 0.5rem;
	 font-family: monospace;
}
.cmd-menu input::-webkit-input-placeholder {
	 color: var(--text-dark);
}
.cmd-menu input::-moz-placeholder {
	 color: var(--text-dark);
}
.cmd-menu input::-ms-placeholder {
	 color: var(--text-dark);
}
.cmd-menu input::placeholder {
	 color: var(--text-dark);
}
.cmd-menu ::-webkit-search-cancel-button {
	 -webkit-appearance: none;
}
</style>