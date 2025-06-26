/**
 * quickJoin.js – Botón “Unirse rápido” en lobby
 */
export async function quickJoin() {
  try {
    const res = await fetch('/api/lobby/quickjoin', {
      headers: {'Authorization': sessionStorage.getItem('token')}
    });
    const { tableId } = await res.json();
    window.location = `mesa.html?table=${tableId}`;
  } catch (err) {
    console.error(err);
    alert('No hay mesas disponibles');
  }
}

document.getElementById('quick-join')?.addEventListener('click', quickJoin);
