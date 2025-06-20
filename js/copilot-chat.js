// js/copilot-chat.js — Módulo Copilot flotante
// Crea el botón y la ventana de chat en DOM y gestiona la conversación

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const API_KEY = 'Bearer sk-or-v1-...tú-pon-tu-llave-aquí...';

function mostrarMensaje(de, texto) {
  const zona = document.getElementById("copilotHistorial");
  if (!zona) return console.warn("No existe #copilotHistorial");
  const p = document.createElement("p");
  p.innerHTML = `<strong>${de}:</strong> ${texto}`;
  zona.appendChild(p);
  zona.scrollTop = zona.scrollHeight;
}

async function enviarACopilot(pregunta) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres Copilot, un asistente amigable en All-In Poker." },
          { role: "user", content: pregunta }
        ],
        max_tokens: 500
      })
    });
    if (!res.ok) throw new Error(res.statusText);
    const data = await res.json();
    return data.choices?.[0]?.message?.content || "⚠️ No se recibió respuesta.";
  } catch (err) {
    console.error("Copilot fetch error:", err);
    return "⚠️ Error al conectar con Copilot.";
  }
}

export function initCopilotChat() {
  // Botón flotante
  const btn = document.createElement("div");
  btn.id = "copilotBtn";
  btn.textContent = "🤖";
  Object.assign(btn.style, {
    position: "fixed", bottom: "16px", right: "16px",
    width: "48px", height: "48px", background: "#00ffc3",
    color: "#000", fontSize: "22px", textAlign: "center",
    lineHeight: "48px", borderRadius: "50%", cursor: "pointer",
    zIndex: "9999", boxShadow: "0 0 10px #00ffc399"
  });
  if (window.innerWidth < 480) btn.style.display = "none";
  document.body.appendChild(btn);

  // Ventana de chat
  const chat = document.createElement("div");
  Object.assign(chat.style, {
    position: "fixed", bottom: "80px", right: "16px",
    width: "320px", maxHeight: "400px", background: "#111",
    border: "1px solid #00ffc3", borderRadius: "8px",
    padding: "10px", display: "none", flexDirection: "column",
    zIndex: "9999", color: "#eee"
  });
  chat.innerHTML = `
    <div id="copilotHistorial" style="flex:1; overflow-y:auto; height:220px;"></div>
    <input id="copilotPregunta" type="text" placeholder="Escribe tu pregunta..." style="
      width:100%; padding:6px; margin-top:8px;
      background:#222; border:1px solid #00ffc3; color:#fff;
    ">
  `;
  document.body.appendChild(chat);

  // Toggle visibilidad
  btn.addEventListener("click", () => {
    chat.style.display = chat.style.display === "none" ? "flex" : "none";
  });

  // Envío al presionar Enter
  const input = chat.querySelector("#copilotPregunta");
  input.addEventListener("keydown", async e => {
    if (e.key !== "Enter") return;
    const pregunta = e.target.value.trim();
    if (!pregunta) return;
    mostrarMensaje("Tú", pregunta);
    e.target.value = "";
    const respuesta = await enviarACopilot(pregunta);
    mostrarMensaje("Copilot", respuesta);
  });
}

document.addEventListener("DOMContentLoaded", initCopilotChat);
