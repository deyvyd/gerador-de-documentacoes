<template>
  <div>
    <app-header
      title="Manual do Usuário"
      default-state="collapsed"
      @swap-requested="handleSwapRequested"
    >
      <template #actions>
        <theme-toggle :is-dark="isDark" @toggle="toggleTheme"></theme-toggle>
        <info-button tooltip-title="Sobre a Aplicação"></info-button>
      </template>
      <template #tour-button>
        <TourGuide
          :steps="tourSteps"
          :show-button="true"
          :auto-start="true"
          tour-id="manual-do-usuario"
          ref="tourGuide"
          @tour-completed="onTourCompleted"
        />
      </template>
    </app-header>

    <div class="flex bg-gray-100 dark:bg-blue-900 min-h-screen">
      <!-- Barra lateral com a lista de funcionalidades -->
      <aside
        class="w-70 bg-gray-50 dark:bg-gray-800 shadow-md rounded-md overflow-y-auto"
      >
        <div class="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 class="text-lg font-semibold text-gray-800 dark:text-white">
            Funcionalidades
          </h2>

          <!-- Campo de busca para filtrar funcionalidades -->
          <div class="mt-2 relative">
            <input
              type="text"
              v-model="filtroFuncionalidade"
              placeholder="Buscar funcionalidade..."
              class="w-full p-2 pr-8 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 absolute right-2 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <!-- Categorias de funcionalidades -->
        <div
          v-for="(categoria, catIndex) in categoriasFiltradas"
          :key="'cat-' + catIndex"
          class="mt-2"
        >
          <div
            @click="toggleCategoria(categoria.id)"
            class="px-4 py-2 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 font-medium"
          >
            <span>{{ categoria.nome }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transform transition-transform"
              :class="
                categoriasExpanded.includes(categoria.id) ? 'rotate-180' : ''
              "
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <!-- Conteúdo da categoria -->
          <transition name="slide">
            <div v-if="categoriasExpanded.includes(categoria.id)">
              <!-- PRIMEIRO: Subgrupos da categoria -->
              <div v-if="categoria.subgrupos" class="pl-4">
                <div
                  v-for="(subgrupo, subIndex) in categoria.subgrupos"
                  :key="'sub-' + subIndex"
                  class="mt-1"
                >
                  <!-- Cabeçalho do subgrupo -->
                  <div
                    @click="toggleSubgrupo(subgrupo.id)"
                    class="px-3 py-1.5 flex justify-between items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm font-medium"
                  >
                    <span>{{ subgrupo.nome }}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4 transform transition-transform"
                      :class="
                        subgruposExpanded.includes(subgrupo.id)
                          ? 'rotate-180'
                          : ''
                      "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  <!-- Conteúdo do subgrupo -->
                  <transition name="slide">
                    <div
                      v-if="subgruposExpanded.includes(subgrupo.id)"
                      class="pl-3"
                    >
                      <!-- Sub-subgrupos (se existem) -->
                      <template v-if="subgrupo.subsubgrupos">
                        <div
                          v-for="(
                            subsubgrupo, subsubIndex
                          ) in subgrupo.subsubgrupos"
                          :key="'subsub-' + subsubIndex"
                          class="mt-1"
                        >
                          <!-- Cabeçalho do sub-subgrupo -->
                          <div
                            @click="toggleSubsubgrupo(subsubgrupo.id)"
                            class="px-2 py-1 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium"
                          >
                            <span>{{ subsubgrupo.nome }}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              class="h-4 w-4 transform transition-transform"
                              :class="
                                subsubgruposExpanded.includes(subsubgrupo.id)
                                  ? 'rotate-180'
                                  : ''
                              "
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </div>

                          <!-- Funcionalidades do sub-subgrupo -->
                          <transition name="slide">
                            <ul
                              v-if="
                                subsubgruposExpanded.includes(subsubgrupo.id)
                              "
                              class="pl-2"
                            >
                              <li
                                v-for="(
                                  func, index
                                ) in funcionalidadesFiltradas.filter(
                                  (f) =>
                                    f.categoria === categoria.id &&
                                    f.subgrupo === subgrupo.id &&
                                    f.subsubgrupo === subsubgrupo.id
                                )"
                                :key="'func-subsub-' + index"
                                @click="selecionarFuncionalidade(func.id)"
                                :class="[
                                  'px-2 py-1 cursor-pointer border-l-2 text-sm flex items-center',
                                  funcionalidadeSelecionada === func.id
                                    ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300'
                                    : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
                                ]"
                              >
                                <svg
                                  v-if="func.icone"
                                  xmlns="http://www.w3.org/2000/svg"
                                  class="h-4 w-4 mr-1.5"
                                  :class="
                                    funcionalidadeSelecionada === func.id
                                      ? 'text-blue-500 dark:text-blue-400'
                                      : 'text-gray-500 dark:text-gray-400'
                                  "
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    :d="func.icone"
                                  />
                                </svg>
                                {{ func.titulo }}
                              </li>
                            </ul>
                          </transition>
                        </div>
                      </template>

                      <!-- Funcionalidades diretas do subgrupo (sem sub-subgrupo) -->
                      <ul
                        v-if="
                          funcionalidadesFiltradas.some(
                            (f) =>
                              f.categoria === categoria.id &&
                              f.subgrupo === subgrupo.id &&
                              !f.subsubgrupo
                          )
                        "
                        :class="subgrupo.subsubgrupos ? 'mt-2' : ''"
                      >
                        <li
                          v-for="(
                            func, index
                          ) in funcionalidadesFiltradas.filter(
                            (f) =>
                              f.categoria === categoria.id &&
                              f.subgrupo === subgrupo.id &&
                              !f.subsubgrupo
                          )"
                          :key="'func-sub-direct-' + index"
                          @click="selecionarFuncionalidade(func.id)"
                          :class="[
                            'px-3 py-1.5 cursor-pointer border-l-3 text-sm flex items-center',
                            funcionalidadeSelecionada === func.id
                              ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300'
                              : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
                          ]"
                        >
                          <svg
                            v-if="func.icone"
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-4 w-4 mr-2"
                            :class="
                              funcionalidadeSelecionada === func.id
                                ? 'text-blue-500 dark:text-blue-400'
                                : 'text-gray-500 dark:text-gray-400'
                            "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              :d="func.icone"
                            />
                          </svg>
                          {{ func.titulo }}
                        </li>
                      </ul>
                    </div>
                  </transition>
                </div>
              </div>

              <!-- DEPOIS: Funcionalidades diretas da categoria (sem subgrupo) -->
              <ul
                v-if="
                  funcionalidadesFiltradas.some(
                    (f) => f.categoria === categoria.id && !f.subgrupo
                  )
                "
                :class="categoria.subgrupos ? 'mt-2' : ''"
              >
                <li
                  v-for="(func, index) in funcionalidadesFiltradas.filter(
                    (f) => f.categoria === categoria.id && !f.subgrupo
                  )"
                  :key="'func-direct-' + index"
                  @click="selecionarFuncionalidade(func.id)"
                  :class="[
                    'px-4 py-2 pl-6 cursor-pointer border-l-4 text-sm flex items-center',
                    funcionalidadeSelecionada === func.id
                      ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-400 text-blue-700 dark:text-blue-300'
                      : 'border-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300',
                  ]"
                >
                  <svg
                    v-if="func.icone"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-2"
                    :class="
                      funcionalidadeSelecionada === func.id
                        ? 'text-blue-500 dark:text-blue-400'
                        : 'text-gray-500 dark:text-gray-400'
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      :d="func.icone"
                    />
                  </svg>
                  {{ func.titulo }}
                </li>
              </ul>
            </div>
          </transition>
        </div>
      </aside>

      <!-- Conteúdo principal -->
      <main class="flex-1 overflow-y-auto pl-6 mr-2">
        <div
          v-if="funcionalidadeProcessada"
          class="bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-6"
        >
          <!-- Título da funcionalidade -->
          <h1
            class="text-2xl font-bold text-gray-900 dark:text-white mb-4 pb-2 flex items-center border-b border-gray-300 dark:border-gray-600"
          >
            <svg
              v-if="funcionalidadeProcessada.icone"
              xmlns="http://www.w3.org/2000/svg"
              class="h-7 w-7 mr-3 text-gray-900 dark:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="funcionalidadeProcessada.icone"
              />
            </svg>
            {{ funcionalidadeProcessada.titulo }}
          </h1>

          <!-- BDD -->
          <section class="mb-4">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                />
              </svg>
              História de usuário
            </h2>
            <pre
              class="whitespace-pre-wrap text-gray-700 dark:text-gray-300"
              v-html="processarMarkdown(funcionalidadeProcessada.bdd)"
            ></pre>
          </section>

          <!-- Separador -->
          <div class="mb-4 border-b border-gray-200 dark:border-gray-700"></div>

          <!-- Caminho de acesso -->
          <section class="mb-4">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                />
              </svg>
              Caminho de acesso:
            </h2>
            <ol
              class="list-decimal list-inside text-gray-700 dark:text-gray-300 pl-4"
            >
              <li
                v-for="(passo, index) in funcionalidadeProcessada.caminhoAcesso"
                :key="index"
                class="mb-1"
                v-html="processarMarkdown(passo)"
              ></li>
            </ol>
          </section>

          <!-- Separador -->
          <div class="mb-5 border-b border-gray-200 dark:border-gray-700"></div>

          <!-- Critérios de aceitação -->
          <section class="mb-2">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400"
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
              Critérios de aceitação:
            </h2>
            <div
              v-for="(
                criterio, index
              ) in funcionalidadeProcessada.criteriosAceitacao"
              :key="index"
              class="mb-1 p-2 rounded-lg"
            >
              <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                <span
                  class="font-mono inline-block px-1 py-0 mr-0 bg-[#D2F0FD] text-[#0369A1] dark:text-[#BAE6FD] dark:bg-[#172935] border border-[#B3E6FC] dark:border-[#154259] rounded text-sm"
                >
                  {{ criterio.id }}
                </span>
                - <span v-html="processarMarkdown(criterio.titulo)"></span>
              </h3>

              <!-- Descrição opcional -->
              <div
                v-if="criterio.descricao"
                class="text-gray-700 dark:text-gray-300 mb-2 pl-4"
                v-html="processarMarkdown(criterio.descricao)"
              ></div>

              <!-- Exemplo após descrição (se existir como campo separado) -->
              <div v-if="criterio.exemplo" class="flex my-3 rounded-md">
                <div
                  class="border-l-4 border-cyan-700 dark:border-cyan-400"
                ></div>
                <div class="flex-1 py-2 px-3 bg-gray-200 dark:bg-gray-900">
                  <div class="flex items-center mb-1">
                    <svg
                      class="h-4 w-4 mr-2 text-cyan-700 dark:text-cyan-400"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26,12H22v2h4v2H23v2h3v2H22v2h4a2.0027,2.0027,0,0,0,2-2V14A2.0023,2.0023,0,0,0,26,12Z"
                      ></path>
                      <path
                        d="M19,22H13V18a2.002,2.002,0,0,1,2-2h2V14H13V12h4a2.0023,2.0023,0,0,1,2,2v2a2.0023,2.0023,0,0,1-2,2H15v2h4Z"
                      ></path>
                      <polygon
                        points="8 20 8 12 6 12 6 13 4 13 4 15 6 15 6 20 4 20 4 22 10 22 10 20 8 20"
                      ></polygon>
                    </svg>
                    <span
                      class="font-medium text-sm text-cyan-700 dark:text-cyan-400"
                      >Exemplo</span
                    >
                  </div>
                  <div
                    class="text-gray-700 dark:text-gray-300 text-sm"
                    v-html="processarMarkdown(criterio.exemplo)"
                  ></div>
                </div>
              </div>

              <!-- Itens do critério (com exemplos integrados) -->
              <div v-html="processarItensComExemplos(criterio.itens)"></div>
            </div>
          </section>

          <!-- Separador -->
          <div class="mb-5 border-b border-gray-200 dark:border-gray-700"></div>

          <!-- Regras de negócio -->
          <section class="mb-6">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              Regras de negócio:
            </h2>
            <div
              v-for="(regra, index) in funcionalidadeProcessada.regrasNegocio"
              :key="index"
              class="mb-1 p-2 rounded-lg"
            >
              <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                <span
                  class="font-mono inline-block px-1 py-0 mr-0 bg-[#D2F0FD] text-[#0369A1] dark:text-[#BAE6FD] dark:bg-[#172935] border border-[#B3E6FC] dark:border-[#154259] rounded text-sm"
                >
                  {{ regra.id }}
                </span>
                - <span v-html="processarMarkdown(regra.titulo)"></span>
              </h3>

              <!-- Descrição opcional -->
              <div
                v-if="regra.descricao && regra.descricao !== regra.titulo"
                class="text-gray-700 dark:text-gray-300 mb-2 pl-4"
                v-html="processarMarkdown(regra.descricao)"
              ></div>

              <!-- Exemplo após descrição (se existir como campo separado) -->
              <div v-if="regra.exemplo" class="flex my-3 rounded-md">
                <div
                  class="border-l-4 border-cyan-700 dark:border-cyan-400"
                ></div>
                <div class="flex-1 py-2 px-3 bg-gray-200 dark:bg-gray-900">
                  <div class="flex items-center mb-1">
                    <svg
                      class="h-4 w-4 mr-2 text-cyan-700 dark:text-cyan-400"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26,12H22v2h4v2H23v2h3v2H22v2h4a2.0027,2.0027,0,0,0,2-2V14A2.0023,2.0023,0,0,0,26,12Z"
                      ></path>
                      <path
                        d="M19,22H13V18a2.002,2.002,0,0,1,2-2h2V14H13V12h4a2.0023,2.0023,0,0,1,2,2v2a2.0023,2.0023,0,0,1-2,2H15v2h4Z"
                      ></path>
                      <polygon
                        points="8 20 8 12 6 12 6 13 4 13 4 15 6 15 6 20 4 20 4 22 10 22 10 20 8 20"
                      ></polygon>
                    </svg>
                    <span
                      class="font-medium text-sm text-cyan-700 dark:text-cyan-400"
                      >Exemplo</span
                    >
                  </div>
                  <div
                    class="text-gray-700 dark:text-gray-300 text-sm"
                    v-html="processarMarkdown(regra.exemplo)"
                  ></div>
                </div>
              </div>

              <!-- Itens da regra (com exemplos integrados) -->
              <div
                v-if="regra.itens && regra.itens.length > 0"
                v-html="processarItensComExemplos(regra.itens)"
              ></div>
            </div>
          </section>

          <!-- Separador -->
          <div class="mb-5 border-b border-gray-200 dark:border-gray-700"></div>

          <!-- Regras de interface -->
          <section class="mb-6">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400"
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
              Regras de interface:
            </h2>
            <div
              v-for="(regra, index) in funcionalidadeProcessada.regrasInterface"
              :key="index"
              class="mb-1 p-2 rounded-lg"
            >
              <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                <span
                  class="font-mono inline-block px-1 py-0 mr-0 bg-[#D2F0FD] text-[#0369A1] dark:text-[#BAE6FD] dark:bg-[#172935] border border-[#B3E6FC] dark:border-[#154259] rounded text-sm"
                >
                  {{ regra.id }}
                </span>
                - <span v-html="processarMarkdown(regra.titulo)"></span>
              </h3>

              <!-- Descrição opcional -->
              <div
                v-if="regra.descricao && regra.descricao !== regra.titulo"
                class="text-gray-700 dark:text-gray-300 mb-2 pl-4"
                v-html="processarMarkdown(regra.descricao)"
              ></div>

              <!-- Exemplo após descrição (se existir como campo separado) -->
              <div v-if="regra.exemplo" class="flex my-3 rounded-md">
                <div
                  class="border-l-4 border-cyan-700 dark:border-cyan-400"
                ></div>
                <div class="flex-1 py-2 px-3 bg-gray-200 dark:bg-gray-900">
                  <div class="flex items-center mb-1">
                    <svg
                      class="h-4 w-4 mr-2 text-cyan-700 dark:text-cyan-400"
                      viewBox="0 0 32 32"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26,12H22v2h4v2H23v2h3v2H22v2h4a2.0027,2.0027,0,0,0,2-2V14A2.0023,2.0023,0,0,0,26,12Z"
                      ></path>
                      <path
                        d="M19,22H13V18a2.002,2.002,0,0,1,2-2h2V14H13V12h4a2.0023,2.0023,0,0,1,2,2v2a2.0023,2.0023,0,0,1-2,2H15v2h4Z"
                      ></path>
                      <polygon
                        points="8 20 8 12 6 12 6 13 4 13 4 15 6 15 6 20 4 20 4 22 10 22 10 20 8 20"
                      ></polygon>
                    </svg>
                    <span
                      class="font-medium text-sm text-cyan-700 dark:text-cyan-400"
                      >Exemplo</span
                    >
                  </div>
                  <div
                    class="text-gray-700 dark:text-gray-300 text-sm"
                    v-html="processarMarkdown(regra.exemplo)"
                  ></div>
                </div>
              </div>

              <!-- Itens da regra (com exemplos integrados) -->
              <div
                v-if="regra.itens && regra.itens.length > 0"
                v-html="processarItensComExemplos(regra.itens)"
              ></div>
            </div>
          </section>

          <!-- Separador -->
          <div class="mb-5 border-b border-gray-200 dark:border-gray-700"></div>

          <!-- Cenários de Teste -->
          <section class="mb-6">
            <h2
              class="text-xl font-semibold text-gray-800 dark:text-white mb-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400"
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
              Cenários de Teste:
            </h2>
            <div
              v-for="(cenario, index) in funcionalidadeProcessada.cenariosTeste"
              :key="index"
              class="mb-1 p-2 rounded-lg"
            >
              <h3 class="font-medium text-gray-800 dark:text-gray-200 mb-2">
                <span
                  class="font-mono inline-block px-1 py-0 mr-0 bg-[#D2F0FD] text-[#0369A1] dark:text-[#BAE6FD] dark:bg-[#172935] border border-[#B3E6FC] dark:border-[#154259] rounded text-sm"
                >
                  {{ cenario.id }}
                </span>
                - <span v-html="processarMarkdown(cenario.titulo)"></span>
              </h3>

              <!-- Descrição opcional -->
              <div
                v-if="cenario.descricao"
                class="text-gray-700 dark:text-gray-300 mb-2 pl-4"
                v-html="processarMarkdown(cenario.descricao)"
              ></div>

              <!-- Formato BDD (comportamento antigo e novo) -->
              <div
                v-if="cenario.dado || cenario.quando || cenario.entao"
                class="pl-4 text-gray-700 dark:text-gray-300"
              >
                <p v-if="cenario.dado" class="mb-1">
                  <span class="font-medium">Dado</span>
                  <span v-html="' ' + processarMarkdown(cenario.dado)"></span>
                </p>
                <p v-if="cenario.e" class="mb-1">
                  <span class="font-medium">E</span>
                  <span v-html="' ' + processarMarkdown(cenario.e)"></span>
                </p>
                <p v-if="cenario.quando" class="mb-1">
                  <span class="font-medium">Quando</span>
                  <span v-html="' ' + processarMarkdown(cenario.quando)"></span>
                </p>
                <p v-if="cenario.entao" class="mb-1">
                  <span class="font-medium">Então</span>
                  <span v-html="' ' + processarMarkdown(cenario.entao)"></span>
                </p>
                <p v-if="cenario.e_entao" class="mb-1">
                  <span class="font-medium">E</span>
                  <span
                    v-html="' ' + processarMarkdown(cenario.e_entao)"
                  ></span>
                </p>
              </div>

              <!-- Itens do cenário (novo formato) -->
              <ul
                v-if="cenario.itens && cenario.itens.length > 0"
                class="list-disc pl-6"
              >
                <template
                  v-for="(item, itemIndex) in cenario.itens"
                  :key="itemIndex"
                >
                  <li
                    v-if="!item.startsWith('- ')"
                    class="text-gray-700 dark:text-gray-300 mb-1"
                    v-html="processarMarkdown(item)"
                  ></li>
                  <li
                    v-else
                    class="text-gray-700 dark:text-gray-300 mb-1 ml-6 list-disc"
                    v-html="processarMarkdown(item.substring(2))"
                  ></li>
                </template>
              </ul>
            </div>
          </section>
        </div>
        <div v-else class="flex items-center justify-center h-full">
          <p class="text-gray-500 dark:text-gray-400 text-xl">
            Selecione uma funcionalidade na barra lateral
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import ThemeToggle from "../components/ThemeToggle.vue";
import InfoButton from "../components/InfoButton.vue";
import TourGuide from "../components/TourGuide.vue";
import appBase from "../mixins/appBase";
import markdownProcessor from "../mixins/markdownProcessor";

const iconesPorTipo = {
  // Ícones para funcionalidades comuns
  tourGuiado:
    "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
  temaClaro:
    "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
  troca: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  formulario:
    "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",

  // Ícones por tipo de operação
  cadastro:
    "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zM12 8v8m-4-4h8",
  listagem:
    "M3.5 3h17A1.5 1.5 0 0122 4.5v15a1.5 1.5 0 01-1.5 1.5h-17A1.5 1.5 0 012 19.5v-15A1.5 1.5 0 013.5 3zM2 7h20M10 12h8M10 16h8M6 12h1M6 16h1",
  visualizacao:
    "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  edicao:
    "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  remocao:
    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  duplicacao:
    "M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z",
  exportar: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  importar: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12",

  // Ícones específicos para requisitos
  requisito:
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  pontosFuncao:
    "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
};

export default {
  name: "DocumentacaoFuncionalidades",
  mixins: [appBase, markdownProcessor],
  components: {
    AppHeader,
    ThemeToggle,
    InfoButton,
    TourGuide,
  },
  data() {
    return {
      filtroFuncionalidade: "",
      categoriasExpanded: ["comum"], // Categorias expandidas por padrão
      subgruposExpanded: ["appHeader"], // Subgrupos expandidos por padrão
      subsubgruposExpanded: ["crud-atividades", "crud-rf", "crud-rnf"], // Sub-subgrupos expandidos por padrão

      //Salvar estado anterior à busca
      estadoAnteriorBusca: {
        categoriasExpanded: [],
        subgruposExpanded: [],
        subsubgruposExpanded: [],
      },
      estaEmBusca: false,

      funcionalidadeSelecionada: "tour-guiado", // ID da funcionalidade selecionada
      categorias: [
        {
          id: "comum",
          nome: "Funcionalidades Comuns",
          subgrupos: [
            { id: "appHeader", nome: "Cabeçalho" },
            { id: "formulario", nome: "Formulário" },
          ],
        },
        {
          id: "doc-tecnica",
          nome: "Documentação Técnica",
          subgrupos: [
            {
              id: "atividades",
              nome: "Atividades",
              subsubgrupos: [
                { id: "crud-atividades", nome: "CRUD Atividades" },
              ],
            },
          ],
        },
        {
          id: "doc-dev",
          nome: "Documentação de Desenvolvimento",
          subgrupos: [
            {
              id: "requisitos-funcionais",
              nome: "Requisitos Funcionais",
              subsubgrupos: [
                { id: "crud-rf", nome: "CRUD RF" },
                { id: "imagens", nome: "CRUD Imagens" },
              ],
            },
            {
              id: "requisitos-nao-funcionais",
              nome: "Requisitos Não Funcionais",
              subsubgrupos: [{ id: "crud-rnf", nome: "CRUD RNF" }],
            },
          ],
        },
      ],
      funcionalidades: [
        // --- Funcionalidades comuns em ambos tipos de documentação --- //

        {
          id: "tour-guiado",
          categoria: "comum",
          subgrupo: "appHeader",
          titulo: "Tour Guiado Interativo",
          icone: iconesPorTipo.tourGuiado,
          bdd: `Eu, como novo usuário do sistema,
Quero ser guiado pelos principais elementos da interface
Para aprender a usar o sistema de forma eficiente`,
          caminhoAcesso: [
            "Acessar o sistema",
            "O tour inicia automaticamente na primeira visita a cada tela",
            "Alternativamente, clicar no botão de tour [btn:tour:gps/] no canto superior direito",
          ],
          criteriosAceitacao: [
            {
              titulo: "Inicialização do tour:",
              itens: [
                "- Iniciar automaticamente na primeira visita a cada tela",
                "- Disponibilizar botão [btn:tour:gps/] para iniciar o tour manualmente",
                "- Manter registro das telas já visitadas para não repetir o tour",
              ],
            },
            {
              titulo: "Navegação pelo tour:",
              itens: [
                "- Destacar elementos da interface sequencialmente",
                "- Fornecer descrições claras para cada elemento",
                "- Permitir avançar, voltar etapas",
                "- Permitir encerrar o tour a qualquer momento",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "Cada tela possui seu próprio tour personalizado",
            },
            {
              titulo:
                "O histórico de tours completados é salvo no armazenamento local",
            },
            {
              titulo: "O tour pode ser iniciado manualmente a qualquer momento",
            },
            {
              titulo:
                "O tour nunca impede o acesso à funcionalidade, apenas destaca",
            },
          ],
          regrasInterface: [
            {
              titulo: "Destaque visual para o elemento sendo explicado",
            },
            {
              titulo: "Overlay semi-transparente no restante da tela",
            },
            {
              titulo: "Popover com título e descrição para cada etapa",
            },
            {
              titulo: "Botões de navegação (anterior, próximo, fechar)",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Iniciação automática na primeira visita",
              dado: "que o usuário nunca acessou uma determinada tela antes",
              quando: "carrega a página pela primeira vez",
              entao: "o sistema inicia automaticamente o tour guiado",
              e_entao: "destaca o primeiro elemento com sua descrição",
            },
            {
              titulo: "Navegação completa pelo tour",
              dado: "que o tour está em andamento",
              quando:
                "o usuário clica em [btn:tour_next]Próximo[/btn] até o final",
              entao: "o sistema apresenta todos os elementos em sequência",
              e_entao: "marca o tour como concluído ao final",
            },
            {
              titulo: "Encerramento manual do tour",
              dado: "que o tour está em andamento",
              quando: "o usuário clica em 'Fechar' ou pressiona ESC",
              entao: "o sistema encerra o tour imediatamente",
              e_entao:
                "marca o tour como concluído mesmo sem completar todas as etapas",
            },
            {
              titulo: "Inicialização manual do tour",
              dado: "que o usuário já viu o tour anteriormente",
              quando:
                "clica no botão de tour [btn:tour:gps/] no canto superior direito",
              entao: "o sistema inicia o tour novamente",
              e_entao:
                "permite visualizar todas as dicas mesmo que já tenha feito antes",
            },
          ],
        },

        {
          id: "modo-claro-escuro",
          categoria: "comum",
          subgrupo: "appHeader",
          titulo: "Alternância de Tema (Claro/Escuro)",
          icone: iconesPorTipo.temaClaro,
          bdd: `Eu, como usuário do sistema,
Quero alternar entre os modos claro e escuro
Para adequar a interface às minhas preferências visuais`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Clicar no ícone de alternância de tema (sol/lua) no canto superior direito",
          ],
          criteriosAceitacao: [
            {
              titulo: "Funcionalidade de alternância:",
              itens: [
                "- Botão com ícone intuitivo ([btn:dark_theme:sun/] - sol para modo claro, [btn:light_theme:moon/] - lua para modo escuro)",
                "- Transição suave entre os temas",
                "- Mudança global afetando todos os elementos da interface",
                "- Persistência da preferência entre sessões",
              ],
            },
            {
              titulo: "Detecção automática de preferência:",
              itens: [
                "- Verificar preferência do sistema ao iniciar",
                "- Aplicar tema adequado automaticamente na primeira visita",
                "- Priorizar preferência salva do usuário sobre a do sistema",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "A preferência do usuário é salva no armazenamento local (localStorage)",
            },
            {
              titulo:
                "Na primeira visita, o tema padrão segue a preferência do sistema",
            },
            {
              titulo:
                "A alternância é instantânea e não requer recarregamento da página",
            },
            {
              titulo:
                "Todos os componentes visuais devem se adaptar ao tema selecionado",
            },
          ],
          regrasInterface: [
            {
              titulo: "Ícone de sol :sun: representa mudança para tema claro",
            },
            {
              titulo: "Ícone de lua :moon: representa mudança para tema escuro",
            },
            {
              titulo: "Tooltip explica a função ao passar o mouse",
            },
            {
              titulo: "Animação suave na transição entre temas",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Alternância do modo claro para escuro",
              dado: "que o usuário está no modo claro",
              quando: "clica no ícone de alternância de tema",
              entao: "o sistema aplica o tema escuro a toda a interface",
              e_entao:
                "atualiza o ícone para representar o sol [btn:dark_theme:sun/] (volta ao modo claro)",
            },
            {
              titulo: "Persistência de preferência",
              dado: "que o usuário definiu o tema escuro",
              quando:
                "fecha e reabre o navegador acessando o sistema novamente",
              entao: "o sistema carrega diretamente com o tema escuro",
              e_entao: "mantém a última preferência salva",
            },
            {
              titulo: "Primeira visita com preferência do sistema",
              dado: "que o usuário acessa o sistema pela primeira vez",
              e: "tem configurado o modo escuro como preferência no sistema operacional",
              quando: "a página carrega",
              entao: "o sistema detecta a preferência do sistema operacional",
              e_entao: "aplica automaticamente o tema escuro",
            },
          ],
        },

        {
          id: "troca-tipo-documentacao",
          categoria: "comum",
          subgrupo: "appHeader",
          titulo: "Troca do Tipo de Documentação",
          icone: iconesPorTipo.troca,
          bdd: `Eu, como usuário do sistema,
Quero alternar entre os tipos de documentação disponíveis
Para acessar a documentação técnica ou a documentação de desenvolvimento conforme minha necessidade`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Na tela inicial, selecionar entre [tc-orange]Documentação Técnica[/c] ou [tc-green]Documentação de Desenvolvimento[/c]",
            "Alternativamente, durante o preenchimento, clicar no botão de alternância :swap: no topo da página para trocar de tipo",
          ],
          criteriosAceitacao: [
            {
              titulo: "Seleção de tipo na tela inicial:",
              itens: [
                "- Exibir opções de [tc-orange]Documentação Técnica[/c] e [tc-green]Documentação de Desenvolvimento[/c] na tela inicial",
                "- Permitir seleção através de botões destacados visualmente",
                "- Ao selecionar um tipo, o sistema deve carregar o formulário correspondente",
              ],
            },
            {
              titulo: "Alternância durante o preenchimento:",
              itens: [
                "- Disponibilizar botão de troca de tipo :swap: no topo da página durante o preenchimento",
                "- Ao tentar alternar com dados já preenchidos, exibir confirmação para evitar perda acidental",
                "- Após confirmação, carregar o formulário do novo tipo selecionado",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "Cada tipo de documentação possui campos e fluxos específicos baseados nas necessidades daquela documentação",
            },
            {
              titulo:
                "A [tc-orange]documentação técnica[/c] é focada em atividades e pontos de função  (PFs)",
            },
            {
              titulo:
                "A [tc-green]documentação de desenvolvimento[/c] é focada em requisitos funcionais (RFs) e não funcionais (RNFs)",
            },
            {
              titulo:
                "Os campos básicos da solicitação são comuns a ambos os tipos de documentação",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "Botões de seleção de tipo com indicação visual clara do tipo selecionado",
            },
            {
              titulo:
                "Na tela inicial, os tipos de documentação são apresentados como cards ou botões grandes",
            },
            {
              titulo:
                "Durante o preenchimento, a opção de troca é apresentada como um seletor ou botão no cabeçalho",
            },
            {
              titulo:
                "Modal de confirmação ao tentar trocar de tipo com dados não salvos",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Seleção inicial de documentação técnica",
              dado: "que o usuário acessou o sistema",
              quando:
                "seleciona a opção [tc-orange]Documentação Técnica[/c] na tela inicial",
              entao:
                "o sistema carrega o formulário específico para documentação técnica",
              e_entao: "exibe as seções de atividades e pontos de função",
            },
            {
              titulo: "Seleção inicial de documentação de desenvolvimento",
              dado: "que o usuário acessou o sistema",
              quando:
                "seleciona a opção [tc-green]Documentação de Desenvolvimento[/c] na tela inicial",
              entao:
                "o sistema carrega o formulário específico para documentação de desenvolvimento",
              e_entao:
                "exibe as seções de requisitos funcionais e não funcionais",
            },
            {
              titulo: "Troca de tipo com dados não preenchidos",
              dado: "que o usuário está em um formulário vazio",
              quando: "clica no botão de troca de tipo :swap: no cabeçalho",
              entao:
                "o sistema troca imediatamente para o outro tipo de documentação",
              e_entao: "carrega o novo formulário sem solicitar confirmação",
            },
            {
              titulo: "Troca de tipo com dados preenchidos",
              dado: "que o usuário preencheu alguns campos no formulário atual",
              quando: "tenta trocar para outro tipo de documentação",
              entao:
                "o sistema exibe um modal de confirmação alertando sobre perda de dados",
              e_entao: "só realiza a troca se o usuário confirmar",
            },
          ],
        },

        {
          id: "formulario-informacoes-basicas",
          categoria: "comum",
          subgrupo: "formulario",
          titulo: "Informações Básicas da SS",
          icone: iconesPorTipo.formulario,
          bdd: `Eu, como usuário do sistema,
Quero preencher as informações básicas da Solicitação de Serviço
Para documentar os dados essenciais do trabalho realizado`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar qualquer tipo de documentação ([tc-orange]Técnica[/c] ou [tc-green]Desenvolvimento[/c])",
            "A seção **Informações básicas da SS** está sempre disponível no topo do formulário",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Campos obrigatórios: o usuário deve preencher os seguintes dados:",
              itens: [
                "- [tc-sky]Número SS:[/c] campo numérico de 3 dígitos (preenchido com zeros à esquerda)",
                "- [tc-sky]Ano SS:[/c] ano da solicitação (padrão é o ano atual)",
                "- [tc-sky]Título:[/c] descrição breve da solicitação",
                "- [tc-sky]Descrição:[/c] detalhamento da solicitação",
                "- [tc-sky]Data de Início:[/c] data de início do trabalho",
                "- [tc-sky]Data de Fim:[/c] data de conclusão do trabalho",
                "- [tc-sky]Autor(es):[/c] ao menos um autor deve ser selecionado",
              ],
            },
            {
              titulo: "Campo opcional:",
              itens: [
                "- [tc-sky]Link do board:[/c] URL opcional para o board do projeto (GitLab, Jira, etc.)",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "O campo de Número SS é formatado automaticamente com zeros à esquerda",
            },
            {
              titulo: "A data de início não pode ser posterior à data de fim",
            },
            {
              titulo:
                "O campo de autor permite selecionar múltiplos autores da lista predefinida",
            },
            {
              titulo:
                "As iniciais dos autores são concatenadas para uso no documento.",
              exemplo: "DMF e JGC",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O campo de seleção de autores possui sugestão automática baseada no texto digitado",
            },
            {
              titulo:
                "Os autores selecionados aparecem como tags que podem ser removidas individualmente",
            },
            {
              titulo: "Campos com erro de validação são destacados em vermelho",
            },
            {
              titulo: "O campo de ano SS é pré-preenchido com o ano atual",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Preenchimento completo de informações básicas",
              dado: "que o usuário está preenchendo o formulário",
              quando: "preenche todos os campos obrigatórios corretamente",
              entao: "o sistema permite prosseguir para as próximas seções",
              e_entao: "armazena os dados para a geração do documento final",
            },
            {
              titulo: "Validação de formato para número SS",
              dado: "que o usuário está preenchendo o formulário",
              quando: "insere um valor no campo Número SS e sai do campo",
              entao:
                "o sistema formata o número com zeros à esquerda se necessário",
              e_entao: "mantém o formato `NNN` (ex: `001`, `042`, `999`)",
            },
            {
              titulo: "Validação de datas inconsistentes",
              dado: "que o usuário está preenchendo o formulário",
              quando: "insere uma data de início posterior à data de fim",
              entao: "o sistema exibe mensagem de erro",
              e_entao: "destaca os campos de data em vermelho",
            },
            {
              titulo: "Seleção múltipla de autores",
              dado: "que o usuário está no campo de autores",
              quando:
                "digita parte do nome de um autor e seleciona da lista de sugestões",
              entao: "o sistema adiciona o autor como uma tag no campo",
              e_entao:
                "permite continuar adicionando mais autores se necessário",
            },
          ],
        },

        {
          id: "selecao-multipla-autores",
          categoria: "comum",
          subgrupo: "formulario",
          titulo: "Seleção Múltipla de Autores",
          icone: iconesPorTipo.formulario,
          bdd: `Eu, como usuário do sistema,
Quero selecionar múltiplos autores para um documento
Para registrar todos os contribuidores do trabalho`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar qualquer tipo de documentação ([tc-orange]Técnica[/c] ou [tc-green]Desenvolvimento[/c])",
            "No campo [tc-sky]Autor(es)[/c], começar a digitar o nome de um autor",
            "Selecionar o autor na lista de sugestões",
            "Repetir o processo para adicionar mais autores se necessário",
          ],
          criteriosAceitacao: [
            {
              titulo: "Seleção de autores: o sistema deve permitir:",
              itens: [
                "- Pesquisar autores digitando parte do nome",
                "- Visualizar sugestões filtradas conforme o texto digitado",
                "- Selecionar autores da lista de sugestões",
                "- Adicionar múltiplos autores ao documento",
                "- Visualizar tags com os nomes dos autores selecionados",
              ],
            },
            {
              titulo: "Gerenciamento de autores selecionados:",
              itens: [
                "- Remover autores individuais clicando no [tc-blue]x[/c] na tag",
                "- Não permitir duplicação de autores já selecionados",
                "- Exigir ao menos um autor selecionado para gerar documentos",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "A lista de autores disponíveis é predefinida no sistema",
            },
            {
              titulo:
                "As iniciais dos autores são concatenadas automaticamente:",
              exemplo: "DMF e JGC",
            },
            {
              titulo: "Múltiplos autores são separados por vírgula `,` e `e`",
              exemplo: "DMF, JGC e PRO",
            },
            {
              titulo:
                "Pelo menos um autor é obrigatório para gerar documentação",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "A busca ignora acentuação e diferencia maiúsculas/minúsculas",
            },
            {
              titulo:
                "As sugestões são exibidas em uma lista dropdown abaixo do campo",
            },
            {
              titulo:
                "Autor selecionado aparece como tag colorida com botão de remoção",
            },
            {
              titulo:
                "Tecla Backspace quando o campo está vazio remove o último autor adicionado",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Seleção de múltiplos autores",
              dado: "que o usuário está preenchendo o campo de autores",
              quando:
                "digita parte do nome, seleciona da lista e repete para outro autor",
              entao: "o sistema adiciona ambos os autores como tags",
              e_entao:
                "concatena as iniciais corretamente no formato 'XXX e YYY'",
            },
            {
              titulo: "Remoção de autor da seleção",
              dado: "que há múltiplos autores selecionados",
              quando: "o usuário clica no 'x' de uma das tags de autor",
              entao: "o sistema remove apenas aquele autor da seleção",
              e_entao:
                "atualiza a formatação das iniciais dos autores restantes",
            },
            {
              titulo: "Tentativa de seleção de autor duplicado",
              dado: "que um autor já foi selecionado",
              quando: "o usuário tenta adicionar o mesmo autor novamente",
              entao: "o sistema não adiciona o autor duplicado",
              e_entao: "mantém apenas uma ocorrência do autor na seleção",
            },
            {
              titulo: "Validação de campo obrigatório",
              dado: "que nenhum autor foi selecionado",
              quando: "o usuário tenta gerar um documento",
              entao: "o sistema destaca o campo de autores em vermelho",
              e_entao:
                "exibe mensagem informando que ao menos um autor é obrigatório",
            },
          ],
        },

        {
          id: "exportacao-multiplos-formatos",
          categoria: "comum",
          subgrupo: "formulario",
          titulo: "Exportação em Múltiplos Formatos",
          icone: iconesPorTipo.exportar,
          bdd: `Eu, como usuário do sistema,
Quero exportar a documentação em diferentes formatos
Para distribuir e armazenar da maneira mais adequada`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar qualquer tipo de documentação ([tc-orange]Técnica[/c] ou [tc-green]Desenvolvimento[/c])",
            "Preencher todos os campos obrigatórios",
            'Na seção "Formato dos arquivos", selecionar os formatos desejados',
            "Clicar no botão [btn:blue:download]Gerar Documentos[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Formatos disponíveis: o sistema deve permitir exportação nos seguintes formatos:",
              itens: [
                "- [tc-purple]JSON[/c]: formato sempre disponível, útil para importação posterior",
                "- [tc-blue]DOCX[/c]: documento Microsoft Word com formatação completa",
                "- [tc-red]PDF[/c]: documento em formato PDF para distribuição final",
              ],
            },
            {
              titulo: "Validação antes da exportação:",
              itens: [
                "- Para exportação em [tc-blue]DOCX[/c] ou [tc-red]PDF[/c], todos os campos obrigatórios devem estar preenchidos",
                "- Para exportação apenas em [tc-purple]JSON[/c], a validação completa é opcional (útil para salvar rascunhos)",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "O formato [tc-purple]JSON[/c] é sempre gerado, independente das opções selecionadas",
            },
            {
              titulo:
                "A exportação em [tc-blue]DOCX[/c]/[tc-red]PDF[/c] requer que todos os campos obrigatórios estejam preenchidos",
            },
            {
              titulo:
                "Se apenas o formato [tc-purple]JSON[/c] for selecionado, é possível salvar documentos incompletos",
            },
            {
              titulo:
                "Quando múltiplos formatos são selecionados, os arquivos são empacotados em um arquivo ZIP",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O checkbox de [tc-purple]JSON[/c] está sempre marcado e desabilitado (não pode ser desmarcado)",
            },
            {
              titulo:
                "O texto do botão muda conforme os formatos selecionados:",
              itens: [
                "[btn:blue:download]Baixar JSON[/btn]",
                "[btn:blue:download]Gerar Documentos[/btn]",
              ],
            },
            {
              titulo:
                "Durante o processamento, o botão exibe um ícone de carregamento e texto:",
              itens: ["[btn:blue:loading]Processando...[/btn]"],
            },
          ],
          cenariosTeste: [
            {
              titulo: "Exportação apenas em formato JSON",
              dado: "que o usuário preencheu alguns campos mas não todos obrigatórios",
              quando:
                "seleciona apenas [tc-purple]JSON[/c] e clica em [btn:blue:download]Baixar JSON[/btn]",
              entao:
                "o sistema gera o arquivo [tc-purple]JSON[/c] sem validar todos os campos",
              e_entao:
                "inicia o download do arquivo [tc-purple]JSON[/c] com o formato 'SS NNN-AAAA.json'",
            },
            {
              titulo: "Exportação em formatos DOCX e PDF",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              quando:
                "seleciona [tc-blue]DOCX[/c] e [tc-red]PDF[/c] e clica em [btn:blue:download]Gerar Documentos[/btn]",
              entao:
                "o sistema valida todos os campos, gera os arquivos e os empacota",
              e_entao: "inicia o download do arquivo ZIP com todos os formatos",
            },
            {
              titulo: "Tentativa de exportação DOCX/PDF com campos faltantes",
              dado: "que o usuário não preencheu todos os campos obrigatórios",
              quando:
                "seleciona [tc-blue]DOCX[/c] ou [tc-red]PDF[/c] e clica em [btn:blue:download]Gerar Documentos[/btn]",
              entao:
                "o sistema valida os campos e destaca os obrigatórios não preenchidos",
              e_entao: "exibe mensagens de erro e não gera os documentos",
            },
          ],
        },

        {
          id: "importacao-arquivo-json",
          categoria: "comum",
          subgrupo: "appHeader",
          titulo: "Importação de Arquivo JSON",
          icone: iconesPorTipo.importar,
          bdd: `Eu, como usuário do sistema,
Quero importar dados a partir de um arquivo JSON salvo anteriormente
Para continuar o trabalho sem precisar preencher tudo novamente`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar qualquer tipo de documentação ([tc-orange]Técnica[/c] ou [tc-green]Desenvolvimento[/c])",
            "Clicar no botão de importação [btn:import:upload/] na barra superior",
            "Selecionar um arquivo JSON previamente gerado pelo sistema",
            "Confirmar a importação se solicitado",
          ],
          criteriosAceitacao: [
            {
              titulo: "Importação de dados: o sistema deve:",
              itens: [
                "- Carregar todos os dados do arquivo [tc-purple]JSON[/c] nos campos correspondentes",
                "- Preencher informações básicas como número SS, título, descrição, datas, etc.",
                "- Recuperar listas de atividades ou requisitos conforme o tipo de documento",
                "- Preservar informações de autoria e datas originais",
              ],
            },
            {
              titulo: "Compatibilidade entre tipos de documento:",
              itens: [
                "- Verificar se o arquivo [tc-purple]JSON[/c] é compatível com o tipo de documento atual",
                "- Impedir importação de [tc-purple]JSON[/c] de [tc-orange]documentação técnica[/c] em [tc-green]documentação de desenvolvimento[/c] e vice-versa",
                "- Exibir mensagem de erro caso tente importar arquivo incompatível",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "Ao importar, os dados existentes são completamente substituídos pelos dados do arquivo",
            },
            {
              titulo:
                "Se há dados já preenchidos, o sistema solicita confirmação antes de substituí-los",
            },
            {
              titulo:
                "O sistema verifica se o tipo de documento (técnico/desenvolvimento) é compatível",
            },
            {
              titulo:
                "Informações de data original e autor são preservadas para manter histórico",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de importação [btn:import:upload/] está sempre visível na barra superior",
            },
            {
              titulo:
                "Modal de confirmação é exibido se já houver dados preenchidos",
            },
            {
              titulo:
                "Mensagem de sucesso é exibida após importação bem-sucedida",
            },
            {
              titulo:
                "Mensagem de erro específica é exibida se o formato for incompatível",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Importação bem-sucedida de arquivo JSON",
              dado: "que o usuário tem um arquivo [tc-purple]JSON[/c] válido e compatível",
              quando:
                "clica no botão de importação [btn:import:upload/] e seleciona o arquivo",
              entao:
                "o sistema carrega todos os dados nos campos correspondentes",
              e_entao:
                "exibe mensagem de sucesso [tst:success]Dados importados com sucesso![/tst]",
            },
            {
              titulo: "Importação com confirmação quando há dados existentes",
              dado: "que o usuário já preencheu alguns campos",
              quando: "tenta importar um arquivo [tc-purple]JSON[/c]",
              entao: "o sistema exibe modal de confirmação",
              e_entao: "substitui os dados apenas se o usuário confirmar",
            },
            {
              titulo: "Tentativa de importação de arquivo incompatível",
              dado: "que o usuário tenta importar um [tc-purple]JSON[/c] de tipo diferente",
              quando:
                "seleciona um arquivo [tc-purple]JSON[/c] de [tc-orange]documentação técnica[/c] na tela de desenvolvimento",
              entao: "o sistema detecta a incompatibilidade",
              e_entao: "exibe mensagem de erro explicando o problema",
            },
          ],
        },

        // --- Funcionalidades técnicas --- //
        {
          id: "cadastro-atividades",
          categoria: "doc-tecnica",
          subgrupo: "atividades",
          subsubgrupo: "crud-atividades",
          titulo: "Cadastro de Atividades",
          icone: iconesPorTipo.cadastro,
          bdd: `Eu, como líder de desenvolvimento / analista de requisitos,
Quero registrar as atividades técnicas realizadas
Para contabilizar o esforço técnico dessa SS`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-orange]Documentação Técnica[/c]",
            "Preencher o formulário de informações básicas da SS",
            'Na seção "Gerenciar Atividades", preencher o nome da atividade e estimativa de horas',
            "Clicar no botão [btn:blue]Adicionar[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Dados gerais: o usuário deve realizar as seguintes ações nos campos abaixo:",
              itens: [
                "- [tc-sky]Atividade:[/c] preenchimento obrigatório do campo do tipo texto com, no máximo, 255 caracteres",
                "- [tc-sky]Estimativa de horas:[/c] preenchimento obrigatório do campo do tipo numérico, com valor positivo maior que zero",
              ],
            },
            {
              titulo:
                "Cadastrar: ao clicar no botão Adicionar, o sistema deve seguir as seguintes regras:",
              itens: [
                "- Enquanto existem campos obrigatórios que não preenchidos, o botão [btn:blue]Adicionar[/btn] deve permanecer habilitado mas mostrar mensagem de erro quando clicado",
                "- Quando todos os campos obrigatórios estão preenchidos e o usuário clicar no botão [btn:blue]Adicionar[/btn], o sistema deve salvar a atividade na lista de atividades",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "A atividade recebe um ID interno para controle",
            },
            {
              titulo:
                "O sistema atualiza automaticamente o total de horas e pontos de função (PFs)",
            },
            {
              titulo:
                "O sistema calcula os pontos de função como: (Total de Horas / 10) * 2.5",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O campo de Atividade deve ter foco após adicionar uma nova atividade",
            },
            {
              titulo:
                "Os campos com erro de validação são destacados em vermelho",
            },
            {
              titulo:
                'O botão mostra o texto "Adicionar" para novas atividades e "Atualizar" durante edição',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Cadastro com todos os campos preenchidos corretamente",
              dado: "que o usuário deseja cadastrar uma atividade",
              e: "preencheu todos os campos obrigatórios corretamente",
              quando: "o usuário clicar no botão [btn:blue]Adicionar[/btn]",
              entao: "o sistema deverá adicionar a atividade à lista",
              e_entao:
                "exibir a seguinte mensagem: [tst:success]Atividade cadastrada com sucesso![/tst]",
            },
            {
              titulo: "Tentativa de cadastro sem informar nome da atividade",
              dado: "que o usuário deseja cadastrar uma atividade",
              e: "não preencheu o campo de nome da atividade",
              quando: "o usuário clicar no botão [btn:blue]Adicionar[/btn]",
              entao:
                "o sistema deverá destacar o campo de nome da atividade em vermelho",
              e_entao:
                "exibir a mensagem de erro: [tst:error]O campo Atividade é obrigatório[/tst]",
            },
            {
              titulo: "Tentativa de cadastro com horas zeradas ou negativas",
              dado: "que o usuário deseja cadastrar uma atividade",
              e: "preencheu o valor de horas com zero ou um número negativo",
              quando: "o usuário clicar no botão [btn:blue]Adicionar[/btn]",
              entao: "o sistema deverá destacar o campo de horas em vermelho",
              e_entao:
                "exibir a mensagem de erro: [tst:error]O valor de horas deve ser maior que zero[/tst]",
            },
          ],
        },
        {
          id: "listagem-atividades",
          categoria: "doc-tecnica",
          subgrupo: "atividades",
          subsubgrupo: "crud-atividades",
          titulo: "Listagem de Atividades",
          icone: iconesPorTipo.listagem,
          bdd: `Eu, como líder de desenvolvimento / analista de requisitos,
Quero visualizar todas as atividades cadastradas em uma lista ordenada
Para ter uma visão clara do trabalho realizado e poder reorganizá-las conforme necessário`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-orange]Documentação Técnica[/c]",
            "As atividades já cadastradas são exibidas na tabela 'Lista de Atividades'",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Listagem: o sistema deve exibir as atividades com as seguintes informações:",
              itens: [
                "- [tc-sky]Atividade:[/c] nome da atividade cadastrada",
                "- [tc-sky]Estimativa de horas:[/c] horas registradas para a atividade",
                "- [tc-sky]Ações:[/c] botões para editar e remover a atividade",
              ],
            },
            {
              titulo:
                "Reordenação: o sistema deve permitir a reorganização das atividades através de drag and drop:",
              itens: [
                "- Ao clicar e segurar em uma linha da tabela, o usuário deve poder arrastá-la para uma nova posição",
                "- Ao soltar a linha em uma nova posição, o sistema deve atualizar a ordem das atividades",
                "- A ordem das atividades deve ser preservada ao gerar a documentação",
              ],
            },
            {
              titulo: "Rodapé da tabela: o sistema deve exibir:",
              itens: [
                "- **Total de horas:** soma das horas de todas as atividades listadas",
                "- **Quantidade de PF:** cálculo automático dos pontos de função com base no total de horas",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "A lista sempre exibe todas as atividades cadastradas para a SS atual",
            },
            {
              titulo:
                "A reordenação é salva automaticamente após arrastar e soltar",
            },
            {
              titulo:
                "A quantidade de PF é calculada como (Total de Horas / 10) * 2.5",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O cursor deve mudar para 'move' quando passar sobre as linhas da tabela para indicar que podem ser arrastadas",
            },
            {
              titulo:
                "Durante o arrasto, uma linha tracejada ou destacada deve indicar a posição onde a atividade será inserida",
            },
            {
              titulo:
                "A tabela deve ter uma linha de rodapé com o total de horas e a quantidade de PF calculada",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização da lista com múltiplas atividades",
              dado: "que existem atividades cadastradas",
              quando:
                "o usuário acessa a tela de [tc-orange]Documentação Técnica[/c]",
              entao:
                "o sistema deve exibir todas as atividades cadastradas na tabela",
              e_entao:
                "mostrar o total de horas e pontos de função no rodapé da tabela",
            },
            {
              titulo: "Reordenação de atividades",
              dado: "que existem pelo menos duas atividades cadastradas",
              quando:
                "o usuário arrasta uma atividade para uma nova posição e solta",
              entao: "o sistema deve reorganizar a lista conforme a nova ordem",
              e_entao: "manter essa ordem para a geração da documentação",
            },
          ],
        },
        {
          id: "editar-atividades",
          categoria: "doc-tecnica",
          subgrupo: "atividades",
          subsubgrupo: "crud-atividades",
          titulo: "Edição de Atividades",
          icone: iconesPorTipo.edicao,
          bdd: `Eu, como usuário,
Quero editar atividades já cadastradas
Para corrigir ou atualizar informações sobre o trabalho realizado`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar [tc-orange]Documentação Técnica[/c]",
            "Na lista de atividades, clicar no ícone de edição [btn:edit:pencil/] de uma atividade",
            "Modificar os campos desejados",
            "Clicar em [btn:green]Atualizar[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo: "Edição de campos: o sistema deve permitir modificar:",
              itens: [
                "- [tc-sky]Nome da atividade[/c]",
                "- [tc-sky]Quantidade de horas estimadas[/c]",
                "- O botão 'Adicionar' deve mudar para 'Atualizar' durante a edição",
              ],
            },
            {
              titulo: "Validações durante edição:",
              itens: [
                "- As mesmas validações do cadastro são aplicadas (campos obrigatórios, valores positivos, etc.)",
                "- Não permitir salvar se houver campos inválidos",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "Ao editar uma atividade, os campos são preenchidos com os valores atuais",
            },
            {
              titulo:
                "O botão muda de [btn:blue]Adicionar[/btn] para [btn:green]Atualizar[/btn] durante a edição",
            },
            {
              titulo:
                "Após salvar, o formulário é limpo e volta ao modo de adição",
            },
            {
              titulo:
                "O sistema recalcula automaticamente o total de horas e pontos de função (PFs)",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "Ícone de lápis :pencil: indica a opção de edição na tabela de atividades",
            },
            {
              titulo:
                "O botão principal tem cor diferente durante o modo de edição para destacar a operação",
            },
            {
              titulo:
                "Validações visuais de campos são aplicadas durante a edição",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Edição bem-sucedida de atividade",
              dado: "que o usuário selecionou uma atividade para edição",
              quando:
                "modifica os campos e clica em [btn:green]Atualizar[/btn]",
              entao: "o sistema atualiza a atividade na lista",
              e_entao:
                "recalcula os totais, limpa o formulário e exibe [tst:success]Atividade cadastrada com sucesso![/tst]",
            },
            {
              titulo: "Cancelamento de edição",
              dado: "que o usuário está editando uma atividade",
              quando:
                "decide não prosseguir e clica em uma área fora do formulário",
              entao: "o sistema mantém o modo de edição",
              e_entao:
                "não modifica a atividade original até que o usuário confirme",
            },
            {
              titulo: "Validação durante edição",
              dado: "que o usuário está editando uma atividade",
              quando:
                "remove o conteúdo de um campo obrigatório e tenta atualizar",
              entao: "o sistema exibe o campo com erro",
              e_entao:
                "não permite a atualização até que o campo seja corrigido",
            },
          ],
        },

        {
          id: "remocao-atividades",
          categoria: "doc-tecnica",
          subgrupo: "atividades",
          subsubgrupo: "crud-atividades",
          titulo: "Remoção de Atividades",
          icone: iconesPorTipo.remocao,
          bdd: `Eu, como líder de desenvolvimento / analista de requisitos,
Quero poder remover atividades técnicas incorretas ou desnecessárias
Para manter a documentação precisa e atualizada`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-orange]Documentação Técnica[/c]",
            "Preencher o formulário de informações básicas da SS",
            'Na seção "Lista de Atividades", localizar a atividade desejada',
            "Clicar no botão de remover [btn:delete:trash/]",
          ],
          criteriosAceitacao: [
            {
              titulo: "Remoção: ao clicar no botão de remover, o sistema deve:",
              itens: [
                '- Exibir um modal de confirmação com a mensagem "Tem certeza que deseja remover a atividade: [nome da atividade]?"',
                "- Apresentar os botões [btn:gray]Cancelar[/btn] e [btn:red]Remover[/btn]",
                "- Se clicar em **Cancelar**, fechar o modal sem realizar alterações",
                "- Se clicar em **Remover**, excluir a atividade da lista e recalcular o total de horas e pontos de função",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "A remoção é permanente e não pode ser desfeita",
            },
            {
              titulo:
                "O sistema atualiza automaticamente o total de horas e pontos de função após a remoção",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de remoção é representado por um ícone de lixeira :trash:",
            },
            {
              titulo:
                'O modal de confirmação deve ter o tipo "caution" (vermelho)',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção confirmada",
              dado: "que o usuário deseja remover uma atividade",
              quando:
                "o usuário clica no botão de remoção e confirma no modal clicando em [btn:red]Remover[/btn]",
              entao: "o sistema remove a atividade da lista",
              e_entao: "recalcula o total de horas e pontos de função",
            },
            {
              titulo: "Remoção cancelada",
              dado: "que o usuário clica no botão de remoção de uma atividade",
              quando:
                "o usuário clica em [btn:gray]Cancelar[/btn] no modal de confirmação",
              entao: "o sistema fecha o modal",
              e_entao: "a atividade permanece na lista sem alterações",
            },
          ],
        },

        {
          id: "geracao-documentacao-tecnica",
          categoria: "doc-tecnica",
          titulo: "Geração de Documentação Técnica",
          icone: iconesPorTipo.exportar,
          bdd: `Eu, como líder de desenvolvimento / analista de requisitos,
Quero gerar [tc-orange]documentação técnica[/c] em diferentes formatos
Para facilitar a comunicação e o registro formal do trabalho realizado`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-orange]Documentação Técnica[/c]",
            "Preencher todos os campos obrigatórios do formulário",
            "Adicionar pelo menos uma atividade",
            "Selecionar os formatos desejados (JSON, DOCX, PDF)",
            "Clicar no botão [btn:blue:download]Gerar Documentos[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Validação antes da geração: o sistema deve verificar se os seguintes requisitos estão atendidos:",
              itens: [
                "- Campos obrigatórios da SS estão preenchidos (Número, Ano, Título, Descrição, Data de Início, Data de Fim)",
                "- Pelo menos um autor está selecionado",
                "- Pelo menos uma atividade está adicionada",
                "- Caso algum requisito não seja atendido, exibir mensagem de erro destacando os campos com problema",
              ],
            },
            {
              titulo:
                "Seleção de formatos: o sistema deve permitir a seleção de diferentes formatos:",
              itens: [
                "- [tc-purple]JSON[/c] (sempre selecionado por padrão, não pode ser desmarcado)",
                "- [tc-blue]DOCX[/c] (opcional)",
                "- [tc-red]PDF[/c] (opcional)",
                "- O texto do botão muda para [btn:blue:download]Baixar JSON[/btn] quando apenas [tc-purple]JSON[/c] está selecionado",
                "- O texto do botão é [btn:blue:download]Gerar Documentos[/btn] quando [tc-blue]DOCX[/c] e/ou [tc-red]PDF[/c] estão selecionados",
              ],
            },
            {
              titulo:
                "Geração de documentos: ao clicar no botão, o sistema deve:",
              itens: [
                "- Exibir indicador de carregamento durante o processamento",
                "- Se apenas [tc-purple]JSON[/c] estiver selecionado, não é necessário validar todos os campos obrigatórios (útil para salvar rascunhos)",
                "- Se [tc-blue]DOCX[/c] e/ou [tc-red]PDF[/c] estiverem selecionados, validar todos os campos obrigatórios",
                "- Gerar os documentos nos formatos selecionados",
                "- Disponibilizar os arquivos para download",
                "- Exibir mensagem de sucesso após a geração",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "[tc-purple]JSON[/c] é sempre gerado, independentemente de outras seleções",
            },
            {
              titulo:
                "[tc-blue]DOCX[/c] e [tc-red]PDF[/c] são opcionais e podem ser selecionados individualmente ou em conjunto",
            },
            {
              titulo:
                "Quando apenas [tc-purple]JSON[/c] é selecionado, o sistema permite salvar documentos incompletos (sem validar todos os campos)",
            },
            {
              titulo:
                "Quando [tc-blue]DOCX[/c] e/ou [tc-red]PDF[/c] são selecionados, todos os campos obrigatórios devem ser preenchidos",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de geração exibe um spinner de carregamento durante o processamento",
            },
            {
              titulo:
                "O texto do botão muda de acordo com os formatos selecionados",
            },
            {
              titulo:
                "Os formatos são selecionados através de checkboxes, com [tc-purple]JSON[/c] sempre marcado e desabilitado",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Geração de todos os formatos com dados completos",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              e: "adicionou pelo menos uma atividade",
              e: "selecionou os formatos [tc-purple]JSON[/c], [tc-blue]DOCX[/c] e [tc-red]PDF[/c]",
              quando:
                "o usuário clica em [btn:blue:download]Gerar Documentos[/btn]",
              entao: "o sistema deve processar e gerar os três formatos",
              e_entao:
                "exibir: [tst:info]Gerando documentos...[/tst] durante o processamento e ao final: [tst:success]Documento gerado com sucesso![/tst]",
            },
            {
              titulo: "Geração apenas de [tc-purple]JSON[/c] (rascunho)",
              dado: "que o usuário preencheu parcialmente os campos",
              e: "manteve apenas o formato [tc-purple]JSON[/c] selecionado",
              quando: "o usuário clica em [btn:blue:download]Baixar JSON[/btn]",
              entao:
                "o sistema deve gerar o arquivo [tc-purple]JSON[/c] mesmo com campos obrigatórios não preenchidos",
              e_entao:
                "exibir: [tst:info]Gerando JSON...[/tst] durante o processamento e ao final: [tst:success]Arquivo JSON gerado com sucesso![/tst]",
            },
            {
              titulo: "Tentativa de geração sem atividades",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              e: "não adicionou nenhuma atividade",
              e: "selecionou os formatos [tc-purple]JSON[/c], [tc-blue]DOCX[/c] e [tc-red]PDF[/c]",
              quando:
                "o usuário clica em [btn:blue:download]Gerar Documentos[/btn]",
              entao: "o sistema deve exibir mensagem de erro",
              e_entao:
                "destacar a área de atividades com [tst:error]Adicione pelo menos uma atividade[/tst]",
            },
          ],
        },

        // --- Funcionalidades de desenvolvimento --- //
        {
          id: "cadastro-requisito-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "crud-rf",
          titulo: "Cadastro de Requisito Funcional",
          icone: iconesPorTipo.cadastro,
          bdd: `Eu, como analista de requisitos,
Quero cadastrar requisitos funcionais detalhados
Para documentar as especificações do sistema que precisam ser implementadas`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            "Preencher o formulário de informações básicas da SS",
            "Na aba **Requisitos Funcionais**, clicar no botão [btn:blue]Adicionar Requisito Funcional[/btn]",
            "Preencher os campos no modal que será aberto",
            "Clicar no botão [btn:blue]Salvar[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Modal de cadastro: o modal deve conter as seguintes abas e campos:",
              itens: [
                "**Aba 1** - Informações básicas:",
                "- [tc-sky]Título:[/c] campo obrigatório de texto para o título do requisito",
                "- [tc-sky]Tipo:[/c] seleção obrigatória entre Alteração, Inclusão ou Remoção",
                "- [tc-sky]Local:[/c] campo obrigatório para informar onde o requisito será implementado",
                "- [tc-sky]Usuário:[/c] campo obrigatório para informar o perfil de usuário",
                "- [tc-sky]Perfil:[/c] campo obrigatório para informar o perfil de acesso",
                "**Aba 2** - Imagens e Descrição:",
                "- [tc-sky]Imagens:[/c] área para upload de múltiplas imagens (opcional)",
                "- [tc-sky]Descrição:[/c] campo obrigatório com editor de texto rico para detalhar o requisito",
                "**Aba 3** - Regras:",
                "- [tc-sky]Regras de validações dos campos:[/c] editor de texto rico (opcional)",
                "- [tc-sky]Regras de negócio:[/c] editor de texto rico (opcional)",
                "**Aba 4** - Banco de dados:",
                "- [tc-sky]Mudança de banco:[/c] editor de texto rico para detalhar mudanças no banco (opcional)",
              ],
            },
            {
              titulo:
                "Validação e salvamento: ao clicar em salvar, o sistema deve:",
              itens: [
                "- Validar todos os campos obrigatórios",
                "- Se houver campos obrigatórios não preenchidos, destacar campos com erro e focar no primeiro campo com problema",
                "- Se todos os campos obrigatórios estiverem preenchidos, salvar o requisito",
                "- Atribuir ID sequencial no formato RF-XX (RF-01, RF-02, etc.)",
                "- Exibir mensagem de sucesso e fechar o modal",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "O ID do requisito funcional segue o formato RF-XX, onde XX é um número sequencial iniciando em 01",
            },
            {
              titulo:
                "Os campos de regras e banco de dados são opcionais, mas a descrição é obrigatória",
            },
            {
              titulo:
                "Campos fixados como padrão são aplicados a novos requisitos automaticamente",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O modal permite navegação entre abas por cliques ou usando TAB",
            },
            {
              titulo:
                "O editor de texto rico permite formatação básica (negrito, itálico, listas, etc.)",
            },
            {
              titulo: "Campos com erro de validação são destacados em vermelho",
            },
            {
              titulo:
                "Campos podem ser fixados como padrão clicando no ícone de cadeado :unlock: ao lado do campo",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Cadastro com todos os campos obrigatórios preenchidos",
              dado: "que o usuário deseja cadastrar um novo requisito funcional",
              e: "preencheu todos os campos obrigatórios",
              quando: "o usuário clica em [btn:blue]Salvar[/btn]",
              entao: "o sistema deve salvar o requisito com um ID sequencial",
              e_entao:
                "exibir mensagem [tst:success]Requisito RF-XX adicionado com sucesso![/tst]",
            },
            {
              titulo: "Tentativa de cadastro sem preencher campos obrigatórios",
              dado: "que o usuário deseja cadastrar um novo requisito funcional",
              e: "não preencheu todos os campos obrigatórios",
              quando: "o usuário clica em [btn:blue]Salvar[/btn]",
              entao:
                "o sistema deve destacar os campos não preenchidos em vermelho",
              e_entao: "focar no primeiro campo com erro",
            },
            {
              titulo: "Uso de campos padrão",
              dado: "que o usuário fixou valores para Tipo, Local e Perfil",
              quando: "o usuário abre o modal para cadastrar um novo requisito",
              entao:
                "o sistema deve preencher automaticamente os campos fixados com os valores padrão",
            },
          ],
        },

        {
          id: "listagem-requisito-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "crud-rf",
          titulo: "Listagem de Requisito Funcionais",
          icone: iconesPorTipo.listagem,
          bdd: `Eu, como analista de requisitos,
Quero visualizar todos os requisitos funcionais em uma lista ordenada
Para ter uma visão geral e poder reorganizá-los conforme a ordem lógica de implementação`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            "Selecionar a aba **Requisitos Funcionais**",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Exibição da lista: o sistema deve exibir os requisitos funcionais com as seguintes informações:",
              itens: [
                "- [tc-sky]ID:[/c] identificador sequencial no formato RF-XX",
                "- [tc-sky]Título:[/c] título do requisito funcional",
                "- [tc-sky]Local:[/c] local de implementação do requisito",
                "- [tc-sky]Tipo:[/c] tipo do requisito (Alteração, Inclusão ou Remoção)",
                "- [tc-sky]Ações:[/c] botões para visualizar, editar, duplicar e remover o requisito",
              ],
            },
            {
              titulo: "Reordenação por drag and drop: o sistema deve permitir:",
              itens: [
                "- Arrastar e soltar requisitos para reorganizá-los",
                "- Atualizar automaticamente os IDs para refletir a nova ordem",
                ">exemplo: Se `RF-03` for movido para a primeira posição, ele se torna `RF-01`, e os outros são renumerados sequencialmente",
              ],
            },
            {
              titulo: "Botão de adição: o sistema deve exibir:",
              itens: [
                "- Um botão [btn:blue]Adicionar Requisito Funcional[/btn] acima ou abaixo da tabela",
                "- Este botão deve abrir o modal de cadastro de novo requisito quando clicado",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "Os requisitos são sempre exibidos na ordem dos IDs, do menor para o maior",
            },
            {
              titulo:
                "A reordenação sempre atualiza os IDs para manter a sequência contínua",
            },
            {
              titulo:
                "A ordem dos requisitos é preservada ao gerar a documentação",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O cursor deve mudar para :move: ao passar sobre as linhas da tabela para indicar que podem ser arrastadas",
            },
            {
              titulo:
                "Durante o arrasto, uma sombra ou linha destacada deve indicar a posição onde o requisito será inserido",
            },
            {
              titulo:
                "A tabela tem paginação se houver muitos requisitos, mostrando até 10 por página por padrão",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização da lista com múltiplos requisitos",
              dado: "que existem requisitos funcionais cadastrados",
              quando: 'o usuário acessa a aba "Requisitos Funcionais"',
              entao: "o sistema deve exibir todos os requisitos na tabela",
              e_entao: "mostrar os botões de ação para cada requisito",
            },
            {
              titulo: "Reordenação de requisitos",
              dado: "que existem pelo menos dois requisitos funcionais",
              quando:
                "o usuário arrasta um requisito para uma nova posição e solta",
              entao: "o sistema deve reorganizar a lista conforme a nova ordem",
              e_entao: "atualizar os IDs para refletir a nova sequência",
            },
            {
              titulo: "Lista vazia",
              dado: "que não existem requisitos funcionais cadastrados",
              quando: 'o usuário acessa a aba "Requisitos Funcionais"',
              entao:
                "o sistema deve exibir apenas o botão [btn:blue]Adicionar Requisito Funcional[/btn]",
              e_entao: "não mostrar a tabela de listagem",
            },
          ],
        },

        {
          id: "visualizacao-requisito-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "crud-rf",
          titulo: "Visualização de Requisito Funcional",
          icone: iconesPorTipo.visualizacao,
          bdd: `Eu, como analista de requisitos,
Quero visualizar os detalhes completos de um requisito funcional
Para verificar suas especificações sem risco de alteração acidental`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", localizar o requisito desejado na lista',
            "Clicar no botão de visualização [btn:view:eye/]",
          ],
          criteriosAceitacao: [
            {
              titulo: "Modal de visualização: o modal deve:",
              itens: [
                "- Abrir no modo somente leitura (todos os campos desabilitados)",
                "- Ter o título 'Visualizar Requisito Funcional'",
                "- Exibir todos os dados do requisito, inclusive imagens",
                "- Permitir navegação entre as abas mas não a edição dos campos",
                "- Apresentar apenas o botão [btn:blue]Voltar[/btn] no rodapé",
              ],
            },
            {
              titulo: "Exibição de campos não preenchidos: o sistema deve:",
              itens: [
                '- Exibir a mensagem "Não preenchido" em campos opcionais que não possuem conteúdo',
                "- Mostrar todas as imagens anexadas, se houver",
                '- Exibir a mensagem "Não foram inseridas imagens nesse RF" se não houver imagens',
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "O modo de visualização não permite nenhuma alteração nos dados",
            },
            {
              titulo:
                "Todos os dados são exibidos, mesmo os campos opcionais não preenchidos",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de visualização é representado por um ícone de olho :eye: na lista de requisitos",
            },
            {
              titulo:
                "Os campos aparecem em modo somente leitura, com visual diferente dos campos editáveis",
            },
            {
              titulo:
                "Os ícones de cadeado :unlock: para fixar campos como padrão não são exibidos no modo visualização",
            },
            {
              titulo:
                "O botão de upload de imagens não é exibido no modo visualização",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização de requisito completo",
              dado: "que existe um requisito funcional com todos os campos preenchidos",
              quando:
                "o usuário clica no ícone de visualização desse requisito [btn:view:eye/]",
              entao: "o sistema deve abrir o modal no modo somente leitura",
              e_entao: "exibir todos os dados do requisito sem permitir edição",
            },
            {
              titulo:
                "Visualização de requisito com campos opcionais não preenchidos",
              dado: "que existe um requisito com alguns campos opcionais não preenchidos",
              quando:
                "o usuário clica no ícone de visualização desse requisito [btn:view:eye/]",
              entao: "o sistema deve abrir o modal no modo somente leitura",
              e_entao: 'exibir "Não preenchido" nos campos opcionais vazios',
            },
            {
              titulo: "Retorno à lista de requisitos",
              dado: "que o usuário está visualizando um requisito",
              quando: "o usuário clica no botão [btn:blue]Voltar[/btn]",
              entao: "o sistema deve fechar o modal de visualização",
              e_entao: "retornar à lista de requisitos",
            },
          ],
        },

        {
          id: "edicao-requisito-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "crud-rf",
          titulo: "Edição de Requisito Funcional",
          icone: iconesPorTipo.edicao,
          bdd: `Eu, como analista de requisitos,
Quero editar requisitos funcionais já cadastrados
Para atualizar ou corrigir as especificações conforme necessário`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", localizar o requisito desejado na lista',
            "Clicar no botão de edição [btn:edit:pencil/]",
            "Alterar os campos desejados no modal que será aberto",
            "Clicar no botão [btn:blue]Salvar[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo: "Modal de edição: o modal deve:",
              itens: [
                "- Abrir preenchido com todos os dados atuais do requisito",
                "- Ter o título 'Editar Requisito Funcional'",
                "- Manter o mesmo ID do requisito sendo editado",
                "- Permitir a edição de todos os campos",
                "- Aplicar as mesmas regras de validação do cadastro",
                "- Permitir salvar apenas se todos os campos obrigatórios estiverem preenchidos",
              ],
            },
            {
              titulo:
                "Salvamento das alterações: ao clicar em Salvar, o sistema deve:",
              itens: [
                "- Validar todos os campos obrigatórios",
                "- Se houver campos não preenchidos, destacar campos com erro",
                "- Se todos os campos obrigatórios estiverem preenchidos, atualizar o requisito mantendo o mesmo ID",
                "- Exibir mensagem de sucesso e fechar o modal",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "O ID do requisito não é alterado durante a edição",
            },
            {
              titulo: "Todos os campos podem ser editados, inclusive o título",
            },
            {
              titulo:
                "As mesmas validações do cadastro são aplicadas na edição",
            },
            {
              titulo:
                "O recurso de fixar campos como padrão está disponível também na edição",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de edição é representado por um ícone de lápis :pencil: na lista de requisitos",
            },
            {
              titulo:
                "O modal de edição é visualmente idêntico ao de cadastro, mas com o título diferente",
            },
            {
              titulo:
                'O botão de salvar exibe o texto "Atualizar" em vez de "Salvar" para indicar edição',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Edição bem-sucedida de requisito",
              dado: "que o usuário deseja editar um requisito existente",
              e: "alterou alguns campos mantendo todos os obrigatórios preenchidos",
              quando: "o usuário clica em [btn:blue]Salvar[/btn]",
              entao: "o sistema deve salvar as alterações do requisito",
              e_entao:
                "exibir mensagem [tst:success]O requisito RF-XX foi atualizado com sucesso![/tst]",
            },
            {
              titulo: "Tentativa de edição removendo dados obrigatórios",
              dado: "que o usuário está editando um requisito",
              e: "removeu o conteúdo de um campo obrigatório",
              quando: "o usuário clica em [btn:blue]Salvar[/btn]",
              entao: "o sistema deve destacar o campo obrigatório em vermelho",
              e_entao: "manter o modal aberto sem salvar as alterações",
            },
            {
              titulo: "Fixação de campo como padrão durante a edição",
              dado: "que o usuário está editando um requisito",
              quando:
                "o usuário clica no ícone de cadeado :unlock: ao lado de um campo",
              entao:
                "o sistema deve fixar aquele valor como padrão para novos requisitos",
              e_entao:
                'exibir mensagem [tst:success]Campo "tipo" definido como padrão[/tst]',
            },
          ],
        },

        {
          id: "duplicacao-requisito-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "crud-rf",
          titulo: "Duplicação de Requisito Funcional",
          icone: iconesPorTipo.duplicacao,
          bdd: `Eu, como analista de requisitos,
Quero duplicar requisitos funcionais existentes
Para acelerar o cadastro de requisitos similares, aproveitando informações já preenchidas`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", localizar o requisito desejado na lista',
            "Clicar no botão de duplicação [btn:copy:duplicate/]",
            "Revisar e alterar os campos no modal que será aberto",
            "Clicar no botão [btn:blue]Salvar[/btn] para confirmar a duplicação",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Criação da cópia: ao clicar no botão de duplicar, o sistema deve:",
              itens: [
                "- Abrir o modal de cadastro preenchido com todos os dados do requisito original",
                "- Gerar um ID temporário (RF-XX) para o novo requisito",
                "- Modificar o título adicionando o prefixo '(Cópia)' para indicar que é uma duplicação",
                "- Manter todas as informações dos campos: tipo, local, usuário, perfil, descrição, validações, regras e banco",
                "- Preservar todas as imagens anexadas ao requisito original",
              ],
            },
            {
              titulo: "Edição da cópia: o modal deve permitir:",
              itens: [
                "- Editar qualquer campo antes de salvar a duplicação",
                "- Aplicar as mesmas validações do cadastro normal",
                "- Permitir adicionar ou remover imagens da cópia",
                "- Alterar o título removendo o prefixo '(Cópia)' se desejado",
                "- Fixar novos valores como padrão usando o ícone de cadeado :unlock:",
              ],
            },
            {
              titulo: "Salvamento da duplicação: ao confirmar, o sistema deve:",
              itens: [
                "- Validar todos os campos obrigatórios",
                "- Atribuir um ID sequencial definitivo (RF-XX)",
                "- Adicionar o novo requisito ao final da lista",
                "- Exibir mensagem de sucesso",
                "- Fechar o modal e retornar à lista atualizada",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "A duplicação cria um novo requisito independente do original",
            },
            {
              titulo: "O ID do requisito duplicado é sempre novo e sequencial",
            },
            {
              titulo:
                "Todas as imagens são copiadas como base64 para o novo requisito",
            },
            {
              titulo:
                "O prefixo '(Cópia)' é adicionado automaticamente ao título para identificação",
            },
            {
              titulo:
                "A duplicação não afeta o requisito original de forma alguma",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de duplicação é representado por um ícone de cópia :duplicate: na lista de requisitos",
            },
            {
              titulo:
                "O modal de duplicação é idêntico ao de cadastro, mas com título 'Duplicar Requisito Funcional'",
            },
            {
              titulo:
                "Todos os campos são pré-preenchidos com os dados do requisito original",
            },
            {
              titulo:
                "O botão de salvar exibe o texto [btn:blue]Salvar[/btn] (não 'Atualizar' como na edição)",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Duplicação bem-sucedida de requisito completo",
              dado: "que existe um requisito funcional com todos os campos preenchidos",
              quando:
                "o usuário clica no ícone de duplicação [btn:copy:duplicate/] e confirma salvando",
              entao: "o sistema deve criar um novo requisito com ID sequencial",
              e_entao:
                "adicionar '(Cópia)' ao título e preservar todos os outros dados",
            },
            {
              titulo: "Edição de campos durante a duplicação",
              dado: "que o usuário iniciou a duplicação de um requisito",
              quando: "altera o título, tipo e descrição antes de salvar",
              entao:
                "o sistema deve salvar o novo requisito com as alterações feitas",
              e_entao:
                "manter os campos não alterados com os valores originais",
            },
            {
              titulo: "Duplicação de requisito com imagens",
              dado: "que um requisito possui múltiplas imagens anexadas",
              quando: "o usuário duplica esse requisito",
              entao:
                "o sistema deve copiar todas as imagens para o novo requisito",
              e_entao:
                "permitir adicionar, remover ou manter as imagens na duplicação",
            },
            {
              titulo: "Cancelamento da duplicação",
              dado: "que o usuário abriu o modal de duplicação",
              quando: "fecha o modal sem salvar",
              entao: "o sistema deve descartar a duplicação",
              e_entao: "não criar nenhum novo requisito na lista",
            },
          ],
        },

        {
          id: "remocao-requisito-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "crud-rf",
          titulo: "Remoção de Requisito Funcional",
          icone: iconesPorTipo.remocao,
          bdd: `Eu, como analista de requisitos,
Quero remover requisitos funcionais que não são mais necessários
Para manter a documentação atualizada e relevante`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", localizar o requisito desejado na lista',
            "Clicar no botão de remoção [btn:delete:trash/]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Confirmação de remoção: ao clicar no botão de remover, o sistema deve:",
              itens: [
                '- Exibir um modal de confirmação com o título "Remover o [ID-Requisito]"',
                '- Mostrar a mensagem "Tem certeza que deseja remover o requisito: [título do requisito]?"',
                "- Apresentar os botões [btn:gray]Cancelar[/btn] e [btn:red]Remover[/btn]",
                "- Se o usuário clicar em **Cancelar**, fechar o modal sem realizar alterações",
                "- Se o usuário clicar em **Remover**, excluir o requisito e atualizar a lista",
              ],
            },
            {
              titulo: "Atualização de IDs após remoção: o sistema deve:",
              itens: [
                "- Remover o requisito da lista",
                "- Atualizar automaticamente os IDs dos requisitos restantes para manter a sequência",
                ">exemplo: Se `RF-02` for removido, o `RF-03` passa a ser `RF-02`, `RF-04` passa a ser `RF-03`, e assim por diante",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "A remoção é permanente e não pode ser desfeita",
            },
            {
              titulo:
                "Os IDs são sempre atualizados para manter a sequência contínua",
            },
            {
              titulo:
                "A sequência de IDs sempre começa em RF-01 e continua sem lacunas",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de remoção é representado por um ícone de lixeira :trash: na lista de requisitos",
            },
            {
              titulo: 'O modal de confirmação tem o tipo "caution" (vermelho)',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção confirmada de requisito",
              dado: "que o usuário deseja remover um requisito",
              quando:
                "o usuário clica no ícone de lixeira [btn:delete:trash/] e confirma clicando em [btn:red]Remover[/btn]",
              entao: "o sistema deve remover o requisito da lista",
              e_entao:
                "atualizar automaticamente os IDs dos requisitos restantes",
            },
            {
              titulo: "Cancelamento da remoção",
              dado: "que o usuário clicou no ícone de lixeira de um requisito :trash:",
              quando:
                "o usuário clica em [btn:gray]Cancelar[/btn] no modal de confirmação",
              entao: "o sistema deve fechar o modal",
              e_entao: "manter o requisito na lista sem alterações",
            },
            {
              titulo: "Verificação da atualização de IDs",
              dado: "que existem os requisitos RF-01, RF-02 e RF-03",
              quando: "o usuário remove o RF-02",
              entao: "o RF-03 deve ser renumerado para RF-02",
              e_entao:
                "a lista deve conter apenas RF-01 e RF-02 (antigo RF-03)",
            },
          ],
        },

        {
          id: "adicao-imagem-rf",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "imagens",
          categoria: "doc-dev",
          titulo: "Adição de Imagens em Requisito Funcional",
          icone: iconesPorTipo.cadastro,
          bdd: `Eu, como analista de requisitos,
Quero adicionar imagens aos requisitos funcionais
Para ilustrar melhor as especificações e facilitar o entendimento`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", clicar em [btn:blue]Adicionar Requisito Funcional[/btn] ou editar um existente',
            'Navegar para a aba "Imagens e Descrição"',
            "Clicar no botão [btn:gray]Selecionar imagens[/btn]",
            "Escolher as imagens desejadas no explorador de arquivos",
            "Clicar em [btn:blue]Salvar[/btn] para confirmar o requisito",
          ],
          criteriosAceitacao: [
            {
              titulo: "Seleção de imagens: o sistema deve permitir:",
              itens: [
                "- Upload de múltiplas imagens simultaneamente",
                "- Aceitar formatos comuns: JPG, JPEG, PNG, GIF, WEBP",
                "- Validar tamanho máximo de 5MB para o total de todas as imagens",
                "- Exibir preview das imagens selecionadas imediatamente após o upload",
              ],
            },
            {
              titulo: "Área de upload: o sistema deve apresentar:",
              itens: [
                "- Botão [btn:gray]Selecionar imagens[/btn] claramente visível",
                "- Suporte a drag and drop para facilitar o upload",
                "- Indicador visual quando imagens estão sendo processadas",
                "- Grade de visualização das imagens após o upload",
              ],
            },
            {
              titulo: "Validações: o sistema deve:",
              itens: [
                "- Rejeitar arquivos que não sejam imagens válidas",
                "- Alertar quando o tamanho total exceder 5MB",
                "- Mostrar informações de tamanho de cada imagem",
                "- Preservar qualidade das imagens no formato base64",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "As imagens são convertidas para base64 e armazenadas junto com o requisito",
            },
            {
              titulo:
                "O limite total de 5MB visa manter a performance do sistema",
            },
            {
              titulo:
                "As imagens são opcionais - um requisito pode não ter imagens",
            },
            {
              titulo:
                "A ordem das imagens na grade é preservada na documentação gerada",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "As imagens são exibidas em uma grade responsiva de 3 colunas",
            },
            {
              titulo:
                "Cada imagem mostra uma miniatura com indicador de tamanho",
            },
            {
              titulo:
                "Botão de upload usa ícones intuitivos e texto descritivo",
            },
            {
              titulo:
                "Feedback visual imediato para uploads bem-sucedidos ou com erro",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Upload bem-sucedido de múltiplas imagens",
              dado: "que o usuário está na aba 'Imagens e Descrição' de um requisito",
              quando:
                "seleciona múltiplas imagens válidas dentro do limite de tamanho",
              entao:
                "o sistema deve processar e exibir todas as imagens na grade",
              e_entao: "mostrar o tamanho individual de cada imagem",
            },
            {
              titulo: "Tentativa de upload excedendo limite de tamanho",
              dado: "que o usuário tenta adicionar imagens",
              quando: "o tamanho total das imagens selecionadas excede 5MB",
              entao: "o sistema deve rejeitar o upload",
              e_entao:
                "exibir mensagem informando o limite e sugerindo usar imagens menores",
            },
            {
              titulo: "Upload de arquivo inválido",
              dado: "que o usuário tenta fazer upload de um arquivo",
              quando: "seleciona um arquivo que não é uma imagem válida",
              entao: "o sistema deve rejeitar o arquivo",
              e_entao: "exibir mensagem informando os formatos aceitos",
            },
          ],
        },

        {
          id: "listagem-imagens-rf",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "imagens",
          titulo: "Listagem de Imagens em Requisito Funcional",
          icone: iconesPorTipo.listagem,
          bdd: `Eu, como usuário do sistema,
Quero visualizar e reorganizar todas as imagens de um requisito funcional em grade
Para ter controle total sobre a ordem de inserção e facilitar sua gestão`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", visualizar ou editar qualquer requisito',
            'Navegar para a aba "Imagens e Descrição"',
            "As imagens cadastradas são exibidas automaticamente na grade com recursos de reordenação",
          ],
          criteriosAceitacao: [
            {
              titulo: "Exibição da grade responsiva: o sistema deve mostrar:",
              itens: [
                "- Grade responsiva com até 3 colunas em telas grandes",
                "- Miniaturas das imagens com proporções mantidas (140x96px)",
                "- Badge de ordem :hash: no canto inferior esquerdo de cada imagem",
                "- Efeito hover :pointer: para indicar interatividade",
                "- Layout organizado com espaçamento adequado entre imagens",
              ],
            },
            {
              titulo: "Sistema de badges de ordem: cada imagem deve exibir:",
              itens: [
                "- Badge numérico [badge:dblue]01[/b], [badge:dblue]02[/b], [badge:dblue]03[/b] etc. no canto inferior esquerdo",
                "- Badge com fundo semi-transparente escuro para contraste",
                "- Numeração sequencial baseada na ordem atual de inserção",
                "- Atualização automática dos números após reordenação",
                "- Formatação com zero à esquerda para números de 1 a 9",
              ],
            },
            {
              titulo: "Reordenação por drag and drop: o sistema deve permitir:",
              itens: [
                "- Arrastar e soltar imagens para reorganizar a ordem :move:",
                "- Feedback visual durante o arrasto com slots vazios",
                "- Highlight das áreas de destino durante o drag",
                "- Animações suaves de 200ms durante reordenação",
                "- Cursor :grab: normal, cursor :grabbing: durante arrasto",
                "- Atualização imediata dos badges após cada movimento",
              ],
            },
            {
              titulo: "Estados visuais durante drag: o sistema deve exibir:",
              itens: [
                "- Slots vazios [tc-gray]numerados[/c] para indicar posições disponíveis",
                "- Borda azul tracejada [tc-blue]border-dashed[/c] ao redor da grade durante drag",
                "- Imagem sendo arrastada com rotação sutil :rotate_2: e sombra",
                "- Outras imagens com opacidade reduzida (70%) durante operação",
                "- Slot de destino com highlight azul ao passar o mouse",
              ],
            },
            {
              titulo: "Informações e controles: cada imagem deve ter:",
              itens: [
                "- Miniatura clara e bem definida com bordas arredondadas",
                "- Badge de ordem sempre visível em ambos os modos",
                "- Botão [tc-red]X[/c] de remoção no modo edição (canto superior direito)",
                "- Indicação visual quando a imagem é clicável para visualização",
                "- Tooltip [tc-gray]Remover imagem[/c] no botão de exclusão",
              ],
            },
            {
              titulo: "Estados da listagem aprimorados:",
              itens: [
                "- Estado vazio: mensagem [tc-gray]Nenhuma imagem foi inserida[/c] quando não há imagens",
                "- Estado de carregamento durante upload de novas imagens",
                "- Estado de edição: arrastar habilitado + botões de remoção visíveis",
                "- Estado de visualização: apenas visualização das imagens (sem drag/remoção)",
                "- Estado de drag ativo: slots vazios visíveis + feedback visual",
              ],
            },
            {
              titulo: "Responsividade da grade: deve adaptar-se a:",
              itens: [
                "- 3 colunas em telas grandes (desktop ≥ 1024px)",
                "- 2 colunas em tablets (768px - 1023px)",
                "- 1 coluna em smartphones (< 768px)",
                "- Redimensionamento proporcional dos controles em mobile",
                "- Manutenção da funcionalidade drag em todos os tamanhos",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "Gerenciamento de ordem e numeração",
              descricao:
                "Sistema inteligente de controle da ordem das imagens com numeração automática",
              itens: [
                "- As imagens seguem ordem sequencial definida pelo usuário via drag and drop",
                "- Numeração automática de **01** a **99** conforme posição atual",
                "- Renumeração automática após qualquer operação de reordenação",
                "- Nova imagem sempre adicionada no final da sequência existente",
                "- Remoção de imagem resulta em renumeração das imagens subsequentes",
              ],
            },
            {
              titulo: "Controle de reordenação e limites",
              descricao:
                "Regras para operações de drag and drop e limites do sistema",
              itens: [
                "- Reordenação só é permitida no modo edição/criação",
                "- Mínimo de 2 imagens necessário para habilitar drag and drop",
                "- Slots vazios são criados dinamicamente durante operação de drag",
                "- Sistema suporta até 99 imagens por requisito funcional",
                "- Operações de drag são bloqueadas no modo visualização",
              ],
            },
            {
              titulo: "Persistência e sincronização de estado",
              descricao:
                "Como o sistema mantém a integridade da ordem das imagens",
              itens: [
                "- Ordem das imagens é preservada ao salvar o requisito",
                "- Estado de drag é resetado após cada operação para evitar conflitos",
                "- Numeração é recalculada automaticamente após add/remove/reorder",
                "- A ordem definida é mantida na documentação gerada ([tc-blue]DOCX[/c]/[tc-red]PDF[/c])",
                "- Cancelar edição restaura ordem original das imagens",
              ],
            },
            {
              titulo: "Validações e controle de qualidade",
              descricao:
                "Regras para manter a qualidade e consistência do sistema",
              itens: [
                "- Sistema previne conflitos durante operações simultâneas de drag",
                "- Timeout de 200ms aplicado para evitar múltiplas operações rápidas",
                "- Validação de índices antes de executar reordenação",
                "- Fallback automático em caso de erro durante drag and drop",
                "- Log de erros para debugging de problemas de reordenação",
              ],
            },
          ],
          regrasInterface: [
            {
              titulo: "Feedback visual e indicadores de interação",
              descricao:
                "Sistema completo de feedback para melhorar a experiência do usuário",
              itens: [
                "- Hover effect com escala 105% :scale: nas imagens para indicar clicabilidade",
                "- Cursor :grab: em repouso, :grabbing: durante arrasto",
                "- Badge de ordem com fonte bold e contraste adequado",
                "- Transições suaves de 200ms para todas as animações",
              ],
            },
            {
              titulo: "Estados visuais durante operações de drag",
              descricao:
                "Interface rica com feedback contextual durante reordenação",
              itens: [
                "- Grade recebe borda azul tracejada durante drag ativo",
                "- Slots vazios aparecem com numeração e ícone :move:",
                "- Imagem sendo arrastada recebe rotação 2° e sombra destacada",
                "- Outras imagens ficam semi-transparentes durante operação",
              ],
            },
            {
              titulo: "Adaptação responsiva e acessibilidade",
              descricao:
                "Interface que funciona bem em todos os dispositivos e contextos",
              itens: [
                "- Layout responsivo que mantém funcionalidade em todos os tamanhos",
                "- Controles proporcionalmente redimensionados em mobile",
                "- Cores e estilos adaptam-se ao tema atual (claro/escuro) :sun:",
                "- Tooltips descritivos em todos os elementos interativos",
              ],
            },
            {
              titulo: "Consistência visual com o sistema",
              descricao:
                "Integração harmoniosa com o design geral da aplicação",
              itens: [
                "- Badges seguem paleta de cores do sistema",
                "- Botões de ação consistentes com outros componentes",
                "- Espaçamentos e proporções alinhados com design system",
                "- Animações seguem timing e easing padrão (ease, 200ms)",
              ],
            },
          ],
          cenariosTeste: [
            {
              titulo: "Exibição de grade com múltiplas imagens ordenadas",
              dado: "que um requisito possui várias imagens cadastradas",
              quando: "o usuário acessa a aba 'Imagens e Descrição'",
              entao:
                "o sistema deve exibir todas as imagens em grade organizada",
              e_entao:
                "mostrar badges numerados [badge:dblue]01[/b], [badge:dblue]02[/b], [badge:dblue]03[/b] etc. em cada imagem",
            },
            {
              titulo: "Reordenação básica por drag and drop",
              dado: "que há pelo menos 2 imagens na grade no modo edição",
              quando:
                "o usuário arrasta a imagem [badge:dblue]03[/b] para a posição da imagem [badge:dblue]01[/b]",
              entao:
                "o sistema deve mover a imagem e renumerar todas as posições",
              e_entao:
                "a imagem movida deve se tornar [badge:dblue]01[/b] e as outras serem renumeradas sequencialmente",
            },
            {
              titulo: "Feedback visual durante operação de drag",
              dado: "que o usuário está arrastando uma imagem",
              quando: "move o cursor sobre diferentes posições na grade",
              entao:
                "o sistema deve mostrar slots vazios numerados e borda azul tracejada",
              e_entao:
                "highlighting das áreas de destino conforme movimento do cursor",
            },
            {
              titulo: "Adição de nova imagem mantendo ordem",
              dado: "que já existem imagens numeradas de [badge:dblue]01[/b] a [badge:dblue]05[/b]",
              quando: "o usuário adiciona uma nova imagem",
              entao:
                "o sistema deve atribuir automaticamente o número [badge:dblue]06[/b]",
              e_entao:
                "posicionar a nova imagem no final da grade mantendo ordem sequencial",
            },
            {
              titulo: "Remoção com renumeração automática",
              dado: "que há imagens numeradas de [badge:dblue]01[/b] a [badge:dblue]05[/b]",
              quando: "o usuário remove a imagem [badge:dblue]03[/b]",
              entao: "o sistema deve remover a imagem da grade",
              e_entao:
                "renumerar automaticamente: antigas [badge:dblue]04[/b] e [badge:dblue]05[/b] se tornam [badge:dblue]03[/b] e [badge:dblue]04[/b]",
            },
            {
              titulo: "Comportamento responsivo em dispositivos móveis",
              dado: "que há imagens na grade",
              quando: "o usuário acessa em dispositivo móvel :smartphone:",
              entao:
                "o sistema deve adaptar para 1 coluna mantendo funcionalidade drag",
              e_entao:
                "redimensionar controles proporcionalmente preservando badges e botões",
            },
            {
              titulo: "Diferenciação entre modos edição e visualização",
              dado: "que há imagens na grade",
              quando: "o usuário alterna entre modo edição e visualização",
              entao:
                "o sistema deve mostrar/ocultar botões [tc-red]X[/c] e habilitar/desabilitar drag",
              e_entao:
                "manter badges numerados visíveis e funcionalidade de clique para visualização em ambos os modos",
            },
            {
              titulo: "Estado vazio com call-to-action",
              dado: "que um requisito não possui imagens cadastradas",
              quando: "o usuário acessa a aba 'Imagens e Descrição'",
              entao:
                "o sistema deve exibir mensagem [tc-gray]Nenhuma imagem foi inserida[/c]",
              e_entao:
                "manter visível e destacada a área de upload [btn:gray]Selecionar imagens[/btn]",
            },
            {
              titulo: "Drag para slot vazio (expandir grade)",
              dado: "que há 3 imagens na grade",
              quando:
                "o usuário arrasta uma imagem para uma posição vazia além das existentes",
              entao: "o sistema deve mover a imagem para o final da sequência",
              e_entao: "renumerar mantendo ordem sequencial sem lacunas",
            },
            {
              titulo: "Prevenção de conflitos durante múltiplas operações",
              dado: "que o usuário está realizando operação de drag",
              quando: "tenta iniciar outra operação antes da conclusão",
              entao:
                "o sistema deve bloquear nova operação até conclusão da atual",
              e_entao: "manter estado consistente e exibir feedback apropriado",
            },
          ],
        },

        {
          id: "visualizacao-imagem-rf",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "imagens",
          titulo: "Visualização de Imagens de Requisito Funcional",
          icone: iconesPorTipo.visualizacao,
          bdd: `Eu, como usuário do sistema,
Quero visualizar imagens de requisitos funcionais com recursos avançados de zoom e navegação
Para analisar detalhes visuais e ter melhor compreensão das especificações técnicas`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", visualizar ou editar um requisito que possui imagens',
            'Navegar para a aba "Imagens e Descrição"',
            "Clicar em qualquer imagem na grade para abrir o visualizador avançado",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Abertura do visualizador avançado: ao clicar em uma imagem, o sistema deve:",
              itens: [
                "- Abrir um modal em tela cheia com fundo escuro semi-transparente e efeito blur",
                "- Exibir a imagem centralizada com tamanho otimizado para o viewport",
                "- Mostrar [btn:view:chevron_left/] e [btn:view:chevron_right/] para navegação se houver múltiplas imagens",
                "- Bloquear o scroll da página de fundo durante a visualização",
                "- Aplicar efeito backdrop-filter para melhor contraste visual",
              ],
            },
            {
              titulo: "Sistema de zoom avançado: o visualizador deve permitir:",
              itens: [
                "- [btn:gray:zoom_in]Aumentar zoom[/btn] até 500% com controles visuais",
                "- [btn:gray:zoom_out]Diminuir zoom[/btn] até 50% para visão panorâmica",
                "- [btn:gray:refresh_cw]Resetar zoom[/btn] para 100% com um clique ou duplo clique na imagem",
                "- Zoom por roda do mouse :mouse: centrado na posição do cursor",
                "- Controles de zoom com ícones intuitivos e estados desabilitados",
                "- Indicador visual de nível de zoom em tempo real (ex: **150%**)",
              ],
            },
            {
              titulo:
                "Sistema de pan (arrastar imagem): quando a imagem estiver com zoom > 100%, o sistema deve:",
              itens: [
                "- Permitir arrastar a imagem para visualizar diferentes áreas",
                "- Mudar o cursor para :move: quando em modo pan",
                "- Constrainear o movimento dentro dos limites da imagem ampliada",
                "- Exibir hint visual [tc-gray]Clique duas vezes para resetar o zoom[/c] quando aplicável",
                "- Prevenir fechamento acidental durante operações de drag",
              ],
            },
            {
              titulo:
                "Navegação entre imagens aprimorada: o visualizador deve permitir:",
              itens: [
                "- Navegar com setas laterais [btn:view:chevron_left/] [btn:view:chevron_right/] quando há múltiplas imagens",
                "- Usar teclas do teclado para navegação:",
                "  - `←` `→` para imagem anterior/próxima",
                "  - `+` ou `=` para aumentar zoom",
                "  - `-` para diminuir zoom",
                "  - `0` para resetar zoom",
                "  - `ESC` para fechar",
                "- Exibir contador dinâmico **X de Y** para indicar posição atual",
                "- Manter nível de zoom ao navegar entre imagens da mesma sessão",
              ],
            },
            {
              titulo:
                "Informações técnicas detalhadas: o visualizador deve exibir painel de informações com:",
              itens: [
                "- **Tamanho do arquivo:** formatado em KB/MB (ex: [tc-blue]245,3 KB[/c] ou [tc-blue]1,2 MB[/c])",
                "- **Dimensões da imagem:** largura × altura em pixels (ex: [tc-blue]1920 × 1080px[/c])",
                "- **Nível de zoom atual:** porcentagem em tempo real (ex: [tc-blue]150%[/c])",
                "- **Caracteres Base64:** quantidade formatada para desenvolvedores (ex: [tc-blue]87.456 caracteres[/c])",
                "- Painel adaptável ao tema claro/escuro :sun: do sistema",
              ],
            },
            {
              titulo:
                "Controles de fechamento melhorados: deve ser possível fechar através de:",
              itens: [
                "- Botão [tc-red]X[/c] no canto superior direito com hover effect",
                "- Tecla `ESC` do teclado em qualquer momento",
                "- Clique inteligente fora da área da imagem (apenas quando não há drag ativo)",
                "- Prevenção de fechamento acidental durante zoom/pan",
              ],
            },
            {
              titulo: "Responsividade e adaptabilidade: o visualizador deve:",
              itens: [
                "- Adaptar-se automaticamente a diferentes tamanhos de tela",
                "- Redimensionar controles proporcionalmente em dispositivos móveis :smartphone:",
                "- Manter funcionalidade touch para zoom/pan em tablets",
                "- Preservar proporções da imagem em qualquer resolução",
                "- Ajustar posicionamento de elementos UI conforme viewport",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "Cálculo de dimensões inteligente",
              descricao:
                "Imagens menores que o viewport são exibidas em tamanho original, enquanto imagens maiores são redimensionadas proporcionalmente para caber na tela",
              itens: [
                "- Manter sempre a proporção original (aspect ratio) da imagem",
                "- Calcular limites baseados no viewport disponível",
                "- Reservar espaço para elementos da UI (controles, informações)",
              ],
            },
            {
              titulo: "Limites e incrementos de zoom",
              descricao:
                "Sistema de zoom com limites e incrementos controlados para melhor experiência",
              itens: [
                "- Zoom mínimo: **50%** para visão panorâmica",
                "- Zoom máximo: **500%** para análise detalhada",
                "- Incrementos de zoom: **20%** para controle fino",
                "- Zoom por roda do mouse: incrementos menores para precisão",
              ],
            },
            {
              titulo: "Gerenciamento de estado de visualização",
              descricao:
                "Controle inteligente do estado durante navegação e interações",
              itens: [
                "- Estado de zoom é resetado ao mudar de imagem",
                "- Posição de pan é centrada ao aplicar novo zoom",
                "- Flags de drag são limpas após operações para prevenir bugs",
                "- Detecção de tema é atualizada dinamicamente",
              ],
            },
            {
              titulo: "Prevenção de conflitos de interação",
              descricao:
                "Sistema inteligente para evitar fechamentos acidentais e conflitos",
              itens: [
                "- Distinguir entre clique e drag para evitar fechamento acidental",
                "- Threshold de movimento para detectar drag real",
                "- Timeout para reset de flags após operações",
                "- Propagação de eventos controlada durante interações",
              ],
            },
          ],
          regrasInterface: [
            {
              titulo: "Indicadores visuais intuitivos e contextuais",
              descricao: "Sistema de feedback visual claro e responsivo",
              itens: [
                "- Cursor :pointer: + hover effect nas imagens da grade",
                "- Cursor :grab: em zoom 100%, :move: quando ampliado",
                "- Botões de navegação só aparecem quando necessários (múltiplas imagens)",
                "- Estados desabilitados claros nos controles de zoom",
              ],
            },
            {
              titulo: "Transições e animações suaves",
              descricao: "Experiência visual polida com transições responsivas",
              itens: [
                "- Transições suaves entre imagens (200ms ease-out)",
                "- Animações de zoom centradas no cursor",
                "- Hint contextual para duplo clique quando em zoom",
                "- Indicadores de loading durante carregamento de imagens",
              ],
            },
            {
              titulo: "Hierarquia visual e posicionamento estratégico",
              descricao: "Layout organizado para máxima usabilidade",
              itens: [
                "- Painel de informações posicionado estrategicamente",
                "- Controles de zoom centralizados na parte inferior",
                "- Botão de fechar proeminente no canto superior direito",
                "- Contador de imagens discreto mas visível",
              ],
            },
            {
              titulo: "Acessibilidade e suporte a tecnologias assistivas",
              descricao: "Interface inclusiva e acessível",
              itens: [
                "- Titles descritivos em todos os botões interativos",
                "- Navegação por teclado completa e intuitiva",
                "- Contraste adequado para leitura em ambos os temas",
                "- Suporte a screen readers e outras tecnologias assistivas",
              ],
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização com zoom básico e controles visuais",
              dado: "que um requisito possui uma imagem",
              quando:
                "o usuário clica na imagem e usa os controles de zoom [btn:gray:zoom_in/] [btn:gray:zoom_out/]",
              entao:
                "o sistema deve permitir ampliar/reduzir com controles visuais responsivos",
              e_entao:
                "mostrar nível de zoom atual e informações técnicas da imagem em tempo real",
            },
            {
              titulo: "Navegação com pan em imagem ampliada",
              dado: "que uma imagem está com zoom > 100%",
              quando: "o usuário arrasta a imagem com o mouse",
              entao:
                "o sistema deve mover a visualização suavemente dentro dos limites",
              e_entao:
                "manter o cursor em modo :move: e constrainear movimento adequadamente",
            },
            {
              titulo: "Navegação por teclado avançada com atalhos",
              dado: "que o visualizador está aberto com múltiplas imagens",
              quando:
                "o usuário usa atalhos de teclado (`←`, `→`, `+`, `-`, `0`, `ESC`)",
              entao:
                "o sistema deve responder apropriadamente a cada comando de forma instantânea",
              e_entao:
                "manter estado consistente entre navegação, zoom e informações exibidas",
            },
            {
              titulo: "Zoom por roda do mouse centrado no cursor",
              dado: "que uma imagem está sendo visualizada",
              quando:
                "o usuário usa a roda do mouse :mouse: sobre diferentes áreas da imagem",
              entao:
                "o sistema deve aplicar zoom centrado na posição exata do cursor",
              e_entao:
                "atualizar controles visuais e informações em tempo real",
            },
            {
              titulo: "Responsividade em dispositivos móveis e tablets",
              dado: "que o usuário acessa em dispositivo móvel :smartphone: ou tablet",
              quando: "abre o visualizador de imagens",
              entao:
                "o sistema deve adaptar controles para touch e redimensionar adequadamente",
              e_entao:
                "manter funcionalidade completa com gestos de zoom/pan nativos",
            },
            {
              titulo: "Prevenção inteligente de fechamento acidental",
              dado: "que o usuário está fazendo zoom/pan na imagem",
              quando: "realiza movimentos de drag na área da imagem",
              entao: "o sistema deve detectar drag real vs clique simples",
              e_entao:
                "manter o visualizador aberto durante operações e só fechar com ação deliberada",
            },
            {
              titulo: "Informações técnicas precisas e formatadas",
              dado: "que uma imagem está sendo visualizada",
              quando:
                "o sistema calcula e exibe informações técnicas no painel",
              entao:
                "deve mostrar tamanho, dimensões, zoom e base64 com formatação adequada",
              e_entao:
                "atualizar todas as informações dinamicamente conforme interações do usuário",
            },
            {
              titulo: "Múltiplas imagens com navegação fluida",
              dado: "que um requisito possui várias imagens",
              quando:
                "o usuário navega entre elas usando [btn:view:chevron_left/] [btn:view:chevron_right/] ou teclas",
              entao:
                "o sistema deve trocar imagens suavemente mantendo controles consistentes",
              e_entao:
                "resetar zoom/pan adequadamente e atualizar contador **X de Y**",
            },
            {
              titulo: "Adaptação automática ao tema do sistema",
              dado: "que o usuário tem tema claro ou escuro ativo",
              quando: "abre o visualizador de imagens",
              entao:
                "o sistema deve adaptar todos os elementos visuais ao tema atual :swap:",
              e_entao:
                "manter contraste adequado e legibilidade em ambos os modos",
            },
          ],
        },

        {
          id: "remocao-imagem-rf",
          categoria: "doc-dev",
          subgrupo: "requisitos-funcionais",
          subsubgrupo: "imagens",
          titulo: "Remoção de Imagens de Requisito Funcional",
          icone: iconesPorTipo.remocao,
          bdd: `Eu, como analista de requisitos,
Quero remover imagens de requisitos funcionais
Para corrigir uploads incorretos ou otimizar o tamanho do documento`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Na aba "Requisitos Funcionais", editar um requisito que possui imagens',
            'Navegar para a aba "Imagens e Descrição"',
            "Localizar a imagem a ser removida na grade",
            "Clicar no botão 'X' no canto superior direito da imagem",
            "Clicar em [btn:blue]Salvar[/btn] para confirmar as alterações",
          ],
          criteriosAceitacao: [
            {
              titulo: "Botão de remoção: cada imagem deve ter:",
              itens: [
                "- Botão [tc-red]X[/c] vermelho no canto superior direito",
                "- Ícone claramente visível sobre a imagem",
                "- Tooltip explicativo ao passar o mouse",
                "- Remoção imediata sem necessidade de confirmação adicional",
              ],
            },
            {
              titulo: "Feedback visual: o sistema deve:",
              itens: [
                "- Remover a imagem da grade imediatamente após o clique",
                "- Reorganizar automaticamente as imagens restantes",
                "- Atualizar o cálculo de tamanho total das imagens",
                "- Manter a numeração sequencial das imagens restantes",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "A remoção é imediata e não requer confirmação adicional",
            },
            {
              titulo: "As imagens restantes mantêm sua ordem original",
            },
            {
              titulo:
                "É possível remover todas as imagens, deixando o campo vazio",
            },
            {
              titulo: "A remoção só é definitiva após salvar o requisito",
            },
          ],
          regrasInterface: [
            {
              titulo: "Botão de remoção só aparece no modo de edição/criação",
            },
            {
              titulo: "Hover effect no botão para melhor usabilidade",
            },
            {
              titulo: "Animação suave na remoção da imagem da grade",
            },
            {
              titulo:
                "Área de upload permanece visível mesmo após remover todas as imagens",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção de imagem individual",
              dado: "que um requisito possui múltiplas imagens",
              quando:
                "o usuário clica no [tc-red]X[/c] de uma imagem específica",
              entao: "o sistema deve remover apenas aquela imagem",
              e_entao: "reorganizar as imagens restantes na grade",
            },
            {
              titulo: "Remoção de todas as imagens",
              dado: "que um requisito possui imagens",
              quando: "o usuário remove todas as imagens uma por uma",
              entao: "o sistema deve manter a área de upload visível",
              e_entao: "permitir adicionar novas imagens posteriormente",
            },
            {
              titulo: "Cancelamento de edição após remoção",
              dado: "que o usuário removeu algumas imagens durante a edição",
              quando: "cancela a edição sem salvar",
              entao: "o sistema deve manter as imagens originais",
              e_entao: "descartar as alterações de remoção",
            },
          ],
        },

        {
          id: "cadastro-requisito-nao-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-nao-funcionais",
          subsubgrupo: "crud-rnf",
          titulo: "Cadastro de Requisito Não Funcional",
          icone: iconesPorTipo.cadastro,
          bdd: `Eu, como analista de requisitos,
Quero cadastrar requisitos não funcionais
Para documentar os aspectos de qualidade, desempenho e restrições do sistema`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Selecionar a aba "Requisitos Não Funcionais"',
            "Preencher os campos de título e descrição",
            "Clicar no botão [btn:blue]Adicionar[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Formulário de cadastro: o sistema deve exibir um formulário com os seguintes campos:",
              itens: [
                "- [tc-sky]Título:[/c] campo obrigatório de texto para o título do requisito não funcional",
                "- [tc-sky]Descrição:[/c] campo obrigatório de texto para a descrição detalhada do requisito",
                "- Botão [btn:blue]Adicionar[/btn] para salvar o requisito",
              ],
            },
            {
              titulo:
                "Validação e salvamento: ao clicar em Adicionar, o sistema deve:",
              itens: [
                "- Validar se ambos os campos estão preenchidos",
                "- Se algum campo estiver vazio, destacá-lo em vermelho e focar nele",
                "- Se ambos os campos estiverem preenchidos, salvar o requisito",
                "- Atribuir ID sequencial no formato RNF-XX (RNF-01, RNF-02, etc.)",
                "- Limpar o formulário para permitir a adição de um novo requisito",
                "- Focar no campo de título para facilitar novas entradas",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "O ID do requisito não funcional segue o formato RNF-XX, onde XX é um número sequencial iniciando em 01",
            },
            {
              titulo: "Ambos os campos (título e descrição) são obrigatórios",
            },
            {
              titulo:
                "A validação é feita apenas ao tentar salvar, não em tempo real",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O formulário de cadastro fica acima da listagem de requisitos não funcionais (RNFs)",
            },
            {
              titulo: "Campos com erro de validação são destacados em vermelho",
            },
            {
              titulo:
                'O botão mostra o texto "Adicionar" para novos requisitos e "Atualizar" durante edição',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Cadastro com todos os campos preenchidos",
              dado: "que o usuário deseja cadastrar um novo requisito não funcional",
              e: "preencheu o título e a descrição",
              quando: "o usuário clica em [btn:blue]Adicionar[/btn]",
              entao: "o sistema deve salvar o requisito com um ID sequencial",
              e_entao:
                "limpar o formulário, focar no campo de título e exibir [tst:success]Requisito não funcional adicionado[/tst]",
            },
            {
              titulo: "Tentativa de cadastro sem título",
              dado: "que o usuário deseja cadastrar um novo requisito não funcional",
              e: "preencheu apenas o campo de descrição, deixando o título em branco",
              quando: "o usuário clica em [btn:blue]Adicionar[/btn]",
              entao: "o sistema deve destacar o campo de título em vermelho",
              e_entao:
                "focar no campo de título e exibir [tst:error]Preencha o campo de Título[/tst]",
            },
            {
              titulo: "Tentativa de cadastro sem descrição",
              dado: "que o usuário deseja cadastrar um novo requisito não funcional",
              e: "preencheu apenas o campo de título, deixando a descrição em branco",
              quando: "o usuário clica em [btn:blue]Adicionar[/btn]",
              entao: "o sistema deve destacar o campo de descrição em vermelho",
              e_entao:
                "focar no campo de descrição e exibir [tst:error]Preencha o campo de Descrição[/tst]",
            },
          ],
        },
        {
          id: "listagem-requisito-nao-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-nao-funcionais",
          subsubgrupo: "crud-rnf",
          titulo: "Listagem de Requisito Não Funcional",
          icone: iconesPorTipo.listagem,
          bdd: `Eu, como analista de requisitos,
Quero visualizar todos os requisitos não funcionais em uma lista ordenada
Para ter uma visão geral e poder reorganizá-los conforme a ordem de prioridade`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Selecionar a aba "Requisitos Não Funcionais"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Exibição da lista: o sistema deve exibir os requisitos não funcionais (RNFs) com as seguintes informações:",
              itens: [
                "- [tc-sky]ID:[/c] identificador sequencial no formato RNF-XX",
                "- [tc-sky]Título:[/c] título do requisito não funcional",
                "- [tc-sky]Descrição:[/c] descrição detalhada do requisito",
                "- [tc-sky]Ações:[/c] botões para editar e remover o requisito",
              ],
            },
            {
              titulo: "Reordenação por drag and drop: o sistema deve permitir:",
              itens: [
                "- Arrastar e soltar requisitos para reorganizá-los",
                "- Atualizar automaticamente os IDs para refletir a nova ordem",
                ">exemplo: Se `RNF-03` for movido para a primeira posição, ele se torna `RNF-01`, e os outros são renumerados sequencialmente",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "Os requisitos são sempre exibidos na ordem dos IDs, do menor para o maior",
            },
            {
              titulo:
                "A reordenação sempre atualiza os IDs para manter a sequência contínua",
            },
            {
              titulo:
                "A ordem dos requisitos é preservada ao gerar a documentação",
            },
            {
              titulo:
                "A lista só é exibida se houver pelo menos um requisito cadastrado",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O cursor deve mudar para 'move' ao passar sobre as linhas da tabela para indicar que podem ser arrastadas",
            },
            {
              titulo:
                "Durante o arrasto, uma sombra ou linha destacada deve indicar a posição onde o requisito será inserido",
            },
            {
              titulo:
                "A descrição pode ser truncada na visualização da tabela para evitar linhas muito longas",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização da lista com múltiplos requisitos",
              dado: "que existem requisitos não funcionais cadastrados",
              quando: 'o usuário acessa a aba "Requisitos Não Funcionais"',
              entao: "o sistema deve exibir todos os requisitos na tabela",
              e_entao: "mostrar os botões de ação para cada requisito",
            },
            {
              titulo: "Reordenação de requisitos",
              dado: "que existem pelo menos dois requisitos não funcionais",
              quando:
                "o usuário arrasta um requisito para uma nova posição e solta",
              entao: "o sistema deve reorganizar a lista conforme a nova ordem",
              e_entao: "atualizar os IDs para refletir a nova sequência",
            },
            {
              titulo: "Lista vazia",
              dado: "que não existem requisitos não funcionais cadastrados",
              quando: 'o usuário acessa a aba "Requisitos Não Funcionais"',
              entao: "o sistema deve exibir apenas o formulário de cadastro",
              e_entao: "não mostrar a tabela de listagem",
            },
          ],
        },

        {
          id: "edicao-requisito-nao-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-nao-funcionais",
          subsubgrupo: "crud-rnf",
          titulo: "Edição de Requisito Não Funcional",
          icone: iconesPorTipo.edicao,
          bdd: `Eu, como analista de requisitos,
Quero editar requisitos não funcionais já cadastrados
Para atualizar ou corrigir as especificações conforme necessário`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Selecionar a aba "Requisitos Não Funcionais"',
            "Localizar o requisito desejado na lista",
            "Clicar no botão de edição [btn:edit:pencil/]",
            "Alterar os campos desejados",
            "Clicar no botão [btn:green]Atualizar[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Carregamento para edição: ao clicar no botão de edição, o sistema deve:",
              itens: [
                "- Carregar os dados do requisito selecionado nos campos do formulário",
                "- Mudar o texto do botão para [btn:green]Atualizar[/btn]",
                "- Manter o foco no campo de título para facilitar a edição",
              ],
            },
            {
              titulo: "Atualização: ao clicar em Atualizar, o sistema deve:",
              itens: [
                "- Validar se ambos os campos estão preenchidos",
                "- Se algum campo estiver vazio, destacá-lo em vermelho e focar nele",
                "- Se ambos os campos estiverem preenchidos, atualizar o requisito mantendo o mesmo ID",
                "- Limpar o formulário",
                "- Reverter o botão para [btn:blue]Adicionar[/btn]",
                "- Exibir mensagem de sucesso",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "O ID do requisito não é alterado durante a edição",
            },
            {
              titulo:
                "As mesmas validações do cadastro são aplicadas na edição",
            },
            {
              titulo:
                "Se o usuário começar a editar um requisito e clicar em outro botão de edição, os dados do formulário são substituídos pelos do novo requisito selecionado",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de edição é representado por um ícone de lápis :pencil: na lista de requisitos",
            },
            {
              titulo:
                'O botão de formulário exibe o texto "Atualizar" durante o modo de edição',
            },
            {
              titulo: "Campos com erro de validação são destacados em vermelho",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Edição bem-sucedida de requisito",
              dado: "que o usuário deseja editar um requisito não funcional existente",
              quando:
                "o usuário seleciona o requisito para edição, altera os campos",
              e: "clica em [btn:green]Atualizar[/btn]",
              entao: "o sistema deve salvar as alterações mantendo o mesmo ID",
              e_entao:
                "limpar o formulário e exibir [tst:success]Requisito não funcional atualizado[/tst]",
            },
            {
              titulo: "Cancelamento implícito da edição",
              dado: "que o usuário está editando um requisito não funcional",
              quando:
                "o usuário clica no botão de edição de outro requisito antes de salvar",
              entao:
                "o sistema deve carregar os dados do novo requisito selecionado",
              e_entao:
                "descartar as alterações não salvas do requisito anterior",
            },
            {
              titulo: "Tentativa de atualização com campo em branco",
              dado: "que o usuário está editando um requisito não funcional",
              e: "apagou o conteúdo de um dos campos obrigatórios",
              quando: "o usuário clica em [btn:green]Atualizar[/btn]",
              entao: "o sistema deve destacar o campo vazio em vermelho",
              e_entao: "manter o modo de edição sem salvar as alterações",
            },
          ],
        },

        {
          id: "remocao-requisito-nao-funcional",
          categoria: "doc-dev",
          subgrupo: "requisitos-nao-funcionais",
          subsubgrupo: "crud-rnf",
          titulo: "Remoção de Requisito Não Funcional",
          icone: iconesPorTipo.remocao,
          bdd: `Eu, como analista de requisitos,
Quero remover requisitos não funcionais que não são mais necessários
Para manter a documentação atualizada e relevante`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            'Selecionar a aba "Requisitos Não Funcionais"',
            "Localizar o requisito desejado na lista",
            "Clicar no botão de remoção [btn:delete:trash/]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Confirmação de remoção: ao clicar no botão de remover, o sistema deve:",
              itens: [
                '- Exibir um modal de confirmação com o título "Remover o [ID-Requisito]"',
                '- Mostrar a mensagem "Tem certeza que deseja remover o requisito não funcional: [título do requisito]?"',
                "- Apresentar os botões [btn:gray]Cancelar[/btn] e [btn:red]Remover[/btn]",
                "- Se o usuário clicar em **Cancelar**, fechar o modal sem realizar alterações",
                "- Se o usuário clicar em **Remover**, excluir o requisito e atualizar a lista",
              ],
            },
            {
              titulo: "Atualização de IDs após remoção: o sistema deve:",
              itens: [
                "- Remover o requisito da lista",
                "- Atualizar automaticamente os IDs dos requisitos restantes para manter a sequência",
                ">exemplo: Se `RNF-02` for removido, o `RNF-03` passa a ser `RNF-02`, `RNF-04` passa a ser `RNF-03`, e assim por diante",
                "- Exibir mensagem de sucesso após a remoção",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo: "A remoção é permanente e não pode ser desfeita",
            },
            {
              titulo:
                "Os IDs são sempre atualizados para manter a sequência contínua",
            },
            {
              titulo:
                "Se o requisito que está sendo removido estiver carregado no formulário de edição, o formulário é limpo",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de remoção é representado por um ícone de lixeira :trash: na lista de requisitos",
            },
            {
              titulo: 'O modal de confirmação tem o tipo "caution" (vermelho)',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção confirmada de requisito",
              dado: "que o usuário deseja remover um requisito não funcional",
              quando:
                "o usuário clica no ícone de lixeira [btn:delete:trash/] e confirma clicando em [btn:red]Remover[/btn]",
              entao: "o sistema deve remover o requisito da lista",
              e_entao:
                "atualizar automaticamente os IDs dos requisitos restantes e exibir [tst:success]Requisito não funcional removido[/tst]",
            },
            {
              titulo: "Cancelamento da remoção",
              dado: "que o usuário clicou no ícone de lixeira :trash: de um requisito não funcional",
              quando:
                "o usuário clica em [btn:gray]Cancelar[/btn] no modal de confirmação",
              entao: "o sistema deve fechar o modal",
              e_entao: "manter o requisito na lista sem alterações",
            },
            {
              titulo: "Remoção de requisito em edição",
              dado: "que o usuário está editando um requisito não funcional",
              quando:
                "o usuário remove esse mesmo requisito através do botão de remoção",
              entao: "o sistema deve remover o requisito da lista",
              e_entao:
                "limpar o formulário de edição e reverter para o modo de adição",
            },
          ],
        },

        {
          id: "pontos-funcao-dev",
          categoria: "doc-dev",
          titulo: "Registro de Pontos de Função",
          icone: iconesPorTipo.pontosFuncao,
          bdd: `Eu, como analista,
Quero registrar o total de pontos de função após contagem
Para documentar a complexidade funcional do sistema`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar [tc-green]Documentação de Desenvolvimento[/c]",
            "Preencher informações básicas e requisitos",
            "Na seção **Pontos de Função**, inserir o valor total contabilizado",
            "Clicar em [btn:blue:download]Gerar Documentos[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo: "Preenchimento de pontos de função (PFs):",
              itens: [
                "- Campo numérico decimal que aceita valores como '12,50'",
                "- Formatação automática para o padrão brasileiro (vírgula como separador decimal)",
                "- Limitação a duas casas decimais",
              ],
            },
            {
              titulo: "Histórico de modificação:",
              itens: [
                "- O sistema deve registrar a data da modificação quando os pontos são adicionados",
                "- O sistema deve registrar o autor que adicionou os pontos de função (PFs)",
                "- A exportação final deve incluir essas informações no documento",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "O campo de pontos de função é opcional, podendo ser preenchido após a contagem",
            },
            {
              titulo:
                "O sistema registra a data e o autor quando os pontos de função são modificados",
            },
            {
              titulo:
                "O fluxo ideal é primeiro gerar o documento e depois importá-lo para adicionar os pontos de função",
            },
            {
              titulo:
                "O valor é formatado com vírgula como separador decimal no padrão brasileiro",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O campo aceita entrada tanto com ponto quanto com vírgula como separador decimal",
            },
            {
              titulo:
                "A formatação é aplicada automaticamente após a saída do campo",
            },
            {
              titulo:
                "O campo está posicionado próximo ao final do formulário, após os requisitos",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Preenchimento de pontos de função com valor válido",
              dado: "que o usuário está documentando uma SS",
              quando: "insere '15,75' no campo de pontos de função",
              entao: "o sistema aceita e formata o valor corretamente",
              e_entao: "registra o valor para inclusão no documento final",
            },
            {
              titulo: "Formatação automática de valor com ponto",
              dado: "que o usuário insere um valor com ponto como separador",
              quando: "digita '12.25' e sai do campo",
              entao: "o sistema converte automaticamente para '12,25'",
              e_entao: "armazena o valor numérico correto (12.25) internamente",
            },
            {
              titulo: "Adição de pontos de função após importação",
              dado: "que o usuário importou um documento existente",
              quando:
                "adiciona o valor de pontos de função e gera novo documento",
              entao: "o sistema registra a data atual e o autor da modificação",
              e_entao:
                "mantém as informações originais de criação do documento",
            },
          ],
        },

        {
          id: "geracao-documentacao-desenvolvimento",
          categoria: "doc-dev",
          titulo: "Geração de Docucmentação de Desenvolvimento",
          icone: iconesPorTipo.exportar,
          bdd: `Eu, como analista de requisitos,
Quero gerar [tc-green]documentação de desenvolvimento[/c] em diferentes formatos
Para formalizar e compartilhar as especificações do sistema a ser desenvolvido`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção [tc-green]Documentação de Desenvolvimento[/c]",
            "Preencher todos os campos obrigatórios do formulário",
            "Adicionar pelo menos um requisito funcional",
            "Selecionar os formatos desejados ([tc-purple]JSON[/c], [tc-blue]DOCX[/c], [tc-red]PDF[/c])",
            "Clicar no botão [btn:blue]Gerar Documentos[/btn]",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Validação antes da geração: o sistema deve verificar se os seguintes requisitos estão atendidos:",
              itens: [
                "- Campos obrigatórios da SS estão preenchidos (Número, Ano, Título, Descrição, Data de Início, Data de Fim)",
                "- Pelo menos um autor está selecionado",
                "- Pelo menos um requisito funcional está adicionado",
                "- Caso algum requisito não seja atendido, exibir mensagem de erro destacando os campos com problema",
              ],
            },
            {
              titulo:
                "Seleção de formatos: o sistema deve permitir a seleção de diferentes formatos:",
              itens: [
                "- [tc-purple]JSON[/c] (sempre selecionado por padrão, não pode ser desmarcado)",
                "- [tc-blue]DOCX[/c] (opcional)",
                "- [tc-red]PDF[/c] (opcional)",
                "- O texto do botão muda para [btn:blue:download]Baixar JSON[/btn] quando apenas [tc-purple]JSON[/c] está selecionado",
                "- O texto do botão é [btn:blue:download]Gerar Documentos[/btn] quando [tc-blue]DOCX[/c] e/ou [tc-red]PDF[/c] estão selecionados",
              ],
            },
            {
              titulo:
                "Geração de documentos: ao clicar no botão, o sistema deve:",
              itens: [
                "- Exibir indicador de carregamento durante o processamento",
                "- Se apenas [tc-purple]JSON[/c] estiver selecionado, não é necessário validar todos os campos obrigatórios (útil para salvar rascunhos)",
                "- Se [tc-blue]DOCX[/c] e/ou [tc-red]PDF[/c] estiverem selecionados, validar todos os campos obrigatórios",
                "- Incluir todos os requisitos funcionais (RFs) e não funcionais (RNFs) nos documentos gerados",
                "- Gerar os documentos nos formatos selecionados",
                "- Disponibilizar os arquivos para download",
                "- Exibir mensagem de sucesso após a geração",
              ],
            },
            {
              titulo: "Controle de versão no histórico do documento:",
              itens: [
                "- Se o documento estiver sendo criado pela primeira vez, registrar a data atual e o autor atual como criador",
                "- Se o documento estiver sendo modificado (importado de [tc-purple]JSON[/c] e alterado), registrar a data atual e o autor atual como modificador",
                "- Se houver um valor no campo 'Total de Pontos de Função', registrar também uma linha no histórico indicando a adição desse valor",
              ],
            },
          ],
          regrasNegocio: [
            {
              titulo:
                "[tc-purple]JSON[/c] é sempre gerado, independentemente de outras seleções",
            },
            {
              titulo:
                "[tc-blue]DOCX[/c] e [tc-red]PDF[/c] são opcionais e podem ser selecionados individualmente ou em conjunto",
            },
            {
              titulo:
                "Quando apenas [tc-purple]JSON[/c] é selecionado, o sistema permite salvar documentos incompletos (sem validar todos os campos)",
            },
            {
              titulo:
                "Quando [tc-blue]DOCX[/c] e/ou [tc-red]PDF[/c] são selecionados, todos os campos obrigatórios devem ser preenchidos e pelo menos um requisito funcional deve estar cadastrado",
            },
            {
              titulo:
                "O campo 'Total de Pontos de Função' é opcional e geralmente preenchido após a contagem formal de pontos de função (PFs)",
            },
          ],
          regrasInterface: [
            {
              titulo:
                "O botão de geração exibe um spinner de carregamento durante o processamento",
            },
            {
              titulo:
                "O texto do botão muda de acordo com os formatos selecionados",
            },
            {
              titulo:
                "Os formatos são selecionados através de checkboxes, com [tc-purple]JSON[/c] sempre marcado e desabilitado",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Geração de todos os formatos com dados completos",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              e: "adicionou pelo menos um requisito funcional",
              e: "selecionou os formatos [tc-purple]JSON[/c], [tc-blue]DOCX[/c] e [tc-red]PDF[/c]",
              quando: 'o usuário clica em "Gerar Documentos"',
              entao: "o sistema deve processar e gerar os três formatos",
              e_entao:
                "exibir: [tst:info]Gerando documentos...[/tst] durante o processamento e ao final: [tst:success]Documento gerado com sucesso![/tst]",
            },
            {
              titulo: "Geração apenas de JSON (rascunho)",
              dado: "que o usuário preencheu parcialmente os campos",
              e: "manteve apenas o formato [tc-purple]JSON[/c] selecionado",
              quando: 'o usuário clica em "Baixar JSON"',
              entao:
                "o sistema deve gerar o arquivo [tc-purple]JSON[/c] mesmo com campos obrigatórios não preenchidos",
              e_entao:
                "exibir: [tst:info]Gerando JSON...[/tst] durante o processamento e ao final: [tst:success]Arquivo JSON gerado com sucesso![/tst]",
            },
            {
              titulo: "Geração com pontos de função (PFs) após importação",
              dado: "que o usuário importou um documento [tc-purple]JSON[/c] existente",
              e: "adicionou um valor no campo 'Total de Pontos de Função'",
              e: "selecionou os formatos [tc-blue]DOCX[/c] e [tc-red]PDF[/c]",
              quando: 'o usuário clica em "Gerar Documentos"',
              entao:
                "o sistema deve incluir tanto o registro de criação original quanto o de adição de pontos de função (PFs) no histórico",
              e_entao: "gerar os documentos com essas informações atualizadas",
            },
          ],
        },
      ],
      tourSteps: [
        {
          element: 'input[placeholder="Buscar funcionalidade..."]',
          popover: {
            title: "Busca de Funcionalidades",
            description:
              "Digite aqui para filtrar as funcionalidades por nome ou conteúdo.",
            side: "right",
            align: "start",
          },
        },
        {
          element: ".flex.justify-between.items-center.cursor-pointer",
          popover: {
            title: "Categorias",
            description:
              "Clique para expandir ou recolher as categorias de funcionalidades.",
            side: "right",
            align: "start",
          },
        },
        {
          element: "main",
          popover: {
            title: "Detalhes da Funcionalidade",
            description:
              "Aqui são exibidos todos os detalhes de cada funcionalidade selecionada, incluindo critérios de aceitação, regras e mais.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "section:nth-of-type(1)",
          popover: {
            title: "Behavioral Driven Development (BDD)",
            description:
              'Aqui você encontra a descrição do comportamento esperado da funcionalidade no formato "Eu, como... Quero... Para..."',
            side: "left",
            align: "start",
          },
        },
        {
          element: "section:nth-of-type(2)",
          popover: {
            title: "Caminho de Acesso",
            description:
              "Sequência de passos para acessar a funcionalidade no sistema.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "section:nth-of-type(3)",
          popover: {
            title: "Critérios de Aceitação",
            description:
              "Condições que devem ser atendidas para que a funcionalidade seja considerada completa.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "section:nth-of-type(4)",
          popover: {
            title: "Regras de Negócio",
            description:
              "Definições e restrições que governam como a funcionalidade deve operar.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "section:nth-of-type(5)",
          popover: {
            title: "Regras de Interface",
            description:
              "Especificações sobre como a interface do usuário deve ser implementada.",
            side: "left",
            align: "start",
          },
        },
        {
          element: "section:nth-of-type(6)",
          popover: {
            title: "Cenários de Teste",
            description:
              "Casos de teste específicos para validar o funcionamento correto da funcionalidade.",
            side: "left",
            align: "start",
          },
        },
      ],
    };
  },
  computed: {
    funcionalidadeAtual() {
      return (
        this.funcionalidades.find(
          (f) => f.id === this.funcionalidadeSelecionada
        ) || null
      );
    },
    categoriasFiltradas() {
      if (!this.filtroFuncionalidade.trim()) {
        return this.categorias;
      }

      // Filtra as categorias que contêm funcionalidades correspondentes ao filtro
      const categoriaIdsComFuncionalidades = this.funcionalidadesFiltradas.map(
        (f) => f.categoria
      );
      return this.categorias.filter((c) =>
        categoriaIdsComFuncionalidades.includes(c.id)
      );
    },

    funcionalidadesFiltradas() {
      const filtro = this.filtroFuncionalidade.trim().toLowerCase();
      if (!filtro) {
        return this.funcionalidades;
      }

      return this.funcionalidades.filter((f) => {
        // Busca no título
        if (f.titulo.toLowerCase().includes(filtro)) return true;

        // Busca no BDD
        if (f.bdd && f.bdd.toLowerCase().includes(filtro)) return true;

        // Busca no caminho de acesso
        if (
          f.caminhoAcesso &&
          f.caminhoAcesso.some((caminho) =>
            caminho.toLowerCase().includes(filtro)
          )
        )
          return true;

        // Busca nos critérios de aceitação
        if (
          f.criteriosAceitacao &&
          f.criteriosAceitacao.some(
            (c) =>
              c.titulo.toLowerCase().includes(filtro) ||
              (c.itens &&
                c.itens.some((item) => item.toLowerCase().includes(filtro))) ||
              (c.descricao && c.descricao.toLowerCase().includes(filtro)) ||
              (c.exemplo && c.exemplo.toLowerCase().includes(filtro)) // NOVA LINHA
          )
        )
          return true;

        // Busca nas regras de negócio
        if (
          f.regrasNegocio &&
          f.regrasNegocio.some((r) => {
            if (typeof r === "string") {
              return r.toLowerCase().includes(filtro);
            }
            return (
              (r.descricao && r.descricao.toLowerCase().includes(filtro)) ||
              (r.titulo && r.titulo.toLowerCase().includes(filtro)) ||
              (r.exemplo && r.exemplo.toLowerCase().includes(filtro)) || // NOVA LINHA
              (r.itens &&
                r.itens.some((item) => item.toLowerCase().includes(filtro)))
            );
          })
        )
          return true;

        // Busca nas regras de interface
        if (
          f.regrasInterface &&
          f.regrasInterface.some((r) => {
            if (typeof r === "string") {
              return r.toLowerCase().includes(filtro);
            }
            return (
              (r.descricao && r.descricao.toLowerCase().includes(filtro)) ||
              (r.titulo && r.titulo.toLowerCase().includes(filtro)) ||
              (r.exemplo && r.exemplo.toLowerCase().includes(filtro)) || // NOVA LINHA
              (r.itens &&
                r.itens.some((item) => item.toLowerCase().includes(filtro)))
            );
          })
        )
          return true;

        // Busca nos cenários de teste
        if (
          f.cenariosTeste &&
          f.cenariosTeste.some((c) => {
            return (
              (c.titulo && c.titulo.toLowerCase().includes(filtro)) ||
              (c.descricao && c.descricao.toLowerCase().includes(filtro)) ||
              (c.dado && c.dado.toLowerCase().includes(filtro)) ||
              (c.quando && c.quando.toLowerCase().includes(filtro)) ||
              (c.entao && c.entao.toLowerCase().includes(filtro)) ||
              (c.e && c.e.toLowerCase().includes(filtro)) ||
              (c.e_entao && c.e_entao.toLowerCase().includes(filtro)) ||
              (c.exemplo && c.exemplo.toLowerCase().includes(filtro)) || // NOVA LINHA
              (c.itens &&
                c.itens.some((item) => item.toLowerCase().includes(filtro)))
            );
          })
        )
          return true;

        return false;
      });
    },

    funcionalidadeProcessada() {
      if (!this.funcionalidadeAtual) return null;

      // Cria uma cópia profunda para não modificar o objeto original
      const funcProcessada = JSON.parse(
        JSON.stringify(this.funcionalidadeAtual)
      );

      // Adiciona IDs aos critérios de aceitação
      if (funcProcessada.criteriosAceitacao) {
        funcProcessada.criteriosAceitacao =
          funcProcessada.criteriosAceitacao.map((criterio, index) => {
            return {
              ...criterio,
              id: `CA${index + 1}`,
            };
          });
      }

      // Processa regras de negócio - suporta tanto formato antigo quanto novo
      if (funcProcessada.regrasNegocio) {
        funcProcessada.regrasNegocio = funcProcessada.regrasNegocio.map(
          (regra, index) => {
            // Se for formato antigo (apenas descrição como string)
            if (typeof regra === "string") {
              return {
                id: `RN${index + 1}`,
                titulo: regra, // Usa a descrição como título
                descricao: null,
                itens: [],
              };
            }
            // Se for formato antigo (objeto com descrição mas sem título)
            else if (regra.descricao && !regra.titulo) {
              return {
                id: `RN${index + 1}`,
                titulo: regra.descricao, // Usa a descrição como título
                descricao: null,
                itens: regra.itens || [],
              };
            }
            // Se for novo formato, apenas adiciona o ID
            return {
              ...regra,
              id: `RN${index + 1}`,
            };
          }
        );
      }

      // Processa regras de interface - suporta tanto formato antigo quanto novo
      if (funcProcessada.regrasInterface) {
        funcProcessada.regrasInterface = funcProcessada.regrasInterface.map(
          (regra, index) => {
            // Se for formato antigo (apenas descrição como string)
            if (typeof regra === "string") {
              return {
                id: `RI${index + 1}`,
                titulo: regra, // Usa a descrição como título
                descricao: null,
                itens: [],
              };
            }
            // Se for formato antigo (objeto com descrição mas sem título)
            else if (regra.descricao && !regra.titulo) {
              return {
                id: `RI${index + 1}`,
                titulo: regra.descricao, // Usa a descrição como título
                descricao: null,
                itens: regra.itens || [],
              };
            }
            // Se for novo formato, apenas adiciona o ID
            return {
              ...regra,
              id: `RI${index + 1}`,
            };
          }
        );
      }

      // Processa cenários de teste - suporta tanto formato antigo quanto novo
      if (funcProcessada.cenariosTeste) {
        funcProcessada.cenariosTeste = funcProcessada.cenariosTeste.map(
          (cenario, index) => {
            // Se for formato antigo, converte para novo formato
            if (cenario.dado && cenario.quando && cenario.entao) {
              return {
                ...cenario,
                id: `CT${index + 1}`,
              };
            }
            // Se for novo formato, apenas adiciona o ID
            return {
              ...cenario,
              id: `CT${index + 1}`,
            };
          }
        );
      }

      return funcProcessada;
    },
  },

  watch: {
    filtroFuncionalidade(newValue, oldValue) {
      const temFiltro = newValue.trim();
      const tinhaFiltro = oldValue && oldValue.trim();

      if (!temFiltro && tinhaFiltro) {
        // Acabou de limpar a busca - restaurar estado anterior
        this.categoriasExpanded = [
          ...this.estadoAnteriorBusca.categoriasExpanded,
        ];
        this.subgruposExpanded = [
          ...this.estadoAnteriorBusca.subgruposExpanded,
        ];
        this.subsubgruposExpanded = [
          ...this.estadoAnteriorBusca.subsubgruposExpanded,
        ];
        this.estaEmBusca = false;
        return;
      }

      if (!temFiltro) {
        // Filtro vazio desde o início - manter estado padrão
        this.estaEmBusca = false;
        return;
      }

      if (temFiltro && !tinhaFiltro) {
        // Começou a buscar - salvar estado atual antes de modificar
        this.estadoAnteriorBusca = {
          categoriasExpanded: [...this.categoriasExpanded],
          subgruposExpanded: [...this.subgruposExpanded],
          subsubgruposExpanded: [...this.subsubgruposExpanded],
        };
        this.estaEmBusca = true;
      }

      // Lógica de busca (só executa se está em busca)
      if (this.estaEmBusca) {
        const funcionalidadesEncontradas = this.funcionalidadesFiltradas;

        // Identifica quais categorias têm funcionalidades que correspondem ao filtro
        const categoriasComResultados = funcionalidadesEncontradas.map(
          (f) => f.categoria
        );
        const categoriasUnicas = [...new Set(categoriasComResultados)];
        this.categoriasExpanded = categoriasUnicas;

        // Identifica quais subgrupos têm funcionalidades que correspondem ao filtro
        const subgruposComResultados = funcionalidadesEncontradas
          .filter((f) => f.subgrupo)
          .map((f) => f.subgrupo);
        const subgruposUnicos = [...new Set(subgruposComResultados)];
        this.subgruposExpanded = subgruposUnicos;

        // Identifica quais sub-subgrupos têm funcionalidades que correspondem ao filtro
        const subsubgruposComResultados = funcionalidadesEncontradas
          .filter((f) => f.subsubgrupo)
          .map((f) => f.subsubgrupo);
        const subsubgruposUnicos = [...new Set(subsubgruposComResultados)];
        this.subsubgruposExpanded = subsubgruposUnicos;
      }
    },
  },

  methods: {
    handleSwapRequested(targetUrl) {
      // Se houver dados preenchidos, mostrar confirmação antes de navegar
      if (this.hasFilledData()) {
        this.mostrarModalMensagem(
          "Trocar de página",
          "Existem dados não salvos. Deseja sair desta página? Todos os dados não salvos serão perdidos.",
          () => {
            this.$router.push(targetUrl);
          }
        );
      } else {
        this.$router.push(targetUrl);
      }
    },

    // Método para salvar estado manualmente (útil para outras situações)
    salvarEstadoAtual() {
      this.estadoAnteriorBusca = {
        categoriasExpanded: [...this.categoriasExpanded],
        subgruposExpanded: [...this.subgruposExpanded],
        subsubgruposExpanded: [...this.subsubgruposExpanded],
      };
    },

    // Método para restaurar estado manualmente
    restaurarEstadoAnterior() {
      this.categoriasExpanded = [
        ...this.estadoAnteriorBusca.categoriasExpanded,
      ];
      this.subgruposExpanded = [...this.estadoAnteriorBusca.subgruposExpanded];
      this.subsubgruposExpanded = [
        ...this.estadoAnteriorBusca.subsubgruposExpanded,
      ];
    },

    selecionarFuncionalidade(id) {
      this.funcionalidadeSelecionada = id;

      // Scroll para o topo quando mudar de funcionalidade
      const mainContent = document.querySelector("main");
      if (mainContent) {
        mainContent.scrollTop = 0;
      }
    },

    toggleCategoria(categoriaId) {
      if (this.categoriasExpanded.includes(categoriaId)) {
        this.categoriasExpanded = this.categoriasExpanded.filter(
          (id) => id !== categoriaId
        );
      } else {
        this.categoriasExpanded.push(categoriaId);
      }
    },

    toggleSubgrupo(subgrupoId) {
      if (this.subgruposExpanded.includes(subgrupoId)) {
        this.subgruposExpanded = this.subgruposExpanded.filter(
          (id) => id !== subgrupoId
        );
      } else {
        this.subgruposExpanded.push(subgrupoId);
      }
    },

    toggleSubsubgrupo(subsubgrupoId) {
      if (this.subsubgruposExpanded.includes(subsubgrupoId)) {
        this.subsubgruposExpanded = this.subsubgruposExpanded.filter(
          (id) => id !== subsubgrupoId
        );
      } else {
        this.subsubgruposExpanded.push(subsubgrupoId);
      }
    },

    hasFilledData() {
      // No caso desta tela, não há dados de entrada pelo usuário para salvar
      return false;
    },

    onTourStart() {
      console.log("Tour iniciado");
    },

    onTourCompleted() {
      console.log("Tour completado");
    },
  },
};
</script>

<style scoped>
/* Importe dos estilos de toast para as notificações inline */
@import "../assets/css/toast.css";

/* Transição para exibir/ocultar a lista de funcionalidades */
.slide-enter-active,
.slide-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.slide-enter-from,
.slide-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  max-height: 500px;
  opacity: 1;
}
</style>
