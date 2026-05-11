<template>
  <form>
    <!-- Seção de Informações básicas da SS -->
    <div class="base-section mb-4">
      <h2 class="base-title">Informações básicas da SS</h2>

      <!-- Primeira linha: Número SS, Ano SS, Sistema e Título -->
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div class="form-group col-span-1 sm:col-span-1">
          <label for="numeroSS" class="form-label">
            Número <span class="text-red-600">*</span>
          </label>
          <input
            type="text"
            v-model="formData.numeroSS"
            id="numeroSS"
            ref="numeroSS"
            maxlength="3"
            placeholder="000"
            @input="handleInput"
            @blur="formatSS"
            autocomplete="off"
            class="form-input text-center"
            required
          />
        </div>

        <div class="form-group col-span-1 sm:col-span-1">
          <label for="anoSS" class="form-label">
            Ano <span class="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="anoSS"
            v-model="formData.anoSS"
            class="form-input text-center"
            required
          />
        </div>

        <div class="form-group col-span-1 sm:col-span-2">
          <label for="sistema" class="form-label">Sistema</label>
          <input
            type="text"
            v-model="formData.sistema"
            id="sistema"
            ref="sistema"
            class="form-input"
            placeholder="Nome do sistema"
            autocomplete="off"
          />
        </div>

        <div class="form-group col-span-1 sm:col-span-8">
          <label for="tituloSS" class="form-label">
            Título <span class="text-red-600">*</span>
          </label>
          <input
            type="text"
            v-model="formData.tituloSS"
            id="tituloSS"
            ref="tituloSS"
            class="form-input"
            placeholder="Título informado no e-mail de abertura da SS"
            autocomplete="off"
            required
          />
        </div>
      </div>

      <!-- Segunda linha: Descrição -->
      <div class="form-group">
        <div class="flex items-center gap-2 mb-2">
          <label for="descricaoSS" class="form-label mb-0">
            Descrição <span class="text-red-600">*</span>
          </label>
          <button
            type="button"
            @click="gerarDescricaoAutomatica"
            class="p-1 text-gray-500 hover:text-white transition-colors duration-200 rounded"
            title="Gerar descrição automática baseada no Sistema e Título"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g clip-path="url(#clip0_4418_9579)">
                <path
                  d="M3.49994 20.4995C4.32994 21.3295 5.66994 21.3295 6.49994 20.4995L19.4999 7.49945C20.3299 6.66945 20.3299 5.32945 19.4999 4.49945C18.6699 3.66945 17.3299 3.66945 16.4999 4.49945L3.49994 17.4995C2.66994 18.3295 2.66994 19.6695 3.49994 20.4995Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.01 8.99023L15.01 5.99023"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.5 2.44L10 2L9.56 3.5L10 5L8.5 4.56L7 5L7.44 3.5L7 2L8.5 2.44Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.5 8.44L6 8L5.56 9.5L6 11L4.5 10.56L3 11L3.44 9.5L3 8L4.5 8.44Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.5 13.44L21 13L20.56 14.5L21 16L19.5 15.56L18 16L18.44 14.5L18 13L19.5 13.44Z"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_4418_9579">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
        <textarea
          v-model="formData.descricao"
          id="descricaoSS"
          ref="descricao"
          class="form-input form-textarea"
          placeholder="Ações realizadas para atualização do (SISTEMA) para que (OBJETIVO)."
          rows="2"
          required
        ></textarea>
      </div>

      <!-- Terceira linha: Data Início, Data Fim e Link -->
      <div class="grid grid-cols-1 sm:grid-cols-12 gap-4">
        <div class="form-group col-span-2">
          <label for="dataInicioSS" class="form-label">
            Data de Início <span class="text-red-600">*</span>
          </label>
          <input
            id="dataInicioSS"
            ref="dataInicio"
            type="date"
            v-model="formData.dataInicio"
            class="form-input"
            required
          />
        </div>

        <div class="form-group col-span-2">
          <label for="dataFimSS" class="form-label">
            Data de Fim <span class="text-red-600">*</span>
          </label>
          <input
            id="dataFimSS"
            ref="dataFim"
            type="date"
            v-model="formData.dataFim"
            class="form-input"
            required
          />
        </div>

        <div class="form-group col-span-8">
          <label for="linkBoardSS" class="form-label">Link do board</label>
          <input
            id="linkBoardSS"
            type="url"
            v-model="formData.linkBoard"
            placeholder="https://gitlab.com/chesf.gov.br/..."
            class="form-input"
            autocomplete="off"
          />
        </div>
      </div>
    </div>

    <!-- A parte de autores foi removida e deve ser colocada no componente pai, ou onde necessário -->
  </form>
</template>

<script>
export default {
  name: "BasicFormSection",
  props: {
    formData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleInput(event) {
      // Apenas permitir números e limitar a 3 caracteres
      let value = event.target.value.replace(/\D/g, "").slice(0, 3);
      this.$emit("update:numeroSS", value);
    },
    formatSS() {
      if (this.formData.numeroSS) {
        this.$emit("format-ss");
      }
    },

    gerarDescricaoAutomatica() {
      const sistema = this.formData.sistema?.trim() || "[SISTEMA]";
      let titulo = this.formData.tituloSS?.trim() || "[TÍTULO]";

      // Converter primeira letra do título para minúscula
      if (titulo && titulo.length > 0) {
        titulo = titulo.charAt(0).toLowerCase() + titulo.slice(1);
      }

      const descricaoGerada = `Ações realizadas para atualização do ${sistema} para ${titulo}.`;

      this.$emit("update:descricao", descricaoGerada);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do formulário, se necessário */
</style>
