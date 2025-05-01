// src/tailwind-plugins/components.js
const plugin = require("tailwindcss/plugin");

module.exports = plugin(function ({ addComponents }) {
  const components = {
    ".main-card": {
      backgroundColor: "var(--light-bg-primary)",
      borderRadius: "0.5rem",
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      padding: "1rem",
      width: "100%",
      maxWidth: "1050px",
      marginLeft: "auto",
      marginRight: "auto",
    },
    ".dark .main-card": {
      backgroundColor: "var(--dark-bg-secondary)",
    },
    // outros componentes
  };

  addComponents(components);
});
