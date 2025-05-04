/** @type {import('tailwindcss').Config} */
const componentsPlugin = require("./src/tailwind-plugins/components");
module.exports = {
  content: [
    "./templates/**/*.html",
    "./static/**/*.{js,vue}",
    "./src/**/*.{vue,js,ts,css}", // Adicione esta linha
    "./src/components.css", // Adicione esta linha explicitamente
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Cores base
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // Azul principal usado nos botões
          700: "#1d4ed8",
          750: "#1e3a87",
          800: "#1f2937",
          900: "#0e1621",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
        dark: {
          100: "#374151", // gray-700
          200: "#1f2937", // gray-800
          300: "#171923",
          400: "#151c25", // app-bg-option-select
          500: "#0e1621", // dark-bg-primary
          600: "#090c14",
          700: "#060911",
          800: "#1f2937", // dark-bg-secondary
          900: "#0e1621", // dark-bg-primary
        },
        red: {
          100: "#fee2e2",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626", // error-color
          700: "#b91c1c",
          900: "#7f1d1d",
        },
        green: {
          100: "#d1fae5",
          400: "#34d399",
          600: "#059669", // success-color
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        yellow: {
          50: "#fefce8",
          100: "#fef9c3",
          400: "#facc15",
          600: "#ca8a04",
          700: "#a16207",
          900: "#713f12",
        },
        purple: {
          100: "#f3e8ff",
          400: "#c084fc",
          600: "#9333ea",
          700: "#7e22ce",
          900: "#581c87",
        },
        // Cores específicas da aplicação
        primary: "#2563eb", // btn-primary (blue-600)
        "primary-hover": "#1d4ed8", // btn-primary-hover (blue-700)
        secondary: "#6b7280", // gray-500
        "secondary-hover": "#4b5563", // gray-600
        success: "#059669", // green-600
        "success-hover": "#047857", // green-700
        danger: "#dc2626", // error-color (red-600)
        "danger-hover": "#b91c1c", // red-700
        "danger-light": "#fee2e2", // red-100
        "success-light": "#d1fae5", // green-100
        "info-light": "#dbeafe", // blue-100
        "primary-focus": "#3b82f6", // blue-500
        // Cores específicas para tema escuro
        "dark-bg-primary": "#0e1621", // color-dark-900
        "dark-bg-secondary": "#1f2937", // color-dark-800
        "dark-bg-tertiary": "#374151", // gray-700
        "dark-text-primary": "#ffffff", // color-white
        "dark-text-secondary": "#9ca3af", // gray-400
        "dark-text-tertiary": "#e5e7eb", // gray-200
        "dark-border-primary": "#4b5563", // gray-600
        "dark-border-secondary": "#374151", // gray-700
        "dark-edit-btn": "#60a5fa", // blue-400
        "dark-edit-hover": "#dbeafe", // blue-100
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        "card-dark": "#1f2937", // dark-bg-secondary
        "card-darker": "#151c25", // dark-bg-editor
        "table-header-dark": "#1e3a5f", // cor específica para cabeçalhos de tabela
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        "primary-btn": "#ffffff", // texto para botões primários
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        "input-dark": "#374151", // gray-700
      }),
      container: {
        center: true,
        padding: "1.5rem",
        screens: {
          sm: "100%",
          md: "100%",
          lg: "1050p",
          xl: "1150px",
        },
      },
    },
  },
  plugins: [
    componentsPlugin,
    // ...outros plugins
  ],
};
