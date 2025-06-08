<template>
  <div
    class="upload-toggle"
    @click="checkAndOpenFileSelector"
    :class="{ 'opacity-50 cursor-not-allowed': isProcessing }"
  >
    <input
      type="file"
      ref="fileInput"
      accept=".json"
      class="hidden"
      @change="handleFileUpload"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="upload-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
      />
    </svg>
    <div class="upload-tooltip">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-content">
        <p class="tooltip-title">{{ tooltipTitle }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UploadButton",
  props: {
    tooltipTitle: {
      type: String,
      default: "Importar arquivo JSON",
    },
  },
  data() {
    return {
      // dados
    };
  },
  methods: {
    checkAndOpenFileSelector() {
      // Emite um evento para o componente pai verificar os dados
      // e mostrar o modal de confirmação se necessário
      this.$emit("check-data");
    },
    openFileSelector() {
      // Método explícito para abrir o seletor de arquivos
      if (this.$refs.fileInput) {
        this.$refs.fileInput.click();
      } else {
        console.error("Referência ao input file não encontrada!");
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.$emit("json-loaded", data);
          // Limpar o input para permitir carregar o mesmo arquivo novamente
          this.$refs.fileInput.value = "";
        } catch (error) {
          console.error("Erro ao parsear o arquivo JSON:", error);
          this.$emit("json-error", error);
          this.$refs.fileInput.value = "";
        }
      };
      reader.readAsText(file);
    },
  },

  mounted() {
    // Ao montar, expõe a referência ao método para poder ser chamada externamente
    this.$el.__vueRef = this;
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
