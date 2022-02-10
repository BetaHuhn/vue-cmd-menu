/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const path = require('path')
const defaultTheme = require('tailwindcss/defaultTheme')
const { getColors } = require('theme-colors')

module.exports = ({ nuxt }) => ({
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
        mono: ['DM Mono', ...defaultTheme.fontFamily.mono]
      },
      colors: {
        primary: getColors(nuxt.options.docs.primaryColor),
        aletsch: {
          DEFAULT: '#1B202F',
          '50': '#7C8AB4',
          '100': '#6C7BAA',
          '200': '#536290',
          '300': '#404C70',
          '400': '#2E364F',
          '500': '#1B202F',
          '600': '#141722',
          '700': '#0C0E15',
          '800': '#050608',
          '900': '#000000'
        },
      },
      maxHeight: {
        '(screen-16)': 'calc(100vh - 4rem)'
      },
      inset: {
        16: '4rem'
      },
      transitionProperty: {
        padding: 'padding'
      }
    },
    typography: theme => ({
      default: {
        css: {
          a: {
            color: theme('colors.primary.500')
          },
          h2: {
            paddingBottom: theme('padding.2'),
            borderBottomWidth: '1px',
            borderBottomColor: theme('colors.gray.200')
          },
          h3: {
            paddingBottom: theme('padding.2'),
            borderBottomWidth: '1px',
            borderBottomColor: theme('colors.gray.200')
          },
          blockquote: {
            fontWeight: '400',
            color: theme('colors.gray.600'),
            fontStyle: 'normal',
            quotes: '"\\201C""\\201D""\\2018""\\2019"'
          },
          'blockquote p:first-of-type::before': {
            content: ''
          },
          'blockquote p:last-of-type::after': {
            content: ''
          },
          code: {
            fontWeight: '400',
            backgroundColor: theme('colors.gray.100'),
            padding: theme('padding.1'),
            borderWidth: 1,
            borderColor: theme('colors.gray.200'),
            borderRadius: theme('borderRadius.default')
          },
          'code::before': {
            content: ''
          },
          'code::after': {
            content: ''
          },
          'h3 code': {
            fontWeight: '600'
          },
          'pre code': {
            fontFamily: 'DM Mono'
          },
          'a code': {
            color: theme('colors.primary.500')
          }
        }
      }
    })
  },
  variants: {
    margin: ['responsive', 'last'],
    padding: ['responsive', 'hover'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    textColor: ['responsive', 'hover', 'focus'],
    borderColor: ['responsive', 'hover', 'focus'],
    borderWidth: ['responsive', 'first', 'last'],
    typography: ['responsive']
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwind-css-variables')(
      {
        colors: 'color',
        screens: false,
        fontFamily: false,
        fontSize: false,
        fontWeight: false,
        lineHeight: false,
        letterSpacing: false,
        backgroundSize: false,
        borderWidth: false,
        borderRadius: false,
        width: false,
        height: false,
        minWidth: false,
        minHeight: false,
        maxWidth: false,
        maxHeight: false,
        padding: false,
        margin: false,
        boxShadow: false,
        zIndex: false,
        opacity: false
      }
    )
  ],
  purge: {
    // Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'content/**/*.md',
      path.join(nuxt.options.rootDir, 'components/**/*.vue'),
      path.join(__dirname, 'components/**/*.vue'),
      path.join(__dirname, 'layouts/**/*.vue'),
      path.join(__dirname, 'pages/**/*.vue'),
      path.join(__dirname, 'plugins/**/*.js'),
      'nuxt.config.js'
    ]
  }
})
