/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  /*
   * Trying to config vite to use alias -@-
   * This is a possible solution
   * The only thing that works is the file in the root jsconfig.js with the compiler options
   * Eslint config file add this :
   * "settings": {
   *   "import/resolver": {
   *     "alias": {
   *       "map": [["@", "./src"]]
   *     }
   *},
   */

  // resolve: {
  //   alias: [
  //     {
  //       find: "@/*",
  //       replacement: resolve(__dirname, "src"),
  //     },
  //   ],
  // },
  server: {
    port: 3000,
  },
});
