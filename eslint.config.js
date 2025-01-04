// eslint.config.js
import { defineConfig } from 'eslint-define-config';
import prettier from 'eslint-plugin-prettier';

export default defineConfig([
  {
    // Defining language options
    languageOptions: {
      ecmaVersion: 'latest',    // Set ECMAScript version to the latest
      sourceType: 'module',     // Enable ES module syntax
      globals: {
        browser: true,          // Allow the `browser` global variable
        node: true,             // Allow the `node` global variable
        structuredClone: 'readonly', // Define structuredClone as a global
      },
    },

    // Defining plugins as an object
    plugins: {
      prettier,  // Include Prettier plugin for formatting checks
    },

    // Defining rules
    // rules: {
    //   'no-console': 'warn',               // Warn for `console.log` statements
    //   'prettier/prettier': 'error',       // Enforce Prettier formatting as an error
    // },
  },
  {
    files: ['*.js'],
    processor: 'prettier/prettier',  // Apply Prettier formatting rules
  },
]);
