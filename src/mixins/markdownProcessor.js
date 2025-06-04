// src/mixins/markdownProcessor.js
export default {
  methods: {
    processarMarkdown(texto) {
      if (!texto) return "";

      let processado = texto;

      // Primeiro, processa os InfoBoxes antes de outros elementos
      processado = this.processarInfoBoxes(processado);

      // Processa código ANTES de outros elementos para evitar conflitos
      processado = this.processarCodigo(processado);

      // Processa notificações inline
      processado = this.processarNotificacoes(processado);

      // Por último, processa os ícones
      processado = this.processarIcones(processado);

      /// Novo sistema de cores com [tc-cor]texto[/c], [bc-cor]texto[/c] e [fc-cor]texto[/c]

      // Cores apenas no texto (tc - text color)
      processado = processado.replace(
        /\[tc-blue\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-blue-600 dark:text-blue-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-sky\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-sky-700 dark:text-sky-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-green\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-green-600 dark:text-green-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-amber\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-amber-600 dark:text-amber-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-yellow\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-yellow-600 dark:text-yellow-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-red\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-red-600 dark:text-red-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-purple\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-purple-600 dark:text-purple-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-orange\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-orange-600 dark:text-orange-400">$1</span>'
      );

      processado = processado.replace(
        /\[tc-gray\]([\s\S]*?)\[\/c\]/g,
        '<span class="text-gray-600 dark:text-gray-400">$1</span>'
      );

      // Cores de fundo (bc - background color)
      processado = processado.replace(
        /\[bc-blue\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-blue-100 dark:bg-blue-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-sky\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-sky-100 dark:bg-sky-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-green\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-green-100 dark:bg-green-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-amber\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-amber-100 dark:bg-amber-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-yellow\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-yellow-100 dark:bg-yellow-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-red\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-red-100 dark:bg-red-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-purple\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-purple-100 dark:bg-purple-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-orange\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-orange-100 dark:bg-orange-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      processado = processado.replace(
        /\[bc-gray\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-gray-100 dark:bg-gray-900/30 px-1 py-0.5 rounded">$1</span>'
      );

      // Cores completas (fc - full color - texto + fundo com contraste)
      processado = processado.replace(
        /\[fc-blue\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-blue-600 text-white dark:bg-blue-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-sky\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-sky-600 text-white dark:bg-sky-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-green\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-green-600 text-white dark:bg-green-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-amber\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-amber-600 text-white dark:bg-amber-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-yellow\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-yellow-600 text-white dark:bg-yellow-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-red\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-red-600 text-white dark:bg-red-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-purple\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-purple-600 text-white dark:bg-purple-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-orange\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-orange-600 text-white dark:bg-orange-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
      );

      processado = processado.replace(
        /\[fc-gray\]([\s\S]*?)\[\/c\]/g,
        '<span class="bg-gray-600 text-white dark:bg-gray-500 dark:text-white px-1 py-0.5 rounded font-medium">$1</span>'
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

      // Por último, processa os ícones
      processado = this.processarBotoes(processado);

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

    processarIcones(texto) {
      // Mapeamento de ícones usando a sintaxe :nome-do-icone:
      // Todos os ícones usam currentColor por padrão para herdar a cor do texto
      const icones = {
        // Ícones de alerta e status
        warning: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        caution: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
        error: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>`,
        danger: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M3 21h18L12 3 3 21z"/></svg>`,

        // Ícones de sucesso e informação
        success: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        check: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`,
        info: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        tip: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707M12 20.488V17M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
        note: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,

        // Ícones de ação
        upload: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"/></svg>`,
        download: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>`,
        pencil: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>`,
        eye: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>
</svg>`,
        trash: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>`,
        save: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/></svg>`,
        duplicate: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,

        // Ícones de navegação
        home: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
        back: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>`,
        forward: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>`,
        up: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/></svg>`,
        down: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V4"/></svg>`,

        move: `<svg class="h-4 w-4 inline-block" viewBox="0 0 32 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M31.762 15.52l-0.265-0.252c-0.005-0.005-0.011-0.007-0.017-0.011l-4.055-3.701c-0.292-0.28-0.764-0.28-1.057 0l-0.172 0.252c-0.292 0.28-0.197 0.732 0.095 1.011l2.39 2.167h-11.605v-11.667l2.167 2.389c0.279 0.292 0.732 0.387 1.011 0.094l0.252-0.171c0.279-0.293 0.279-0.765 0-1.058l-3.537-3.874c-0.086-0.173-0.219-0.317-0.385-0.415l-0.044-0.046c-0.139-0.146-0.323-0.219-0.507-0.218-0.184-0.001-0.368 0.072-0.509 0.218l-0.253 0.264c-0.005 0.005-0.005 0.011-0.011 0.017l-3.61 3.992c-0.279 0.292-0.279 0.764 0 1.057l0.252 0.171c0.279 0.292 0.732 0.197 1.011-0.095l2.161-2.41v11.749h-11.759l2.389-2.167c0.292-0.28 0.387-0.732 0.095-1.011l-0.171-0.252c-0.293-0.28-0.766-0.28-1.058 0l-3.874 3.537c-0.173 0.085-0.317 0.219-0.415 0.384l-0.046 0.044c-0.146 0.139-0.219 0.324-0.218 0.508-0.001 0.184 0.071 0.368 0.218 0.509l0.265 0.253c0.005 0.005 0.011 0.006 0.016 0.011l3.992 3.61c0.292 0.279 0.764 0.279 1.058 0l0.171-0.252c0.292-0.279 0.197-0.733-0.095-1.012l-2.41-2.161h11.844v11.78l-2.161-2.41c-0.28-0.292-0.732-0.387-1.011-0.095l-0.252 0.171c-0.279 0.293-0.279 0.765 0 1.057l3.61 3.992c0.005 0.006 0.006 0.012 0.011 0.017l0.253 0.265c0.141 0.146 0.325 0.219 0.509 0.218 0.183 0.001 0.368-0.072 0.507-0.218l0.253-0.265c0.005-0.005 0.007-0.011 0.012-0.017l3.701-4.055c0.279-0.292 0.279-0.764 0-1.057l-0.252-0.172c-0.279-0.292-0.732-0.197-1.011 0.095l-2.167 2.39v-11.698h11.687l-2.41 2.161c-0.292 0.279-0.387 0.733-0.095 1.012l0.171 0.252c0.293 0.279 0.765 0.279 1.057 0l3.992-3.61c0.006-0.006 0.012-0.006 0.017-0.010l0.265-0.253c0.146-0.14 0.219-0.324 0.218-0.509 0.001-0.183-0.072-0.368-0.218-0.507z"/></svg>`,

        // Ícones técnicos
        code: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`,
        file: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,
        folder: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg>`,
        database: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"/></svg>`,
        server: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"/></svg>`,

        // Ícones de formatação de arquivos
        json: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
        pdf: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" viewBox="0 0 512 512"><path fill="currentColor" d="M64 464l48 0 0 48-48 0c-35.3 0-64-28.7-64-64L0 64C0 28.7 28.7 0 64 0L229.5 0c17 0 33.3 6.7 45.3 18.7l90.5 90.5c12 12 18.7 28.3 18.7 45.3L384 304l-48 0 0-144-80 0c-17.7 0-32-14.3-32-32l0-80L64 48c-8.8 0-16 7.2-16 16l0 384c0 8.8 7.2 16 16 16zM176 352l32 0c30.9 0 56 25.1 56 56s-25.1 56-56 56l-16 0 0 32c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-48 0-80c0-8.8 7.2-16 16-16zm32 80c13.3 0 24-10.7 24-24s-10.7-24-24-24l-16 0 0 48 16 0zm96-80l32 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-32 0c-8.8 0-16-7.2-16-16l0-128c0-8.8 7.2-16 16-16zm32 128c8.8 0 16-7.2 16-16l0-64c0-8.8-7.2-16-16-16l-16 0 0 96 16 0zm80-112c0-8.8 7.2-16 16-16l48 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 32 32 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-32 0 0 48c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-64 0-64z"/></svg>`,
        docx: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>`,

        // Ícones de usuário e perfil
        user: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
        users: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/></svg>`,
        profile: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V4a2 2 0 114 0v2m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"/></svg>`,

        // Ícones de tempo
        clock: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
        calendar: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,

        settings: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
        gear: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,

        // Ícones de comunicação
        email: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
        phone: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,

        // Ícones de tema e interface
        sun: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`,
        moon: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`,

        // Ícones de estado e notificação
        bell: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5M10.036 15.752a3.5 3.5 0 01-5.072 0 7.5 7.5 0 0010.144 0"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072"/></svg>`,
        notification: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5M10.036 15.752a3.5 3.5 0 01-5.072 0 7.5 7.5 0 0010.144 0"/></svg>`,

        // Ícones de status de conexão
        online: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
        offline: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728"/></svg>`,

        // Ícones de ferramentas e desenvolvimento
        tool: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/></svg>`,
        wrench: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 11-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 011 1v1z"/></svg>`,

        // Ícones de estado do sistema
        loading: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,
        refresh: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>`,

        // Ícones de matemática e estatística
        calculator: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`,
        chart: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>`,

        // Ícones de localização
        location: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
        map: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>`,

        // Ícones de segurança
        lock: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>`,
        unlock: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"/></svg>`,
        key: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/></svg>`,

        // Ícones de mídia
        image: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`,
        video: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>`,

        // Ícones de conectividade
        wifi: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"/></svg>`,
        link: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/></svg>`,
        external: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>`,

        // Ícone do tour (guia/navegação)
        gps: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" viewBox="0 0 448 512"><path fill="currentColor" d="M429.6 92.1c4.9-11.9 2.1-25.6-7-34.7s-22.8-11.9-34.7-7l-352 144c-14.2 5.8-22.2 20.8-19.3 35.8s16.1 25.8 31.4 25.8l176 0 0 176c0 15.3 10.8 28.4 25.8 31.4s30-5.1 35.8-19.3l144-352z"/></svg>`,

        // Ícones de navegação e troca
        swap: `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>`,
      };

      // Processa os ícones usando a sintaxe :nome-do-icone:
      Object.keys(icones).forEach((nomeIcone) => {
        const regex = new RegExp(`:${nomeIcone}:`, "g");
        texto = texto.replace(regex, icones[nomeIcone]);
      });

      return texto; // Por último, processa os ícones
      processado = this.processarIcones(processado);

      return processado;
    },

    processarBotoes(texto) {
      // Processa botões usando a sintaxe [btn:tipo]Texto do botão[/btn]
      // Tipos disponíveis: primary, secondary, success, danger, warning, info

      const tiposBotao = {
        blue: "bg-blue-600 text-white hover:bg-blue-700",
        gray: "bg-gray-500 text-white hover:bg-gray-600",
        green: "bg-green-600 text-white hover:bg-green-700",
        red: "bg-red-600 text-white hover:bg-red-700",
        yellow: "bg-yellow-600 text-white hover:bg-yellow-700",
        sky: "bg-sky-500 text-white hover:bg-sky-600",
        tech: "bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-700 dark:hover:bg-orange-600",
        dev: "bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600",
        import:
          "bg-purple-200 dark:bg-white text-purple-700 dark:text-blue-900 hover:bg-purple-600 hover:text-purple-300 dark:hover:bg-purple-600 dark:hover:text-purple-300",

        tour: "bg-transparent hover:text-blue-500 transition-colors duration-200",
        tour_next:
          "bg-[#4a74c7] text-white hover:bg-[#345ba7] dark:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200",

        light_theme:
          "hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200",

        dark_theme:
          "hover:text-yellow-600 dark:hover:text-yellow-500 transition-colors duration-200",

        // Novos tipos para ícones sem fundo (baseados no DataTable)
        view: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
        edit: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300",
        copy: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
        delete:
          "text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300",
        // Ícones adicionais sem fundo
        about:
          "text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300",
      };

      // Lista de tipos que não devem ter fundo
      const tiposSemFundo = ["tour", "view", "edit", "copy", "delete", "about"];

      // Função para determinar tamanho do ícone
      const getTamanhoIcone = (tipo, temTexto, semFundo) => {
        return semFundo ? "h-5 w-5" : "h-4 w-4";
      };

      // 1. Processa botões auto-fechados com ícone: [btn:tipo:icone/]
      const regexBotaoAutoFechado = /\[btn:(\w+):(\w+)\/\]/g;
      texto = texto.replace(regexBotaoAutoFechado, (match, tipo, icone) => {
        const classesBotao = tiposBotao[tipo] || tiposBotao.blue;
        const semFundo = tiposSemFundo.includes(tipo);

        // Reutiliza os ícones da função processarIcones
        const iconeProcessado = this.processarIcones(`:${icone}:`);
        const tamanhoIcone = getTamanhoIcone(tipo, false, semFundo);
        const iconeAjustado = iconeProcessado.replace(
          "h-4 w-4 inline-block",
          `${tamanhoIcone} inline-block`
        );

        // Classes base para botões sem texto
        const classesBase = semFundo
          ? "inline-flex items-center transition-colors duration-200 cursor-default select-none"
          : "inline-flex items-center px-1 py-1 rounded text-xs font-medium transition-colors duration-200 cursor-default select-none";

        return `<span class="${classesBase} ${classesBotao}">${iconeAjustado}</span>`;
      });

      // 2. Processa botões com texto: [btn:tipo]Texto[/btn]
      const regexBotao = /\[btn:(\w+)\](.*?)\[\/btn\]/g;
      texto = texto.replace(regexBotao, (match, tipo, conteudo) => {
        const classesBotao = tiposBotao[tipo] || tiposBotao.blue;
        const semFundo = tiposSemFundo.includes(tipo);

        // Botões com texto sempre têm fundo (tipos sem fundo não deveriam ter texto)
        const classesBase =
          "inline-flex items-center px-2 py-1 rounded text-sm font-medium transition-colors duration-200 cursor-default select-none";

        return `<span class="${classesBase} ${classesBotao}">${conteudo.trim()}</span>`;
      });

      // 3. Processa botões com ícone e texto: [btn:tipo:icone]Texto[/btn]
      const regexBotaoIcone = /\[btn:(\w+):(\w+)\](.*?)\[\/btn\]/g;
      texto = texto.replace(regexBotaoIcone, (match, tipo, icone, conteudo) => {
        const classesBotao = tiposBotao[tipo] || tiposBotao.blue;
        const semFundo = tiposSemFundo.includes(tipo);

        // Reutiliza os ícones da função processarIcones
        const iconeProcessado = this.processarIcones(`:${icone}:`);
        const tamanhoIcone = getTamanhoIcone(tipo, true, semFundo);
        const iconeAjustado = iconeProcessado.replace(
          "h-4 w-4 inline-block",
          `${tamanhoIcone} mr-1 inline-block`
        );

        // Botões com ícone e texto sempre têm fundo
        const classesBase =
          "inline-flex items-center px-2 py-1 rounded text-sm font-medium transition-colors duration-200 cursor-default select-none";

        return `<span class="${classesBase} ${classesBotao}">${iconeAjustado}${conteudo.trim()}</span>`;
      });

      return texto;
    },

    processarNotificacoes(texto) {
      // Cores exatas para cada tipo (mesmo do ToastNotification.vue)
      const typeColors = {
        note: "#4493F8", // Azul
        success: "#3FB950", // Verde
        error: "#F85149", // Vermelho
        warning: "#D29922", // Amarelo/âmbar
        caution: "#F85149", // Vermelho
        important: "#AB7DF8", // Roxo
        info: "#4493F8", // Azul (alias para note)
      };

      // Ícones SVG para cada tipo (mesmo do ToastNotification.vue)
      const getIcon = (type) => {
        const iconColor = typeColors[type];

        switch (type) {
          case "note":
          case "info":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;

          case "success":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

          case "error":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;

          case "warning":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;

          case "caution":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

          case "important":
            return `<svg style="color: ${iconColor}; height: 16px; width: 16px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 4H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h3l3 3 3-3h5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"></path><line x1="12" y1="7" x2="12" y2="11"></line><line x1="12" y1="14" x2="12.01" y2="14"></line></svg>`;

          default:
            return "";
        }
      };

      // Lista de tipos válidos (incluindo 'info' como alias)
      const tiposNotificacao = [
        "note",
        "info",
        "success",
        "error",
        "warning",
        "caution",
        "important",
      ];

      let resultado = texto;

      // Processa cada tipo de notificação individualmente para garantir que funcione
      tiposNotificacao.forEach((tipo) => {
        // Regex para capturar notificações no formato [tst:tipo]conteúdo[/tst]
        const regex = new RegExp(`\\[tst:${tipo}\\](.*?)\\[/tst\\]`, "g");

        resultado = resultado.replace(regex, (match, conteudo) => {
          // O conteúdo já vem limpo da regex
          const textoLimpo = conteudo.trim();

          // Background cinza com transparência
          const backgroundColor = "rgba(128, 128, 128, 0.1)"; // Cinza com 10% de opacidade

          // Cria o HTML da notificação com ícone do lado esquerdo (igual ao toast)
          return `<div class="flex my-3 rounded-md"><div class="border-l-4" style="border-color: ${
            typeColors[tipo]
          }"></div><div class="flex-1 py-2 px-3" style="background-color: ${backgroundColor}"><div class="flex items-center gap-3"><span class="flex-shrink-0">${getIcon(
            tipo
          )}</span><span class="flex-1 text-gray-700 dark:text-gray-300 text-sm">${textoLimpo}</span></div></div></div>`;
        });
      });

      return resultado;
    },

    processarCodigo(texto) {
      // Primeiro, processa blocos de código (para não interferir com código inline)
      //texto = this.processarBlocosCodigo(texto);

      // Depois, processa código inline
      texto = this.processarCodigoInline(texto);

      return texto;
    },

    processarCodigoInline(texto) {
      // Regex para capturar código inline com backticks
      // Evita processar se já estiver dentro de um bloco de código HTML
      const regexCodigoInline = /(?<!<[^>]*)`([^`\n]+)`(?![^<]*>)/g;

      return texto.replace(regexCodigoInline, (match, codigo) => {
        // Verifica se não está dentro de um bloco de código já processado
        if (match.includes("code-block")) {
          return match;
        }

        // Escapa HTML no código
        const codigoEscapado = codigo
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");

        return `<code class="inline-code">${codigoEscapado}</code>`;
      });
    },

    processarItensComExemplos(itens) {
      if (!itens || !Array.isArray(itens)) return "";

      let resultado = [];

      itens.forEach((item) => {
        // Se é um exemplo
        if (item.startsWith(">exemplo:")) {
          const textoExemplo = item.substring(9).trim(); // Remove '>exemplo:'
          resultado.push(`
        <div class="flex my-3 rounded-md">
          <div class="border-l-4 border-cyan-700 dark:border-cyan-400"></div>
          <div class="flex-1 py-2 px-3 bg-gray-200 dark:bg-gray-900">
            <div class="flex items-center mb-1">
              <svg
                class="h-4 w-4 mr-2 text-cyan-700 dark:text-cyan-400"
                viewBox="0 0 32 32"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M26,12H22v2h4v2H23v2h3v2H22v2h4a2.0027,2.0027,0,0,0,2-2V14A2.0023,2.0023,0,0,0,26,12Z"></path>
                <path d="M19,22H13V18a2.002,2.002,0,0,1,2-2h2V14H13V12h4a2.0023,2.0023,0,0,1,2,2v2a2.0023,2.0023,0,0,1-2,2H15v2h4Z"></path>
                <polygon points="8 20 8 12 6 12 6 13 4 13 4 15 6 15 6 20 4 20 4 22 10 22 10 20 8 20"></polygon>
              </svg>
              <span class="font-medium text-sm text-cyan-700 dark:text-cyan-400">Exemplo</span>
            </div>
            <div class="text-gray-700 dark:text-gray-300 text-sm">${this.processarMarkdown(
              textoExemplo
            )}</div>
          </div>
        </div>
      `);
        } else {
          // Processa item normal usando a lógica existente
          const espacos = item.match(/^\s*/)[0].length;
          const nivel = Math.floor(espacos / 2);
          const margemEsquerda = nivel * 1.5;
          const linhaTrimmed = item.trim();

          if (linhaTrimmed.startsWith("- ")) {
            const conteudo = this.processarMarkdown(linhaTrimmed.substring(2));
            resultado.push(
              `<div class="text-gray-700 dark:text-gray-300 mb-1 flex items-start" style="margin-left: ${margemEsquerda}rem;"><span class="mr-2 mt-0">•</span><span>${conteudo}</span></div>`
            );
          } else if (linhaTrimmed.match(/^\d+\.\s/)) {
            const texto = linhaTrimmed.replace(/^\d+\.\s/, "");
            const conteudo = this.processarMarkdown(texto);
            resultado.push(
              `<div class="text-gray-700 dark:text-gray-300 mb-1 flex items-start" style="margin-left: ${margemEsquerda}rem;"><span class="mr-2 mt-0">${
                nivel + 1
              }.</span><span>${conteudo}</span></div>`
            );
          } else {
            const conteudo = this.processarMarkdown(linhaTrimmed);
            resultado.push(
              `<div class="text-gray-700 dark:text-gray-300 mb-2" style="margin-left: ${margemEsquerda}rem;">${conteudo}</div>`
            );
          }
        }
      });

      return resultado.join("");
    },
  },
};
