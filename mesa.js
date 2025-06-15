function renderMesa() {
  const mesa = document.getElementById("mesaTorneo");
  mesa.innerHTML = "";

  const torneo = window.torneos[0];
  const activos = torneo.jugadores.filter(j => !j.eliminado);

  // Autodetectar fin de torneo
  if (activos.length === 1 && torneo.estado !== "finalizado") {
    torneo.estado = "finalizado";
    torneo.ganador = activos[0].nombre;
    narrarAccion(torneo.ganador, "gana");
    mostrarRankingFinal(torneo);
  }

  torneo.jugadores.forEach(j => {
    const div = document.createElement("div");
    let clase = "jugador";
    if (j.eliminado) clase += " eliminado";
    if (enRacha(j.nombre)) clase += " racha-activa";

    const titulo = `${obtenerTitulo(j.nombre)} ${j.nombre}`;
    div.className = clase;
    div.innerHTML = `
      <strong>${titulo}</strong><br/>
      Fichas: ${j.fichas}<br/>
      ${j.eliminado ? `<small>${textos.eliminado}</small>` : `
        <button onclick="accionJugador('${j.nombre}', 'pasa')">${textos.pasar}</button>
        <button onclick="accionJugador('${j.nombre}', 'foldea')">${textos.foldear}</button>
        <button onclick="accionJugador('${j.nombre}', 'sube', 200)">${textos.subir}</button>
      `}
    `;
    mesa.appendChild(div);
  });
}

function accionJugador(nombre, accion, cantidad = 0) {
  if (accion === "sube") quitarFichas(nombre, cantidad);
  narrarAccion(nombre, accion, cantidad);
  renderMesa();
}

function quitarFichas(nombre, cantidad) {
  const torneo = window.torneos[0];
  const jugador = torneo.jugadores.find(j => j.nombre === nombre);
  if (!jugador || jugador.eliminado) return;

  jugador.fichas -= cantidad;
  if (jugador.fichas <= 0) {
    jugador.fichas = 0;
    jugador.eliminado = true;
    torneo.eliminados.unshift(jugador.nombre);
    narrarAccion(nombre, "eliminado");
  }
}

function mostrarRankingFinal(torneo) {
  const ranking = [...torneo.eliminados, torneo.ganador];
  const div = document.createElement("div");
  div.className = "ranking-final";
  let html = `<h2>🏆 ${textos.clasificacion}:</h2><ol>`;

  ranking.forEach((nombre, i) => {
    const lugar = ranking.length - i;
    const premio = torneo.premiosPorLugar?.[lugar] || 0;
    agregarFichas(nombre, premio);
    html += `<li>${lugar}${textos.lugar}: ${nombre} — ${premio} fichas (${textos.total}: ${monedero[nombre]})</li>`;
  });

  html += `</ol><p style='color:#0f0'>${textos.premio_extra}</p>`;
  div.innerHTML = html;
  document.body.appendChild(div);
}
