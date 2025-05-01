window.AppComponents = window.AppComponents || {};

// Componente para o editor de texto rico com Quill
const RichTextEditor = {
  props: {
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Digite o conteúdo aqui...",
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ["input", "change", "editor-ready", "tab-pressed"],
  data() {
    return {
      editor: null,
      content: this.value,
      isInitialized: false,
      containerId: `quill-editor-${Math.random().toString(36).substring(2, 9)}`,
    };
  },
  computed: {
    isReadOnly() {
      return this.disabled;
    },
  },
  watch: {
    value(newVal) {
      if (this.editor && newVal !== this.editor.root.innerHTML) {
        this.editor.root.innerHTML = newVal;
      }
    },
    disabled(newVal) {
      if (this.editor) {
        this.editor.enable(!newVal);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initQuill();
    });
  },
  methods: {
    initQuill() {
      // Verificar se o elemento existe no DOM antes de inicializar
      const element = document.getElementById(this.containerId);
      if (!element) return;

      // Configuração dos módulos e opções do Quill
      const toolbarOptions = [
        ["bold", "italic", "underline"], // botões para formatação de texto
        [{ color: [] }, { background: [] }], // cores de fonte e fundo
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
          keyboard: {
            bindings: {
              tab: {
                key: 9,
                handler: (range, context) => {
                  // Quando TAB é pressionado no editor, emitir evento para o componente pai
                  console.log("Tab pressed in Quill editor");
                  this.$emit("tab-pressed");
                  return false; // Impedir o comportamento padrão do TAB no editor
                },
              },
            },
          },
        },
        theme: "snow",
        placeholder: this.placeholder,
        readOnly: this.isReadOnly,
        formats: [
          "bold",
          "italic",
          "underline",
          "color",
          "background",
          "code",
          "list",
          "indent",
          "align",
        ],
      });

      // Definir o estilo da fonte padrão para combinar com o resto da aplicação
      this.editor.root.style.fontFamily = "Calibri, sans-serif";
      this.editor.root.style.fontSize = "18px";

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

      this.isInitialized = true;
      this.$emit("editor-ready", this.editor);
    },
    focus() {
      if (this.editor && !this.disabled) {
        this.editor.focus();
      }
    },
  },
  template: `
    <div class="quill-editor-container">
      <div :id="containerId" :tabindex="disabled ? -1 : tabIndex"></div>
    </div>
  `,
  beforeUnmount() {
    // Limpar o editor quando o componente for destruído
    if (this.editor) {
      this.editor = null;
    }
  },
};

window.AppComponents.ModalRequisito = {
  components: {
    "rich-text-editor": RichTextEditor,
  },
  props: {
    show: Boolean,
    titulo: String,
    requisito: Object,
    modoVisualizacao: Boolean,
    totalRequisitos: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      tabAtiva: 0,
      tabs: [
        { id: 0, nome: "Informações básicas" },
        { id: 1, nome: "Imagens e Descrição" },
        { id: 2, nome: "Regras" },
        { id: 3, nome: "Banco de dados" },
      ],
      // Detectar o tema claro/escuro
      isDarkMode: document.documentElement.classList.contains("dark"),
      // Flag para controlar foco no botão de upload
      shouldFocusUploadButton: false,
      // Conteúdo da descrição para o editor rico
      descricaoContent: "",
      // Referência ao editor Quill
      editor: null,
    };
  },
  computed: {
    // Definição fixa de todos os tabindex usados no componente
    tabIndexes() {
      return {
        // Tabs de navegação
        tab0: 101,
        tab1: 102,
        tab2: 103,
        tab3: 104,

        // Aba 1: Informações básicas
        titulo_rf: 111,
        tipo: 112,
        local: 113,
        usuario: 114,
        perfil: 115,

        // Aba 2: Imagens e Descrição
        selectImagens: 211,
        descricao: 220,

        // Aba 3: Regras
        validacoes: 311,
        regras: 312,

        // Aba 4: Banco de dados
        banco: 411,

        // Botões do footer
        btnSalvar: 501,
        btnCancelar: 502,
        btnVoltar: 501,
      };
    },
  },
  watch: {
    show(newVal) {
      if (newVal) {
        // Bloquear rolagem quando o modal abrir
        document.body.classList.add("modal-open");
        // Reset para a primeira aba quando o modal abrir
        this.tabAtiva = 0;
        // Atualizar o estado do tema
        this.isDarkMode = document.documentElement.classList.contains("dark");
        // Inicializar o conteúdo do editor
        this.descricaoContent = this.requisito.descricao || "";

        // Dar tempo para o DOM renderizar antes de tentar inicializar o editor
        this.$nextTick(() => {
          // Verificar se o editor já está inicializado
          if (!this.editor) {
            // Tentar encontrar o editor no DOM
            const editorElement = document.querySelector(".ql-editor");
            if (editorElement && editorElement.quill) {
              this.editor = editorElement.quill;
            }
          }

          // Focar no campo Nome após o modal abrir
          setTimeout(() => {
            const tituloRFInput = document.getElementById("req-titulo_rf");
            if (tituloRFInput) {
              tituloRFInput.focus();
            }
          }, 50);
        });
      } else {
        // Desbloquear rolagem quando o modal fechar
        document.body.classList.remove("modal-open");
      }
    },
    requisito: {
      handler(newVal) {
        this.descricaoContent = newVal.descricao || "";
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    focarPrimeiroElementoDaAba() {
      // Encontra o primeiro campo focável da aba atual
      const seletores = [
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        "button:not([disabled])",
        ".ql-editor",
      ];

      const conteudoAba = this.$refs[`abaConteudo${this.tabAtiva}`];
      if (conteudoAba) {
        const primeiroElemento = this.$el.querySelector(
          "button, input, select, textarea, .ql-editor"
        );
        if (primeiroElemento) {
          primeiroElemento.focus();
        }
      }
    },

    onEditorReady(editor) {
      this.editor = editor;
    },

    handleEditorTab() {
      // Move to the next tab when TAB is pressed in the editor
      this.trocarAba(2); // Move to the "Regras" tab

      // Use a longer delay to ensure the DOM has fully updated
      setTimeout(() => {
        // Try to focus specifically on the validacoes field by ID
        const validacoesField = document.getElementById("req-validacoes");
        if (validacoesField) {
          validacoesField.focus();
          // Place cursor at the end of any existing text
          if (validacoesField.value) {
            validacoesField.selectionStart = validacoesField.selectionEnd =
              validacoesField.value.length;
          }
          console.log("Focused on validacoes field");
        } else {
          console.warn("Validacoes field not found in the DOM");
          // Fallback: try to find any textarea in the current tab content
          const abaConteudo = this.$refs.abaConteudo2;
          if (abaConteudo) {
            const textarea = abaConteudo.querySelector("textarea");
            if (textarea) {
              textarea.focus();
              console.log("Focused on textarea via fallback");
            } else {
              console.warn("No textarea found in tab content");
            }
          } else {
            console.warn("Tab content ref not found");
          }
        }
      }, 200); // Increased delay to ensure DOM is fully updated
    },

    // Navegação por teclado entre abas
    onKeydown(event, proximaAba) {
      if (event.key === "Tab" && !event.shiftKey) {
        // Se estamos no último campo de uma aba e pressionamos TAB (não shift+tab)
        if (proximaAba !== undefined) {
          event.preventDefault();

          if (proximaAba < this.tabs.length) {
            // Muda para a próxima aba
            this.trocarAba(proximaAba);

            // Se estamos mudando para a aba de imagens, configura para focar no botão
            if (proximaAba === 1) {
              this.shouldFocusUploadButton = true;
            }
          } else {
            // Se não há próxima aba, foca no botão Salvar
            if (this.$refs.btnSalvar) {
              this.$refs.btnSalvar.focus();
            }
          }
        }
      }
    },

    trocarAba(id) {
      this.tabAtiva = id;

      // Limpar estilos de erro quando trocar de aba
      const camposComErro = document.querySelectorAll(".border-red-500");
      camposComErro.forEach((campo) => {
        campo.classList.remove(
          "border-red-500",
          "focus:border-red-500",
          "focus:ring-red-500",
          "border-2"
        );
      });

      // Focar no primeiro campo da aba após a troca
      this.$nextTick(() => {
        // Tratamento especial para a aba de imagens
        if (
          id === 1 &&
          this.$refs.uploadButton &&
          this.shouldFocusUploadButton
        ) {
          this.$refs.uploadButton.focus();
          this.shouldFocusUploadButton = false; // Resetar flag
        } else {
          this.focarPrimeiroElementoDaAba();
        }
      });
    },

    fecharModal() {
      this.$emit("fechar");
    },

    salvarRequisito() {
      // Limpar estilos de erro anteriores
      document.querySelectorAll(".campo-erro").forEach((el) => {
        el.classList.remove("campo-erro");
      });

      // Verificar cada campo obrigatório em sequência

      // 1. Nome
      if (!this.requisito.titulo_rf) {
        this.tabAtiva = 0; // Aba de informações básicas
        setTimeout(() => {
          const elemento = document.getElementById("req-titulo_rf");
          if (elemento) {
            elemento.classList.add("campo-erro");
            elemento.focus();
          }
        }, 50);
        return;
      }

      // 2. Tipo
      if (!this.requisito.tipo) {
        this.tabAtiva = 0;
        setTimeout(() => {
          const elemento = document.getElementById("req-tipo");
          if (elemento) {
            elemento.classList.add("campo-erro");
            elemento.focus();
          }
        }, 50);
        return;
      }

      // 3. Local
      if (!this.requisito.local) {
        this.tabAtiva = 0;
        setTimeout(() => {
          const elemento = document.getElementById("req-local");
          if (elemento) {
            elemento.classList.add("campo-erro");
            elemento.focus();
          }
        }, 50);
        return;
      }

      // 4. Usuário
      if (!this.requisito.usuario) {
        this.tabAtiva = 0;
        setTimeout(() => {
          const elemento = document.getElementById("req-usuario");
          if (elemento) {
            elemento.classList.add("campo-erro");
            elemento.focus();
          }
        }, 50);
        return;
      }

      // 5. Perfil
      if (!this.requisito.perfil) {
        this.tabAtiva = 0;
        setTimeout(() => {
          const elemento = document.getElementById("req-perfil");
          if (elemento) {
            elemento.classList.add("campo-erro");
            elemento.focus();
          }
        }, 50);
        return;
      }

      // 6. Descrição
      if (!this.requisito.descricao) {
        this.tabAtiva = 1; // Aba de imagens e descrição
        setTimeout(() => {
          // Seleciona o container e a barra de ferramentas do editor
          const editorContainer = document.querySelector(".ql-container");
          const editorToolbar = document.querySelector(".ql-toolbar");
          const editorRoot = document.querySelector(".ql-editor");

          if (editorContainer) {
            // Adiciona classe campo-erro ao container do editor
            editorContainer.classList.add("campo-erro");

            if (editorToolbar) {
              editorToolbar.classList.add("campo-erro");

              // Adiciona estilo direto para garantir que a borda vermelha seja visível
              editorToolbar.style.borderColor = "var(--error-color)";
              editorToolbar.style.borderWidth = "2px";
              editorToolbar.style.borderBottomWidth = "0";

              if (this.isDarkMode) {
                editorToolbar.style.borderColor = "var(--error-color-dark)";
              }
            }

            // Adiciona estilo direto para garantir que a borda vermelha seja visível
            editorContainer.style.borderColor = "var(--error-color)";
            editorContainer.style.borderWidth = "2px";
            editorContainer.style.borderTopWidth = "0";

            if (this.isDarkMode) {
              editorContainer.style.borderColor = "var(--error-color-dark)";
            }

            // Modifica esta parte para evitar o erro de foco no editor
            try {
              // Verifica se o editor existe antes de tentar focar
              if (editorRoot) {
                editorRoot.focus();

                // Se o editor tem um método focus nativo (via Quill)
                if (this.editor && typeof this.editor.focus === "function") {
                  this.editor.focus();
                }
              }
            } catch (e) {
              console.warn("Não foi possível focar no editor:", e);
            }
          }
        }, 50);
        return;
      }

      // Se chegou aqui, todos os campos estão preenchidos
      const editIndex = this.requisito.id
        ? parseInt(this.requisito.id.split("-")[1]) - 1
        : -1;

      // Adicionar parâmetro adicional focusAddButton=true ao emitir os eventos
      if (editIndex >= 0) {
        this.$emit(
          "update-requisito",
          editIndex,
          JSON.parse(JSON.stringify(this.requisito)),
          true // focusAddButton
        );
      } else {
        const novoId =
          "RF-" + String(this.totalRequisitos + 1).padStart(2, "0");
        this.requisito.id = novoId;
        this.$emit(
          "add-requisito",
          JSON.parse(JSON.stringify(this.requisito)),
          true
        ); // focusAddButton
      }

      this.$emit("fechar", true); // focusAddButton
    },

    // Método para lidar com upload de arquivos
    handleFileUpload(event) {
      this.$emit("upload-imagem", event);
    },

    removerImagem(index) {
      this.$emit("remover-imagem", index);
    },

    updateDescricaoContent(content) {
      this.descricaoContent = content;
      // Atualizar diretamente o valor no objeto requisito
      this.requisito.descricao = content;
    },

    // Gerenciamento de navegação por teclado
    onSaveButtonKeydown(event) {
      if (event.key === "Tab" && !event.shiftKey) {
        // Tab no botão Salvar vai para Cancelar
        event.preventDefault();
        if (this.$refs.btnCancelar) {
          this.$refs.btnCancelar.focus();
        }
      }
    },

    onCancelButtonKeydown(event) {
      if (event.key === "Tab" && !event.shiftKey) {
        // Tab no botão Cancelar volta para o início do modal (loop)
        event.preventDefault();

        // Focar no primeiro campo focável do modal
        const primeiroElemento = this.$el.querySelector(
          "button, input, select, textarea, .ql-editor"
        );
        if (primeiroElemento) {
          primeiroElemento.focus();
        }
      }
    },

    onEditorReady(editor) {
      this.editor = editor;
    },
  },

  mounted() {
    // Quando o componente é montado, adiciona event listeners para tab nos botões
    this.$nextTick(() => {
      if (this.$refs.btnSalvar) {
        this.$refs.btnSalvar.addEventListener(
          "keydown",
          this.onSaveButtonKeydown
        );
      }
      if (this.$refs.btnCancelar) {
        this.$refs.btnCancelar.addEventListener(
          "keydown",
          this.onCancelButtonKeydown
        );
      }
    });
  },

  updated() {
    // Após atualização, especialmente quando a aba muda
    this.$nextTick(() => {
      // Se estamos na aba de imagens e o botão de upload deve receber foco
      if (this.tabAtiva === 1 && this.$refs.uploadButton) {
        // Se chegamos pela navegação de TAB (do campo perfil)
        if (
          document.activeElement &&
          document.activeElement.id === "req-perfil"
        ) {
          this.$refs.uploadButton.focus();
        }
      }
    });
  },

  beforeUnmount() {
    // Remove os event listeners quando o componente é desmontado
    if (this.$refs.btnSalvar) {
      this.$refs.btnSalvar.removeEventListener(
        "keydown",
        this.onSaveButtonKeydown
      );
    }
    if (this.$refs.btnCancelar) {
      this.$refs.btnCancelar.removeEventListener(
        "keydown",
        this.onCancelButtonKeydown
      );
    }
  },

  template: `
    <div v-if="show" class="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center">
      <div :class="['modal-content', 'rounded-lg', 'shadow-lg', 'max-w-2xl', 'w-full', 'mx-4', 'p-6', 'max-h-[90vh]', 'overflow-hidden', 'flex', 'flex-col', isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800', {'modo-visualizacao': modoVisualizacao}]">
        <!-- Cabeçalho do modal -->
        <div class="mb-4 flex justify-between items-center">
          <h2 class="text-xl font-bold" :class="isDarkMode ? 'text-white' : 'text-gray-800'">{{ titulo }}</h2>
          <span v-if="modoVisualizacao" class="px-2 py-1 text-xs font-semibold rounded" :class="isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'">
            Modo Visualização
          </span>
        </div>
        
        <!-- Navegação das abas -->
        <div class="flex border-b mb-4" :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'">
          <button 
            v-for="tab in tabs" 
            :key="tab.id" 
            @click="trocarAba(tab.id)" 
            class="py-2 px-4 text-sm font-medium transition-colors duration-200"
            :tabindex="tabIndexes['tab' + tab.id]"
            :class="[
              tabAtiva === tab.id 
                ? (isDarkMode ? 'text-blue-400 border-b-2 border-blue-400' : 'text-blue-600 border-b-2 border-blue-600') 
                : (isDarkMode ? 'text-gray-400 hover:text-blue-300' : 'text-gray-600 hover:text-blue-500')
            ]"
          >
            {{ tab.nome }}
          </button>
        </div>
        
        <!-- Conteúdo das abas -->
        <div class="overflow-y-auto flex-grow">
          <!-- Aba 1: Informações básicas -->
          <div v-if="tabAtiva === 0" class="space-y-3" ref="abaConteudo0">
            <div class="grid grid-cols-4 gap-4">
              <div class="form-group col-span-3 mb-0">
                <label for="req-titulo_rf" class="form-label mb-1" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                  Título
                  <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="req-titulo_rf"
                  v-model="requisito.titulo_rf"
                  class="form-input w-full" 
                  :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                  :placeholder="modoVisualizacao ? '' : 'Título do requisito funcional'"
                  :disabled="modoVisualizacao"
                  :tabindex="tabIndexes.titulo_rf"
                />
              </div>

              <div class="form-group col-span-1 mb-0">
                <label for="req-tipo" class="form-label mb-1" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                  Tipo
                  <span class="text-red-600">*</span>
                </label>
                <select
                  id="req-tipo"
                  v-model="requisito.tipo"
                  class="form-input form-select w-full"
                  :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                  :disabled="modoVisualizacao"
                  :tabindex="tabIndexes.tipo"
                >
                  <option value="" v-if="!modoVisualizacao">Selecione</option>
                  <option value="Criação">Criação</option>
                  <option value="Alteração">Alteração</option>
                  <option value="Remoção">Remoção</option>
                </select>
              </div>
            </div>

            <div class="form-group mb-0">
              <label for="req-local" class="form-label mb-1" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                Local
                <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="req-local"
                v-model="requisito.local"
                class="form-input"
                :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                :placeholder="modoVisualizacao ? '' : 'Local de implementação'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.local"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="form-group mb-0">
                <label for="req-usuario" class="form-label mb-1" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                  Usuário
                  <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="req-usuario"
                  v-model="requisito.usuario"
                  class="form-input"
                  :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                  :placeholder="modoVisualizacao ? '' : 'Usuário alvo'"
                  :disabled="modoVisualizacao"
                  :tabindex="tabIndexes.usuario"
                />
              </div>

              <div class="form-group mb-0">
                <label for="req-perfil" class="form-label mb-1" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                  Perfil
                  <span class="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="req-perfil"
                  v-model="requisito.perfil"
                  class="form-input"
                  :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                  :placeholder="modoVisualizacao ? '' : 'Perfil de acesso'"
                  :disabled="modoVisualizacao"
                  :tabindex="tabIndexes.perfil"
                  @keydown="onKeydown($event, 1)"
                />
              </div>
            </div>
          </div>
          
          <!-- Aba 2: Imagem e Descrição -->
          <div v-if="tabAtiva === 1" class="space-y-3" ref="abaConteudo1">
            <!-- Seção de imagens (modo edição) -->
            <div class="form-group mb-0" v-if="!modoVisualizacao">
              <label class="form-label mb-1" for="btn-select-images" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                Imagens
              </label>
              <div
                ref="uploadArea"
                class="border-2 border-dashed rounded-lg p-3 flex justify-center items-center h-[70px]"
                :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'"
              >
                <input
                  type="file"
                  ref="fileInput"
                  @change="handleFileUpload"
                  multiple
                  accept="image/*"
                  class="hidden"
                  tabindex="-1"
                />
                <button
                  id="btn-select-images"
                  @click="$refs.fileInput.click()"
                  @keydown.enter.prevent="$refs.fileInput.click()"
                  type="button"
                  class="btn-secondary px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  :class="isDarkMode ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-700'"
                  :tabindex="tabIndexes.selectImagens"
                  ref="uploadButton"
                >
                  Selecionar imagens
                </button>
              </div>
              
              <div
                v-if="requisito.imagens && requisito.imagens.length > 0"
                class="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2"
              >
                <div
                  v-for="(imagem, idx) in requisito.imagens"
                  :key="idx"
                  class="relative"
                >
                  <img
                    :src="imagem"
                    alt="Preview"
                    class="w-full h-24 object-cover rounded"
                  />
                  <button
                    @click="removerImagem(idx)"
                    class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                    :tabindex="tabIndexes.selectImagens + 1 + idx"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            <!-- Exibição de imagens no modo visualização -->
            <div class="form-group" v-if="modoVisualizacao">
              <label class="form-label" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                Imagens
              </label>
              <!-- Quando há imagens -->
              <div 
                v-if="requisito.imagens && requisito.imagens.length > 0"
                class="mt-2 grid grid-cols-2 md:grid-cols-3 gap-4"
              >
                <div
                  v-for="(imagem, idx) in requisito.imagens"
                  :key="idx"
                  class="relative"
                >
                  <img
                    :src="imagem"
                    alt="Imagem do requisito"
                    class="w-full h-32 object-cover rounded border"
                    :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'"
                  />
                </div>
              </div>
              <!-- Quando não há imagens -->
              <div 
                v-else
                class="mt-2 p-4 rounded border"
                :class="isDarkMode ? 'bg-gray-700 border-gray-600 text-gray-300' : 'bg-gray-100 border-gray-300 text-gray-600'"
              >
                Não foram inseridas imagens nesse RF
              </div>
            </div>

            <!-- Campo de descrição com editor rico Quill -->
            <div class="form-group mb-0">
              <label for="req-descricao" class="form-label mb-0" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                Descrição
                <span class="text-red-600">*</span>
              </label>
              <!-- Editor de texto rico -->
              <rich-text-editor
                v-if="!modoVisualizacao"
                :value="descricaoContent"
                :disabled="modoVisualizacao"
                :placeholder="'Descrição detalhada do requisito'"
                :tabIndex="tabIndexes.descricao"
                @input="updateDescricaoContent"
                @change="updateDescricaoContent"
                @editor-ready="onEditorReady"
                @tab-pressed="handleEditorTab"
              ></rich-text-editor>
              
              <!-- Visualização do conteúdo formatado no modo visualização -->
              <div 
                v-else 
                class="quill-editor-container modo-visualizacao"
              >
                <div class="ql-container ql-snow">
                  <div class="ql-editor form-input" v-html="descricaoContent || 'Sem descrição'"></div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Aba 3: Regras -->
          <div v-if="tabAtiva === 2" class="space-y-3" ref="abaConteudo2">
            <div class="form-group mb-0">
              <label for="req-validacoes" class="form-label mb-0" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                Regras de validações dos campos
              </label>
              <div v-if="modoVisualizacao && !requisito.validacoes" 
                class="campo-vazio-indicador px-3 py-2 rounded min-h-[80px] flex items-center justify-center border border-dashed"
                :class="isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'"
              >
                <em :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">Não preenchido</em>
              </div>
              <textarea
                v-else
                id="req-validacoes"
                v-model="requisito.validacoes"
                class="form-input form-textarea"
                :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                rows="3"
                :placeholder="modoVisualizacao ? '' : 'Descreva as regras de validação'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.validacoes"
              ></textarea>
            </div>

            <div class="form-group mb-0">
              <label for="req-regras" class="form-label mb-0" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                Regras de negócio
              </label>
              <div v-if="modoVisualizacao && !requisito.regras" 
                class="campo-vazio-indicador px-3 py-2 rounded min-h-[80px] flex items-center justify-center border border-dashed"
                :class="isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'"
              >
                <em :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">Não preenchido</em>
              </div>
              <textarea
                v-else
                id="req-regras"
                v-model="requisito.regras"
                class="form-input form-textarea"
                :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                rows="3"
                :placeholder="modoVisualizacao ? '' : 'Descreva as regras de negócio'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.regras"
                @keydown="onKeydown($event, 3)"
              ></textarea>
            </div>
          </div>
          
          <!-- Aba 4: Banco de dados -->
          <div v-if="tabAtiva === 3" class="space-y-3" ref="abaConteudo3">
            <div class="form-group mb-0">
              <label for="req-banco" class="form-label mb-" :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'">
                Mudança de banco
              </label>
              <div v-if="modoVisualizacao && !requisito.banco" 
                class="campo-vazio-indicador px-3 py-2 rounded min-h-[150px] flex items-center justify-center border border-dashed"
                :class="isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-300'"
              >
                <em :class="isDarkMode ? 'text-gray-500' : 'text-gray-400'">Não preenchido</em>
              </div>
              <textarea
                v-else
                id="req-banco"
                v-model="requisito.banco"
                class="form-input form-textarea"
                :class="isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-800 border-gray-300'"
                rows="8"
                :placeholder="modoVisualizacao ? '' : 'Descreva as mudanças no banco de dados'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.banco"
                @keydown="onKeydown($event)"
              ></textarea>
            </div>
          </div>
        </div>
        
        <!-- Rodapé do modal com botões -->
        <div class="flex justify-end space-x-4 mt-6 pt-4 border-t" :class="isDarkMode ? 'border-gray-600' : 'border-gray-300'">
          <!-- No modo visualização, mostrar apenas o botão Voltar -->
          <template v-if="modoVisualizacao">
            <button
              @click="fecharModal"
              type="button"
              class="btn min-w-[100px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              :tabindex="tabIndexes.btnVoltar"
            >
              Voltar
            </button>
          </template>
          <!-- No modo edição/criação, mostrar botões Cancelar e Salvar -->
          <template v-else>
            <button
              @click="fecharModal"
              type="button"
              class="btn min-w-[100px] px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white"
              :tabindex="tabIndexes.btnCancelar"
              ref="btnCancelar"
            >
              Cancelar
            </button>
            <button
              @click="salvarRequisito"
              type="button"
              class="btn min-w-[100px] px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white"
              :tabindex="tabIndexes.btnSalvar"
              ref="btnSalvar"
            >
              Salvar
            </button>
          </template>
        </div>
      </div>
    </div>
  `,
};
