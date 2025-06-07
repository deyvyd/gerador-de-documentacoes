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
              <span class="badge-base badge-rf-id xs-bagde">{{
                getDisplayId().toUpperCase()
              }}</span>

              <!-- Badge do Perfil -->
              <span
                v-if="requisito.perfil"
                class="badge-base badge-perfil xs-bagde"
              >
                {{ requisito.perfil.toUpperCase() }}
              </span>

              <!-- Badge do Tipo -->
              <span v-if="requisito.tipo" :class="getTipoClass()">
                {{ requisito.tipo.toUpperCase() }}
              </span>
            </div>

            <!-- Segunda linha: Título -->
            <div class="flex items-start">
              <div v-if="tituloRF" class="badge-base badge-title">
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
              <!-- Ícone de cadeado com tooltip -->
              <div
                v-if="!modoVisualizacao"
                class="lock-icon-container"
                :style="getLockIconPosition('tipo', true)"
              >
                <svg
                  @click="toggleDefaultField('tipo')"
                  class="lock-icon-custom"
                  :class="{ 'locked-custom': isDefaultField('tipo') }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

                <!-- Tooltip -->
                <div class="lock-tooltip">
                  {{
                    isDefaultField("tipo")
                      ? "Remover como padrão"
                      : "Definir como padrão"
                  }}
                </div>
              </div>
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
            <!-- Ícone de cadeado com tooltip -->
            <div
              v-if="!modoVisualizacao"
              class="lock-icon-container"
              :style="getLockIconPosition('local')"
            >
              <svg
                @click="toggleDefaultField('local')"
                class="lock-icon-custom"
                :class="{ 'locked-custom': isDefaultField('local') }"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
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

              <!-- Tooltip -->
              <div class="lock-tooltip">
                {{
                  isDefaultField("local")
                    ? "Remover como padrão"
                    : "Definir como padrão"
                }}
              </div>
            </div>
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
              <!-- Ícone de cadeado com tooltip -->
              <div
                v-if="!modoVisualizacao"
                class="lock-icon-container"
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
                <svg
                  @click="toggleDefaultField('usuario')"
                  class="lock-icon-custom"
                  :class="{ 'locked-custom': isDefaultField('usuario') }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

                <!-- Tooltip -->
                <div class="lock-tooltip">
                  {{
                    isDefaultField("usuario")
                      ? "Remover como padrão"
                      : "Definir como padrão"
                  }}
                </div>
              </div>
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
              <!-- Ícone de cadeado com tooltip -->
              <div
                v-if="!modoVisualizacao"
                class="lock-icon-container"
                :style="getLockIconPosition('perfil')"
              >
                <svg
                  @click="toggleDefaultField('perfil')"
                  class="lock-icon-custom"
                  :class="{ 'locked-custom': isDefaultField('perfil') }"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
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

                <!-- Tooltip -->
                <div class="lock-tooltip">
                  {{
                    isDefaultField("perfil")
                      ? "Remover como padrão"
                      : "Definir como padrão"
                  }}
                </div>
              </div>
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
              ref="imageGrid"
              :key="`images-${requisito.imagens.length}-${requisito.imagens
                .map((img, i) => i)
                .join('-')}`"
            >
              <div
                v-for="(imagem, idx) in requisito.imagens"
                :key="`img-${idx}-${imagem.substring(0, 50)}`"
                class="modal-image-container relative"
                :data-image-index="idx"
              >
                <!-- Imagem principal - área completa clicável/arrastável -->
                <img
                  :src="imagem"
                  alt="Preview"
                  class="modal-image"
                  @click="!isImageDragging && abrirVisualizadorImagem(imagem)"
                />

                <!-- Botão de remover (único indicador visual) -->
                <button
                  @click.stop="removerImagem(idx)"
                  class="modal-image-remove-button"
                  :tabindex="tabIndexes.selectImagens + 1 + idx"
                  title="Remover imagem"
                  v-if="!modoVisualizacao"
                >
                  ×
                </button>

                <!-- Indicador de ordem (apenas número) -->
                <div class="image-order-indicator">
                  {{ String(idx + 1).padStart(2, "0") }}
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
                  <!-- Indicador de ordem -->
                  <div
                    class="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 text-center pointer-events-none font-bold"
                  >
                    {{ String(idx + 1).padStart(2, "0") }}
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
import Sortable from "sortablejs";
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
      // Controle do Sortable para imagens
      imageSortableInstance: null,
      isImageDragging: false,
      sortableInitTimeout: null,
      skipImageWatcher: false,
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
    "requisito.imagens": {
      handler(newVal, oldVal) {
        // Ignorar mudanças durante drag ou quando explicitamente solicitado
        if (this.isImageDragging || this.skipImageWatcher) {
          return;
        }

        // Se estivermos na aba de imagens E temos 2+ imagens
        if (this.tabAtiva === 1 && newVal && newVal.length > 1) {
          // Debounce para evitar múltiplas inicializações
          if (this.sortableInitTimeout) {
            clearTimeout(this.sortableInitTimeout);
          }

          this.sortableInitTimeout = setTimeout(() => {
            this.initImageSortable();
          }, 200);
        }
        // Se temos menos de 2 imagens, destruir sortable
        else if (!newVal || newVal.length < 2) {
          this.destroyImageSortable();
        }
      },
      deep: true,
      immediate: false,
    },

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
          this.initImageSortable();
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

    modoVisualizacao(newVal) {
      if (newVal) {
        this.destroyImageSortable();
      } else {
        this.$nextTick(() => {
          this.initImageSortable();
        });
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
    // ===== Sortable para Imagens =====

    // Método para verificar se deve inicializar o sortable
    checkAndInitSortable() {
      if (
        this.tabAtiva === 1 &&
        !this.modoVisualizacao &&
        this.requisito.imagens &&
        this.requisito.imagens.length > 1
      ) {
        this.initImageSortable();
      } else {
      }
    },

    initImageSortable() {
      if (this.modoVisualizacao) {
        return;
      }

      if (this.tabAtiva !== 1) {
        return;
      }

      // Tentar encontrar o elemento de várias formas
      let gridElement = this.$refs.imageGrid;

      if (!gridElement) {
        gridElement = document.querySelector(".modal-image-grid");
      }

      if (!gridElement) {
        return;
      }

      if (!this.requisito.imagens || this.requisito.imagens.length < 2) {
        return;
      }

      // Destruir instância anterior
      this.destroyImageSortable();

      try {
        this.imageSortableInstance = Sortable.create(gridElement, {
          animation: 200,
          handle: ".modal-image-container",
          ghostClass: "sortable-ghost-image",
          chosenClass: "sortable-chosen-image",
          dragClass: "sortable-drag-image",

          filter: ".modal-image-remove-button",
          preventOnFilter: false,

          forceFallback: false,
          fallbackTolerance: 3,

          onStart: (evt) => {
            this.isImageDragging = true;
            this.showImageSlots();
          },

          onEnd: (evt) => {
            this.isImageDragging = false;
            this.hideImageSlots();

            if (evt.oldIndex !== evt.newIndex) {
              this.reorderImages(evt.oldIndex, evt.newIndex);
            }
          },
        });
      } catch (error) {
        console.error("❌ Erro ao criar sortable:", error);
      }
    },

    destroyImageSortable() {
      if (this.imageSortableInstance) {
        try {
          this.imageSortableInstance.destroy();
        } catch (error) {
          console.warn("Aviso ao destruir sortable de imagens:", error);
        } finally {
          this.imageSortableInstance = null;
        }
      }

      // Limpar qualquer estado de drag restante
      this.isImageDragging = false;

      // Remover slots vazios se existirem
      this.hideImageSlots();
    },

    reorderImages(oldIndex, newIndex) {
      if (!this.requisito.imagens) return;

      // Fazer uma cópia do array
      const images = [...this.requisito.imagens];
      const totalImagens = images.length;

      // Cenário 1: Arrastar para um slot vazio (posição além das imagens existentes)
      if (newIndex >= totalImagens) {
        // Remove a imagem da posição original
        const movedImage = images.splice(oldIndex, 1)[0];
        // Adiciona no final
        images.push(movedImage);
      }
      // Cenário 2: Mover para a direita (newIndex > oldIndex)
      else if (newIndex > oldIndex) {
        // Remove a imagem da posição original
        const movedImage = images.splice(oldIndex, 1)[0];
        // Insere na nova posição
        images.splice(newIndex, 0, movedImage);
      }
      // Cenário 3: Mover para a esquerda (newIndex < oldIndex)
      else if (newIndex < oldIndex) {
        // Remove a imagem da posição original
        const movedImage = images.splice(oldIndex, 1)[0];
        // Insere na nova posição
        images.splice(newIndex, 0, movedImage);
      } else {
        return;
      }

      // Atualizar de forma que force a reatividade
      this.requisito.imagens.splice(
        0,
        this.requisito.imagens.length,
        ...images
      );
    },

    // Mostrar slots visuais durante o drag
    showImageSlots() {
      const gridElement = this.$refs.imageGrid;
      if (!gridElement) return;

      // Adicionar classe que mostra os slots
      gridElement.classList.add("show-drag-slots");

      // Calcular quantos slots mostrar (múltiplos de 4, mínimo 4)
      const currentImages = this.requisito.imagens.length;
      const slotsToShow = Math.max(4, Math.ceil(currentImages / 4) * 4);

      // Adicionar slots vazios apenas se necessário
      const slotsVaziosNecessarios = slotsToShow - currentImages;

      for (let i = 0; i < slotsVaziosNecessarios; i++) {
        const slotIndex = currentImages + i; // Índice correto baseado nas imagens existentes
        const emptySlot = document.createElement("div");
        emptySlot.className = "modal-image-empty-slot";
        emptySlot.innerHTML = `
      <div class="empty-slot-content">
        <span class="empty-slot-number">${String(slotIndex + 1).padStart(
          2,
          "0"
        )}</span>
      </div>
    `;
        emptySlot.setAttribute("data-empty-slot", "true");
        emptySlot.setAttribute("data-slot-index", slotIndex);
        gridElement.appendChild(emptySlot);
      }
    },

    // Esconder slots visuais após o drag
    hideImageSlots() {
      const gridElement = this.$refs.imageGrid;
      if (!gridElement) return;

      // Remover classe dos slots
      gridElement.classList.remove("show-drag-slots");

      // Remover slots vazios temporários
      const emptySlots = gridElement.querySelectorAll(
        '[data-empty-slot="true"]'
      );
      emptySlots.forEach((slot) => slot.remove());
    },

    getDisplayId() {
      // Se estamos editando um requisito existente com ID válido (não temporário)
      if (
        this.requisito &&
        this.requisito.id &&
        this.requisito.id.startsWith("RF-") &&
        this.requisito.id !== "RF-00"
      ) {
        const idParts = this.requisito.id.split("-");
        if (idParts.length === 2) {
          const numPart = parseInt(idParts[1]);
          // Verifica se é um número válido maior que zero
          if (!isNaN(numPart) && numPart > 0) {
            return this.requisito.id;
          }
        }
      }

      // Para novos requisitos ou IDs temporários (como duplicações),
      // mostrar o próximo número disponível
      const proximoNumero = this.totalRequisitos + 1;
      return `RF-${String(proximoNumero).padStart(2, "0")}`;
    },

    getTipoClass() {
      const baseClasses = "badge-base badge-tipo xs-bagde";

      switch (this.requisito.tipo) {
        case "Inclusão":
          return `${baseClasses} badge-tipo-inclusao`;
        case "Alteração":
          return `${baseClasses} badge-tipo-alteracao`;
        case "Remoção":
          return `${baseClasses} badge-tipo-remocao`;
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
        } else {
          console.warn("Validacoes field not found in the DOM");
          // Fallback: try to find any textarea in the current tab content
          const abaConteudo = this.$refs.abaConteudo2;
          if (abaConteudo) {
            const textarea = abaConteudo.querySelector("textarea");
            if (textarea) {
              textarea.focus();
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
          setTimeout(() => {
            this.checkAndInitSortable();
          }, 200);
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

      // Reinicializar sortable após adicionar imagens
      this.$nextTick(() => {
        this.initImageSortable();
      });
    },

    // Atualizar método de remoção
    removerImagem(index) {
      this.$emit("remover-imagem", index);

      // Reinicializar sortable após remover imagem
      this.$nextTick(() => {
        this.initImageSortable();
      });
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
    this.destroyImageSortable();
    if (this.sortableInitTimeout) {
      clearTimeout(this.sortableInitTimeout);
    }
  },
};
</script>

<style scoped>
@import "../assets/css/colors.css";
@import "../assets/css/styles.css";
@import "../assets/css/modal.css";

.modal-open {
  overflow: hidden;
}

.form-group,
.modal-form-group {
  position: relative;
}

/* Container para o ícone de cadeado com tooltip */
.lock-icon-container {
  position: absolute;
  cursor: pointer;
  z-index: 5;
  width: 16px;
  height: 16px;
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

/* Tooltip customizado para cadeados */
.lock-tooltip {
  @apply invisible absolute opacity-0;
  @apply text-white text-xs rounded p-1 px-2;
  @apply z-50 text-center transition-all duration-300;
  @apply pointer-events-none whitespace-nowrap;
  /* Posicionamento diagonal inferior direita */
  top: 18px;
  left: 18px;
  /* Cores padrão do tooltip do sistema */
  background-color: #1f2937; /* gray-800 mais escuro */
  border: 1px solid #374151; /* gray-700 para borda mais clara */
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.lock-icon-container:hover .lock-tooltip {
  @apply visible opacity-100;
}

/* Tema escuro - mantém o mesmo estilo já que tooltip é sempre escuro */
.dark .lock-tooltip {
  background-color: #1f2937;
  border-color: #374151;
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

/* ===== Estilos específico de badges no modal ===== */
.xs-bagde {
  @apply text-[0.7rem];
}

.rf-title-placeholder {
  @apply text-sm text-gray-500 italic;
  @apply dark:text-gray-400;
}

/* ===== Grid e Container de Imagens ===== */
.modal-image-grid {
  @apply mt-4 grid gap-2;
  grid-template-columns: repeat(auto-fill, 140px);
  justify-content: start;
  transition: all 0.3s ease;
}

.modal-image-container {
  @apply relative;
  width: 140px;
  height: 96px;
  cursor: pointer;
}

.modal-image {
  @apply w-full h-full object-cover rounded;
  width: 140px;
  height: 96px;
  transition: all 0.2s ease;
}

/* Hover sutil apenas na imagem */
.modal-image-container:hover .modal-image {
  @apply transform scale-105;
}

/* ===== Indicadores mínimos ===== */
.image-order-indicator {
  @apply absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white text-xs p-1 text-center pointer-events-none font-bold;
}

.modal-image-remove-button {
  @apply absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg z-10 cursor-pointer;
  @apply hover:bg-red-600 transition-colors duration-200;
}

/* ===== Estados do Drag ===== */
.show-drag-slots {
  @apply bg-blue-50 dark:bg-blue-900/20 border-2 border-dashed border-blue-300 dark:border-blue-600;
  @apply rounded-lg p-2;
}

.modal-image-empty-slot {
  @apply border-2 border-dashed border-gray-300 dark:border-gray-600;
  @apply rounded-lg flex items-center justify-center;
  @apply bg-gray-50 dark:bg-gray-700/50;
  @apply transition-all duration-200;
  width: 140px;
  height: 96px;
}

.empty-slot-content {
  @apply flex flex-col items-center justify-center text-gray-400 dark:text-gray-500;
}

.empty-slot-number {
  @apply text-sm font-bold;
}

/* ===== Estados do Sortable ===== */
.sortable-ghost-image {
  @apply opacity-30;
}

.sortable-chosen-image {
  @apply cursor-grabbing;
}

.sortable-chosen-image .modal-image {
  @apply transform scale-110 shadow-lg;
}

.sortable-drag-image {
  @apply transform rotate-2 shadow-xl z-50;
}

/* ===== Melhorar feedback visual durante drag ===== */
.modal-image-container.sortable-chosen {
  @apply z-10;
}

.modal-image-grid.show-drag-slots .modal-image-container:not(.sortable-chosen) {
  @apply opacity-70;
}

.modal-image-grid.show-drag-slots .modal-image-empty-slot:hover {
  @apply border-blue-400 bg-blue-100 dark:border-blue-500 dark:bg-blue-800/30;
}
</style>
