/**
 * glowingCards.js – Efectos de brillo en cartas conectadas
 */
export function highlightWinningHand(cardsSelector) {
  const cards = document.querySelectorAll(cardsSelector);
  // Simulamos: si data-winning="true" → glow
  cards.forEach(card => {
    if (card.dataset.winning === 'true') {
      card.classList.add('glow');
    } else {
      card.classList.remove('glow');
    }
  });
}

document.addEventListener('handsEvaluated', e => {
  // Evento custom con detalle { selector: '.card', winners: [...] }
  const { selector, winners } = e.detail;
  document.querySelectorAll(selector).forEach(card => {
    card.dataset.winning = winners.includes(card.id) ? 'true' : 'false';
  });
  highlightWinningHand(selector);
});
