<template>
  <div>
    <!-- Toast notification -->
    <toast-notification
      :toasts="notificationService.toasts"
    ></toast-notification>

    <app-header
      title="Documentação de Desenvolvimento"
      @swap-requested="handleSwapRequested"
    >
      <template #swap-button>
        <swap-button
          target-url="/"
          target-type="tecnica"
          tooltip="Trocar para documentação Técnica"
          @swap-requested="handleSwapRequested"
        >
        </swap-button>
      </template>
      <template #actions>
        <upload-button
          tooltip-title="Importar dados de arquivo JSON"
          @check-data="checkForImportConfirmation"
          @json-loaded="processImportedJSON"
          @json-error="
            notificationService.show(
              'Erro ao processar o arquivo JSON. Verifique o formato.',
              'error'
            )
          "
          ref="uploadButton"
        ></upload-button>
        <theme-toggle :is-dark="isDark" @toggle="toggleTheme"></theme-toggle>
        <info-button
          tooltip-title="Este sistema gera um arquivo .zip com documentos de desenvolvimento:"
          :tooltip-items="[
            'Estimativa de Esforço e Cronograma',
            'Estratégia de Solução',
            'Relatório de Acompanhamento de Projeto',
          ]"
        ></info-button>
      </template>
    </app-header>

    <div class="container">
      <div class="main-card">
        <basic-form-section
          ref="basicFormSection"
          :form-data="formData"
          :selected-autores="selectedAutores"
          :autor-input="autorInput"
          :show-suggestions="showSuggestions"
          :filtered-autores="filteredAutores"
          :highlighted-index="highlightedIndex"
          @update:numero-ss="formData.numeroSS = $event"
          @format-ss="formatSS"
          @update:autor-input="handleAutorInputUpdate"
          @show-suggestions="toggleSuggestions"
          @navigate-list="navigateList($event)"
          @highlight-index="highlightedIndex = $event"
          @handle-backspace="handleBackspace"
          @select-autor="selectAutor($event)"
          @remove-autor="removeAutor($event)"
        ></basic-form-section>

        <!-- Seção de Requisitos com abas -->
        <div class="base-section mb-4">
          <!-- Cabeçalho da seção -->
          <h2 class="base-title mb-4">Gerenciar Requisitos</h2>

          <!-- Navegação das abas -->
          <div class="modal-tabs">
            <button
              v-for="(tab, index) in requisitosTabs"
              :key="index"
              @click="requisitosTabAtiva = index"
              class="modal-tab"
              :class="{ active: requisitosTabAtiva === index }"
            >
              {{ tab.nome }}
            </button>
          </div>

          <!-- Aba 1: Requisitos Funcionais -->
          <div v-if="requisitosTabAtiva === 0">
            <!-- Botão centralizado -->
            <div
              v-if="requisitos.length === 0"
              class="flex justify-center mb-4"
            >
              <div class="w-auto max-w-xs">
                <button
                  @click="abrirModalRequisito"
                  type="button"
                  class="btn btn-requirements rf-0"
                  id="btnAddRequisito"
                  ref="btnAddRequisito"
                >
                  Adicionar Requisito Funcional
                </button>
              </div>
            </div>

            <div v-if="requisitos.length > 0" class="base-section">
              <h3
                class="text-lg font-medium mb-3 text-gray-700 dark:text-white"
              >
                Lista de Requisitos Funcionais
              </h3>
              <!-- Tabela de requisitos (exibida apenas se houver itens) -->
              <data-table
                :items="requisitos"
                :columns="[
                  {
                    key: 'id',
                    label: '#',
                    width: 'w-2/12',
                    align: 'text-center',
                    type: 'text',
                  },
                  {
                    key: 'tituloRF',
                    label: 'Título',
                    width: 'w-3/12',
                    align: 'text-left',
                    type: 'text',
                  },
                  {
                    key: 'local',
                    label: 'Local',
                    width: 'w-3/12',
                    align: 'text-left',
                    type: 'text',
                  },
                  {
                    key: 'tipo',
                    label: 'Tipo',
                    width: 'w-2/12',
                    align: 'text-center',
                    type: 'text',
                  },
                  {
                    key: 'actions',
                    label: 'Ações',
                    width: 'w-2/12',
                    align: 'text-center',
                    type: 'buttons',
                    actions: {
                      view: true,
                      edit: true,
                      duplicate: true,
                      delete: true,
                    },
                  },
                ]"
                :action-button="{
                  show: true,
                  text: 'Adicionar Requisito Funcional',
                }"
                :initial-per-page="10"
                @action-click="abrirModalRequisito"
                :key-function="(requisito) => requisito.id"
                drag-ref="dragArea"
                :draggable="true"
                :enable-truncation="true"
                :non-truncated-columns="['actions']"
                @view="visualizarRequisito"
                @duplicate="duplicarRequisito"
                @edit="editarRequisito"
                @delete="removerRequisito"
                @reorder="reordenarRequisitos"
              >
              </data-table>
            </div>
          </div>

          <!-- Aba 2: Requisitos Não Funcionais -->
          <div v-if="requisitosTabAtiva === 1">
            <div class="flex flex-col sm:flex-row gap-4">
              <!-- Campo Título -->
              <div class="form-group w-full sm:w-2/6 mb-0">
                <label for="tituloRNF" class="form-label mb-1"> Título </label>
                <input
                  type="text"
                  id="tituloRNF"
                  v-model="requisitosNaoFuncionais.titulo"
                  class="form-input"
                  placeholder="Título do Requisito Não Funcional"
                />
              </div>

              <!-- Campo Descrição -->
              <div class="form-group w-full sm:w-3/6 mb-0">
                <label for="descricaoRNF" class="form-label mb-1">
                  Descrição
                </label>
                <input
                  type="text"
                  id="descricaoRNF"
                  v-model="requisitosNaoFuncionais.descricao"
                  class="form-input"
                  placeholder="Descrição do Requisito Não Funcional"
                  @keydown.enter.prevent="adicionarRequisitoNaoFuncional"
                />
              </div>

              <!-- Botão Adicionar -->
              <div
                class="w-full sm:w-1/6 justify-center sm:justify-end items-end"
              >
                <label for="botaoRNF" class="form-label">&nbsp;</label>
                <button
                  type="button"
                  class="btn btn-requirements"
                  :class="editIndexRNF !== -1 ? 'btn-update' : 'btn-primary'"
                  @click="adicionarRequisitoNaoFuncional"
                >
                  {{ editIndexRNF !== -1 ? "Atualizar" : "Adicionar" }}
                </button>
              </div>
            </div>

            <!-- Tabela de Requisitos Não Funcionais -->
            <div
              v-if="listaRequisitosNaoFuncionais.length > 0"
              class="base-section"
            >
              <h3
                class="text-lg font-medium mb-3 text-gray-700 dark:text-white"
              >
                Lista de Requisitos Não Funcionais
              </h3>
              <data-table
                :items="listaRequisitosNaoFuncionais"
                :columns="[
                  {
                    key: 'id',
                    label: '#',
                    width: 'w-1/12',
                    align: 'text-center',
                    type: 'text',
                  },
                  {
                    key: 'titulo',
                    label: 'Título',
                    width: 'w-3/12',
                    align: 'text-left',
                    type: 'text',
                  },
                  {
                    key: 'descricao',
                    label: 'Descrição',
                    width: 'w-5/12',
                    align: 'text-left',
                    type: 'text',
                  },
                  {
                    key: 'actions',
                    label: 'Ações',
                    width: 'w-1/12',
                    align: 'text-center',
                    type: 'buttons',
                    actions: { edit: true, delete: true },
                  },
                ]"
                :key-function="(requisito) => requisito.id"
                :enable-truncation="true"
                :draggable="true"
                drag-ref="rnfDragArea"
                @edit="editarRequisitoNaoFuncional"
                @delete="removerRequisitoNaoFuncional"
                @reorder="reordenarRequisitosNaoFuncionais"
              >
              </data-table>
            </div>
          </div>
        </div>

        <!-- Seção de Pontos de Função -->
        <div class="base-section mb-4">
          <div class="flex items-center justify-center gap-4 mb-1">
            <h3 class="text-base font-medium">Total de Pontos de Função</h3>
            <input
              id="totalPontosFuncao"
              type="text"
              inputmode="decimal"
              v-model="totalPontosFuncaoFormatado"
              @input="formatarNumeroDecimal"
              class="form-input pontos-funcao-input"
              placeholder="0,00"
            />
          </div>
        </div>

        <!-- Seção de formatos e botão Gerar Documentos -->
        <form-submit-section
          :formatos="formData"
          :is-loading="isLoading"
          :is-formato-valido="formData.gerarDocx || formData.gerarPdf"
          button-text="Gerar Documento"
          loading-text="Processando..."
          @submit="gerarDocumento"
          @update:docx="formData.gerarDocx = $event"
          @update:pdf="formData.gerarPdf = $event"
        ></form-submit-section>
      </div>
    </div>

    <!-- Modal de Requisito Funcional com Abas -->
    <modal-requisito
      ref="modalRequisito"
      :show="showModal"
      :titulo="modalTitulo"
      :requisito="requisitoAtual"
      :modo-visualizacao="modoVisualizacao"
      :total-requisitos="requisitos.length"
      @fechar="fecharModalRequisito"
      @add-requisito="adicionarRequisito"
      @update-requisito="atualizarRequisito"
      @upload-imagem="handleFileUpload"
      @remover-imagem="removerImagem"
    ></modal-requisito>

    <!-- Modal de Mensagem para confirmação -->
    <modal-message
      :show="showMessageModal"
      :titulo="messageTitle"
      :mensagem="messageContent"
      :tipo="messageType"
      :texto-botao-confirmar="messageConfirmButtonText"
      :texto-botao-cancelar="'Cancelar'"
      :show-cancel-button="true"
      :fechar-ao-clicar-fora="false"
      @confirmar="confirmarModalMensagem"
      @cancelar="cancelarModalMensagem"
    ></modal-message>
  </div>
</template>

<script>
import ToastNotification from "../components/ToastNotification.vue";
import AppHeader from "../components/AppHeader.vue";
import SwapButton from "../components/SwapButton.vue";
import ThemeToggle from "../components/ThemeToggle.vue";
import InfoButton from "../components/InfoButton.vue";
import UploadButton from "../components/UploadButton.vue";
import BasicFormSection from "../components/BasicFormSection.vue";
import DataTable from "../components/DataTable.vue";
import FormSubmitSection from "../components/FormSubmitSection.vue";
import ModalRequisito from "../components/ModalRequisito.vue";
import RichTextEditor from "../components/RichTextEditor.vue";
import ModalMessage from "../components/ModalMessage.vue";
import appBase from "../mixins/appBase";
import Sortable from "sortablejs";

// Importe ou implemente os métodos e dados do seu app-base.js e app-tec.js

export default {
  name: "DocumentacaoDesenvolvimento",
  mixins: [appBase],
  components: {
    ToastNotification,
    AppHeader,
    SwapButton,
    ThemeToggle,
    InfoButton,
    UploadButton,
    BasicFormSection,
    DataTable,
    FormSubmitSection,
    ModalMessage,
    ModalRequisito,
    RichTextEditor,
  },
  data() {
    // Dados específicos deste app
    return {
      modoVisualizacao: false,
      sortableInstance: null,
      showModal: false, // Garantir que o modal começa fechado
      modalTitulo: "Adicionar Requisito Funcional",
      editIndex: -1,
      requisitos: [],
      requisitoAtual: {
        id: "",
        tituloRF: "",
        tipo: "",
        local: "",
        usuario: "",
        perfil: "",
        descricao: "",
        validacoes: "",
        regras: "",
        banco: "",
        imagens: [],
      },
      requisitosTabAtiva: 0,
      requisitosTabs: [
        { nome: "Requisitos Funcionais" },
        { nome: "Requisitos Não Funcionais" },
      ],
      editIndexRNF: -1,
      requisitosNaoFuncionais: {
        titulo: "",
        descricao: "",
      },
      totalPontosFuncao: 0,
      totalPontosFuncaoFormatado: "",
      listaRequisitosNaoFuncionais: [],
      dataCriacao: null,
      dataModificacao: null,
      iniciaisAutorCriacao: null,
      iniciaisAutorModificacao: null,
    };
  },
  computed: {
    // Computadas específicas deste app
  },

  watch: {
    atividades: {
      handler(newVal, oldVal) {
        if (newVal.length !== oldVal?.length) {
          this.$nextTick(() => {
            this.initSortable();
          });
        }
      },
      deep: true,
    },

    selectedAutores: {
      handler(newVal) {
        if (newVal.length === 0) {
          this.aplicarErroTemporarioAutores();
        } else {
          this.resetAutorFieldError();
        }
      },
      immediate: true,
    },
  },

  created() {
    // Inicializa o último formato como DOCX já que é o padrão
    this.lastFormat = "gerarDocx";
  },

  mounted() {
    // Inicialização específica deste app
    this.initSortable();
    this.$nextTick(() => {
      this.initQuill();
    });
  },

  beforeUnmount() {
    this.destroySortable();
  },

  methods: {
    initQuill() {
      // Verificar se o elemento existe no DOM antes de inicializar
      const element = document.getElementById(this.containerId);
      if (!element) return;

      // Configuração dos módulos e opções do Quill
      const toolbarOptions = [
        ["bold", "italic", "underline"], // botões para formatação de texto
        [{ color: [] }], // cor da fonte
        ["code"], // código
        [{ list: "ordered" }, { list: "bullet" }], // listas
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ align: [] }], // alinhamento
        ["clean"], // limpar formatação
      ];

      // Criar o editor Quill
      this.editor = new Quill(`#${this.containerId}`, {
        modules: {
          toolbar: toolbarOptions,
        },
        theme: "snow",
        placeholder: this.placeholder,
        readOnly: this.isReadOnly,
      });

      // Inicializar o conteúdo
      if (this.value) {
        this.editor.root.innerHTML = this.value;
      }

      // Eventos
      this.editor.on("text-change", () => {
        this.content = this.editor.root.innerHTML;
        this.$emit("input", this.content);
        this.$emit("change", this.content);
      });
    },

    // Métodos específicos deste app
    initSortable() {
      return new Promise((resolve) => {
        this.$nextTick(() => {
          if (this.isDestroying) {
            resolve();
            return;
          }

          const tbody = this.$refs.dragArea?.getElementsByTagName("tbody")[0];
          if (!tbody) {
            resolve();
            return;
          }

          // Tenta destruir instância existente
          this.destroySortable().then(() => {
            try {
              this.sortableInstance = Sortable.create(tbody, {
                animation: 150,
                handle: ".cursor-move",
                ghostClass: "sortable-ghost",
                chosenClass: "sortable-chosen",
                dragClass: "sortable-drag",
                forceFallback: true,
                fallbackClass: "sortable-fallback",
                onEnd: (evt) => {
                  if (evt.oldIndex !== evt.newIndex) {
                    // Usar o método reordenarAtividades para garantir consistência
                    this.reordenarAtividades({
                      oldIndex: evt.oldIndex,
                      newIndex: evt.newIndex,
                    });
                  }
                },
              });
              resolve();
            } catch (error) {
              console.error("Erro ao criar Sortable:", error);
              this.sortableInstance = null;
              resolve();
            }
          });
        });
      });
    },

    destroySortable() {
      return new Promise((resolve) => {
        if (!this.sortableInstance) {
          resolve();
          return;
        }

        try {
          this.isDestroying = true;

          if (typeof this.sortableInstance.destroy === "function") {
            this.sortableInstance.destroy();
          }
        } catch (error) {
          console.warn("Aviso ao destruir Sortable:", error);
        } finally {
          this.sortableInstance = null;
          this.isDestroying = false;
          resolve();
        }
      });
    },

    resetFieldErrors() {
      const inputs = document.querySelectorAll(".campo-erro");
      inputs.forEach((input) => input.classList.remove("campo-erro"));
    },

    formatarNumeroDecimal(event) {
      // Remove qualquer caractere que não seja número ou vírgula
      let valor = event.target.value.replace(/[^\d,]/g, "");

      // Garante que haja apenas uma vírgula
      const partes = valor.split(",");
      if (partes.length > 2) {
        valor = partes[0] + "," + partes.slice(1).join("");
      }

      // Limita a duas casas decimais
      if (partes.length > 1 && partes[1].length > 2) {
        valor = partes[0] + "," + partes[1].substring(0, 2);
      }

      // Atualiza o valor formatado
      this.totalPontosFuncaoFormatado = valor;

      // Converte para número e armazena
      const numeroDecimal = parseFloat(valor.replace(",", ".")) || 0;
      this.totalPontosFuncao = numeroDecimal;
    },

    duplicarRequisito(index) {
      // Cria uma cópia profunda do requisito selecionado
      const requisitoDuplicado = JSON.parse(
        JSON.stringify(this.requisitos[index])
      );

      // Gera um novo ID para o requisito duplicado
      const novoId = `RF-${String(this.requisitos.length + 1).padStart(
        2,
        "0"
      )}`;
      requisitoDuplicado.id = novoId;

      // Modifica o título para indicar que é uma cópia
      requisitoDuplicado.tituloRF = `(Cópia) ${requisitoDuplicado.tituloRF}`;

      // Adiciona o requisito duplicado ao final da lista
      this.requisitos.push(requisitoDuplicado);

      // Notifica o usuário
      this.notificationService.show(
        `Requisito ${requisitoDuplicado.id} duplicado com sucesso!`,
        "success"
      );
    },

    adicionarRequisitoNaoFuncional() {
      // Validar se os campos estão preenchidos
      if (
        !this.requisitosNaoFuncionais.titulo ||
        !this.requisitosNaoFuncionais.descricao
      ) {
        // Exibir mensagem de erro ou destacar campos obrigatórios
        return;
      }

      // Criar um novo ID sequencial (RNF-XX)
      const novoId = `RNF-${String(
        this.listaRequisitosNaoFuncionais.length + 1
      ).padStart(2, "0")}`;

      // Adicionar o novo requisito à lista
      this.listaRequisitosNaoFuncionais.push({
        id: novoId,
        titulo: this.requisitosNaoFuncionais.titulo,
        descricao: this.requisitosNaoFuncionais.descricao,
      });

      // Limpar o formulário
      this.requisitosNaoFuncionais.titulo = "";
      this.requisitosNaoFuncionais.descricao = "";
    },

    reordenarRequisitosNaoFuncionais({ oldIndex, newIndex }) {
      console.log(`Reordenando RNF de ${oldIndex} para ${newIndex}`);

      // Faz uma cópia profunda da lista para garantir que todos os objetos
      // e suas propriedades sejam copiados sem referências
      const listaAtualizada = JSON.parse(
        JSON.stringify(this.listaRequisitosNaoFuncionais)
      );

      // Remove o item do índice antigo e o insere no novo índice
      const [itemRemovido] = listaAtualizada.splice(oldIndex, 1);
      listaAtualizada.splice(newIndex, 0, itemRemovido);

      // Atualiza a lista principal com a nova ordem
      this.listaRequisitosNaoFuncionais = [...listaAtualizada];

      // Atualiza os IDs sequenciais
      this.$nextTick(() => {
        // Agora atualize os IDs
        for (let i = 0; i < this.listaRequisitosNaoFuncionais.length; i++) {
          this.listaRequisitosNaoFuncionais[i].id = `RNF-${String(
            i + 1
          ).padStart(2, "0")}`;
        }

        // Forçar novamente a renderização após a atualização dos IDs
        this.listaRequisitosNaoFuncionais = [
          ...this.listaRequisitosNaoFuncionais,
        ];

        console.log(
          "RNFs reordenados e IDs atualizados:",
          this.listaRequisitosNaoFuncionais
            .map((req) => `${req.id} - ${req.titulo}`)
            .join(", ")
        );
      });
    },

    // Função para reordenar requisitos e atualizar os IDs sequenciais
    reordenarRequisitos({ oldIndex, newIndex }) {
      console.log(`Reordenando de ${oldIndex} para ${newIndex}`);

      // Faz uma cópia profunda dos requisitos para garantir que todos os objetos
      // e suas propriedades sejam copiados sem referências
      const requisitosAtualizados = JSON.parse(JSON.stringify(this.requisitos));

      // Remove o item do índice antigo e o insere no novo índice
      const [itemRemovido] = requisitosAtualizados.splice(oldIndex, 1);
      requisitosAtualizados.splice(newIndex, 0, itemRemovido);

      // Primeiramente, atualize o array principal com a nova ordem
      // mas sem alterar os IDs ainda
      this.requisitos = [...requisitosAtualizados];

      // Aguarde a próxima atualização do DOM
      this.$nextTick(() => {
        // Agora atualize os IDs
        for (let i = 0; i < this.requisitos.length; i++) {
          this.requisitos[i].id = `RF-${String(i + 1).padStart(2, "0")}`;
        }

        // Forçar novamente a renderização após a atualização dos IDs
        this.requisitos = [...this.requisitos];

        console.log(
          "Requisitos reordenados e IDs atualizados:",
          this.requisitos.map((req) => `${req.id} - ${req.tituloRF}`).join(", ")
        );
      });
    },

    // Função para atualizar os IDs sequencialmente
    atualizarIdsRequisitos(listaRequisitos = null) {
      // Se não for passada uma lista, usa a lista atual
      const lista = listaRequisitos || this.requisitos;

      // Atualiza cada ID sequencialmente
      for (let i = 0; i < lista.length; i++) {
        lista[i].id = `RF-${String(i + 1).padStart(2, "0")}`;
      }

      return lista;
    },

    // Gerenciamento de requisitos
    visualizarRequisito(index) {
      this.modalTitulo = "Visualizar Requisito Funcional";
      this.editIndex = -1; // Não estamos editando
      this.modoVisualizacao = true; // Ativar modo de visualização

      // Clonar o requisito para visualização
      this.requisitoAtual = JSON.parse(JSON.stringify(this.requisitos[index]));
      this.showModal = true;

      // Adicionar classe para prevenir rolagem do body
      document.body.classList.add("modal-open");
    },

    // Modificar o método existente
    fecharModalRequisito() {
      this.showModal = false;
      this.modoVisualizacao = false; // Resetar o modo de visualização
      // Remover classe para permitir rolagem do body novamente
      document.body.classList.remove("modal-open");
    },

    // Modificar o método de abrir modal para garantir que não estamos em modo visualização
    abrirModalRequisito() {
      this.modalTitulo = "Adicionar Requisito Funcional";
      this.editIndex = -1;
      this.modoVisualizacao = false; // Garantir que não estamos em modo visualização
      this.requisitoAtual = {
        id: "",
        tituloRF: "",
        tipo: "",
        local: "",
        usuario: "",
        perfil: "",
        descricao: "",
        validacoes: "",
        regras: "",
        banco: "",
        imagens: [],
      };
      this.showModal = true;
      // Adicionar classe para prevenir rolagem do body
      document.body.classList.add("modal-open");
    },

    // Também precisamos modificar o método de edição
    editarRequisito(index) {
      this.modalTitulo = "Editar Requisito Funcional";
      this.editIndex = index;
      this.modoVisualizacao = false; // Garantir que não estamos em modo visualização
      // Clonar o requisito para evitar edição direta
      this.requisitoAtual = JSON.parse(JSON.stringify(this.requisitos[index]));
      this.showModal = true;
      // Adicionar classe para prevenir rolagem do body
      document.body.classList.add("modal-open");
    },

    // Método para atualizar o conteúdo do editor rico da descrição
    updateDescricaoContent(content) {
      this.requisitoAtual.descricao = content;
    },

    // Novos métodos que são chamados pelos eventos emitidos do modal
    adicionarRequisito(requisito) {
      this.requisitos.push(requisito);
      this.fecharModalRequisito();
    },

    atualizarRequisito(index, requisito) {
      if (index >= 0 && index < this.requisitos.length) {
        this.requisitos[index] = requisito;
      }
      this.fecharModalRequisito();
    },

    // Método para remover requisito usando o ModalMessage do tipo caution
    removerRequisito(index) {
      const requisitoTitulo = this.requisitos[index].tituloRF;
      const requisitoId = this.requisitos[index].id;

      this.mostrarModalMensagem(
        `Remover o ${requisitoId}`,
        `Tem certeza que deseja remover o requisito: "${requisitoTitulo}"?`,
        () => {
          // Esta função será executada quando o usuário confirmar
          this.requisitos.splice(index, 1);
          // Atualizar os IDs dos requisitos restantes
          this.atualizarIdsRequisitos();
        }
      );
    },

    // Gerenciamento de imagens
    handleFileUpload(event) {
      const files = event.target.files;
      if (!files.length) return;

      // Inicializar array de imagens se não existir
      if (!this.requisitoAtual.imagens) {
        this.requisitoAtual.imagens = [];
      }

      // Converter cada arquivo para base64
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.requisitoAtual.imagens.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      // Limpar input para permitir selecionar os mesmos arquivos novamente
      event.target.value = "";
    },

    removerImagem(index) {
      this.requisitoAtual.imagens.splice(index, 1);
    },

    editarRequisitoNaoFuncional(index) {
      this.editIndexRNF = index;
      // Preenche o formulário com os dados do requisito selecionado
      this.requisitosNaoFuncionais.titulo =
        this.listaRequisitosNaoFuncionais[index].titulo;
      this.requisitosNaoFuncionais.descricao =
        this.listaRequisitosNaoFuncionais[index].descricao;
    },

    // Método para atualizar a função adicionarRequisitoNaoFuncional para lidar com edição
    adicionarRequisitoNaoFuncional() {
      // Validar se os campos estão preenchidos
      if (
        !this.requisitosNaoFuncionais.titulo ||
        !this.requisitosNaoFuncionais.descricao
      ) {
        // Exibir mensagem de erro ou destacar campos obrigatórios
        this.notificationService.show(
          "Preencha o título e a descrição do requisito não funcional",
          "error"
        );
        return;
      }

      // Verifica se estamos editando ou adicionando
      if (this.editIndexRNF >= 0) {
        // Atualizar o requisito existente
        this.listaRequisitosNaoFuncionais[this.editIndexRNF] = {
          id: this.listaRequisitosNaoFuncionais[this.editIndexRNF].id,
          titulo: this.requisitosNaoFuncionais.titulo,
          descricao: this.requisitosNaoFuncionais.descricao,
        };

        // Resetar o modo de edição
        this.editIndexRNF = -1;
        this.notificationService.show(
          "Requisito não funcional atualizado",
          "success"
        );
      } else {
        // Criar um novo ID sequencial (RNF-XX)
        const novoId = `RNF-${String(
          this.listaRequisitosNaoFuncionais.length + 1
        ).padStart(2, "0")}`;

        // Adicionar o novo requisito à lista
        this.listaRequisitosNaoFuncionais.push({
          id: novoId,
          titulo: this.requisitosNaoFuncionais.titulo,
          descricao: this.requisitosNaoFuncionais.descricao,
        });

        this.notificationService.show(
          "Requisito não funcional adicionado",
          "success"
        );
      }

      // Limpar o formulário
      this.requisitosNaoFuncionais.titulo = "";
      this.requisitosNaoFuncionais.descricao = "";
    },

    // Método para remover um requisito não funcional com confirmação
    removerRequisitoNaoFuncional(index) {
      const requisito = this.listaRequisitosNaoFuncionais[index];

      // Mostrar modal de confirmação
      this.mostrarModalMensagem(
        `Remover o ${requisito.id}`,
        `Tem certeza que deseja remover o requisito não funcional: "${requisito.titulo}"?`,
        () => {
          // Esta função será executada quando o usuário confirmar
          this.listaRequisitosNaoFuncionais.splice(index, 1);

          // Atualizar os IDs dos requisitos restantes
          for (let i = 0; i < this.listaRequisitosNaoFuncionais.length; i++) {
            this.listaRequisitosNaoFuncionais[i].id = `RNF-${String(
              i + 1
            ).padStart(2, "0")}`;
          }

          // Se estiver editando este requisito, limpar o formulário
          if (this.editIndexRNF === index) {
            this.requisitosNaoFuncionais.titulo = "";
            this.requisitosNaoFuncionais.descricao = "";
            this.editIndexRNF = -1;
          } else if (this.editIndexRNF > index) {
            // Ajustar o índice de edição se o item removido estiver antes do editado
            this.editIndexRNF--;
          }

          this.notificationService.show(
            "Requisito não funcional removido",
            "success"
          );
        }
      );
    },

    // Método para geração de documento
    async gerarDocumento() {
      if (this.isLoading) return;

      // Verifica se pelo menos um formato adicional está selecionado
      const formatosAdicionais =
        this.formData.gerarDocx || this.formData.gerarPdf;

      // Se temos apenas JSON, não fazemos validações e prosseguimos direto
      if (!formatosAdicionais) {
        this.enviarFormularioParaJSON();
        return;
      }

      // Reset any previous error states
      this.resetFieldErrors();

      // Executa validações dos campos
      if (!this.validarCamposObrigatorios()) {
        return;
      }

      // Validação de requisitos funcionais
      if (this.requisitos.length === 0) {
        // Destaca o botão de adicionar requisito funcional
        const btnAddRequisito = this.$refs.btnAddRequisito;
        if (btnAddRequisito) {
          // Adiciona classe de erro ao botão
          btnAddRequisito.classList.add("btn-erro");
          // Foca no botão
          btnAddRequisito.focus();
          // Remove a classe após um tempo
          setTimeout(() => {
            btnAddRequisito.classList.remove("btn-erro");
          }, 3000);
        }
        this.notificationService.show(
          "Adicione pelo menos um requisito funcional",
          "error"
        );
        return;
      }

      // Exibe mensagem de sucesso nas validações
      this.notificationService.show(
        "Validação bem-sucedida! Gerando documentos...",
        "success"
      );

      // Chama a função para enviar o formulário completo
      this.enviarFormularioCompleto();
    },

    // Método para enviar o formulário completo
    enviarFormularioCompleto() {
      this.isLoading = true;

      try {
        // Prepara o FormData para envio, especificando o tipo como desenvolvimento
        const formData = this.prepareFormData(false, "desenvolvimento");

        if (this.dataCriacao) {
          formData.append("dataCriacao", this.dataCriacao);
        }

        if (this.iniciaisAutorCriacao) {
          formData.append("iniciaisAutorCriacao", this.iniciaisAutorCriacao);
        }

        if (this.dataModificacao) {
          formData.append("dataModificacao", this.dataModificacao);
        }

        if (this.iniciaisAutorModificacao) {
          formData.append(
            "iniciaisAutorModificacao",
            this.iniciaisAutorModificacao
          );
        }

        // Adiciona requisitos funcionais
        formData.append("requisitos", JSON.stringify(this.requisitos));

        // Adiciona requisitos não funcionais
        formData.append(
          "requisitosNaoFuncionais",
          JSON.stringify(this.listaRequisitosNaoFuncionais)
        );

        // Adiciona total de pontos de função
        formData.append("totalPontosFuncao", this.totalPontosFuncao.toString());

        // Notifica o usuário que estamos processando
        this.notificationService.show("Gerando documentos...", "info");

        // Envia a requisição
        fetch("/gerar_documentos", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => {
                throw new Error(data.error || "Erro ao gerar documento");
              });
            }

            // Verifica o tipo de conteúdo da resposta
            const contentType = response.headers.get("Content-Type");
            if (contentType && contentType.includes("application/zip")) {
              return response.blob().then((blob) => {
                // Criar URL do blob e link para download
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.style.display = "none";
                a.href = url;

                // Extrair nome do arquivo
                const contentDisposition = response.headers.get(
                  "Content-Disposition"
                );
                let filename = "documentos.zip";
                if (contentDisposition) {
                  const filenameMatch =
                    contentDisposition.match(/filename="(.+)"/);
                  if (filenameMatch && filenameMatch[1]) {
                    filename = filenameMatch[1];
                  }
                }

                a.download = filename;
                document.body.appendChild(a);

                // Usar setTimeout para garantir que o download será iniciado
                setTimeout(() => {
                  a.click();
                  // Remover depois de um momento para liberar recursos
                  setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  }, 200);
                }, 100);

                // Exibir mensagem de sucesso
                this.notificationService.show(
                  "Documento gerado com sucesso!",
                  "success"
                );
                return { success: true };
              });
            } else {
              // Se não for um ZIP, tenta processar como JSON
              return response.json();
            }
          })
          .then((data) => {
            if (data && data.success === true) {
              // Já exibimos a mensagem de sucesso ao processar o blob
              return;
            }

            if (data && data.message) {
              this.notificationService.show(data.message, "success");
            }
          })
          .catch((error) => {
            console.error("Erro:", error);
            this.notificationService.show(
              error.message || "Erro ao gerar documento",
              "error"
            );
          })
          .finally(() => {
            this.isLoading = false;
          });
      } catch (error) {
        console.error("Erro:", error);
        this.notificationService.show(
          error.message || "Erro ao gerar documento",
          "error"
        );
        this.isLoading = false;
      }
    },

    // Método para enviar o formulário apenas como JSON
    enviarFormularioParaJSON() {
      this.isLoading = true;
      try {
        // Prepara o FormData para envio, especificando o tipo como desenvolvimento
        const formData = this.prepareFormData(true, "desenvolvimento");

        // Enviar os requisitos mesmo vazios
        formData.append("requisitos", JSON.stringify(this.requisitos || []));

        // Adiciona requisitos não funcionais (específico de desenvolvimento)
        formData.append(
          "requisitosNaoFuncionais",
          JSON.stringify(this.listaRequisitosNaoFuncionais || [])
        );

        // Adiciona total de pontos de função (específico de desenvolvimento)
        formData.append("totalPontosFuncao", this.totalPontosFuncao.toString());

        // Notifica o usuário que estamos processando
        this.notificationService.show("Gerando JSON...", "info");

        // Enviar requisição simplificada para o backend
        fetch("/gerar_documentos", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => {
                throw new Error(data.error || "Erro ao gerar JSON");
              });
            }
            return response.blob();
          })
          .then((blob) => {
            // Criar URL do blob e link para download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.style.display = "none";
            a.href = url;

            // Determinar nome do arquivo
            const filename = `SS ${this.formData.numeroSS.padStart(3, "0")}-${
              this.formData.anoSS
            }.json`;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            // Limpeza
            setTimeout(() => {
              window.URL.revokeObjectURL(url);
              document.body.removeChild(a);
              this.notificationService.show(
                "Arquivo JSON gerado com sucesso!",
                "success"
              );
            }, 100);
          })
          .catch((error) => {
            console.error("Erro:", error);
            this.notificationService.show(
              error.message || "Erro ao gerar JSON",
              "error"
            );
          })
          .finally(() => {
            this.isLoading = false;
          });
      } catch (error) {
        console.error("Erro:", error);
        this.notificationService.show(
          error.message || "Erro ao gerar JSON",
          "error"
        );
        this.isLoading = false;
      }
    },

    enviarFormularioCompleto() {
      this.isLoading = true;

      // Preparar dados para envio
      const formData = this.prepareFormData(false, "desenvolvimento");

      // Adicionar requisitos funcionais
      formData.append("requisitos", JSON.stringify(this.requisitos));

      // Adicionar requisitos não funcionais
      formData.append(
        "requisitosNaoFuncionais",
        JSON.stringify(this.listaRequisitosNaoFuncionais)
      );

      // Adicionar total de pontos de função
      formData.append("totalPontosFuncao", this.totalPontosFuncao.toString());

      // Enviar requisição para o backend
      fetch("/gerar_documentos", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.error || "Erro ao gerar documentação");
            });
          }

          // Se for um arquivo para download
          if (response.headers.get("Content-Type") === "application/zip") {
            return response.blob().then((blob) => {
              // Criar link para download
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = url;

              // Extrair nome do arquivo do cabeçalho Content-Disposition
              const contentDisposition = response.headers.get(
                "Content-Disposition"
              );
              let filename = "documentacao-dev.zip";

              if (contentDisposition) {
                const filenameMatch =
                  contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch && filenameMatch[1]) {
                  filename = filenameMatch[1];
                }
              }

              a.download = filename;
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);

              this.notificationService.show(
                "Documentação gerada com sucesso!",
                "success"
              );
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data && data.message) {
            this.notificationService.show(data.message, "success");
          }
        })
        .catch((error) => {
          this.notificationService.show(error.message, "error");
          console.error("Erro:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped>
/* Importe ou copie os estilos necessários */
@import "../assets/css/styles.css";
@import "../assets/css/colors.css";
/* ... */
</style>
