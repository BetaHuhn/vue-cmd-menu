<template>
  <transition name="omnibar-fade">
    <div
      v-if="open"
      :ref="name"
      class="omnibar"
      :data-name="name"
      :class="{ 'omnibar-shadow': shadow, 'omnibar-overlay': overlay }"
      @click="handleOverlayClick($event)"
    >
      <div class="omnibar-inside">
		<slot name="header"></slot>
        <div class="omnibar-head">
          <div v-if="currentItem && currentItem.tag" class="omnibar-tag">
            <p>{{ currentItem.tag }}</p>
          </div>
          <span v-if="currentItem && currentItem.childTitle" class="omnibar-search">{{ currentItem.childTitle }}</span>
          <input
            v-else
            id="omnibar-search"
            ref="omnibar-search"
            type="search"
            name="search"
            class="omnibar-search"
            :placeholder="currentItem ? currentItem.placeholder : placeholder"
            autocomplete="off"
            autofocus
            @input="handleInput($event)"
            @keyup="handleArrowKeys($event)"
          />
        </div>
        <div v-if="!currentItem || results.length > 0" ref="omnibar-search-list" class="omnibar-search-list-wrapper" @keyup="handleArrowKeys($event)">
          <slot name="results" v-bind="{ data: results.length > 0 ? results : actions }">
            <div v-for="item in (results.length > 0 ? results : actions)" :key="item.id" class="omnibar-search-list">
              <a href="#" @click.prevent="handleClick(item)">
				<div v-if="item.icon" class="icon">
					<component v-if="typeof item.icon === 'function'" v-bind:is="item.icon"></component>
					<slot v-else name="icon" :icon="item.icon">
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
        <slot name="footer">
			<div class="omnibar-footer">
				<p><span class="keybinding" @click="closeOmnibar">ESC</span> to close</p>
			</div>
		</slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import Fuse from 'fuse.js'

type ItemData = any | Record<string, any>

interface Data {
  search: string
  results: Array<ItemData>
  keys: Record<string, boolean>
  open: boolean
  currentItem?: any
}

interface Methods {
  handleArrowKeys(e: KeyboardEvent): void
  handleKeyDown(e: KeyboardEvent): void
  handleKeyUp(e: KeyboardEvent): void
  openOmnibar(id?: string): void
  closeOmnibar(): void
  handleInput(e: KeyboardEvent): void
  openChild(item: ItemData): void
  handleOverlayClick(e: MouseEvent): void
  handleClick(item: ItemData): void
}

interface Computed {}

interface Props {
  name: string | boolean | null
  keybinding: Array<string> | null
  shadow: boolean
  overlay: boolean
  options: Fuse.IFuseOptions<string>
  actions: Array<ItemData>
  placeholder: string
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
		// additional options to pass to Fuse
		options: {
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
	methods: {
		handleArrowKeys(e: KeyboardEvent) {
			const currentTarget = (this.$refs['omnibar-search-list'] as HTMLElement)

			if (!currentTarget) {
				return
			}

			// prevent scrolling with space and arrow keys when fired on the omnibar
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

			const list = (this.$refs['omnibar-search'] as HTMLInputElement)

			console.log(list)

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
					if (item.tag === undefined && item.action !== undefined) {
						item.action()
						return
					}

					this.openOmnibar(item.id)
					return
				}
			}

			if (this.open) {
				// if escape is pressed and the modal is open, and you are not focused on the search input or the input is blank
				if (key === 'escape' && (document.activeElement !== this.$refs['omnibar-search'] || this.search === '')) {
					this.closeOmnibar()
				}

				// On backspace remove the current tag
				if (key === 'backspace' && this.currentItem && this.search.length === 0) {
					this.currentItem = undefined
					this.search = ''
					this.results = [];
					(this.$refs['omnibar-search'] as HTMLInputElement).focus()
					return
				}

				if (key === 'enter' && (document.activeElement === this.$refs['omnibar-search'])) {
					// Click on list item if it is the only one left
					if (this.results.length === 1) {
						const currentTarget = (this.$refs['omnibar-search-list'] as HTMLElement)
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

						this.currentItem.action(this.search)
						this.closeOmnibar()
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

			if (id) {
				const item = this.actions.find((item: any) => item.id === id)

				this.openChild(item)
			}

			// nextTick if after v-if transition is done
			this.$nextTick(() => {
				document.body.classList.add('omnibar-block-scrolling')

				// Prefill the search input with an optional value
				if (this.currentItem && this.currentItem.value) {
					(this.$refs['omnibar-search'] as HTMLInputElement).value = this.currentItem.value
					this.search = this.currentItem.value
				}

				// timeout so that the keys being pressed are not captured in the focused input
				setTimeout(() => {
					(this.$refs['omnibar-search'] as HTMLInputElement).focus()
				})
			})
		},
		closeOmnibar() {
			this.open = false
			this.search = ''
			this.results = []
			this.currentItem = undefined
			document.body.classList.remove('omnibar-block-scrolling')
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
					'text'
				],
				...this.options
			})

			const indexes = fuse.search(this.search)

			this.results = indexes.length > 0 ?
				indexes.map(({ refIndex }) => {
					return data[refIndex]
				}) :
				[]
		},
		handleOverlayClick({ target }) {
			if ((target as HTMLElement).matches('.omnibar')) {
				this.closeOmnibar()
			}
		},
		openChild(item: ItemData) {
			this.currentItem = item

			if (item.childActions) {
				this.results = item.childActions
			}

			if (item.childTitle) {
				this.$nextTick(() => {
					const currentTarget = (this.$refs['omnibar-search-list'] as HTMLElement)
					const items = Array.from(currentTarget.querySelectorAll(FOCUSABLE)) as Array<HTMLElement>

					items[0].focus()
				})
			}
		},
		handleClick(item: ItemData) {
			this.$emit('click', item)

			if (item.tag || item.childTitle) {
				(this.$refs['omnibar-search'] as HTMLInputElement).focus();
				(this.$refs['omnibar-search'] as HTMLInputElement).value = item.value || ''
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
				item.action(item)
				this.closeOmnibar()
			}
		}
	}
})
</script>

<style scoped>
body.omnibar-block-scrolling {
	 overflow: hidden;
}
 .omnibar {
	 /* Colors */
    --background: #2B2E3B;
    --background-2nd: #22232D;
    --background-light: #383b4b;

    --text: #BAC0DC;
    --text-light: #CFD2E3;
    --text-dark:#7B809F;

    --accent: #7387C9;

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
 .omnibar-fade-enter-active, .omnibar-fade-leave-active {
	 transition: opacity 200ms ease;
}
 .omnibar-fade-enter, .omnibar-fade-leave-to {
	 opacity: 0;
}
 .omnibar.omnibar-overlay {
	 background-color: rgba(0, 0, 0, 0.5);
}
 .omnibar.omnibar-shadow .omnibar-inside {
	 box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
 .omnibar-inside {
	 padding: 0;
	 background: var(--background);
	 max-width: 35rem;
	 width: 95%;
	 top: 20%;
	 left: 50%;
	 transform: translateX(-50%);
	 position: absolute;
	 z-index: 2;
	 border-radius: var(--border-radius);
}
 .omnibar-head {
	 display: flex;
	 align-items: center;
	 width: 100%;
}
 .omnibar-tag {
	 border-radius: var(--border-radius);
	 padding: 0.5rem 0.8rem;
	 background: var(--background-2nd);
	 margin-right: -0.5rem;
	 margin-left: 0.5rem;
}
 .omnibar-tag p {
	 margin: 0;
	 font-size: 0.8rem;
}
 .omnibar-search {
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
 .omnibar-search-list-wrapper {
	 border-top: 1px solid var(--background-2nd);
}
 .omnibar-search-list a {
	 display: flex;
	 align-items: center;
	 width: 100%;
	 padding: 0.5rem 1rem;
	 box-sizing: border-box;
	 color: var(--text-dark);
	 text-decoration: none;
}
 .omnibar-search-list a p {
	 margin: 0;
}
 .omnibar-search-list a .icon {
	 margin-right: 0.8rem;
}
 .omnibar-search-list a:focus {
	 outline: 0;
	 background: var(--background-2nd);
	 color: var(--text);
}
 .omnibar-footer {
	 border-top: 1px solid var(--background-2nd);
	 font-size: 0.8rem;
	 color: var(--text-dark);
}
 .omnibar-footer p {
	 margin: 0;
	 padding: 0.5rem 0.5rem;
}
 .keybindings {
	 margin-left: auto;
	 display: flex;
	 align-items: center;
}
 .keybinding {
	 background: var(--background-light);
	 border-radius: 5px;
	 padding: 0.2rem 0.5rem;
	 margin-left: 0.5rem;
	 font-family: monospace;
}
 input::-webkit-input-placeholder {
	 color: var(--text-dark);
}
 input::-moz-placeholder {
	 color: var(--text-dark);
}
 input::-ms-placeholder {
	 color: var(--text-dark);
}
 input::placeholder {
	 color: var(--text-dark);
}
 ::-webkit-search-cancel-button {
	 -webkit-appearance: none;
}
</style>