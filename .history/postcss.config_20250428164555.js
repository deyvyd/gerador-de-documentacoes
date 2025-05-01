module.exports = {
  plugins: {
    "postcss-import": {}, // Isso deve vir primeiro
    "tailwindcss/nesting": {}, // Adicione o plugin de nesting
    tailwindcss: {}, // Depois o tailwind
    autoprefixer: {}, // Por último o autoprefixer
  },
};
