// ⚙️ Inicializa el sistema si es la primera vez
if (!localStorage.getItem('fichas')) {
  localStorage.setItem('fichas', '1000');
}

if (!localStorage.getItem('nombre')) {
  localStorage.setItem('nombre', 'Jugador');
}

// 💰 Obtener el total actual de fichas
function obtenerFichas() {
  return parseInt(localStorage.getItem('fichas')) || 0;
}

// 🔄 Modifica fichas (+ o -)
function modificarFichas(cantidad) {
  let fichas = obtenerFichas();
  fichas += cantidad;
  if (fichas < 0) fichas = 0;
  localStorage.setItem('fichas', fichas);
  return fichas;
}

// 👤 Muestra el perfil del jugador dentro de un contenedor
function mostrarPerfilEn(divId) {
  const contenedor = document.getElementById(divId);
  if (!contenedor) return;
  const nombre = localStorage.getItem('nombre') || 'Jugador';
  const fichas = obtenerFichas();
  contenedor.innerHTML = `👤 Bienvenido, <strong>${nombre}</strong> | 🪙 Fichas: <strong>${fichas}</strong>`;
}
