// src/mixins/appBase.js
export default {
  data() {
    const createNotificationService = () => {
      return {
        toasts: [],
        notificationHistory: [], // NOVO

        show: (message, type = "info", duration = 3000) => {
          const id = Date.now() + Math.random();

          // NOVO: Criar notificação para o histórico
          const notification = {
            id,
            message,
            type,
            timestamp: new Date(),
            read: false,
          };

          // NOVO: Adicionar ao histórico
          this.notificationService.notificationHistory.unshift(notification);

          // NOVO: Limitar histórico a 100 notificações
          if (this.notificationService.notificationHistory.length > 100) {
            this.notificationService.notificationHistory =
              this.notificationService.notificationHistory.slice(0, 100);
          }

          // Comportamento original: adicionar ao toast
          this.notificationService.toasts.push({ id, message, type });
          setTimeout(() => this.notificationService.closeToast(id), duration);
        },

        closeToast: (id) => {
          const index = this.notificationService.toasts.findIndex(
            (toast) => toast.id === id
          );
          if (index !== -1) {
            this.notificationService.toasts.splice(index, 1);
          }
        },

        // NOVOS MÉTODOS
        markAsRead: (notificationId) => {
          const notification =
            this.notificationService.notificationHistory.find(
              (n) => n.id === notificationId
            );
          if (notification) {
            notification.read = true;
          }
        },

        markAllAsRead: () => {
          this.notificationService.notificationHistory.forEach(
            (n) => (n.read = true)
          );
        },

        removeFromHistory: (notificationId) => {
          const index = this.notificationService.notificationHistory.findIndex(
            (n) => n.id === notificationId
          );
          if (index > -1) {
            this.notificationService.notificationHistory.splice(index, 1);
          }
        },

        clearHistory: () => {
          this.notificationService.notificationHistory.splice(0);
        },
      };
    };
    return {
      notificationService: createNotificationService(),
      isDark: true,
      isLoading: false,
      formData: {
        numeroSS: "",
        anoSS: new Date().getFullYear().toString(),
        sistema: "",
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
      messageType: "caution",
      messageConfirmButtonText: "Remover",
    };
  },
  computed: {
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
  methods: {
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

    checkForImportConfirmation() {
      // Verifica se há dados preenchidos
      const hasFilledData = this.hasFilledData();

      if (hasFilledData) {
        // Se há dados, mostra o modal de confirmação
        this.mostrarModalMensagem(
          "Confirmar Importação",
          "Existem dados preenchidos nos campos. Importar um novo arquivo substituirá todos esses dados. Deseja continuar?",
          () => {
            // Callback para quando o usuário confirmar
            if (this.$refs.uploadButton) {
              this.$refs.uploadButton.openFileSelector();
            } else {
              const uploadButton = document.querySelector(".upload-toggle");
              if (uploadButton && uploadButton.__vueRef) {
                uploadButton.__vueRef.openFileSelector();
              }
            }
          },
          null,
          "warning", // Tipo alterado para warning
          "Continuar" // Botão primário alterado para "Continuar"
        );
      } else {
        // Se não há dados, abre o seletor diretamente
        if (this.$refs.uploadButton) {
          this.$refs.uploadButton.openFileSelector();
        } else {
          const uploadButton = document.querySelector(".upload-toggle");
          if (uploadButton && uploadButton.__vueRef) {
            uploadButton.__vueRef.openFileSelector();
          }
        }
      }
    },

    hasFilledData() {
      // Verifica se há dados básicos preenchidos
      if (
        this.formData.numeroSS ||
        this.formData.sistema ||
        this.formData.tituloSS ||
        this.formData.descricao ||
        this.formData.dataInicio ||
        this.formData.dataFim ||
        this.formData.linkBoard
      ) {
        return true;
      }

      // Verifica se há autores selecionados
      if (this.selectedAutores && this.selectedAutores.length > 0) {
        return true;
      }

      // Verifica se há atividades (para o app técnico)
      if (this.atividades && this.atividades.length > 0) {
        return true;
      }

      // Verifica se há requisitos (para o app de desenvolvimento)
      if (this.requisitos && this.requisitos.length > 0) {
        return true;
      }

      // Verifica requisitos não funcionais (para o app de desenvolvimento)
      if (
        this.listaRequisitosNaoFuncionais &&
        this.listaRequisitosNaoFuncionais.length > 0
      ) {
        return true;
      }

      // Se chegou aqui, não há dados preenchidos
      return false;
    },

    handleSwapRequested(targetUrl) {
      // Verificar se há dados preenchidos
      const hasFilledData = this.hasFilledData();

      if (hasFilledData) {
        // Se há dados, mostra o modal de confirmação
        this.mostrarModalMensagem(
          "Confirmar troca do tipo de documentação",
          "Existem dados preenchidos nos campos. Trocar o tipo de documentação fará com que todos esses dados sejam perdidos. Deseja continuar?",
          () => {
            // Callback para quando o usuário confirmar - redireciona para a URL alvo
            window.location.href = targetUrl;
          },
          null, // Callback para cancelamento
          "warning", // Tipo alterado para warning
          "Continuar" // Botão primário alterado para "Continuar"
        );
      } else {
        // Se não há dados, navega diretamente
        window.location.href = targetUrl;
      }
    },

    // Método para processar o arquivo JSON importado
    processImportedJSON(data) {
      // Resetar campos padrão
      this.defaultFields = {
        tipo: null,
        local: null,
        usuario: null,
        perfil: null,
      };

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

        // Verifica se o tipo do JSON é compatível com a aplicação atual
        if (tipoJSON !== "desconhecido" && tipoJSON !== tipoAplicacao) {
          if (tipoJSON === "tecnica") {
            this.notificationService.show(
              "Este JSON é para Documentação Técnica, mas a tela atual é para Documentação de Desenvolvimento.",
              "error"
            );
          } else {
            this.notificationService.show(
              "Este JSON é para Documentação de Desenvolvimento, mas a tela atual é para Documentação Técnica.",
              "error"
            );
          }
          return;
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

        // Processar dados básicos da SS
        if (data.info) {
          // Mapear os campos
          const fieldsMapping = {
            numeroSS: "numeroSS",
            anoSS: "anoSS",
            sistema: "sistema",
            tituloSS: "tituloSS",
            descricao: "descricao",
            //dataInicio: "dataInicio",
            //dataFim: "dataFim",
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

          // Processamento especial para datas (converter de DD/MM/YYYY para YYYY-MM-DD)
          if (data.info.dataInicio) {
            if (data.info.dataInicio.includes("/")) {
              // Formato brasileiro DD/MM/YYYY
              const parts = data.info.dataInicio.split("/");
              this.formData.dataInicio = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              // Já está no formato ISO YYYY-MM-DD
              this.formData.dataInicio = data.info.dataInicio;
            }
          }

          if (data.info.dataFim) {
            if (data.info.dataFim.includes("/")) {
              // Formato brasileiro DD/MM/YYYY
              const parts = data.info.dataFim.split("/");
              this.formData.dataFim = `${parts[2]}-${parts[1]}-${parts[0]}`;
            } else {
              // Já está no formato ISO YYYY-MM-DD
              this.formData.dataFim = data.info.dataFim;
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

        // Limpar histórico de notificações ao importar JSON
        this.notificationService.clearHistory();

        // Determinar o tipo de documentação para exibir na mensagem
        const tipoDocumentacao =
          tipoJSON === "desenvolvimento" ? "Desenvolvimento" : "Técnica";

        this.notificationService.show(
          `Dados da Doc. ${tipoDocumentacao} da SS ${this.formData.numeroSS}/${this.formData.anoSS} importados com sucesso!`,
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
      callbackCancelar = null,
      tipo = "caution", // Parâmetro adicional para o tipo do modal
      textoBotaoConfirmar = "Remover" // Parâmetro adicional para o texto do botão
    ) {
      this.messageTitle = titulo;
      this.messageContent = mensagem;
      this.messageCallback = callbackConfirmar;
      this.messageCancelCallback = callbackCancelar;
      this.messageType = tipo; // Nova propriedade para armazenar o tipo
      this.messageConfirmButtonText = textoBotaoConfirmar; // Nova propriedade para o texto do botão
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
      try {
        // Limpar estilos de erro dos elementos dentro do BasicFormSection
        const basicFormSection = this.$refs.basicFormSection;
        if (!basicFormSection) {
          console.warn("Componente BasicFormSection não encontrado");
          return;
        }

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
            // Verifica se é um elemento DOM ou um componente Vue
            if (elemento instanceof HTMLElement) {
              elemento.classList.remove("campo-erro");
            } else if (elemento.$el) {
              elemento.$el.classList.remove("campo-erro");
            }
          }
        });

        // Limpar o container de autores no AuthorSelector
        const authorSelector = this.$refs.authorSelector;
        if (authorSelector) {
          try {
            // Tenta limpar diretamente no componente AuthorSelector
            if (authorSelector.$el) {
              const containers = authorSelector.$el.querySelectorAll(
                ".autor-container, .author-input-area"
              );
              containers.forEach((container) => {
                container.classList.remove("campo-erro");
              });
            }

            // Se o AuthorSelector tiver um método para resetar erros, chama-o
            if (typeof authorSelector.resetErrors === "function") {
              authorSelector.resetErrors();
            }
          } catch (error) {
            console.warn("Erro ao resetar erros no AuthorSelector:", error);
          }
        }

        // Também chama o método resetAutorFieldError que já foi adaptado
        this.resetAutorFieldError();
      } catch (error) {
        console.warn("Erro ao resetar os campos:", error);
      }
    },

    resetAutorFieldError() {
      const basicFormSection = this.$refs.basicFormSection;
      const authorSelector = this.$refs.authorSelector;

      // Verifica se authorSelector existe e tenta resetar primeiro
      if (authorSelector) {
        try {
          if (
            authorSelector.$el &&
            typeof authorSelector.$el.querySelector === "function"
          ) {
            const container = authorSelector.$el.querySelector(
              ".autor-container, .author-input-area"
            );
            if (container) {
              container.classList.remove("campo-erro");
              return;
            }
          }
        } catch (error) {
          console.warn("Erro ao tentar resetar erro no AuthorSelector:", error);
        }
      }

      // Verifica se basicFormSection existe e tem a propriedade $el
      if (!basicFormSection) {
        console.warn("BasicFormSection não encontrado");
        return;
      }

      // Verifica se $el é um objeto DOM válido
      if (
        !basicFormSection.$el ||
        typeof basicFormSection.$el.querySelector !== "function"
      ) {
        // Tenta acessar o elemento diretamente se for um elemento DOM
        if (basicFormSection instanceof HTMLElement) {
          const container = basicFormSection.querySelector(".autor-container");
          if (container) {
            container.classList.remove("campo-erro");
          }
          return;
        }

        // Se não conseguir acessar diretamente, tenta uma abordagem alternativa
        try {
          // Tenta encontrar o container pelo seletor em todo o documento
          const container = document.querySelector(".autor-container");
          if (container) {
            container.classList.remove("campo-erro");
            return;
          }

          // Tenta outros seletores, agora incluindo seletores relativos ao AuthorSelector
          const selectors = [
            ".author-input-area",
            ".form-group:nth-child(4) .form-input",
            ".author-selector .autor-container",
            "[data-component='author-selector'] .autor-container",
          ];

          for (const selector of selectors) {
            const alternativeContainer = document.querySelector(selector);
            if (alternativeContainer) {
              alternativeContainer.classList.remove("campo-erro");
              return;
            }
          }
        } catch (error) {
          console.warn(
            "Não foi possível remover a classe de erro do container de autores"
          );
        }
        return;
      }

      // Execução normal se $el for válido
      try {
        // Tenta remover a classe do container diretamente
        const container =
          basicFormSection.$el.querySelector(".autor-container");
        if (container) {
          container.classList.remove("campo-erro");
          return;
        }

        // Se não encontrou no basicFormSection, tenta acessar através do authorSelector
        if (authorSelector && authorSelector.$el) {
          const container = authorSelector.$el.querySelector(
            ".autor-container, .author-input-area"
          );
          if (container) {
            container.classList.remove("campo-erro");
            return;
          }
        }

        // Tenta outros seletores
        const otherSelectors = [
          ".author-input-area",
          ".form-group:nth-child(4) .form-input",
          ".author-selector .autor-container",
        ];

        for (const selector of otherSelectors) {
          // Tenta no basicFormSection
          if (basicFormSection.$el) {
            const container = basicFormSection.$el.querySelector(selector);
            if (container) {
              container.classList.remove("campo-erro");
              return;
            }
          }

          // Tenta no documento inteiro
          const container = document.querySelector(selector);
          if (container) {
            container.classList.remove("campo-erro");
            return;
          }
        }
      } catch (error) {
        console.warn("Erro ao tentar remover classe de erro:", error);
      }
    },

    aplicarErroTemporario(elemento, duracao = 2000) {
      if (!elemento) return;

      // Adiciona a classe de erro
      elemento.classList.add("campo-erro");

      // Foca no elemento para mostrar ao usuário onde está o problema
      elemento.focus();

      // Adiciona scroll suave para o elemento
      elemento.scrollIntoView({ behavior: "smooth", block: "center" });

      // Define um timeout para remover a classe após a duração especificada
      setTimeout(() => {
        elemento.classList.remove("campo-erro");
      }, duracao);

      return true;
    },

    aplicarErroTemporarioAutores() {
      try {
        const basicFormSection = this.$refs.basicFormSection;
        const authorSelector = this.$refs.authorSelector;

        let erroAplicado = false;

        // Tenta primeiro no AuthorSelector
        if (authorSelector) {
          // Tenta chamar o método focus diretamente no AuthorSelector
          if (typeof authorSelector.focus === "function") {
            authorSelector.focus();
          }

          const container = authorSelector.$el.querySelector(
            ".autor-container, .author-input-area"
          );
          if (container) {
            container.classList.add("campo-erro");

            // Adiciona scroll suave para o elemento
            container.scrollIntoView({ behavior: "smooth", block: "center" });

            // Programar a remoção da classe após 3 segundos
            setTimeout(() => {
              container.classList.remove("campo-erro");
            }, 2000);

            erroAplicado = true;
          }

          return erroAplicado;
        }

        // Se não conseguiu pelo AuthorSelector, tenta pelo BasicFormSection
        if (!basicFormSection) {
          return false;
        }

        // Tenta encontrar o container no BasicFormSection
        if (basicFormSection.$el) {
          const container =
            basicFormSection.$el.querySelector(".autor-container");
          if (container) {
            container.classList.add("campo-erro");

            // Adiciona scroll suave para o elemento
            container.scrollIntoView({ behavior: "smooth", block: "center" });

            // Programar a remoção da classe após 3 segundos
            setTimeout(() => {
              container.classList.remove("campo-erro");
            }, 2000);

            return true;
          }
        }

        // Última tentativa - procurar no DOM global
        const selectors = [
          ".autor-container",
          ".author-input-area",
          ".author-selector .autor-container",
          "[data-component='author-selector'] .autor-container",
        ];

        for (const selector of selectors) {
          const container = document.querySelector(selector);
          if (container) {
            container.classList.add("campo-erro");

            // Adiciona scroll suave para o elemento
            container.scrollIntoView({ behavior: "smooth", block: "center" });

            // Programar a remoção da classe após 3 segundos
            setTimeout(() => {
              container.classList.remove("campo-erro");
            }, 2000);

            return true;
          }
        }

        return false;
      } catch (error) {
        console.warn("Erro ao aplicar estilo de erro temporário:", error);
        return false;
      }
    },

    // ===== Gerenciamento de formulário e submissão =====
    validarCamposObrigatorios() {
      try {
        // Validação dos campos obrigatórios
        const basicFormSection = this.$refs.basicFormSection;
        const authorSelector = this.$refs.authorSelector;

        if (!basicFormSection) {
          console.error("Componente BasicFormSection não encontrado");
          this.notificationService.show(
            "Erro ao acessar o formulário",
            "error"
          );
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
            // Verifica se o elemento existe
            if (basicFormSection.$refs && basicFormSection.$refs[campo.ref]) {
              this.aplicarErroTemporario(basicFormSection.$refs[campo.ref]);
            }
            this.notificationService.show(
              `O campo ${campo.label} é obrigatório`,
              "error"
            );
            this.isLoading = false;
            return false;
          }
        }

        // Validação das datas
        const dataInicio = new Date(this.formData.dataInicio);
        const dataFim = new Date(this.formData.dataFim);

        if (dataInicio > dataFim) {
          if (basicFormSection.$refs && basicFormSection.$refs.dataInicio) {
            this.aplicarErroTemporario(basicFormSection.$refs.dataInicio);
          }
          this.notificationService.show(
            "A data de início não pode ser posterior à data de fim",
            "error"
          );
          this.isLoading = false;
          return false;
        }

        // Validação de autores - agora verificando tanto no componente pai quanto no filho
        let temAutores = false;

        // Verifica primeiro no AuthorSelector, se existir
        if (authorSelector) {
          // Tenta diferentes propriedades ou métodos que podem conter os autores
          if (authorSelector.value && authorSelector.value.length > 0) {
            temAutores = true;
          } else if (
            authorSelector.selectedAutores &&
            authorSelector.selectedAutores.length > 0
          ) {
            temAutores = true;
          } else if (typeof authorSelector.getSelectedAutores === "function") {
            const autores = authorSelector.getSelectedAutores();
            if (autores && autores.length > 0) {
              temAutores = true;
            }
          }
        }

        // Se não encontrou no AuthorSelector, verifica no componente pai
        if (
          !temAutores &&
          this.selectedAutores &&
          this.selectedAutores.length > 0
        ) {
          temAutores = true;
        }

        if (!temAutores) {
          // Tenta aplicar o erro visual
          let erroAplicado = false;

          // Tenta primeiro com o método existente
          if (typeof this.aplicarErroTemporarioAutores === "function") {
            erroAplicado = this.aplicarErroTemporarioAutores();
          }

          // Se o método falhou, tenta diretamente no AuthorSelector
          if (!erroAplicado && authorSelector) {
            try {
              const container = authorSelector.$el.querySelector(
                ".autor-container, .author-input-area"
              );
              if (container) {
                container.classList.add("campo-erro");
                erroAplicado = true;
              }
            } catch (e) {
              console.warn("Erro ao tentar aplicar estilo de erro:", e);
            }
          }

          this.notificationService.show(
            "Selecione pelo menos um autor",
            "error"
          );
          this.isLoading = false;
          return false;
        }

        return true;
      } catch (error) {
        console.error("Erro durante validação de campos:", error);
        this.notificationService.show(
          "Erro durante validação. Verifique os campos obrigatórios.",
          "error"
        );
        this.isLoading = false;
        return false;
      }
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
      formData.append("sistema", this.formData.sistema);
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
  },
  mounted() {
    this.initTheme();
  },
};
