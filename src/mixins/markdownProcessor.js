// src/mixins/markdownProcessor.js
export default {
  methods: {
    processarMarkdown(texto) {
      if (!texto) return "";

      let processado = texto;

      // Primeiro, processa os InfoBoxes antes de outros elementos
      processado = this.processarInfoBoxes(processado);

      // Novo sistema de cores com #c#texto# onde c é a inicial da cor
      // Azul/Blue (#b#texto#)
      processado = processado.replace(
        /#b#([\s\S]*?)#/g,
        '<span class="highlight-blue">$1</span>'
      );

      // Azul claro/Sky (#s#texto#)
      processado = processado.replace(
        /#s#([\s\S]*?)#/g,
        '<span class="highlight-sky">$1</span>'
      );

      // Verde/Green (#g#texto#)
      processado = processado.replace(
        /#g#([\s\S]*?)#/g,
        '<span class="highlight-green">$1</span>'
      );

      // Amarelo/Yellow (#y#texto#)
      processado = processado.replace(
        /#y#([\s\S]*?)#/g,
        '<span class="highlight-amber">$1</span>'
      );

      // Vermelho/Red (#r#texto#)
      processado = processado.replace(
        /#r#([\s\S]*?)#/g,
        '<span class="highlight-red">$1</span>'
      );

      // Roxo/Purple (#p#texto#)
      processado = processado.replace(
        /#p#([\s\S]*?)#/g,
        '<span class="highlight-purple">$1</span>'
      );

      // Laranja/Orange (#o#texto#)
      processado = processado.replace(
        /#o#([\s\S]*?)#/g,
        '<span class="highlight-orange">$1</span>'
      );

      // Aplica classes CSS aos destaques de cor
      processado = processado.replace(
        /class="highlight-orange"/g,
        'class="text-orange-600 dark:text-orange-400 font-medium"'
      );

      // Depois, processa negrito e itálico (que podem estar dentro dos destaques)
      // Processa negrito (**texto**)
      processado = processado.replace(
        /\*\*([\s\S]*?)\*\*/g,
        "<strong>$1</strong>"
      );

      // Processa itálico (*texto*)
      processado = processado.replace(/\*([\s\S]*?)\*/g, "<em>$1</em>");

      // Por último, aplica as classes CSS finais aos destaques
      processado = processado.replace(
        /class="highlight-blue"/g,
        'class="text-blue-600 dark:text-blue-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-sky"/g,
        'class="text-sky-600 dark:text-sky-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-green"/g,
        'class="text-green-600 dark:text-green-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-amber"/g,
        'class="text-amber-600 dark:text-amber-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-red"/g,
        'class="text-red-700 dark:text-red-400 font-medium"'
      );

      processado = processado.replace(
        /class="highlight-purple"/g,
        'class="text-purple-600 dark:text-purple-400 font-medium"'
      );

      // Agrupa itens de lista consecutivos
      processado = processado.replace(/(<li[^>]*>.*?<\/li>\s*)+/g, (match) => {
        if (match.includes("list-style-type: decimal")) {
          return `<ol class="list-decimal list-inside ml-4">${match}</ol>`;
        } else {
          return `<ul class="list-disc list-inside ml-4">${match}</ul>`;
        }
      });

      // Quebras de linha (processa por último para não interferir nos InfoBoxes)
      processado = processado.replace(/\n/g, "<br>");

      return processado;
    },

    processarInfoBoxes(texto) {
      const tiposInfoBox = ["note", "tip", "important", "warning", "caution"];
      let processado = texto;

      // Cores exatas para cada tipo (mesmo do InfoBox.vue)
      const typeColors = {
        note: "#4493F8", // Azul
        tip: "#3FB950", // Verde
        important: "#AB7DF8", // Roxo
        warning: "#D29922", // Amarelo/âmbar
        caution: "#F85149", // Vermelho
      };

      // Títulos em português (mesmo do InfoBox.vue)
      const titleMap = {
        note: "Nota",
        tip: "Dica",
        important: "Importante",
        warning: "Aviso",
        caution: "Cuidado",
      };

      // Ícones SVG para cada tipo (mesmo do InfoBox.vue)
      const getIcon = (type) => {
        const iconColor = typeColors[type];

        switch (type) {
          case "note":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill="currentColor" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`;

          case "tip":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill="currentColor" d="M8 1.5c-2.363 0-4 1.69-4 3.75 0 .984.424 1.625.984 2.304l.214.253c.223.264.47.556.673.848.284.411.537.896.621 1.49a.75.75 0 0 1-1.484.211c-.04-.282-.163-.547-.37-.847a8.456 8.456 0 0 0-.542-.68c-.084-.1-.173-.205-.268-.32C3.201 7.75 2.5 6.766 2.5 5.25 2.5 2.31 4.863 0 8 0s5.5 2.31 5.5 5.25c0 1.516-.701 2.5-1.328 3.259-.095.115-.184.22-.268.319-.207.245-.383.453-.541.681-.208.3-.33.565-.37.847a.751.751 0 0 1-1.485-.212c.084-.593.337-1.078.621-1.489.203-.292.45-.584.673-.848.075-.088.147-.173.213-.253.561-.679.985-1.32.985-2.304 0-2.06-1.637-3.75-4-3.75ZM5.75 12h4.5a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1 0-1.5ZM6 15.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Z"></path></svg>`;

          case "important":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill="currentColor" d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v9.5A1.75 1.75 0 0 1 14.25 13H8.06l-2.573 2.573A1.458 1.458 0 0 1 3 14.543V13H1.75A1.75 1.75 0 0 1 0 11.25Zm1.75-.25a.25.25 0 0 0-.25.25v9.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h6.5a.25.25 0 0 0 .25-.25v-9.5a.25.25 0 0 0-.25-.25Zm7 2.25v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`;

          case "warning":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill="currentColor" d="M6.457 1.047c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0 1 14.082 15H1.918a1.75 1.75 0 0 1-1.543-2.575Zm1.763.707a.25.25 0 0 0-.44 0L1.698 13.132a.25.25 0 0 0 .22.368h12.164a.25.25 0 0 0 .22-.368Zm.53 3.996v2.5a.75.75 0 0 1-1.5 0v-2.5a.75.75 0 0 1 1.5 0ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg>`;

          case "caution":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 16 16" version="1.1" aria-hidden="true"><path fill="currentColor" d="M4.47.22A.749.749 0 0 1 5 0h6c.199 0 .389.079.53.22l4.25 4.25c.141.14.22.331.22.53v6a.749.749 0 0 1-.22.53l-4.25 4.25A.749.749 0 0 1 11 16H5a.749.749 0 0 1-.53-.22L.22 11.53A.749.749 0 0 1 0 11V5c0-.199.079-.389.22-.53Zm.84 1.28L1.5 5.31v5.38l3.81 3.81h5.38l3.81-3.81V5.31L10.69 1.5ZM8 4a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 8 4Zm0 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg>`;

          default:
            return "";
        }
      };

      tiposInfoBox.forEach((tipo) => {
        // Regex para capturar InfoBoxes no formato >tipo: conteúdo
        const regex = new RegExp(`^>${tipo}:\\s*(.+)$`, "gm");

        processado = processado.replace(regex, (match, conteudo) => {
          // O conteúdo já vem limpo da regex
          const textoLimpo = conteudo.trim();

          // Verifica se estamos no tema escuro (assumindo que $isDark está disponível)
          // Como não temos acesso direto ao estado do componente no mixin,
          // usamos uma abordagem que funciona com ambos os temas
          const backgroundColor = `${typeColors[tipo]}10`; // 10% de opacidade

          // Cria o HTML do InfoBox
          return `<div class="flex my-3 rounded-md"><div class="border-l-4" style="border-color: ${
            typeColors[tipo]
          }"></div><div class="flex-1 py-2 px-3" style="background-color: ${backgroundColor}"><div class="flex items-center mb-1"><span class="mr-2" style="color: ${
            typeColors[tipo]
          }">${getIcon(
            tipo
          )}</span><span class="font-medium text-sm" style="color: ${
            typeColors[tipo]
          }">${
            titleMap[tipo]
          }</span></div><div class="text-gray-700 dark:text-gray-300 text-sm">${textoLimpo}</div></div></div>`;
        });
      });

      return processado;
    },

    processarListasMistas(texto) {
      const linhas = texto.split("\n");
      let resultado = [];
      let contadorNumerado = {}; // Objeto para contar por nível

      linhas.forEach((linha) => {
        if (!linha.trim()) return;

        // Calcula o nível baseado nos espaços no início da linha
        const espacos = linha.match(/^\s*/)[0].length;
        const nivel = Math.floor(espacos / 2); // A cada 2 espaços = 1 nível
        const margemEsquerda = nivel * 1.5; // 1.5rem por nível
        const linhaTrimmed = linha.trim();

        // Inicializa contador para este nível se não existir
        if (!contadorNumerado[nivel]) {
          contadorNumerado[nivel] = 1;
        }

        // Item com bullet (começa com -)
        if (linhaTrimmed.startsWith("- ")) {
          const conteudo = this.processarMarkdown(linhaTrimmed.substring(2));
          resultado.push(
            `<div class="text-gray-700 dark:text-gray-300 mb-1 flex items-start" style="margin-left: ${margemEsquerda}rem;"><span class="mr-2 mt-0">•</span><span>${conteudo}</span></div>`
          );
        }
        // Item numerado (começa com qualquer número.)
        else if (linhaTrimmed.match(/^\d+\.\s/)) {
          const texto = linhaTrimmed.replace(/^\d+\.\s/, "");
          const conteudo = this.processarMarkdown(texto);
          resultado.push(
            `<div class="text-gray-700 dark:text-gray-300 mb-1 flex items-start" style="margin-left: ${margemEsquerda}rem;"><span class="mr-2 mt-0">${contadorNumerado[nivel]}.</span><span>${conteudo}</span></div>`
          );
          contadorNumerado[nivel]++;

          // Reset contadores de níveis inferiores
          Object.keys(contadorNumerado).forEach((key) => {
            if (parseInt(key) > nivel) {
              contadorNumerado[key] = 1;
            }
          });
        }
        // Descrição (qualquer outro texto) - SEM deslocamento
        else {
          const conteudo = this.processarMarkdown(linhaTrimmed);
          resultado.push(
            `<div class="text-gray-700 dark:text-gray-300 mb-2" style="margin-left: ${margemEsquerda}rem;">${conteudo}</div>`
          );
        }
      });

      return resultado.join("");
    },
  },
};
