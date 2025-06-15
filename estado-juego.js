// 🔁 Estado inicial del sistema
window.estadoJuego = {
  torneos: [
    { nombre: "Rebuy 500", jugadores: 8, estado: "activo", hora: "20:00" },
    { nombre: "Satélite VIP", jugadores: 10, estado: "esperando", hora: "21:00" }
  ],
  mesas: [
    { id: "Mesa Roja", jugadores: 4 },
    { id: "Mesa Verde", jugadores: 6 }
  ],
  botones: {
    jugar: "botón grande en el centro del lobby",
    tienda: "arriba a la derecha, ícono 💰",
    ayuda: "parte inferior del menú de navegación",
    torneos: "segunda opción del menú superior",
    mesa: "ícono 🂡 en el menú de navegación"
  }
};

// 🧭 Obtener lista rápida de torneos activos
function obtenerTorneosActivos() {
  return estadoJuego.torneos.filter(t => t.estado === "activo");
}

// 🃏 Buscar mesa por ID
function buscarMesa(id) {
  return estadoJuego.mesas.find(m => m.id === id);
}
