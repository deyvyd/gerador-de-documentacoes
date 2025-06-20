<template>
  <div id="app">
    <div class="container">
      <router-view />
    </div>

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
