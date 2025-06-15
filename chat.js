async function enviar() {
  const entrada = document.getElementById("pregunta").value.trim();
  if (!entrada) return;

  mostrarMensaje("Tú", entrada);
  document.getElementById("pregunta").value = "";

  const respuesta = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": "Bearer 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",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "openai/gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres un asistente amigable que ayuda a jugadores de póker dentro de una plataforma llamada All-In Arena. Explica reglas, ayuda en torneos y responde con claridad." },
        { role: "user", content: entrada }
      ],
      max_tokens: 500
    })
  });

  const data = await respuesta.json();
  const salida = data.choices?.[0]?.message?.content || "⚠️ Error al obtener respuesta.";
  mostrarMensaje("Copilot", salida);
}

function mostrarMensaje(remitente, texto) {
  const historial = document.getElementById("historial");
  const entrada = document.createElement("p");
  entrada.innerHTML = `<strong>${remitente}:</strong> ${texto}`;
  historial.appendChild(entrada);
  historial.scrollTop = historial.scrollHeight;
}
