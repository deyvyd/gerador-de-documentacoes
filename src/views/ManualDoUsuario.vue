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

              <ul class="list-disc pl-6">
                <template
                  v-for="(item, itemIndex) in criterio.itens"
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

              <!-- Descrição opcional (apenas se existir e for diferente do título) -->
              <div
                v-if="regra.descricao && regra.descricao !== regra.titulo"
                class="text-gray-700 dark:text-gray-300 mb-2 pl-4"
                v-html="processarMarkdown(regra.descricao)"
              ></div>

              <!-- Itens da regra -->
              <ul
                v-if="regra.itens && regra.itens.length > 0"
                class="list-disc pl-6"
              >
                <template
                  v-for="(item, itemIndex) in regra.itens"
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

              <!-- Descrição opcional (apenas se existir e for diferente do título) -->
              <div
                v-if="regra.descricao && regra.descricao !== regra.titulo"
                class="text-gray-700 dark:text-gray-300 mb-2 pl-4"
                v-html="processarMarkdown(regra.descricao)"
              ></div>

              <!-- Itens da regra -->
              <ul
                v-if="regra.itens && regra.itens.length > 0"
                class="list-disc pl-6"
              >
                <template
                  v-for="(item, itemIndex) in regra.itens"
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
  cadastro: "M12 4v16m8-8H4",
  listagem: "M4 6h16M4 10h16M4 14h16M4 18h16",
  visualizacao:
    "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  edicao:
    "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
  remocao:
    "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
  exportar: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12",
  importar: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",

  // Ícones específicos para requisitos
  requisito:
    "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  pontosFuncao:
    "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
};

export default {
  name: "DocumentacaoFuncionalidades",
  mixins: [appBase],
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
            'Alternativamente, clicar no botão de tour (ícone de "seta diagonal") no canto superior direito',
          ],
          criteriosAceitacao: [
            {
              titulo: "Inicialização do tour:",
              itens: [
                "Iniciar automaticamente na primeira visita a cada tela",
                "Disponibilizar botão para iniciar o tour manualmente",
                "Manter registro das telas já visitadas para não repetir o tour",
              ],
            },
            {
              titulo: "Navegação pelo tour:",
              itens: [
                "Destacar elementos da interface sequencialmente",
                "Fornecer descrições claras para cada elemento",
                "Permitir avançar, voltar etapas",
                "Permitir encerrar o tour a qualquer momento",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao: "Cada tela possui seu próprio tour personalizado",
            },
            {
              descricao:
                "O histórico de tours completados é salvo no armazenamento local",
            },
            {
              descricao:
                "O tour pode ser iniciado manualmente a qualquer momento",
            },
            {
              descricao:
                "O tour nunca impede o acesso à funcionalidade, apenas destaca",
            },
          ],
          regrasInterface: [
            {
              descricao: "Destaque visual para o elemento sendo explicado",
            },
            {
              descricao: "Overlay semi-transparente no restante da tela",
            },
            {
              descricao: "Popover com título e descrição para cada etapa",
            },
            {
              descricao: "Botões de navegação (anterior, próximo, fechar)",
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
              quando: "o usuário clica em 'Próximo' até o final",
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
              quando: "clica no botão de tour no canto superior direito",
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
                "Botão com ícone intuitivo (sol para modo claro, lua para modo escuro)",
                "Transição suave entre os temas",
                "Mudança global afetando todos os elementos da interface",
                "Persistência da preferência entre sessões",
              ],
            },
            {
              titulo: "Detecção automática de preferência:",
              itens: [
                "Verificar preferência do sistema ao iniciar",
                "Aplicar tema adequado automaticamente na primeira visita",
                "Priorizar preferência salva do usuário sobre a do sistema",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "A preferência do usuário é salva no armazenamento local (localStorage)",
            },
            {
              descricao:
                "Na primeira visita, o tema padrão segue a preferência do sistema",
            },
            {
              descricao:
                "A alternância é instantânea e não requer recarregamento da página",
            },
            {
              descricao:
                "Todos os componentes visuais devem se adaptar ao tema selecionado",
            },
          ],
          regrasInterface: [
            {
              descricao: "Ícone de sol representa mudança para tema claro",
            },
            {
              descricao: "Ícone de lua representa mudança para tema escuro",
            },
            {
              descricao: "Tooltip explica a função ao passar o mouse",
            },
            {
              descricao: "Animação suave na transição entre temas",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Alternância do modo claro para escuro",
              dado: "que o usuário está no modo claro",
              quando: "clica no ícone de alternância de tema",
              entao: "o sistema aplica o tema escuro a toda a interface",
              e_entao:
                "atualiza o ícone para representar o sol (volta ao modo claro)",
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
Para acessar a #o#documentação técnica# ou a #g#documentação de desenvolvimento# conforme minha necessidade`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Na tela inicial, selecionar entre #o#Documentação Técnica# ou #g#Documentação de Desenvolvimento#",
            "Alternativamente, durante o preenchimento, clicar no botão de alternância no topo da página para trocar de tipo",
          ],
          criteriosAceitacao: [
            {
              titulo: "Seleção de tipo na tela inicial:",
              itens: [
                "Exibir opções de #o#Documentação Técnica# e #g#Documentação de Desenvolvimento# na tela inicial",
                "Permitir seleção através de botões destacados visualmente",
                "Ao selecionar um tipo, o sistema deve carregar o formulário correspondente",
              ],
            },
            {
              titulo: "Alternância durante o preenchimento:",
              itens: [
                "Disponibilizar botão de troca de tipo no topo da página durante o preenchimento",
                "Ao tentar alternar com dados já preenchidos, exibir confirmação para evitar perda acidental",
                "Após confirmação, carregar o formulário do novo tipo selecionado",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "Cada tipo de documentação possui campos e fluxos específicos baseados nas necessidades daquela documentação",
            },
            {
              descricao:
                "A #o#documentação técnica# é focada em atividades e pontos de função  (PFs)",
            },
            {
              descricao:
                "A #g#documentação de desenvolvimento# é focada em requisitos funcionais (RFs) e não funcionais (RNFs)",
            },
            {
              descricao:
                "Os campos básicos da solicitação são comuns a ambos os tipos de documentação",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "Botões de seleção de tipo com indicação visual clara do tipo selecionado",
            },
            {
              descricao:
                "Na tela inicial, os tipos de documentação são apresentados como cards ou botões grandes",
            },
            {
              descricao:
                "Durante o preenchimento, a opção de troca é apresentada como um seletor ou botão no cabeçalho",
            },
            {
              descricao:
                "Modal de confirmação ao tentar trocar de tipo com dados não salvos",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Seleção inicial de #o#documentação técnica#",
              dado: "que o usuário acessou o sistema",
              quando:
                "seleciona a opção #o#Documentação Técnica# na tela inicial",
              entao:
                "o sistema carrega o formulário específico para #o#documentação técnica#",
              e_entao: "exibe as seções de atividades e pontos de função",
            },
            {
              titulo: "Seleção inicial de #g#documentação de desenvolvimento#",
              dado: "que o usuário acessou o sistema",
              quando:
                "seleciona a opção #g#Documentação de Desenvolvimento# na tela inicial",
              entao:
                "o sistema carrega o formulário específico para #g#documentação de desenvolvimento#",
              e_entao:
                "exibe as seções de requisitos funcionais e não funcionais",
            },
            {
              titulo: "Troca de tipo com dados não preenchidos",
              dado: "que o usuário está em um formulário vazio",
              quando: "clica no botão de troca de tipo no cabeçalho",
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
            'Selecionar qualquer tipo de documentação ("Técnica" ou "Desenvolvimento")',
            "A seção 'Informações básicas da SS' está sempre disponível no topo do formulário",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Campos obrigatórios: o usuário deve preencher os seguintes dados:",
              itens: [
                "#s#Número SS:# campo numérico de 3 dígitos (preenchido com zeros à esquerda)",
                "#s#Ano SS:# ano da solicitação (padrão é o ano atual)",
                "#s#Título:# descrição breve da solicitação",
                "#s#Descrição:# detalhamento da solicitação",
                "#s#Data de Início:# data de início do trabalho",
                "#s#Data de Fim:# data de conclusão do trabalho",
                "#s#Autor(es):# ao menos um autor deve ser selecionado",
              ],
            },
            {
              titulo: "Campo opcional:",
              itens: [
                "#s#Link do board:# URL opcional para o board do projeto (GitLab, Jira, etc.)",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "O campo de Número SS é formatado automaticamente com zeros à esquerda",
            },
            {
              descricao:
                "A data de início não pode ser posterior à data de fim",
            },
            {
              descricao:
                "O campo de autor permite selecionar múltiplos autores da lista predefinida",
            },
            {
              descricao:
                "As iniciais dos autores são concatenadas para uso no documento (ex: 'DMF e PRO')",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O campo de seleção de autores possui sugestão automática baseada no texto digitado",
            },
            {
              descricao:
                "Os autores selecionados aparecem como tags que podem ser removidas individualmente",
            },
            {
              descricao:
                "Campos com erro de validação são destacados em vermelho",
            },
            {
              descricao: "O campo de ano SS é pré-preenchido com o ano atual",
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
              e_entao: "mantém o formato 'NNN' (ex: '001', '042', '999')",
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
            'Selecionar qualquer tipo de documentação ("Técnica" ou "Desenvolvimento")',
            'No campo "Autor(es)", começar a digitar o nome de um autor',
            "Selecionar o autor na lista de sugestões",
            "Repetir o processo para adicionar mais autores se necessário",
          ],
          criteriosAceitacao: [
            {
              titulo: "Seleção de autores: o sistema deve permitir:",
              itens: [
                "Pesquisar autores digitando parte do nome",
                "Visualizar sugestões filtradas conforme o texto digitado",
                "Selecionar autores da lista de sugestões",
                "Adicionar múltiplos autores ao documento",
                "Visualizar tags com os nomes dos autores selecionados",
              ],
            },
            {
              titulo: "Gerenciamento de autores selecionados:",
              itens: [
                "Remover autores individuais clicando no 'x' na tag",
                "Não permitir duplicação de autores já selecionados",
                "Exigir ao menos um autor selecionado para gerar documentos",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "A lista de autores disponíveis é predefinida no sistema",
            },
            {
              descricao:
                "As iniciais dos autores são concatenadas automaticamente (ex: 'DMF e PRO')",
            },
            {
              descricao:
                "Múltiplos autores são separados por vírgula e 'e' (ex: 'DMF, FSC e PRO')",
            },
            {
              descricao:
                "Pelo menos um autor é obrigatório para gerar documentação",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "A busca ignora acentuação e diferencia maiúsculas/minúsculas",
            },
            {
              descricao:
                "As sugestões são exibidas em uma lista dropdown abaixo do campo",
            },
            {
              descricao:
                "Autor selecionado aparece como tag colorida com botão de remoção",
            },
            {
              descricao:
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
            'Selecionar qualquer tipo de documentação ("Técnica" ou "Desenvolvimento")',
            "Preencher todos os campos obrigatórios",
            'Na seção "Formato dos arquivos", selecionar os formatos desejados',
            'Clicar no botão "Gerar Documentos"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Formatos disponíveis: o sistema deve permitir exportação nos seguintes formatos:",
              itens: [
                "#p#JSON:# formato sempre disponível, útil para importação posterior",
                "#b#DOCX:# documento Microsoft Word com formatação completa",
                "#r#PDF:# documento em formato PDF para distribuição final",
              ],
            },
            {
              titulo: "Validação antes da exportação:",
              itens: [
                "Para exportação em #b#DOCX# ou #r#PDF#, todos os campos obrigatórios devem estar preenchidos",
                "Para exportação apenas em #p#JSON#, a validação completa é opcional (útil para salvar rascunhos)",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "O formato #p#JSON# é sempre gerado, independente das opções selecionadas",
            },
            {
              descricao:
                "A exportação em #b#DOCX#/#r#PDF# requer que todos os campos obrigatórios estejam preenchidos",
            },
            {
              descricao:
                "Se apenas o formato #p#JSON# for selecionado, é possível salvar documentos incompletos",
            },
            {
              descricao:
                "Quando múltiplos formatos são selecionados, os arquivos são empacotados em um arquivo ZIP",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O checkbox de #p#JSON# está sempre marcado e desabilitado (não pode ser desmarcado)",
            },
            {
              descricao:
                "O texto do botão muda conforme os formatos selecionados ('Baixar JSON' ou 'Gerar Documentos')",
            },
            {
              descricao:
                "Durante o processamento, o botão exibe um ícone de carregamento e texto 'Processando...'",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Exportação apenas em formato JSON",
              dado: "que o usuário preencheu alguns campos mas não todos obrigatórios",
              quando: "seleciona apenas #p#JSON# e clica em 'Baixar JSON'",
              entao:
                "o sistema gera o arquivo #p#JSON# sem validar todos os campos",
              e_entao:
                "inicia o download do arquivo #p#JSON# com o formato 'SS NNN-AAAA.json'",
            },
            {
              titulo: "Exportação em formatos DOCX e PDF",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              quando:
                "seleciona #b#DOCX# e #r#PDF# e clica em 'Gerar Documentos'",
              entao:
                "o sistema valida todos os campos, gera os arquivos e os empacota",
              e_entao: "inicia o download do arquivo ZIP com todos os formatos",
            },
            {
              titulo: "Tentativa de exportação DOCX/PDF com campos faltantes",
              dado: "que o usuário não preencheu todos os campos obrigatórios",
              quando:
                "seleciona #b#DOCX# ou #r#PDF# e clica em 'Gerar Documentos'",
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
            'Selecionar qualquer tipo de documentação ("Técnica" ou "Desenvolvimento")',
            "Clicar no botão de importação (ícone de upload) na barra superior",
            "Selecionar um arquivo JSON previamente gerado pelo sistema",
            "Confirmar a importação se solicitado",
          ],
          criteriosAceitacao: [
            {
              titulo: "Importação de dados: o sistema deve:",
              itens: [
                "Carregar todos os dados do arquivo #p#JSON# nos campos correspondentes",
                "Preencher informações básicas como número SS, título, descrição, datas, etc.",
                "Recuperar listas de atividades ou requisitos conforme o tipo de documento",
                "Preservar informações de autoria e datas originais",
              ],
            },
            {
              titulo: "Compatibilidade entre tipos de documento:",
              itens: [
                "Verificar se o arquivo #p#JSON# é compatível com o tipo de documento atual",
                "Impedir importação de #p#JSON# de #o#documentação técnica# em #g#documentação de desenvolvimento# e vice-versa",
                "Exibir mensagem de erro caso tente importar arquivo incompatível",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "Ao importar, os dados existentes são completamente substituídos pelos dados do arquivo",
            },
            {
              descricao:
                "Se há dados já preenchidos, o sistema solicita confirmação antes de substituí-los",
            },
            {
              descricao:
                "O sistema verifica se o tipo de documento (técnico/desenvolvimento) é compatível",
            },
            {
              descricao:
                "Informações de data original e autor são preservadas para manter histórico",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de importação está sempre visível na barra superior",
            },
            {
              descricao:
                "Modal de confirmação é exibido se já houver dados preenchidos",
            },
            {
              descricao:
                "Mensagem de sucesso é exibida após importação bem-sucedida",
            },
            {
              descricao:
                "Mensagem de erro específica é exibida se o formato for incompatível",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Importação bem-sucedida de arquivo JSON",
              dado: "que o usuário tem um arquivo #p#JSON# válido e compatível",
              quando: "clica no botão de importação e seleciona o arquivo",
              entao:
                "o sistema carrega todos os dados nos campos correspondentes",
              e_entao:
                "exibe mensagem de sucesso 'Dados importados com sucesso!'",
            },
            {
              titulo: "Importação com confirmação quando há dados existentes",
              dado: "que o usuário já preencheu alguns campos",
              quando: "tenta importar um arquivo #p#JSON#",
              entao: "o sistema exibe modal de confirmação",
              e_entao: "substitui os dados apenas se o usuário confirmar",
            },
            {
              titulo: "Tentativa de importação de arquivo incompatível",
              dado: "que o usuário tenta importar um #p#JSON# de tipo diferente",
              quando:
                "seleciona um arquivo #p#JSON# de #o#documentação técnica# na tela de desenvolvimento",
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
            "Selecionar a opção #o#Documentação Técnica#",
            "Preencher o formulário de informações básicas da SS",
            'Na seção "Gerenciar Atividades", preencher o nome da atividade e estimativa de horas',
            'Clicar no botão "Adicionar"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Dados gerais: o usuário deve realizar as seguintes ações nos campos abaixo:",
              itens: [
                "#s#Atividade:# preenchimento obrigatório do campo do tipo texto com, no máximo, 255 caracteres",
                "#s#Estimativa de horas:# preenchimento obrigatório do campo do tipo numérico, com valor positivo maior que zero",
              ],
            },
            {
              titulo:
                "Cadastrar: ao clicar no botão Adicionar, o sistema deve seguir as seguintes regras:",
              itens: [
                "Enquanto existem campos obrigatórios que não preenchidos, o botão Adicionar deve permanecer habilitado mas mostrar mensagem de erro quando clicado",
                "Quando todos os campos obrigatórios estão preenchidos e o usuário clicar no botão Adicionar, o sistema deve salvar a atividade na lista de atividades",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao: "A atividade recebe um ID interno para controle",
            },
            {
              descricao:
                "O sistema atualiza automaticamente o total de horas e pontos de função (PFs)",
            },
            {
              descricao:
                "O sistema calcula os pontos de função como: (Total de Horas / 10) * 2.5",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O campo de Atividade deve ter foco após adicionar uma nova atividade",
            },
            {
              descricao:
                "Os campos com erro de validação são destacados em vermelho",
            },
            {
              descricao:
                'O botão mostra o texto "Adicionar" para novas atividades e "Atualizar" durante edição',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Cadastro com todos os campos preenchidos corretamente",
              dado: "que o usuário deseja cadastrar uma atividade",
              e: "preencheu todos os campos obrigatórios corretamente",
              quando: "o usuário clicar no botão Adicionar",
              entao: "o sistema deverá adicionar a atividade à lista",
              e_entao:
                'exibir a seguinte mensagem: "Atividade cadastrada com sucesso!"',
            },
            {
              titulo: "Tentativa de cadastro sem informar nome da atividade",
              dado: "que o usuário deseja cadastrar uma atividade",
              e: "não preencheu o campo de nome da atividade",
              quando: "o usuário clicar no botão Adicionar",
              entao:
                "o sistema deverá destacar o campo de nome da atividade em vermelho",
              e_entao:
                'exibir a mensagem de erro: "O campo Atividade é obrigatório"',
            },
            {
              titulo: "Tentativa de cadastro com horas zeradas ou negativas",
              dado: "que o usuário deseja cadastrar uma atividade",
              e: "preencheu o valor de horas com zero ou um número negativo",
              quando: "o usuário clicar no botão Adicionar",
              entao: "o sistema deverá destacar o campo de horas em vermelho",
              e_entao:
                'exibir a mensagem de erro: "O valor de horas deve ser maior que zero"',
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
            "Selecionar a opção #o#Documentação Técnica#",
            "As atividades já cadastradas são exibidas na tabela 'Lista de Atividades'",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Listagem: o sistema deve exibir as atividades com as seguintes informações:",
              itens: [
                "#s#Atividade:# nome da atividade cadastrada",
                "#s#Estimativa de horas:# horas registradas para a atividade",
                "#s#Ações:# botões para editar e remover a atividade",
              ],
            },
            {
              titulo:
                "Reordenação: o sistema deve permitir a reorganização das atividades através de drag and drop:",
              itens: [
                "Ao clicar e segurar em uma linha da tabela, o usuário deve poder arrastá-la para uma nova posição",
                "Ao soltar a linha em uma nova posição, o sistema deve atualizar a ordem das atividades",
                "A ordem das atividades deve ser preservada ao gerar a documentação",
              ],
            },
            {
              titulo: "Rodapé da tabela: o sistema deve exibir:",
              itens: [
                "Total de horas: soma das horas de todas as atividades listadas",
                "Quantidade de PF: cálculo automático dos pontos de função com base no total de horas",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "A lista sempre exibe todas as atividades cadastradas para a SS atual",
            },
            {
              descricao:
                "A reordenação é salva automaticamente após arrastar e soltar",
            },
            {
              descricao:
                "A quantidade de PF é calculada como (Total de Horas / 10) * 2.5",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O cursor deve mudar para 'move' quando passar sobre as linhas da tabela para indicar que podem ser arrastadas",
            },
            {
              descricao:
                "Durante o arrasto, uma linha tracejada ou destacada deve indicar a posição onde a atividade será inserida",
            },
            {
              descricao:
                "A tabela deve ter uma linha de rodapé com o total de horas e a quantidade de PF calculada",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização da lista com múltiplas atividades",
              dado: "que existem atividades cadastradas",
              quando: "o usuário acessa a tela de #o#Documentação Técnica#",
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
            "Selecionar #o#Documentação Técnica#",
            "Na lista de atividades, clicar no ícone de edição (lápis) de uma atividade",
            "Modificar os campos desejados",
            'Clicar em "Atualizar"',
          ],
          criteriosAceitacao: [
            {
              titulo: "Edição de campos: o sistema deve permitir modificar:",
              itens: [
                "#s#Nome da atividade#",
                "#s#Quantidade de horas estimadas#",
                "O botão 'Adicionar' deve mudar para 'Atualizar' durante a edição",
              ],
            },
            {
              titulo: "Validações durante edição:",
              itens: [
                "As mesmas validações do cadastro são aplicadas (campos obrigatórios, valores positivos, etc.)",
                "Não permitir salvar se houver campos inválidos",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "Ao editar uma atividade, os campos são preenchidos com os valores atuais",
            },
            {
              descricao:
                "O botão muda de 'Adicionar' para 'Atualizar' durante a edição",
            },
            {
              descricao:
                "Após salvar, o formulário é limpo e volta ao modo de adição",
            },
            {
              descricao:
                "O sistema recalcula automaticamente o total de horas e pontos de função (PFs)",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "Ícone de lápis indica a opção de edição na tabela de atividades",
            },
            {
              descricao:
                "O botão principal tem cor diferente durante o modo de edição para destacar a operação",
            },
            {
              descricao:
                "Validações visuais de campos são aplicadas durante a edição",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Edição bem-sucedida de atividade",
              dado: "que o usuário selecionou uma atividade para edição",
              quando: "modifica os campos e clica em 'Atualizar'",
              entao: "o sistema atualiza a atividade na lista",
              e_entao:
                "recalcula os totais e limpa o formulário para nova entrada",
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
            "Selecionar a opção #o#Documentação Técnica#",
            "Preencher o formulário de informações básicas da SS",
            'Na seção "Lista de Atividades", localizar a atividade desejada',
            "Clicar no botão de remover (ícone de lixeira)",
          ],
          criteriosAceitacao: [
            {
              titulo: "Remoção: ao clicar no botão de remover, o sistema deve:",
              itens: [
                'Exibir um modal de confirmação com a mensagem "Tem certeza que deseja remover a atividade: [nome da atividade]?"',
                'Apresentar os botões "Cancelar" e "Remover"',
                'Se clicar em "Cancelar", fechar o modal sem realizar alterações',
                'Se clicar em "Remover", excluir a atividade da lista e recalcular o total de horas e pontos de função',
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao: "A remoção é permanente e não pode ser desfeita",
            },
            {
              descricao:
                "O sistema atualiza automaticamente o total de horas e pontos de função após a remoção",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de remoção é representado por um ícone de lixeira",
            },
            {
              descricao:
                'O modal de confirmação deve ter o tipo "caution" (vermelho)',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção confirmada",
              dado: "que o usuário deseja remover uma atividade",
              quando:
                'o usuário clica no botão de remoção e confirma no modal clicando em "Remover"',
              entao: "o sistema remove a atividade da lista",
              e_entao: "recalcula o total de horas e pontos de função",
            },
            {
              titulo: "Remoção cancelada",
              dado: "que o usuário clica no botão de remoção de uma atividade",
              quando: 'o usuário clica em "Cancelar" no modal de confirmação',
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
Quero gerar #o#documentação técnica# em diferentes formatos
Para facilitar a comunicação e o registro formal do trabalho realizado`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção #o#Documentação Técnica#",
            "Preencher todos os campos obrigatórios do formulário",
            "Adicionar pelo menos uma atividade",
            "Selecionar os formatos desejados (JSON, DOCX, PDF)",
            'Clicar no botão "Gerar Documentos"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Validação antes da geração: o sistema deve verificar se os seguintes requisitos estão atendidos:",
              itens: [
                "Campos obrigatórios da SS estão preenchidos (Número, Ano, Título, Descrição, Data de Início, Data de Fim)",
                "Pelo menos um autor está selecionado",
                "Pelo menos uma atividade está adicionada",
                "Caso algum requisito não seja atendido, exibir mensagem de erro destacando os campos com problema",
              ],
            },
            {
              titulo:
                "Seleção de formatos: o sistema deve permitir a seleção de diferentes formatos:",
              itens: [
                "#p#JSON# (sempre selecionado por padrão, não pode ser desmarcado)",
                "#b#DOCX# (opcional)",
                "#r#PDF# (opcional)",
                'O texto do botão muda para "Baixar JSON" quando apenas #p#JSON# está selecionado',
                'O texto do botão é "Gerar Documentos" quando #b#DOCX# e/ou #r#PDF# estão selecionados',
              ],
            },
            {
              titulo:
                "Geração de documentos: ao clicar no botão, o sistema deve:",
              itens: [
                "Exibir indicador de carregamento durante o processamento",
                "Se apenas #p#JSON# estiver selecionado, não é necessário validar todos os campos obrigatórios (útil para salvar rascunhos)",
                "Se #b#DOCX# e/ou #r#PDF# estiverem selecionados, validar todos os campos obrigatórios",
                "Gerar os documentos nos formatos selecionados",
                "Disponibilizar os arquivos para download",
                "Exibir mensagem de sucesso após a geração",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "#p#JSON# é sempre gerado, independentemente de outras seleções",
            },
            {
              descricao:
                "#b#DOCX# e #r#PDF# são opcionais e podem ser selecionados individualmente ou em conjunto",
            },
            {
              descricao:
                "Quando apenas #p#JSON# é selecionado, o sistema permite salvar documentos incompletos (sem validar todos os campos)",
            },
            {
              descricao:
                "Quando #b#DOCX# e/ou #r#PDF# são selecionados, todos os campos obrigatórios devem ser preenchidos",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de geração exibe um spinner de carregamento durante o processamento",
            },
            {
              descricao:
                "O texto do botão muda de acordo com os formatos selecionados",
            },
            {
              descricao:
                "Os formatos são selecionados através de checkboxes, com #p#JSON# sempre marcado e desabilitado",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Geração de todos os formatos com dados completos",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              e: "adicionou pelo menos uma atividade",
              e: "selecionou os formatos #p#JSON#, #b#DOCX# e #r#PDF#",
              quando: 'o usuário clica em "Gerar Documentos"',
              entao: "o sistema deve processar e gerar os três formatos",
              e_entao:
                "disponibilizar um arquivo ZIP contendo todos os documentos para download",
            },
            {
              titulo: "Geração apenas de #p#JSON# (rascunho)",
              dado: "que o usuário preencheu parcialmente os campos",
              e: "manteve apenas o formato #p#JSON# selecionado",
              quando: 'o usuário clica em "Baixar JSON"',
              entao:
                "o sistema deve gerar o arquivo #p#JSON# mesmo com campos obrigatórios não preenchidos",
              e_entao: "disponibilizar o arquivo #p#JSON# para download",
            },
            {
              titulo: "Tentativa de geração sem atividades",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              e: "não adicionou nenhuma atividade",
              e: "selecionou os formatos #p#JSON#, #b#DOCX# e #r#PDF#",
              quando: 'o usuário clica em "Gerar Documentos"',
              entao: "o sistema deve exibir mensagem de erro",
              e_entao:
                "destacar a área de atividades indicando que pelo menos uma atividade é necessária",
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            "Preencher o formulário de informações básicas da SS",
            'Na aba "Requisitos Funcionais", clicar no botão "Adicionar Requisito Funcional"',
            "Preencher os campos no modal que será aberto",
            'Clicar no botão "Salvar"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Modal de cadastro: o modal deve conter as seguintes abas e campos:",
              itens: [
                "Aba 1 - Informações básicas:",
                "- #s#Título:# campo obrigatório de texto para o título do requisito",
                "- #s#Tipo:# seleção obrigatória entre Alteração, Inclusão ou Remoção",
                "- #s#Local:# campo obrigatório para informar onde o requisito será implementado",
                "- #s#Usuário:# campo obrigatório para informar o perfil de usuário",
                "- #s#Perfil:# campo obrigatório para informar o perfil de acesso",
                "Aba 2 - Imagens e Descrição:",
                "- #s#Imagens:# área para upload de múltiplas imagens (opcional)",
                "- #s#Descrição:# campo obrigatório com editor de texto rico para detalhar o requisito",
                "Aba 3 - Regras:",
                "- #s#Regras de validações dos campos:# editor de texto rico (opcional)",
                "- #s#Regras de negócio:# editor de texto rico (opcional)",
                "Aba 4 - Banco de dados:",
                "- #s#Mudança de banco:# editor de texto rico para detalhar mudanças no banco (opcional)",
              ],
            },
            {
              titulo:
                "Validação e salvamento: ao clicar em salvar, o sistema deve:",
              itens: [
                "Validar todos os campos obrigatórios",
                "Se houver campos obrigatórios não preenchidos, destacar campos com erro e focar no primeiro campo com problema",
                "Se todos os campos obrigatórios estiverem preenchidos, salvar o requisito",
                "Atribuir ID sequencial no formato RF-XX (RF-01, RF-02, etc.)",
                "Exibir mensagem de sucesso e fechar o modal",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "O ID do requisito funcional segue o formato RF-XX, onde XX é um número sequencial iniciando em 01",
            },
            {
              descricao:
                "Os campos de regras e banco de dados são opcionais, mas a descrição é obrigatória",
            },
            {
              descricao:
                "Campos fixados como padrão são aplicados a novos requisitos automaticamente",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O modal permite navegação entre abas por cliques ou usando TAB",
            },
            {
              descricao:
                "O editor de texto rico permite formatação básica (negrito, itálico, listas, etc.)",
            },
            {
              descricao:
                "Campos com erro de validação são destacados em vermelho",
            },
            {
              descricao:
                "Campos podem ser fixados como padrão clicando no ícone de cadeado ao lado do campo",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Cadastro com todos os campos obrigatórios preenchidos",
              dado: "que o usuário deseja cadastrar um novo requisito funcional",
              e: "preencheu todos os campos obrigatórios",
              quando: 'o usuário clica em "Salvar"',
              entao: "o sistema deve salvar o requisito com um ID sequencial",
              e_entao:
                'exibir mensagem "Requisito RF-XX adicionado com sucesso!"',
            },
            {
              titulo: "Tentativa de cadastro sem preencher campos obrigatórios",
              dado: "que o usuário deseja cadastrar um novo requisito funcional",
              e: "não preencheu todos os campos obrigatórios",
              quando: 'o usuário clica em "Salvar"',
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Selecionar a aba "Requisitos Funcionais"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Exibição da lista: o sistema deve exibir os requisitos funcionais com as seguintes informações:",
              itens: [
                "#s#ID:# identificador sequencial no formato RF-XX",
                "#s#Título:# título do requisito funcional",
                "#s#Local:# local de implementação do requisito",
                "#s#Tipo:# tipo do requisito (Alteração, Inclusão ou Remoção)",
                "#s#Ações:# botões para visualizar, editar, duplicar e remover o requisito",
              ],
            },
            {
              titulo: "Reordenação por drag and drop: o sistema deve permitir:",
              itens: [
                "Arrastar e soltar requisitos para reorganizá-los",
                "Atualizar automaticamente os IDs para refletir a nova ordem",
                "Por exemplo, se RF-03 for movido para a primeira posição, ele se torna RF-01, e os outros são renumerados sequencialmente",
              ],
            },
            {
              titulo: "Botão de adição: o sistema deve exibir:",
              itens: [
                'Um botão "Adicionar Requisito Funcional" acima ou abaixo da tabela',
                "Este botão deve abrir o modal de cadastro de novo requisito quando clicado",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "Os requisitos são sempre exibidos na ordem dos IDs, do menor para o maior",
            },
            {
              descricao:
                "A reordenação sempre atualiza os IDs para manter a sequência contínua",
            },
            {
              descricao:
                "A ordem dos requisitos é preservada ao gerar a documentação",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O cursor deve mudar para 'move' ao passar sobre as linhas da tabela para indicar que podem ser arrastadas",
            },
            {
              descricao:
                "Durante o arrasto, uma sombra ou linha destacada deve indicar a posição onde o requisito será inserido",
            },
            {
              descricao:
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
                "o sistema deve exibir apenas o botão de adicionar requisito",
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Na aba "Requisitos Funcionais", localizar o requisito desejado na lista',
            "Clicar no botão de visualização (ícone de olho)",
          ],
          criteriosAceitacao: [
            {
              titulo: "Modal de visualização: o modal deve:",
              itens: [
                "Abrir no modo somente leitura (todos os campos desabilitados)",
                "Ter o título 'Visualizar Requisito Funcional'",
                "Exibir todos os dados do requisito, inclusive imagens",
                "Permitir navegação entre as abas mas não a edição dos campos",
                'Apresentar apenas o botão "Voltar" no rodapé',
              ],
            },
            {
              titulo: "Exibição de campos não preenchidos: o sistema deve:",
              itens: [
                'Exibir a mensagem "Não preenchido" em campos opcionais que não possuem conteúdo',
                "Mostrar todas as imagens anexadas, se houver",
                'Exibir a mensagem "Não foram inseridas imagens nesse RF" se não houver imagens',
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "O modo de visualização não permite nenhuma alteração nos dados",
            },
            {
              descricao:
                "Todos os dados são exibidos, mesmo os campos opcionais não preenchidos",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de visualização é representado por um ícone de olho na lista de requisitos",
            },
            {
              descricao:
                "Os campos aparecem em modo somente leitura, com visual diferente dos campos editáveis",
            },
            {
              descricao:
                "Os ícones de cadeado para fixar campos como padrão não são exibidos no modo visualização",
            },
            {
              descricao:
                "O botão de upload de imagens não é exibido no modo visualização",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização de requisito completo",
              dado: "que existe um requisito funcional com todos os campos preenchidos",
              quando:
                "o usuário clica no ícone de visualização desse requisito",
              entao: "o sistema deve abrir o modal no modo somente leitura",
              e_entao: "exibir todos os dados do requisito sem permitir edição",
            },
            {
              titulo:
                "Visualização de requisito com campos opcionais não preenchidos",
              dado: "que existe um requisito com alguns campos opcionais não preenchidos",
              quando:
                "o usuário clica no ícone de visualização desse requisito",
              entao: "o sistema deve abrir o modal no modo somente leitura",
              e_entao: 'exibir "Não preenchido" nos campos opcionais vazios',
            },
            {
              titulo: "Retorno à lista de requisitos",
              dado: "que o usuário está visualizando um requisito",
              quando: 'o usuário clica no botão "Voltar"',
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Na aba "Requisitos Funcionais", localizar o requisito desejado na lista',
            "Clicar no botão de edição (ícone de lápis)",
            "Alterar os campos desejados no modal que será aberto",
            'Clicar no botão "Salvar"',
          ],
          criteriosAceitacao: [
            {
              titulo: "Modal de edição: o modal deve:",
              itens: [
                "Abrir preenchido com todos os dados atuais do requisito",
                "Ter o título 'Editar Requisito Funcional'",
                "Manter o mesmo ID do requisito sendo editado",
                "Permitir a edição de todos os campos",
                "Aplicar as mesmas regras de validação do cadastro",
                "Permitir salvar apenas se todos os campos obrigatórios estiverem preenchidos",
              ],
            },
            {
              titulo:
                "Salvamento das alterações: ao clicar em Salvar, o sistema deve:",
              itens: [
                "Validar todos os campos obrigatórios",
                "Se houver campos não preenchidos, destacar campos com erro",
                "Se todos os campos obrigatórios estiverem preenchidos, atualizar o requisito mantendo o mesmo ID",
                "Exibir mensagem de sucesso e fechar o modal",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao: "O ID do requisito não é alterado durante a edição",
            },
            {
              descricao:
                "Todos os campos podem ser editados, inclusive o título",
            },
            {
              descricao:
                "As mesmas validações do cadastro são aplicadas na edição",
            },
            {
              descricao:
                "O recurso de fixar campos como padrão está disponível também na edição",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de edição é representado por um ícone de lápis na lista de requisitos",
            },
            {
              descricao:
                "O modal de edição é visualmente idêntico ao de cadastro, mas com o título diferente",
            },
            {
              descricao:
                'O botão de salvar exibe o texto "Atualizar" em vez de "Salvar" para indicar edição',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Edição bem-sucedida de requisito",
              dado: "que o usuário deseja editar um requisito existente",
              e: "alterou alguns campos mantendo todos os obrigatórios preenchidos",
              quando: 'o usuário clica em "Atualizar"',
              entao: "o sistema deve salvar as alterações do requisito",
              e_entao:
                'exibir mensagem "O requisito RF-XX foi atualizado com sucesso!"',
            },
            {
              titulo: "Tentativa de edição removendo dados obrigatórios",
              dado: "que o usuário está editando um requisito",
              e: "removeu o conteúdo de um campo obrigatório",
              quando: 'o usuário clica em "Atualizar"',
              entao: "o sistema deve destacar o campo obrigatório em vermelho",
              e_entao: "manter o modal aberto sem salvar as alterações",
            },
            {
              titulo: "Fixação de campo como padrão durante a edição",
              dado: "que o usuário está editando um requisito",
              quando: "o usuário clica no ícone de cadeado ao lado de um campo",
              entao:
                "o sistema deve fixar aquele valor como padrão para novos requisitos",
              e_entao: 'exibir mensagem "Campo X definido como padrão"',
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Na aba "Requisitos Funcionais", localizar o requisito desejado na lista',
            "Clicar no botão de remoção (ícone de lixeira)",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Confirmação de remoção: ao clicar no botão de remover, o sistema deve:",
              itens: [
                'Exibir um modal de confirmação com o título "Remover o [ID-Requisito]"',
                'Mostrar a mensagem "Tem certeza que deseja remover o requisito: [título do requisito]?"',
                'Apresentar os botões "Cancelar" e "Remover"',
                'Se o usuário clicar em "Cancelar", fechar o modal sem realizar alterações',
                'Se o usuário clicar em "Remover", excluir o requisito e atualizar a lista',
              ],
            },
            {
              titulo: "Atualização de IDs após remoção: o sistema deve:",
              itens: [
                "Remover o requisito da lista",
                "Atualizar automaticamente os IDs dos requisitos restantes para manter a sequência",
                "Por exemplo, se RF-02 for removido, o RF-03 passa a ser RF-02, RF-04 passa a ser RF-03, e assim por diante",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao: "A remoção é permanente e não pode ser desfeita",
            },
            {
              descricao:
                "Os IDs são sempre atualizados para manter a sequência contínua",
            },
            {
              descricao:
                "A sequência de IDs sempre começa em RF-01 e continua sem lacunas",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de remoção é representado por um ícone de lixeira na lista de requisitos",
            },
            {
              descricao:
                'O modal de confirmação tem o tipo "caution" (vermelho)',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção confirmada de requisito",
              dado: "que o usuário deseja remover um requisito",
              quando:
                'o usuário clica no ícone de lixeira e confirma clicando em "Remover"',
              entao: "o sistema deve remover o requisito da lista",
              e_entao:
                "atualizar automaticamente os IDs dos requisitos restantes",
            },
            {
              titulo: "Cancelamento da remoção",
              dado: "que o usuário clicou no ícone de lixeira de um requisito",
              quando: 'o usuário clica em "Cancelar" no modal de confirmação',
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Na aba "Requisitos Funcionais", clicar em "Adicionar Requisito Funcional" ou editar um existente',
            'Navegar para a aba "Imagens e Descrição"',
            'Clicar no botão "Selecionar imagens"',
            "Escolher as imagens desejadas no explorador de arquivos",
            'Clicar em "Salvar" para confirmar o requisito',
          ],
          criteriosAceitacao: [
            {
              titulo: "Seleção de imagens: o sistema deve permitir:",
              itens: [
                "Upload de múltiplas imagens simultaneamente",
                "Aceitar formatos comuns: JPG, JPEG, PNG, GIF, WEBP",
                "Validar tamanho máximo de 5MB para o total de todas as imagens",
                "Exibir preview das imagens selecionadas imediatamente após o upload",
              ],
            },
            {
              titulo: "Área de upload: o sistema deve apresentar:",
              itens: [
                'Botão "Selecionar imagens" claramente visível',
                "Suporte a drag and drop para facilitar o upload",
                "Indicador visual quando imagens estão sendo processadas",
                "Grade de visualização das imagens após o upload",
              ],
            },
            {
              titulo: "Validações: o sistema deve:",
              itens: [
                "Rejeitar arquivos que não sejam imagens válidas",
                "Alertar quando o tamanho total exceder 5MB",
                "Mostrar informações de tamanho de cada imagem",
                "Preservar qualidade das imagens no formato base64",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "As imagens são convertidas para base64 e armazenadas junto com o requisito",
            },
            {
              descricao:
                "O limite total de 5MB visa manter a performance do sistema",
            },
            {
              descricao:
                "As imagens são opcionais - um requisito pode não ter imagens",
            },
            {
              descricao:
                "A ordem das imagens na grade é preservada na documentação gerada",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "As imagens são exibidas em uma grade responsiva de 3 colunas",
            },
            {
              descricao:
                "Cada imagem mostra uma miniatura com indicador de tamanho",
            },
            {
              descricao:
                "Botão de upload usa ícones intuitivos e texto descritivo",
            },
            {
              descricao:
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
Quero visualizar todas as imagens de um requisito funcional organizadas em grade
Para ter uma visão geral das imagens anexadas e facilitar sua gestão`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção Documentação de Desenvolvimento",
            'Na aba "Requisitos Funcionais", visualizar ou editar qualquer requisito',
            'Navegar para a aba "Imagens e Descrição"',
            "As imagens cadastradas são exibidas automaticamente na grade",
          ],
          criteriosAceitacao: [
            {
              titulo: "Exibição da grade: o sistema deve mostrar:",
              itens: [
                "Grade responsiva com até 3 colunas em telas grandes",
                "Miniaturas das imagens com proporções mantidas",
                "Indicador de tamanho no canto inferior de cada imagem",
                "Efeito hover para indicar interatividade",
              ],
            },
            {
              titulo: "Informações visuais: cada imagem deve exibir:",
              itens: [
                "Miniatura clara e bem definida",
                "Tamanho formatado (ex: '245,3 KB' ou '1,2 MB')",
                "Botão de remoção no modo edição",
                "Indicação visual quando a imagem é clicável",
              ],
            },
            {
              titulo: "Estados da listagem:",
              itens: [
                "Estado vazio: mensagem 'Nenhuma imagem foi inserida' quando não há imagens",
                "Estado de carregamento durante upload de novas imagens",
                "Estado de edição: botões de remoção visíveis",
                "Estado de visualização: apenas visualização das imagens",
              ],
            },
            {
              titulo: "Responsividade: a grade deve adaptar-se:",
              itens: [
                "3 colunas em telas grandes (desktop)",
                "2 colunas em tablets",
                "1 coluna em smartphones",
                "Espaçamento adequado entre as imagens",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "As imagens são exibidas na ordem em que foram adicionadas",
            },
            {
              descricao:
                "A reordenação manual não é suportada - ordem segue cronologia de upload",
            },
            {
              descricao:
                "No modo visualização, as imagens não podem ser removidas",
            },
            {
              descricao:
                "O estado vazio é exibido quando não há imagens cadastradas",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "Hover effect nas imagens para indicar que são clicáveis",
            },
            {
              descricao:
                "Animações suaves ao adicionar/remover imagens da grade",
            },
            {
              descricao: "Layout consistente com o restante do sistema",
            },
            {
              descricao:
                "Cores e estilos adaptam-se ao tema atual (claro/escuro)",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Exibição de grade com múltiplas imagens",
              dado: "que um requisito possui várias imagens cadastradas",
              quando: "o usuário acessa a aba 'Imagens e Descrição'",
              entao:
                "o sistema deve exibir todas as imagens em grade organizada",
              e_entao: "mostrar o tamanho individual de cada imagem",
            },
            {
              titulo: "Comportamento responsivo",
              dado: "que há imagens na grade",
              quando: "o usuário redimensiona a janela do navegador",
              entao:
                "o sistema deve ajustar automaticamente o número de colunas",
              e_entao: "manter a proporção e qualidade das miniaturas",
            },
            {
              titulo: "Estado vazio",
              dado: "que um requisito não possui imagens cadastradas",
              quando: "o usuário acessa a aba 'Imagens e Descrição'",
              entao: "o sistema deve exibir a mensagem de estado vazio",
              e_entao: "manter visível a área de upload para adicionar imagens",
            },
            {
              titulo: "Diferenciação entre modos",
              dado: "que há imagens na grade",
              quando: "o usuário alterna entre modo edição e visualização",
              entao:
                "o sistema deve mostrar/ocultar os botões de remoção adequadamente",
              e_entao:
                "manter a funcionalidade de clique para visualização em ambos os modos",
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
Quero visualizar imagens de requisitos funcionais em tamanho ampliado
Para analisar detalhes e ter melhor compreensão das especificações`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Na aba "Requisitos Funcionais", visualizar ou editar um requisito que possui imagens',
            'Navegar para a aba "Imagens e Descrição"',
            "Clicar em qualquer imagem na grade para abrir o visualizador",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Abertura do visualizador: ao clicar em uma imagem, o sistema deve:",
              itens: [
                "Abrir um modal em tela cheia com fundo escuro semi-transparente",
                "Exibir a imagem centralizada com tamanho otimizado",
                "Mostrar botões de navegação se houver múltiplas imagens",
                "Bloquear o scroll da página de fundo durante a visualização",
              ],
            },
            {
              titulo: "Navegação entre imagens: o visualizador deve permitir:",
              itens: [
                "Navegar para imagem anterior/próxima com setas laterais",
                "Usar teclas de seta do teclado para navegação",
                "Exibir contador 'X de Y' para indicar posição atual",
                "Loop infinito (após a última, volta para a primeira)",
              ],
            },
            {
              titulo: "Informações da imagem: o visualizador deve exibir:",
              itens: [
                "Nome do arquivo gerado automaticamente",
                "Tamanho do arquivo formatado (KB/MB)",
                "Dimensões da imagem (largura × altura)",
                "Quantidade de caracteres do base64",
              ],
            },
            {
              titulo:
                "Controles de fechamento: deve ser possível fechar através de:",
              itens: [
                "Botão 'X' no canto superior direito",
                "Tecla ESC do teclado",
                "Clique fora da área da imagem (no overlay)",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "As imagens são redimensionadas proporcionalmente para caber na tela",
            },
            {
              descricao:
                "Imagens menores que o viewport são exibidas em tamanho original",
            },
            {
              descricao:
                "A navegação por teclado funciona em ambos os modos (claro/escuro)",
            },
            {
              descricao:
                "O visualizador é responsivo e funciona em diferentes tamanhos de tela",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "Indicação visual de que a imagem é clicável (cursor pointer + hover effect)",
            },
            {
              descricao:
                "Botões de navegação só aparecem quando há múltiplas imagens",
            },
            {
              descricao: "Interface adapta-se ao tema atual (claro/escuro)",
            },
            {
              descricao: "Transições suaves entre imagens e ao abrir/fechar",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Visualização de imagem única",
              dado: "que um requisito possui apenas uma imagem",
              quando: "o usuário clica na imagem",
              entao:
                "o sistema deve abrir o visualizador sem setas de navegação",
              e_entao:
                "mostrar apenas as informações da imagem e botão de fechar",
            },
            {
              titulo: "Navegação entre múltiplas imagens",
              dado: "que um requisito possui várias imagens",
              quando: "o usuário abre o visualizador e navega com as setas",
              entao: "o sistema deve alternar entre as imagens sequencialmente",
              e_entao: "atualizar o contador e as informações de cada imagem",
            },
            {
              titulo: "Fechamento com tecla ESC",
              dado: "que o visualizador está aberto",
              quando: "o usuário pressiona a tecla ESC",
              entao: "o sistema deve fechar o visualizador",
              e_entao: "retornar o foco para a grade de imagens",
            },
            {
              titulo: "Navegação por teclado",
              dado: "que o visualizador está aberto com múltiplas imagens",
              quando: "o usuário usa as setas do teclado (← →)",
              entao: "o sistema deve navegar entre as imagens",
              e_entao: "funcionar da mesma forma que os botões na tela",
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Na aba "Requisitos Funcionais", editar um requisito que possui imagens',
            'Navegar para a aba "Imagens e Descrição"',
            "Localizar a imagem a ser removida na grade",
            "Clicar no botão 'X' no canto superior direito da imagem",
            'Clicar em "Salvar" para confirmar as alterações',
          ],
          criteriosAceitacao: [
            {
              titulo: "Botão de remoção: cada imagem deve ter:",
              itens: [
                "Botão 'X' vermelho no canto superior direito",
                "Ícone claramente visível sobre a imagem",
                "Tooltip explicativo ao passar o mouse",
                "Remoção imediata sem necessidade de confirmação adicional",
              ],
            },
            {
              titulo: "Feedback visual: o sistema deve:",
              itens: [
                "Remover a imagem da grade imediatamente após o clique",
                "Reorganizar automaticamente as imagens restantes",
                "Atualizar o cálculo de tamanho total das imagens",
                "Manter a numeração sequencial das imagens restantes",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "A remoção é imediata e não requer confirmação adicional",
            },
            {
              descricao: "As imagens restantes mantêm sua ordem original",
            },
            {
              descricao:
                "É possível remover todas as imagens, deixando o campo vazio",
            },
            {
              descricao: "A remoção só é definitiva após salvar o requisito",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "Botão de remoção só aparece no modo de edição/criação",
            },
            {
              descricao: "Hover effect no botão para melhor usabilidade",
            },
            {
              descricao: "Animação suave na remoção da imagem da grade",
            },
            {
              descricao:
                "Área de upload permanece visível mesmo após remover todas as imagens",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção de imagem individual",
              dado: "que um requisito possui múltiplas imagens",
              quando: "o usuário clica no 'X' de uma imagem específica",
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Selecionar a aba "Requisitos Não Funcionais"',
            "Preencher os campos de título e descrição",
            'Clicar no botão "Adicionar"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Formulário de cadastro: o sistema deve exibir um formulário com os seguintes campos:",
              itens: [
                "#s#Título:# campo obrigatório de texto para o título do requisito não funcional",
                "#s#Descrição:# campo obrigatório de texto para a descrição detalhada do requisito",
                'Botão "Adicionar" para salvar o requisito',
              ],
            },
            {
              titulo:
                "Validação e salvamento: ao clicar em Adicionar, o sistema deve:",
              itens: [
                "Validar se ambos os campos estão preenchidos",
                "Se algum campo estiver vazio, destacá-lo em vermelho e focar nele",
                "Se ambos os campos estiverem preenchidos, salvar o requisito",
                "Atribuir ID sequencial no formato RNF-XX (RNF-01, RNF-02, etc.)",
                "Limpar o formulário para permitir a adição de um novo requisito",
                "Focar no campo de título para facilitar novas entradas",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "O ID do requisito não funcional segue o formato RNF-XX, onde XX é um número sequencial iniciando em 01",
            },
            {
              descricao:
                "Ambos os campos (título e descrição) são obrigatórios",
            },
            {
              descricao:
                "A validação é feita apenas ao tentar salvar, não em tempo real",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O formulário de cadastro fica acima da listagem de requisitos não funcionais (RNFs)",
            },
            {
              descricao:
                "Campos com erro de validação são destacados em vermelho",
            },
            {
              descricao:
                'O botão mostra o texto "Adicionar" para novos requisitos e "Atualizar" durante edição',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Cadastro com todos os campos preenchidos",
              dado: "que o usuário deseja cadastrar um novo requisito não funcional",
              e: "preencheu o título e a descrição",
              quando: 'o usuário clica em "Adicionar"',
              entao: "o sistema deve salvar o requisito com um ID sequencial",
              e_entao: "limpar o formulário e focar no campo de título",
            },
            {
              titulo: "Tentativa de cadastro sem título",
              dado: "que o usuário deseja cadastrar um novo requisito não funcional",
              e: "preencheu apenas o campo de descrição, deixando o título em branco",
              quando: 'o usuário clica em "Adicionar"',
              entao: "o sistema deve destacar o campo de título em vermelho",
              e_entao: "focar no campo de título sem salvar o requisito",
            },
            {
              titulo: "Tentativa de cadastro sem descrição",
              dado: "que o usuário deseja cadastrar um novo requisito não funcional",
              e: "preencheu apenas o campo de título, deixando a descrição em branco",
              quando: 'o usuário clica em "Adicionar"',
              entao: "o sistema deve destacar o campo de descrição em vermelho",
              e_entao: "focar no campo de descrição sem salvar o requisito",
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Selecionar a aba "Requisitos Não Funcionais"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Exibição da lista: o sistema deve exibir os requisitos não funcionais (RNFs) com as seguintes informações:",
              itens: [
                "#s#ID:# identificador sequencial no formato RNF-XX",
                "#s#Título:# título do requisito não funcional",
                "#s#Descrição:# descrição detalhada do requisito",
                "#s#Ações:# botões para editar e remover o requisito",
              ],
            },
            {
              titulo: "Reordenação por drag and drop: o sistema deve permitir:",
              itens: [
                "Arrastar e soltar requisitos para reorganizá-los",
                "Atualizar automaticamente os IDs para refletir a nova ordem",
                "Por exemplo, se RNF-03 for movido para a primeira posição, ele se torna RNF-01, e os outros são renumerados sequencialmente",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "Os requisitos são sempre exibidos na ordem dos IDs, do menor para o maior",
            },
            {
              descricao:
                "A reordenação sempre atualiza os IDs para manter a sequência contínua",
            },
            {
              descricao:
                "A ordem dos requisitos é preservada ao gerar a documentação",
            },
            {
              descricao:
                "A lista só é exibida se houver pelo menos um requisito cadastrado",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O cursor deve mudar para 'move' ao passar sobre as linhas da tabela para indicar que podem ser arrastadas",
            },
            {
              descricao:
                "Durante o arrasto, uma sombra ou linha destacada deve indicar a posição onde o requisito será inserido",
            },
            {
              descricao:
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Selecionar a aba "Requisitos Não Funcionais"',
            "Localizar o requisito desejado na lista",
            "Clicar no botão de edição (ícone de lápis)",
            "Alterar os campos desejados",
            'Clicar no botão "Atualizar"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Carregamento para edição: ao clicar no botão de edição, o sistema deve:",
              itens: [
                "Carregar os dados do requisito selecionado nos campos do formulário",
                'Mudar o texto do botão para "Atualizar"',
                "Manter o foco no campo de título para facilitar a edição",
              ],
            },
            {
              titulo: "Atualização: ao clicar em Atualizar, o sistema deve:",
              itens: [
                "Validar se ambos os campos estão preenchidos",
                "Se algum campo estiver vazio, destacá-lo em vermelho e focar nele",
                "Se ambos os campos estiverem preenchidos, atualizar o requisito mantendo o mesmo ID",
                "Limpar o formulário",
                'Reverter o botão para "Adicionar"',
                "Exibir mensagem de sucesso",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao: "O ID do requisito não é alterado durante a edição",
            },
            {
              descricao:
                "As mesmas validações do cadastro são aplicadas na edição",
            },
            {
              descricao:
                "Se o usuário começar a editar um requisito e clicar em outro botão de edição, os dados do formulário são substituídos pelos do novo requisito selecionado",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de edição é representado por um ícone de lápis na lista de requisitos",
            },
            {
              descricao:
                'O botão de formulário exibe o texto "Atualizar" durante o modo de edição',
            },
            {
              descricao:
                "Campos com erro de validação são destacados em vermelho",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Edição bem-sucedida de requisito",
              dado: "que o usuário deseja editar um requisito não funcional existente",
              quando:
                'o usuário seleciona o requisito para edição, altera os campos e clica em "Atualizar"',
              entao: "o sistema deve salvar as alterações mantendo o mesmo ID",
              e_entao: "limpar o formulário e exibir mensagem de sucesso",
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
              quando: 'o usuário clica em "Atualizar"',
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
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            'Selecionar a aba "Requisitos Não Funcionais"',
            "Localizar o requisito desejado na lista",
            "Clicar no botão de remoção (ícone de lixeira)",
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Confirmação de remoção: ao clicar no botão de remover, o sistema deve:",
              itens: [
                'Exibir um modal de confirmação com o título "Remover o [ID-Requisito]"',
                'Mostrar a mensagem "Tem certeza que deseja remover o requisito não funcional: [título do requisito]?"',
                'Apresentar os botões "Cancelar" e "Remover"',
                'Se o usuário clicar em "Cancelar", fechar o modal sem realizar alterações',
                'Se o usuário clicar em "Remover", excluir o requisito e atualizar a lista',
              ],
            },
            {
              titulo: "Atualização de IDs após remoção: o sistema deve:",
              itens: [
                "Remover o requisito da lista",
                "Atualizar automaticamente os IDs dos requisitos restantes para manter a sequência",
                "Por exemplo, se RNF-02 for removido, o RNF-03 passa a ser RNF-02, RNF-04 passa a ser RNF-03, e assim por diante",
                "Exibir mensagem de sucesso após a remoção",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao: "A remoção é permanente e não pode ser desfeita",
            },
            {
              descricao:
                "Os IDs são sempre atualizados para manter a sequência contínua",
            },
            {
              descricao:
                "Se o requisito que está sendo removido estiver carregado no formulário de edição, o formulário é limpo",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de remoção é representado por um ícone de lixeira na lista de requisitos",
            },
            {
              descricao:
                'O modal de confirmação tem o tipo "caution" (vermelho)',
            },
          ],
          cenariosTeste: [
            {
              titulo: "Remoção confirmada de requisito",
              dado: "que o usuário deseja remover um requisito não funcional",
              quando:
                'o usuário clica no ícone de lixeira e confirma clicando em "Remover"',
              entao: "o sistema deve remover o requisito da lista",
              e_entao:
                "atualizar automaticamente os IDs dos requisitos restantes",
            },
            {
              titulo: "Cancelamento da remoção",
              dado: "que o usuário clicou no ícone de lixeira de um requisito não funcional",
              quando: 'o usuário clica em "Cancelar" no modal de confirmação',
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
            "Selecionar #g#Documentação de Desenvolvimento#",
            "Preencher informações básicas e requisitos",
            'Na seção "Pontos de Função", inserir o valor total contabilizado',
            'Clicar em "Gerar Documentos"',
          ],
          criteriosAceitacao: [
            {
              titulo: "Preenchimento de pontos de função (PFs):",
              itens: [
                "Campo numérico decimal que aceita valores como '12,50'",
                "Formatação automática para o padrão brasileiro (vírgula como separador decimal)",
                "Limitação a duas casas decimais",
              ],
            },
            {
              titulo: "Histórico de modificação:",
              itens: [
                "O sistema deve registrar a data da modificação quando os pontos são adicionados",
                "O sistema deve registrar o autor que adicionou os pontos de função (PFs)",
                "A exportação final deve incluir essas informações no documento",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "O campo de pontos de função é opcional, podendo ser preenchido após a contagem",
            },
            {
              descricao:
                "O sistema registra a data e o autor quando os pontos de função são modificados",
            },
            {
              descricao:
                "O fluxo ideal é primeiro gerar o documento e depois importá-lo para adicionar os pontos de função",
            },
            {
              descricao:
                "O valor é formatado com vírgula como separador decimal no padrão brasileiro",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O campo aceita entrada tanto com ponto quanto com vírgula como separador decimal",
            },
            {
              descricao:
                "A formatação é aplicada automaticamente após a saída do campo",
            },
            {
              descricao:
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
Quero gerar #g#documentação de desenvolvimento# em diferentes formatos
Para formalizar e compartilhar as especificações do sistema a ser desenvolvido`,
          caminhoAcesso: [
            "Acessar o sistema",
            "Selecionar a opção #g#Documentação de Desenvolvimento#",
            "Preencher todos os campos obrigatórios do formulário",
            "Adicionar pelo menos um requisito funcional",
            "Selecionar os formatos desejados (JSON, DOCX, PDF)",
            'Clicar no botão "Gerar Documentos"',
          ],
          criteriosAceitacao: [
            {
              titulo:
                "Validação antes da geração: o sistema deve verificar se os seguintes requisitos estão atendidos:",
              itens: [
                "Campos obrigatórios da SS estão preenchidos (Número, Ano, Título, Descrição, Data de Início, Data de Fim)",
                "Pelo menos um autor está selecionado",
                "Pelo menos um requisito funcional está adicionado",
                "Caso algum requisito não seja atendido, exibir mensagem de erro destacando os campos com problema",
              ],
            },
            {
              titulo:
                "Seleção de formatos: o sistema deve permitir a seleção de diferentes formatos:",
              itens: [
                "#p#JSON# (sempre selecionado por padrão, não pode ser desmarcado)",
                "#b#DOCX# (opcional)",
                "#r#PDF# (opcional)",
                'O texto do botão muda para "Baixar JSON" quando apenas #p#JSON# está selecionado',
                'O texto do botão é "Gerar Documentos" quando #b#DOCX# e/ou #r#PDF# estão selecionados',
              ],
            },
            {
              titulo:
                "Geração de documentos: ao clicar no botão, o sistema deve:",
              itens: [
                "Exibir indicador de carregamento durante o processamento",
                "Se apenas #p#JSON# estiver selecionado, não é necessário validar todos os campos obrigatórios (útil para salvar rascunhos)",
                "Se #b#DOCX# e/ou #r#PDF# estiverem selecionados, validar todos os campos obrigatórios",
                "Incluir todos os requisitos funcionais (RFs) e não funcionais (RNFs) nos documentos gerados",
                "Gerar os documentos nos formatos selecionados",
                "Disponibilizar os arquivos para download",
                "Exibir mensagem de sucesso após a geração",
              ],
            },
            {
              titulo: "Controle de versão no histórico do documento:",
              itens: [
                "Se o documento estiver sendo criado pela primeira vez, registrar a data atual e o autor atual como criador",
                "Se o documento estiver sendo modificado (importado de #p#JSON# e alterado), registrar a data atual e o autor atual como modificador",
                "Se houver um valor no campo 'Total de Pontos de Função', registrar também uma linha no histórico indicando a adição desse valor",
              ],
            },
          ],
          regrasNegocio: [
            {
              descricao:
                "#p#JSON# é sempre gerado, independentemente de outras seleções",
            },
            {
              descricao:
                "#b#DOCX# e #r#PDF# são opcionais e podem ser selecionados individualmente ou em conjunto",
            },
            {
              descricao:
                "Quando apenas #p#JSON# é selecionado, o sistema permite salvar documentos incompletos (sem validar todos os campos)",
            },
            {
              descricao:
                "Quando #b#DOCX# e/ou #r#PDF# são selecionados, todos os campos obrigatórios devem ser preenchidos e pelo menos um requisito funcional deve estar cadastrado",
            },
            {
              descricao:
                "O campo 'Total de Pontos de Função' é opcional e geralmente preenchido após a contagem formal de pontos de função (PFs)",
            },
          ],
          regrasInterface: [
            {
              descricao:
                "O botão de geração exibe um spinner de carregamento durante o processamento",
            },
            {
              descricao:
                "O texto do botão muda de acordo com os formatos selecionados",
            },
            {
              descricao:
                "Os formatos são selecionados através de checkboxes, com #p#JSON# sempre marcado e desabilitado",
            },
          ],
          cenariosTeste: [
            {
              titulo: "Geração de todos os formatos com dados completos",
              dado: "que o usuário preencheu todos os campos obrigatórios",
              e: "adicionou pelo menos um requisito funcional",
              e: "selecionou os formatos #p#JSON#, #b#DOCX# e #r#PDF#",
              quando: 'o usuário clica em "Gerar Documentos"',
              entao: "o sistema deve processar e gerar os três formatos",
              e_entao:
                "disponibilizar um arquivo ZIP contendo todos os documentos para download",
            },
            {
              titulo: "Geração apenas de JSON (rascunho)",
              dado: "que o usuário preencheu parcialmente os campos",
              e: "manteve apenas o formato #p#JSON# selecionado",
              quando: 'o usuário clica em "Baixar JSON"',
              entao:
                "o sistema deve gerar o arquivo #p#JSON# mesmo com campos obrigatórios não preenchidos",
              e_entao: "disponibilizar o arquivo #p#JSON# para download",
            },
            {
              titulo: "Geração com pontos de função (PFs) após importação",
              dado: "que o usuário importou um documento #p#JSON# existente",
              e: "adicionou um valor no campo 'Total de Pontos de Função'",
              e: "selecionou os formatos #b#DOCX# e #r#PDF#",
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
              (c.descricao && c.descricao.toLowerCase().includes(filtro))
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

    processarMarkdown(texto) {
      if (!texto) return "";

      let processado = texto;

      // Novo sistema de cores com #c#texto# onde c é a inicial da cor
      // Azul/Blue (#b#texto#)
      processado = processado.replace(
        /#b#([\s\S]*?)#/g,
        '<span class="highlight-blue">$1</span>'
      );

      // Azul claro/Sky (#s#texto#)
      processado = processado.replace(
        /#s#([\s\S]*?)#/g,
        '<span class="highlight-sky">$1</span>'
      );

      // Verde/Green (#g#texto#)
      processado = processado.replace(
        /#g#([\s\S]*?)#/g,
        '<span class="highlight-green">$1</span>'
      );

      // Amarelo/Yellow (#y#texto#)
      processado = processado.replace(
        /#y#([\s\S]*?)#/g,
        '<span class="highlight-amber">$1</span>'
      );

      // Vermelho/Red (#r#texto#)
      processado = processado.replace(
        /#r#([\s\S]*?)#/g,
        '<span class="highlight-red">$1</span>'
      );

      // Roxo/Purple (#p#texto#)
      processado = processado.replace(
        /#p#([\s\S]*?)#/g,
        '<span class="highlight-purple">$1</span>'
      );

      // Laranja/Orange (#o#texto#)
      processado = processado.replace(
        /#o#([\s\S]*?)#/g,
        '<span class="highlight-orange">$1</span>'
      );

      processado = processado.replace(
        /class="highlight-orange"/g,
        'class="text-orange-600 dark:text-orange-400 font-medium"'
      );

      // Depois, processa negrito e itálico (que podem estar dentro dos destaques)
      // Processa negrito (**texto**)
      processado = processado.replace(
        /\*\*([\s\S]*?)\*\*/g,
        "<strong>$1</strong>"
      );

      // Processa itálico (*texto*)
      processado = processado.replace(/\*([\s\S]*?)\*/g, "<em>$1</em>");

      // Por último, aplica as classes CSS finais aos destaques
      processado = processado.replace(
        /class="highlight-blue"/g,
        'class="text-blue-600 dark:text-blue-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-sky"/g,
        'class="text-sky-600 dark:text-sky-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-green"/g,
        'class="text-green-600 dark:text-green-400 font-medium"'
      );
      processado = processado.replace(
        /class="highlight-amber"/g,
        'class="text-amber-600 dark:text-amber-400 font-medium"'
      );
      processado = processado.replace(
        /class="highlight-red"/g,
        'class="text-red-700 dark:text-red-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-purple"/g,
        'class="text-purple-600 dark:text-purple-400 font-medium"'
      );

      // Processa listas não ordenadas (- item)
      processado = processado.replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>');

      // Processa listas ordenadas (1. item)
      processado = processado.replace(/^\d+\.\s(.+)$/gm, () => {
        return `<li class="ml-4" style="list-style-type: decimal; list-style-position: inside;">${arguments[1]}</li>`;
      });

      // Agrupa itens de lista consecutivos
      processado = processado.replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
        if (match.includes("list-style-type: decimal")) {
          return `<ol class="list-decimal list-inside ml-4">${match}</ol>`;
        } else {
          return `<ul class="list-disc list-inside ml-4">${match}</ul>`;
        }
      });

      // Quebras de linha
      processado = processado.replace(/\n/g, "<br>");

      return processado;
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
