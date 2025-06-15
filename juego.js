function accionJugador(nombre, accion, cantidad = 0) {
  if (accion === "sube") {
    quitarFichas(nombre, cantidad);
    animarFichaMovimiento();
  }
  narrarAccion(nombre, accion, cantidad);
  renderMesa();
}

function quitarFichas(nombre, cantidad) {
  const torneo = window.torneos?.[0];
  const jugador = torneo?.jugadores?.find(j => j.nombre === nombre);
  if (!jugador || jugador.eliminado) return;

  jugador.fichas -= cantidad;
  if (jugador.fichas <= 0) {
    jugador.fichas = 0;
    jugador.eliminado = true;
    torneo.eliminados.unshift(jugador.nombre);
    narrarAccion(nombre, "eliminado");
  }
}

// 🔄 Ficha visual animada al apostar
function animarFichaMovimiento() {
  const ficha = document.querySelector(".ficha.cup");
  if (!ficha) return;
  ficha.classList.remove("ficha-animada");
  void ficha.offsetWidth;
  ficha.classList.add("ficha-animada");
}

// Carga inicial
window.onload = () => {
  const idioma = localStorage.getItem("idioma") || "es";
  const textosCargados = typeof textos !== "undefined";
  if (textosCargados) {
    document.getElementById("titulo_mesa").textContent = textos.mesa_titulo;
  }

  aplicarEstiloEquipado?.();
  narrarAccion?.(window.jugadorActual || "Anónimo", "entra");
  renderMesa?.();
};
