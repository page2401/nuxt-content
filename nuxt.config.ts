export default defineNuxtConfig({
  compatibilityDate: '2026-11-23',
  modules: ['@nuxt/content'],
  app: {
    baseURL: process.env.BASE_PATH || '/nuxt-content/',
    head: {
      htmlAttrs: {
        lang: 'zh-CN'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
      script: [
        {
          innerHTML: `(function(){try{var saved=localStorage.getItem('nuxt-content-theme');var parentDark=false;try{if(window.parent&&window.parent!==window){var pd=window.parent.document.documentElement;parentDark=pd.classList.contains('dark')||pd.getAttribute('data-theme')==='dark';}}catch(e){}var isDark=saved?saved==='dark':(parentDark||(window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches));document.documentElement.classList.toggle('dark',isDark);document.documentElement.setAttribute('data-theme',isDark?'dark':'light');}catch(e){}})();`
        }
      ]
    }
  },
  css: [
    'katex/dist/katex.min.css',
    '~/assets/main.css'
  ],
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3,
          searchDepth: 3
        },
        remarkPlugins: {
          'remark-math': {}
        },
        rehypePlugins: {
          'rehype-katex': {}
        },
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: [
            'markdown',
            'mdc',
            'yaml',
            'ts',
            'js',
            'vue',
            'bash',
            'json',
            'diff',
            'html',
            'css'
          ]
        }
      }
    }
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/01-annotations',
        '/02-diagrams',
        '/03-math',
        '/04-directory',
        '/04-directory/nested/01-order-and-url',
        '/04-directory/nested/02-sidebar-sync',
        '/05-code-blocks'
      ]
    }
  }
})
