<template>
  <div class="quill-editor-container">
    <div :id="containerId"></div>
  </div>
</template>

<script>
import Quill from "quill";
import { Delta } from "quill";
import Link from "quill/formats/link";

export default {
  name: "RichTextEditor",
  props: {
    value: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "Digite o conteúdo aqui...",
    },
    tabIndex: {
      type: Number,
      default: 0,
    },
  },
  emits: ["input", "change", "editor-ready", "tab-pressed"],
  data() {
    return {
      editor: null,
      content: this.value,
      isInitialized: false,
      containerId: `quill-editor-${Math.random().toString(36).substring(2, 9)}`,
    };
  },
  computed: {
    isReadOnly() {
      return this.disabled;
    },
  },
  watch: {
    value(newVal) {
      if (this.editor && newVal !== this.editor.root.innerHTML) {
        this.editor.root.innerHTML = newVal;
      }
    },
    disabled(newVal) {
      if (this.editor) {
        this.editor.enable(!newVal);
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initQuill();
    });
  },
  methods: {
    initQuill() {
      // Verificar se o elemento existe no DOM antes de inicializar
      const element = document.getElementById(this.containerId);
      if (!element) return;

      // Configuração dos módulos e opções do Quill
      const toolbarOptions = [
        ["bold", "italic", "underline"], // botões para formatação de texto
        [{ color: [] }], // cor da fonte
        ["code"], // código
        [{ list: "ordered" }, { list: "bullet" }], // listas
        [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
        [{ align: [] }], // alinhamento
        ["clean"], // limpar formatação
      ];

      // Criar o editor Quill
      this.editor = new Quill(`#${this.containerId}`, {
        modules: {
          toolbar: toolbarOptions,
          keyboard: {
            bindings: {
              tab: {
                key: 9,
                handler: (range, context) => {
                  // Quando TAB é pressionado no editor, emitir evento para o componente pai
                  console.log("Tab pressed in Quill editor");
                  this.$emit("tab-pressed");
                  return false; // Impedir o comportamento padrão do TAB no editor
                },
              },
            },
          },
        },
        theme: "snow",
        placeholder: this.placeholder,
        readOnly: this.isReadOnly,
        formats: [
          "bold",
          "italic",
          "underline",
          "color",
          "background",
          "code",
          "list",
          "indent",
          "align",
        ],
      });

      // Definir o estilo da fonte padrão para combinar com o resto da aplicação
      this.editor.root.style.fontFamily = "Calibri, sans-serif";
      this.editor.root.style.fontSize = "18px";

      // Inicializar o conteúdo
      if (this.value) {
        this.editor.root.innerHTML = this.value;
      }

      // Eventos
      this.editor.on("text-change", () => {
        this.content = this.editor.root.innerHTML;
        this.$emit("input", this.content);
        this.$emit("change", this.content);
      });

      this.isInitialized = true;
      this.$emit("editor-ready", this.editor);
    },
    focus() {
      if (this.editor && !this.disabled) {
        this.editor.focus();
      }
    },
  },
};
</script>

<style scoped>
@import "../assets/css/colors.css";
@import "../assets/css/quill-overrides.css";
</style>
