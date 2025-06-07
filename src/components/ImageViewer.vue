<template>
  <div v-if="show" class="image-viewer-overlay" @click="fecharVisualizador">
    <div class="image-viewer-container" @click.stop>
      <!-- Botão de fechar -->
      <button
        @click="fecharVisualizador"
        class="image-viewer-close-btn"
        :class="isDarkMode ? 'close-btn-dark' : 'close-btn-light'"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <!-- Seta esquerda (apenas se houver múltiplas imagens E não estiver na primeira) -->
      <button
        v-if="todasImagens.length > 1 && indiceAtual > 0"
        @click="imagemAnterior"
        class="image-nav-btn image-nav-left"
        :class="isDarkMode ? 'nav-btn-dark' : 'nav-btn-light'"
        title="Imagem anterior (←)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="15,18 9,12 15,6"></polyline>
        </svg>
      </button>

      <!-- Seta direita (apenas se houver múltiplas imagens E não estiver na última) -->
      <button
        v-if="todasImagens.length > 1 && indiceAtual < todasImagens.length - 1"
        @click="proximaImagem"
        class="image-nav-btn image-nav-right"
        :class="isDarkMode ? 'nav-btn-dark' : 'nav-btn-light'"
        title="Próxima imagem (→)"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="9,18 15,12 9,6"></polyline>
        </svg>
      </button>

      <!-- Container da imagem -->
      <div class="image-viewer-content">
        <div class="image-container" @click.stop>
          <img
            :src="imagemAtual"
            :alt="nomeArquivo"
            class="image-viewer-img"
            :style="imagemStyle"
            @load="onImageLoad"
          />
        </div>

        <!-- Contador de imagens (se houver múltiplas) -->
        <div
          v-if="todasImagens.length > 1"
          class="image-counter"
          :class="isDarkMode ? 'counter-dark' : 'counter-light'"
        >
          {{ indiceAtual + 1 }} de {{ todasImagens.length }}
        </div>

        <!-- Informações da imagem -->
        <div
          class="image-info"
          :class="isDarkMode ? 'image-info-dark' : 'image-info-light'"
        >
          <div class="image-info-row">
            <span class="info-label">Tamanho:</span>
            <span class="info-value">{{ tamanhoFormatado }}</span>
          </div>
          <div class="image-info-row">
            <span class="info-label">Dimensões:</span>
            <span class="info-value">{{ dimensoesImagem }}</span>
          </div>
          <div class="image-info-row">
            <span class="info-label">Base64:</span>
            <span class="info-value">{{ caracteresBase64 }} caracteres</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageViewer",
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    todasImagens: {
      type: Array,
      default: () => [],
    },
    indiceInicial: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      isDarkMode: document.documentElement.classList.contains("dark"),
      indiceAtual: 0,
      imagemNaturalWidth: 0,
      imagemNaturalHeight: 0,
      maxViewportWidth: 0,
      maxViewportHeight: 0,
    };
  },
  computed: {
    imagemAtual() {
      return this.todasImagens[this.indiceAtual] || "";
    },

    tamanhoFormatado() {
      if (!this.imagemAtual) return "0 KB";

      const base64Size = this.imagemAtual.length;
      const aproximateFileSize = base64Size * 0.75;
      const sizeInKB = aproximateFileSize / 1024;

      if (sizeInKB > 1024) {
        return `${(sizeInKB / 1024).toFixed(2)} MB`;
      }
      return `${sizeInKB.toFixed(2)} KB`;
    },

    ordemImagem() {
      return String(this.indiceAtual + 1).padStart(2, "0");
    },

    caracteresBase64() {
      if (!this.imagemAtual) return 0;

      const base64Data = this.imagemAtual.includes(",")
        ? this.imagemAtual.split(",")[1]
        : this.imagemAtual;

      return base64Data.length.toLocaleString("pt-BR");
    },
    dimensoesImagem() {
      if (this.imagemNaturalWidth && this.imagemNaturalHeight) {
        return `${this.imagemNaturalWidth} × ${this.imagemNaturalHeight}px`;
      }
      return "Carregando...";
    },
    imagemStyle() {
      if (!this.imagemNaturalWidth || !this.imagemNaturalHeight) {
        return {};
      }

      // Calcular limites baseados no viewport (deixando espaço para UI)
      const maxWidth = this.maxViewportWidth - 100; // 50px de cada lado
      const maxHeight = this.maxViewportHeight - 200; // Espaço para header e footer

      // Se a imagem é menor que os limites, mostrar no tamanho original
      if (
        this.imagemNaturalWidth <= maxWidth &&
        this.imagemNaturalHeight <= maxHeight
      ) {
        return {
          width: `${this.imagemNaturalWidth}px`,
          height: `${this.imagemNaturalHeight}px`,
        };
      }

      // Se é maior, calcular escala mantendo proporção
      const scaleX = maxWidth / this.imagemNaturalWidth;
      const scaleY = maxHeight / this.imagemNaturalHeight;
      const scale = Math.min(scaleX, scaleY);

      return {
        width: `${Math.floor(this.imagemNaturalWidth * scale)}px`,
        height: `${Math.floor(this.imagemNaturalHeight * scale)}px`,
      };
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.isDarkMode = document.documentElement.classList.contains("dark");
        this.indiceAtual = Math.max(
          0,
          Math.min(this.indiceInicial, this.todasImagens.length - 1)
        );
        this.calcularLimitesViewport();
        document.body.classList.add("modal-open");
        document.addEventListener("keydown", this.handleKeyPress);
        window.addEventListener("resize", this.calcularLimitesViewport);
      } else {
        document.body.classList.remove("modal-open");
        document.removeEventListener("keydown", this.handleKeyPress);
        window.removeEventListener("resize", this.calcularLimitesViewport);
      }
    },
    indiceAtual() {
      // Reset dimensões quando mudar de imagem
      this.imagemNaturalWidth = 0;
      this.imagemNaturalHeight = 0;
    },
  },
  methods: {
    fecharVisualizador() {
      this.$emit("fechar");
    },
    proximaImagem() {
      if (this.indiceAtual < this.todasImagens.length - 1) {
        this.indiceAtual++;
      }
    },
    imagemAnterior() {
      if (this.indiceAtual > 0) {
        this.indiceAtual--;
      }
    },
    handleKeyPress(event) {
      switch (event.key) {
        case "Escape":
          this.fecharVisualizador();
          break;
        case "ArrowRight":
          if (this.todasImagens.length > 1) {
            this.proximaImagem();
          }
          break;
        case "ArrowLeft":
          if (this.todasImagens.length > 1) {
            this.imagemAnterior();
          }
          break;
      }
    },
    onImageLoad(event) {
      this.imagemNaturalWidth = event.target.naturalWidth;
      this.imagemNaturalHeight = event.target.naturalHeight;
    },
    calcularLimitesViewport() {
      this.maxViewportWidth = window.innerWidth;
      this.maxViewportHeight = window.innerHeight;
    },
  },
  beforeUnmount() {
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("resize", this.calcularLimitesViewport);
  },
};
</script>

<style scoped>
.image-viewer-overlay {
  @apply fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[9999];
  backdrop-filter: blur(4px);
}

.image-viewer-container {
  @apply relative max-w-screen-lg max-h-screen w-full h-full flex flex-col items-center justify-center p-4;
}

.image-viewer-close-btn {
  @apply absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-10 transition-all duration-200;
}

.close-btn-light {
  @apply bg-white text-gray-700 shadow-lg hover:bg-gray-100;
}

.close-btn-dark {
  @apply bg-gray-800 text-gray-200 shadow-lg hover:bg-gray-700;
}

/* Botões de navegação */
.image-nav-btn {
  @apply absolute top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 transition-all duration-200;
}

.image-nav-left {
  @apply left-4;
}

.image-nav-right {
  @apply right-4;
}

.nav-btn-light {
  @apply bg-white text-gray-700 shadow-lg hover:bg-gray-100;
}

.nav-btn-dark {
  @apply bg-gray-800 text-gray-200 shadow-lg hover:bg-gray-700;
}

.image-viewer-content {
  @apply flex flex-col items-center gap-4 w-full h-full;
}

.image-container {
  @apply flex-1 flex items-center justify-center w-full;
}

.image-viewer-img {
  @apply object-contain;
  transition: all 0.3s ease;
}

/* Contador de imagens */
.image-counter {
  @apply px-3 py-1 rounded-lg text-sm font-medium;
}

.counter-light {
  @apply bg-white text-gray-700 shadow-lg;
}

.counter-dark {
  @apply bg-gray-800 text-gray-200 shadow-lg;
}

.image-info {
  @apply rounded-lg p-4 -mt-2.5 w-full max-w-md;
}

.image-info-light {
  @apply bg-white shadow-lg;
}

.image-info-dark {
  @apply bg-gray-800 shadow-lg;
}

.image-info-row {
  @apply flex justify-between items-center py-1;
}

.info-label {
  @apply font-medium text-sm;
}

.info-value {
  @apply text-sm font-mono;
}

.image-info-light .info-label {
  @apply text-gray-700;
}

.image-info-light .info-value {
  @apply text-gray-900;
}

.image-info-dark .info-label {
  @apply text-gray-300;
}

.image-info-dark .info-value {
  @apply text-gray-100;
}

/* Responsividade */
@media (max-width: 640px) {
  .image-viewer-container {
    @apply p-2;
  }

  .image-info {
    @apply max-w-full;
  }

  .image-nav-btn {
    @apply w-10 h-10;
  }

  .image-nav-left {
    @apply left-2;
  }

  .image-nav-right {
    @apply right-2;
  }

  .image-viewer-close-btn {
    @apply top-2 right-2;
  }
}
</style>
