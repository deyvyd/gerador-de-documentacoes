<template>
  <div v-if="items.length > 0" class="base-table-container">
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
          v-for="(item, index) in items"
          :key="keyFunction(item, index)"
          :class="{ 'cursor-move': draggable }"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :class="[col.align === 'text-left' ? 'relative group' : col.align]"
          >
            <!-- Conteúdo da célula: text, buttons ou custom -->
            <div
              v-if="col.type === 'text'"
              :class="{ 'pl-2 py-2': col.align === 'text-left' }"
            >
              <!-- NOVO: Aplicar truncamento com tooltip apenas para colunas de texto -->
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
                    <path
                      d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                    ></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                </button>
                <!-- Botão de Editar -->
                <button
                  v-if="col.actions?.edit"
                  @click="$emit('edit', index)"
                  class="action-button edit-button"
                  title="Editar"
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
                <!-- Botão de Duplicar -->
                <button
                  v-if="col.actions?.duplicate"
                  @click="$emit('duplicate', index)"
                  class="action-button duplicate-button"
                  title="Duplicar"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <rect
                      x="8"
                      y="8"
                      width="12"
                      height="12"
                      rx="2"
                      ry="2"
                    ></rect>
                    <path
                      d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"
                    ></path>
                  </svg>
                </button>
                <!-- Botão de Remover -->
                <button
                  v-if="col.actions?.delete"
                  @click="$emit('delete', index)"
                  class="action-button delete-button"
                  title="Remover"
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
</template>

<script>
export default {
  name: "DataTable",
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
</script>

<style scoped>
/* Estilos específicos deste componente (opcional) */
</style>
