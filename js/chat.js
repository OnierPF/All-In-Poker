// js/chat.js — Módulo de chat usando OpenRouter.ai
// Se asume que en tu HTML existe:
//  • Un contenedor <div id="chat-container"></div>
//  • Un input <input id="pregunta" />
//  • Un área de historial <div id="historial"></div>

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = 'Bearer sk-or-v1-...tú-pon-tu-llave-aquí...';

function mostrarMensaje(remitente, texto) {
  const historial = document.getElementById("historial");
  if (!historial) return console.warn("No existe #historial");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${remitente}:</strong> ${texto}`;
  historial.appendChild(p);
  historial.scrollTop = historial.scrollHeight;
}

async function enviarPregunta() {
  const input = document.getElementById("pregunta");
  if (!input) return console.warn("No existe #pregunta");
  const entrada = input.value.trim();
  if (!entrada) return;

  mostrarMensaje("Tú", entrada);
  input.value = "";

  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres un asistente amigable que ayuda a jugadores de póker en All-In Poker." },
          { role: "user", content: entrada }
        ],
        max_tokens: 500
      })
    });
    if (!respuesta.ok) throw new Error(respuesta.statusText);
    const data = await respuesta.json();
    const salida = data.choices?.[0]?.message?.content || "⚠️ Error al procesar la respuesta.";
    mostrarMensaje("Copilot", salida);
  } catch (err) {
    console.error("Chat fetch error:", err);
    mostrarMensaje("Copilot", "⚠️ No se pudo conectar al servicio de chat.");
  }
}

export function initChat() {
  const input = document.getElementById("pregunta");
  if (!input) return;
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") enviarPregunta();
  });
}

document.addEventListener("DOMContentLoaded", initChat);
