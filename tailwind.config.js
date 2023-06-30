/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      header: 'Poppins',
      base: 'Fira Sans',
    },
    extend: {
      padding: {
        mobile: '5%',
        desktop: '15%',
      },
      colors: {
        primary: '#FF8000',
        secondary: '#B66CF1',
        tertiary: '#6CD1F1',
        'tertiary-disabled': '#9EC2CD',
        'primary-bg': '#34312E',
        'secondary-bg': '#403C38',
        'primary-text': '#f3f3f3',
        error: '#ed4a4a',
        success: '#49eb56',
      },
    },
  },
  plugins: [],
};
