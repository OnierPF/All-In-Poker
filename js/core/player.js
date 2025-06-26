/**
 * player.js – Carga datos de perfil y estadísticas
 */
document.addEventListener('DOMContentLoaded', async () => {
  if (!document.getElementById('nombre-usuario')) return;
  try {
    const res = await fetch('/api/player/me', {
      headers:{'Authorization': sessionStorage.getItem('token')}
    });
    const data = await res.json();
    document.getElementById('nombre-usuario').textContent = data.username;
    document.getElementById('chips-total').textContent = data.chips;
    document.getElementById('torneos-jugados').textContent = data.tournamentsPlayed;
    document.getElementById('victorias').textContent = data.wins;
    document.getElementById('paid-chips').textContent = data.paidChips;
    document.getElementById('free-chips').textContent = data.freeChips;
  } catch (err) {
    console.error(err);
  }
});
