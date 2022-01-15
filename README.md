<div align="center">
  
# Vue Command Menu

Build beautiful and extensible <kbd>Command</kbd> + <kbd>k</kbd> menus with Vue

![preview](https://minima-app.fra1.cdn.digitaloceanspaces.com/assets/commandMenu.png)

<br/>

</div>

## Features

- 💅 **Beautiful** by default, easy to style to your liking
- 🔎 **Built-in filtering** with [Fuse.js](https://fusejs.io/)
- ⌨️ **Keyboard shortcuts** for registering keystrokes to specific actions
- 🧭 **Easy navigation** with your keyboard or mouse
- 📁 **Nested actions** for folder like navigation experience
- 🔩 **Simple data structure** to define and customise actions

## 👋 Introduction

vue-command-menu lets you built a beatiful, fast and extensible command menu like the ones you may know from Vercel, GitHub and Linear or MacOS's Spotlight/Raycast. It can be invoked anywhere in your app via <kbd>Command</kbd> + <kbd>k</kbd> to perform actions users would typically be able to do via an interface.

They sound easy to build, but handling the different interactions, nagivation and state management can quickly become complicated. vue-command-menu provides a simple abstraction over this, simply pass it the actions you want your users to be able to perform and it will handle the rest.

## 🚀 Get started

Install it via NPM:

```bash
npm install vue-command-menu
```

> It currently only supports Vue 2

### Global Usage

```js
import Vue from 'vue';
import CommandMenu from 'vue-command-menu';

Vue.component('CommandMenu', CommandMenu);
```

### In Single File Components

```js
import CommandMenu from 'vue-command-menu';

export default {
  // ...
  components: {
    CommandMenu,
  },
  // ...
};
```

## 📚 Usage

```html
<template>
  <div id="app">
    <CommandMenu :actions="commandItems"></CommandMenu>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import CommandMenu from 'vue-command-menu';

export default Vue.extend({
  name: 'CommandMenuExample',
  components: {
    CommandMenu
  },
  computed: {
    actions() {
      return [
        {
          id: 'new',
          text: 'Create New Page',
          tag: 'New',
          placeholder: 'Page title',
          action: (value) => {
            // Handle the action, value contains the entered title
            console.log(value)
          }
        },
        {
          id: 'docs',
          text: 'Documentation',
          keybindings: [ '?' ],
          placeholder: 'Search Docs',
          childActions: [
            {
              id: 'overview',
              text: 'Overview',
              action: () => {}
            },
            {
              id: 'get-started',
              text: 'Get Started',
              action: () => {}
            }
          ]
        }
      ]
    }
  }
})
</script>
```

### Available Props

- *name*: `string | boolean | null` - namespace the modal and the open event (default: `''`)
- *actions*: `Array<any | Record<string, any>>` - the available actions to filter and execute (`required`)
- *keybinding*: `Array<string> | null` - combination of keys that need to be pressed (default: `['meta', 'k']`)
- *shadow*: `boolean` - add a shadow to the view box (default: `true`)
- *overlay*: `boolean` - show an overlay under the view box (default: `true`)
- *nestedSearch*: `boolean` - search/filter nested actions
- *fuseOptions*: `Fuse.IFuseOptions<string>` - options to pass to Fuse.js ([see options page](https://fusejs.io/api/options.html)) (default: `{}`)

### Actions

There are different type of actions you can define. They all require at least a `id`, `text` and if it doesn't have any child actions, a `action` handler:

```js
const action ={
  id: 'ID',
  text: 'Title',
  action: () => {}
}
```

Here are all the options available to an action:

| name         | description                                                                         | type                                          | required |
|--------------|-------------------------------------------------------------------------------------|-----------------------------------------------|----------|
| id           | Internal ID of the action                                                           | string                                        | true     |
| text        | Text which will be shown for each action in the list                                               | string                                        | true     |
| action       | Hanlder which will be called when the action is selected                            | function                                      | true     |
| icon         | Icon to show before the text in the UI                                             | Vue Component/string (only when slot is used) | false    |
| keybindings  | Keystrokes to attach to the action                                                  | string[]                                      | false    |
| tag          | Tag to show before the input field after the action is selected                     | string                                        | false    |
| placeholder  | Placeholder to show when waiting for user input after the parent action is selected | string                                        | false    |
| childActions | Array of child actions to show once the action is selected                          | Actions[]                                     | false    |


### Icons

The `icon` property either excepts a Vue component or a string which will be passed to the `icon` slot:

```html
<template v-slot:icon="{ icon }">
  <Icon :name="icon" />
</template>
```

You can use the provided value with different icon libraries or with your custom one.

### Inputs

If your action needs an input, specify a `tag` which will be shown before the input. When the user hits enter your action handler will be executed with the value as its parameter.

### Nested actions

Each of your actions can also have nested/child actions which will be shown once the parent action is selected. Specify them with the `childActions` parameter:

```js
 [{
    id: 'docs',
    text: 'Documentation',
    tag: 'Docs',
    placeholder: 'Search Docs',
    childActions: [
      {
        id: 'overview',
        text: 'Overview',
        action: () => {}
      },
      {
        id: 'get-started',
        text: 'Get Started',
        action: () => {}
      },
    ]
  }]
```

You can also define a `placeholder` which will be shown in the input field before any child action is selected and a `tag` which will be shown before the input to indicate what type of actions are being shown (kind of like a breadcrumb).

### Keybindings

Each of your actions can either be triggered by selecting it in the menu, or directly with a keyboard shortcut. You can define the keys to attach to a action with the `keybindings` parameter:

```js
[{
  id: 'help',
  keybindings: [ '?' ],
  text: 'Help',
  action: () => {}
}]
```

The shortcut by default listens to the meta key (CMD on Mac, Win on Windows) and then the defined keybinding.

### Opening Programmatically

```html
<!-- the `openCommandMenu` event can be called anyway and will trigger the modal to open -->
<button type="button" @click.prevent="$root.$emit('openCommandMenu')">Show Omnibar</button>
<!-- if there is a `name`, the event will have the name appended: `'openCommandMenu.myName'` -->
<button type="button" @click.prevent="$root.$emit('openCommandMenu.myName')">Show "myName" modal</button>
<!-- you can also close the modal with the opposite event: `'closeCommandMenu.myName'` -->
<button type="button" @click.prevent="$root.$emit('closeCommandMenu.myName')">Close "myName" modal</button>
```

### Filtering

vue-command-menu uses [Fuse.js](https://fusejs.io/) under the hood to filter the specified actions. This allows for fuzzy searching i.e. the search term doesn't have to be a exact match. By default it searches the action's title and keys defined with the `keywords` property. 

If you want to search nested actions as well, enable it with the `nestedSearch` prop.

You can further [fine-tune](https://fusejs.io/api/options.html#options) fuse.js with the `fuseOptions` prop.

## 📖 Examples

Here are some examples for different type of actions:

```js
[
  {
    id: 'home',
    keybindings: [ 'backspace' ],
    text: 'Go home',
    action: () => {
      window.location.pathname = '/'
    }
  },
  {
    id: 'copy',
    keybindings: [ 'c' ],
    text: 'Copy',
    action: () => {}
  },
  {
    id: 'help',
    keybindings: [ '?' ],
    icon: HelpIcon,
    text: 'Help',
    action: () => {
      window.location.pathname = '/'
    }
  },
  {
    id: 'new',
    text: 'Create New Page',
    tag: 'New',
    placeholder: 'Page title',
    action: (value) => {
      window.location.pathname = '/'
    }
  },
  {
    id: 'docs',
    icon: DocsIcon,
    text: 'Documentation',
    placeholder: 'Search Docs',
    childActions: [
      {
        id: 'overview',
        text: 'Overview',
        action: () => {}
      },
      {
        id: 'get-started',
        text: 'Get Started',
        action: () => {}
      },
    ]
  },
```

## 💻  Development

Issues and PRs are very welcome!

The actual source code of this library is in the `src` folder.

``` bash
# install dependencies
yarn install

# serve app with hot reload
yarn run serve

# build electron application for production
yarn run build

# lint all JS/Vue component files in `src/`
yarn run lint
```

## 📋 To Do

- [ ] Standardize parameter of Action handler
- [ ] Don't hard code meta key for keybindings
- [ ] Add options to change styling
- [x] Sections
- [x] Light mode
- [ ] Animations
- [ ] Hook to add actions dynamicly
- [ ] Improve naming of properties and options
- [ ] Keep focus on input when navigating through list
- [x] Limit modal height and add scrollbar
- [ ] Async actions and loading states
- [ ] Use slot to customize the rendering of the results
- [ ] Vue 3 support

## ❔ About

This project was developed by me ([@betahuhn](https://github.com/BetaHuhn)) in my free time. If you want to support me:

[![Donate via PayPal](https://img.shields.io/badge/paypal-donate-009cde.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=394RTSBEEEFEE)

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/F1F81S2RK)

### Credits

This Action was inspired by:

- [vue-omnibar](https://github.com/james2doyle/vue-omnibar)
- [kbar](https://github.com/timc1/kbar)

## 📄 License

Copyright 2022 Maximilian Schiller

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
