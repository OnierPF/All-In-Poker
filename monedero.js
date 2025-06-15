// 💰 Estado inicial si no existe
window.monedero = window.monedero || {
  "TonyHabana": 1000,
  "LaYeya82": 800
};

// 💸 Agrega fichas a un jugador
function agregarFichas(nombre, cantidad) {
  if (!monedero[nombre]) monedero[nombre] = 0;
  monedero[nombre] += cantidad;
}

// 💳 Resta fichas si hay saldo suficiente
function restarFichas(nombre, cantidad) {
  if (!monedero[nombre]) monedero[nombre] = 0;
  if (monedero[nombre] >= cantidad) {
    monedero[nombre] -= cantidad;
    return true;
  }
  return false;
}

// 🎯 Estado visual y hablado del jugador
function mostrarEstadoJugador(nombre, destino = "console") {
  const fichas = monedero?.[nombre] ?? 0;
  const items = window.inventario?.[nombre]?.length ?? 0;
  const equipado = window.equipado?.[nombre] ?? "nada";
  const mensaje = `${nombre} tiene ${fichas} fichas, ${items} objeto(s), equipado: ${equipado}.`;

  if (destino === "console") {
    console.log("🎯 " + mensaje);
  } else if (destino === "alerta") {
    alert("🎯 " + mensaje);
  } else {
    const el = document.getElementById(destino);
    if (el) el.textContent = "🎯 " + mensaje;
  }

  if (typeof hablar === "function") hablar(mensaje);
}

// 🧠 Guardado del estado global
function guardarEstado() {
  const estado = {
    monedero,
    inventario: window.inventario,
    equipado: window.equipado
  };
  localStorage.setItem("estadoAllIn", JSON.stringify(estado));
}

// 💾 Carga automática del estado al iniciar
function cargarEstado() {
  const data = localStorage.getItem("estadoAllIn");
  if (data) {
    const estado = JSON.parse(data);
    if (estado.monedero) window.monedero = estado.monedero;
    if (estado.inventario) window.inventario = estado.inventario;
    if (estado.equipado) window.equipado = estado.equipado;
  }
}

cargarEstado();
setInterval(guardarEstado, 2000);
