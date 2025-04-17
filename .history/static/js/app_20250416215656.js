// Criação da aplicação Vue
const { createApp } = Vue;

// Serviço de notificação
const notificationService = {
  toasts: [],
  showToast(message, type = "info", duration = 3000) {
    const id = Date.now();
    const toast = { id, message, type };
    this.toasts.push(toast);
    setTimeout(() => this.closeToast(id), duration);
  },
  closeToast(id) {
    const index = this.toasts.findIndex((toast) => toast.id === id);
    if (index !== -1) {
      this.toasts.splice(index, 1);
    }
  },
};

const app = createApp({
  data() {
    return {
      isDark: true,
      editingIndex: null,
      sortable: null,
      sortableInitialized: false,
      sortableTimeout: null,
      sortableInstance: null,
      isDestroying: false,
      formData: {
        numeroSS: "",
        anoSS: new Date().getFullYear(),
        iniciaisAutor: "",
        tituloSS: "",
        dataInicio: "",
        dataFim: "",
        linkBoard: "",
        descricao: "",
        gerarJson: true, // JSON sempre marcado por padrão
        gerarDocx: true, // DOCX marcado por padrão
        gerarPdf: false, // PDF desmarcado por padrão
      },
      novaAtividade: {
        nome: "",
        horas: "",
      },
      atividades: [],
      isLoading: false,
      status: {
        message: "",
        type: "info",
      },
      autorInput: "",
      selectedAutores: [],
      showSuggestions: false,
      autoresDisponiveis: [
        { nome: "Carlos Henrique Bezerra de Azevedo", iniciais: "CHB" },
        { nome: "Danilo Mikael Costa Barros", iniciais: "DMC" },
        { nome: "Deyvyd Moura Fé e Sousa Araújo", iniciais: "DMF" },
        { nome: "Fernanda da Silva Caldas", iniciais: "FSC" },
        { nome: "Flávio Mata Davim", iniciais: "FMD" },
        { nome: "Joilson Vidal Abrantes", iniciais: "JVA" },
        { nome: "Jonathan Batista de Oliveira Silva", iniciais: "JBO" },
        { nome: "João Filipe do Nascimento e Silva", iniciais: "JFN" },
        { nome: "João Paulo Victor Martin Sousa", iniciais: "JPS" },
        { nome: "Júlio Gusmão Carlos de Mendonça", iniciais: "JGC" },
        { nome: "Marcos Antônio Cavalcanti Junior", iniciais: "MAC" },
        { nome: "Moises Viana dos Santos", iniciais: "MVS" },
        { nome: "Paulla Rachel Gomes de Oliveira", iniciais: "PRO" },
      ],
      highlightedIndex: 0,
      notificationService: {
        toasts: [],
        show(message, type = "info") {
          const id = Date.now();
          this.toasts.push({ id, message, type });
          setTimeout(() => this.closeToast(id), 5000);
        },
        closeToast(id) {
          this.toasts = this.toasts.filter((toast) => toast.id !== id);
        },
      },
    };
  },

  components: {
    "theme-toggle": window.AppComponents.ThemeToggle,
    "info-button": window.AppComponents.InfoButton,
    "page-header": window.AppComponents.PageHeader,
    "basic-form-section": window.AppComponents.BasicFormSection,
    "data-table": window.AppComponents.DataTable,
    "form-submit-section": window.AppComponents.FormSubmitSection,
    "modal-requisito": window.AppComponents.ModalRequisito,
    "modal-message": window.AppComponents.ModalMessage,
    "toast-notification": window.AppComponents.ToastNotification,
  },

  computed: {
    totalHoras() {
      return this.atividades.reduce(
        (total, atividade) => total + (Number(atividade.horas) || 0),
        0
      );
    },
    pontosFuncao() {
      // Calcula os pontos de função: (horas / 10) * (250 / 100)
      const pf = (this.totalHoras / 10) * (250 / 100);
      // Formata para sempre mostrar 2 casas decimais
      return pf.toFixed(2);
    },
    filteredAutores() {
      return this.filterAutores();
    },
    // Propriedades para conversão de data
    dataInicioFormatada: {
      get() {
        return this.formData.dataInicio;
      },
      set(value) {
        this.formData.dataInicio = value;
      },
    },

    dataFimFormatada: {
      get() {
        return this.formData.dataFim;
      },
      set(value) {
        this.formData.dataFim = value;
      },
    },
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
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.isDark = savedTheme === "dark";
      this.updateTheme();
    }
    this.initSortable();

    // Aplica o tema inicial
    this.updateTheme();
  },

  beforeUnmount() {
    this.destroySortable();
  },

  methods: {
    aplicarErroTemporario(elemento, duracao = 3000) {
      if (!elemento) return;

      // Adiciona a classe de erro
      elemento.classList.add("campo-erro");

      // Foca no elemento para mostrar ao usuário onde está o problema
      elemento.focus();

      // Define um timeout para remover a classe após a duração especificada
      setTimeout(() => {
        elemento.classList.remove("campo-erro");
      }, duracao);

      return true;
    },

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
                    const atividades = [...this.atividades];
                    const [moved] = atividades.splice(evt.oldIndex, 1);
                    atividades.splice(evt.newIndex, 0, moved);
                    this.atividades = atividades;
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

    // Gerenciamento de tema
    toggleTheme() {
      this.isDark = !this.isDark;
      this.updateTheme();
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
    },

    updateTheme() {
      if (this.isDark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },

    handleAutorInput() {
      this.showSuggestions = true;
      this.filterAutores();
      // Reseta o índice destacado quando o input muda
      this.highlightedIndex = 0;
    },

    navigateList(direction) {
      if (!this.filteredAutores.length) return;

      if (direction === "down") {
        if (this.highlightedIndex < this.filteredAutores.length - 1) {
          this.highlightedIndex++;
        } else {
          this.highlightedIndex = 0;
        }
      } else if (direction === "up") {
        if (this.highlightedIndex > 0) {
          this.highlightedIndex--;
        } else {
          this.highlightedIndex = this.filteredAutores.length - 1;
        }
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

    handleAutorBlur(event) {
      setTimeout(() => {
        this.$emit("show-suggestions", false);
        if (this.selectedAutores.length === 0) {
          this.aplicarErroTemporarioAutores();
        }
      }, 200);
    },

    handleBackspace(event) {
      // Se o input estiver vazio e houver autores selecionados
      if (this.autorInput === "" && this.selectedAutores.length > 0) {
        // Remove o último autor da lista
        this.selectedAutores.pop();
        // Atualiza as iniciais dos autores no formData
        this.updateFormDataAutores();
      }
    },

    // Função para remover acentos de autores para uma busca mais abrangente
    normalizeString(str) {
      return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    },

    filterAutores() {
      // Se não houver valor no input de autor, retornar array vazio
      if (!this.autorInput.trim()) return [];

      // Normaliza o termo de busca (remove acentos e converte para minúsculo)
      const searchTerm = this.normalizeString(this.autorInput.toLowerCase());

      // Filtra autores disponíveis que contêm o termo de busca e não estejam já selecionados
      return this.autoresDisponiveis.filter((autor) => {
        // Normaliza o nome do autor para comparação
        const normalizedName = this.normalizeString(autor.nome.toLowerCase());

        return (
          normalizedName.includes(searchTerm) &&
          !this.selectedAutores.some((selected) => selected.nome === autor.nome)
        );
      });
    },

    selectAutor(autor) {
      if (
        !this.selectedAutores.some((selected) => selected.nome === autor.nome)
      ) {
        this.selectedAutores.push(autor);
        this.autorInput = ""; // Limpa o input
        this.updateFormDataAutores(); // Atualiza as iniciais

        // Mantém o estado das sugestões, mas limpa o valor do input
        this.$nextTick(() => {
          const basicFormSection = this.$refs.basicFormSection;
          if (basicFormSection && basicFormSection.$refs.autorInput) {
            basicFormSection.$refs.autorInput.focus();
          }
        });
      }
    },

    handleAutorInputUpdate(value) {
      this.autorInput = value;
      // Forçar atualização das sugestões filtradas
      this.showSuggestions = true;
    },

    toggleSuggestions(show) {
      this.showSuggestions = show;
    },

    removeAutor(autor) {
      const index = this.selectedAutores.findIndex(
        (a) => a.nome === autor.nome
      );
      if (index !== -1) {
        this.selectedAutores.splice(index, 1);
        this.updateFormDataAutores();
      }
    },

    addAutor(event) {
      const filtered = this.filteredAutores;
      if (filtered.length > 0) {
        this.selectAutor(filtered[0]);
      }
    },

    updateFormDataAutores() {
      // Verifica se há autores selecionados
      if (this.selectedAutores.length === 0) {
        this.formData.iniciaisAutor = "";
        return;
      }

      // Se for apenas um autor, usa as iniciais normalmente
      if (this.selectedAutores.length === 1) {
        this.formData.iniciaisAutor = this.selectedAutores[0].iniciais;
        return;
      }

      // Se forem dois autores, une com 'e'
      if (this.selectedAutores.length === 2) {
        this.formData.iniciaisAutor = `${this.selectedAutores[0].iniciais} e ${this.selectedAutores[1].iniciais}`;
        return;
      }

      // Se forem mais de dois autores, une com vírgulas e 'e' no final
      const iniciais = this.selectedAutores.map((autor) => autor.iniciais);
      const ultimaIniciais = iniciais.pop();
      this.formData.iniciaisAutor = `${iniciais.join(
        ", "
      )} e ${ultimaIniciais}`;
    },

    // Gerenciamento de atividades
    adicionarAtividade() {
      if (this.novaAtividade.nome && this.novaAtividade.horas) {
        if (this.editingIndex !== null) {
          this.atividades[this.editingIndex] = { ...this.novaAtividade };
          this.editingIndex = null;
        } else {
          this.atividades.push({ ...this.novaAtividade });
        }
        this.novaAtividade = { nome: "", horas: "" };
      }
    },

    editarAtividade(index) {
      this.editingIndex = index;
      this.novaAtividade = { ...this.atividades[index] };
    },

    removerAtividade(index) {
      this.atividades.splice(index, 1);
      if (this.editingIndex === index) {
        this.novaAtividade = {
          nome: "",
          horas: "",
        };
        this.editingIndex = null;
      }
    },

    cancelarEdicao() {
      this.editingIndex = null;
      this.novaAtividade = { nome: "", horas: "" };
    },

    submitAtividade() {
      // Limpar estilos de erro anteriores
      const atividadeInput = this.$refs.atividadeInput;
      const horasInput = this.$refs.horasInput;

      if (atividadeInput) {
        atividadeInput.classList.remove("campo-erro");
      }
      if (horasInput) {
        horasInput.classList.remove("campo-erro");
      }

      // Validar se os campos obrigatórios estão preenchidos
      let isValid = true;

      if (!this.novaAtividade.nome || this.novaAtividade.nome.trim() === "") {
        if (atividadeInput) {
          this.aplicarErroTemporario(atividadeInput);
          atividadeInput.focus();
        }
        isValid = false;
      } else if (
        !this.novaAtividade.horas ||
        isNaN(this.novaAtividade.horas) ||
        this.novaAtividade.horas <= 0
      ) {
        if (horasInput) {
          this.aplicarErroTemporario(horasInput);
          horasInput.focus();
        }
        isValid = false;
      }

      // Se a validação falhar, interromper a função
      if (!isValid) {
        return;
      }

      // Desabilita o Sortable temporariamente
      this.destroySortable().then(() => {
        // Atualiza as atividades
        if (this.editingIndex !== null) {
          this.atividades[this.editingIndex] = { ...this.novaAtividade };
          this.editingIndex = null; // Reseta o índice de edição
        } else {
          this.atividades.push({ ...this.novaAtividade });
        }

        // Limpa o formulário
        this.novaAtividade = { nome: "", horas: "" };

        // Reinicializa o Sortable após a atualização do DOM
        this.$nextTick(() => {
          this.$refs.atividadeInput.focus();
          this.initSortable();
        });
      });
    },

    // Formatação de campos
    handleInput(event) {
      let value = event.target.value.replace(/\D/g, "").slice(0, 3);
      this.formData.numeroSS = value;
    },

    formatSS() {
      if (this.formData.numeroSS) {
        this.formData.numeroSS = this.formData.numeroSS.padStart(3, "0");
      }
    },

    // Método completo para geração de documento
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

      // Enviar formulário completo
      this.enviarFormularioCompleto();
    },

    // Método para validar campos obrigatórios
    validarCamposObrigatorios() {
      // Validação dos campos obrigatórios
      const basicFormSection = this.$refs.basicFormSection;
      if (!basicFormSection) {
        console.error("Componente BasicFormSection não encontrado");
        notificationService.showToast("Erro ao acessar o formulário", "error");
        this.isLoading = false;
        return false;
      }

      // Lista de validações de campos obrigatórios
      const camposObrigatorios = [
        { ref: "numeroSS", label: "Número SS" },
        { ref: "tituloSS", label: "Título" },
        { ref: "descricao", label: "Descrição" },
        { ref: "dataInicio", label: "Data de Início" },
        { ref: "dataFim", label: "Data de Fim" },
      ];

      for (const campo of camposObrigatorios) {
        const valor = this.formData[campo.ref];
        if (!valor || valor.trim() === "") {
          const elemento = basicFormSection.$refs[campo.ref];
          if (elemento) {
            this.aplicarErroTemporario(elemento);
            notificationService.showToast(
              `O campo ${campo.label} é obrigatório`,
              "error"
            );
            this.isLoading = false;
            return false;
          }
        }
      }

      // Validação das datas
      const dataInicio = new Date(this.formData.dataInicio);
      const dataFim = new Date(this.formData.dataFim);

      if (dataInicio > dataFim) {
        const elemento = basicFormSection.$refs.dataInicio;
        if (elemento) {
          this.aplicarErroTemporario(elemento);
          notificationService.showToast(
            "A data de início não pode ser posterior à data de fim",
            "error"
          );
          this.isLoading = false;
          return false;
        }
      }

      // Validação de autores
      if (this.selectedAutores.length === 0) {
        this.aplicarErroTemporarioAutores();
        notificationService.showToast("Selecione pelo menos um autor", "error");
        this.isLoading = false;
        return false;
      }

      // Validação de atividades
      if (this.atividades.length === 0) {
        // Verifica se os campos de nova atividade estão preenchidos
        if (!this.validarCamposAtividade()) {
          return false;
        }
      }

      return true;
    },

    validarCamposAtividade() {
      const atividadeInput = this.$refs.atividadeInput;
      const horasInput = this.$refs.horasInput;
      const atividadeBtn = this.$refs.activityButton;
      const adicionarBtn = document.querySelector(".activity-form .btn");

      // Caso 1: Campo de atividade vazio
      if (!this.novaAtividade.nome || this.novaAtividade.nome.trim() === "") {
        if (atividadeInput) {
          this.aplicarErroTemporario(atividadeInput);
          atividadeInput.focus();
          notificationService.showToast(
            "Adicione pelo menos uma atividade",
            "error"
          );
          this.isLoading = false;
          return false;
        }
      }
      // Caso 2: Campo de horas vazio
      else if (
        !this.novaAtividade.horas ||
        isNaN(this.novaAtividade.horas) ||
        this.novaAtividade.horas <= 0
      ) {
        if (horasInput) {
          this.aplicarErroTemporario(horasInput);
          horasInput.focus();
          notificationService.showToast(
            "Informe o número de horas para a atividade",
            "error"
          );
          this.isLoading = false;
          return false;
        }
      }
      // Caso 3: Ambos preenchidos, mas não adicionados à lista
      else if (adicionarBtn) {
        // Destaca o botão Adicionar
        horasInput.classList.remove("campo-erro");
        adicionarBtn.classList.add("btn-erro");
        atividadeBtn.focus();
        setTimeout(() => {
          adicionarBtn.classList.remove("btn-erro");
        }, 2000);

        notificationService.showToast(
          "Clique em 'Adicionar' para incluir a atividade na lista",
          "error"
        );
        this.isLoading = false;
        return false;
      } else {
        // Fallback genérico
        notificationService.showToast(
          "Adicione pelo menos uma atividade",
          "error"
        );
        this.isLoading = false;
        return false;
      }

      return true;
    },

    // Método para enviar apenas o JSON
    enviarFormularioParaJSON() {
      this.isLoading = true;
      this.status.message = ""; // Limpa mensagens anteriores

      try {
        // Prepara o FormData para envio
        const formData = new FormData();

        // Adiciona formatos ao FormData
        formData.append("gerar_json", "true");
        formData.append("gerar_docx", "false");
        formData.append("gerar_pdf", "false");
        formData.append("apenas_json", "true");

        // Adiciona dados básicos da SS sempre
        formData.append("numeroSS", this.formData.numeroSS);
        formData.append("anoSS", this.formData.anoSS);
        formData.append("iniciaisAutor", this.formData.iniciaisAutor);
        formData.append("tituloSS", this.formData.tituloSS);
        formData.append("descricao", this.formData.descricao);
        formData.append("dataInicio", this.formData.dataInicio);
        formData.append("dataFim", this.formData.dataFim);
        formData.append("linkBoard", this.formData.linkBoard);

        // Adiciona atividades ao FormData
        formData.append("atividades", JSON.stringify(this.atividades));

        // Adiciona total de horas
        formData.append("totalHoras", this.totalHoras.toString());

        // Notifica o usuário que estamos processando
        this.notificationService.show("Gerando JSON...", "info");

        // Captura referências para evitar problemas de escopo com "this"
        const self = this;

        // Envia a requisição
        fetch("/gerar_relatorio", {
          method: "POST",
          body: formData,
        })
          .then(function (response) {
            if (!response.ok) {
              // Tenta obter mensagem de erro, se disponível
              return response
                .json()
                .then(function (data) {
                  throw new Error(data.error || "Erro ao gerar JSON");
                })
                .catch(function () {
                  throw new Error(
                    `Erro ${response.status}: ${response.statusText}`
                  );
                });
            }

            // Para variáveis que serão usadas fora deste bloco
            window.lastResponse = response;

            // Especificamente para JSON, tratamos como download de arquivo
            return response.blob();
          })
          .then(function (blob) {
            // Criar URL do blob e link para download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            // Determinar nome do arquivo
            let filename = `SS ${self.formData.numeroSS.padStart(3, "0")}-${
              self.formData.anoSS
            }.json`;

            // Tentar obter nome do cabeçalho Content-Disposition
            const response = window.lastResponse;
            if (response && response.headers) {
              const contentDisposition = response.headers.get(
                "Content-Disposition"
              );
              if (contentDisposition) {
                const filenameMatch =
                  contentDisposition.match(/filename="(.+)"/);
                if (filenameMatch && filenameMatch[1]) {
                  filename = filenameMatch[1];
                }
              }
            }

            // Configurar download
            a.download = filename;
            document.body.appendChild(a);

            // Usar setTimeout para evitar problemas de fechamento de canal
            setTimeout(function () {
              a.click();

              // Limpeza após um pequeno delay
              setTimeout(function () {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                self.notificationService.show(
                  "Arquivo JSON gerado com sucesso!",
                  "success"
                );
              }, 100);
            }, 100);
          })
          .catch(function (error) {
            console.error("Erro:", error);
            self.notificationService.show(
              error.message || "Erro ao gerar JSON",
              "error"
            );
          })
          .finally(function () {
            self.isLoading = false;
            delete window.lastResponse; // Limpa a referência temporária
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

    // Método para enviar o formulário completo
    enviarFormularioCompleto() {
      this.isLoading = true;

      try {
        // Prepara o FormData para envio
        const formData = new FormData();

        // Adiciona formatos ao FormData
        formData.append("gerar_json", "true"); // JSON sempre true
        formData.append(
          "gerar_docx",
          this.formData.gerarDocx ? "true" : "false"
        );
        formData.append("gerar_pdf", this.formData.gerarPdf ? "true" : "false");
        formData.append("apenas_json", "false");

        // Adiciona dados básicos da SS
        formData.append("numeroSS", this.formData.numeroSS);
        formData.append("anoSS", this.formData.anoSS);
        formData.append("iniciaisAutor", this.formData.iniciaisAutor);
        formData.append("tituloSS", this.formData.tituloSS);
        formData.append("descricao", this.formData.descricao);
        formData.append("dataInicio", this.formData.dataInicio);
        formData.append("dataFim", this.formData.dataFim);
        formData.append("linkBoard", this.formData.linkBoard);

        // Adiciona atividades ao FormData
        formData.append("atividades", JSON.stringify(this.atividades));

        // Adiciona total de horas
        formData.append("totalHoras", this.totalHoras.toString());

        // Notifica o usuário que estamos processando
        notificationService.showToast("Gerando documentos...", "info");

        // Envia a requisição
        fetch("/gerar_relatorio", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => {
                throw new Error(data.error || "Erro ao gerar documento");
              });
            }
            return response.blob();
          })
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            // Obtém o nome sugerido do arquivo do cabeçalho Content-Disposition
            const contentDisposition = response.headers.get(
              "Content-Disposition"
            );
            let filename = "documentos.zip";
            if (contentDisposition) {
              const filenameMatch = contentDisposition.match(/filename="(.+)"/);
              if (filenameMatch && filenameMatch[1]) {
                filename = filenameMatch[1];
              }
            }

            a.download = filename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            notificationService.showToast(
              "Documento gerado com sucesso!",
              "success"
            );
          })
          .catch((error) => {
            console.error("Erro:", error);
            notificationService.showToast(
              error.message || "Erro ao gerar documento",
              "error"
            );
          })
          .finally(() => {
            this.isLoading = false;
          });
      } catch (error) {
        console.error("Erro:", error);
        notificationService.showToast(
          error.message || "Erro ao gerar documento",
          "error"
        );
        this.isLoading = false;
      }
    },

    pdateDocx(checked) {
      this.formData.gerarDocx = checked;
    },

    updatePdf(checked) {
      this.formData.gerarPdf = checked;
    },

    // Método para limpar estilos de erro dos campos
    resetFieldErrors() {
      // Limpar estilos de erro dos elementos dentro do BasicFormSection
      const basicFormSection = this.$refs.basicFormSection;
      if (basicFormSection) {
        // Limpar refs individuais
        const refs = [
          "numeroSS",
          "tituloSS",
          "descricao",
          "dataInicio",
          "dataFim",
        ];
        refs.forEach((ref) => {
          const elemento = basicFormSection.$refs[ref];
          if (elemento) {
            elemento.classList.remove("campo-erro");
          }
        });

        // Limpar o container de autores
        this.resetAutorFieldError();

        // Limpar o container de atividades
        this.resetAtividadeFieldError();
      }

      // Limpar mensagens de status
      this.status.message = "";
      this.status.type = "";
    },

    resetAutorFieldError() {
      const basicFormSection = this.$refs.basicFormSection;
      if (!basicFormSection) return;

      // Tentar diferentes seletores para encontrar o container de autores
      const selectors = [".form-group:nth-child(4) .form-input"];

      for (const selector of selectors) {
        const container = basicFormSection.$el.querySelector(selector);
        if (container) {
          container.classList.remove("campo-erro");
          return;
        }
      }

      // Se os seletores não funcionarem, tentar encontrar pelo texto do label
      const labels = basicFormSection.$el.querySelectorAll("label");
      for (const label of labels) {
        if (label.textContent.includes("Autor(es)")) {
          const container =
            label.nextElementSibling?.querySelector(".form-input");
          if (container) {
            container.classList.remove("campo-erro");
            return;
          }
        }
      }
    },

    resetAtividadeFieldError() {
      // Encontrar o container de atividades
      const atividadeContainer = document.querySelector(
        ".activity-form .form-group .form-input"
      );
      if (atividadeContainer) {
        atividadeContainer.classList.remove("campo-erro");
      }
    },

    aplicarErroTemporarioAutores(duracao = 3000) {
      const basicFormSection = this.$refs.basicFormSection;
      if (!basicFormSection) return false;

      // Tentativa direta usando querySelector com a nova classe
      let inputContainer =
        basicFormSection.$el.querySelector(".autor-container");

      // Se não encontrar, tenta alternativas
      if (!inputContainer) {
        // Buscar pelo container de autor usando sua posição relativa
        const formGroups = basicFormSection.$el.querySelectorAll(".form-group");
        // O campo de autor geralmente é o 4º form-group
        const autorFormGroup = Array.from(formGroups).find(
          (group) =>
            group.querySelector("label") &&
            group.querySelector("label").textContent.includes("Autor")
        );

        if (autorFormGroup) {
          inputContainer =
            autorFormGroup.querySelector(".form-input") ||
            autorFormGroup.querySelector(".author-input-area");
        }
      }

      if (!inputContainer) return false;

      // Aplicar a classe de erro
      inputContainer.classList.add("campo-erro");

      // Focar no campo
      const autorInput = basicFormSection.$refs.autorInput;
      if (autorInput) {
        autorInput.focus();
      }

      // Remover a classe após o tempo definido
      setTimeout(() => {
        inputContainer.classList.remove("campo-erro");
      }, duracao);

      return true;
    },
  },
});

// Registro da diretiva Maska
app.directive("maska", Maska.vMaska);

// Montagem da aplicação
app.mount("#app");
