# 📝 Gerador de Documentações Técnicas

[![Python](https://img.shields.io/badge/Python-3.7+-blue?logo=python&logoColor=white)](https://www.python.org/downloads/)
[![Flask](https://img.shields.io/badge/Flask-2.0+-darkgreen?logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![HTML5](https://img.shields.io/badge/HTML-5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Vue.js](https://img.shields.io/badge/Vue.js-3.0+-4FC08D?logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

Uma aplicação web para geração automática de documentos técnicos a partir de modelos com marcadores, otimizando o fluxo de trabalho para relatórios de acompanhamento de projetos.

![Screenshot da aplicação](app-screenshot.png)

## 📋 Sumário

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Requisitos](#-requisitos)
- [Instalação](#-instalação)
- [Uso](#-uso)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Modelos e Marcadores](#-modelos-e-marcadores)
- [Contribuição](#-contribuição)

## 🔍 Visão Geral

O Gerador de Documentos Técnicos é uma aplicação para facilitar a criação de documentação padronizada para projetos. A aplicação automatiza o preenchimento de relatórios técnicos, atualizando marcadores com os dados fornecidos pelo usuário e preservando a formatação original dos documentos.

## ✨ Funcionalidades

- **Interface intuitiva**: Interface web responsiva com tema claro/escuro
- **Seleção múltipla de autores**: Autocompletar e gerenciamento de autores com formatação automática
- **Gestão de atividades dinâmica**: Adicionar, editar, remover e reordenar atividades via drag-and-drop
- **Cálculo automático**: Horas totais e pontos de função calculados automaticamente
- **Saída flexível**: Geração de documentos em DOCX e/ou PDF
- **Formatação preservada**: Mantém estilos, formatação e hyperlinks do documento original
- **Sumário atualizado**: Atualização automática de sumários nos documentos gerados

## 🛠 Tecnologias

### Backend

- **Python 3.7+**
- **Flask**: Framework web
- **python-docx**: Manipulação de documentos Word
- **pywin32**: Automação do Microsoft Word para atualização de sumários e geração de PDFs

### Frontend

- **Vue.js 3**: Framework JavaScript
- **Tailwind CSS**: Framework CSS utilitário
- **Sortable.js**: Reordenação de atividades via drag-and-drop

## 📋 Requisitos

- **Python 3.7+**
- **pip** (Gerenciador de pacotes do Python)
- **Microsoft Windows** com **Microsoft Word** instalado (para funcionalidades de sumário e exportação para PDF)
- **Navegador moderno** (Chrome, Firefox, Edge, etc.)

## 💻 Instalação

1. **Clone o repositório**:

   ```bash
   git clone https://github.com/seu-usuario/gerador-documentos.git
   cd gerador-documentos
   ```

2. **Crie e ative um ambiente virtual**:

   ```bash
   python -m venv venv

   # Windows
   venv\Scripts\activate

   # Linux/Mac
   source venv/bin/activate
   ```

3. **Instale as dependências**:

   ```bash
   pip install -r requirements.txt
   ```

4. **Verifique os modelos de documento**:
   Certifique-se de que os modelos DOCX estão presentes no diretório `modelos/tecnica/`.

## 🚀 Uso

1. **Inicie a aplicação**:

   ```bash
   python app.py
   ```

2. **Acesse a interface web**:
   Abra seu navegador e acesse `http://localhost:5000`.

3. **Preencha o formulário**:

   - Número da SS, ano e título
   - Selecione os autores do documento
   - Preencha datas de início e fim
   - Insira o link do board do projeto
   - Adicione a descrição do projeto
   - Cadastre as atividades com suas horas respectivas

4. **Selecione os formatos de saída**:

   - DOCX e/ou PDF

5. **Gere os documentos**:
   Clique em "Gerar Documentos" e aguarde o download do arquivo ZIP contendo os documentos gerados.

## 📁 Estrutura de Arquivos

```
gerador-documentos/
├── app.py                 # Aplicação Flask principal
├── requirements.txt       # Dependências do projeto
├── static/                # Arquivos estáticos
│   ├── css/               # Arquivos CSS
│   │   └── styles.css     # Estilos da aplicação
│   ├── js/                # Arquivos JavaScript
│   │   └── app.js         # Lógica Vue.js da aplicação
│   └── favicon.ico        # Ícone da aplicação
├── templates/             # Templates HTML
│   └── index.html         # Página principal
└── modelos/               # Modelos de documentos
    └── tecnica/           # Modelos técnicos
        ├── ModeloTec - Estimativa de Esforço e Cronograma.docx
        ├── ModeloTec - Estratégia de solução.docx
        └── ModeloTec - Relatório de Acompanhamento de Projeto.docx
```

## 📝 Modelos e Marcadores

### Documentos Suportados

A aplicação suporta a geração de três tipos de documentos:

- **Relatório de Acompanhamento de Projeto**
- **Estratégia de Solução**
- **Estimativa de Esforço e Cronograma**

### Marcadores Disponíveis

Os seguintes marcadores são substituídos automaticamente nos documentos:

| Marcador           | Descrição                                   |
| ------------------ | ------------------------------------------- |
| `[NNN]`            | Número da SS formatado com zeros à esquerda |
| `[AAAA]`           | Ano da SS                                   |
| `[INICIAIS_AUTOR]` | Iniciais do(s) autor(es) formatadas         |
| `[TITULO]`         | Título da SS                                |
| `[DESCRICAO]`      | Descrição da atividade                      |
| `[DATA_ATUAL]`     | Data atual formatada                        |
| `[DATA_INICIO]`    | Data de início formatada                    |
| `[DATA_FIM]`       | Data de fim formatada                       |
| `[DIAS_UTEIS]`     | Dias úteis calculados entre as datas        |
| `[TOTAL_HORAS]`    | Total de horas das atividades               |
| `[N_PF]`           | Número de pontos de função calculados       |
| `[LINK_BOARD]`     | Link do board do projeto                    |

### Marcadores de Atividades

Marcadores especiais para tabelas e listas de atividades:

| Marcador       | Descrição          |
| -------------- | ------------------ |
| `[ITEM]`       | Nome da atividade  |
| `[HORAS_ITEM]` | Horas da atividade |

## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

---

Desenvolvido com ❤️ por [Deyvyd Moura](https://github.com/deyvyd)
