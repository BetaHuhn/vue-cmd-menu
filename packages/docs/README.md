# Aletsch

This project is based on the [Nuxt Content Docs Theme](https://content.nuxtjs.org/themes/docs) and uses [Nuxt Content](https://content.nuxtjs.org/) under the hood to power the docs page. It was modified to support normal Nuxt pages as well as offer more customization options.

For a live demo visit [aletsch.app](https://aletsch.app).

## Usage

Write your docs pages in Markdown files located in the `/content` directory. 

Add normal Nuxt pages to the `/pages` directory. The `index.vue` page will be the landing page and the `/docs/_.vue` is used to render the docs pages.

Add as many Vue components as you want in the `/components` directory and Nuxt will discover them automatically for you to use across pages, including docs.

## Setup

Install dependencies:

```bash
npm run install
```

## Development

```bash
npm run dev
```

## Static Generation

This will create the `dist/` directory for publishing to static hosting:

```bash
npm run generate
```

To preview the static generated app, run `npm run start`

For detailed explanation on how things work, checkout [nuxt/content](https://content.nuxtjs.org) and [@nuxt/content theme docs](https://content.nuxtjs.org/themes-docs).
