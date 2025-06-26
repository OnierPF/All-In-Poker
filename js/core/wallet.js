/**
 * wallet.js – Depósitos, retiros y comisiones
 */
export async function deposit(amount, method) {
  const res = await fetch('/api/wallet/deposit', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization': sessionStorage.getItem('token')},
    body: JSON.stringify({ amount, method })
  });
  return res.json();
}

export async function withdraw(amount, method) {
  const res = await fetch('/api/wallet/withdraw', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization': sessionStorage.getItem('token')},
    body: JSON.stringify({ amount, method })
  });
  return res.json();
}

// Ejemplo de uso en tienda
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('buy-chips-form');
  if (form) {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const amount = +form.amount.value;
      const currency = form.currency.value;
      const result = await deposit(amount, currency);
      alert(result.message || 'Operación completada');
    });
  }
});
