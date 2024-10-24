/** @type {import('tailwindcss').Config} */
export const content = [
  "./src/**/*.{js,jsx,ts,tsx}",
];
export const theme = {
  extend: {
    colors: {
      body: "#F5FEE7",
      main: "#1B4D3E",
    },
    keyframes: {
      'border-spin': {
        '100%': {
          transform: 'rotate(-360deg)',
        },
      },
    },
    animation: {
      'border-spin': 'border-spin 7s linear infinite',
    },
  },
};
export const plugins = [];