<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>

    <footer class="portal-footer">
      <div class="portal-footer-inner">
        <span class="portal-footer-name">Deyvyd Moura</span>
        <div class="portal-footer-dot"></div>
        <span class="portal-footer-name">2026</span>
      </div>
    </footer>

    <modal-message
      :show="showMessageModal"
      :titulo="messageTitle"
      :mensagem="messageContent"
      :tipo="messageType"
      :texto-botao-confirmar="messageConfirmButtonText"
      :texto-botao-cancelar="'Cancelar'"
      :show-cancel-button="true"
      :fechar-ao-clicar-fora="false"
      @confirmar="confirmarModalMensagem"
      @cancelar="cancelarModalMensagem"
    ></modal-message>
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";
import BasicFormSection from "./components/BasicFormSection.vue";
import DataTable from "./components/DataTable.vue";
import FormSubmitSection from "./components/FormSubmitSection.vue";
import InfoButton from "./components/InfoButton.vue";
import ModalMessage from "./components/ModalMessage.vue";
import ModalRequisito from "./components/ModalRequisito.vue";
import RichTextEditor from "./components/RichTextEditor.vue";
import SwapButton from "./components/SwapButton.vue";
import ThemeToggle from "./components/ThemeToggle.vue";
import ToastNotification from "./components/ToastNotification.vue";
import UploadButton from "./components/UploadButton.vue";
import appBase from "./mixins/appBase";
import TourGuide from "./components/TourGuide.vue";

export default {
  name: "App",
  mixins: [appBase],
  components: {
    AppHeader,
    BasicFormSection,
    DataTable,
    FormSubmitSection,
    InfoButton,
    ModalMessage,
    ModalRequisito,
    RichTextEditor,
    SwapButton,
    ThemeToggle,
    ToastNotification,
    UploadButton,
    TourGuide,
  },
  methods: {},
};
</script>

<style>
.portal-footer {
  position: relative;
  z-index: 1;
  border-top: 1px solid var(--light-border-primary);
  margin-top: 64px;
}
.dark .portal-footer {
  border-top-color: rgba(255, 255, 255, 0.04);
}
.portal-footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 16px;
  max-width: 80rem;
  margin: 0 auto;
}
.portal-footer-name {
  font-size: 11px;
  color: #94a3b8;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.dark .portal-footer-name {
  color: #64748b;
}
.portal-footer-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: linear-gradient(135deg, #a78bfa, #22d3ee);
}
</style>
