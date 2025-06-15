// 🧳 Inicializar inventario y equipo si no existe
window.inventario = window.inventario || {};
window.equipado = window.equipado || {};

// 🎁 Añadir un ítem al inventario de un jugador
function agregarAlInventario(nombre, item) {
  if (!inventario[nombre]) inventario[nombre] = [];
  if (!inventario[nombre].includes(item)) {
    inventario[nombre].push(item);
    console.log(`🧳 ${nombre} obtuvo: ${item}`);
    if (typeof hablar === "function") hablar(`${nombre} obtuvo ${item}`);
  }
}

// 🛡️ Equipar ítem visible
function equiparItem(nombre, item) {
  if (inventario[nombre]?.includes(item)) {
    equipado[nombre] = item;
    console.log(`🛡️ ${nombre} ha equipado: ${item}`);
    if (typeof hablar === "function") hablar(`${nombre} ha equipado ${item}`);
    if (typeof aplicarEstiloEquipado === "function") aplicarEstiloEquipado();
  }
}
