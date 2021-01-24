const colors = require("tailwindcss/colors");

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width:{
        '2/7':"31%"
      },
      colors:{
        ...colors
      },
      gradientColorStops: () => ({
        ...colors
      }),
    },
  },
  variants: {
    extend: {
    },
  },
  plugins: [],
};
