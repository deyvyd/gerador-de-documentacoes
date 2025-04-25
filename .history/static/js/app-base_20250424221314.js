// app-base.js - Arquivo base com funcionalidades comuns para app.js e app-dev.js

// Configuração inicial do Vue
window.AppBase = (function () {
  // Serviço de notificação compartilhado
  const createNotificationService = () => {
    return {
      toasts: [],
      show(message, type = "info", duration = 3000) {
        const id = Date.now();
        this.toasts.push({ id, message, type });
        setTimeout(() => this.closeToast(id), duration);
      },
      closeToast(id) {
        const index = this.toasts.findIndex((toast) => toast.id === id);
        if (index !== -1) {
          this.toasts.splice(index, 1);
        }
      },
    };
  };

  // Dados iniciais compartilhados
  const getInitialData = () => {
    return {
      isDark: true,
      isLoading: false,
      formData: {
        numeroSS: "",
        anoSS: new Date().getFullYear().toString(),
        iniciaisAutor: "",
        tituloSS: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
        linkBoard: "",
        gerarJson: true, // JSON sempre marcado por padrão
        gerarDocx: false, // DOCX desmarcado por padrão
        gerarPdf: false, // PDF desmarcado por padrão
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
      notificationService: createNotificationService(),

      // Estados do modal de confirmação
      showMessageModal: false,
      messageTitle: "",
      messageContent: "",
      messageCallback: null,
      messageCancelCallback: null,
    };
  };

  // Componentes compartilhados
  const getSharedComponents = () => {
    return {
      "swap-button": window.AppComponents.SwapButton,
      "theme-toggle": window.AppComponents.ThemeToggle,
      "upload-button": window.AppComponents.UploadButton,
      "info-button": window.AppComponents.InfoButton,
      "app-header": window.AppComponents.AppHeader,
      "page-header": window.AppComponents.PageHeader,
      "basic-form-section": window.AppComponents.BasicFormSection,
      "data-table": window.AppComponents.DataTable,
      "form-submit-section": window.AppComponents.FormSubmitSection,
      "modal-requisito": window.AppComponents.ModalRequisito,
      "modal-message": window.AppComponents.ModalMessage,
      "toast-notification": window.AppComponents.ToastNotification,
    };
  };

  // Computadas compartilhadas
  const getSharedComputed = () => {
    return {
      filteredAutores() {
        return this.filterAutores();
      },
    };
  };

  // Métodos compartilhados
  const methods = {
    // ===== Gerenciamento de tema =====
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

    // Método para processar o arquivo JSON importado
    processImportedJSON(data) {
      try {
        // Validação básica da estrutura do JSON
        if (!data || typeof data !== "object") {
          this.notificationService.show("Formato de arquivo inválido", "error");
          return;
        }

        // Verifica o tipo do JSON importado
        const tipoJSON = data.tipo || "desconhecido";

        // Determina o tipo da aplicação atual baseado na URL ou na presença de certos componentes
        let tipoAplicacao = "tecnica"; // Padrão

        // Verifica se estamos na aplicação de desenvolvimento
        if (
          window.location.pathname.includes("/dev") ||
          this.requisitos !== undefined
        ) {
          tipoAplicacao = "desenvolvimento";
        }

        if (tipoJSON === "desenvolvimento") {
          // Escolher a fonte correta para preencher os autores
          let iniciaisAutorParaProcessar = null;

          // Prioridade: modificação > criação > padrão
          if (data.info.iniciaisAutorModificacao) {
            iniciaisAutorParaProcessar = data.info.iniciaisAutorModificacao;
          } else if (data.info.iniciaisAutorCriacao) {
            iniciaisAutorParaProcessar = data.info.iniciaisAutorCriacao;
          } else if (data.info.iniciaisAutor) {
            iniciaisAutorParaProcessar = data.info.iniciaisAutor;
          }

          // Se encontramos algum valor para usar
          if (iniciaisAutorParaProcessar) {
            this.processarAutoresFromIniciais(iniciaisAutorParaProcessar);
          }

          // Guardar os valores originais para uso posterior
          if (data.info.dataCriacao) {
            this.dataCriacao = data.info.dataCriacao;
          }

          if (data.info.iniciaisAutorCriacao) {
            this.iniciaisAutorCriacao = data.info.iniciaisAutorCriacao;
          }

          if (data.info.dataModificacao) {
            this.dataModificacao = data.info.dataModificacao;
          }

          if (data.info.iniciaisAutorModificacao) {
            this.iniciaisAutorModificacao = data.info.iniciaisAutorModificacao;
          }
        } else {
          // Para documentos técnicos, usar o comportamento original
          if (data.info.iniciaisAutor) {
            this.processarAutoresFromIniciais(data.info.iniciaisAutor);
          }
        }

        // Verifica se o tipo do JSON é compatível com a aplicação atual
        if (tipoJSON !== "desconhecido" && tipoJSON !== tipoAplicacao) {
          this.notificationService.show(
            `Este JSON é para documentação "${tipoJSON}" mas a aplicação atual é para documentação "${tipoAplicacao}".`,
            "error"
          );
          return;
        }

        // Processar dados básicos da SS
        if (data.info) {
          // Mapear os campos
          const fieldsMapping = {
            numeroSS: "numeroSS",
            anoSS: "anoSS",
            tituloSS: "tituloSS",
            descricao: "descricao",
            dataInicio: "dataInicio",
            dataFim: "dataFim",
            totalHoras: "totalHoras",
            linkBoard: "linkBoard",
            iniciaisAutor: "iniciaisAutor",
          };

          // Preencher formData com os dados importados
          for (const [jsonField, formField] of Object.entries(fieldsMapping)) {
            if (data.info[jsonField] !== undefined) {
              this.formData[formField] = data.info[jsonField];
            }
          }

          // Processar autores se existirem
          if (data.info.iniciaisAutor) {
            // Lógica para processar autores baseado nas iniciais
            this.processarAutoresFromIniciais(data.info.iniciaisAutor);
          }
        }

        // Processar atividades se existirem e se o app atual suportar
        if (
          data.atividades &&
          Array.isArray(data.atividades) &&
          this.atividades !== undefined
        ) {
          this.atividades = [...data.atividades];
        }

        // Processar requisitos se existirem e se o app atual suportar
        if (
          data.requisitos &&
          Array.isArray(data.requisitos) &&
          this.requisitos !== undefined
        ) {
          this.requisitos = [...data.requisitos];
        }

        // Processar requisitos não funcionais se existirem e se o app atual suportar
        if (
          data.requisitosNaoFuncionais &&
          Array.isArray(data.requisitosNaoFuncionais) &&
          this.listaRequisitosNaoFuncionais !== undefined
        ) {
          this.listaRequisitosNaoFuncionais = [...data.requisitosNaoFuncionais];
        }

        // Processar pontos de função se existirem e se o app atual suportar
        if (
          data.totalPontosFuncao !== undefined &&
          this.totalPontosFuncao !== undefined
        ) {
          this.totalPontosFuncao = data.totalPontosFuncao;
          this.totalPontosFuncaoFormatado = data.totalPontosFuncao
            .toString()
            .replace(".", ",");
        }

        this.notificationService.show(
          "Dados importados com sucesso!",
          "success"
        );
      } catch (error) {
        console.error("Erro ao processar dados JSON:", error);
        this.notificationService.show("Erro ao processar o arquivo", "error");
      }
    },

    // Método auxiliar para processar autores a partir das iniciais
    processarAutoresFromIniciais(iniciaisStr) {
      if (!iniciaisStr) return;

      // Limpar seleção de autores atual
      this.selectedAutores = [];

      // Possíveis separadores: "e", "," ou espaço
      let iniciais = [];

      if (iniciaisStr.includes(" e ")) {
        // Formato: "ABC e DEF" ou "ABC, DEF e GHI"
        const parts = iniciaisStr.split(" e ");
        const lastPart = parts.pop(); // Pega o último após o "e"

        // Processa a primeira parte que pode conter vírgulas
        if (parts.length > 0) {
          iniciais = parts[0].split(",").map((i) => i.trim());
        }

        // Adiciona a última parte
        iniciais.push(lastPart.trim());
      } else if (iniciaisStr.includes(",")) {
        // Formato: "ABC, DEF, GHI"
        iniciais = iniciaisStr.split(",").map((i) => i.trim());
      } else {
        // Formato simples: "ABC" ou múltiplas iniciais separadas por espaço
        iniciais = [iniciaisStr.trim()];
      }

      // Para cada conjunto de iniciais, encontrar o autor correspondente
      iniciais.forEach((inicial) => {
        const autor = this.autoresDisponiveis.find(
          (a) => a.iniciais === inicial
        );
        if (autor) {
          this.selectedAutores.push(autor);
        }
      });

      // Atualiza o campo iniciaisAutor no formData
      this.updateFormDataAutores();
    },

    // ===== Gerenciamento de autores =====
    handleAutorInputUpdate(value) {
      this.autorInput = value;
      this.showSuggestions = true;
    },

    toggleSuggestions(show) {
      this.showSuggestions = show;
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

    removeAutor(autor) {
      const index = this.selectedAutores.findIndex(
        (a) => a.nome === autor.nome
      );
      if (index !== -1) {
        this.selectedAutores.splice(index, 1);
        this.updateFormDataAutores();
      }
    },

    handleBackspace() {
      // Se o input estiver vazio e houver autores selecionados
      if (this.autorInput === "" && this.selectedAutores.length > 0) {
        // Remove o último autor da lista
        this.selectedAutores.pop();
        // Atualiza as iniciais dos autores no formData
        this.updateFormDataAutores();
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

    // ===== Métodos para o modal de confirmação =====
    mostrarModalMensagem(
      titulo,
      mensagem,
      callbackConfirmar,
      callbackCancelar = null
    ) {
      this.messageTitle = titulo;
      this.messageContent = mensagem;
      this.messageCallback = callbackConfirmar;
      this.messageCancelCallback = callbackCancelar;
      this.showMessageModal = true;

      // Adicionar classe para bloquear rolagem do body
      document.body.classList.add("modal-open");
    },

    confirmarModalMensagem() {
      if (this.messageCallback) {
        this.messageCallback();
      }
      this.showMessageModal = false;

      // Remover classe para permitir rolagem do body novamente
      document.body.classList.remove("modal-open");
    },

    cancelarModalMensagem() {
      if (this.messageCancelCallback) {
        this.messageCancelCallback();
      }
      this.showMessageModal = false;

      // Remover classe para permitir rolagem do body novamente
      document.body.classList.remove("modal-open");
    },

    // ===== Validação e formatação =====
    formatSS() {
      if (this.formData.numeroSS) {
        this.formData.numeroSS = this.formData.numeroSS.padStart(3, "0");
      }
    },

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
      }
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

    // ===== Gerenciamento de formulário e submissão =====
    validarCamposObrigatorios() {
      // Validação dos campos obrigatórios
      const basicFormSection = this.$refs.basicFormSection;
      if (!basicFormSection) {
        console.error("Componente BasicFormSection não encontrado");
        this.notificationService.show("Erro ao acessar o formulário", "error");
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
            this.notificationService.show(
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
          this.notificationService.show(
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
        this.notificationService.show("Selecione pelo menos um autor", "error");
        this.isLoading = false;
        return false;
      }

      return true;
    },

    // ===== Operações de submissão =====
    prepareFormData(onlyJson = false, tipo = "tecnica") {
      const formData = new FormData();

      // Adiciona o tipo de documento
      formData.append("tipo", tipo);

      // Adiciona formatos ao FormData
      formData.append("gerar_json", "true");
      formData.append(
        "gerar_docx",
        onlyJson ? "false" : this.formData.gerarDocx ? "true" : "false"
      );
      formData.append(
        "gerar_pdf",
        onlyJson ? "false" : this.formData.gerarPdf ? "true" : "false"
      );
      formData.append("apenas_json", onlyJson ? "true" : "false");

      // Adiciona dados básicos da SS
      formData.append("numeroSS", this.formData.numeroSS);
      formData.append("anoSS", this.formData.anoSS);
      formData.append("iniciaisAutor", this.formData.iniciaisAutor);
      formData.append("tituloSS", this.formData.tituloSS);
      formData.append("descricao", this.formData.descricao);
      formData.append("dataInicio", this.formData.dataInicio);
      formData.append("dataFim", this.formData.dataFim);
      formData.append("linkBoard", this.formData.linkBoard);

      // Adicionar campos de criação e modificação, se existirem
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

      return formData;
    },

    // Hook lifecycle comum
    initTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) {
        this.isDark = savedTheme === "dark";
      } else {
        // Verificar preferência do sistema
        if (
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
        ) {
          this.isDark = true;
        } else {
          this.isDark = false;
        }
      }
      this.updateTheme();
    },
  };

  // Comportamentos do ciclo de vida compartilhados
  const mountHook = function () {
    this.initTheme();
  };

  // Retorna API pública
  return {
    getInitialData,
    getSharedComponents,
    getSharedComputed,
    methods,
    mountHook,
    createNotificationService,
  };
})();
