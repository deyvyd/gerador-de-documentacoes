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

    // Aplica o tema inicial
    this.updateTheme();
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
      const index = this.selectedAutores.findIndex((a) => a.nome === autor.nome);
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
    async gerarDocumento() {
      if (this.isLoading) return;

      // Limpa mensagens de status anteriores
      this.status.message = '';
      this.status.type = '';

      // Limpa estilos de erro anteriores
      this.resetFieldErrors();

      // Acessar os elementos através do componente BasicFormSection
      const basicFormSection = this.$refs.basicFormSection;
      if (!basicFormSection) {
        console.error('Componente BasicFormSection não encontrado');
        return;
      }

      // Validação dos campos obrigatórios
      const camposObrigatorios = [
        { ref: 'numeroSS', label: 'Número SS' },
        { ref: 'tituloSS', label: 'Título' },
        { ref: 'descricao', label: 'Descrição' },
        { ref: 'dataInicio', label: 'Data de Início' },
        { ref: 'dataFim', label: 'Data de Fim' }
      ];

      for (const campo of camposObrigatorios) {
        const valor = this.formData[campo.ref];
        if (!valor || valor.trim() === '') {
          const elemento = basicFormSection.$refs[campo.ref];
          if (elemento) {
            elemento.classList.add('campo-erro');
            elemento.focus();
            this.status.message = `O campo ${campo.label} é obrigatório`;
            this.status.type = 'error';
            return;
          } else {
            console.error(`Elemento com ref ${campo.ref} não encontrado`);
          }
        }
      }

      // Validação das datas
      const dataInicio = new Date(this.formData.dataInicio);
      const dataFim = new Date(this.formData.dataFim);

      if (dataInicio > dataFim) {
        const elemento = basicFormSection.$refs.dataInicio;
        if (elemento) {
          elemento.classList.add('campo-erro');
          elemento.focus();
          this.status.message = 'A data de início não pode ser posterior à data de fim';
          this.status.type = 'error';
        }
        return;
      }

      // Validação de atividades
      if (this.atividades.length === 0) {
        this.status.message = 'Adicione pelo menos uma atividade';
        this.status.type = 'error';
        return;
      }

      // Validação de autores
      if (this.selectedAutores.length === 0) {
        // Adicionar classe de erro ao container de autores
        if (this.setAutorFieldError()) {
          // Focar no input de autor
          const autorInput = basicFormSection.$refs.autorInput;
          if (autorInput) {
            autorInput.focus();
          }
        } else {
          console.error('Não foi possível aplicar o estilo de erro ao campo de autores');
        }
        this.status.message = 'Selecione pelo menos um autor';
        this.status.type = 'error';
        return;
      }

      // Validação dos formatos de arquivo
      if (!this.formData.gerarDocx && !this.formData.gerarPdf) {
        this.status.message = 'Selecione pelo menos um formato de arquivo (DOCX ou PDF)';
        this.status.type = 'error';
        return;
      }

      this.isLoading = true;
      this.status.message = 'Gerando documento...';
      this.status.type = 'info';

      try {
        const formData = new FormData();
        formData.append('numeroSS', this.formData.numeroSS);
        formData.append('tituloSS', this.formData.tituloSS);
        formData.append('dataInicio', this.formData.dataInicio);
        formData.append('dataFim', this.formData.dataFim);
        formData.append('atividades', JSON.stringify(this.atividades));
        formData.append('autores', JSON.stringify(this.selectedAutores));
        formData.append('gerarDocx', this.formData.gerarDocx);
        formData.append('gerarPdf', this.formData.gerarPdf);

        const response = await fetch('/gerar_relatorio', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Erro ao gerar documento');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.zip';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        this.status.message = 'Documento gerado com sucesso!';
        this.status.type = 'success';
      } catch (error) {
        console.error('Erro:', error);
        this.status.message = 'Erro ao gerar documento';
        this.status.type = 'error';
      } finally {
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

    // Método para limpar estilos de erro dos campos
    resetFieldErrors() {
      // Limpar estilos de erro dos elementos dentro do BasicFormSection
      const basicFormSection = this.$refs.basicFormSection;
      if (basicFormSection) {
        // Limpar refs individuais
        const refs = ['numeroSS', 'tituloSS', 'descricao', 'dataInicio', 'dataFim'];
        refs.forEach(ref => {
          const elemento = basicFormSection.$refs[ref];
          if (elemento) {
            elemento.classList.remove('campo-erro');
          }
        });
        
        // Limpar o container de autores
        this.resetAutorFieldError();
      }

      // Limpar mensagens de status
      this.status.message = '';
      this.status.type = '';
    },

    resetAutorFieldError() {
      const basicFormSection = this.$refs.basicFormSection;
      if (!basicFormSection) return;
      
      // Tentar diferentes seletores para encontrar o container de autores
      const selectors = [
        '.form-group:nth-child(4) .form-input'
      ];
      
      for (const selector of selectors) {
        const container = basicFormSection.$el.querySelector(selector);
        if (container) {
          container.classList.remove('campo-erro');
          return;
        }
      }
      
      // Se os seletores não funcionarem, tentar encontrar pelo texto do label
      const labels = basicFormSection.$el.querySelectorAll('label');
      for (const label of labels) {
        if (label.textContent.includes('Autor(es)')) {
          const container = label.nextElementSibling?.querySelector('.form-input');
          if (container) {
            container.classList.remove('campo-erro');
            return;
          }
        }
      }
    },

    setAutorFieldError() {
      const basicFormSection = this.$refs.basicFormSection;
      if (!basicFormSection) return false;
      
      // Tentar diferentes seletores para encontrar o container de autores
      const selectors = [
        '.form-group:nth-child(4) .form-input'
      ];
      
      for (const selector of selectors) {
        const container = basicFormSection.$el.querySelector(selector);
        if (container) {
          container.classList.add('campo-erro');
          return true;
        }
      }
      
      // Se os seletores não funcionarem, tentar encontrar pelo texto do label
      const labels = basicFormSection.$el.querySelectorAll('label');
      for (const label of labels) {
        if (label.textContent.includes('Autor(es)')) {
          const container = label.nextElementSibling?.querySelector('.form-input');
          if (container) {
            container.classList.add('campo-erro');
            return true;
          }
        }
      }
      
      return false;
    },
  },
});

// Registro da diretiva Maska
app.directive("maska", Maska.vMaska);

// Montagem da aplicação
app.mount("#app");
