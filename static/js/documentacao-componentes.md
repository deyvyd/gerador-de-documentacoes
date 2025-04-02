# Componentes de Notificação para Vue.js

Este documento descreve os componentes de notificação inspirados no GitHub que desenvolvemos para utilização em projetos Vue.js. O sistema inclui dois tipos principais de notificações:

1. **Notificações Toast**: mensagens temporárias que aparecem nos cantos da tela
2. **Modais de Mensagem**: diálogos que requerem atenção do usuário

## Índice

- [Instalação](#instalação)
- [Componentes](#componentes)
  - [ModalMessage](#modalmessage)
  - [ToastNotification](#toastnotification)
- [Serviço de Notificações](#serviço-de-notificações)
- [Personalização de Temas](#personalização-de-temas)
- [Exemplos de Uso](#exemplos-de-uso)
- [Referência da API](#referência-da-api)

## Instalação

Para utilizar os componentes em seu projeto, você precisa incluir os seguintes arquivos:

- `modal-message.js`: Componente para modais de mensagem
- `toast-notification.js`: Componente para notificações toast
- `notification-service.js`: Serviço de gerenciamento de notificações

Em seguida, registre os componentes e o serviço em sua aplicação Vue:

```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

// Registre o serviço de notificações
app.use(NotificationService, {
  posicaoToast: 'top-right',
  duracaoToast: 5000
});

// Registre os componentes necessários
app.component('toast-notification', AppComponents.ToastNotification);
app.component('modal-message', AppComponents.ModalMessage);
app.component('toast-container', NotificationComponents.ToastContainer);
app.component('modal-container', NotificationComponents.ModalContainer);

app.mount('#app');
```

Adicione os contêineres de notificação no seu template principal (App.vue):

```html
<template>
  <div id="app">
    <!-- Conteúdo da aplicação -->
    
    <!-- Componentes de notificação (coloque no final do template) -->
    <toast-container />
    <modal-container />
  </div>
</template>
```

## Componentes

### ModalMessage

Um componente de modal versátil para exibir mensagens, alertas, confirmações e outras interações que exigem foco do usuário.

#### Tipos de Modal

Existem 7 tipos de modais, cada um com cor e ícone distintos:

1. **note**: Para informações gerais (azul)
2. **tip**: Para dicas úteis (verde)
3. **important**: Para informações importantes (roxo)
4. **warning**: Para avisos (amarelo)
5. **caution**: Para mensagens de cuidado (vermelho)
6. **success**: Para confirmações de sucesso (verde)
7. **error**: Para mensagens de erro (vermelho)

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `show` | Boolean | `false` | Controla a visibilidade do modal |
| `tipo` | String | `'note'` | Tipo do modal (note, tip, important, warning, caution, success, error) |
| `titulo` | String | `''` | Título do modal (se não fornecido, usa um título padrão baseado no tipo) |
| `mensagem` | String | `''` | Conteúdo principal do modal |
| `showConfirmButton` | Boolean | `true` | Se deve mostrar o botão de confirmação |
| `showCancelButton` | Boolean | `false` | Se deve mostrar o botão de cancelamento |
| `textoBotaoConfirmar` | String | `'OK'` | Texto do botão de confirmação |
| `textoBotaoCancelar` | String | `'Cancelar'` | Texto do botão de cancelamento |
| `larguraPersonalizada` | String | `'max-w-md'` | Classes do Tailwind para controlar a largura do modal |

#### Eventos

| Evento | Descrição |
|--------|-----------|
| `confirmar` | Emitido quando o usuário clica no botão de confirmação |
| `cancelar` | Emitido quando o usuário clica no botão de cancelamento ou fora do modal |

### ToastNotification

Um componente para exibir notificações temporárias que aparecem nos cantos da tela.

#### Tipos de Toast

Os mesmos 7 tipos do ModalMessage, cada um com cor e ícone distintos.

#### Props

| Prop | Tipo | Padrão | Descrição |
|------|------|--------|-----------|
| `mensagens` | Array | `[]` | Array de objetos de mensagem (ver formato abaixo) |
| `posicao` | String | `'top-right'` | Posição na tela (top-right, top-left, bottom-right, bottom-left, top-center, bottom-center) |
| `duracaoPadrao` | Number | `5000` | Duração em ms antes de fechar automaticamente |
| `largura` | String | `'w-80'` | Classes do Tailwind para controlar a largura |
| `mostrarIcone` | Boolean | `true` | Se deve mostrar ícones |
| `mostrarFechar` | Boolean | `true` | Se deve mostrar o botão de fechar |

#### Formato de Mensagem

Cada mensagem no array `mensagens` deve ter o seguinte formato:

```javascript
{
  id: 1,                 // ID único para a mensagem
  tipo: 'success',       // Tipo da mensagem
  texto: 'Mensagem aqui',// Texto da mensagem
  titulo: 'Título',      // Opcional: título da mensagem
  duracao: 5000          // Opcional: duração personalizada em ms
}
```

#### Eventos

| Evento | Descrição |
|--------|-----------|
| `fechar` | Emitido quando o usuário fecha uma notificação, com o ID da mensagem como parâmetro |

## Serviço de Notificações

O serviço de notificações simplifica o gerenciamento de toasts e modais em sua aplicação.

### Métodos para Toasts

| Método | Parâmetros | Descrição |
|--------|------------|-----------|
| `showToast` | `config` | Mostra um toast personalizado |
| `closeToast` | `id` | Fecha um toast específico |
| `clearToasts` | - | Remove todos os toasts ativos |
| `note` | `texto, titulo, opcoes` | Exibe um toast do tipo "note" |
| `tip` | `texto, titulo, opcoes` | Exibe um toast do tipo "tip" |
| `important` | `texto, titulo, opcoes` | Exibe um toast do tipo "important" |
| `warning` | `texto, titulo, opcoes` | Exibe um toast do tipo "warning" |
| `caution` | `texto, titulo, opcoes` | Exibe um toast do tipo "caution" |
| `success` | `texto, titulo, opcoes` | Exibe um toast do tipo "success" |
| `error` | `texto, titulo, opcoes` | Exibe um toast do tipo "error" |

### Métodos para Modais

| Método | Parâmetros | Descrição |
|--------|------------|-----------|
| `showModal` | `config` | Mostra um modal personalizado |
| `closeModal` | `id` | Fecha um modal específico |
| `confirm` | `mensagem, opcoes` | Exibe um modal de confirmação |
| `alert` | `mensagem, opcoes` | Exibe um modal de alerta |
| `info` | `mensagem, opcoes` | Exibe um modal informativo |

### Uso no Componente

#### Options API

```javascript
export default {
  methods: {
    showAlert() {
      this.$notification.success('Operação concluída com sucesso!');
    },
    
    confirmAction() {
      this.$notification.confirm('Tem certeza que deseja continuar?', {
        onConfirm: () => {
          // Ação a ser executada após confirmação
          this.processarAcao();
        },
        onCancel: () => {
          // Opcional: ação a ser executada após cancelamento
          console.log('Ação cancelada pelo usuário');
        }
      });
    }
  }
}
```

#### Composition API

```javascript
import { inject } from 'vue';

export default {
  setup() {
    const notification = inject('notification');
    
    function showAlert() {
      notification.success('Operação concluída com sucesso!');
    }
    
    function confirmAction() {
      notification.confirm('Tem certeza que deseja continuar?', {
        onConfirm: () => {
          // Ação a ser executada após confirmação
        }
      });
    }
    
    return {
      showAlert,
      confirmAction
    };
  }
}
```

## Personalização de Temas

Os componentes de notificação suportam automaticamente temas claro e escuro, detectando a classe `dark` no elemento `html`.

Para alternar entre os temas:

```javascript
// Ativar tema escuro
document.documentElement.classList.add('dark');

// Ativar tema claro
document.documentElement.classList.remove('dark');
```

## Exemplos de Uso

### Toasts Informativos

```javascript
// Sucesso
this.$notification.success('Dados salvos com sucesso!');

// Erro
this.$notification.error('Não foi possível conectar ao servidor.');

// Dica
this.$notification.tip('Pressione Ctrl+S para salvar mais rápido.');

// Aviso
this.$notification.warning('Esta ação pode demorar alguns minutos.');

// Nota informativa
this.$notification.note('O sistema será atualizado hoje às 18h.');
```

### Modais de Confirmação

```javascript
// Confirmação simples
this.$notification.confirm('Deseja excluir este item?', {
  onConfirm: () => {
    // Código para excluir o item
    this.excluirItem();
  }
});

// Confirmação com botões personalizados
this.$notification.confirm('Deseja abandonar as alterações?', {
  titulo: 'Alterações não salvas',
  textoBotaoConfirmar: 'Abandonar',
  textoBotaoCancelar: 'Continuar editando',
  onConfirm: () => {
    this.sairSemSalvar();
  }
});
```

### Modais de Alerta

```javascript
// Alerta de erro
this.$notification.alert('Operação não autorizada. Faça login novamente.', {
  tipo: 'error',
  titulo: 'Acesso Negado'
});

// Alerta informativo
this.$notification.info('O sistema será atualizado hoje às 18h.');
```

## Referência da API

### Configurações do Serviço

Ao registrar o serviço, você pode definir configurações padrão:

```javascript
app.use(NotificationService, {
  posicaoToast: 'top-right',    // Posição padrão dos toasts
  duracaoToast: 5000,           // Duração padrão dos toasts em ms
  mostrarIconeToast: true,      // Se deve mostrar ícones nos toasts
  mostrarBotaoFechar: true,     // Se deve mostrar botão de fechar nos toasts
  larguraToast: 'w-80'          // Largura padrão dos toasts (classes Tailwind)
});
```

### Opções de Toast

Ao chamar qualquer método de toast, você pode passar opções adicionais:

```javascript
this.$notification.success('Mensagem', 'Título', {
  duracao: 10000,  // Duração específica para este toast
  // Outras opções personalizadas
});
```

### Opções de Modal

Ao chamar um método de modal, você pode passar opções adicionais:

```javascript
this.$notification.confirm('Mensagem', {
  titulo: 'Título personalizado',
  tipo: 'warning',  // Tipo de modal
  textoBotaoConfirmar: 'Sim, prosseguir',
  textoBotaoCancelar: 'Não, cancelar',
  largura: 'max-w-lg',  // Largura personalizada
  onConfirm: () => { /* callback */ },
  onCancel: () => { /* callback */ }
});
```

### showModal (API Completa)

Para um controle total sobre o modal:

```javascript
this.$notification.showModal({
  id: 'meu-modal-personalizado',  // ID opcional para referência
  tipo: 'important',
  titulo: 'Título Personalizado',
  mensagem: 'Conteúdo do modal...',
  showConfirmButton: true,
  showCancelButton: true,
  textoBotaoConfirmar: 'OK',
  textoBotaoCancelar: 'Cancelar',
  largura: 'max-w-xl',
  onConfirm: () => { /* callback */ },
  onCancel: () => { /* callback */ }
});
```

---

Com este sistema de notificações, você pode criar interfaces mais interativas e informativas para seus usuários, mantendo uma estética consistente e profissional inspirada no GitHub.
