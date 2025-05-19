<template>
  <div
    class="faq-item bg-white dark:bg-gray-800 rounded-lg border border-blue-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md"
  >
    <!-- Cabeçalho da pergunta (sempre visível) -->
    <div
      class="flex justify-between items-center p-4 cursor-pointer"
      @click="toggleExpanded"
    >
      <h3 class="font-semibold text-gray-800 dark:text-white">
        {{ question }}
      </h3>
      <div class="rounded-full bg-blue-100 dark:bg-blue-800 p-1">
        <svg
          :class="[isExpanded ? 'transform rotate-180' : '']"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-blue-600 dark:text-blue-400 transition-transform duration-200"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Conteúdo da resposta (visível apenas se expandido) -->
    <div
      v-if="isExpanded"
      class="border-t border-blue-100 dark:border-blue-900 px-4 py-3 text-gray-700 dark:text-gray-300 bg-blue-50 dark:bg-blue-900/20 transition-all duration-200"
    >
      <!-- Layout de uma coluna (padrão) -->
      <template v-if="layout === 'single'">
        <div v-if="hasDefaultSlot">
          <slot></slot>
        </div>
        <p v-else>{{ answer }}</p>

        <!-- Caixa informativa usando o componente InfoBox -->
        <InfoBox
          v-if="hasInfoBoxSlot && infoBoxType"
          :type="infoBoxType"
          :isDark="isDark"
        >
          <slot name="info-box"></slot>
        </InfoBox>
      </template>

      <!-- Layout de múltiplas colunas -->
      <template v-else-if="layout === 'multi-column'">
        <div
          :class="['grid grid-cols-1', `md:grid-cols-${columns}`, 'gap-4 mt-2']"
        >
          <slot name="columns"></slot>
        </div>
      </template>

      <!-- Layout personalizado -->
      <template v-else>
        <slot name="custom-layout"></slot>
      </template>
    </div>
  </div>
</template>

<script>
import InfoBox from "./InfoBox.vue";

export default {
  name: "FaqItem",
  components: {
    InfoBox,
  },
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      default: "",
    },
    infoBoxType: {
      type: String,
      default: "",
      validator: (value) =>
        ["", "note", "tip", "important", "warning", "caution"].includes(value),
    },
    layout: {
      type: String,
      default: "single",
      validator: (value) =>
        ["single", "multi-column", "custom"].includes(value),
    },
    columns: {
      type: Number,
      default: 2,
      validator: (value) => value >= 1 && value <= 6,
    },
    initialExpanded: {
      type: Boolean,
      default: false,
    },
    isDark: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isExpanded: this.initialExpanded,
    };
  },
  computed: {
    hasDefaultSlot() {
      return !!this.$slots.default;
    },
    hasInfoBoxSlot() {
      return !!this.$slots["info-box"];
    },
  },
  methods: {
    toggleExpanded() {
      this.isExpanded = !this.isExpanded;
      this.$emit("toggle", this.isExpanded);
    },
  },
};
</script>
