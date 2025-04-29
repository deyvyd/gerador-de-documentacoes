<template>
  <div class="mt-6">
    <div class="flex flex-col sm:flex-row justify-center items-center gap-4">
      <div class="format-section w-full sm:w-auto">
        <div class="flex flex-col sm:flex-row items-center gap-4 w-full">
          <h3 class="format-title whitespace-nowrap">Formato dos arquivos</h3>
          <div class="flex gap-4 flex-wrap">
            <!-- Opção JSON (sempre selecionada) -->
            <label for="formatoJSON" class="checkbox-container">
              <input
                type="checkbox"
                id="formatoJSON"
                :checked="true"
                disabled
                class="checkbox-input"
              />
              <span class="checkbox-label">JSON</span>
            </label>
            <!-- DOCX -->
            <label for="formatoDOCX" class="checkbox-container">
              <input
                id="formatoDOCX"
                type="checkbox"
                :checked="formatos.gerarDocx"
                @change="updateDocx($event.target.checked)"
                class="checkbox-input"
              />
              <span class="checkbox-label">DOCX</span>
            </label>
            <!-- PDF -->
            <label for="formatoPDF" class="checkbox-container">
              <input
                id="formatoPDF"
                type="checkbox"
                :checked="formatos.gerarPdf"
                @change="updatePdf($event.target.checked)"
                class="checkbox-input"
              />
              <span class="checkbox-label">PDF</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Botão com texto dinâmico e ícone de download -->
      <button
        @click="$emit('submit')"
        class="btn btn-primary w-full sm:w-64"
        :disabled="isLoading"
      >
        <template v-if="isLoading">
          <svg
            class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {{ loadingText }}
        </template>
        <template v-else>
          <!-- Ícone de download -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          {{ dynamicButtonText }}
        </template>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormSubmitSection",
  props: {
    formatos: Object,
    isLoading: Boolean,
    buttonText: {
      type: String,
      default: "Gerar Documento",
    },
    loadingText: {
      type: String,
      default: "Processando",
    },
  },
  computed: {
    // Propriedade computada para determinar dinamicamente o texto do botão
    dynamicButtonText() {
      // Se apenas JSON estiver selecionado (JSON é sempre true, mas os outros são false)
      if (!this.formatos.gerarDocx && !this.formatos.gerarPdf) {
        return "Baixar JSON";
      }
      // Caso contrário
      return "Gerar Documentos";
    },
  },
  data() {
    return {
      // dados
    };
  },
  methods: {
    updateDocx(checked) {
      // Emitir um evento para atualizar o valor no componente pai
      this.$emit("update:docx", checked);
    },
    updatePdf(checked) {
      // Emitir um evento para atualizar o valor no componente pai
      this.$emit("update:pdf", checked);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
