const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "gray-1": "#91A0CED8",
        "gray-2": "#6E97F5",
        "gray-3": " #FFFFFFE8",
        "gray-4":"#BFC6DE91",
        "gray-5":"#BFC6DECB",
        "gray-6":"#E4E4FA91",
        "gray-7":"#E4E4FA",
        "gray-8":"#051955",
        "gray-9":" #FFFFFFB9",
        "green-1": "  #1AC9A0",

      }, 
      backgroundColor: (theme) => ({
        ...theme("colors"),
        "gray-1": "#8CA4ED",
        "gray-2": " #080F24", 
        "gray-3":"#6E97F5",
        "gray-4":"#04091C",
        "gray-5":" #020717",
        "red":"#F57D50",

        "yellow-1":"#F7931A"
        
      }),
      backgroundImage: {
        "raven-primary-green": "#0B8376",
        "raven-orange": "#EA872D",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
