module.exports = {
  purge: {
    content: [
    './src/**/*.html',
    './src/**/*.vue',
    ],
    options: {
      whitelistPatterns: [/entranceFromTop$/, /entranceFromRight$/, /entranceFromBottom$/, /entranceFromLeft$/],
    },
    keyframes: true 
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
