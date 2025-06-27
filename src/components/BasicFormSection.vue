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
        <label for="descricaoSS" class="form-label">
          Descrição <span class="text-red-600">*</span>
        </label>
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
  },
};
</script>

<style scoped>
/* Estilos específicos do formulário, se necessário */
</style>
