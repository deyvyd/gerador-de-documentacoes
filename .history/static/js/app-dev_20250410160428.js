// Aplicação Vue para o gerador de documentações de desenvolvimento
const app = Vue.createApp({
  data() {
    return {
      isDark: true,
      modoVisualizacao: false,
      sortableInstance: null,
      isLoading: false,
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
      formData: {
        numeroSS: "",
        anoSS: new Date().getFullYear().toString(),
        tituloSS: "",
        descricao: "",
        dataInicio: "",
        dataFim: "",
        linkBoard: "",
        iniciaisAutor: "",
        gerarDocx: true, // Adicione estas propriedades
        gerarPdf: false, // Adicione estas propriedades
      },
      requisitosTabAtiva: 0,
      requisitosTabs: [
        { nome: "Requisitos Funcionais" },
        { nome: "Requisitos Não Funcionais" },
        { nome: "Total de PF's" },
      ],
      requisitosNaoFuncionais: {
        titulo: "",
        descricao: "",
      },
      totalPontosFuncao: 0,
      totalPontosFuncaoFormatado: "",

      listaRequisitosNaoFuncionais: [],

      // Objeto para o formulário
      requisitosNaoFuncionais: {
        titulo: "",
        descricao: "",
      },

      isLoading: false, // substitui isSubmitting

      // Variáveis para ModalMessage (substituindo ModalConfirmacao)
      showMessageModal: false,
      messageTitle: "",
      messageContent: "",
      messageCallback: null,
      messageCancelCallback: null,

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
      status: {
        message: "",
        type: "",
      },
    };
  },

  components: {
    "theme-toggle": window.AppComponents.ThemeToggle,
    "page-header": window.AppComponents.PageHeader,
    "basic-form-section": window.AppComponents.BasicFormSection,
    "data-table": window.AppComponents.DataTable,
    "form-submit-section": window.AppComponents.FormSubmitSection,
    "modal-requisito": window.AppComponents.ModalRequisito,
    "modal-message": window.AppComponents.ModalMessage,
  },

  computed: {
    filteredAutores() {
      return this.filterAutores();
    },
  },

  mounted() {
    // Verificar preferência de tema do usuário
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.isDark = savedTheme === "dark";
      this.applyTheme();
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
      this.applyTheme();
    }
  },

  methods: {
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
          this.requisitos.map((req) => `${req.id} - ${req.nome}`).join(", ")
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

    // Gerenciamento de tema
    toggleTheme() {
      this.isDark = !this.isDark;
      localStorage.setItem("theme", this.isDark ? "dark" : "light");
      this.applyTheme();
    },

    applyTheme() {
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
      // Pequeno delay para permitir o clique na sugestão
      setTimeout(() => {
        this.showSuggestions = false;
        this.highlightedIndex = 0; // Reseta o índice ao perder o foco
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
      this.selectedAutores = this.selectedAutores.filter(
        (a) => a.nome !== autor.nome
      );
      this.updateFormDataAutores();
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
        nome: "",
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

    // Método para mostrar o modal de mensagem (substituindo o modal de confirmação)
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

      // Adiciona classe para bloquear rolagem
      document.body.classList.add("modal-open");
    },

    // Método para confirmar a ação no modal de mensagem
    confirmarModalMensagem() {
      if (this.messageCallback) {
        this.messageCallback();
      }
      this.showMessageModal = false;
      // Remove a classe que bloqueia a rolagem
      document.body.classList.remove("modal-open");
    },

    // Método para cancelar a ação no modal de mensagem
    cancelarModalMensagem() {
      if (this.messageCancelCallback) {
        this.messageCancelCallback();
      }
      this.showMessageModal = false;
      // Remove a classe que bloqueia a rolagem
      document.body.classList.remove("modal-open");
    },

    // Método para remover requisito usando o ModalMessage do tipo caution
    removerRequisito(index) {
      const requisitoNome = this.requisitos[index].tituloRF;
      const requisitoId = this.requisitos[index].id;

      this.mostrarModalMensagem(
        `Remover o ${requisitoId}`,
        `Tem certeza que deseja remover o requisito: "${requisitoNome}"?`,
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

    // Método para formatar o número da SS com zeros à esquerda
    formatSS() {
      if (this.formData.numeroSS) {
        // Formata o número com 3 dígitos, preenchendo com zeros à esquerda
        this.formData.numeroSS = this.formData.numeroSS.padStart(3, "0");
      }
    },

    // Geração de documento
    gerarDocumento() {
      // Reset any previous error states
      this.resetFieldErrors();

      // Validate required fields
      const requiredFields = [
        {
          field: "numeroSS",
          ref: "basicFormSection",
          element: "numeroSSInput",
        },
        {
          field: "tituloSS",
          ref: "basicFormSection",
          element: "tituloSSInput",
        },
        {
          field: "dataInicio",
          ref: "basicFormSection",
          element: "dataInicioInput",
        },
        { field: "dataFim", ref: "basicFormSection", element: "dataFimInput" },
        {
          field: "iniciaisAutor",
          ref: "basicFormSection",
          element: "autorInput",
        },
      ];

      // Check each required field
      for (const field of requiredFields) {
        if (!this.formData[field.field]) {
          // Add error class to the field
          const element = this.$refs[field.ref].$refs[field.element];
          element.classList.add("campo-erro");
          element.focus();
          return;
        }
      }
      // Validar campos obrigatórios
      if (
        !this.formData.numeroSS ||
        !this.formData.anoSS ||
        !this.formData.tituloSS
      ) {
        this.showStatus(
          "Preencha os campos obrigatórios: Número, Ano e Título da SS",
          "error"
        );
        return;
      }

      // Validar o campo de descrição
      if (!this.formData.descricao) {
        this.showStatus("O campo Descrição é obrigatório", "error");
        return;
      }

      // Validar as datas de início e fim
      if (!this.formData.dataInicio || !this.formData.dataFim) {
        this.showStatus("As datas de início e fim são obrigatórias", "error");
        return;
      }

      // Validar se a data de início é menor que a data de fim
      if (this.formData.dataInicio > this.formData.dataFim) {
        this.showStatus(
          "A data de início não pode ser maior que a data de fim",
          "error"
        );
        return;
      }

      // Verificar se pelo menos um formato foi selecionado
      if (!this.formData.gerarDocx && !this.formData.gerarPdf) {
        this.showStatus(
          "Selecione pelo menos um formato de arquivo (DOCX ou PDF)",
          "error"
        );
        return;
      }

      // Validar se há autor selecionado
      if (this.selectedAutores.length === 0) {
        this.status.message = "Por favor, selecione pelo menos um autor";
        this.status.type = "error";
        return;
      }

      this.isLoading = true;
      this.status.message = "";

      // Preparar dados para envio
      const formData = new FormData();

      // Adicionar dados básicos
      Object.keys(this.formData).forEach((key) => {
        formData.append(key, this.formData[key]);
      });

      // Adicionar requisitos
      formData.append("requisitos", JSON.stringify(this.requisitos));

      // Enviar requisição para o backend
      fetch("/gerar_relatorio_dev", {
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

              this.showStatus("Documentação gerada com sucesso!", "success");
            });
          } else {
            return response.json();
          }
        })
        .then((data) => {
          if (data && data.message) {
            this.showStatus(data.message, "success");
          }
        })
        .catch((error) => {
          this.showStatus(error.message, "error");
          console.error("Erro:", error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    // Exibir mensagem de status
    showStatus(message, type = "success") {
      this.status.message = message;
      this.status.type = type;

      // Limpar mensagem após alguns segundos
      if (type === "success") {
        setTimeout(() => {
          this.status.message = "";
        }, 5000);
      }
    },
  },
});

// Montar a aplicação Vue
app.mount("#app");
