// Criação da aplicação Vue
const { createApp } = Vue;

// Importa funcionalidades do app-base.js
document.addEventListener("DOMContentLoaded", function () {
  // Aplicação Vue
  const app = createApp({
    data() {
      // Obtém dados iniciais do AppBase
      const baseData = window.AppBase.getInitialData();

      // Dados específicos deste app
      return {
        ...baseData,
        editingIndex: null,
        sortable: null,
        sortableInitialized: false,
        sortableTimeout: null,
        sortableInstance: null,
        isDestroying: false,
        novaAtividade: {
          nome: "",
          horas: "",
        },
        atividades: [],

        // Estados do modal de confirmação
        showMessageModal: false,
        messageTitle: "",
        messageContent: "",
        messageCallback: null,
        messageCancelCallback: null,
      };
    },

    // Usa os componentes compartilhados
    components: window.AppBase.getSharedComponents(),

    computed: {
      ...window.AppBase.getSharedComputed(this),

      // Computadas específicas deste app
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
      // Executa hook de montagem compartilhado
      window.AppBase.mountHook.call(this);

      // Inicialização específica deste app
      this.initSortable();
    },

    beforeUnmount() {
      this.destroySortable();
    },

    methods: {
      // Importa todos os métodos compartilhados
      ...window.AppBase.methods,

      // Métodos específicos deste app
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
        // Evitar a remoção direta, mostrar confirmação primeiro
        const atividadeNome = this.atividades[index].nome;

        // Usar modal de mensagem para confirmação
        this.showMessageModal = true;
        this.messageTitle = "Remover Atividade";
        this.messageContent = `Tem certeza que deseja remover a atividade "${atividadeNome}"?`;

        // Função a ser chamada quando o usuário confirmar
        this.messageCallback = () => {
          // Remove a atividade do array
          this.atividades.splice(index, 1);

          // Se estiver editando esta atividade, limpa o formulário
          if (this.editingIndex === index) {
            this.novaAtividade = { nome: "", horas: "" };
            this.editingIndex = null;
          }

          // Recalcula os índices de edição que são maiores que o índice removido
          if (this.editingIndex > index) {
            this.editingIndex--;
          }

          // Resetar o estado do modal
          this.showMessageModal = false;
        };

        // Função a ser chamada quando o usuário cancelar
        this.messageCancelCallback = () => {
          this.showMessageModal = false;
        };
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

      // Método para campos de atividade
      resetAtividadeFieldError() {
        // Encontrar o container de atividades
        const atividadeContainer = document.querySelector(
          ".activity-form .form-group .form-input"
        );
        if (atividadeContainer) {
          atividadeContainer.classList.remove("campo-erro");
        }
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
            this.notificationService.show(
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
            this.notificationService.show(
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

          this.notificationService.show(
            "Clique em 'Adicionar' para incluir a atividade na lista",
            "error"
          );
          this.isLoading = false;
          return false;
        } else {
          // Fallback genérico
          this.notificationService.show(
            "Adicione pelo menos uma atividade",
            "error"
          );
          this.isLoading = false;
          return false;
        }

        return true;
      },

      // ===== Método para geração de documento =====
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

        // Validação de atividades
        if (this.atividades.length === 0) {
          // Verifica se os campos de nova atividade estão preenchidos
          if (!this.validarCamposAtividade()) {
            return;
          }
        }

        // Enviar formulário completo
        this.enviarFormularioCompleto();
      },

      // ===== Métodos de envio de formulário =====
      enviarFormularioParaJSON() {
        this.isLoading = true;
        try {
          // Prepara o FormData para envio
          const formData = this.prepareFormData(true);

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
                    throw new Error(`Erro`);
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
          const formData = this.prepareFormData(false);

          // Adiciona atividades ao FormData
          formData.append("atividades", JSON.stringify(this.atividades));

          // Adiciona total de horas
          formData.append("totalHoras", this.totalHoras.toString());

          // Notifica o usuário que estamos processando
          this.notificationService.show("Gerando documentos...", "info");

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

      updateDocx(checked) {
        this.formData.gerarDocx = checked;
      },

      updatePdf(checked) {
        this.formData.gerarPdf = checked;
      },
    },
  });

  // Registro da diretiva Maska
  app.directive("maska", Maska.vMaska);

  // Montagem da aplicação
  app.mount("#app");
});
