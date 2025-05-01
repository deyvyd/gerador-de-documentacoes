/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./static/**/*.{js,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cores personalizadas extraídas do seu tailwind.css
        primary: {
          DEFAULT: "#2563eb", // blue-600
          hover: "#1d4ed8", // blue-700
          focus: "#3b82f6", // blue-500
        },
        secondary: {
          DEFAULT: "#6b7280", // gray-500
          hover: "#4b5563", // gray-600
          dark: "#374151", // gray-700
        },
        success: {
          DEFAULT: "#059669", // green-600
          hover: "#047857", // green-700
          light: "#d1fae5", // green-100
        },
        danger: {
          DEFAULT: "#dc2626", // red-600
          hover: "#b91c1c", // red-700
          light: "#fee2e2", // red-100
        },
        warning: {
          DEFAULT: "#ca8a04", // yellow-600
          hover: "#a16207", // yellow-700
          light: "#fef9c3", // yellow-100
        },
        info: {
          DEFAULT: "#2563eb", // blue-600
          hover: "#1d4ed8", // blue-700
          light: "#dbeafe", // blue-100
        },
        dark: {
          "bg-primary": "var(--dark-bg-primary)",
          "bg-secondary": "var(--dark-bg-secondary)",
          "text-primary": "var(--dark-text-primary)",
          "text-secondary": "var(--dark-text-secondary)",
        },
      },
    },
  },
  plugins: [],
};
