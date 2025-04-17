// Aplicação Vue para o gerador de documentações de desenvolvimento
document.addEventListener("DOMContentLoaded", function () {
  const app = Vue.createApp({
    data() {
      // Obtém dados iniciais do AppBase
      const baseData = window.AppBase.getInitialData();

      // Dados específicos deste app
      return {
        ...baseData,
        modoVisualizacao: false,
        sortableInstance: null,
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
      };
    },

    // Usa os componentes compartilhados
    components: window.AppBase.getSharedComponents(),

    computed: {
      ...window.AppBase.getSharedComputed(this),

      // Computadas específicas deste app (nenhuma adicional necessária)
    },

    mounted() {
      // Executa hook de montagem compartilhado
      window.AppBase.mountHook.call(this);
    },

    methods: {
      // Importa todos os métodos compartilhados
      ...window.AppBase.methods,

      // Métodos específicos deste app
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
        const requisitosAtualizados = JSON.parse(
          JSON.stringify(this.requisitos)
        );

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

      // Gerenciamento de requisitos
      visualizarRequisito(index) {
        this.modalTitulo = "Visualizar Requisito Funcional";
        this.editIndex = -1; // Não estamos editando
        this.modoVisualizacao = true; // Ativar modo de visualização

        // Clonar o requisito para visualização
        this.requisitoAtual = JSON.parse(
          JSON.stringify(this.requisitos[index])
        );
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
        this.requisitoAtual = JSON.parse(
          JSON.stringify(this.requisitos[index])
        );
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

      // Geração de documento
      gerarDocumento() {
        // Reset any previous error states
        this.resetFieldErrors();

        // Verifica se pelo menos um formato adicional está selecionado
        const formatosAdicionais =
          this.formData.gerarDocx || this.formData.gerarPdf;

        // Se temos apenas JSON, não fazemos validações e prosseguimos direto
        if (!formatosAdicionais) {
          this.enviarFormularioParaJSON();
          return;
        }

        // Validate required fields if additional formats are selected
        const requiredFields = [
          {
            field: "numeroSS",
            selector: "input[type='text'][v-model='formData.numeroSS']",
          },
          {
            field: "tituloSS",
            selector: "input[type='text'][v-model='formData.tituloSS']",
          },
          {
            field: "dataInicio",
            selector: "input[type='date'][v-model='formData.dataInicio']",
          },
          {
            field: "dataFim",
            selector: "input[type='date'][v-model='formData.dataFim']",
          },
          {
            field: "iniciaisAutor",
            selector: "input[type='text'][v-model='inputValue']",
          },
        ];

        // Check each required field
        for (const field of requiredFields) {
          if (!this.formData[field.field]) {
            // Add error class to the field
            const element = this.$refs.basicFormSection.$el.querySelector(
              field.selector
            );
            if (element) {
              element.classList.add("campo-erro");
              element.focus();
            }
            return;
          }
        }

        // Validar o campo de descrição
        if (!this.formData.descricao) {
          this.notificationService.show(
            "O campo Descrição é obrigatório",
            "error"
          );
          return;
        }

        // Validar se a data de início é menor que a data de fim
        if (this.formData.dataInicio > this.formData.dataFim) {
          this.notificationService.show(
            "A data de início não pode ser maior que a data de fim",
            "error"
          );
          return;
        }

        // Validar se há autor selecionado
        if (this.selectedAutores.length === 0) {
          this.notificationService.show(
            "Por favor, selecione pelo menos um autor",
            "error"
          );
          return;
        }

        // Enviar formulário completo
        this.enviarFormularioCompleto();
      },

      enviarFormularioParaJSON() {
        this.isLoading = true;
        this.status.message = "";

        // Preparar dados mínimos para envio
        const formData = this.prepareFormData(true);

        // Adiciona o tipo de documentação
        formData.append("tipo", "desenvolvimento");

        // Adicionar flags específicas
        formData.append("apenas_json", "true");

        // Enviar os requisitos mesmo vazios
        formData.append("requisitos", JSON.stringify(this.requisitos || []));

        // Enviar requisição simplificada para o backend
        fetch("/gerar_relatorio", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => {
                throw new Error(data.error || "Erro ao gerar JSON");
              });
            }
            return response.json();
          })
          .then((data) => {
            this.notificationService.show(
              "Dados salvos em JSON com sucesso!",
              "success"
            );
          })
          .catch((error) => {
            this.notificationService.show(error.message, "error");
            console.error("Erro:", error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      },

      enviarFormularioCompleto() {
        this.isLoading = true;
        this.status.message = "";

        // Preparar dados para envio
        const formData = this.prepareFormData(false);

        // Adicionar requisitos
        formData.append("requisitos", JSON.stringify(this.requisitos));

        // Enviar requisição para o backend
        fetch("/gerar_relatorio", {
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

                this.notificationService.show(
                  "Documentação gerada com sucesso!",
                  "success"
                );
              });
            } else {
              return response.json();
            }
          })
          .then((data) => {
            if (data && data.message) {
              this.notificationService.show(data.message, "success");
            }
          })
          .catch((error) => {
            this.notificationService.show(error.message, "error");
            console.error("Erro:", error);
          })
          .finally(() => {
            this.isLoading = false;
          });
      },
    },
  });

  // Montagem da aplicação Vue
  app.mount("#app");
});
