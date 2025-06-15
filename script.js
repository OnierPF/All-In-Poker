let saldo = 1000;

const cartas = [
  "2♠", "3♠", "4♠", "5♠", "6♠", "7♠", "8♠", "9♠", "10♠", "J♠", "Q♠", "K♠", "A♠",
  "2♥", "3♥", "4♥", "5♥", "6♥", "7♥", "8♥", "9♥", "10♥", "J♥", "Q♥", "K♥", "A♥",
  "2♣", "3♣", "4♣", "5♣", "6♣", "7♣", "8♣", "9♣", "10♣", "J♣", "Q♣", "K♣", "A♣",
  "2♦", "3♦", "4♦", "5♦", "6♦", "7♦", "8♦", "9♦", "10♦", "J♦", "Q♦", "K♦", "A♦"
];

function obtenerCartasAleatorias(cantidad) {
  const copia = [...cartas];
  const seleccionadas = [];
  for (let i = 0; i < cantidad; i++) {
    const indice = Math.floor(Math.random() * copia.length);
    seleccionadas.push(copia.splice(indice, 1)[0]);
  }
  return seleccionadas;
}

function repartirCartas() {
  const cartasJugador = document.querySelector(".cartas-jugador");
  const cartasComunitarias = document.getElementById("comunitarias");

  const todas = obtenerCartasAleatorias(7);
  const mano = todas.slice(0, 2);
  const mesa = todas.slice(2);

  cartasJugador.innerHTML = mano.join(" ");
  cartasComunitarias.innerHTML = mesa.join(" ");
}

function actualizarSaldo() {
  document.getElementById("saldo").textContent = saldo;
}

// 🎯 Botones
document.getElementById("apostar").addEventListener("click", function () {
  if (saldo >= 100) {
    saldo -= 100;
    repartirCartas();
    actualizarSaldo();
    alert("Has apostado 100 fichas. Nuevas cartas en juego.");
  } else {
    alert("No tienes suficientes fichas para apostar.");
  }
});

document.getElementById("igualar").addEventListener("click", function () {
  if (saldo >= 50) {
    saldo -= 50;
    actualizarSaldo();
    alert("Has igualado la apuesta. -50 fichas.");
  } else {
    alert("No tienes suficientes fichas para igualar.");
  }
});

document.getElementById("retirarse").addEventListener("click", function () {
  alert("Te has retirado de la partida. Tu saldo permanece igual.");
});

// Iniciar
window.onload = function () {
  repartirCartas();
  actualizarSaldo();
};


