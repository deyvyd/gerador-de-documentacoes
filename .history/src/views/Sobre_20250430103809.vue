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
      <div class="main-card p-8 mb-8">
        <h1 class="text-3xl md:text-4xl font-bold mb-4 text-center">
          Sobre o Gerador de Documentações
        </h1>

        <!-- Contexto, Objetivo e Benefícios -->
        <section class="mb-8">
          <h2 class="text-2xl font-semibold mb-4 text-blue-400">Contexto</h2>
          <p class="mb-4">
            A documentação de projetos de tecnologia é uma etapa crucial no
            processo de desenvolvimento de software que frequentemente enfrenta
            desafios de padronização e eficiência. Antes da criação deste
            sistema, equipes técnicas e de desenvolvimento gastavam horas
            significativas redigindo documentos em formatos inconsistentes,
            resultando em documentação de qualidade variável e dificuldade no
            acompanhamento de projetos.
          </p>

          <h2 class="text-2xl font-semibold mb-4 text-blue-400">Objetivo</h2>
          <p class="mb-4">
            O Gerador de Documentações foi desenvolvido para padronizar e
            automatizar o processo de criação de documentos técnicos e de
            desenvolvimento para Solicitações de Serviço (SS). O sistema oferece
            interfaces específicas para dois tipos principais de documentação:
          </p>
          <ul class="list-disc pl-6 mb-4 space-y-2">
            <li>
              <span class="font-semibold text-orange-400"
                >Documentação Técnica:</span
              >
              Para registro detalhado de atividades realizadas, horas
              trabalhadas e cálculos de pontos de função.
            </li>
            <li>
              <span class="font-semibold text-green-400"
                >Documentação de Desenvolvimento:</span
              >
              Para especificação de requisitos funcionais e não funcionais,
              incluindo detalhes de implementação e integração com banco de
              dados.
            </li>
          </ul>

          <h2 class="text-2xl font-semibold mb-4 text-blue-400">Benefícios</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-blue-800 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-2">Padronização</h3>
              <p>
                Garante que todos os documentos sigam o mesmo padrão de formato
                e conteúdo, facilitando revisões e aprovações.
              </p>
            </div>
            <div class="bg-blue-800 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-2">Eficiência</h3>
              <p>
                Reduz o tempo gasto na criação de documentação em até 60%,
                permitindo que as equipes foquem no desenvolvimento.
              </p>
            </div>
            <div class="bg-blue-800 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-2">Versatilidade</h3>
              <p>
                Exportação em múltiplos formatos (JSON, DOCX, PDF) para atender
                diferentes necessidades organizacionais.
              </p>
            </div>
            <div class="bg-blue-800 p-4 rounded-lg">
              <h3 class="text-lg font-semibold mb-2">Rastreabilidade</h3>
              <p>
                Mantém histórico de criação e modificação, permitindo acompanhar
                a evolução dos documentos ao longo do tempo.
              </p>
            </div>
          </div>
        </section>

        <!-- Abas para mostrar os campos de cada tela -->
        <section class="mt-8">
          <h2 class="text-2xl font-semibold mb-4 text-center">
            Guia de Campos por Tipo de Documentação
          </h2>

          <div class="mb-4">
            <div class="modal-tabs-container border-b border-gray-600 mb-4">
              <button
                v-for="(tab, index) in documentacaoTabs"
                :key="index"
                @click="tabAtiva = index"
                class="modal-tab-button py-2 px-4 text-sm font-medium transition-colors duration-200"
                :class="
                  tabAtiva === index
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-blue-300'
                "
              >
                {{ tab.nome }}
              </button>
            </div>

            <!-- Conteúdo da aba Documentação Técnica -->
            <div v-if="tabAtiva === 0" class="campos-container">
              <h3 class="text-xl font-semibold mb-4 text-orange-400">
                Documentação Técnica
              </h3>
              <p class="mb-4">
                Esta documentação é voltada para o registro de atividades
                técnicas realizadas em uma Solicitação de Serviço (SS). A
                seguir, a descrição de cada campo:
              </p>

              <div class="overflow-x-auto">
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
                        Número identificador da SS, composto por 3 dígitos (ex:
                        001)
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
                        Descrição das ações realizadas para atualização do
                        sistema para um objetivo específico
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
                        Link para o board do projeto no GitLab ou outra
                        ferramenta
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
                        Cálculo automático de pontos de função: (horas / 10) *
                        (250 / 100)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Conteúdo da aba Documentação de Desenvolvimento -->
            <div v-if="tabAtiva === 1" class="campos-container">
              <h3 class="text-xl font-semibold mb-4 text-green-400">
                Documentação de Desenvolvimento
              </h3>
              <p class="mb-4">
                Esta documentação é voltada para a especificação de requisitos
                de desenvolvimento em uma Solicitação de Serviço (SS). A seguir,
                a descrição de cada campo:
              </p>

              <div class="overflow-x-auto">
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
                        Número identificador da SS, composto por 3 dígitos (ex:
                        001)
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
                        Descrição das ações realizadas para atualização do
                        sistema para um objetivo específico
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
                        Link para o board do projeto no GitLab ou outra
                        ferramenta
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
                      <td>
                        Identificador automático no formato RF-XX (ex: RF-01)
                      </td>
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
            <div v-if="tabAtiva === 2" class="campos-container">
              <h3 class="text-xl font-semibold mb-4 text-purple-400">
                Formatos de Exportação
              </h3>
              <p class="mb-4">
                O sistema permite exportar as documentações em diferentes
                formatos para atender a diversas necessidades. Confira as
                características de cada formato:
              </p>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div
                  class="bg-blue-800 p-4 rounded-lg border border-purple-700"
                >
                  <div class="flex items-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 mr-2 text-purple-400"
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
                    <h4 class="text-lg font-semibold">JSON</h4>
                  </div>
                  <ul class="list-disc pl-4 space-y-1 text-sm">
                    <li>Formato padrão sempre gerado</li>
                    <li>Ideal para importação posterior</li>
                    <li>Facilita integração com outros sistemas</li>
                    <li>Preserva todos os dados estruturados</li>
                    <li>Tamanho reduzido de arquivo</li>
                  </ul>
                </div>

                <div
                  class="bg-blue-800 p-4 rounded-lg border border-purple-700"
                >
                  <div class="flex items-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 mr-2 text-purple-400"
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
                    <h4 class="text-lg font-semibold">DOCX</h4>
                  </div>
                  <ul class="list-disc pl-4 space-y-1 text-sm">
                    <li>Formato compatível com Microsoft Word</li>
                    <li>Documento formatado para impressão</li>
                    <li>Inclui estilos corporativos padronizados</li>
                    <li>Permite edições posteriores</li>
                    <li>Ideal para revisão e aprovação</li>
                  </ul>
                </div>

                <div
                  class="bg-blue-800 p-4 rounded-lg border border-purple-700"
                >
                  <div class="flex items-center mb-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 mr-2 text-purple-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                    <h4 class="text-lg font-semibold">PDF</h4>
                  </div>
                  <ul class="list-disc pl-4 space-y-1 text-sm">
                    <li>Formato final para distribuição</li>
                    <li>Preserva formatação em qualquer dispositivo</li>
                    <li>Não permite alterações acidentais</li>
                    <li>Ideal para arquivamento</li>
                    <li>Pode ser assinado digitalmente</li>
                  </ul>
                </div>
              </div>

              <div
                class="mt-6 p-4 bg-blue-900 rounded-lg border border-blue-800"
              >
                <h4 class="font-semibold mb-2 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 mr-2 text-yellow-500"
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
                <p class="text-sm">
                  Ao exportar a documentação, você pode selecionar qualquer
                  combinação de formatos DOCX e PDF, além do JSON que é sempre
                  gerado. Se apenas o formato JSON for selecionado, o sistema
                  não realiza a validação completa dos campos, o que é útil para
                  salvar um rascunho do trabalho em andamento.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <!-- Informações de Contato e Versão -->
      <div class="main-card p-6 mb-8">
        <h2 class="text-xl font-semibold mb-4 text-center">
          Informações do Sistema
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-2 text-blue-400">Suporte</h3>
            <p class="mb-2">
              Para dúvidas, sugestões ou relato de problemas, entre em contato
              com:
            </p>
            <ul class="space-y-2">
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-400"
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
                <span>deyvyd.moura@logap.com.br</span>
              </li>
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-400"
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
                <span>Horário de atendimento: Seg-Sex, 8h às 18h</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2 text-blue-400">
              Informações Técnicas
            </h3>
            <ul class="space-y-2">
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-400"
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
                <span>Versão: 1.0.0</span>
              </li>
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-400"
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
                <span>Data da última atualização: 30 de Abril, 2025</span>
              </li>
              <li class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2 text-blue-400"
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
                <span>Desenvolvido com: Vue.js, Tailwind CSS</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Perguntas Frequentes -->
      <div class="main-card p-6 mb-8">
        <h2 class="text-xl font-semibold mb-6 text-center">
          Perguntas Frequentes
        </h2>

        <div class="space-y-4">
          <div class="bg-blue-800 p-4 rounded-lg mb-4">
            <div
              class="flex justify-between items-center cursor-pointer"
              @click="toggleFaq(1)"
            >
              <h3 class="font-semibold">
                Como importar um arquivo JSON salvo anteriormente?
              </h3>
              <svg
                :class="[activeFaq === 1 ? 'transform rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-if="activeFaq === 1"
              class="mt-2 pl-2 text-sm transition-all duration-200"
            >
              <p>Para importar um arquivo JSON salvo anteriormente:</p>
              <ol class="list-decimal pl-5 mt-2 space-y-1">
                <li>Clique no ícone de upload (↑) na barra superior</li>
                <li>
                  Se já houver dados preenchidos, o sistema solicitará
                  confirmação
                </li>
                <li>Selecione o arquivo JSON que deseja importar</li>
                <li>
                  Os dados serão carregados automaticamente nos respectivos
                  campos
                </li>
              </ol>
            </div>
          </div>

          <div class="bg-blue-800 p-4 rounded-lg mb-4">
            <div
              class="flex justify-between items-center cursor-pointer"
              @click="toggleFaq(2)"
            >
              <h3 class="font-semibold">
                Posso editar um documento gerado anteriormente?
              </h3>
              <svg
                :class="[activeFaq === 2 ? 'transform rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-if="activeFaq === 2"
              class="mt-2 pl-2 text-sm transition-all duration-200"
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
              <p class="mt-2">
                Observação: Se o documento foi criado por outro autor, um novo
                registro de modificação será adicionado com as suas iniciais.
              </p>
            </div>
          </div>

          <div class="bg-blue-800 p-4 rounded-lg mb-4">
            <div
              class="flex justify-between items-center cursor-pointer"
              @click="toggleFaq(3)"
            >
              <h3 class="font-semibold">
                Como reordenar requisitos funcionais ou não funcionais?
              </h3>
              <svg
                :class="[activeFaq === 3 ? 'transform rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-if="activeFaq === 3"
              class="mt-2 pl-2 text-sm transition-all duration-200"
            >
              <p>
                Os requisitos podem ser reordenados facilmente com a
                funcionalidade de arraste e solte:
              </p>
              <ol class="list-decimal pl-5 mt-2 space-y-1">
                <li>
                  Posicione o cursor sobre a linha do requisito que deseja mover
                </li>
                <li>Clique e mantenha pressionado o botão do mouse</li>
                <li>Arraste o item para a posição desejada</li>
                <li>Solte o botão do mouse</li>
              </ol>
              <p class="mt-2">
                Os IDs dos requisitos serão automaticamente atualizados para
                manter a sequência correta.
              </p>
            </div>
          </div>

          <div class="bg-blue-800 p-4 rounded-lg">
            <div
              class="flex justify-between items-center cursor-pointer"
              @click="toggleFaq(4)"
            >
              <h3 class="font-semibold">
                Por que algumas informações não são transferidas entre os tipos
                de documentação?
              </h3>
              <svg
                :class="[activeFaq === 4 ? 'transform rotate-180' : '']"
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <div
              v-if="activeFaq === 4"
              class="mt-2 pl-2 text-sm transition-all duration-200"
            >
              <p>
                A documentação técnica e a documentação de desenvolvimento têm
                propósitos e estruturas diferentes:
              </p>
              <ul class="list-disc pl-5 mt-2 space-y-1">
                <li>
                  A documentação técnica é focada em atividades e horas
                  trabalhadas
                </li>
                <li>
                  A documentação de desenvolvimento é focada em requisitos
                  funcionais e não funcionais
                </li>
              </ul>
              <p class="mt-2">
                As informações básicas da SS (número, ano, título, descrição,
                datas e autores) são comuns a ambos os tipos, mas os demais
                campos são específicos de cada tipo de documentação. Ao trocar
                entre os tipos, apenas as informações básicas comuns serão
                mantidas.
              </p>
            </div>
          </div>
        </div>

        <!-- Seção Final com Links Úteis -->
        <div class="main-card p-6 mb-8">
          <h2 class="text-xl font-semibold mb-4 text-center">Links Úteis</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <a
              href="#"
              class="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 mx-auto mb-2 text-blue-400"
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
              <span class="font-medium">Manual do Usuário</span>
            </a>
            <a
              href="#"
              class="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 mx-auto mb-2 text-blue-400"
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
              <span class="font-medium">Portal Corporativo</span>
            </a>
            <a
              href="#"
              class="bg-blue-800 hover:bg-blue-700 p-4 rounded-lg transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 mx-auto mb-2 text-blue-400"
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
              <span class="font-medium">Central de Ajuda</span>
            </a>
          </div>
        </div>

        <!-- Rodapé -->
        <div class="text-center text-gray-500 text-sm my-8">
          <p>© 2025 Gerador de Documentações - Todos os direitos reservados</p>
          <p class="mt-1">
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
import appBase from "../mixins/appBase";

export default {
  name: "Sobre",
  mixins: [appBase],
  components: {
    AppHeader,
    ThemeToggle,
    InfoButton,
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
  },
};
</script>

<style scoped>
@import "../assets/css/styles.css";
@import "../assets/css/colors.css";

/* Estilos adicionais específicos para esta página */
.main-card {
  @apply bg-blue-900 rounded-lg shadow px-4 py-6 transition-all duration-300;
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
</style>
