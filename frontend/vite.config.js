// import fs from "fs";
import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// const folders = fs.readdirSync("./src", { withFileTypes: true });
// const fileNames = folders
//   .filter((dirent) => dirent.isDirectory())
//   .map((dirent) => dirent.name);
// console.log("🚀 - fileNames:", fileNames);

// const filePaths = fileNames.reduce(
//   (acc, cur) => ({
//     ...acc,
//     [cur]: `/${cur === "src" ? cur : `src/${cur}`}`,
//   }),
//   ""
// );
// console.log("🚀 - filePaths:", filePaths);

// console.log(`filePaths: ${JSON.stringify(filePaths, null, 2)}`);


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  server: {
    port: 3000,
  },
});
