module.exports = {
  purge: {
    content: [
    './public/**/*.html',
    './src/**/*.vue',
    ],
    options: {
      whitelistPatterns: [ /-(leave|enter|appear)(|-(to|from|active))$/, /^(?!(|.*?:)cursor-move).+-move$/,/^router-link(|-exact)-active$/,/entranceFromTop$/, /entranceFromRight$/, /entranceFromBottom$/, /entranceFromLeft$/],
    },
    keyframes: true 
  },
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
