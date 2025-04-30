<template>
  <<button @click="navegarParaSobre" class="info-toggle">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="info-icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    <div class="info-tooltip">
      <div class="tooltip-arrow"></div>
      <div class="tooltip-content">
        <p class="tooltip-title">{{ tooltipTitle }}</p>
        <ul class="tooltip-list">
          <li
            v-for="(item, index) in tooltipItems"
            :key="index"
            class="tooltip-item"
          >
            • {{ item }}
          </li>
        </ul>
      </div>
    </div>
  </button>
</template>

<script>
export default {
  name: "InfoButton",
  props: {
    tooltipTitle: {
      type: String,
      default: "Informações",
    },
    tooltipItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // dados
    };
  },
  methods: {
    navegarParaSobre() {
      this.$router.push("/sobre");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
s
