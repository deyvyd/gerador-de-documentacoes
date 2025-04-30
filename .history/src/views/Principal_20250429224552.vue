<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- Header -->
    <app-header
      title="Gerador de Documentações"
      @swap-requested="handleSwapRequested"
    >
      <template #actions>
        <theme-toggle :is-dark="isDark" @toggle="toggleTheme"></theme-toggle>
        <info-button
          tooltip-title="Este sistema permite gerar documentações técnicas e de desenvolvimento:"
          :tooltip-items="[
            'Documentação Técnica - Para registro de atividades e horas',
            'Documentação de Desenvolvimento - Para especificação de requisitos',
            'Exportação em múltiplos formatos (JSON, DOCX, PDF)',
          ]"
        ></info-button>
      </template>
    </app-header>

    <div class="container mx-auto px-4 py-8 mt-8">
      <!-- Hero Section -->
      <div class="main-card p-8 mb-8 text-center">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          Bem-vindo ao Gerador de Documentações
        </h1>
        <p class="text-lg mb-8 text-gray-300 max-w-3xl mx-auto">
          Crie documentações técnicas e de desenvolvimento com facilidade,
          seguindo os padrões estabelecidos e garantindo consistência nos seus
          projetos.
        </p>

        <!-- Animated logo -->
        <div class="flex justify-center mb-8">
          <div class="animate-pulse">
            <img src="/static/dark-logo.svg" alt="Logo" class="h-32 mb-4" />
          </div>
        </div>
      </div>

      <!-- Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <!-- Card 1 - Documentação Técnica -->
        <div
          class="main-card p-6 transition-all hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer"
          @click="navigateTo('/tec')"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 class="text-xl font-semibold">Documentação Técnica</h2>
          </div>
          <p class="text-gray-300 mb-4">
            Registre atividades, horas trabalhadas e informações técnicas sobre
            suas solicitações de serviço (SS).
          </p>
          <div class="activities-section bg-opacity-40 p-4 rounded-lg mb-4">
            <ul class="space-y-2">
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Gerencie atividades
              </li>
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-orange-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Calcule horas e esforço
              </li>
            </ul>
          </div>
          <button class="btn btn-activities w-full">
            Acessar Gerador de Documentação Técnica
          </button>
        </div>

        <!-- Card 2 - Documentação de Desenvolvimento -->
        <div
          class="main-card p-6 transition-all hover:shadow-lg hover:shadow-green-500/20 cursor-pointer"
          @click="navigateTo('/dev')"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mr-4"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                />
              </svg>
            </div>
            <h2 class="text-xl font-semibold">
              Documentação de Desenvolvimento
            </h2>
          </div>
          <p class="text-gray-300 mb-4">
            Especifique requisitos funcionais e não funcionais para suas
            solicitações de serviço (SS).
          </p>
          <div class="requirements-section bg-opacity-40 p-4 rounded-lg mb-4">
            <ul class="space-y-2">
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Gerencie Requisitos Funcionais e Não Funcionais
              </li>
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-green-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>
                Adicione o total de pontos de função após contagem
              </li>
            </ul>
          </div>
          <button class="btn btn-requirements w-full">
            Acessar Gerador de Documentação de Desenvolvimento
          </button>
        </div>
      </div>

      <!-- About Section Preview -->
      <div
        class="main-card p-6 transition-all hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer mb-8"
        @click="navigateTo('/sobre')"
      >
        <div class="flex items-center mb-4">
          <div
            class="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mr-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
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
          </div>
          <h2 class="text-xl font-semibold">Sobre a Aplicação</h2>
        </div>
        <p class="text-gray-300 mb-4">
          Saiba mais sobre o funcionamento do sistema, tutoriais e como
          utilizá-lo para maximizar sua produtividade.
        </p>
        <button class="btn bg-purple-600 hover:bg-purple-700 text-white w-full">
          Acessar Documentação
        </button>
      </div>

      <!-- Version Info -->
      <div class="text-center text-gray-500 text-sm mt-8">
        <p>Versão 1.0.0</p>
        <p>© 2025 Gerador de Documentações</p>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import ThemeToggle from "../components/ThemeToggle.vue";
import InfoButton from "../components/InfoButton.vue";
import appBase from "../mixins/appBase";

export default {
  name: "Principal",
  mixins: [appBase],
  components: {
    AppHeader,
    ThemeToggle,
    InfoButton,
  },
  methods: {
    navigateTo(route) {
      if (route === this.$route.path) return;

      // Se houver dados preenchidos, mostrar confirmação antes de navegar
      if (this.hasFilledData()) {
        this.mostrarModalMensagem(
          "Trocar de página",
          "Existem dados não salvos. Deseja sair desta página? Todos os dados não salvos serão perdidos.",
          () => {
            this.$router.push(route);
          }
        );
      } else {
        this.$router.push(route);
      }
    },
    handleSwapRequested(targetUrl) {
      this.navigateTo(targetUrl);
    },
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";
@import "../assets/css/colors.css";

/* Estilos adicionais para animações e efeitos */
.main-card {
  @apply bg-blue-900 rounded-lg shadow px-4 py-6 transition-all duration-300;
}

.activities-section {
  @apply bg-orange-900/20 border border-orange-800/50;
}

.requirements-section {
  @apply bg-green-900/20 border border-green-800/50;
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(0.98);
  }
}
</style>
