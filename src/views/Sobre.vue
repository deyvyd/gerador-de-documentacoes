blue
<template>
  <div class="background-container min-h-screen text-white">
    <!-- Header -->
    <app-header
      title="Sobre o Gerador de Documentações"
      default-state="collapsed"
      @swap-requested="handleSwapRequested"
    >
      <template #actions>
        <theme-toggle :is-dark="isDark" @toggle="toggleTheme"></theme-toggle>
      </template>
      <template #tour-button>
        <TourGuide
          :steps="tourSteps"
          :show-button="true"
          :auto-start="true"
          tour-id="sobre-page"
          ref="tourGuide"
          @tour-completed="onTourCompleted"
        />
      </template>
    </app-header>

    <!-- Contexto, Objetivo e Benefícios -->
    <section
      class="info-card mb-8 p-6 border border-blue-300 dark:border-gray-700 rounded-xl shadow-md"
    >
      <!-- Contexto -->
      <div class="mb-8">
        <div class="flex items-center mb-4">
          <div class="p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-700 dark:text-blue-200">
            Contexto
          </h2>
        </div>
        <div class="pl-11">
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            A documentação de projetos de tecnologia é uma etapa crucial no
            processo de desenvolvimento de software que frequentemente enfrenta
            desafios de padronização e eficiência. Antes da criação deste
            sistema, equipes gastavam horas significativas redigindo documentos
            que muitas vezes tinham padrões inconsistentes devido a erros comuns
            em trabalhos manuais repetitivos.
          </p>
        </div>
      </div>

      <!-- Objetivo -->
      <div class="mb-8">
        <div class="flex items-center mb-4">
          <div class="p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="CurrentColor"
              viewBox="0 0 256 256"
              class="text-blue-600 dark:text-blue-400"
            >
              <path
                d="M221.87,83.16A104.1,104.1,0,1,1,195.67,49l22.67-22.68a8,8,0,0,1,11.32,11.32l-96,96a8,8,0,0,1-11.32-11.32l27.72-27.72a40,40,0,1,0,17.87,31.09,8,8,0,1,1,16-.9,56,56,0,1,1-22.38-41.65L184.3,60.39a87.88,87.88,0,1,0,23.13,29.67,8,8,0,0,1,14.44-6.9Z"
              ></path>
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-700 dark:text-blue-200">
            Objetivo
          </h2>
        </div>
        <div class="pl-11">
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            O Gerador de Documentações foi desenvolvido para padronizar e
            automatizar o processo de criação de documentos técnicos e de
            desenvolvimento para Solicitações de Serviço (SS). O sistema oferece
            interfaces específicas para dois tipos principais de documentação:
          </p>
          <ul class="list-none space-y-3 mb-4">
            <li class="flex items-start">
              <div
                class="icon-box bg-orange-100 dark:bg-orange-900 p-1 rounded-lg mr-2 mt-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-orange-600 dark:text-orange-400"
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
              <div>
                <span class="font-semibold text-orange-600 dark:text-orange-400"
                  >Documentação Técnica:</span
                >
                <span class="text-gray-700 dark:text-gray-300">
                  Para registro detalhado de atividades realizadas, horas
                  trabalhadas e cálculos de pontos de função.
                </span>
              </div>
            </li>
            <li class="flex items-start">
              <div
                class="icon-box bg-green-100 dark:bg-green-900 p-1 rounded-lg mr-2 mt-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-green-600 dark:text-green-400"
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
              <div>
                <span class="font-semibold text-green-600 dark:text-green-400"
                  >Documentação de Desenvolvimento:</span
                >
                <span class="text-gray-700 dark:text-gray-300">
                  Para especificação de requisitos funcionais e não funcionais,
                  incluindo detalhes de implementação e integração com banco de
                  dados.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Benefícios -->
      <div>
        <div class="flex items-center mb-4">
          <div class="p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h2 class="text-2xl font-semibold text-gray-700 dark:text-blue-200">
            Benefícios
          </h2>
        </div>

        <div class="pl-11">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="benefit-card">
              <div class="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
                <h3
                  class="text-lg font-semibold text-gray-700 dark:text-blue-100"
                >
                  Padronização
                </h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                Garante que todos os documentos sigam o mesmo padrão de formato
                e conteúdo, facilitando revisões e aprovações.
              </p>
            </div>
            <div class="benefit-card">
              <div class="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                <h3
                  class="text-lg font-semibold text-gray-700 dark:text-blue-100"
                >
                  Eficiência
                </h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                Reduz o tempo gasto na criação de documentação em até 60%,
                permitindo que as equipes foquem no desenvolvimento.
              </p>
            </div>
            <div class="benefit-card">
              <div class="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
                  />
                </svg>
                <h3
                  class="text-lg font-semibold text-gray-700 dark:text-blue-100"
                >
                  Versatilidade
                </h3>
              </div>
              <p class="text-gray-700 dark:text-gray-300">
                Exportação em múltiplos formatos (JSON, DOCX, PDF) para atender
                diferentes necessidades organizacionais.
              </p>
            </div>
            <div class="benefit-card">
              <div class="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
                <h3
                  class="text-lg font-semibold text-gray-700 dark:text-blue-100"
                >
                  Rastreabilidade
                </h3>
              </div>
              <p id="guia-campos" class="text-gray-700 dark:text-gray-300">
                Mantém histórico de criação e modificação, permitindo acompanhar
                a evolução dos documentos ao longo do tempo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Abas para mostrar os campos de cada tela -->
    <section
      class="tabs-card mt-8 p-6 border border-blue-300 dark:border-gray-700 rounded-xl shadow-md"
    >
      <div class="flex items-center justify-center mb-4">
        <div
          class="icon-box bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-purple-600 dark:text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <h2
          class="text-2xl font-semibold mb-0 text-center text-gray-700 dark:text-purple-200"
        >
          Guia de Campos por Tipo de Documentação
        </h2>
      </div>

      <div class="mb-4">
        <div
          class="tab-navigation bg-gray-100 dark:bg-gray-800 rounded-lg p-1 flex"
        >
          <button
            v-for="(tab, index) in documentacaoTabs"
            :key="index"
            @click="tabAtiva = index"
            class="tab-button flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 text-center"
            :class="
              tabAtiva === index
                ? 'bg-white dark:bg-gray-700 text-purple-700 dark:text-purple-300 shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-300'
            "
          >
            <div class="flex items-center justify-center">
              <svg
                v-if="index === 0"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
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
              <svg
                v-if="index === 1"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
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
              <svg
                v-if="index === 2"
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              {{ tab.nome }}
            </div>
          </button>
        </div>

        <!-- Conteúdo da aba Documentação Técnica -->
        <div v-if="tabAtiva === 0" class="campos-container mt-6">
          <div class="flex items-center mb-4">
            <div
              class="icon-box bg-orange-100 dark:bg-orange-900 p-2 rounded-lg mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-orange-600 dark:text-orange-400"
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
            <h3
              class="text-xl font-semibold text-orange-600 dark:text-orange-400"
            >
              Documentação Técnica
            </h3>
          </div>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            Esta documentação é voltada para o registro de atividades técnicas
            realizadas em uma Solicitação de Serviço (SS). A seguir, a descrição
            de cada campo:
          </p>

          <div
            class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow"
          >
            <table class="w-full base-table">
              <thead>
                <tr>
                  <th class="w-1/5">Campo</th>
                  <th class="w-1/6">Tipo</th>
                  <th class="w-1/12">Obrigatório</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <!-- Campos de Informações Básicas -->
                <tr>
                  <td
                    colspan="4"
                    class="bg-orange-900 bg-opacity-30 font-semibold"
                  >
                    Informações Básicas da SS
                  </td>
                </tr>
                <tr>
                  <td>Número SS</td>
                  <td>Texto (numérico)</td>
                  <td class="text-center">✓</td>
                  <td>
                    Número identificador da SS, composto por 3 dígitos (ex: 001)
                  </td>
                </tr>
                <tr>
                  <td>Ano SS</td>
                  <td>Número</td>
                  <td class="text-center">✓</td>
                  <td>Ano da SS (ex: 2025)</td>
                </tr>
                <tr>
                  <td>Título</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Título informado no e-mail de abertura da SS</td>
                </tr>
                <tr>
                  <td>Descrição</td>
                  <td>Texto (longo)</td>
                  <td class="text-center">✓</td>
                  <td>
                    Descrição das ações realizadas para atualização do sistema
                    para um objetivo específico
                  </td>
                </tr>
                <tr>
                  <td>Data de Início</td>
                  <td>Data</td>
                  <td class="text-center">✓</td>
                  <td>Data de início das atividades</td>
                </tr>
                <tr>
                  <td>Data de Fim</td>
                  <td>Data</td>
                  <td class="text-center">✓</td>
                  <td>Data de conclusão das atividades</td>
                </tr>
                <tr>
                  <td>Link do board</td>
                  <td>URL</td>
                  <td class="text-center"></td>
                  <td>
                    Link para o board do projeto no GitLab ou outra ferramenta
                  </td>
                </tr>
                <tr>
                  <td>Autor(es)</td>
                  <td>Seleção múltipla</td>
                  <td class="text-center">✓</td>
                  <td>Nome e iniciais do(s) autor(es) do documento</td>
                </tr>

                <!-- Campos de Atividades -->
                <tr>
                  <td
                    colspan="4"
                    class="bg-orange-900 bg-opacity-30 font-semibold"
                  >
                    Gerenciar Atividades
                  </td>
                </tr>
                <tr>
                  <td>Atividade</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Nome da atividade realizada</td>
                </tr>
                <tr>
                  <td>Estimativa de horas</td>
                  <td>Número</td>
                  <td class="text-center">✓</td>
                  <td>Quantidade de horas dedicadas à atividade</td>
                </tr>
                <tr>
                  <td>Total de horas</td>
                  <td>Cálculo</td>
                  <td class="text-center">-</td>
                  <td>Soma automática das horas de todas as atividades</td>
                </tr>
                <tr>
                  <td>Quantidade de PF</td>
                  <td>Cálculo</td>
                  <td class="text-center">-</td>
                  <td>
                    Cálculo automático de pontos de função: (horas / 10) * (250
                    / 100)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Conteúdo da aba Documentação de Desenvolvimento -->
        <div v-if="tabAtiva === 1" class="campos-container mt-6">
          <div class="flex items-center mb-4">
            <div
              class="icon-box bg-green-100 dark:bg-green-900 p-2 rounded-lg mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-green-600 dark:text-green-400"
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
            <h3
              class="text-xl font-semibold text-green-600 dark:text-green-400"
            >
              Documentação de Desenvolvimento
            </h3>
          </div>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            Esta documentação é voltada para a especificação de requisitos de
            desenvolvimento em uma Solicitação de Serviço (SS). A seguir, a
            descrição de cada campo:
          </p>

          <div
            class="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow"
          >
            <table class="w-full base-table">
              <thead>
                <tr>
                  <th class="w-1/5">Campo</th>
                  <th class="w-1/6">Tipo</th>
                  <th class="w-1/12">Obrigatório</th>
                  <th>Descrição</th>
                </tr>
              </thead>
              <tbody>
                <!-- Campos de Informações Básicas -->
                <tr>
                  <td
                    colspan="4"
                    class="bg-green-900 bg-opacity-30 font-semibold"
                  >
                    Informações Básicas da SS
                  </td>
                </tr>
                <tr>
                  <td>Número SS</td>
                  <td>Texto (numérico)</td>
                  <td class="text-center">✓</td>
                  <td>
                    Número identificador da SS, composto por 3 dígitos (ex: 001)
                  </td>
                </tr>
                <tr>
                  <td>Ano SS</td>
                  <td>Número</td>
                  <td class="text-center">✓</td>
                  <td>Ano da SS (ex: 2025)</td>
                </tr>
                <tr>
                  <td>Título</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Título informado no e-mail de abertura da SS</td>
                </tr>
                <tr>
                  <td>Descrição</td>
                  <td>Texto (longo)</td>
                  <td class="text-center">✓</td>
                  <td>
                    Descrição das ações realizadas para atualização do sistema
                    para um objetivo específico
                  </td>
                </tr>
                <tr>
                  <td>Data de Início</td>
                  <td>Data</td>
                  <td class="text-center">✓</td>
                  <td>Data de início das atividades</td>
                </tr>
                <tr>
                  <td>Data de Fim</td>
                  <td>Data</td>
                  <td class="text-center">✓</td>
                  <td>Data de conclusão das atividades</td>
                </tr>
                <tr>
                  <td>Link do board</td>
                  <td>URL</td>
                  <td class="text-center"></td>
                  <td>
                    Link para o board do projeto no GitLab ou outra ferramenta
                  </td>
                </tr>
                <tr>
                  <td>Autor(es)</td>
                  <td>Seleção múltipla</td>
                  <td class="text-center">✓</td>
                  <td>Nome e iniciais do(s) autor(es) do documento</td>
                </tr>

                <!-- Campos de Requisitos Funcionais -->
                <tr>
                  <td
                    colspan="4"
                    class="bg-green-900 bg-opacity-30 font-semibold"
                  >
                    Requisitos Funcionais
                  </td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>Automático</td>
                  <td class="text-center">-</td>
                  <td>Identificador automático no formato RF-XX (ex: RF-01)</td>
                </tr>
                <tr>
                  <td>Título</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Título do requisito funcional</td>
                </tr>
                <tr>
                  <td>Tipo</td>
                  <td>Seleção</td>
                  <td class="text-center">✓</td>
                  <td>Tipo do requisito: Alteração, Inclusão ou Remoção</td>
                </tr>
                <tr>
                  <td>Local</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Local de implementação no sistema</td>
                </tr>
                <tr>
                  <td>Usuário</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Usuário alvo do requisito</td>
                </tr>
                <tr>
                  <td>Perfil</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Perfil de acesso necessário</td>
                </tr>
                <tr>
                  <td>Imagens</td>
                  <td>Upload múltiplo</td>
                  <td class="text-center"></td>
                  <td>Screenshots ou diagramas relacionados</td>
                </tr>
                <tr>
                  <td>Descrição</td>
                  <td>Texto rico</td>
                  <td class="text-center">✓</td>
                  <td>Descrição detalhada do requisito funcional</td>
                </tr>
                <tr>
                  <td>Regras de validações dos campos</td>
                  <td>Texto rico</td>
                  <td class="text-center"></td>
                  <td>Regras de validação aplicáveis aos campos</td>
                </tr>
                <tr>
                  <td>Regras de negócio</td>
                  <td>Texto rico</td>
                  <td class="text-center"></td>
                  <td>Regras de negócio relevantes para o requisito</td>
                </tr>
                <tr>
                  <td>Mudança de banco</td>
                  <td>Texto rico</td>
                  <td class="text-center"></td>
                  <td>
                    Descrição das alterações necessárias no banco de dados
                  </td>
                </tr>

                <!-- Campos de Requisitos Não Funcionais -->
                <tr>
                  <td
                    colspan="4"
                    class="bg-green-900 bg-opacity-30 font-semibold"
                  >
                    Requisitos Não Funcionais
                  </td>
                </tr>
                <tr>
                  <td>ID</td>
                  <td>Automático</td>
                  <td class="text-center">-</td>
                  <td>
                    Identificador automático no formato RNF-XX (ex: RNF-01)
                  </td>
                </tr>
                <tr>
                  <td>Título</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Título do requisito não funcional</td>
                </tr>
                <tr>
                  <td>Descrição</td>
                  <td>Texto</td>
                  <td class="text-center">✓</td>
                  <td>Descrição do requisito não funcional</td>
                </tr>

                <!-- Campos de Pontos de Função -->
                <tr>
                  <td
                    colspan="4"
                    class="bg-green-900 bg-opacity-30 font-semibold"
                  >
                    Pontos de Função
                  </td>
                </tr>
                <tr>
                  <td>Total de Pontos de Função</td>
                  <td>Número (decimal)</td>
                  <td class="text-center"></td>
                  <td>Total de pontos de função após análise e contagem</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Conteúdo da aba Formatos de Exportação -->
        <div v-if="tabAtiva === 2" class="campos-container mt-6">
          <div class="flex items-center mb-4">
            <div
              class="icon-box bg-purple-100 dark:bg-purple-900 p-2 rounded-lg mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 text-purple-600 dark:text-purple-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </div>
            <h3
              class="text-xl font-semibold text-purple-600 dark:text-purple-400"
            >
              Formatos de Exportação
            </h3>
          </div>
          <p class="mb-4 text-gray-700 dark:text-gray-300">
            O sistema permite exportar as documentações em diferentes formatos
            para atender a diversas necessidades. Confira as características de
            cada formato:
          </p>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              class="format-card bg-white dark:bg-gray-800 p-5 rounded-lg border border-purple-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div class="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 mr-3 text-purple-600 dark:text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
                  JSON
                </h4>
              </div>
              <ul
                class="list-disc pl-10 space-y-1 text-sm text-gray-700 dark:text-gray-300"
              >
                <li>Formato padrão sempre gerado</li>
                <li>Ideal para importação posterior</li>
                <li>Facilita integração com outros sistemas</li>
                <li>Preserva todos os dados estruturados</li>
                <li>Tamanho reduzido de arquivo</li>
              </ul>
            </div>

            <div
              class="format-card bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div class="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-8 w-8 mr-3 text-blue-600 dark:text-blue-400"
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
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
                  DOCX
                </h4>
              </div>
              <ul
                class="list-disc pl-10 space-y-1 text-sm text-gray-700 dark:text-gray-300"
              >
                <li>Compatível com Microsoft Word</li>
                <li>Documento formatado para impressão</li>
                <li>Inclui estilos corporativos padronizados</li>
                <li>Permite edições posteriores</li>
                <li>Ideal para revisão e aprovação</li>
              </ul>
            </div>

            <div
              class="format-card bg-white dark:bg-gray-800 p-5 rounded-lg border border-red-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div class="flex items-center mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="mr-3 text-red-600 dark:text-red-400"
                  height="24"
                  width="24"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="CurrentColor"
                    d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"
                  />
                </svg>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white">
                  PDF
                </h4>
              </div>
              <ul
                class="list-disc pl-10 space-y-1 text-sm text-gray-700 dark:text-gray-300"
              >
                <li>Formato final para distribuição</li>
                <li>Preserva formatação em qualquer dispositivo</li>
                <li>Não permite alterações acidentais</li>
                <li>Ideal para arquivamento</li>
                <li>Pode ser assinado digitalmente</li>
              </ul>
            </div>
          </div>

          <div
            class="mt-3 border-l-4 border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-750/20 p-3 rounded-r-md"
          >
            <h4
              class="font-semibold text-sm mb-1 flex items-center text-blue-700 dark:text-blue-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                />
              </svg>
              Observação importante
            </h4>
            <p class="text-sm text-blue-800 dark:text-white">
              Ao exportar a documentação, você pode selecionar qualquer
              combinação de formatos DOCX e PDF, além do JSON que é sempre
              gerado. Se apenas o formato JSON for selecionado, o sistema não
              realiza a validação completa dos campos, o que é útil para salvar
              um rascunho do trabalho em andamento.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Informações de Contato e Versão -->
    <div
      class="info-system-card p-6 mb-8 mt-8 border border-blue-300 dark:border-gray-700 rounded-xl shadow-md"
    >
      <div class="flex items-center justify-center mb-6">
        <div class="p-2 rounded-lg mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-600 dark:text-blue-400"
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
        <h2
          class="text-xl font-semibold text-center text-gray-800 dark:text-blue-100"
        >
          Informações do Sistema
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          class="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-200 dark:border-gray-700 shadow-sm"
        >
          <h3
            class="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Suporte
          </h3>
          <p class="mb-3 text-gray-700 dark:text-gray-300">
            Para dúvidas, sugestões ou relato de problemas, entre em contato
            com:
          </p>
          <ul class="space-y-3">
            <li
              class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-gray-800 dark:text-gray-200"
                >deyvyd.moura@logap.com.br</span
              >
            </li>
            <li
              class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span class="text-gray-800 dark:text-gray-200"
                >Horário de atendimento: Seg-Sex, 8h às 18h</span
              >
            </li>
          </ul>
        </div>

        <div
          class="bg-white dark:bg-gray-800 p-5 rounded-lg border border-blue-200 dark:border-gray-700 shadow-sm"
        >
          <h3
            class="text-lg font-semibold mb-3 flex items-center text-gray-800 dark:text-blue-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
              />
            </svg>
            Informações Técnicas
          </h3>
          <ul class="space-y-3">
            <li
              class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
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
              <span class="text-gray-800 dark:text-gray-200"
                >Versão: 1.0.0</span
              >
            </li>
            <li
              class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span class="text-gray-800 dark:text-gray-200"
                >Data da última atualização: 18 de Maio, 2025</span
              >
            </li>
            <li
              class="flex items-center bg-blue-50 dark:bg-blue-900/30 p-2 rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
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
              <span class="text-gray-800 dark:text-gray-200"
                >Desenvolvido com: Vue.js, Tailwind CSS e Python (Backend)</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Perguntas Frequentes -->
    <div
      class="faq-card p-6 mb-8 border border-blue-300 dark:border-gray-700 rounded-xl shadow-md"
    >
      <div id="faq-section">
        <div class="flex items-center justify-center mb-6">
          <div class="p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2
            class="text-xl font-semibold text-center text-gray-800 dark:text-blue-100"
          >
            Perguntas Frequentes
          </h2>
        </div>

        <div class="space-y-4">
          <!-- Pergunta 1: Sobre a funcionalidade do Tour -->
          <FaqItem
            question="Como funciona o tour guiado na aplicação?"
            :isDark="isDark"
            infoBoxType="tip"
          >
            <p>
              O tour guiado é uma funcionalidade que ajuda novos usuários a
              conhecerem as principais áreas e funcionalidades de cada tela do
              sistema:
            </p>

            <ul class="list-disc pl-5 mt-2 space-y-1">
              <li>
                Ao acessar cada tela pela primeira vez, o tour inicia
                automaticamente
              </li>
              <li>
                O sistema salva no navegador quais tours você já visualizou
              </li>
              <li>
                Se precisar rever o tour de qualquer tela a qualquer momento,
                basta clicar no ícone
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 inline-block"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"
                  />
                </svg>
                no canto superior direito
              </li>
            </ul>

            <div
              class="mt-3 bg-blue-300/20 dark:bg-blue-750/20 p-3 rounded-lg flex items-start"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400 mt-1"
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
              <p>
                Cada tela possui seu próprio tour personalizado, destacando as
                funcionalidades específicas disponíveis naquela parte do
                sistema.
              </p>
            </div>

            <template #info-box>
              Durante o tour, você pode navegar entre os passos usando os botões
              de "Próximo" e "Anterior", ou interromper o tour a qualquer
              momento clicando no botão "Fechar" ou pressionando a tecla ESC.
            </template>
          </FaqItem>

          <!-- Pergunta 2: Sobre o contrato utilizado -->
          <FaqItem
            question="É possível selecionar diferentes contratos para gerar os documentos?"
            :isDark="isDark"
            infoBoxType="note"
          >
            <p>
              Não. Todos os documentos são gerados usando o contrato .Net como
              padrão:
            </p>
            <div
              class="mt-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400"
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
              <p class="font-medium">Contrato: CTNI-0534-2021.00</p>
            </div>
          </FaqItem>

          <!-- Pergunta 3: Cálculo de dias úteis -->
          <FaqItem
            question="Como é calculado o período entre as datas de início e fim?"
            :isDark="isDark"
            layout="custom"
          >
            <template #custom-layout>
              <p>
                O sistema calcula o período entre a data de início e a data de
                fim considerando:
              </p>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div
                  class="bg-green-50 dark:bg-green-900/20 rounded-lg p-3 flex flex-col items-center border border-green-200 dark:border-green-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 mb-2 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h4 class="font-semibold mb-1 text-center">Dias de semana</h4>
                  <p class="text-sm text-center">
                    Segunda a sexta-feira são contabilizados
                  </p>
                </div>

                <div
                  class="bg-red-50 dark:bg-red-900/20 rounded-lg p-3 flex flex-col items-center border border-red-200 dark:border-red-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 mb-2 text-red-600 dark:text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h4 class="font-semibold mb-1 text-center">
                    Finais de semana
                  </h4>
                  <p class="text-sm text-center">
                    Sábados e domingos são excluídos
                  </p>
                </div>

                <div
                  class="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3 flex flex-col items-center border border-yellow-200 dark:border-yellow-800"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 mb-2 text-yellow-600 dark:text-yellow-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <h4 class="font-semibold mb-1 text-center">Feriados</h4>
                  <p class="text-sm text-center">
                    Não são considerados no cálculo atual
                  </p>
                </div>
              </div>
            </template>
          </FaqItem>

          <!-- Pergunta 4: Campos obrigatórios e requisitos mínimos -->
          <FaqItem
            question="Quais são os requisitos mínimos para gerar cada tipo de documentação?"
            :isDark="isDark"
            infoBoxType="tip"
          >
            <p>
              Cada tipo de documentação possui requisitos mínimos que devem ser
              preenchidos. Além dos campos obrigatórios básicos, é necessário:
            </p>

            <ul class="list-disc pl-5 mt-2 space-y-2">
              <li>
                <span class="font-semibold text-orange-600 dark:text-orange-400"
                  >Documentação Técnica:</span
                >
                <span> Deve conterpelo menos uma atividade cadastrada.</span>
              </li>
              <li>
                <span class="font-semibold text-green-600 dark:text-green-400"
                  >Documentação de Desenvolvimento:</span
                >
                <span>
                  Deve conter pelo menos um requisito funcional
                  cadastrado.</span
                >
              </li>
            </ul>

            <template #info-box>
              Se você precisa salvar seu progresso mas ainda não preencheu todos
              os campos obrigatórios, gere apenas o arquivo JSON (sem selecionar
              DOCX ou PDF). Neste caso, o sistema não validará os campos
              obrigatórios, permitindo salvar documentos incompletos.
            </template>
          </FaqItem>

          <!-- Pergunta 5: Preenchimento de requisitos funcionais -->
          <FaqItem
            question="Como preencher os campos de requisitos funcionais corretamente?"
            :isDark="isDark"
            layout="custom"
          >
            <template #custom-layout>
              <p>
                Ao cadastrar requisitos funcionais, observe estas orientações
                importantes:
              </p>

              <div
                class="mt-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3"
              >
                <h4
                  class="font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center"
                >
                  Requisitos que são rotinas ou processos
                </h4>
                <p>
                  Quando o requisito for uma rotina ou processo (sem interface
                  específica), preencha os campos obrigatórios <b>Local</b>,
                  <b>Usuário</b> e <b>Perfil</b> com o valor "<code>--</code>"
                  (dois hífens).
                </p>
              </div>

              <div
                class="mt-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-3"
              >
                <h4
                  class="font-semibold mb-2 text-gray-700 dark:text-gray-300 flex items-center"
                >
                  Campos de regras e banco de dados
                </h4>
                <p>
                  Se os campos de regras de validação, regras de negócio ou
                  alterações de banco de dados forem deixados vazios, o
                  documento será gerado com uma mensagem padrão informando que
                  não houve alteração naquela parte.
                </p>
              </div>

              <InfoBox type="tip" :isDark="isDark" class="mt-3">
                <div class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-5 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  <span>
                    Para facilitar a criação de múltiplos requisitos com
                    atributos semelhantes, você pode fixar valores padrão para
                    os campos
                    <b>Tipo</b>, <b>Local</b>, <b>Perfil</b> e
                    <b>Usuário</b> clicando no ícone de cadeado ao lado de cada
                    campo. Para desativar, basta clicar novamente no mesmo
                    ícone.
                  </span>
                </div>
              </InfoBox>
            </template>
          </FaqItem>

          <!-- Pergunta 6: Como reordenar requisitos -->
          <FaqItem
            question="Como reordenar requisitos funcionais ou não funcionais?"
            :isDark="isDark"
            layout="multi-column"
          >
            <template #columns>
              <div
                class="bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 p-3"
              >
                <ol class="list-decimal pl-4 space-y-1">
                  <li>
                    Posicione o cursor sobre a linha do requisito que deseja
                    mover
                  </li>
                  <li>Clique e mantenha pressionado o botão do mouse</li>
                  <li>Arraste o item para a posição desejada</li>
                  <li>Solte o botão do mouse</li>
                </ol>
              </div>
              <div
                class="bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 p-3"
              >
                <p class="flex items-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 mt-0.5 text-green-600 dark:text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>
                    Os IDs dos requisitos serão automaticamente atualizados para
                    manter a sequência correta.
                  </span>
                </p>
              </div>
            </template>
          </FaqItem>

          <!-- Pergunta 7: Campo de Total de Pontos de Função -->
          <FaqItem
            question="Como funciona o campo de Total de Pontos de Função e qual o fluxo ideal de preenchimento?"
            :isDark="isDark"
            infoBoxType="important"
          >
            <p>
              Ao preencher o campo <strong>Total de Pontos de Função</strong> na
              Documentação de Desenvolvimento, a aplicação registra
              automaticamente uma linha adicional no histórico dos documentos.
              Esta linha contém a data atual e o autor atual, referente à adição
              dos pontos de função.
            </p>

            <div
              class="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-700"
            >
              <h4
                class="font-semibold mb-2 text-blue-700 dark:text-blue-300 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
                Fluxo ideal para adição de pontos de função:
              </h4>
              <ol class="list-decimal pl-5 space-y-1">
                <li>Preencher todos os campos da documentação</li>
                <li>Gerar a documentação (Estratégia de Solução)</li>
                <li>Enviar documentação para contagem de pontos de função</li>
                <li>Receber o resultado da contagem</li>
                <li>Importar o JSON gerado anteriormente</li>
                <li>Adicionar os pontos de função no campo específico</li>
                <li>Ajustar o autor, se necessário</li>
                <li>Gerar a documentação final</li>
              </ol>
            </div>

            <template #info-box>
              Caso não seja realizada a importação do JSON, tanto a data como o
              autor dos dois registros (criação do documento e adição dos pontos
              de função) serão os atuais no momento da geração. A importação do
              JSON é essencial para manter o histórico correto de criação do
              documento original.
            </template>
          </FaqItem>

          <!-- Pergunta 8: Como importar um arquivo JSON -->
          <FaqItem
            question="Como importar um arquivo JSON salvo anteriormente?"
            :isDark="isDark"
            infoBoxType="warning"
          >
            <p>Para importar um arquivo JSON salvo anteriormente:</p>
            <ol class="list-decimal pl-5 mt-2 space-y-1">
              <li>
                Clique no ícone de upload
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  class="inline-block text-blue-600 dark:text-blue-400 align-text-bottom mx-1"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="17 8 12 3 7 8"></polyline>
                  <line x1="12" y1="3" x2="12" y2="15"></line>
                </svg>
                na barra superior
              </li>
              <li>
                Se já houver dados preenchidos, o sistema solicitará confirmação
                para substituir os dados atuais
              </li>
              <li>Selecione o arquivo JSON que deseja importar</li>
              <li>
                Os dados serão carregados automaticamente nos respectivos campos
              </li>
              <li>
                Revise os dados importados e faça as alterações necessárias
              </li>
            </ol>

            <template #info-box>
              O arquivo JSON deve estar no formato correto gerado pelo sistema e
              no tipo correto (Documentação Técnica ou Documentação de
              Desenvolvimento) para que a importação funcione corretamente.
            </template>
          </FaqItem>

          <!-- Pergunta 9: Posso editar um documento gerado anteriormente? -->
          <FaqItem
            question="Posso editar um documento gerado anteriormente?"
            :isDark="isDark"
            infoBoxType="note"
          >
            <p>Sim! Para editar um documento anterior:</p>
            <ol class="list-decimal pl-5 mt-2 space-y-1">
              <li>
                Importe o arquivo JSON do documento (veja a pergunta anterior)
              </li>
              <li>Faça as alterações necessárias nos campos</li>
              <li>
                Gere o documento novamente, selecionando os formatos desejados
              </li>
            </ol>

            <template #info-box>
              Se o documento foi criado por outro autor, um novo registro de
              modificação será adicionado com as suas iniciais.
            </template>
          </FaqItem>
        </div>
      </div>

      <!-- Seção Final com Links Úteis -->
      <div
        id="links-section"
        class="links-card p-6 mb-8 mt-6 border border-blue-300 dark:border-gray-700 rounded-xl shadow-md"
      >
        <div class="flex items-center justify-center mb-6">
          <div class="p-2 rounded-lg mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 text-blue-600 dark:text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </div>
          <h2
            class="text-xl font-semibold text-center text-gray-800 dark:text-blue-100"
          >
            Links Úteis
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/manual"
            class="link-card flex flex-col items-center p-5 rounded-lg transition-colors duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-700"
          >
            <div class="mb-3 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span class="text-lg font-medium text-gray-800 dark:text-white"
              >Manual do Usuário</span
            >
          </a>

          <a
            href="https://logap.com.br/"
            target="_blank"
            class="link-card flex flex-col items-center p-5 rounded-lg transition-colors duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-700"
          >
            <div class="mb-3 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </div>
            <span class="text-lg font-medium text-gray-800 dark:text-white"
              >Portal Corporativo</span
            >
          </a>

          <a
            href="https://github.com/deyvyd/gerador-de-documentacoes"
            target="_blank"
            class="link-card flex flex-col items-center p-5 rounded-lg transition-colors duration-200 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-blue-50 hover:border-blue-300 dark:hover:bg-blue-900/20 dark:hover:border-blue-700"
          >
            <div class="mb-3 bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="text-blue-600 dark:text-blue-400"
                height="24"
                width="23.25"
                viewBox="0 0 496 512"
              >
                <path
                  fill="CurrentColor"
                  d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                />
              </svg>
            </div>
            <span class="text-lg font-medium text-gray-800 dark:text-white"
              >Repositório do projeto</span
            >
          </a>
        </div>
      </div>

      <!-- Rodapé -->
      <div class="footer-section mt-8 mb-0 pb-0 text-center">
        <div class="pt-2 pb-0 border-t border-gray-300 dark:border-gray-700">
          <p class="text-gray-600 dark:text-gray-400 text-sm">
            © 2025 Gerador de Documentações - Todos os direitos reservados
          </p>
          <p class="text-gray-500 dark:text-gray-500 text-sm mt-1">
            Desenvolvido para aumentar a produtividade e garantir a padronização
            de documentos
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import ThemeToggle from "../components/ThemeToggle.vue";
import InfoButton from "../components/InfoButton.vue";
import InfoBox from "../components/InfoBox.vue";
import TourGuide from "../components/TourGuide.vue";
import FaqItem from "../components/FaqItem.vue";
import appBase from "../mixins/appBase";

export default {
  name: "Sobre",
  mixins: [appBase],
  components: {
    AppHeader,
    ThemeToggle,
    InfoButton,
    TourGuide,
    InfoBox,
    FaqItem,
  },
  data() {
    return {
      tabAtiva: 0,
      documentacaoTabs: [
        { nome: "Documentação Técnica" },
        { nome: "Documentação de Desenvolvimento" },
        { nome: "Formatos de Exportação" },
      ],
      activeFaq: null,
      tourCompleted: false,
      tourSteps: [
        {
          element: ".info-card",
          popover: {
            title: "Contexto, Objetivo e Benefícios",
            description: "Conheça mais sobre a ferramenta nesta seção.",
            side: "left",
            align: "center",
          },
        },
        {
          element: ".tabs-card",
          popover: {
            title: "Guia de Campos",
            description:
              "Confira todos os campos disponíveis em cada tipo de documentação.",
            side: "left",
            align: "center",
          },
        },
        {
          element: ".info-system-card",
          popover: {
            title: "Informações do Sistema",
            description: "Veja detalhes técnicos e informações sobre suporte.",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#faq-section",
          popover: {
            title: "Perguntas Frequentes",
            description: "Tem alguma dúvida? Talvez a resposta esteja aqui!",
            side: "left",
            align: "center",
          },
        },
        {
          element: "#links-section",
          popover: {
            title: "Links Úteis",
            description:
              "Acesse o manual, o portal corporativo e o repositório do projeto.",
            side: "top",
            align: "center",
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
    toggleFaq(index) {
      if (this.activeFaq === index) {
        this.activeFaq = null;
      } else {
        this.activeFaq = index;
      }
    },
    startTour() {
      if (this.$refs.tourGuide) {
        this.$refs.tourGuide.startTour();
      }
    },

    onTourCompleted() {
      this.tourCompleted = true;
    },
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";
@import "../assets/css/colors.css";

/* Estilos adicionais específicos para esta página */
.background-container {
  @apply bg-gray-100 dark:bg-gray-900;
}

.main-card {
  @apply rounded-lg shadow px-4 py-6 transition-all duration-300;
}

.campos-container {
  @apply animate-fade-in;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Transições para perguntas frequentes */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Estilos adicionais específicos para esta página */
.hero-card,
.info-card,
.tabs-card,
.info-system-card,
.faq-card,
.links-card {
  @apply bg-white dark:bg-blue-900 rounded-lg shadow px-4 py-6 transition-all duration-300;
}

.tab-navigation {
  @apply flex overflow-x-auto pb-2;
}

/* Estilos para cards de benefícios */
.benefit-card {
  @apply bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm transition-all duration-200 hover:shadow;
}

/* Estilos para ícones */
.icon-circle {
  @apply rounded-full p-4 shadow-sm;
}

.icon-box {
  @apply shadow-sm inline-flex items-center justify-center;
}

/* Transições para FAQ */
.faq-item {
  @apply transition-all duration-300;
}

/* Tabelas */
table {
  @apply w-full border-collapse;
}

table th {
  @apply py-3 px-4 text-left font-medium text-gray-800 dark:text-white bg-gray-100 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600;
}

table td {
  @apply py-3 px-4 border-b border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-300;
}

/* Seções coloridas em tabelas */
table td[colspan="4"].bg-orange-900 {
  @apply bg-orange-100 dark:bg-orange-900/40 font-semibold text-orange-800 dark:text-orange-300;
}

table td[colspan="4"].bg-green-900 {
  @apply bg-green-100 dark:bg-green-900/40 font-semibold text-green-800 dark:text-green-300;
}

/* Animações */
.campos-container {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Formatos de exportação */
.format-card {
  @apply transition-all duration-200;
}

.format-card:hover {
  @apply shadow-md transform scale-[1.02];
}

/* Links úteis */
.link-card {
  @apply transition-all duration-300;
}

.link-card:hover {
  @apply transform -translate-y-1 shadow-md;
}
</style>
