<template>
  <div class="form-group">
    <label for="autorSS" class="form-label">
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
          <button @click.prevent="removeAutor(autor)" class="author-remove-btn">
            ×
          </button>
        </span>

        <!-- Campo de input -->
        <input
          id="autorSS"
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

      <!-- Lista de sugestões -->
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
</template>

<script>
export default {
  name: "AuthorSelector",
  props: {
    selectedAutores: Array,
    autorInput: String,
    showSuggestions: Boolean,
    filteredAutores: Array,
    highlightedIndex: Number,
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
    updateAutorInput() {
      this.$emit("update:autorInput", this.inputValue);
    },
    handleInputFocus() {
      this.$emit("show-suggestions", true);
    },
    handleAutorBlur() {
      setTimeout(() => {
        this.$emit("show-suggestions", false);
      }, 200);
    },
    handleBackspace() {
      if (this.inputValue === "") {
        this.$emit("handle-backspace");
      }
    },
    selectHighlighted() {
      const autor = this.filteredAutores[this.highlightedIndex];
      if (autor) {
        this.selectAutor(autor);
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
.author-input-field:focus {
  @apply outline-none border-blue-500;
}

.author-input-area:focus-within {
  @apply outline-none border-blue-500;
}
</style>
