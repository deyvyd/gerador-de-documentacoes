<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white"
  >
    <!-- Header já possui estilo próprio, não precisa de ajuste -->
    <app-header
      title="Gerador de Documentações"
      @swap-requested="handleSwapRequested"
    >
      <template #actions>
        <theme-toggle :is-dark="isDark" @toggle="toggleTheme"></theme-toggle>
      </template>
      <template #tour-button>
        <TourGuide :steps="tourSteps" :show-button="true" ref="tourGuide" />
      </template>
    </app-header>

    <div class="container mx-auto px-4 py-8 mt-8">
      <!-- Hero Section -->
      <div class="main-card p-8 mb-8 text-center" id="title">
        <h1 class="text-3xl md:text-4xl font-bold mb-4">
          Bem-vindo ao Gerador de Documentações
        </h1>
        <p
          class="text-lg mb-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Crie documentações técnicas e de desenvolvimento com facilidade,
          seguindo os padrões estabelecidos e garantindo consistência nos seus
          projetos.
        </p>

        <!-- Animated logo -->
        <div class="flex justify-center mb-0">
          <div class="animate-pulse">
            <img
              :src="isDark ? '/static/dark-logo.svg' : '/static/light-logo.svg'"
              alt="Logo"
              class="h-32 mb-0"
            />
          </div>
        </div>
      </div>

      <!-- Cards Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        <!-- Card 1 - Documentação Técnica -->
        <div
          id="card-tec"
          class="main-card p-6 transition-all hover:shadow-lg hover:shadow-orange-500/20 cursor-pointer"
          @click="navigateTo('/tec')"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center mr-4"
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
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Registre atividades, horas trabalhadas e informações técnicas sobre
            suas solicitações de serviço (SS).
          </p>
          <div class="activities-section bg-opacity-40 p-4 rounded-lg mb-4">
            <ul class="space-y-2">
              <li class="flex items-center text-gray-700 dark:text-gray-300">
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
              <li class="flex items-center text-gray-700 dark:text-gray-300">
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
                Calcule horas e e total de PFs automaticamente
              </li>
            </ul>
          </div>
          <button class="btn btn-activities w-full">
            Acessar Gerador de Documentação Técnica
          </button>
        </div>

        <!-- Card 2 - Documentação de Desenvolvimento -->
        <div
          id="card-dev"
          class="main-card p-6 transition-all hover:shadow-lg hover:shadow-green-500/20 cursor-pointer"
          @click="navigateTo('/dev')"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mr-4"
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
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Especifique requisitos funcionais e não funcionais para suas
            solicitações de serviço (SS).
          </p>
          <div class="requirements-section bg-opacity-40 p-4 rounded-lg mb-4">
            <ul class="space-y-2">
              <li class="flex items-center text-gray-700 dark:text-gray-300">
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
              <li class="flex items-center text-gray-700 dark:text-gray-300">
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
                Adicione total de pontos de função após a contagem
              </li>
            </ul>
          </div>
          <button class="btn btn-requirements w-full">
            Acessar Gerador de Documentação de Desenvolvimento
          </button>
        </div>
      </div>

      <!-- About Section Preview -->
      <div class="flex justify-center mb-8">
        <div
          id="card-about"
          class="main-card p-6 transition-all hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer md:w-1/2"
          @click="navigateTo('/sobre')"
        >
          <div class="flex items-center mb-4">
            <div
              class="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4"
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
          <p class="text-gray-600 dark:text-gray-300 mb-4">
            Saiba mais sobre o funcionamento do sistema, tutoriais e como
            utilizá-lo para maximizar sua produtividade.
          </p>
          <button class="btn bg-blue-600 hover:bg-blue-700 text-white w-full">
            Acessar Documentação
          </button>
        </div>
      </div>

      <!-- Version Info -->
      <div class="text-center text-gray-600 dark:text-gray-500 text-sm mt-8">
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
import TourGuide from "../components/TourGuide.vue";
import appBase from "../mixins/appBase";

export default {
  name: "Inicial",
  mixins: [appBase],
  components: {
    AppHeader,
    ThemeToggle,
    InfoButton,
    TourGuide,
  },
  data() {
    return {
      tourSteps: [
        {
          element: "#title",
          popover: {
            title: "Bem-vindo!",
            description: "Esta é a introdução do sistema.",
            position: "bottom",
          },
        },
        {
          element: "#card-tec",
          popover: {
            title: "Documentação Técnica",
            description: "Clique aqui para gerar documentação técnica de SS.",
            position: "right",
          },
        },
        {
          element: "#card-dev",
          popover: {
            title: "Documentação de Desenvolvimento",
            description:
              "Clique aqui para gerar requisitos funcionais e não funcionais.",
            position: "left",
          },
        },
        {
          element: "#card-about",
          popover: {
            title: "Sobre a Aplicação",
            description: "Veja tutoriais e informações gerais da plataforma.",
            position: "top",
          },
        },
      ],
    };
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
    startTour() {
      if (this.$refs.tourGuide) {
        this.$refs.tourGuide.startTour();
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";
@import "../assets/css/colors.css";

/* Estilos adicionais para animações e efeitos */
.main-card {
  @apply bg-white dark:bg-blue-800 rounded-lg shadow-md border border-gray-200 dark:border-transparent dark:shadow px-4 py-6 transition-all duration-300;
}

.activities-section {
  @apply bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800/50;
}

.requirements-section {
  @apply bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50;
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
