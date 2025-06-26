/**
 * copilot-chat.js – Integración asistente Copilot
 */
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.createElement('button');
  btn.textContent = 'Ayuda 🤖';
  btn.id = 'copilot-btn';
  document.body.append(btn);

  btn.addEventListener('click', () => {
    const chatWin = window.open('', 'Copilot', 'width=400,height=600');
    chatWin.document.write('<h2>Copilot</h2><p>¿En qué puedo ayudarte?</p>');
    // Aquí se integraría la API