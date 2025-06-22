/**
 * privateReveal.js – Revelado privado de cartas al jugador
 */
export function revealPrivateCards(handSelector) {
  const hand = document.querySelector(handSelector);
  if (!hand) return;
  // Cada carta tiene data-card="AS", data-owner="user123"
  hand.querySelectorAll('.card').forEach(card => {
    if (card.dataset.owner === window.currentUser) {
      card.classList.remove('face-down');
      card.classList.add('face-up');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  revealPrivateCards('#player-hand');
});
