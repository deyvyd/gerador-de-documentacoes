window.AppComponents = window.AppComponents || {};

// Componente de modal de confirmação reutilizável
window.AppComponents.ModalConfirmacao = {
  props: {
    show: Boolean,
    titulo: {
      type: String,
      default: "Confirmação",
    },
    mensagem: {
      type: String,
      default: "Tem certeza que deseja realizar esta ação?",
    },
    textoBotaoConfirmar: {
      type: String,
      default: "Confirmar",
    },
    textoBotaoCancelar: {
      type: String,
      default: "Cancelar",
    },
    tipoBotao: {
      type: String,
      default: "danger", // danger, info, success
      validator: (value) => ["danger", "info", "success"].includes(value),
    },
  },
  emits: ["confirmar", "cancelar"],
  computed: {
    // Detectar o tema claro/escuro
    isDarkMode() {
      return document.documentElement.classList.contains("dark");
    },

    // Classes do botão de confirmação baseadas no tipo
    classesBotaoConfirmar() {
      const classes =
        "px-4 py-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2";

      switch (this.tipoBotao) {
        case "danger":
          return `${classes} bg-red-600 hover:bg-red-700 focus:ring-red-500`;
        case "success":
          return `${classes} bg-green-600 hover:bg-green-700 focus:ring-green-500`;
        case "info":
        default:
          return `${classes} bg-blue-600 hover:bg-blue-700 focus:ring-blue-500`;
      }
    },
  },
  methods: {
    confirmar() {
      this.$emit("confirmar");
    },
    cancelar() {
      this.$emit("cancelar");
    },
    // Fechar o modal quando clicar fora dele
    fecharSeClicarFora(event) {
      if (event.target === event.currentTarget) {
        this.cancelar();
      }
    },
    // Gerenciar teclas (Esc para cancelar, Enter para confirmar)
    gerenciarTeclas(event) {
      if (event.key === "Escape") {
        this.cancelar();
      } else if (event.key === "Enter") {
        this.confirmar();
      }
    },
  },
  mounted() {
    // Adicionar listener de teclado quando o componente é montado
    window.addEventListener("keydown", this.gerenciarTeclas);
  },
  beforeUnmount() {
    // Remover listener de teclado quando o componente é desmontado
    window.removeEventListener("keydown", this.gerenciarTeclas);
  },
  template: `
    <div v-if="show" 
         class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center"
         @click="fecharSeClicarFora">
      <div :class="['modal-confirmacao', 'p-6', 'rounded-lg', 'shadow-xl', 'max-w-md', 'w-full', 'mx-4', 'transform', 'transition-all', 'duration-300', 'scale-100', isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800']">
        <!-- Ícone de alerta - no estilo dos ícones da tabela -->
        <div class="flex items-center justify-center mb-4">
          <div :class="['p-3', 'flex', 'items-center', 'justify-center']">
            <!-- Ícone para tipo 'danger' (lixeira/remover) -->
            <svg v-if="tipoBotao === 'danger'" 
                 xmlns="http://www.w3.org/2000/svg" 
                 class="h-8 w-8" 
                 :class="isDarkMode ? 'text-red-400' : 'text-red-600'"
                 viewBox="0 0 24 24" 
                 fill="none" 
                 stroke="currentColor" 
                 stroke-width="2" 
                 stroke-linecap="round" 
                 stroke-linejoin="round">
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            </svg>
            
            <!-- Ícone para tipo 'success' (check) -->
            <svg v-else-if="tipoBotao === 'success'" 
                 xmlns="http://www.w3.org/2000/svg" 
                 class="h-8 w-8" 
                 :class="isDarkMode ? 'text-green-400' : 'text-green-600'"
                 viewBox="0 0 24 24" 
                 fill="none" 
                 stroke="currentColor" 
                 stroke-width="2" 
                 stroke-linecap="round" 
                 stroke-linejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            
            <!-- Ícone para tipo 'info' (informação) -->
            <svg v-else 
                 xmlns="http://www.w3.org/2000/svg" 
                 class="h-8 w-8" 
                 :class="isDarkMode ? 'text-blue-400' : 'text-blue-600'"
                 viewBox="0 0 24 24" 
                 fill="none" 
                 stroke="currentColor" 
                 stroke-width="2" 
                 stroke-linecap="round" 
                 stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
        </div>
        
        <!-- Título e mensagem -->
        <div class="text-center mb-6">
          <h3 class="text-lg font-medium mb-2">{{ titulo }}</h3>
          <p :class="['text-sm', isDarkMode ? 'text-gray-300' : 'text-gray-600']">{{ mensagem }}</p>
        </div>
        
        <!-- Botões de ação -->
        <div class="flex justify-center space-x-4">
          <button 
            @click="cancelar" 
            type="button" 
            :class="['px-4', 'py-2', 'rounded-md', 'border', 'focus:outline-none', 'focus:ring-2', 'focus:ring-offset-2', 'focus:ring-gray-500', isDarkMode ? 'bg-gray-700 text-white border-gray-600 hover:bg-gray-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50']">
            {{ textoBotaoCancelar }}
          </button>
          <button 
            @click="confirmar" 
            type="button" 
            :class="classesBotaoConfirmar">
            {{ textoBotaoConfirmar }}
          </button>
        </div>
      </div>
    </div>
  `,
};
