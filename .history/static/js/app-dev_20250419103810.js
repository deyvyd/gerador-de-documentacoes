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
        editIndexRNF: -1,
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

      editarRequisitoNaoFuncional(index) {
        this.editIndexRNF = index;
        // Preenche o formulário com os dados do requisito selecionado
        this.requisitosNaoFuncionais.titulo =
          this.listaRequisitosNaoFuncionais[index].titulo;
        this.requisitosNaoFuncionais.descricao =
          this.listaRequisitosNaoFuncionais[index].descricao;
      },

      // Método para atualizar a função adicionarRequisitoNaoFuncional para lidar com edição
      adicionarRequisitoNaoFuncional() {
        // Validar se os campos estão preenchidos
        if (
          !this.requisitosNaoFuncionais.titulo ||
          !this.requisitosNaoFuncionais.descricao
        ) {
          // Exibir mensagem de erro ou destacar campos obrigatórios
          this.notificationService.show(
            "Preencha o título e a descrição do requisito não funcional",
            "error"
          );
          return;
        }

        // Verifica se estamos editando ou adicionando
        if (this.editIndexRNF >= 0) {
          // Atualizar o requisito existente
          this.listaRequisitosNaoFuncionais[this.editIndexRNF] = {
            id: this.listaRequisitosNaoFuncionais[this.editIndexRNF].id,
            titulo: this.requisitosNaoFuncionais.titulo,
            descricao: this.requisitosNaoFuncionais.descricao,
          };

          // Resetar o modo de edição
          this.editIndexRNF = -1;
          this.notificationService.show(
            "Requisito não funcional atualizado",
            "success"
          );
        } else {
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

          this.notificationService.show(
            "Requisito não funcional adicionado",
            "success"
          );
        }

        // Limpar o formulário
        this.requisitosNaoFuncionais.titulo = "";
        this.requisitosNaoFuncionais.descricao = "";
      },

      // Método para remover um requisito não funcional com confirmação
      removerRequisitoNaoFuncional(index) {
        const requisito = this.listaRequisitosNaoFuncionais[index];

        // Mostrar modal de confirmação
        this.mostrarModalMensagem(
          `Remover o ${requisito.id}`,
          `Tem certeza que deseja remover o requisito não funcional: "${requisito.titulo}"?`,
          () => {
            // Esta função será executada quando o usuário confirmar
            this.listaRequisitosNaoFuncionais.splice(index, 1);

            // Atualizar os IDs dos requisitos restantes
            for (let i = 0; i < this.listaRequisitosNaoFuncionais.length; i++) {
              this.listaRequisitosNaoFuncionais[i].id = `RNF-${String(
                i + 1
              ).padStart(2, "0")}`;
            }

            // Se estiver editando este requisito, limpar o formulário
            if (this.editIndexRNF === index) {
              this.requisitosNaoFuncionais.titulo = "";
              this.requisitosNaoFuncionais.descricao = "";
              this.editIndexRNF = -1;
            } else if (this.editIndexRNF > index) {
              // Ajustar o índice de edição se o item removido estiver antes do editado
              this.editIndexRNF--;
            }

            this.notificationService.show(
              "Requisito não funcional removido",
              "success"
            );
          }
        );
      },

      // Método para geração de documento
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

        // Validação de requisitos funcionais
        if (this.requisitos.length === 0) {
          // Destaca o botão de adicionar requisito funcional
          const btnAddRequisito = this.$refs.btnAddRequisito;
          if (btnAddRequisito) {
            // Adiciona classe de erro ao botão
            btnAddRequisito.classList.add("btn-erro");
            // Foca no botão
            btnAddRequisito.focus();
            // Remove a classe após um tempo
            setTimeout(() => {
              btnAddRequisito.classList.remove("btn-erro");
            }, 3000);
          }
          this.notificationService.show(
            "Adicione pelo menos um requisito funcional",
            "error"
          );
          return;
        }

        // Exibe mensagem de sucesso nas validações
        this.notificationService.show(
          "Validação bem-sucedida! Gerando documentos...",
          "success"
        );

        // Chama a função para enviar o formulário completo
        this.enviarFormularioCompleto();
      },

      // Método para enviar o formulário completo
      enviarFormularioCompleto() {
        this.isLoading = true;

        try {
          // Prepara o FormData para envio, especificando o tipo como desenvolvimento
          const formData = this.prepareFormData(false, "desenvolvimento");

          // Adiciona requisitos funcionais
          formData.append("requisitos", JSON.stringify(this.requisitos));

          // Adiciona requisitos não funcionais
          formData.append(
            "requisitosNaoFuncionais",
            JSON.stringify(this.listaRequisitosNaoFuncionais)
          );

          // Adiciona total de pontos de função
          formData.append(
            "totalPontosFuncao",
            this.totalPontosFuncao.toString()
          );

          // Notifica o usuário que estamos processando
          this.notificationService.show("Gerando documentos...", "info");

          // Envia a requisição
          fetch("/gerar_documentos", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                return response.json().then((data) => {
                  throw new Error(data.error || "Erro ao gerar documento");
                });
              }

              // Verifica o tipo de conteúdo da resposta
              const contentType = response.headers.get("Content-Type");
              if (contentType && contentType.includes("application/zip")) {
                return response.blob().then((blob) => {
                  // Criar URL do blob e link para download
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.style.display = "none";
                  a.href = url;

                  // Extrair nome do arquivo
                  const contentDisposition = response.headers.get(
                    "Content-Disposition"
                  );
                  let filename = "documentos.zip";
                  if (contentDisposition) {
                    const filenameMatch =
                      contentDisposition.match(/filename="(.+)"/);
                    if (filenameMatch && filenameMatch[1]) {
                      filename = filenameMatch[1];
                    }
                  }

                  a.download = filename;
                  document.body.appendChild(a);

                  // Usar setTimeout para garantir que o download será iniciado
                  setTimeout(() => {
                    a.click();
                    // Remover depois de um momento para liberar recursos
                    setTimeout(() => {
                      window.URL.revokeObjectURL(url);
                      document.body.removeChild(a);
                    }, 200);
                  }, 100);

                  // Exibir mensagem de sucesso
                  this.notificationService.show(
                    "Documento gerado com sucesso!",
                    "success"
                  );
                  return { success: true };
                });
              } else {
                // Se não for um ZIP, tenta processar como JSON
                return response.json();
              }
            })
            .then((data) => {
              if (data && data.success === true) {
                // Já exibimos a mensagem de sucesso ao processar o blob
                return;
              }

              if (data && data.message) {
                this.notificationService.show(data.message, "success");
              }
            })
            .catch((error) => {
              console.error("Erro:", error);
              this.notificationService.show(
                error.message || "Erro ao gerar documento",
                "error"
              );
            })
            .finally(() => {
              this.isLoading = false;
            });
        } catch (error) {
          console.error("Erro:", error);
          this.notificationService.show(
            error.message || "Erro ao gerar documento",
            "error"
          );
          this.isLoading = false;
        }
      },

      // Método para enviar o formulário apenas como JSON
      enviarFormularioParaJSON() {
        this.isLoading = true;
        try {
          // Prepara o FormData para envio, especificando o tipo como desenvolvimento
          const formData = this.prepareFormData(true, "desenvolvimento");

          // Enviar os requisitos mesmo vazios
          formData.append("requisitos", JSON.stringify(this.requisitos || []));

          // Adiciona requisitos não funcionais (específico de desenvolvimento)
          formData.append(
            "requisitosNaoFuncionais",
            JSON.stringify(this.listaRequisitosNaoFuncionais || [])
          );

          // Adiciona total de pontos de função (específico de desenvolvimento)
          formData.append(
            "totalPontosFuncao",
            this.totalPontosFuncao.toString()
          );

          // Notifica o usuário que estamos processando
          this.notificationService.show("Gerando JSON...", "info");

          // Enviar requisição simplificada para o backend
          fetch("/gerar_documentos", {
            method: "POST",
            body: formData,
          })
            .then((response) => {
              if (!response.ok) {
                return response.json().then((data) => {
                  throw new Error(data.error || "Erro ao gerar JSON");
                });
              }
              return response.blob();
            })
            .then((blob) => {
              // Criar URL do blob e link para download
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = url;

              // Determinar nome do arquivo
              const filename = `SS ${this.formData.numeroSS.padStart(3, "0")}-${
                this.formData.anoSS
              }.json`;
              a.download = filename;

              document.body.appendChild(a);
              a.click();

              // Limpeza
              setTimeout(() => {
                window.URL.revokeObjectURL(url);
                document.body.removeChild(a);
                this.notificationService.show(
                  "Arquivo JSON gerado com sucesso!",
                  "success"
                );
              }, 100);
            })
            .catch((error) => {
              console.error("Erro:", error);
              this.notificationService.show(
                error.message || "Erro ao gerar JSON",
                "error"
              );
            })
            .finally(() => {
              this.isLoading = false;
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

      enviarFormularioCompleto() {
        this.isLoading = true;

        // Preparar dados para envio
        const formData = this.prepareFormData(false, "desenvolvimento");

        // Adicionar requisitos funcionais
        formData.append("requisitos", JSON.stringify(this.requisitos));

        // Adicionar requisitos não funcionais
        formData.append(
          "requisitosNaoFuncionais",
          JSON.stringify(this.listaRequisitosNaoFuncionais)
        );

        // Adicionar total de pontos de função
        formData.append("totalPontosFuncao", this.totalPontosFuncao.toString());

        // Enviar requisição para o backend
        fetch("/gerar_documentos", {
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
