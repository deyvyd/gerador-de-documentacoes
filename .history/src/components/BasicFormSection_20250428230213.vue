<template>
  <!-- Formulário principal -->
  <form>
    <!-- Seção de Informações básicas da SS -->
    <div class="base-section mb-4">
      <h2 class="base-title">Informações básicas da SS</h2>

      <!-- Primeira linha: Número SS, Ano SS e Título -->
      <div class="grid grid-cols-1 sm:grid-cols-10 gap-4">
        <div class="form-group col-span-1">
          <label for="numeroSS" class="form-label">
            Número
            <span class="text-red-600">*</span>
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
            class="form-input text-center"
            required
          />
        </div>

        <div class="form-group col-span-1">
          <label for="anoSS" class="form-label">
            Ano
            <span class="text-red-600">*</span>
          </label>
          <input
            type="number"
            id="anoSS"
            v-model="formData.anoSS"
            class="form-input text-center"
            required
          />
        </div>

        <div class="form-group col-span-8">
          <label class="form-label">
            Título
            <span class="text-red-600">*</span>
          </label>
          <input
            type="text"
            v-model="formData.tituloSS"
            ref="tituloSS"
            class="form-input"
            placeholder="Título informado no e-mail de abertura da SS"
            required
          />
        </div>
      </div>

      <!-- Segunda linha: Descrição -->
      <div class="form-group">
        <label class="form-label">
          Descrição
          <span class="text-red-600">*</span>
        </label>
        <textarea
          v-model="formData.descricao"
          ref="descricao"
          class="form-input form-textarea"
          placeholder="Ações realizadas para atualização do (SISTEMA) para que (OBJETIVO)."
          rows="2"
          required
        ></textarea>
      </div>

      <!-- Terceira linha: Data Início, Data Fim e Link -->
      <div class="grid grid-cols-1 sm:grid-cols-10 gap-4">
        <div class="form-group col-span-2">
          <label class="form-label">
            Data de Início
            <span class="text-red-600">*</span>
          </label>
          <input
            ref="dataInicio"
            type="date"
            v-model="formData.dataInicio"
            class="form-input"
            required
          />
        </div>

        <div class="form-group col-span-2">
          <label for="dataFim" class="form-label">
            Data de Fim
            <span class="text-red-600">*</span>
          </label>
          <input
            ref="dataFim"
            id="dataFim"
            type="date"
            v-model="formData.dataFim"
            class="form-input"
            required
          />
        </div>
        <div class="form-group col-span-6">
          <label class="form-label">Link do board</label>
          <input
            type="url"
            v-model="formData.linkBoard"
            placeholder="https://gitlab.com/chesf.gov.br/..."
            class="form-input"
          />
        </div>
      </div>
    </div>

    <!-- Quarta linha: Autor(es) -->
    <div class="form-group">
      <label class="form-label">
        Autor(es)
        <span class="text-red-600">*</span>
      </label>
      <div class="author-selector-container">
        <div class="author-input-area autor-container">
          <!-- Tags dos autores selecionados -->
          <span
            v-for="autor in selectedAutores"
            :key="autor.nome"
            class="author-tag"
          >
            {{ autor.nome }}
            <button
              @click.prevent="removeAutor(autor)"
              class="author-remove-btn"
            >
              ×
            </button>
          </span>
          <!-- Input para digitar -->
          <input
            type="text"
            v-model="inputValue"
            @input="updateAutorInput"
            @focus="handleInputFocus"
            @blur="handleAutorBlur"
            @keydown.down.prevent="$emit('navigate-list', 'down')"
            @keydown.up.prevent="$emit('navigate-list', 'up')"
            @keydown.enter.prevent="selectHighlighted"
            @keydown.backspace="handleBackspace"
            placeholder="Digite o nome do autor..."
            class="author-input-field"
            ref="autorInput"
          />
        </div>

        <!-- Lista de sugestões (mantive a referência às classes que criamos anteriormente) -->
        <div
          v-if="showSuggestions && filteredAutores.length > 0"
          class="suggestions-list"
        >
          <div
            v-for="(autor, index) in filteredAutores"
            :key="autor.nome"
            @mousedown="selectAutor(autor)"
            @mouseover="$emit('highlight-index', index)"
            :class="[
              'suggestion-item',
              highlightedIndex === index ? 'suggestion-item-highlighted' : '',
            ]"
          >
            {{ autor.nome }}
          </div>
        </div>
      </div>
    </div>
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
    selectedAutores: {
      type: Array,
      required: true,
    },
    autorInput: {
      type: String,
      required: true,
    },
    showSuggestions: {
      type: Boolean,
      default: false,
    },
    filteredAutores: {
      type: Array,
      default: () => [],
    },
    highlightedIndex: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      inputValue: this.autorInput,
    };
  },
  watch: {
    autorInput(newVal) {
      this.inputValue = newVal;
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
    updateAutorInput() {
      this.$emit("update:autorInput", this.inputValue);
    },
    handleAutorBlur(event) {
      // Pequeno delay para permitir o clique na sugestão
      setTimeout(() => {
        this.$emit("show-suggestions", false);
      }, 200);
    },
    handleBackspace(event) {
      // Se o input estiver vazio e houver autores selecionados
      if (this.inputValue === "") {
        this.$emit("handle-backspace");
      }
    },
    selectHighlighted() {
      if (
        this.filteredAutores.length &&
        this.filteredAutores[this.highlightedIndex]
      ) {
        this.selectAutor(this.filteredAutores[this.highlightedIndex]);
      }
    },
    selectAutor(autor) {
      this.$emit("select-autor", autor);
    },
    removeAutor(autor) {
      this.$emit("remove-autor", autor);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
