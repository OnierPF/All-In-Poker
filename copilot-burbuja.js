// 🤖 Burbuja flotante Copilot All-In Arena

// Crear botón flotante
const copilotBtn = document.createElement("div");
copilotBtn.innerHTML = "🤖";
copilotBtn.style = `
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 48px;
  height: 48px;
  background: #00ffc3;
  color: #000;
  font-weight: bold;
  font-size: 22px;
  text-align: center;
  line-height: 48px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 0 10px #00ffc399;
`;

// Ocultar en pantallas pequeñas
if (window.innerWidth < 480) copilotBtn.style.display = "none";
document.body.appendChild(copilotBtn);

// Crear ventana de chat
const chat = document.createElement("div");
chat.style = `
  position: fixed;
  bottom: 80px;
  right: 16px;
  width: 320px;
  max-height: 400px;
  background: #111;
  border: 1px solid #00ffc3;
  border-radius: 8px;
  padding: 10px;
  display: none;
  flex-direction: column;
  z-index: 9999;
`;
chat.innerHTML = `
  <div id="copilotHistorial" style="flex:1; overflow-y:auto; height:220px; font-size:14px; color:#eee;"></div>
  <input id="copilotPregunta" type="text" placeholder="Escribe tu pregunta..." style="width:100%; padding:6px; margin-top:8px; background:#222; border:1px solid #00ffc3; color:#fff;" />
`;
document.body.appendChild(chat);

// Toggle de visibilidad
copilotBtn.onclick = () => {
  chat.style.display = chat.style.display === "none" ? "flex" : "none";
};

// Lógica de conversación (requiere endpoint externo)
document.getElementById("copilotPregunta").addEventListener("keydown", async (e) => {
  if (e.key === "Enter") {
    const pregunta = e.target.value.trim();
    if (!pregunta) return;

    mostrarMensaje("Tú", pregunta);
    e.target.value = "";

    // Llamada a API (ejemplo con OpenRouter, puedes sustituir por tu backend)
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer tu-clave-api",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "Eres Copilot, un asistente amigable en All-In Arena. Ayudas a jugadores de póker con dudas, torneos y estrategias." },
          { role: "user", content: pregunta }
        ]
      })
    });

    const data = await res.json();
    const respuesta = data.choices?.[0]?.message?.content || "⚠️ No se pudo obtener respuesta.";
    mostrarMensaje("Copilot", respuesta);
  }
});

// Mostrar mensaje en el historial
function mostrarMensaje(de, texto) {
  const zona = document.getElementById("copilotHistorial");
  const msg = document.createElement("p");
  msg.innerHTML = `<strong>${de}:</strong> ${texto}`;
  zona.appendChild(msg);
  zona.scrollTop = zona.scrollHeight;
}
