/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'hidden', 'block', 'flex', 'inline', 'grid',
    'md:block', 'md:flex', 'md:hidden', 'md:inline', 'md:grid',
    'lg:block', 'lg:flex', 'lg:hidden', 'lg:inline', 'lg:grid',
    'xl:block', 'xl:flex', 'xl:hidden', 'xl:inline', 'xl:grid',
    '2xl:block', '2xl:flex', '2xl:hidden', '2xl:inline', '2xl:grid'
  ]
};
