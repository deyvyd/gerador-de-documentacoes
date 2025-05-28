<template>
  <!-- Área de Hover para Header Recolhido -->
  <div
    ref="hoverArea"
    class="fixed top-0 left-0 right-0 h-16 z-40 pointer-events-none opacity-0 transition-opacity duration-300"
    @mouseenter="handleHoverAreaEnter"
    @mouseleave="handleHoverAreaLeave"
  ></div>

  <header
    ref="header"
    :class="[
      'app-header fixed top-0 left-0 right-0 z-50 header-transition',
      headerState === 'expanded' ? 'header-expanded' : 'header-collapsed',
    ]"
    @mouseenter="handleHeaderEnter"
    @mouseleave="handleHeaderLeave"
  >
    <div class="container mx-auto px-4 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <router-link to="/" class="flex items-center">
          <img src="/static/dark-logo.svg" alt="Logo" class="h-12 mr-4" />
        </router-link>
        <h1 class="text-white text-base md:text-xl lg:text-2xl font-bold">
          {{ title }}
        </h1>
        <slot name="swap-button"></slot>
      </div>
      <div class="app-header-actions">
        <slot name="actions"></slot>
        <slot name="tour-button"></slot>
      </div>
    </div>

    <!-- Botão Toggle (sempre visível) -->
    <button
      @click="toggleHeaderState"
      class="absolute -bottom-6 right-4 glass-effect rounded-full p-2 toggle-button-right"
      :title="
        headerState === 'expanded' ? 'Recolher Header' : 'Expandir Header'
      "
    >
      <svg
        :class="[
          'h-4 w-4 text-white icon-rotate transition-transform duration-300',
          headerState === 'collapsed' ? 'rotate-180' : '',
        ]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 15l7-7 7 7"
        />
      </svg>
    </button>
  </header>

  <div
    ref="headerSpacer"
    :class="['header-spacer transition-all duration-300']"
    :style="{ height: headerState === 'expanded' ? '88px' : '0px' }"
  ></div>
</template>

<script>
export default {
  name: "AppHeader",
  props: {
    title: {
      type: String,
      default: "Gerador de Documentações",
    },
    defaultState: {
      type: String,
      default: "expanded",
      validator: (value) => ["expanded", "collapsed"].includes(value),
    },
    persistState: {
      type: Boolean,
      default: true, // Se deve salvar/carregar do localStorage
    },
  },
  emits: ["swap-requested"],
  data() {
    return {
      headerState: "expanded",
      isHovering: false,
    };
  },
  mounted() {
    this.initializeHeaderState();
  },
  methods: {
    initializeHeaderState() {
      let initialState = this.defaultState;

      // Se persistState for true, tentar carregar do localStorage
      if (this.persistState) {
        const savedState = localStorage.getItem("headerState");
        if (savedState && ["expanded", "collapsed"].includes(savedState)) {
          initialState = savedState;
        }
      }

      this.headerState = initialState;
      this.updateHeaderVisibility();
    },

    handleSwapRequested(targetUrl) {
      this.$emit("swap-requested", targetUrl);
    },

    toggleHeaderState() {
      this.headerState =
        this.headerState === "expanded" ? "collapsed" : "expanded";
      this.updateHeaderVisibility();

      // Salvar no localStorage apenas se persistState for true
      if (this.persistState) {
        localStorage.setItem("headerState", this.headerState);
      }
    },

    // ... resto dos métodos permanecem iguais
    updateHeaderVisibility() {
      if (this.headerState === "collapsed") {
        this.$refs.hoverArea.style.pointerEvents = "auto";
        this.$refs.hoverArea.style.opacity = "1";
      } else {
        this.$refs.hoverArea.style.pointerEvents = "none";
        this.$refs.hoverArea.style.opacity = "0";
      }
    },

    handleHoverAreaEnter() {
      this.isHovering = true;
      this.showHeaderOnHover();
    },

    handleHoverAreaLeave() {
      this.isHovering = false;
      setTimeout(() => this.hideHeaderOnHover(), 100);
    },

    handleHeaderEnter() {
      if (this.headerState === "collapsed") {
        this.isHovering = true;
      }
    },

    handleHeaderLeave() {
      if (this.headerState === "collapsed") {
        this.isHovering = false;
        setTimeout(() => this.hideHeaderOnHover(), 300);
      }
    },

    showHeaderOnHover() {
      if (this.headerState === "collapsed") {
        this.$refs.header.classList.remove("header-collapsed");
        this.$refs.header.classList.add("header-hover-expand");
      }
    },

    hideHeaderOnHover() {
      if (this.headerState === "collapsed" && !this.isHovering) {
        this.$refs.header.classList.remove("header-hover-expand");
        this.$refs.header.classList.add("header-collapsed");
      }
    },
  },

  watch: {
    headerState() {
      this.updateHeaderVisibility();
    },

    // Reagir a mudanças no defaultState (caso seja alterado dinamicamente)
    defaultState(newState) {
      if (!this.persistState) {
        this.headerState = newState;
      }
    },
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
