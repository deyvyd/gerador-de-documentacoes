<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
    @click="fecharSeClicarFora"
  >
    <div
      :class="[
        'modal-message',
        'p-6',
        'rounded-lg',
        'shadow-xl',
        'w-full',
        'mx-4',
        'transform',
        'transition-all',
        'duration-300',
        'scale-100',
        larguraPersonalizada,
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800',
      ]"
    >
      <div class="flex items-start mb-4 gap-4">
        <div
          :class="['p-3', 'rounded-full', modalConfig.colorClass]"
          v-html="modalConfig.icon"
        ></div>
        <div class="flex-1">
          <h3 class="text-lg font-medium mb-2">{{ modalConfig.title }}</h3>
          <div
            :class="['text-sm', isDarkMode ? 'text-gray-300' : 'text-gray-600']"
          >
            <p v-if="typeof mensagem === 'string'">{{ mensagem }}</p>
            <div v-else v-html="mensagem"></div>
          </div>
        </div>
      </div>
      <div :class="['border-t', 'my-4', modalConfig.borderClass]"></div>
      <div class="flex justify-end space-x-4">
        <button
          v-if="showCancelButton"
          @click="cancelar"
          type="button"
          :class="cancelButtonClasses"
        >
          {{ textoBotaoCancelar }}
        </button>
        <button
          v-if="showConfirmButton"
          @click="confirmar"
          type="button"
          :class="confirmButtonClasses"
        >
          {{ textoBotaoConfirmar }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalMessage",
  props: {
    show: Boolean,
    titulo: { type: String, default: "Mensagem" },
    mensagem: { type: [String, Object], default: "Conteúdo da mensagem." },
    tipo: {
      type: String,
      default: "note",
      validator: (value) =>
        ["note", "tip", "important", "warning", "caution"].includes(value),
    },
    showConfirmButton: { type: Boolean, default: true },
    showCancelButton: { type: Boolean, default: false },
    textoBotaoConfirmar: { type: String, default: "OK" },
    textoBotaoCancelar: { type: String, default: "Cancelar" },
    larguraPersonalizada: { type: String, default: "max-w-md" },
    fecharAoClicarFora: { type: Boolean, default: false },
  },
  emits: ["confirmar", "cancelar"],
  computed: {
    isDarkMode() {
      return document.documentElement.classList.contains("dark");
    },
    modalConfig() {
      const configs = {
        note: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>`,
          title: this.titulo || "Nota",
          colorClass: this.isDarkMode
            ? "text-blue-400 bg-blue-900/20"
            : "text-blue-600 bg-blue-50",
          borderClass: this.isDarkMode ? "border-blue-700" : "border-blue-200",
          buttonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
        },
        tip: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 20.488V17"></path>
                  <path d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>`,
          title: this.titulo || "Dica",
          colorClass: this.isDarkMode
            ? "text-green-400 bg-green-900/20"
            : "text-green-600 bg-green-50",
          borderClass: this.isDarkMode
            ? "border-green-700"
            : "border-green-200",
          buttonClass: "bg-green-600 hover:bg-green-700 focus:ring-green-500",
        },
        important: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                        <path d="M19 4H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3l3 3 3-3h5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path>
                        <line x1="12" y1="7" x2="12" y2="11"></line>
                        <line x1="12" y1="14" x2="12.01" y2="14"></line>
                      </svg>`,
          title: this.titulo || "Importante",
          colorClass: this.isDarkMode
            ? "text-purple-400 bg-purple-900/20"
            : "text-purple-600 bg-purple-50",
          borderClass: this.isDarkMode
            ? "border-purple-700"
            : "border-purple-200",
          buttonClass:
            "bg-purple-600 hover:bg-purple-700 focus:ring-purple-500",
        },
        warning: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                  <line x1="12" y1="9" x2="12" y2="13"></line>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>`,
          title: this.titulo || "Aviso",
          colorClass: this.isDarkMode
            ? "text-yellow-400 bg-yellow-900/20"
            : "text-yellow-600 bg-yellow-50",
          borderClass: this.isDarkMode
            ? "border-yellow-700"
            : "border-yellow-200",
          buttonClass:
            "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
        },
        caution: {
          icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8">
                  <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>`,
          title: this.titulo || "Cuidado",
          colorClass: this.isDarkMode
            ? "text-red-400 bg-red-900/20"
            : "text-red-600 bg-red-50",
          borderClass: this.isDarkMode ? "border-red-700" : "border-red-200",
          buttonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
        },
      };
      return configs[this.tipo] || configs.note;
    },
    confirmButtonClasses() {
      return `px-4 py-2 rounded-md text-white font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${this.modalConfig.buttonClass}`;
    },
    cancelButtonClasses() {
      return `px-4 py-2 rounded-md border font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 ${
        this.isDarkMode
          ? "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
      }`;
    },
  },
  methods: {
    confirmar() {
      this.$emit("confirmar");
    },
    cancelar() {
      this.$emit("cancelar");
    },
    fecharSeClicarFora(event) {
      if (this.fecharAoClicarFora && event.target === event.currentTarget) {
        this.cancelar();
      }
    },
    gerenciarTeclas(event) {
      if (event.key === "Escape" && this.fecharAoClicarFora) {
        this.cancelar();
      } else if (event.key === "Enter" && this.showConfirmButton) {
        this.confirmar();
      }
    },
  },
  mounted() {
    window.addEventListener("keydown", this.gerenciarTeclas);
    if (this.show) document.body.classList.add("modal-open");
  },
  updated() {
    if (this.show) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.gerenciarTeclas);
    document.body.classList.remove("modal-open");
  },
};
</script>

<style scoped>
.modal-open {
  overflow: hidden;
}
</style>
