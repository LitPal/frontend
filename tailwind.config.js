/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        160: "46rem", // Add your desired larger values
        170: "52rem", // Add your desired larger values
      },
    },
  },
  plugins: [],
};
