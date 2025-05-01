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
      // Conteúdo para os novos editores Quill
      validacoesContent: "",
      regrasContent: "",
      bancoContent: "",

      // Referências aos editores Quill
      validacoesEditor: null,
      regrasEditor: null,
      bancoEditor: null,
    };
  },
  computed: {
    isReadOnly() {
      return this.disabled;
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
        // Inicializar o conteúdo do editor com os dados do requisito
        this.descricaoContent = this.requisito.descricao || "";
        this.validacoesContent = this.requisito.validacoes || "";
        this.regrasContent = this.requisito.regras || "";
        this.bancoContent = this.requisito.banco || "";

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

          // Focar no campo Título após o modal abrir
          setTimeout(() => {
            const tituloRFInput = document.getElementById("req-tituloRF");
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
        // Sincronizar sempre que o requisito mudar
        if (newVal) {
          this.descricaoContent = newVal.descricao || "";
          this.validacoesContent = newVal.validacoes || "";
          this.regrasContent = newVal.regras || "";
          this.bancoContent = newVal.banco || "";
        }
      },
      deep: true,
      immediate: true,
    },
    descricaoContent(newVal) {
      if (this.requisito) {
        this.requisito.descricao = newVal;
      }
    },

    validacoesContent(newVal) {
      if (this.requisito) {
        this.requisito.validacoes = newVal;
      }
    },

    regrasContent(newVal) {
      if (this.requisito) {
        this.requisito.regras = newVal;
      }
    },

    bancoContent(newVal) {
      if (this.requisito) {
        this.requisito.banco = newVal;
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
    updateValidacoesContent(content) {
      this.validacoesContent = content;
      if (this.requisito) {
        this.requisito.validacoes = content;
      }
    },

    updateRegrasContent(content) {
      this.regrasContent = content;
      if (this.requisito) {
        this.requisito.regras = content;
      }
    },

    updateBancoContent(content) {
      this.bancoContent = content;
      if (this.requisito) {
        this.requisito.banco = content;
      }
    },

    onValidacoesEditorReady(editor) {
      this.validacoesEditor = editor;
    },

    onRegrasEditorReady(editor) {
      this.regrasEditor = editor;
    },

    onBancoEditorReady(editor) {
      this.bancoEditor = editor;
    },

    handleValidacoesTab() {
      // Passar para o próximo campo (regras)
      const regrasField = this.$el.querySelector("#regras-editor .ql-editor");
      if (regrasField) {
        setTimeout(() => {
          regrasField.focus();
        }, 200);
      }
    },

    handleRegrasTab() {
      // Passar para o próximo campo (banco)
      this.trocarAba(3); // Muda para aba do banco
    },

    handleBancoTab() {
      // Passar para o botão salvar
      if (this.$refs.btnSalvar) {
        this.$refs.btnSalvar.focus();
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
        tituloRF: 111,
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
          this.descricaoContent = this.requisito.descricao || "";
          this.validacoesContent = this.requisito.validacoes || "";
          this.regrasContent = this.requisito.regras || "";
          this.bancoContent = this.requisito.banco || "";
          // Verificar se o editor já está inicializado
          if (!this.editor) {
            // Tentar encontrar o editor no DOM
            const editorElement = document.querySelector(".ql-editor");
            if (editorElement && editorElement.quill) {
              this.editor = editorElement.quill;
            }
          }

          // Focar no campo Título após o modal abrir
          setTimeout(() => {
            const tituloRFInput = document.getElementById("req-tituloRF");
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
        // Sincronizar apenas quando o modal for aberto
        if (this.show) {
          this.descricaoContent = newVal.descricao || "";
          this.validacoesContent = newVal.validacoes || "";
          this.regrasContent = newVal.regras || "";
          this.bancoContent = newVal.banco || "";
        }
      },
      deep: true,
      immediate: true,
    },
    descricaoContent(newVal) {
      if (this.requisito) {
        this.requisito.descricao = newVal;
      }
    },

    validacoesContent(newVal) {
      if (this.requisito) {
        this.requisito.validacoes = newVal;
      }
    },

    regrasContent(newVal) {
      if (this.requisito) {
        this.requisito.regras = newVal;
      }
    },

    bancoContent(newVal) {
      if (this.requisito) {
        this.requisito.banco = newVal;
      }
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
      const camposComErro = document.querySelectorAll(
        ".border-red-500, .campo-erro"
      );
      camposComErro.forEach((campo) => {
        campo.classList.remove(
          "border-red-500",
          "focus:border-red-500",
          "focus:ring-red-500",
          "border-2",
          "campo-erro"
        );

        // Remover estilos inline adicionados diretamente
        campo.style.borderColor = "";
        campo.style.borderWidth = "";
        campo.style.borderTopWidth = "";
        campo.style.borderBottomWidth = "";
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

    // Método para limpar estilos de erro do editor Quill
    limparErroEditor() {
      const editorContainer = document.querySelector(".ql-container");
      const editorToolbar = document.querySelector(".ql-toolbar");

      if (editorContainer) {
        editorContainer.classList.remove("campo-erro");
        editorContainer.style.borderColor = "";
        editorContainer.style.borderWidth = "";
        editorContainer.style.borderTopWidth = "";
      }

      if (editorToolbar) {
        editorToolbar.classList.remove("campo-erro");
        editorToolbar.style.borderColor = "";
        editorToolbar.style.borderWidth = "";
        editorToolbar.style.borderBottomWidth = "";
      }
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

      // 1. Título
      if (!this.requisito.tituloRF) {
        this.tabAtiva = 0; // Aba de informações básicas
        setTimeout(() => {
          const elemento = document.getElementById("req-tituloRF");
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

      this.requisito.descricao = this.descricaoContent;
      this.requisito.validacoes = this.validacoesContent;
      this.requisito.regras = this.regrasContent;
      this.requisito.banco = this.bancoContent;

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
      if (this.requisito) {
        this.requisito.descricao = content;
      }

      // Se o conteúdo não estiver mais vazio, remover os estilos de erro
      if (content && content.trim() !== "") {
        this.limparErroEditor();
      }
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

      // Adiciona um ouvinte de evento para limpar o estilo de erro quando o usuário começar a editar
      if (editor) {
        editor.on("text-change", () => {
          // Verifica se o texto não está vazio antes de limpar os estilos de erro
          const text = editor.getText().trim();
          if (text !== "") {
            this.limparErroEditor();
          }
        });
      }
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
    <div v-if="show" class="modal-requisito-overlay">
    <div :class="['modal-requisito-container', isDarkMode ? 'modal-requisito-dark' : 'modal-requisito-light', {'modo-visualizacao': modoVisualizacao}]">
      <!-- Cabeçalho do modal -->
      <div class="modal-requisito-header">
        <h2 :class="['modal-requisito-title', isDarkMode ? 'modal-requisito-title-dark' : 'modal-requisito-title-light']">{{ titulo }}</h2>
        <span v-if="modoVisualizacao" :class="['modal-view-badge', isDarkMode ? 'modal-view-badge-dark' : 'modal-view-badge-light']">
          Modo Visualização
        </span>
      </div>
      
      <!-- Navegação das abas -->
      <div :class="['modal-tabs-container', isDarkMode ? 'modal-tabs-border-dark' : 'modal-tabs-border-light']">
        <button 
          v-for="tab in tabs" 
          :key="tab.id" 
          @click="trocarAba(tab.id)" 
          class="modal-tab-button"
          :tabindex="tabIndexes['tab' + tab.id]"
          :class="[
            tabAtiva === tab.id 
              ? (isDarkMode ? 'modal-tab-active-dark' : 'modal-tab-active-light') 
              : (isDarkMode ? 'modal-tab-inactive-dark' : 'modal-tab-inactive-light')
          ]"
        >
          {{ tab.nome }}
        </button>
      </div>
      
      <!-- Conteúdo das abas -->
      <div class="modal-content-container">
        <!-- Aba 1: Informações básicas -->
        <div v-if="tabAtiva === 0" class="modal-section" ref="abaConteudo0">
          <div class="grid grid-cols-4 gap-4">
            <div class="modal-form-group col-span-3">
              <label for="req-tituloRF" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
                Título
                <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="req-tituloRF"
                v-model="requisito.tituloRF"
                :class="['modal-form-input', isDarkMode ? 'modal-form-input-dark' : 'modal-form-input-light']"
                :placeholder="modoVisualizacao ? '' : 'Título do requisito funcional'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.tituloRF"
              />
            </div>

            <div class="modal-form-group col-span-1">
              <label for="req-tipo" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
                Tipo
                <span class="text-red-600">*</span>
              </label>
              <select
                id="req-tipo"
                v-model="requisito.tipo"
                :class="['modal-form-input', isDarkMode ? 'modal-form-input-dark' : 'modal-form-input-light']"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.tipo"
              >
                <option value="" v-if="!modoVisualizacao">Selecione</option>
                <option value="Alteração">Alteração</option>
                <option value="Inclusão">Inclusão</option>
                <option value="Remoção">Remoção</option>
              </select>
            </div>
          </div>

          <div class="modal-form-group">
            <label for="req-local" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
              Local
              <span class="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="req-local"
              v-model="requisito.local"
              :class="['modal-form-input', isDarkMode ? 'modal-form-input-dark' : 'modal-form-input-light']"
              :placeholder="modoVisualizacao ? '' : 'Local de implementação'"
              :disabled="modoVisualizacao"
              :tabindex="tabIndexes.local"
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="modal-form-group">
              <label for="req-usuario" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
                Usuário
                <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="req-usuario"
                v-model="requisito.usuario"
                :class="['modal-form-input', isDarkMode ? 'modal-form-input-dark' : 'modal-form-input-light']"
                :placeholder="modoVisualizacao ? '' : 'Usuário alvo'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.usuario"
              />
            </div>

            <div class="modal-form-group">
              <label for="req-perfil" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
                Perfil
                <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="req-perfil"
                v-model="requisito.perfil"
                :class="['modal-form-input', isDarkMode ? 'modal-form-input-dark' : 'modal-form-input-light']"
                :placeholder="modoVisualizacao ? '' : 'Perfil de acesso'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.perfil"
                @keydown="onKeydown($event, 1)"
              />
            </div>
          </div>
        </div>
        
        <!-- Aba 2: Imagem e Descrição -->
        <div v-if="tabAtiva === 1" class="modal-section" ref="abaConteudo1">
          <!-- Seção de imagens (modo edição) -->
          <div class="modal-form-group" v-if="!modoVisualizacao">
            <label class="modal-form-label" for="btn-select-images" :class="isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light'">
              Imagens
            </label>
            <div
              ref="uploadArea"
              :class="['modal-upload-area', isDarkMode ? 'modal-upload-area-dark' : 'modal-upload-area-light']"
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
                :class="['modal-upload-button', isDarkMode ? 'modal-upload-button-dark' : 'modal-upload-button-light']"
                :tabindex="tabIndexes.selectImagens"
                ref="uploadButton"
              >
                Selecionar imagens
              </button>
            </div>
            
            <div
              v-if="requisito.imagens && requisito.imagens.length > 0"
              class="modal-image-grid"
            >
              <div
                v-for="(imagem, idx) in requisito.imagens"
                :key="idx"
                class="modal-image-container"
              >
                <img
                  :src="imagem"
                  alt="Preview"
                  class="modal-image"
                />
                <button
                  @click="removerImagem(idx)"
                  class="modal-image-remove-button"
                  :tabindex="tabIndexes.selectImagens + 1 + idx"
                >
                  ×
                </button>
              </div>
            </div>
          </div>

          <!-- Exibição de imagens no modo visualização -->
          <div class="modal-form-group" v-if="modoVisualizacao">
            <label class="modal-form-label" :class="isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light'">
              Imagens
            </label>
            <!-- Quando há imagens -->
            <div 
              v-if="requisito.imagens && requisito.imagens.length > 0"
              class="modal-view-images-grid"
            >
              <div
                v-for="(imagem, idx) in requisito.imagens"
                :key="idx"
                class="modal-image-container"
              >
                <img
                  :src="imagem"
                  alt="Imagem do requisito"
                  :class="['modal-view-image', isDarkMode ? 'modal-view-image-dark' : 'modal-view-image-light']"
                />
              </div>
            </div>
            <!-- Quando não há imagens -->
            <div 
              v-else
              :class="['modal-no-images', isDarkMode ? 'modal-no-images-dark' : 'modal-no-images-light']"
            >
              Não foram inseridas imagens nesse RF
            </div>
          </div>

          <!-- Campo de descrição com editor rico Quill -->
          <div class="modal-form-group">
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
        <div v-if="tabAtiva === 2" class="modal-section" ref="abaConteudo2">
          <div class="modal-form-group">
            <label for="req-validacoes" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
              Regras de validações dos campos
            </label>
            <div v-if="modoVisualizacao && !requisito.validacoes" 
              :class="['modal-empty-field', isDarkMode ? 'modal-empty-field-dark' : 'modal-empty-field-light']"
              style="min-height: 90px; padding: 0.7rem;"
            >
              <em :class="isDarkMode ? 'modal-empty-text-dark' : 'modal-empty-text-light'">Não preenchido</em>
            </div>
            
            <!-- Editor de texto rico -->
            <rich-text-editor
              v-else-if="!modoVisualizacao"
              :value="validacoesContent"
              :disabled="modoVisualizacao"
              :placeholder="'Descreva as regras de validação'"
              :tabIndex="tabIndexes.validacoes"
              @input="updateValidacoesContent"
              @change="updateValidacoesContent"
              @editor-ready="onValidacoesEditorReady"
              @tab-pressed="handleValidacoesTab"
              id="validacoes-editor"
            ></rich-text-editor>
            
            <!-- Visualização do conteúdo formatado no modo visualização -->
            <div 
              v-else 
              class="quill-editor-container modo-visualizacao"
              style="min-height: 90px;"
            >
              <div class="ql-container ql-snow">
                <div class="ql-editor form-input" v-html="validacoesContent || 'Não preenchido'"></div>
              </div>
            </div>
          </div>

          <div class="modal-form-group">
            <label for="req-regras" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
              Regras de negócio
            </label>
            <div v-if="modoVisualizacao && !requisito.regras" 
              :class="['modal-empty-field', isDarkMode ? 'modal-empty-field-dark' : 'modal-empty-field-light']"
              style="min-height: 90px; padding: 0.7rem;"
            >
              <em :class="isDarkMode ? 'modal-empty-text-dark' : 'modal-empty-text-light'">Não preenchido</em>
            </div>
            
            <!-- Editor de texto rico -->
            <rich-text-editor
              v-else-if="!modoVisualizacao"
              :value="regrasContent"
              :disabled="modoVisualizacao"
              :placeholder="'Descreva as regras de negócio'"
              :tabIndex="tabIndexes.regras"
              @input="updateRegrasContent"
              @change="updateRegrasContent"
              @editor-ready="onRegrasEditorReady"
              @tab-pressed="handleRegrasTab"
              id="regras-editor"
            ></rich-text-editor>
            
            <!-- Visualização do conteúdo formatado no modo visualização -->
            <div 
              v-else 
              class="quill-editor-container modo-visualizacao"
              style="min-height: 90px;"
            >
              <div class="ql-container ql-snow">
                <div class="ql-editor form-input" v-html="regrasContent || 'Não preenchido'"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Aba 4: Banco de dados -->
        <div v-if="tabAtiva === 3" class="modal-section" ref="abaConteudo3">
          <div class="modal-form-group">
            <label for="req-banco" :class="['modal-form-label', isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light']">
              Mudança de banco
            </label>
            <div v-if="modoVisualizacao && !requisito.banco" 
              :class="['modal-empty-field modal-empty-field-tall', isDarkMode ? 'modal-empty-field-dark' : 'modal-empty-field-light']"
              style="min-height: 200px; padding: 0.7rem;"
            >
              <em :class="isDarkMode ? 'modal-empty-text-dark' : 'modal-empty-text-light'">Não preenchido</em>
            </div>
            
            <!-- Editor de texto rico -->
            <rich-text-editor
              v-else-if="!modoVisualizacao"
              :value="bancoContent"
              :disabled="modoVisualizacao"
              :placeholder="'Descreva as mudanças no banco de dados'"
              :tabIndex="tabIndexes.banco"
              @input="updateBancoContent"
              @change="updateBancoContent"
              @editor-ready="onBancoEditorReady"
              @tab-pressed="handleBancoTab"
              id="banco-editor"
            ></rich-text-editor>
            
            <!-- Visualização do conteúdo formatado no modo visualização -->
            <div 
              v-else 
              class="quill-editor-container modo-visualizacao"
              style="min-height: 200px;"
            >
              <div class="ql-container ql-snow">
                <div class="ql-editor form-input" v-html="bancoContent || 'Não preenchido'"></div>
              </div>
            </div>
          </div>
        </div>
      
      <!-- Rodapé do modal com botões -->
      <div :class="['modal-footer', isDarkMode ? 'modal-footer-dark' : 'modal-footer-light']">
        <!-- No modo visualização, mostrar apenas o botão Voltar -->
        <template v-if="modoVisualizacao">
          <button
            @click="fecharModal"
            type="button"
            class="modal-btn modal-btn-primary"
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
            class="modal-btn modal-btn-secondary"
            :tabindex="tabIndexes.btnCancelar"
            ref="btnCancelar"
          >
            Cancelar
          </button>
          <button
            @click="salvarRequisito"
            type="button"
            class="modal-btn modal-btn-primary"
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
