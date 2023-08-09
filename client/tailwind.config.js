/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:'#047aed',
        secondary:"#1c3fa8",
        dark:"#002240",
        light:"#f4f4f4"

      },
      fontFamily :{
        body:['Lato']
      },
      gridTemplateColumns:{
        fluid: "repeat(auto-fit,minmax(15rem,ifr))",
      },
    },
  },
  plugins: [],
}

