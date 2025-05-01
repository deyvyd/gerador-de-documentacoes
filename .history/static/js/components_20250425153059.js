const SwapButton = {
  props: {
    tooltip: {
      type: String,
      default: "Trocar para documentação de desenvolvimento",
    },
    targetUrl: {
      type: String,
      required: true,
    },
    targetType: {
      type: String,
      default: "desenvolvimento",
      validator: (value) => ["desenvolvimento", "tecnica"].includes(value),
    },
  },
  template: `
    <div class="swap-toggle" :class="'swap-toggle-' + targetType" style="display: flex; align-items: center; margin-left: 16px;">
      <a :href="targetUrl" class="swap-button">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="swap-icon" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="#b7d1ec"
          width="24"
          height="24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" 
          />
        </svg>
      </a>
      <div :class="['swap-tooltip', targetType === 'desenvolvimento' ? 'tooltip-desenvolvimento' : 'tooltip-tecnica']">
        <div :class="['tooltip-arrow', targetType === 'desenvolvimento' ? 'arrow-desenvolvimento' : 'arrow-tecnica']"></div>
        <div class="tooltip-content">
          <p class="tooltip-title">{{ tooltip }}</p>
        </div>
      </div>
    </div>
  `,
};

// Componente de toggle de tema
const ThemeToggle = {
  props: {
    isDark: {
      type: Boolean,
      required: true,
    },
  },
  template: `
    <button @click="toggleTheme" class="theme-toggle">
      <svg
        v-if="isDark"
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
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
      <svg
        v-else
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
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </button>
  `,
  methods: {
    toggleTheme() {
      // Emitir um evento para o componente pai
      this.$emit("toggle");
    },
  },
};

const UploadButton = {
  props: {
    tooltipTitle: {
      type: String,
      default: "Importar arquivo JSON",
    },
  },
  template: `
    <div class="upload-toggle">
      <input
        type="file"
        ref="fileInput"
        accept=".json"
        class="hidden"
        @change="handleFileUpload"
      />
      <button @click="openFileSelector" type="button">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="upload-icon" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" 
          />
        </svg>
      </button>
      <div class="upload-tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-content">
          <p class="tooltip-title">{{ tooltipTitle }}</p>
        </div>
      </div>
    </div>
  `,
  methods: {
    openFileSelector() {
      // Adiciona um método explícito para abrir o seletor de arquivos
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          this.$emit("json-loaded", data);
          // Limpar o input para permitir carregar o mesmo arquivo novamente
          this.$refs.fileInput.value = "";
        } catch (error) {
          console.error("Erro ao parsear o arquivo JSON:", error);
          this.$emit("json-error", error);
          this.$refs.fileInput.value = "";
        }
      };
      reader.readAsText(file);
    },
  },
};

// Componente InfoButton refeito usando o mesmo padrão do ThemeToggle
const InfoButton = {
  props: {
    tooltipTitle: {
      type: String,
      default: "Informações",
    },
    tooltipItems: {
      type: Array,
      default: () => [],
    },
  },
  template: `
    <button class="info-toggle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="info-icon"
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
      <div class="info-tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-content">
          <p class="tooltip-title">{{ tooltipTitle }}</p>
          <ul class="tooltip-list">
            <li v-for="(item, index) in tooltipItems" :key="index" class="tooltip-item">• {{ item }}</li>
          </ul>
        </div>
      </div>
    </button>
  `,
};

// Componente de Header
const AppHeader = {
  props: {
    title: {
      type: String,
      default: "Gerador de Documentações Técnicas",
    },
  },
  template: `
    <header class="app-header fixed top-0 left-0 right-0 z-50">
      <div class="container mx-auto px-4 py-3 flex items-center justify-between">
        <div class="flex items-center">
          <img 
            src="/static/dark-logo.png" 
            alt="Logo" 
            class="h-12 mr-4"
          />
          <h1 class="text-white text-xl font-bold">{{ title }}</h1>
          <slot name="swap-button"></slot>
        </div>
        <div class="flex items-center space-x-3">
          <slot name="actions"></slot>
        </div>
      </div>
    </header>
    <div class="header-spacer"></div>
  `,
};

const PageHeader = {
  props: {
    title: {
      type: String,
      required: true,
      default: "Gerador de Documentações",
    },
    icon: {
      type: String,
      default: "📝",
    },
  },
  template: `
    <div class="flex items-center justify-center gap-2 mb-6">
      <h1 class="title">
        {{ icon }} {{ title }}
      </h1>
    </div>
  `,
};

// Componente para seção de formulário básico da SS
const BasicFormSection = {
  props: {
    formData: {
      type: Object,
      required: true,
    },
    selectedAutores: {
      type: Array,
      required: true,
    },
    autorInput: {
      type: String,
      required: true,
    },
    showSuggestions: {
      type: Boolean,
      default: false,
    },
    filteredAutores: {
      type: Array,
      default: () => [],
    },
    highlightedIndex: {
      type: Number,
      default: 0,
    },
  },
  template: `
    <!-- Formulário principal -->
    <form>
      <!-- Seção de Informações básicas da SS -->
      <div class="activities-section mb-4">
        <h2 class="activities-title">Informações básicas da SS</h2>

        <!-- Primeira linha: Número SS, Ano SS e Título -->
        <div class="form-grid grid-7-7-86">
          <div class="form-group">
            <label class="form-label">
              Número 
              <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              v-model="formData.numeroSS"
              ref="numeroSS"
              maxlength="3"
              placeholder="000"
              @input="handleInput"
              @blur="formatSS"
              class="form-input text-center"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              Ano
              <span class="text-red-600">*</span>
            </label>
            <input
              type="number"
              v-model="formData.anoSS"
              class="form-input text-center"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              Título
              <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              v-model="formData.tituloSS"
              ref="tituloSS"
              class="form-input"
              placeholder="Título informado no e-mail de abertura da SS"
              required
            />
          </div>
        </div>

        <!-- Segunda linha: Descrição -->
        <div class="form-group">
          <label class="form-label">
            Descrição
            <span class="text-red-600">*</span>
          </label>
          <textarea
            v-model="formData.descricao"
            ref="descricao"
            class="form-input form-textarea"
            placeholder="Ações realizadas para atualização do (SISTEMA) para que (OBJETIVO)."
            rows="2"
            required
          ></textarea>
        </div>

        <!-- Terceira linha: Data Início, Data Fim e Link -->
        <div class="form-grid grid-18-18-64">
          <div class="form-group">
            <label class="form-label">
              Data de Início
              <span class="text-red-600">*</span>
            </label>
            <input
              ref="dataInicio"
              type="date"
              v-model="formData.dataInicio"
              class="form-input"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">
              Data de Fim
              <span class="text-red-600">*</span>
            </label>
            <input
              ref="dataFim"
              type="date"
              v-model="formData.dataFim"
              class="form-input"
              required
            />
          </div>
          <div class="form-group">
            <label class="form-label">Link do board</label>
            <input
              type="url"
              v-model="formData.linkBoard"
              placeholder="https://gitlab.com/chesf.gov.br/..."
              class="form-input"
            />
          </div>
        </div>
      </div>

      <!-- Quarta linha: Autor(es) -->
      <div class="form-group">
        <label class="form-label">
          Autor(es)
          <span class="text-red-600">*</span>
        </label>
        <div class="author-selector-container">
          <div class="author-input-area autor-container">
            <!-- Tags dos autores selecionados -->
            <span
              v-for="autor in selectedAutores"
              :key="autor.nome"
              class="author-tag"
            >
              {{ autor.nome }}
              <button
                @click.prevent="removeAutor(autor)"
                class="author-remove-btn"
              >
                ×
              </button>
            </span>
            <!-- Input para digitar -->
            <input
              type="text"
              v-model="inputValue"
              @input="updateAutorInput"
              @focus="handleInputFocus"
              @blur="handleAutorBlur"
              @keydown.down.prevent="$emit('navigate-list', 'down')"
              @keydown.up.prevent="$emit('navigate-list', 'up')"
              @keydown.enter.prevent="selectHighlighted"
              @keydown.backspace="handleBackspace"
              placeholder="Digite o nome do autor..."
              class="author-input-field"
              ref="autorInput"
            />
          </div>
          
          <!-- Lista de sugestões (mantive a referência às classes que criamos anteriormente) -->
          <div
            v-if="showSuggestions && filteredAutores.length > 0"
            class="suggestions-list"
          >
            <div
              v-for="(autor, index) in filteredAutores"
              :key="autor.nome"
              @mousedown="selectAutor(autor)"
              @mouseover="$emit('highlight-index', index)"
              :class="[
                'suggestion-item',
                highlightedIndex === index ? 'suggestion-item-highlighted' : ''
              ]"
            >
              {{ autor.nome }}
            </div>
          </div>
        </div>
      </div>
    </form>
  `,
  data() {
    return {
      inputValue: this.autorInput,
    };
  },
  watch: {
    autorInput(newVal) {
      this.inputValue = newVal;
    },
  },
  methods: {
    handleInput(event) {
      // Apenas permitir números e limitar a 3 caracteres
      let value = event.target.value.replace(/\D/g, "").slice(0, 3);
      this.$emit("update:numeroSS", value);
    },
    formatSS() {
      if (this.formData.numeroSS) {
        this.$emit("format-ss");
      }
    },
    updateAutorInput() {
      this.$emit("update:autorInput", this.inputValue);
    },
    handleAutorBlur(event) {
      // Pequeno delay para permitir o clique na sugestão
      setTimeout(() => {
        this.$emit("show-suggestions", false);
      }, 200);
    },
    handleBackspace(event) {
      // Se o input estiver vazio e houver autores selecionados
      if (this.inputValue === "") {
        this.$emit("handle-backspace");
      }
    },
    selectHighlighted() {
      if (
        this.filteredAutores.length &&
        this.filteredAutores[this.highlightedIndex]
      ) {
        this.selectAutor(this.filteredAutores[this.highlightedIndex]);
      }
    },
    selectAutor(autor) {
      this.$emit("select-autor", autor);
    },
    removeAutor(autor) {
      this.$emit("remove-autor", autor);
    },
  },
};

// Componente DataTable - Um componente de tabela configurável
const DataTable = {
  props: {
    // Dados que serão exibidos na tabela
    items: {
      type: Array,
      required: true,
    },
    // Configuração das colunas
    columns: {
      type: Array,
      required: true,
      // Cada coluna deve ter: key, label, width, align
      // Ex: [{ key: 'nome', label: 'Atividade', width: 'w-8/12', align: 'text-left' }]
    },
    // Classe de referência para dragdrop
    dragRef: {
      type: String,
      default: "dragArea",
    },
    // Habilitar drag and drop
    draggable: {
      type: Boolean,
      default: true,
    },
    // Função para gerar chave única para cada item
    keyFunction: {
      type: Function,
      default: (item, index) => `item-${index}`,
    },
    // Se deve mostrar rodapé
    showFooter: {
      type: Boolean,
      default: false,
    },
    // Items para o rodapé (array de objetos com label e valor)
    footerItems: {
      type: Array,
      default: () => [],
    },
    // NOVO: Habilitar truncamento de texto com tooltip em todas as colunas
    enableTruncation: {
      type: Boolean,
      default: true,
    },
    // NOVO: Colunas que devem ignorar o truncamento (array de keys)
    nonTruncatedColumns: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      sortableInstance: null,
    };
  },
  template: `
    <div v-if="items.length > 0" class="activities-table-container">
      <table class="activities-table" ref="tableRef">
        <thead>
          <tr>
            <th 
              v-for="col in columns" 
              :key="col.key" 
              :class="[col.width, col.align]"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody ref="tbodyRef" class="text-sm">
          <tr
            v-for="(item, index) in items"
            :key="keyFunction(item, index)"
            :class="{'cursor-move': draggable}"
          >
            <td 
              v-for="col in columns" 
              :key="col.key" 
              :class="[col.align === 'text-left' ? 'relative group' : col.align]"
            >
              <!-- Conteúdo da célula: text, buttons ou custom -->
              <div v-if="col.type === 'text'" :class="{'pl-2 py-2': col.align === 'text-left'}">
                <!-- NOVO: Aplicar truncamento com tooltip apenas para colunas de texto -->
                <div 
                  v-if="enableTruncation && !nonTruncatedColumns.includes(col.key)"
                  class="truncate-text-container" 
                  :title="getValueByPath(item, col.key)"
                >
                  <span class="truncate-text">{{ getValueByPath(item, col.key) }}</span>
                </div>
                <template v-else>
                  {{ getValueByPath(item, col.key) }}
                </template>
              </div>
              
              <div v-else-if="col.type === 'buttons'" class="text-center">
                <slot :name="'buttons-' + col.key" :item="item" :index="index">
                  <!-- Botão de Visualizar -->
                  <button
                    v-if="col.actions?.view"
                    @click="$emit('view', index)"
                    class="action-button view-button"
                    title="Visualizar"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </button>
                  <button
                    v-if="col.actions?.edit"
                    @click="$emit('edit', index)"
                    class="action-button edit-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
                      />
                      <path
                        d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
                      />
                    </svg>
                  </button>
                  <button
                    v-if="col.actions?.delete"
                    @click="$emit('delete', index)"
                    class="action-button delete-button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                  </button>
                </slot>
              </div>
              
              <div v-else>
                <slot :name="'col-' + col.key" :item="item" :index="index">
                  {{ getValueByPath(item, col.key) }}
                </slot>
              </div>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="showFooter">
          <tr>
            <td 
              v-for="(footerItem, index) in processedFooterItems" 
              :key="'footer-' + index"
              :colspan="footerItem.colspan || 1" 
              :class="footerItem.class || 'text-center font-medium'"
            >
              <span class="total-label">{{ footerItem.label }}: </span>
              <span class="total-value">{{ footerItem.value }}</span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  `,
  computed: {
    processedFooterItems() {
      // Distribui os itens do footer de acordo com a quantidade de colunas
      if (!this.footerItems || this.footerItems.length === 0) {
        return [];
      }

      const colCount = this.columns.length;
      const itemCount = this.footerItems.length;

      // Se temos mais colunas que itens de rodapé, ajustamos o colspan
      if (colCount > itemCount) {
        return this.footerItems.map((item, index) => {
          if (index === itemCount - 1) {
            // O último item ocupa todas as colunas restantes
            const remainingCols = colCount - (itemCount - 1);
            return { ...item, colspan: remainingCols };
          }
          return { ...item, colspan: 1 };
        });
      }

      // Caso contrário, distribuímos os itens nas colunas disponíveis
      return this.footerItems
        .map((item, index) => {
          if (index < colCount - 1) {
            return { ...item, colspan: 1 };
          } else if (index === colCount - 1) {
            return { ...item, colspan: itemCount - (colCount - 1) };
          }
          return null;
        })
        .filter(Boolean);
    },
  },
  methods: {
    getValueByPath(obj, path) {
      // Permite acessar propriedades aninhadas usando notação de ponto
      return path.split(".").reduce((prev, curr) => {
        return prev ? prev[curr] : null;
      }, obj);
    },

    initSortable() {
      // Verifica se o draggable está habilitado
      if (!this.draggable) return;

      // Limpa instância anterior se existir
      this.destroySortable();

      if (this.$refs.tbodyRef) {
        try {
          // Inicializa o Sortable diretamente no elemento tbody
          this.sortableInstance = Sortable.create(this.$refs.tbodyRef, {
            animation: 150,
            handle: ".cursor-move",
            ghostClass: "sortable-ghost",
            chosenClass: "sortable-chosen",
            dragClass: "sortable-drag",
            forceFallback: true,
            fallbackClass: "sortable-fallback",
            onEnd: (evt) => {
              if (evt.oldIndex !== evt.newIndex) {
                // Emite evento para o componente pai
                this.$emit("reorder", {
                  oldIndex: evt.oldIndex,
                  newIndex: evt.newIndex,
                });
              }
            },
          });
        } catch (error) {
          console.error("Erro ao inicializar Sortable:", error);
        }
      }
    },

    destroySortable() {
      if (
        this.sortableInstance &&
        typeof this.sortableInstance.destroy === "function"
      ) {
        this.sortableInstance.destroy();
        this.sortableInstance = null;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initSortable();
    });
  },
  updated() {
    this.$nextTick(() => {
      this.initSortable();
    });
  },
  beforeUnmount() {
    this.destroySortable();
  },
  watch: {
    items: {
      handler() {
        this.$nextTick(() => {
          this.initSortable();
        });
      },
      deep: true,
    },
    draggable(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          this.initSortable();
        });
      } else {
        this.destroySortable();
      }
    },
  },
};

// Definição do componente form-submit-section
const FormSubmitSection = {
  props: {
    formatos: Object,
    isLoading: Boolean,
    buttonText: {
      type: String,
      default: "Gerar Documento",
    },
    loadingText: {
      type: String,
      default: "Processando",
    },
  },
  computed: {
    // Propriedade computada para determinar dinamicamente o texto do botão
    dynamicButtonText() {
      // Se apenas JSON estiver selecionado (JSON é sempre true, mas os outros são false)
      if (!this.formatos.gerarDocx && !this.formatos.gerarPdf) {
        return "Baixar JSON";
      }
      // Caso contrário
      return "Gerar Documentos";
    },
  },
  template: `
    <div class="mt-6">
      <!-- Container flex para alinhar os elementos -->
      <div class="flex justify-center items-center gap-4">
        <!-- Seção de Formato dos arquivos -->
        <div class="format-section">
          <div class="flex items-center gap-4">
            <h3 class="format-title whitespace-nowrap">
              Formato dos arquivos
            </h3>
            <div class="flex gap-4">
              <!-- Opção JSON (sempre selecionada) -->
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  :checked="true"
                  disabled
                  class="checkbox-input"
                />
                <span class="checkbox-label">JSON</span>
              </label>
              <!-- DOCX -->
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  :checked="formatos.gerarDocx"
                  @change="updateDocx($event.target.checked)"
                  class="checkbox-input"
                />
                <span class="checkbox-label">DOCX</span>
              </label>
              <!-- PDF -->
              <label class="checkbox-container">
                <input
                  type="checkbox"
                  :checked="formatos.gerarPdf"
                  @change="updatePdf($event.target.checked)"
                  class="checkbox-input"
                />
                <span class="checkbox-label">PDF</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Botão com texto dinâmico e ícone de download -->
        <button
          @click="$emit('submit')"
          class="btn btn-primary w-64"
          :disabled="isLoading"
        >
          <template v-if="isLoading">
            <svg
              class="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{loadingText}}
          </template>
          <template v-else>
            <!-- Ícone de download -->
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
              />
            </svg>
            {{ dynamicButtonText }}
          </template>
        </button>
      </div>
    </div>
  `,
  methods: {
    updateDocx(checked) {
      // Emitir um evento para atualizar o valor no componente pai
      this.$emit("update:docx", checked);
    },
    updatePdf(checked) {
      // Emitir um evento para atualizar o valor no componente pai
      this.$emit("update:pdf", checked);
    },
  },
};

// Componente de notificação toast
const ToastNotification = {
  props: {
    toasts: {
      type: Array,
      required: true,
    },
  },
  template: `
    <div class="toast-container">
      <transition-group name="toast">
        <div v-for="toast in toasts" 
             :key="toast.id" 
             :class="['toast', toast.type]">
          {{ toast.message }}
        </div>
      </transition-group>
    </div>
  `,
};

// Exportar os componentes
window.AppComponents = {
  SwapButton,
  ThemeToggle,
  UploadButton,
  InfoButton,
  AppHeader,
  PageHeader,
  BasicFormSection,
  DataTable,
  FormSubmitSection,
  ToastNotification,
};
