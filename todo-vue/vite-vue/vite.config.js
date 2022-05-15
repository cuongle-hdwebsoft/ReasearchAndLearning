import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    Vue(
      {
        include: [/\.vue$/]
      }
    ),
    Pages(
      {
        dirs: 'src/pages',
        extensions: ['vue'],
        moduleId: '~custom-route-pages'
      }
    ),
    AutoImport(
      {
        imports: ['vue',
          {
            'vue-router': [
              'createRouter',
              'createWebHistory'
            ]
          }
        ]
      }
    )
  ]
})