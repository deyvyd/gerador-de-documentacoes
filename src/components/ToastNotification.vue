<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="['toast', toast.type]"
      >
        {{ toast.message }}
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "ToastNotification",
  props: {
    mensagens: {
      type: Array,
      default: () => [],
      // Cada mensagem deve ter: id, tipo, texto, e opcionalmente titulo, duração e tamanho
    },
    posicao: {
      type: String,
      default: "top-right", // top-right, top-left, bottom-right, bottom-left, top-center, bottom-center
      validator: (value) =>
        [
          "top-right",
          "top-left",
          "bottom-right",
          "bottom-left",
          "top-center",
          "bottom-center",
        ].includes(value),
    },
    duracaoPadrao: {
      type: Number,
      default: 5000, // Duração em ms
    },
    mostrarIcone: {
      type: Boolean,
      default: true,
    },
    mostrarFechar: {
      type: Boolean,
      default: true,
    },
    mostrarProgresso: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["fechar"],
  data() {
    return {
      // Mapeia os temporizadores para remoção automática de toast
      timers: {},
      // Mapeia os percentuais de progresso para cada toast
      progressos: {},
    };
  },
  computed: {
    // Detectar o tema claro/escuro
    isDarkMode() {
      return document.documentElement.classList.contains("dark");
    },

    // Classes para o container de toast com base na posição
    containerClasses() {
      return `toast-container ${this.posicao}`;
    },
  },
  watch: {
    // Observa alterações nas mensagens para iniciar temporizadores
    mensagens: {
      handler(novasMensagens, antigasMensagens) {
        // Inicia temporizadores para novas mensagens
        novasMensagens.forEach((mensagem) => {
          if (!this.timers[mensagem.id] && mensagem.duracao !== 0) {
            this.iniciarTemporizador(mensagem);
          }
        });

        // Limpa temporizadores de mensagens removidas
        const idsAtuais = novasMensagens.map((m) => m.id);
        Object.keys(this.timers).forEach((id) => {
          if (!idsAtuais.includes(id)) {
            clearInterval(this.timers[id]);
            delete this.timers[id];
            delete this.progressos[id];
          }
        });
      },
      deep: true,
    },
  },
  methods: {
    // Inicia um temporizador para fechar automaticamente o toast
    iniciarTemporizador(mensagem) {
      const duracao = mensagem.duracao || this.duracaoPadrao;

      if (duracao <= 0) return; // Não expira automaticamente

      // Inicializa progresso em 100%
      this.progressos[mensagem.id] = 100;

      const intervalo = 100; // Atualiza a cada 100ms
      const passos = duracao / intervalo;
      let etapaAtual = 0;

      this.timers[mensagem.id] = setInterval(() => {
        etapaAtual++;

        // Atualiza o progresso
        const novoProgresso = 100 - (etapaAtual / passos) * 100;
        this.progressos[mensagem.id] = Math.max(0, novoProgresso);

        // Remove o toast quando o tempo acabar
        if (etapaAtual >= passos) {
          clearInterval(this.timers[mensagem.id]);
          delete this.timers[mensagem.id];
          this.fecharToast(mensagem.id);
        }
      }, intervalo);
    },

    // Configurações baseadas no tipo de mensagem
    getToastConfig(tipo) {
      // Tipos válidos: note, success, error, warning, caution, important
      const tipoValido = [
        "note",
        "success",
        "error",
        "warning",
        "caution",
        "important",
      ].includes(tipo)
        ? tipo
        : "note";

      const icons = {
        note: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>`,
        success: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                   <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                   <polyline points="22 4 12 14.01 9 11.01"></polyline>
                 </svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                 <circle cx="12" cy="12" r="10"></circle>
                 <line x1="15" y1="9" x2="9" y2="15"></line>
                 <line x1="9" y1="9" x2="15" y2="15"></line>
               </svg>`,
        warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                   <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
                   <line x1="12" y1="9" x2="12" y2="13"></line>
                   <line x1="12" y1="17" x2="12.01" y2="17"></line>
                 </svg>`,
        caution: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                   <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
                   <line x1="12" y1="8" x2="12" y2="12"></line>
                   <line x1="12" y1="16" x2="12.01" y2="16"></line>
                 </svg>`,
        important: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-icon">
                      <path d="M19 4H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3l3 3 3-3h5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path>
                      <line x1="12" y1="7" x2="12" y2="11"></line>
                      <line x1="12" y1="14" x2="12.01" y2="14"></line>
                    </svg>`,
      };

      return {
        icon: icons[tipoValido],
        cssClass: `toast-${tipoValido}`,
      };
    },

    // Fechar um toast específico
    fecharToast(id) {
      // Limpar o temporizador associado
      if (this.timers[id]) {
        clearInterval(this.timers[id]);
        delete this.timers[id];
      }

      // Remover progresso
      if (this.progressos[id]) {
        delete this.progressos[id];
      }

      this.$emit("fechar", id);
    },

    // Pausar o temporizador (ao passar o mouse)
    pausarTemporizador(id) {
      if (this.timers[id]) {
        clearInterval(this.timers[id]);
        delete this.timers[id];
      }
    },

    // Retomar o temporizador (ao remover o mouse)
    retomarTemporizador(mensagem) {
      if (!this.timers[mensagem.id] && mensagem.duracao !== 0) {
        this.iniciarTemporizador(mensagem);
      }
    },

    // Obter classes do toast, incluindo as variantes de tamanho
    getToastClasses(mensagem) {
      const config = this.getToastConfig(mensagem.tipo);
      let classes = [`toast-notification ${config.cssClass}`];

      // Adicionar classe de tamanho se especificado
      if (mensagem.tamanho === "sm") {
        classes.push("toast-sm");
      } else if (mensagem.tamanho === "lg") {
        classes.push("toast-lg");
      }

      return classes.join(" ");
    },
  },
};
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
