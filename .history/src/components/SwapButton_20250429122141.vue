<template>
  <div
    class="swap-toggle"
    :class="'swap-toggle-' + targetType"
    style="display: flex; align-items: center; margin-left: 5px"
  >
    <a href="javascript:void(0)" @click="handleSwap" class="swap-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="swap-icon"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        width="24"
        height="24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    </a>
    <div
      :class="[
        'swap-tooltip',
        targetType === 'desenvolvimento'
          ? 'tooltip-desenvolvimento'
          : 'tooltip-tecnica',
      ]"
    >
      <div
        :class="[
          'tooltip-arrow',
          targetType === 'desenvolvimento'
            ? 'arrow-desenvolvimento'
            : 'arrow-tecnica',
        ]"
      ></div>
      <div class="tooltip-content">
        <p class="tooltip-title">{{ tooltip }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SwapButton",
  props: {
    tooltip: {
      type: String,
      default: "Trocar para documentação de desenvolvimento",
    },
    targetUrl: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      default: "desenvolvimento",
      validator: (value) => ["desenvolvimento", "tecnica"].includes(value),
    },
  },
  data() {
    return {
      // dados
    };
  },
  emits: ["swap-requested"],
  methods: {
    handleSwap() {
      // Emit um evento para o componente pai verificar se há dados preenchidos
      this.$emit("swap-requested", this.targetUrl);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
