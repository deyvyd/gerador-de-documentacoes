/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./static/**/*.{js,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        blue: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb", // Este é o azul principal usado nos botões
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a87", // Escurecido para match com sua interface
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
          950: "#0d1117", // Muito escuro para o fundo em modo dark
        },
        // Adicione personalizações adicionais para as cores dark
        dark: {
          100: "#2d3748",
          200: "#1a202c",
          300: "#171923",
          400: "#131520",
          500: "#0e1117", // Este parece ser o seu fundo dark atual
          600: "#090c14",
          700: "#060911",
        },
        // Cores personalizadas
        primary: "#2563eb",
        "primary-hover": "#1d4ed8",
        secondary: "#6b7280",
        "secondary-hover": "#4b5563",
        success: "#10b981",
        "success-hover": "#059669",
        danger: "#ef4444",
        "danger-hover": "#dc2626",
        "danger-light": "#fee2e2",
        "success-light": "#d1fae5",
        "info-light": "#dbeafe",
        "primary-focus": "#3b82f6",
      },
      backgroundColor: (theme) => ({
        ...theme("colors"),
        "card-dark": "#1e2330", // Para o fundo das cards em dark mode
        "card-darker": "#15192a", // Para o fundo mais escuro em dark mode
        primary: "#2563eb", // Azul principal
        "primary-hover": "#1d4ed8", // Azul hover
      }),
      textColor: (theme) => ({
        ...theme("colors"),
        "primary-btn": "#ffffff", // Texto branco para botões
      }),
      borderColor: (theme) => ({
        ...theme("colors"),
        "input-dark": "#374151", // Borda dos inputs em dark mode
      }),
    },
  },
  plugins: [],
};
