/**
 * inventory.js – Gestión del inventario (tienda.html)
 */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('buy-chips-form');
  if (!form) return;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const amount = +form.amount.value;
    const currency = form.currency.value;
    try {
      const res = await fetch('/api/inventory/buy', {
        method: 'POST',
        headers: {'Content-Type':'application/json', 'Authorization': sessionStorage.getItem('token')},
        body: JSON.stringify({ amount, currency })
      });
      const json = await res.json();
      if (res.ok) {
        alert(`Compra exitosa: ${json.chips} fichas añadidas`);
        form.reset();
      } else {
        alert(json.message || 'Error al comprar');
      }
    } catch (err) {
      console.error(err);
      alert('Fallo de red');
    }
  });
});
