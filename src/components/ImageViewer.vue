<template>
  <div
    v-if="show"
    class="image-viewer-overlay"
    @mousedown="handleOverlayMouseDown"
    @click="handleOverlayClick"
  >
    <div class="image-viewer-container" @click.stop>
      <!-- Seta esquerda -->
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

      <!-- Seta direita -->
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
        <div class="image-container" @click.stop ref="imageContainer">
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

          <!-- Container de zoom com limites -->
          <div
            class="image-viewer-zoom-container"
            :class="{ zoomed: zoomLevel > 1 }"
            :style="containerStyle"
            @mousedown="handleImageAreaMouseDown"
            @mousemove="handleDrag"
            @mouseup="endDrag"
            @wheel="handleWheel"
            @dblclick="resetZoom"
            ref="zoomContainer"
          >
            <!-- Hint de reset de zoom -->
            <div class="zoom-reset-hint">
              Clique duas vezes para resetar o zoom
            </div>

            <img
              :src="imagemAtual"
              class="image-viewer-img image-viewer-img-zoomable"
              :class="{ dragging: isDragging }"
              :style="imageStyle"
              @load="onImageLoad"
              @dragstart.prevent
              ref="imageElement"
            />
          </div>
        </div>

        <!-- Controles de zoom -->
        <div class="image-viewer-controls">
          <button
            @click="zoomOut"
            :disabled="zoomLevel <= minZoom"
            class="zoom-button"
            title="Diminuir zoom (-)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M8 11h6"></path>
            </svg>
          </button>

          <span class="zoom-level">{{ Math.round(zoomLevel * 100) }}%</span>

          <button
            @click="zoomIn"
            :disabled="zoomLevel >= maxZoom"
            class="zoom-button"
            title="Aumentar zoom (+)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="M11 8v6"></path>
              <path d="M8 11h6"></path>
            </svg>
          </button>

          <button
            @click="resetZoom"
            class="zoom-button"
            title="Resetar zoom (duplo clique)"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M1 4v6h6"></path>
              <path d="M23 20v-6h-6"></path>
              <path
                d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
              ></path>
            </svg>
          </button>
        </div>

        <!-- Contador de imagens -->
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
            <span class="info-label">Zoom:</span>
            <span class="info-value">{{ Math.round(zoomLevel * 100) }}%</span>
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

      // Sistema de zoom e pan
      zoomLevel: 1,
      minZoom: 0.5,
      maxZoom: 5,
      panX: 0,
      panY: 0,

      // Sistema de drag
      isDragging: false,
      dragStarted: false, // Se o drag foi realmente iniciado
      clickStartedOnImage: false, // Se o clique começou na área da imagem
      dragStartX: 0,
      dragStartY: 0,
      dragStartPanX: 0,
      dragStartPanY: 0,
      dragThreshold: 3,

      // Dimensões calculadas
      displayWidth: 0,
      displayHeight: 0,
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

    containerStyle() {
      return {
        width: `${this.displayWidth}px`,
        height: `${this.displayHeight}px`,
      };
    },

    imageStyle() {
      // Aplicar zoom e pan
      const transform = `scale(${this.zoomLevel}) translate(${this.panX}px, ${this.panY}px)`;

      return {
        width: `${this.displayWidth}px`,
        height: `${this.displayHeight}px`,
        transform: transform,
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
        this.resetZoom();
        document.body.classList.add("modal-open");
        document.addEventListener("keydown", this.handleKeyPress);
        // Adicione este listener global para mouseup
        document.addEventListener("mouseup", this.handleGlobalMouseUp);
        window.addEventListener("resize", this.calcularLimitesViewport);
      } else {
        document.body.classList.remove("modal-open");
        document.removeEventListener("keydown", this.handleKeyPress);
        // Remova o listener global
        document.removeEventListener("mouseup", this.handleGlobalMouseUp);
        window.removeEventListener("resize", this.calcularLimitesViewport);
      }
    },

    indiceAtual() {
      // Reset dimensões e zoom quando mudar de imagem
      this.imagemNaturalWidth = 0;
      this.imagemNaturalHeight = 0;
      this.resetZoom();
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
        case "+":
        case "=":
          this.zoomIn();
          break;
        case "-":
          this.zoomOut();
          break;
        case "0":
          this.resetZoom();
          break;
      }
    },

    onImageLoad(event) {
      this.imagemNaturalWidth = event.target.naturalWidth;
      this.imagemNaturalHeight = event.target.naturalHeight;
      this.calculateDisplayDimensions();
      this.resetZoom();
    },

    calcularLimitesViewport() {
      this.maxViewportWidth = window.innerWidth;
      this.maxViewportHeight = window.innerHeight;
      this.calculateDisplayDimensions();
    },

    calculateDisplayDimensions() {
      if (!this.imagemNaturalWidth || !this.imagemNaturalHeight) {
        return;
      }

      // Calcular limites baseados no viewport (deixando espaço para UI)
      const maxWidth = this.maxViewportWidth - 100; // 50px de cada lado
      const maxHeight = this.maxViewportHeight - 200; // Espaço para header e footer

      // Se a imagem é menor que os limites, mostrar no tamanho original
      if (
        this.imagemNaturalWidth <= maxWidth &&
        this.imagemNaturalHeight <= maxHeight
      ) {
        this.displayWidth = this.imagemNaturalWidth;
        this.displayHeight = this.imagemNaturalHeight;
      } else {
        // Se é maior, calcular escala mantendo proporção
        const scaleX = maxWidth / this.imagemNaturalWidth;
        const scaleY = maxHeight / this.imagemNaturalHeight;
        const scale = Math.min(scaleX, scaleY);

        this.displayWidth = Math.floor(this.imagemNaturalWidth * scale);
        this.displayHeight = Math.floor(this.imagemNaturalHeight * scale);
      }
    },

    // Métodos de zoom
    zoomIn() {
      if (this.zoomLevel < this.maxZoom) {
        const newZoom = Math.min(this.zoomLevel * 1.2, this.maxZoom);
        this.setZoom(newZoom);
      }
    },

    zoomOut() {
      if (this.zoomLevel > this.minZoom) {
        const newZoom = Math.max(this.zoomLevel / 1.2, this.minZoom);
        this.setZoom(newZoom);
      }
    },

    setZoom(newZoom) {
      const oldZoom = this.zoomLevel;
      this.zoomLevel = newZoom;

      // Se diminuindo o zoom, verificar se precisa ajustar o pan
      if (newZoom < oldZoom) {
        this.constrainPan();
      }
    },

    resetZoom() {
      this.zoomLevel = 1;
      this.panX = 0;
      this.panY = 0;
    },

    handleWheel(event) {
      event.preventDefault();

      const delta = -event.deltaY;
      const zoomFactor = delta > 0 ? 1.1 : 0.9;

      const newZoom = Math.max(
        this.minZoom,
        Math.min(this.maxZoom, this.zoomLevel * zoomFactor)
      );

      if (newZoom !== this.zoomLevel) {
        // Zoom centrado no cursor
        const rect = this.$refs.zoomContainer.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;

        // Calcular novo pan baseado na posição do cursor
        const scale = newZoom / this.zoomLevel;
        this.panX = x - (x - this.panX) * scale;
        this.panY = y - (y - this.panY) * scale;

        this.zoomLevel = newZoom;
        this.constrainPan();
      }
    },

    // Métodos de drag
    startDrag(event) {
      // Sempre prevenir propagação, mesmo em 100% de zoom
      event.stopPropagation();
      event.preventDefault();

      // Se não está com zoom, não fazer drag mas também não deixar fechar
      if (this.zoomLevel <= 1) {
        this.hasActuallyDragged = false;
        return;
      }

      this.isDragging = true;
      this.hasActuallyDragged = false;
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;
      this.dragStartPanX = this.panX;
      this.dragStartPanY = this.panY;
    },

    handleDrag(event) {
      if (!this.isDragging || this.zoomLevel <= 1) return;

      const deltaX = event.clientX - this.dragStartX;
      const deltaY = event.clientY - this.dragStartY;

      // Verificar se realmente moveu (drag real)
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      if (distance > this.dragThreshold) {
        this.dragStarted = true;
      }

      this.panX = this.dragStartPanX + deltaX / this.zoomLevel;
      this.panY = this.dragStartPanY + deltaY / this.zoomLevel;

      this.constrainPan();

      event.stopPropagation();
      event.preventDefault();
    },

    endDrag(event) {
      if (event && (this.isDragging || this.clickStartedOnImage)) {
        event.stopPropagation();
        event.preventDefault();
      }

      this.isDragging = false;

      // Manter as flags por um momento para evitar fechamento acidental
      setTimeout(() => {
        this.resetDragFlags();
      }, 50);
    },

    handleGlobalMouseUp(event) {
      if (this.isDragging || this.clickStartedOnImage) {
        event.stopPropagation();
        event.preventDefault();
        this.isDragging = false;

        // Reset após delay
        setTimeout(() => {
          this.resetDragFlags();
        }, 50);
      }
    },

    resetDragFlags() {
      this.dragStarted = false;
      this.clickStartedOnImage = false;
    },

    // Modifique também o resetZoom para garantir estado limpo:
    resetZoom() {
      this.zoomLevel = 1;
      this.panX = 0;
      this.panY = 0;
      this.resetDragFlags();
    },

    // Para lidar com cliques no overlay
    handleOverlayClick(event) {
      // Só fechar se:
      // 1. O clique foi diretamente no overlay
      // 2. O clique NÃO começou na área da imagem
      // 3. NÃO houve drag real
      if (
        event.target === event.currentTarget &&
        !this.clickStartedOnImage &&
        !this.dragStarted
      ) {
        this.fecharVisualizador();
      }

      // Reset das flags
      this.resetDragFlags();
    },

    handleOverlayMouseDown(event) {
      // Reset das flags no início de qualquer interação
      this.resetDragFlags();

      // Se clicou diretamente no overlay
      if (event.target === event.currentTarget) {
        this.clickStartedOnImage = false;
      }
    },

    handleImageAreaMouseDown(event) {
      // Marcar que o clique começou na área da imagem
      this.clickStartedOnImage = true;
      this.dragStarted = false;

      // Sempre prevenir propagação na área da imagem
      event.stopPropagation();
      event.preventDefault();

      // Só iniciar drag se zoom > 100%
      if (this.zoomLevel > 1) {
        this.isDragging = true;
        this.dragStartX = event.clientX;
        this.dragStartY = event.clientY;
        this.dragStartPanX = this.panX;
        this.dragStartPanY = this.panY;
      }
    },

    constrainPan() {
      if (this.zoomLevel <= 1) {
        this.panX = 0;
        this.panY = 0;
        return;
      }

      // Calcular limites baseados no zoom
      const scaledWidth = this.displayWidth * this.zoomLevel;
      const scaledHeight = this.displayHeight * this.zoomLevel;

      const maxPanX = (scaledWidth - this.displayWidth) / (2 * this.zoomLevel);
      const maxPanY =
        (scaledHeight - this.displayHeight) / (2 * this.zoomLevel);

      this.panX = Math.max(-maxPanX, Math.min(maxPanX, this.panX));
      this.panY = Math.max(-maxPanY, Math.min(maxPanY, this.panY));
    },
  },

  beforeUnmount() {
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", this.handleKeyPress);
    document.removeEventListener("mouseup", this.handleGlobalMouseUp);
    window.removeEventListener("resize", this.calcularLimitesViewport);
  },
};
</script>
