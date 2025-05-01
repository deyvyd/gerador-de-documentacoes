// Criação da aplicação Vue
const { createApp } = Vue;

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
    isFormatoValido() {
      // Pelo menos um formato deve estar selecionado
      return this.formatos.docx || this.formatos.gerarPdf;
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
  },

  beforeUnmount() {
    this.destroySortable();
  },

  methods: {
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
      if (this.novaAtividade.nome && this.novaAtividade.horas) {
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
      }
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
    gerarDocumento() {
      if (this.isLoading) return;

      // Reset do status
      this.status.message = "";
      this.status.type = "info";

      // Debug - verificar valores
      console.log("Valores de data:", {
        dataInicio: this.formData.dataInicio,
        dataFim: this.formData.dataFim,
        dataInicioTipo: typeof this.formData.dataInicio,
        dataFimTipo: typeof this.formData.dataFim,
      });

      // Validar datas
      if (!this.formData.dataInicio || !this.formData.dataFim) {
        console.log("Datas não preenchidas!", this.formData);
        this.status.message = "As datas de início e fim são obrigatórias";
        this.status.type = "error";
        return;
      }

      // Validar se a data de início é menor que a data de fim
      const dataInicio = new Date(this.formData.dataInicio);
      const dataFim = new Date(this.formData.dataFim);

      if (dataInicio > dataFim) {
        this.status.message =
          "A data de início não pode ser maior que a data de fim";
        this.status.type = "error";
        this.$refs.dataInicioInput?.focus();
        return;
      }

      // Validar se tem pelo menos uma atividade
      if (this.atividades.length === 0) {
        this.status.message =
          "É necessário adicionar pelo menos uma atividade antes de gerar os documentos";
        this.status.type = "error";
        this.$refs.atividadeInput?.focus();
        return;
      }

      // Validar se há autor selecionado
      if (this.selectedAutores.length === 0) {
        this.status.message = "Por favor, selecione pelo menos um autor";
        this.status.type = "error";
        return;
      }

      // Verificar se pelo menos um formato foi selecionado
      if (!this.formData.gerarDocx && !this.formData.gerarPdf) {
        this.status.message =
          "Selecione pelo menos um formato de arquivo (DOCX ou PDF)";
        this.status.type = "error";
        return;
      }

      // Inicializa o tempo de processamento
      const tempoInicio = new Date();

      this.isLoading = true;
      // Não mostramos mensagem de status durante o processamento, apenas o spinner no botão

      try {
        const formData = new FormData();
        formData.append("atividades", JSON.stringify(this.atividades));

        // Adicionar campos do formulário
        for (const [key, value] of Object.entries(this.formData)) {
          // Tratamento especial para valores booleanos
          if (typeof value === "boolean") {
            formData.append(key, value.toString()); // Converter boolean para string "true" ou "false"
          } else {
            formData.append(key, value);
          }
        }

        // Adicionar total de horas
        formData.append("totalHoras", this.totalHoras.toString());

        // Explicitamente definir os formatos como strings "true" ou "false"
        formData.append("gerar_docx", this.formData.gerarDocx.toString());
        formData.append("gerar_pdf", this.formData.gerarPdf.toString());

        // Debugging - imprime todos os pares chave/valor do FormData
        console.log("FormData sendo enviado:");
        for (const pair of formData.entries()) {
          console.log(`${pair[0]}: ${pair[1]}`);
        }

        console.log("Verificação de formatos:");
        console.log(
          `gerarDocx tipo: ${typeof this.formData.gerarDocx}, valor: ${
            this.formData.gerarDocx
          }`
        );
        console.log(
          `gerarPdf tipo: ${typeof this.formData.gerarPdf}, valor: ${
            this.formData.gerarPdf
          }`
        );
        console.log(`gerar_docx do FormData: ${formData.get("gerar_docx")}`);
        console.log(`gerar_pdf do FormData: ${formData.get("gerar_pdf")}`);

        fetch("/gerar_relatorio", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              const contentType = response.headers.get("content-type");
              if (contentType && contentType.includes("application/json")) {
                return response.json().then((error) => {
                  throw new Error(error.error || "Erro ao gerar documentos");
                });
              }
              throw new Error(
                `Erro ${response.status}: ${response.statusText}`
              );
            }

            // Download do arquivo ZIP
            return response.blob();
          })
          .then((blob) => {
            // Criar o nome do arquivo formatado
            const zipFilename = `SS ${this.formData.numeroSS.padStart(
              3,
              "0"
            )}-${this.formData.anoSS}.zip`;

            // Criar link de download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = zipFilename;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            // Calcula o tempo de processamento
            const tempoFim = new Date();
            const tempoTotal = ((tempoFim - tempoInicio) / 1000).toFixed(1);

            // Mensagem de sucesso com tempo de processamento
            this.status.message = `Documentos gerados com sucesso! Tempo de processamento: ${tempoTotal}s`;
            this.status.type = "success";
          })
          .catch((error) => {
            console.error("Erro completo:", error);

            // Calcula o tempo de processamento mesmo em caso de erro
            const tempoFim = new Date();
            const tempoTotal = ((tempoFim - tempoInicio) / 1000).toFixed(1);

            this.status.message = `${
              error.message || "Erro ao gerar documentos"
            }. Tempo de processamento: ${tempoTotal}s`;
            this.status.type = "error";
          })
          .finally(() => {
            this.isLoading = false;
          });
      } catch (error) {
        console.error("Erro ao preparar a requisição:", error);
        this.status.message = "Erro ao preparar a requisição";
        this.status.type = "error";
        this.isLoading = false;
      }
    },

    // Método auxiliar para limpar o formulário (opcional)
    limparFormulario() {
      this.formData = {
        numeroSS: "",
        anoSS: new Date().getFullYear(),
        iniciaisAutor: "",
        tituloSS: "",
        dataInicio: "",
        dataFim: "",
        linkBoard: "",
        descricao: "",
      };
      this.atividades = [];
      this.modeloFile = null;
      this.selectedAutores = [];
      this.autorInput = "";
    },
  },
});

// Registro da diretiva Maska
app.directive("maska", Maska.vMaska);

// Montagem da aplicação
app.mount("#app");
