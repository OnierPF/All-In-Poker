// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(session({
  secret: 'tu_super_secreto_aqui', // Reemplaza por un string seguro
  resave: false,
  saveUninitialized: true,
}));

// Auth admin
function authAdmin(req, res, next) {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.status(401).json({ error: 'No autorizado' });
  }
}

// Login admin
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'AyYqQbRttSw91030135967.') {
    req.session.admin = true;
    res.json({ message: 'Login exitoso' });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
});

// Variables globales de configuración
let conversionRateMLCtoCUP = 390;
let monthlyLimitCUP = 120000;
let monthlyLimitMLC = 120000;
let monthlyTotalCUP = 0;
let monthlyTotalMLC = 0;
let lastTransferMonth = new Date().getMonth();

// Funciones de límites mensuales
function updateMonthlyCountersReset() {
  const currentMonth = new Date().getMonth();
  if (currentMonth !== lastTransferMonth) {
    monthlyTotalCUP = 0;
    monthlyTotalMLC = 0;
    lastTransferMonth = currentMonth;
  }
}

function updateMonthlyCounters(currency, amount) {
  updateMonthlyCountersReset();
  if (currency === "CUP") {
    monthlyTotalCUP += amount;
  } else if (currency === "MLC") {
    monthlyTotalMLC += amount;
  }
}

function getDaysLeftInMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const totalDays = new Date(year, month + 1, 0).getDate();
  return totalDays - today.getDate() + 1;
}

function getDailyLimit(currency) {
  updateMonthlyCountersReset();
  let limit, total;
  if (currency === "CUP") {
    limit = monthlyLimitCUP;
    total = monthlyTotalCUP;
  } else if (currency === "MLC") {
    limit = monthlyLimitMLC;
    total = monthlyTotalMLC;
  } else {
    return { dailyAvailable: 0, remainingMonthly: 0 };
  }
  const daysLeft = getDaysLeftInMonth();
  const dailyAvailable = (limit - total) / daysLeft;
  return { dailyAvailable, remainingMonthly: limit - total };
}

// ——— Paso 1: Endpoint GET /api/purchase-requests ———

// Almacena en memoria las solicitudes de compra
let purchaseRequests = [];

// Devuelve todas las solicitudes (requiere sesión admin)
app.get('/api/purchase-requests', authAdmin, (req, res) => {
  res.json(purchaseRequests);
});

// Configuración de conversión
app.post('/api/config/conversion-rate', authAdmin, (req, res) => {
  const { newRate } = req.body;
  if (!newRate || newRate <= 0) {
    return res.status(400).json({ error: 'El valor de la tasa debe ser mayor que 0.' });
  }
  conversionRateMLCtoCUP = newRate;
  res.json({ message: `Tasa actualizada a 1 MLC = ${conversionRateMLCtoCUP} CUP` });
});

// Configuración de límites mensuales
app.post('/api/config/monthly-limits', authAdmin, (req, res) => {
  const { newLimitCUP, newLimitMLC } = req.body;
  if (!newLimitCUP || newLimitCUP <= 0 || !newLimitMLC || newLimitMLC <= 0) {
    return res.status(400).json({ error: "Los límites deben ser mayores que 0." });
  }
  monthlyLimitCUP = newLimitCUP;
  monthlyLimitMLC = newLimitMLC;
  res.json({ message: `Límites actualizados a ${monthlyLimitCUP} CUP y ${monthlyLimitMLC} MLC` });
});

// Módulo de criptomonedas
const cryptoWallet = {
  balances: {},
  initUser(userId) {
    if (!this.balances[userId]) {
      this.balances[userId] = { BTC: 0, ETH: 0, USDT: 0, CUP: 0, MLC: 0 };
    }
  },
  deposit(userId, coin, amount) {
    this.initUser(userId);
    this.balances[userId][coin] += amount;
    return this.balances[userId];
  },
  withdraw(userId, coin, amount) {
    this.initUser(userId);
    if (this.balances[userId][coin] >= amount) {
      this.balances[userId][coin] -= amount;
      return { success: true, balance: this.balances[userId][coin] };
    }
    return { success: false, message: "Saldo insuficiente" };
  },
  transfer(fromUser, toUser, coin, amount, commission = 0.01) {
    this.initUser(fromUser);
    this.initUser(toUser);
    const fee = amount * commission;
    const totalDeduction = amount + fee;
    if (this.balances[fromUser][coin] >= totalDeduction) {
      this.balances[fromUser][coin] -= totalDeduction;
      this.balances[toUser][coin] += amount;
      this.initUser('admin');
      this.balances['admin'][coin] += fee;
      return { success: true, fee, balanceFrom: this.balances[fromUser][coin] };
    }
    return { success: false, message: "Saldo insuficiente para transferencia" };
  }
};

app.post('/api/crypto/deposit', (req, res) => {
  const { userId, coin, amount } = req.body;
  const balance = cryptoWallet.deposit(userId, coin, amount);
  res.json({ message: `Depósito exitoso en ${coin}`, balance });
});

app.post('/api/crypto/withdraw', (req, res) => {
  const { userId, coin, amount } = req.body;
  updateMonthlyCountersReset();
  const limits = getDailyLimit(coin);
  if (amount > limits.dailyAvailable) {
    return res.status(400).json({ error: `Excede límite diario: ${limits.dailyAvailable.toFixed(2)} ${coin}.` });
  }
  const result = cryptoWallet.withdraw(userId, coin, amount);
  if (result.success) {
    updateMonthlyCounters(coin, amount);
    return res.json({
      message: `Retiro exitoso de ${amount} ${coin}.`,
      balance: result.balance,
      dailyAvailable: getDailyLimit(coin).dailyAvailable.toFixed(2)
    });
  }
  res.status(400).json({ error: result.message });
});

app.post('/api/crypto/transfer', (req, res) => {
  const { fromUser, toUser, coin, amount } = req.body;
  const result = cryptoWallet.transfer(fromUser, toUser, coin, amount);
  if (result.success) {
    return res.json({ message: `Transferencia ${amount} ${coin}. Comisión: ${result.fee}`, balance: result.balanceFrom });
  }
  res.status(400).json({ error: result.message });
});

// Contacto / Notificaciones
app.post('/api/contact', (req, res) => {
  const { nombre, correo, mensaje } = req.body;
  if (!nombre || !correo || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son obligatorios." });
  }
  const subject = `Contacto de ${nombre}`;
  const text = `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje:\n${mensaje}`;
  sendNotification("allinpokerqva@gmail.com", subject, text);
  res.json({ message: "Mensaje enviado. Gracias." });
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tu_email@gmail.com',
    pass: 'tu_contraseña_de_email'
  }
});

function sendNotification(email, subject, message) {
  const mailOptions = { from: 'tu_email@gmail.com', to: email, subject, text: message };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error("Error enviando mail:", err);
    else console.log("Mail enviado:", info.response);
  });
}

// Reequilibrio de mesas en torneos
app.post('/api/tournaments/rebalance', authAdmin, (req, res) => {
  let { tables, minPlayers } = req.body;
  if (!minPlayers) minPlayers = 4;

  for (let i = 0; i < tables.length; i++) {
    if (tables[i].players.length < minPlayers) {
      for (let j = i + 1; j < tables.length; j++) {
        while (tables[i].players.length < minPlayers && tables[j].players.length > minPlayers) {
          const player = tables[j].players.pop();
          tables[i].players.push(player);
        }
      }
    }
  }
  res.json({ message: "Mesas reequilibradas", tables });
});

// Inicio del servidor
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
