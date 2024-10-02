// import { defineConfig } from 'vite';
// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);
// // const sass = require('sass');

// export default defineConfig({
//   css: {
//     preprocessorOptions: {
//       scss: {
//         // additionalData: `@import 'path/to/your/styles.scss';`, // optional, if you have global styles
//         renderSync: {
//           silenceDeprecations: ['legacy-js-api'],
//         },
//       },
//     },
//   },
// });





import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
});
