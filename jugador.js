// 🧠 Jugador actual (sin hardcodear, se espera que lo definas globalmente)
const jugadorActual = window.jugadorActual || localStorage.getItem("nombre") || "Anónimo";

// 📅 Racha diaria automática
(function () {
  const hoy = new Date().toDateString();
  const keyVisita = `ultimaVisita_${jugadorActual}`;
  const rachas = JSON.parse(localStorage.getItem("rachas")) || {};
  const ultima = localStorage.getItem(keyVisita);
  let racha = rachas[jugadorActual] || 0;

  if (ultima !== hoy) {
    const ayer = new Date(Date.now() - 86400000).toDateString();
    racha = (ultima === ayer) ? racha + 1 : 1;
    rachas[jugadorActual] = racha;
    localStorage.setItem(keyVisita, hoy);
    localStorage.setItem("rachas", JSON.stringify(rachas));
  }
})();

// 🏅 Obtener título dinámico por nombre
function obtenerTitulo(nombre) {
  const logros = JSON.parse(localStorage.getItem("logros")) || {};
  const perfil = logros[nombre] || { partidasGanadas: 0 };
  const g = perfil.partidasGanadas;
  if (g >= 10) return textos?.leyenda || "Leyenda del Tapete";
  if (g >= 5) return textos?.rey || "Rey del Bluff";
  return textos?.casual || "Jugador Casual";
}

// 🔥 ¿En racha?
function enRacha(nombre) {
  const r = JSON.parse(localStorage.getItem("rachas")) || {};
  return r[nombre] >= 3;
}

// 🎨 Visual dinámico por ítem equipado
function aplicarEstiloEquipado() {
  const item = window.equipado?.[jugadorActual];
  if (item === "Tema Oscuro") {
    document.body.style.background = "linear-gradient(#0a0a0a, #1a1a1a)";
    document.body.style.color = "#00ffc3";
  }
}

// 🗣️ Voz global multilingüe
function hablar(texto) {
  if (!window.speechSynthesis) return;
  const voz = new SpeechSynthesisUtterance(texto);
  voz.lang = (window.idioma === "en") ? "en-US" : "es-ES";
  voz.rate = 1;
  speechSynthesis.speak(voz);
}

// 🎙️ Narrador contextual de acciones
function narrarAccion(nombre, accion, cantidad = 0) {
  if (!window.textos) return;
  const mapa = {
    pasa: textos.narra_pasa,
    foldea: textos.narra_foldea,
    sube: textos.narra_sube?.replace("$$", cantidad),
    eliminado: textos.narra_out,
    gana: textos.narra_gana,
    entra: textos.narra_entrada,
    allin: textos.narra_allin || `${nombre} va All-In con todas sus fichas.`
  };
  const texto = `[🃏] ${nombre} ${mapa[accion] || "realiza una acción."}`;
  console.log("🎙️", texto);
  hablar(texto);
}
