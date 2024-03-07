// jest.config.js

const { NODE_ENV } = process.env;
// const path = require("path");

module.exports = {
  rootDir: process.cwd(),
  moduleFileExtensions: ["js", "jsx", "json", "vue"],
  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  // testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  testEnvironment: "jsdom",
  // setupFiles: [
  //   NODE_ENV === "test" && "esm", // Enable esm only during tests
  //   "<rootDir>/src/setupTests.js",
  // ].filter(Boolean),
};
