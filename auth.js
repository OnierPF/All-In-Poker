(function () {
  const verificado = localStorage.getItem('verificado');
  if (verificado !== 'true') {
    alert('Debes verificar tu cuenta antes de continuar.');
    window.location.href = 'registro.html';
  }
})();
