/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./templates/**/*.html", // Ajuste para a pasta onde estão seus templates
    "./static/**/*.{js,vue}", // Ajuste para onde estão seus arquivos JS/Vue
  ],
  darkMode: "class", // Mantém o modo escuro baseado em classes como você já usa
  theme: {
    extend: {
      colors: {
        // Aqui você pode transferir as cores personalizadas que já definiu no colors.css
        dark: {
          "bg-primary": "var(--dark-bg-primary)",
          "bg-secondary": "var(--dark-bg-secondary)",
          "text-primary": "var(--dark-text-primary)",
          "text-secondary": "var(--dark-text-secondary)",
        },
        // Outras cores personalizadas
      },
    },
  },
  plugins: [
    // Plugins podem ser adicionados aqui, mas vamos começar sem nenhum
  ],
};
