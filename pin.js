// Genera y simula el envío de un código de verificación por “correo”
function generarCodigo(nombre) {
  const codigo = Math.floor(100000 + Math.random() * 900000).toString();
  localStorage.setItem(`codigoVerif_${nombre}`, codigo);
  alert(`📧 Código enviado al correo de ${nombre} (simulado): ${codigo}`);
}

// Verifica el código ingresado con el almacenado
function verificarCodigo(nombre, codigo) {
  const guardado = localStorage.getItem(`codigoVerif_${nombre}`);
  return guardado === codigo;
}

// Cifra en base64 simple (solo para evitar lectura directa)
function cifrar(texto) {
  return btoa(texto);
}
function descifrar(texto) {
  try { return atob(texto); } catch { return ""; }
}

// Guarda el PIN cifrado
function guardarPIN(nombre, pin) {
  localStorage.setItem(`pin_${nombre}`, cifrar(pin));
}

// Verifica el PIN ingresado
function verificarPIN(nombre, pinIngresado) {
  const cifrado = localStorage.getItem(`pin_${nombre}`);
  return descifrar(cifrado) === pinIngresado;
}

// Flujo completo para ingresar PIN antes de acciones críticas
function solicitarVerificacionPIN(nombre, callbackSeguro) {
  const tienePIN = localStorage.getItem(`pin_${nombre}`) !== null;

  if (!tienePIN) {
    alert("Este jugador aún no tiene PIN. Debes establecer uno primero.");
    return;
  }

  const intento = prompt(`🔒 Ingresa tu PIN, ${nombre}:`);
  if (verificarPIN(nombre, intento)) {
    callbackSeguro();
  } else {
    alert("❌ PIN incorrecto. Acceso denegado.");
  }
}

// Establecer o resetear PIN con código
function establecerNuevoPIN(nombre) {
  generarCodigo(nombre);
  const codIngresado = prompt(`✉️ Ingresa el código enviado al correo de ${nombre}:`);
  if (!verificarCodigo(nombre, codIngresado)) {
    alert("❌ Código incorrecto.");
    return;
  }

  const nuevoPIN = prompt("🧠 Establece tu nuevo PIN (4 dígitos):");
  if (nuevoPIN?.length === 4) {
    guardarPIN(nombre, nuevoPIN);
    alert("✅ PIN guardado con éxito.");
  } else {
    alert("❌ PIN no válido.");
  }
}
