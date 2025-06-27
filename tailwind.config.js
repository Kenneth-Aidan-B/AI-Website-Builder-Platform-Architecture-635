/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
      }
    },
  },
  plugins: [],
  safelist: [
    'text-blue-600',
    'text-purple-600',
    'text-green-600',
    'text-orange-600',
    'border-blue-500',
    'border-purple-500',
    'border-green-500',
    'border-orange-500',
    'bg-blue-50',
    'bg-purple-50',
    'bg-green-50',
    'bg-orange-50',
  ]
}