/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'customShadow':'0px 0px 4px 4px #ae9bc8',
        'ceatShadow': '-1px 5px 15px 0 #4169e1',
        'ceatShadow2': '0 0.053333rem 0.533333rem 0.053333rem #dfdfdf',
        'ceatShadow3': '0 0 10px 0 rgb(0 0 0 / 20%)',
        'myShadow': '0 0 10px 0 rgb(0 0 0 / 20%)'
      },
      colors: {
        'regal-blue': '#243c5a',
        'red-800': '#b2e7e4',
        'recharge-bg':'#f2f2f2',
        'withdraw': '#f2f2f2',
        'selected':'#4169e1',
        'nselected':'#dbdbdb',
        'pre_sale':"#efefef",
        'bank_color':'#3e5a93',
        'confirm': '#63d0d7'
      },
      animation: {
        marquee: 'marquee 8s linear infinite',
        marquee2: 'marquee2 8s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0%)' },
        },
      },
    },
  },
  plugins: [],
}