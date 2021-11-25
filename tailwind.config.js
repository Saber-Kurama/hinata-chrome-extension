module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{svelte,html}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require('daisyui')
  ],
};
