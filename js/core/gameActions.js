/**
 * gameActions.js – Lógica de jugadas y apuestas en mesa.html
 */
export function setupTableActions() {
  const actions = document.getElementById('actions');
  if (!actions) return;
  actions.addEventListener('click', e => {
    if (!e.target.dataset.action) return;
    const action = e.target.dataset.action;
    // emitimos evento a servidor via WebSocket o API REST
    window.socket.emit('player-action', { action, tableId: window.currentTableId });
  });
}

// inicialización
document.addEventListener('DOMContentLoaded', () => {
  // asumimos window.socket conectado en chat.js
  setupTableActions();
});
