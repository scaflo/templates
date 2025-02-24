/**
 * @typedef {Object} ScafloConfig
 * @property {number} port - The development server port.
 * @property {string} entry - The entry file for the application.
 * @property {string} outDir - The output directory for the build.
 */

/** @type {ScafloConfig} */
const config = {
    port: 4000,
    entry: "src/main.jsx",
    outDir: "dist",
  };
  
  export default config;
  