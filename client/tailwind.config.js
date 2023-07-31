/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#F5385D'
      },
      gridTemplateColumns:{
        fluid: "repeat(auto-fit,minmax(15rem,ifr))",
      },
    },
  },
  plugins: [],
}

