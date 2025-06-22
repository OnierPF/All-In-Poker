// pin.js – verificación simple de PIN
document.addEventListener('DOMContentLoaded', () => {
  const pinInput = document.querySelector('input[name="pin"]');
  pinInput.addEventListener('input', () => {
    pinInput.value = pinInput.value.replace(/\D/g, '').slice(0, 4);
  });
});
