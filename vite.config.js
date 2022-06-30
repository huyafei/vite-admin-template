import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import viteSvgIcons from 'vite-plugin-svg-icons'
//mock
import { viteMockServe } from 'vite-plugin-mock'

import vueJsx from '@vitejs/plugin-vue-jsx'
//setup name
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import AutoImport from 'unplugin-auto-import/vite'


import setting from './src/settings'

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log(command, mode)
  const config ={
    // 开发或生产环境服务的公共基础路径
    base: setting.viteBasePath,
    define: {
      //fix "path" module issue
      'process.platform': null,
      'process.version': null,

    },
    build: {
      // minify: 'terser',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      //remote console.log in prod
      terserOptions: {
        //detail to look https://terser.org/docs/api-reference#compress-options
        compress: {
          drop_console: false,
          pure_funcs: ['console.log', 'console.info'],
          drop_debugger: true
        }
      },
      //build assets Separate
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    clearScreen: false,
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      // 服务配置
      port: 9527, // 服务器端口;
      open: false, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
      cors: true // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      // https://vitejs.cn/config/#server-proxy
      // proxy: {
      //   '/api': {
      //     target: loadEnv(mode, process.cwd()).VITE_APP_PROXY_URL,
      //     changeOrigin: true,
      //     rewrite: (path) => path.replace(/^\/api/, '')
      //   }
      // }
    },
    resolve: {
      alias: {
        // 如果报错__dirname找不到，需要安装node,执行npm install @types/node --save-dev
        "@": resolve( "src"),
        "@api": resolve("src/api"),
        "@components": resolve( "src/components"),
        "@plugins": resolve( "src/plugins"),
        "@utils": resolve( "src/utils"),
        "@views": resolve("src/views"),
        "@router": resolve("src/router"),
        // remove i18n waring
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    css: {
      postcss:{
        plugins: [
          require('autoprefixer')
        ]
      },
      preprocessorOptions: {
        // 定义全局SCSS变量
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      // legacy({
      //   targets: ['ie >= 11'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // }),
      viteSvgIcons({
        // config svg dir that can config multi
        iconDirs: [
          path.resolve(process.cwd(), 'src/icons/common'),
          path.resolve(process.cwd(), 'src/icons/nav-bar')
        ],
        // appoint svg icon using mode
        symbolId: 'icon-[dir]-[name]'
      }),
      //https://github.com/anncwb/vite-plugin-mock/blob/HEAD/README.zh_CN.md
      viteMockServe({
        supportTs: false, //如果使用 js发开设置 false，TS为true 默认:true
        mockPath: 'mock', //设置模拟文件的文件夹 默认:mock
        localEnabled: command === 'serve', //设置是否启用本地 xxx.ts 文件，不要在生产环境中打开它.设置为 false 将禁用 mock 功能
        logger: true //是否在控制台显示请求日志
      }),
      VueSetupExtend(),
      //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
      AutoImport({
        // resolvers: [ElementPlusResolver()],
        imports: [
          'vue',
          'vuex',
          'vue-router',
          {
            '@/hooks/global/useCommon': ['useCommon'],
            '@/hooks/global/useElement': ['useElement'],
            '@/plugins/axios':  [
              // default imports
              ['default', 'axios'] // import { default as axios } from 'axios',
            ]
          }
        ],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: true //auto generation auto-imports.d.ts file
      })
      // Components({
      //   resolvers: [ElementPlusResolver()]
      // })
    ],
    // 引入第三方的配置
    optimizeDeps: {
      include: ['moment-mini']
    }
  }
  return config
})
