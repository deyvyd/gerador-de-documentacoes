<template>
  <div v-if="show" class="modal-requisito-overlay">
    <div
      :class="[
        'modal-requisito-container',
        isDarkMode ? 'modal-requisito-dark' : 'modal-requisito-light',
        { 'modo-visualizacao': modoVisualizacao },
      ]"
    >
      <!-- Cabeçalho do modal -->
      <div class="modal-requisito-header">
        <div class="flex flex-col gap-3">
          <!-- Título principal do modal -->
          <h2
            :class="[
              'modal-requisito-title',
              isDarkMode
                ? 'modal-requisito-title-dark'
                : 'modal-requisito-title-light',
            ]"
          >
            {{ tituloModalBase }}
          </h2>

          <!-- Badge com informações do RF -->
          <div v-if="tituloRF || !modoVisualizacao" class="flex flex-col gap-2">
            <!-- Primeira linha: ID, Tipo e Perfil -->
            <div class="flex items-center gap-2 flex-wrap">
              <span class="rf-id-badge">{{
                getDisplayId().toUpperCase()
              }}</span>

              <!-- Badge do Perfil -->
              <span v-if="requisito.perfil" class="rf-perfil-badge">
                {{ requisito.perfil.toUpperCase() }}
              </span>

              <!-- Badge do Tipo -->
              <span v-if="requisito.tipo" :class="getTipoClass()">
                {{ requisito.tipo.toUpperCase() }}
              </span>
            </div>

            <!-- Segunda linha: Título -->
            <div class="flex items-start">
              <div v-if="tituloRF" class="rf-title-badge">
                {{ tituloRF.toUpperCase() }}
              </div>
              <span v-else-if="!modoVisualizacao" class="rf-title-placeholder">
                Preencha o título do requisito
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Navegação das abas -->
      <div
        :class="[
          'modal-tabs-container',
          isDarkMode ? 'modal-tabs-border-dark' : 'modal-tabs-border-light',
        ]"
      >
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="trocarAba(tab.id)"
          class="modal-tab-button"
          :tabindex="tabIndexes['tab' + tab.id]"
          :class="[
            tabAtiva === tab.id
              ? isDarkMode
                ? 'modal-tab-active-dark'
                : 'modal-tab-active-light'
              : isDarkMode
              ? 'modal-tab-inactive-dark'
              : 'modal-tab-inactive-light',
          ]"
        >
          {{ tab.nome }}
        </button>
      </div>

      <!-- Conteúdo das abas -->
      <div class="modal-content-container">
        <!-- Aba 1: Informações básicas -->
        <div v-if="tabAtiva === 0" class="modal-section" ref="abaConteudo0">
          <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div class="modal-form-group col-span-1 sm:col-span-3">
              <label
                for="req-tituloRF"
                :class="[
                  'modal-form-label',
                  isDarkMode
                    ? 'modal-form-label-dark'
                    : 'modal-form-label-light',
                ]"
              >
                Título
                <span class="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="req-tituloRF"
                v-model="requisito.tituloRF"
                :class="[
                  'modal-form-input',
                  isDarkMode
                    ? 'modal-form-input-dark'
                    : 'modal-form-input-light',
                ]"
                :placeholder="
                  modoVisualizacao ? '' : 'Título do requisito funcional'
                "
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.tituloRF"
                autocomplete="off"
              />
            </div>

            <div class="modal-form-group col-span-1" style="position: relative">
              <label
                for="req-tipo"
                :class="[
                  'modal-form-label',
                  isDarkMode
                    ? 'modal-form-label-dark'
                    : 'modal-form-label-light',
                ]"
              >
                Tipo
                <span class="text-red-600">*</span>
              </label>
              <!-- Ícone de cadeado -->
              <svg
                v-if="!modoVisualizacao"
                @click="toggleDefaultField('tipo')"
                class="lock-icon-custom"
                :class="{ 'locked-custom': isDefaultField('tipo') }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                :style="getLockIconPosition('tipo', true)"
              >
                <path
                  v-if="isDefaultField('tipo')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                ></path>
              </svg>
              <select
                id="req-tipo"
                v-model="requisito.tipo"
                :style="getDefaultFieldStyle('tipo')"
                :class="[
                  'modal-form-input',
                  isDarkMode
                    ? 'modal-form-input-dark'
                    : 'modal-form-input-light',
                ]"
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
            <label
              for="req-local"
              :class="[
                'modal-form-label',
                isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light',
              ]"
            >
              Local
              <span class="text-red-600">*</span>
            </label>
            <!-- Ícone de cadeado -->
            <svg
              v-if="!modoVisualizacao"
              @click="toggleDefaultField('local')"
              class="lock-icon-custom"
              :class="{ 'locked-custom': isDefaultField('local') }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              :style="getLockIconPosition('local')"
            >
              <path
                v-if="isDefaultField('local')"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              ></path>
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
              ></path>
            </svg>
            <input
              type="text"
              id="req-local"
              v-model="requisito.local"
              :style="getDefaultFieldStyle('local')"
              :class="[
                'modal-form-input',
                isDarkMode ? 'modal-form-input-dark' : 'modal-form-input-light',
              ]"
              :placeholder="modoVisualizacao ? '' : 'Local de implementação'"
              :disabled="modoVisualizacao"
              :tabindex="tabIndexes.local"
              autocomplete="off"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="modal-form-group">
              <label
                for="req-usuario-teste"
                :class="[
                  'modal-form-label',
                  isDarkMode
                    ? 'modal-form-label-dark'
                    : 'modal-form-label-light',
                ]"
              >
                Usuário
                <span class="text-red-600">*</span>
              </label>
              <!-- Ícone de cadeado -->
              <svg
                v-if="!modoVisualizacao"
                @click="toggleDefaultField('usuario')"
                class="lock-icon-custom"
                :class="{ 'locked-custom': isDefaultField('usuario') }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                style="
                  position: absolute;
                  right: 10px;
                  top: 35px;
                  width: 16px;
                  height: 16px;
                  cursor: pointer;
                  z-index: 5;
                "
              >
                <path
                  v-if="isDefaultField('usuario')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                ></path>
              </svg>
              <input
                type="text"
                id="req-usuario-teste"
                v-model="requisito.usuario"
                :style="getDefaultFieldStyle('usuario')"
                :class="[
                  'modal-form-input',
                  isDarkMode
                    ? 'modal-form-input-dark'
                    : 'modal-form-input-light',
                ]"
                :placeholder="modoVisualizacao ? '' : 'Usuário alvo'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.usuario"
                autocomplete="off"
                autocorrect="off"
                autocapitalize="off"
                data-form-type="other"
                data-lpignore="true"
              />
            </div>

            <div class="modal-form-group">
              <label
                for="req-perfil"
                :class="[
                  'modal-form-label',
                  isDarkMode
                    ? 'modal-form-label-dark'
                    : 'modal-form-label-light',
                ]"
              >
                Perfil
                <span class="text-red-600">*</span>
              </label>
              <!-- Ícone de cadeado -->
              <svg
                v-if="!modoVisualizacao"
                @click="toggleDefaultField('perfil')"
                class="lock-icon-custom"
                :class="{ 'locked-custom': isDefaultField('perfil') }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                :style="getLockIconPosition('perfil')"
              >
                <path
                  v-if="isDefaultField('perfil')"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
                <path
                  v-else
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                ></path>
              </svg>
              <input
                type="text"
                id="req-perfil"
                v-model="requisito.perfil"
                :style="getDefaultFieldStyle('perfil')"
                :class="[
                  'modal-form-input',
                  isDarkMode
                    ? 'modal-form-input-dark'
                    : 'modal-form-input-light',
                ]"
                :placeholder="modoVisualizacao ? '' : 'Perfil de acesso'"
                :disabled="modoVisualizacao"
                :tabindex="tabIndexes.perfil"
                autocomplete="off"
                @keydown="onKeydown($event, 1)"
              />
            </div>
          </div>
        </div>

        <!-- Aba 2: Imagem e Descrição -->
        <div v-if="tabAtiva === 1" class="modal-section" ref="abaConteudo1">
          <!-- Seção de imagens (modo edição) -->
          <div class="modal-form-group" v-if="!modoVisualizacao">
            <label
              class="modal-form-label"
              for="btn-select-images"
              :class="
                isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light'
              "
            >
              Imagens
            </label>
            <div
              ref="uploadArea"
              :class="[
                'modal-upload-area',
                isDarkMode
                  ? 'modal-upload-area-dark'
                  : 'modal-upload-area-light',
              ]"
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
                :class="[
                  'modal-upload-button',
                  isDarkMode
                    ? 'modal-upload-button-dark'
                    : 'modal-upload-button-light',
                ]"
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
                class="modal-image-container relative"
              >
                <!-- Área clicável para visualizar a imagem -->
                <div
                  class="image-clickable-area group"
                  @click="abrirVisualizadorImagem(imagem)"
                >
                  <img
                    :src="imagem"
                    alt="Preview"
                    class="modal-image group-hover:opacity-80 group-hover:scale-105 transition-all duration-200"
                  />

                  <!-- Indicador de clique -->
                  <div
                    class="image-hover-overlay group-hover:bg-black group-hover:bg-opacity-20 transition-all duration-200"
                  >
                    <svg
                      class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      ></path>
                    </svg>
                  </div>
                </div>

                <!-- Botão de remover (fora da área clicável) -->
                <button
                  @click.stop="removerImagem(idx)"
                  class="modal-image-remove-button group"
                  :tabindex="tabIndexes.selectImagens + 1 + idx"
                  title="Remover imagem"
                >
                  ×
                </button>

                <!-- Indicador de tamanho -->
                <div
                  class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 text-center pointer-events-none"
                >
                  {{ calcularTamanhoImagem(imagem) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Exibição de imagens no modo visualização -->
          <div class="modal-form-group" v-if="modoVisualizacao">
            <label
              class="modal-form-label"
              :class="
                isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light'
              "
            >
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
                class="modal-image-container relative"
              >
                <!-- Área clicável para visualizar a imagem -->
                <div
                  class="image-clickable-area group cursor-pointer"
                  @click="abrirVisualizadorImagem(imagem)"
                >
                  <img
                    :src="imagem"
                    alt="Imagem do requisito"
                    :class="[
                      'modal-view-image group-hover:opacity-80 group-hover:scale-105 transition-all duration-200',
                      isDarkMode
                        ? 'modal-view-image-dark'
                        : 'modal-view-image-light',
                    ]"
                  />

                  <!-- Indicador de clique para visualização -->
                  <div
                    class="image-hover-overlay group-hover:bg-black group-hover:bg-opacity-20 transition-all duration-200"
                  >
                    <svg
                      class="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      ></path>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <!-- Quando não há imagens -->
            <div
              v-else
              :class="[
                'modal-empty-field',
                isDarkMode
                  ? 'modal-empty-field-dark'
                  : 'modal-empty-field-light',
              ]"
              style="min-height: 90px; padding: 0.7rem"
            >
              <em
                :class="
                  isDarkMode
                    ? 'modal-empty-text-dark'
                    : 'modal-empty-text-light'
                "
              >
                Nenhuma imagem foi inserida
              </em>
            </div>
          </div>

          <!-- Campo de descrição com editor rico Quill -->
          <div class="modal-form-group">
            <label
              for="req-descricao"
              class="form-label mb-0"
              :class="isDarkMode ? 'text-gray-200' : 'text-gray-700'"
            >
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
            <div v-else class="quill-editor-container modo-visualizacao">
              <div class="ql-container ql-snow">
                <div
                  class="ql-editor form-input"
                  v-html="descricaoContent || 'Sem descrição'"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aba 3: Regras -->
        <div v-if="tabAtiva === 2" class="modal-section" ref="abaConteudo2">
          <div class="modal-form-group">
            <label
              for="req-validacoes"
              :class="[
                'modal-form-label',
                isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light',
              ]"
            >
              Regras de validações dos campos
            </label>
            <div
              v-if="modoVisualizacao && !requisito.validacoes"
              :class="[
                'modal-empty-field',
                isDarkMode
                  ? 'modal-empty-field-dark'
                  : 'modal-empty-field-light',
              ]"
              style="min-height: 90px; padding: 0.7rem"
            >
              <em
                :class="
                  isDarkMode
                    ? 'modal-empty-text-dark'
                    : 'modal-empty-text-light'
                "
                >Não preenchido</em
              >
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
              style="min-height: 90px"
            >
              <div class="ql-container ql-snow">
                <div
                  class="ql-editor form-input"
                  v-html="validacoesContent || 'Não preenchido'"
                ></div>
              </div>
            </div>
          </div>

          <div class="modal-form-group">
            <label
              for="req-regras"
              :class="[
                'modal-form-label',
                isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light',
              ]"
            >
              Regras de negócio
            </label>
            <div
              v-if="modoVisualizacao && !requisito.regras"
              :class="[
                'modal-empty-field',
                isDarkMode
                  ? 'modal-empty-field-dark'
                  : 'modal-empty-field-light',
              ]"
              style="min-height: 90px; padding: 0.7rem"
            >
              <em
                :class="
                  isDarkMode
                    ? 'modal-empty-text-dark'
                    : 'modal-empty-text-light'
                "
                >Não preenchido</em
              >
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
              style="min-height: 90px"
            >
              <div class="ql-container ql-snow">
                <div
                  class="ql-editor form-input"
                  v-html="regrasContent || 'Não preenchido'"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Aba 4: Banco de dados -->
        <div v-if="tabAtiva === 3" class="modal-section" ref="abaConteudo3">
          <div class="modal-form-group">
            <label
              for="req-banco"
              :class="[
                'modal-form-label',
                isDarkMode ? 'modal-form-label-dark' : 'modal-form-label-light',
              ]"
            >
              Mudança de banco
            </label>
            <div
              v-if="modoVisualizacao && !requisito.banco"
              :class="[
                'modal-empty-field modal-empty-field-tall',
                isDarkMode
                  ? 'modal-empty-field-dark'
                  : 'modal-empty-field-light',
              ]"
              style="min-height: 200px; padding: 0.7rem"
            >
              <em
                :class="
                  isDarkMode
                    ? 'modal-empty-text-dark'
                    : 'modal-empty-text-light'
                "
                >Não preenchido</em
              >
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
              style="min-height: 200px"
            >
              <div class="ql-container ql-snow">
                <div
                  class="ql-editor form-input"
                  v-html="bancoContent || 'Não preenchido'"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Rodapé do modal com botões -->
        <div
          :class="[
            'modal-footer',
            isDarkMode ? 'modal-footer-dark' : 'modal-footer-light',
          ]"
        >
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
    <!-- Visualizador de Imagens -->
    <image-viewer
      :show="showImageViewer"
      :todas-imagens="requisito.imagens || []"
      :indice-inicial="indiceInicialVisualizacao"
      @fechar="fecharVisualizadorImagem"
    ></image-viewer>
  </div>
</template>

<script>
import RichTextEditor from "../components/RichTextEditor.vue";
import ImageViewer from "../components/ImageViewer.vue";
import defaultFieldMixin from "../mixins/defaultFieldMixin";
export default {
  name: "ModalRequisito",
  mixins: [defaultFieldMixin],
  components: {
    "rich-text-editor": RichTextEditor,
    ImageViewer,
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
    defaultFields: {
      type: Object,
      default: () => ({
        tipo: null,
        local: null,
        usuario: null,
        perfil: null,
      }),
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
      // Conteúdo para os novos editores Quill
      validacoesContent: "",
      regrasContent: "",
      bancoContent: "",
      // Referências aos editores Quill
      validacoesEditor: null,
      regrasEditor: null,
      bancoEditor: null,
      // Dados para o visualizador de imagens
      showImageViewer: false,
      indiceInicialVisualizacao: 0,
      imagemVisualizacao: "",
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
    // Título base do modal
    tituloModalBase() {
      return this.titulo; // "Adicionar Requisito Funcional", "Editar Requisito Funcional", etc.
    },

    // Título do RF (se existir)
    tituloRF() {
      if (
        this.requisito &&
        this.requisito.tituloRF &&
        this.requisito.tituloRF.trim()
      ) {
        return this.requisito.tituloRF.trim();
      }
      return null;
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
    "requisito.tipo": {
      handler() {
        // Force re-render quando o tipo mudar
        this.$forceUpdate();
      },
    },

    "requisito.perfil": {
      handler() {
        // Force re-render quando o perfil mudar
        this.$forceUpdate();
      },
    },

    "requisito.tituloRF": {
      handler() {
        // Force re-render quando o título mudar
        this.$forceUpdate();
      },
    },
  },
  methods: {
    getDisplayId() {
      // Se estamos editando um requisito existente com ID válido
      if (
        this.requisito &&
        this.requisito.id &&
        this.requisito.id.startsWith("RF-") &&
        this.requisito.id !== "RF-00"
      ) {
        return this.requisito.id;
      }

      // Se estamos criando um novo requisito, mostrar o próximo número disponível
      const proximoNumero = this.totalRequisitos + 1;
      return `RF-${String(proximoNumero).padStart(2, "0")}`;
    },

    getTipoClass() {
      const baseClasses = "rf-tipo-badge";

      switch (this.requisito.tipo) {
        case "Inclusão":
          return `${baseClasses} rf-tipo-inclusao`;
        case "Alteração":
          return `${baseClasses} rf-tipo-alteracao`;
        case "Remoção":
          return `${baseClasses} rf-tipo-remocao`;
        default:
          return baseClasses;
      }
    },

    // Métodos para o visualizador de imagens
    abrirVisualizadorImagem(imagemSrc) {
      // Encontrar o índice da imagem clicada
      const indice = this.requisito.imagens.findIndex(
        (img) => img === imagemSrc
      );
      this.indiceInicialVisualizacao = Math.max(0, indice);
      this.showImageViewer = true;
    },

    fecharVisualizadorImagem() {
      this.showImageViewer = false;
    },

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
      // Antes de trocar, atualizar os dados do requisito com os valores atuais dos editores
      if (this.tabAtiva === 1) {
        // Salvando dados da descrição
        this.requisito.descricao = this.descricaoContent;
      } else if (this.tabAtiva === 2) {
        // Salvando dados das regras
        this.requisito.validacoes = this.validacoesContent;
        this.requisito.regras = this.regrasContent;
      } else if (this.tabAtiva === 3) {
        // Salvando dados do banco
        this.requisito.banco = this.bancoContent;
      }

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
        // Restaurar valores nos novos editores
        if (id === 1) {
          this.descricaoContent = this.requisito.descricao || "";
        } else if (id === 2) {
          this.validacoesContent = this.requisito.validacoes || "";
          this.regrasContent = this.requisito.regras || "";
        } else if (id === 3) {
          this.bancoContent = this.requisito.banco || "";
        }

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
      // Antes de fechar, garantir que todos os dados estejam sincronizados com o requisito
      if (this.requisito) {
        this.requisito.descricao = this.descricaoContent;
        this.requisito.validacoes = this.validacoesContent;
        this.requisito.regras = this.regrasContent;
        this.requisito.banco = this.bancoContent;
      }
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

      // Atualizar os valores finais antes de salvar, garantindo que campos vazios sejam salvos como ""
      const cleanContent = (content) => {
        if (!content || content.replace(/<[^>]*>/g, "").trim() === "") {
          return "";
        }
        return content;
      };

      this.requisito.descricao = cleanContent(this.descricaoContent);
      this.requisito.validacoes = cleanContent(this.validacoesContent);
      this.requisito.regras = cleanContent(this.regrasContent);
      this.requisito.banco = cleanContent(this.bancoContent);

      // Verificar tamanho total das imagens
      if (this.requisito.imagens && this.requisito.imagens.length > 0) {
        const totalSize = this.requisito.imagens.reduce((acc, img) => {
          // Estimar tamanho do base64 (aproximadamente 1.37x o tamanho binário)
          return acc + img.length * 0.75;
        }, 0);

        const totalSizeMB = totalSize / (1024 * 1024);

        if (totalSizeMB > 5) {
          // Limite de 5MB total
          this.notificationService.show(
            `O tamanho total das imagens (${totalSizeMB.toFixed(
              2
            )}MB) excede o limite de 5MB. Por favor, remova algumas imagens ou use imagens menores.`,
            "error"
          );
          return;
        }
      }

      // Se chegou aqui, todos os campos estão preenchidos
      if (
        this.requisito &&
        this.requisito.id &&
        this.requisito.id.startsWith("RF-")
      ) {
        // Requisito existente - verificar se é um ID válido (não RF-00 ou similar para duplicados)
        const idParts = this.requisito.id.split("-");
        if (idParts.length === 2) {
          const numPart = parseInt(idParts[1]);
          // Verifica se é um número válido maior que zero
          if (!isNaN(numPart) && numPart > 0) {
            const editIndex = numPart - 1;
            // Emitir evento de atualização com o requisito clonado
            this.$emit(
              "update-requisito",
              editIndex,
              JSON.parse(JSON.stringify(this.requisito)),
              true // focusAddButton
            );

            // Adicionar notificação de sucesso após a edição
            if (this.$parent && this.$parent.notificationService) {
              this.$parent.notificationService.show(
                `O requisito ${this.requisito.id} foi atualizado com sucesso!`,
                "success"
              );
            }
          } else {
            // ID inválido ou temporário (como em duplicações), tratar como novo requisito
            this.tratarComoNovoRequisito();
          }
        } else {
          // Formato inválido, tratar como novo requisito
          this.tratarComoNovoRequisito();
        }
      } else {
        // Novo requisito ou ID inválido
        this.tratarComoNovoRequisito();
      }

      this.$emit("fechar", true); // focusAddButton
    },

    tratarComoNovoRequisito() {
      // Gerar novo ID baseado no total de requisitos
      const novoId = "RF-" + String(this.totalRequisitos + 1).padStart(2, "0");
      this.requisito.id = novoId;

      // Emitir evento para adicionar o requisito
      this.$emit(
        "add-requisito",
        JSON.parse(JSON.stringify(this.requisito)),
        true
      );

      // Adicionar notificação de sucesso
      if (this.$parent && this.$parent.notificationService) {
        this.$parent.notificationService.show(
          `Requisito ${novoId} adicionado com sucesso!`,
          "success"
        );
      }
    },

    calcularTamanhoImagem(base64String) {
      const sizeInBytes = base64String.length * 0.75;
      const sizeInKB = sizeInBytes / 1024;

      if (sizeInKB > 1024) {
        return `${(sizeInKB / 1024).toFixed(2)} MB`;
      }
      return `${sizeInKB.toFixed(2)} KB`;
    },

    // Método para lidar com upload de arquivos
    handleFileUpload(event) {
      this.$emit("upload-imagem", event);
    },

    removerImagem(index) {
      this.$emit("remover-imagem", index);
    },

    updateDescricaoContent(content) {
      // Verifica se o conteúdo está vazio ou contém apenas tags vazias
      const isEmptyContent =
        !content || content.replace(/<[^>]*>/g, "").trim() === "";
      this.descricaoContent = isEmptyContent ? "" : content;

      if (this.requisito) {
        this.requisito.descricao = isEmptyContent ? "" : content;
      }

      // Se o conteúdo não estiver mais vazio, remover os estilos de erro
      if (!isEmptyContent) {
        this.limparErroEditor();
      }
    },

    updateValidacoesContent(content) {
      // Verifica se o conteúdo está vazio ou contém apenas tags vazias
      const isEmptyContent =
        !content || content.replace(/<[^>]*>/g, "").trim() === "";
      this.validacoesContent = isEmptyContent ? "" : content;

      if (this.requisito) {
        this.requisito.validacoes = isEmptyContent ? "" : content;
      }
    },

    updateRegrasContent(content) {
      // Verifica se o conteúdo está vazio ou contém apenas tags vazias
      const isEmptyContent =
        !content || content.replace(/<[^>]*>/g, "").trim() === "";
      this.regrasContent = isEmptyContent ? "" : content;

      if (this.requisito) {
        this.requisito.regras = isEmptyContent ? "" : content;
      }
    },

    updateBancoContent(content) {
      // Verifica se o conteúdo está vazio ou contém apenas tags vazias
      const isEmptyContent =
        !content || content.replace(/<[^>]*>/g, "").trim() === "";
      this.bancoContent = isEmptyContent ? "" : content;

      if (this.requisito) {
        this.requisito.banco = isEmptyContent ? "" : content;
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
};
</script>

<style scoped>
@import "../assets/css/colors.css";
@import "../assets/css/modal.css";

.modal-open {
  overflow: hidden;
}

.form-group,
.modal-form-group {
  position: relative;
}

.lock-icon-custom {
  transition: all 0.2s ease;
  color: #9ca3af; /* Cor padrão */
}

.lock-icon-custom:hover {
  transform: scale(1.2);
}

.locked-custom {
  color: #3b82f6 !important; /* Cor azul quando bloqueado */
}

.dark .locked-custom {
  color: #2a90de !important; /* Cor azul quando bloqueado no modo escuro */
}

.modal-image-container {
  position: relative;
}

.modal-view-images-grid .modal-image-container {
  position: relative;
}

/* Indicador visual de que a imagem é clicável */
.modal-image-container:hover .modal-image,
.modal-image-container:hover .modal-view-image {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}

.image-clickable-area {
  @apply relative cursor-pointer;
  width: 100%;
  height: 100%;
  display: block;
}

.image-hover-overlay {
  @apply absolute inset-0 flex items-center justify-center transition-all duration-200;
}

/* Melhorar o botão de remoção */
.modal-image-remove-button {
  @apply absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10 cursor-pointer;
  @apply hover:bg-red-600 transition-colors duration-200;
}

/* Garantir que o indicador de tamanho não interfira com cliques */
.modal-image-container .pointer-events-none {
  pointer-events: none;
}

/* Efeito hover mais suave para a imagem */
.image-clickable-area:hover .modal-image {
  transform: scale(1.02);
  transition: transform 0.2s ease;
}

.modal-requisito-title {
  /* Permitir quebra de linha para títulos longos */
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;

  /* Limitar altura máxima se necessário */
  max-height: 4.5em; /* Aproximadamente 3 linhas */
  overflow: hidden;

  /* Melhorar espaçamento entre linhas */
  line-height: 1.4;
}

/* Responsividade para telas menores */
@media (max-width: 640px) {
  .modal-requisito-title {
    font-size: 1.1rem; /* Diminuir fonte em telas pequenas */
    max-height: 6em; /* Mais espaço em mobile */
  }
}

.modal-requisito-title {
  /* Permitir quebra de linha para títulos longos */
  word-wrap: break-word;
  word-break: break-word;
  hyphens: auto;

  /* Limitar altura máxima se necessário */
  max-height: 4.5em; /* Aproximadamente 3 linhas */
  overflow: hidden;

  /* Melhorar espaçamento entre linhas */
  line-height: 1.4;
}

/* Título base - mantém o estilo original (negrito) */
.titulo-base {
  font-weight: bold;
}

/* Separador entre títulos */
.titulo-separador {
  font-weight: bold;
  opacity: 0.7;
}

/* Título do RF - estilo diferenciado */
.titulo-rf {
  font-weight: normal; /* Remove negrito */
  font-style: italic; /* Adiciona itálico */
  font-size: 1.1rem; /* Tamanho de fonte um pouco maior */
}

/* Cores para modo claro */
.titulo-rf-light {
  @apply text-gray-700;
}

/* Cores para modo escuro */
.titulo-rf-dark {
  @apply text-gray-400;
}

/* Responsividade para telas menores */
@media (max-width: 640px) {
  .modal-requisito-title {
    font-size: 1.1rem; /* Diminuir fonte em telas pequenas */
    max-height: 6em; /* Mais espaço em mobile */
  }

  /* Em telas muito pequenas, quebrar em linhas separadas */
  .titulo-separador {
    display: block;
    margin: 0.2rem 0;
  }
}

/* ===== RF Title Badge Styles ===== */
.rf-id-badge {
  @apply inline-block px-2 py-1 text-xs font-bold rounded-lg;
  @apply bg-indigo-100 text-indigo-800 border border-indigo-200;
  @apply dark:bg-indigo-700 dark:text-indigo-50 dark:border-transparent;
  @apply flex-shrink-0;
  min-width: 3rem;
  text-align: center;
}

.rf-id-badge-placeholder {
  @apply inline-block px-2 py-1 text-xs font-bold rounded-lg;
  @apply bg-gray-400 text-white;
  @apply dark:bg-gray-600;
  @apply flex-shrink-0;
  min-width: 3rem;
  text-align: center;
}

.rf-title-badge {
  @apply inline-block px-2 py-1 text-xs font-medium rounded-lg;
  @apply bg-blue-100 text-blue-900 border border-blue-200;
  @apply dark:bg-blue-750 dark:text-blue-50 dark:border-transparent;
  word-wrap: break-word;
  word-break: break-word;
  line-height: 1.4;
}

.rf-title-placeholder {
  @apply text-sm text-gray-500 italic;
  @apply dark:text-gray-400;
}

.rf-tipo-badge {
  @apply inline-block px-2 py-1 text-xs font-bold rounded-lg;
  @apply flex-shrink-0 dark:border-transparent;
  min-width: 4rem;
  text-align: center;
  letter-spacing: 0.3px;
}

.rf-tipo-inclusao {
  @apply bg-green-100 text-green-900 border border-green-200;
  @apply dark:bg-green-700 dark:text-green-50;
}

.rf-tipo-alteracao {
  @apply bg-yellow-100 text-yellow-900 border border-yellow-200;
  @apply dark:bg-yellow-700 dark:text-yellow-50;
}

.rf-tipo-remocao {
  @apply bg-red-100 text-red-900 border border-red-200;
  @apply dark:bg-red-700 dark:text-red-50;
}

.rf-perfil-badge {
  @apply inline-block px-2 py-1 text-xs font-bold rounded-lg;
  @apply bg-purple-100 text-purple-900 border border-purple-200;
  @apply dark:bg-purple-700 dark:text-purple-50 dark:border-transparent;
  @apply flex-shrink-0;
  min-width: 3rem;
  text-align: center;
  letter-spacing: 0.3px;
}

.rf-info-placeholder {
  @apply inline-block px-2 py-1 text-xs font-medium rounded;
  @apply bg-gray-200 text-gray-500 border border-dashed border-gray-400;
  @apply dark:bg-gray-700 dark:text-gray-400 dark:border-gray-500;
  @apply flex-shrink-0;
  min-width: 3rem;
  text-align: center;
  letter-spacing: 0.3px;
  font-style: italic;
}
</style>
