<template>
  <div class="tour-guide-container">
    <button
      @click="startTour"
      id="botaoTour"
      class="tour-btn flex items-center gap-2 text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        width="21"
        viewBox="0 0 448 512"
        stroke-width="36"
        stroke="currentColor"
      >
        <path
          fill="none"
          d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
        />
      </svg>
      <!-- Tooltip -->
      <div class="tour-tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-content">
          <p class="tooltip-title">Iniciar Tour</p>
        </div>
      </div>
    </button>
  </div>
</template>

<script>
import { driver } from "driver.js";

export default {
  name: "TourGuide",
  props: {
    steps: {
      type: Array,
      required: true,
    },
    showButton: {
      type: Boolean,
      default: true,
    },
    autoStart: {
      type: Boolean,
      default: false,
    },
    tourId: {
      type: String,
      required: true, // Identificador único para cada tour
    },
  },
  data() {
    return {
      driverObj: null,
      tourActive: false,
    };
  },
  mounted() {
    this.initDriver();

    if (this.autoStart) {
      const tourCompleted = localStorage.getItem(
        `tour_${this.tourId}_completed`
      );
      if (!tourCompleted) {
        // Se o tour ainda não foi completado para esta tela, inicia automaticamente
        setTimeout(() => {
          this.startTour();
        }, 1000);
      }
    }

    // Adicionar um evento global para detectar quando o tour é fechado
    document.addEventListener("keydown", this.handleKeyDown);

    // Expor a função startTour globalmente
    window.startDocumentacaoTecnicaTour = this.startTour;
  },
  beforeUnmount() {
    // Remover os event listeners
    document.removeEventListener("keydown", this.handleKeyDown);

    // Se o tour estiver ativo, marcá-lo como completo
    if (this.tourActive && this.driverObj) {
      this.tourActive = false;
      localStorage.setItem(`tour_${this.tourId}_completed`, "true");
    }

    // Limpar a referência global
    window.startDocumentacaoTecnicaTour = null;
  },
  unmounted() {
    // Limpar a referência global quando o componente for desmontado
    window.startDocumentacaoTecnicaTour = null;
  },
  methods: {
    initDriver() {
      try {
        const config = {
          animate: true,
          showProgress: true,
          showButtons: ["next", "previous", "close"],
          progressText: "Passo {{current}} de {{total}}",
          nextBtnText: "Próximo",
          prevBtnText: "Anterior",
          doneBtnText: "Concluir",
          steps: this.steps,
          popoverClass: "driverjs-theme",
        };

        // Criar instância do driver
        this.driverObj = driver(config);
      } catch (error) {
        console.error("Erro ao inicializar o Driver.js:", error);
      }
    },
    startTour() {
      if (this.driverObj) {
        try {
          // Verificar se os elementos existem
          let allElementsExist = true;
          this.steps.forEach((step, index) => {
            if (step.element) {
              const el = document.querySelector(step.element);
              if (!el) {
                console.warn(
                  `Elemento ${step.element} não encontrado para o passo ${index}`
                );
                allElementsExist = false;
              }
            }
          });

          if (!allElementsExist) {
            console.warn(
              "Alguns elementos do tour não foram encontrados no DOM"
            );
          }

          // Marcar que o tour está ativo
          this.tourActive = true;

          // Iniciar o tour
          this.driverObj.drive();
          this.$emit("tour-start");

          // Configurar um observador para verificar periodicamente se o tour ainda está ativo
          this.checkTourActiveInterval = setInterval(() => {
            if (
              this.driverObj &&
              typeof this.driverObj.isActive === "function"
            ) {
              const isActive = this.driverObj.isActive();
              if (this.tourActive && !isActive) {
                // O tour estava ativo, mas agora não está - foi fechado
                this.tourActive = false;
                clearInterval(this.checkTourActiveInterval);
                localStorage.setItem(`tour_${this.tourId}_completed`, "true");
                this.$emit("tour-completed");
                console.log("Tour completed or closed");
              }
            }
          }, 500); // Verificar a cada 500ms
        } catch (error) {
          console.error("Erro ao iniciar o tour:", error);
          this.tourActive = false;
          // Se houver erro, marca como completado para evitar loops
          localStorage.setItem(`tour_${this.tourId}_completed`, "true");
        }
      } else {
        console.warn("O driver não está inicializado!");
      }
    },

    // Adicione estes novos métodos:
    handleKeyDown(event) {
      // Verificar se a tecla ESC foi pressionada
      if (event.key === "Escape" && this.tourActive) {
        this.handleTourClose();
      }
    },

    handleTourClose() {
      if (this.tourActive) {
        this.tourActive = false;
        clearInterval(this.checkTourActiveInterval);
        localStorage.setItem(`tour_${this.tourId}_completed`, "true");
        this.$emit("tour-completed");
        console.log("Tour closed manually");

        // Se o tour ainda estiver tecnicamente ativo, destrua-o
        if (
          this.driverObj &&
          typeof this.driverObj.isActive === "function" &&
          this.driverObj.isActive()
        ) {
          this.driverObj.destroy();
        }
      }
    },

    resetTour() {
      // Método para resetar o tour desta tela
      localStorage.removeItem(`tour_${this.tourId}_completed`);
    },

    // Adicione este método em beforeDestroy ou beforeUnmount:
    beforeDestroy() {
      if (this.checkTourActiveInterval) {
        clearInterval(this.checkTourActiveInterval);
      }
    },
  },
};
</script>

<style>
@import "driver.js/dist/driver.css";

/* Adicione essas regras ao estilo do seu componente TourGuide.vue */
.driverjs-theme .driver-popover-footer button,
.driver-popover-footer button {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 500;
  letter-spacing: 0.3px;
  text-shadow: 0 0 0 transparent;
}

/* Estilização específica para melhorar a legibilidade dos botões de navegação */
.driver-popover-footer .driver-popover-navigation-btns button {
  font-weight: 600;
  padding: 8px 16px;
  text-transform: none;
  border-radius: 6px;
}

/* Ajustar a cor de fundo e texto para melhor contraste */
.driver-popover-footer
  .driver-popover-navigation-btns
  button.driver-popover-prev-btn,
.driver-popover-footer
  .driver-popover-navigation-btns
  button.driver-popover-next-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
}

/* Melhorar efeito de hover */
.driver-popover-footer .driver-popover-navigation-btns button:hover {
  background-color: #2563eb;
}

/* Estilos adicionais para garantir que os botões de navegação fiquem consistentes */
.driver-popover-footer .driver-popover-navigation-btns button {
  margin: 0 4px;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  font-size: 14px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* --- Cor do botão fechar --- */
.driverjs-theme .driver-popover-close-btn {
  color: #a2a9b4;
}

.driverjs-theme .driver-popover-close-btn:hover {
  color: #d89191;
}

/* Estilo específico para os botões próximo/anterior */
.driver-popover-footer
  .driver-popover-navigation-btns
  button.driver-popover-prev-btn,
.driver-popover-footer
  .driver-popover-navigation-btns
  button.driver-popover-next-btn {
  background-color: #4a74c7;
  color: white;
  border: none;
  font-weight: 500;
}

.driver-popover-footer
  .driver-popover-navigation-btns
  button.driver-popover-prev-btn:hover,
.driver-popover-footer
  .driver-popover-navigation-btns
  button.driver-popover-next-btn:hover {
  background-color: #345ba7;
  transform: translateY(-1px);
}

/* --- Cor da seta --- */

.driverjs-theme .driver-popover-arrow-side-left.driver-popover-arrow {
  border-left-color: #1e3a87;
}

.driverjs-theme .driver-popover-arrow-side-right.driver-popover-arrow {
  border-right-color: #1e3a87;
}

.driverjs-theme .driver-popover-arrow-side-top.driver-popover-arrow {
  border-top-color: #1e3a87;
}

.driverjs-theme .driver-popover-arrow-side-bottom.driver-popover-arrow {
  border-bottom-color: #1e3a87;
}
</style>
