/**
 * chat.js – Chat en tiempo real con Socket.io
 */
const socket = io();
window.socket = socket;  // para usarlo en gameActions.js

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('chat-container');
  if (!container) return;
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.placeholder = 'Escribe...';
  form.append(input);
  container.append(form);

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value.trim()) {
      socket.emit('chat:message', { text: input.value });
      input.value = '';
    }
  });

  socket.on('chat:message', msg => {
    const p = document.createElement('p');
    p.textContent = `${msg.user}: ${msg.text}`;
    container.append(p);
    container.scrollTop = container.scrollHeight;
  });
});
