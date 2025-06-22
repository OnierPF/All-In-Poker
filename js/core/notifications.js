/**
 * notifications.js – Toasters y alertas elegantes
 */
export function toast(message, type = 'info', timeout = 3000) {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  container.append(toast);
  setTimeout(() => toast.remove(), timeout);
}

document.addEventListener('DOMContentLoaded', () => {
  // Ejemplo de uso: window.toast('Bienvenido!', 'success');
});
