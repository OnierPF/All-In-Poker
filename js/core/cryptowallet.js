/**
 * cryptowallet.js – Integración crypto (depósito/retiro)
 */
export async function cryptoDeposit(address, amount, coin) {
  const res = await fetch('/api/crypto/deposit', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization': sessionStorage.getItem('token')},
    body: JSON.stringify({ address, amount, coin })
  });
  return res.json();
}

export async function cryptoWithdraw(address, amount, coin) {
  const res = await fetch('/api/crypto/withdraw', {
    method:'POST',
    headers:{'Content-Type':'application/json','Authorization': sessionStorage.getItem('token')},
    body: JSON.stringify({ address, amount, coin })
  });
  return res.json();
}
