/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#F97316', // Orange color from the design
                secondary: '#FFF7ED', // Light background color
            }
        },
    },
    plugins: [],
}
