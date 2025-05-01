<template>
  <template>
    <div>
      <!-- Header com filtro e controles -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3"
      >
        <!-- Campo de pesquisa -->
        <div class="relative w-full sm:w-auto mb-2 sm:mb-0">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Pesquisar..."
            class="form-input pr-8 w-full sm:w-64"
            @input="handleSearch"
          />
          <span class="absolute right-2 top-2 text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>

        <!-- Controles (botão e seletor) -->
        <div class="flex items-center space-x-3 w-full sm:w-auto">
          <!-- Botão customizável opcional -->
          <button
            v-if="actionButton.show"
            @click="$emit('action-click')"
            class="btn btn-primary"
          >
            {{ actionButton.text }}
          </button>

          <!-- Seletor de itens por página -->
          <div class="flex items-center">
            <label class="mr-2 text-sm font-medium">Mostrar:</label>
            <select
              v-model="perPage"
              class="form-input py-1 pr-8 pl-2"
              @change="handlePerPageChange"
            >
              <option
                v-for="option in perPageOptions"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Tabela (mantendo o código existente) -->
      <div v-if="paginatedItems.length > 0" class="base-table-container">
        <div class="overflow-x-auto"></div>
        <table class="base-table" ref="tableRef">
          <thead>
            <tr>
              <th
                v-for="col in columns"
                :key="col.key"
                :class="[col.width, col.align]"
                :style="{
                  textAlign:
                    col.align === 'text-center'
                      ? 'center'
                      : col.align === 'text-right'
                      ? 'right'
                      : 'left',
                }"
              >
                <div :class="col.align">{{ col.label }}</div>
              </th>
            </tr>
          </thead>
          <tbody ref="tbodyRef" class="text-sm">
            <tr
              v-for="(item, index) in paginatedItems"
              :key="keyFunction(item, index)"
              :class="{ 'cursor-move': draggable }"
            >
              <td
                v-for="col in columns"
                :key="col.key"
                :class="[
                  col.align === 'text-left' ? 'relative group' : col.align,
                ]"
              >
                <!-- Conteúdo da célula: text, buttons ou custom -->
                <!-- (mantém o código existente) -->
                <div
                  v-if="col.type === 'text'"
                  :class="{ 'pl-2 py-2': col.align === 'text-left' }"
                >
                  <div
                    v-if="
                      enableTruncation && !nonTruncatedColumns.includes(col.key)
                    "
                    class="truncate-text-container"
                    :title="getValueByPath(item, col.key)"
                  >
                    <span class="truncate-text">{{
                      getValueByPath(item, col.key)
                    }}</span>
                  </div>
                  <template v-else>
                    {{ getValueByPath(item, col.key) }}
                  </template>
                </div>

                <div v-else-if="col.type === 'buttons'" class="text-center">
                  <slot
                    :name="'buttons-' + col.key"
                    :item="item"
                    :index="getOriginalIndex(index)"
                  >
                    <!-- Botões (mantendo o código existente) -->
                    <button
                      v-if="col.actions?.view"
                      @click="$emit('view', getOriginalIndex(index))"
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
                        <path
                          d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                        ></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                    <!-- Outros botões (mantendo o código existente) -->
                  </slot>
                </div>

                <div v-else>
                  <slot
                    :name="'col-' + col.key"
                    :item="item"
                    :index="getOriginalIndex(index)"
                  >
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

      <!-- Informação e paginação -->
      <div
        class="flex flex-col sm:flex-row justify-between items-center mt-3 text-sm"
      >
        <!-- Texto informativo sobre registros -->
        <div class="text-gray-600 dark:text-gray-300 mb-2 sm:mb-0">
          Mostrando de {{ startRecord }} até {{ endRecord }} de
          {{ totalFilteredItems }}
        </div>

        <!-- Controles de paginação -->
        <div
          class="flex items-center border border-gray-300 dark:border-gray-600 rounded overflow-hidden"
        >
          <button
            @click="prevPage"
            class="px-3 py-1 border-r border-gray-300 dark:border-gray-600"
            :disabled="currentPage === 1"
            :class="
              currentPage === 1
                ? 'text-gray-400 dark:text-gray-600'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            "
          >
            «
          </button>
          <div class="px-4 py-1 bg-white dark:bg-gray-800">
            {{ currentPage }}
          </div>
          <button
            @click="nextPage"
            class="px-3 py-1 border-l border-gray-300 dark:border-gray-600"
            :disabled="currentPage >= totalPages"
            :class="
              currentPage >= totalPages
                ? 'text-gray-400 dark:text-gray-600'
                : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            "
          >
            »
          </button>
        </div>
      </div>
    </div>
  </template>

  <script>
    import Sortable from "sortablejs";

    export default {
      name: "DataTable",
      props: {
        actionButton: {
          type: Object,
          default: () => ({ show: false, text: "Adicionar" }),
        },
        initialPerPage: {
          type: Number,
          default: 10,
        },
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
          searchQuery: "",
          currentPage: 1,
          perPage: this.initialPerPage,
          filteredItems: [],
        };
      },
      computed: {
        totalFilteredItems() {
          return this.filteredItems.length;
        },

        totalPages() {
          return Math.max(1, Math.ceil(this.totalFilteredItems / this.perPage));
        },

        paginatedItems() {
          const start = (this.currentPage - 1) * this.perPage;
          const end = start + this.perPage;
          return this.filteredItems.slice(start, end);
        },

        startRecord() {
          if (this.totalFilteredItems === 0) return 0;
          return (this.currentPage - 1) * this.perPage + 1;
        },

        endRecord() {
          if (this.totalFilteredItems === 0) return 0;
          return Math.min(
            this.startRecord + this.perPage - 1,
            this.totalFilteredItems
          );
        },

        perPageOptions() {
          const options = [];
          const totalItems = this.items.length;
          for (let i = 10; i <= Math.min(totalItems, 100); i += 10) {
            options.push(i);
          }
          // Se não houver opções, adicione pelo menos 10
          if (options.length === 0) options.push(10);
          return options;
        },

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
        handleSearch() {
          this.filterItems();
          this.currentPage = 1; // Voltar para a primeira página quando pesquisar
        },

        filterItems() {
          if (!this.searchQuery.trim()) {
            // Se não houver consulta de pesquisa, mostrar todos os itens
            this.filteredItems = [...this.items];
            return;
          }

          const query = this.searchQuery.toLowerCase().trim();
          this.filteredItems = this.items.filter((item) => {
            // Pesquisar em todas as propriedades do item
            return Object.values(item).some((value) => {
              // Verificar se o valor é uma string, número ou boolean
              if (value === null || value === undefined) return false;

              if (typeof value === "object") {
                // Para objetos, procurar recursivamente
                return JSON.stringify(value).toLowerCase().includes(query);
              }

              // Para tipos primitivos, converter para string
              return String(value).toLowerCase().includes(query);
            });
          });
        },

        handlePerPageChange() {
          this.currentPage = 1; // Voltar para a primeira página quando mudar itens por página
        },

        prevPage() {
          if (this.currentPage > 1) {
            this.currentPage--;
          }
        },

        nextPage() {
          if (this.currentPage < this.totalPages) {
            this.currentPage++;
          }
        },

        getOriginalIndex(paginatedIndex) {
          // Calcular o índice original com base no índice paginado
          return (this.currentPage - 1) * this.perPage + paginatedIndex;
        },

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
  </script>

  <style scoped>
    @media (max-width: 640px) {
      .truncate-text {
        max-width: 120px;
      }

      .base-table th,
      .base-table td {
        padding: 0.5rem 0.25rem;
        font-size: 0.875rem;
      }

      .action-button {
        margin-right: 0.25rem;
      }
    }
  </style>
</template>
