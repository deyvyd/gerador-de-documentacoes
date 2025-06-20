<template>
  <div class="relative">
    <!-- Botão de Notificações -->
    <button
      :id="id"
      @click="toggleDropdown"
      class="notification-toggle"
      :class="{ 'notification-toggle-active': showDropdown }"
    >
      <!-- Ícone do sino -->
      <svg
        class="notification-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
        ></path>
      </svg>

      <!-- Badge com contador de notificações não lidas -->
      <span v-if="showBadge && unreadCount > 0" class="notification-badge">
        {{ unreadCount > 99 ? "99+" : unreadCount }}
      </span>

      <!-- Tooltip -->
      <div class="notification-tooltip">
        <div class="tooltip-arrow"></div>
        <div class="tooltip-content">
          <div class="tooltip-title">Histórico de Notificações</div>
          <div class="text-sm">
            {{
              notifications.length > 0
                ? `${notifications.length} notificação${
                    notifications.length > 1 ? "ões" : ""
                  }`
                : "Nenhuma notificação"
            }}
          </div>
        </div>
      </div>
    </button>

    <!-- Dropdown com histórico de notificações -->
    <div v-if="showDropdown" class="notification-dropdown" @click.stop>
      <!-- Header do dropdown -->
      <div class="notification-dropdown-header">
        <h3 class="notification-dropdown-title">Notificações</h3>
        <div class="notification-dropdown-actions">
          <button
            v-if="unreadCount > 0"
            @click="markAllAsRead"
            class="notification-action-btn"
          >
            Marcar todas como lidas
          </button>
          <button
            v-if="notifications.length > 0"
            @click="clearAll"
            class="notification-action-btn notification-clear-btn"
          >
            Limpar todas
          </button>
        </div>
      </div>

      <!-- Lista de notificações -->
      <div class="notification-list">
        <div v-if="notifications.length === 0" class="notification-empty">
          <svg
            class="notification-empty-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            ></path>
          </svg>
          <p class="notification-empty-text">Nenhuma notificação ainda</p>
        </div>

        <div
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-item"
          :class="{
            'notification-item-unread': !notification.read,
            'notification-item-success': notification.type === 'success',
            'notification-item-error': notification.type === 'error',
            'notification-item-warning': notification.type === 'warning',
            'notification-item-info': notification.type === 'info',
          }"
          @click="markAsRead(notification.id)"
        >
          <!-- Ícone baseado no tipo -->
          <div class="notification-item-icon">
            <!-- Ícone de sucesso -->
            <svg
              v-if="notification.type === 'success'"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <!-- Ícone de erro -->
            <svg
              v-else-if="notification.type === 'error'"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <!-- Ícone de aviso -->
            <svg
              v-else-if="notification.type === 'warning'"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
            <!-- Ícone de info -->
            <svg
              v-else
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>

          <!-- Conteúdo da notificação -->
          <div class="notification-item-content">
            <p class="notification-item-message">{{ notification.message }}</p>
            <span class="notification-item-time">{{
              formatTime(notification.timestamp)
            }}</span>
          </div>

          <!-- Indicador de não lida -->
          <div
            v-if="!notification.read"
            class="notification-item-unread-dot"
          ></div>

          <!-- Botão de remover -->
          <button
            @click.stop="removeNotification(notification.id)"
            class="notification-item-remove"
          >
            <svg
              class="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- Footer com ação de limpar -->
      <div v-if="notifications.length > 5" class="notification-dropdown-footer">
        <span class="notification-footer-text">
          Mostrando {{ Math.min(notifications.length, 50) }} de
          {{ notifications.length }} notificações
        </span>
      </div>
    </div>

    <!-- Overlay para fechar dropdown -->
    <div
      v-if="showDropdown"
      class="notification-overlay"
      @click="closeDropdown"
    ></div>
  </div>
</template>

<script>
export default {
  name: "NotificationButton",
  props: {
    id: {
      type: String,
      default: "notificationButton",
    },
    notifications: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showDropdown: false,
      showBadge: false, // Controla se o badge deve ser exibido
    };
  },
  computed: {
    unreadCount() {
      return this.notifications.filter((n) => !n.read).length;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleOutsideClick);
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleOutsideClick);
  },

  methods: {
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;

      // Se está abrindo o dropdown, mostra o badge
      if (this.showDropdown) {
        this.showBadge = true;
      }
    },

    closeDropdown() {
      this.showDropdown = false;

      // Ao fechar o dropdown, marca todas como lidas e esconde o badge
      if (this.unreadCount > 0) {
        this.markAllAsRead();
      }
      this.showBadge = false;
    },

    markAsRead(notificationId) {
      this.$emit("mark-as-read", notificationId);
    },

    markAllAsRead() {
      this.$emit("mark-all-as-read");
    },

    removeNotification(notificationId) {
      this.$emit("remove-notification", notificationId);
    },

    clearAll() {
      this.$emit("clear-all");
    },

    handleOutsideClick(event) {
      if (this.showDropdown && !this.$el.contains(event.target)) {
        this.closeDropdown();
      }
    },

    formatTime(timestamp) {
      const date = new Date(timestamp);
      const now = new Date();
      const diff = now - date;

      // Menos de 2 segundos
      if (diff < 2000) {
        return "Agora";
      }

      // Menos de 1 minuto
      if (diff < 60000) {
        const seconds = Math.floor(diff / 1000);
        return `${seconds} s atrás`;
      }

      // Menos de 1 hora
      if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} min atrás`;
      }

      // Menos de 24 horas
      if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} h atrás`;
      }

      // Mesmo dia
      if (date.toDateString() === now.toDateString()) {
        return date.toLocaleTimeString("pt-BR", {
          hour: "2-digit",
          minute: "2-digit",
        });
      }

      // Dias anteriores
      const days = Math.floor(diff / 86400000);
      if (days < 7) {
        return `${days} d atrás`;
      }

      // Mais de uma semana
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
};
</script>
