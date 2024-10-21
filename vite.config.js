// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'rollup-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'timely-x',
      // the proper extensions will be added
      fileName: 'timely-x',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
         
        },
        plugins: [
            
        ],
      },
    },
    
  },
})