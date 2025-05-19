export default {
  methods: {
    // Verifica se um campo está definido como padrão
    isDefaultField(field) {
      return this.defaultFields && this.defaultFields[field] !== null;
    },

    // Alterna um campo entre padrão/não padrão
    toggleDefaultField(field) {
      if (!this.modoVisualizacao) {
        if (this.isDefaultField(field)) {
          this.$emit("remove-default-field", field);
        } else {
          const value = this.requisito[field];
          this.$emit("update-default-field", field, value);
        }
      }
    },

    // Retorna o estilo CSS inline para campos padrão
    getDefaultFieldStyle(field) {
      // Se estiver em modo visualização, não aplica estilo especial
      if (this.modoVisualizacao) {
        return "";
      }

      if (this.isDarkMode && this.isDefaultField(field)) {
        return "border-color: #1e40af; background-color: #1e3a8a;";
      } else if (this.isDefaultField(field)) {
        return "border-color: #93c5fd; background-color: #eff6ff;";
      }
      return "";
    },

    // Retorna a posição correta para o ícone de cadeado
    getLockIconPosition(field, isSelect = false) {
      let top = "35px";
      let right = isSelect ? "30px" : "10px";

      return `position: absolute; right: ${right}; top: ${top}; width: 16px; height: 16px; cursor: pointer; z-index: 5;`;
    },

    // Verifica se deve mostrar o cadeado
    shouldShowLockIcon() {
      return !this.modoVisualizacao;
    },
  },
};
