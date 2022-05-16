import { defineConfig, loadEnv } from "vite";
import Vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Inspect from "vite-plugin-inspect";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    base: env.VITE_BASE_URL,
    mode: env.VITE_MODE,
    publicDir: "public",
    cacheDir: ".vite",
    server: {
      host: env.VITE_HOST,
      port: env.VITE_PORT,
      strictPort: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "src/assets/scss/global.scss";',
        },
      },
    },
    plugins: [
      Vue({
        include: [/\.vue$/],
      }),
      Pages({
        dirs: "src/pages",
        resolver: "vue",
        extensions: ["vue"],
        moduleId: "~custom-route-pages",
      }),
      AutoImport({
        imports: [
          "vue",
          {
            "vue-router": ["createRouter", "createWebHistory"],
          },
        ],
      }),
      Components(),
      Inspect(),
    ],
  };
});
