<template>
  <header class="app-header fixed top-0 left-0 right-0 z-50">
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <img src="/static/dark-logo.png" alt="Logo" class="h-12 mr-2" />
        <h1 class="text-white text-2xl font-bold">{{ title }}</h1>
        <slot name="swap-button"></slot>
      </div>
      <div class="app-header-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </header>
  <div class="header-spacer"></div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    title: {
      type: String,
      default: "Gerador de Documentações Técnicas",
    },
  },
  emits: ["swap-requested"],
  data() {
    return {
      // dados
    };
  },
  methods: {
    handleSwapRequested(targetUrl) {
      this.$emit("swap-requested", targetUrl);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
