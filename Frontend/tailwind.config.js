/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all your React component files
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-inner': 'inset 10px 2px 7px rgba(0, 0, 0, 0.2)', // Custom shadow
      },
    },
  },
  plugins: [],
};

