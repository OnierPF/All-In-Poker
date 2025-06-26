// js/admin.js — Panel Super-Admin v1

import {
  getPackages, savePackages, purchasePackage,
  getUsers, saveUsers,
  obtenerFichas, obtenerCUP,
  getSalesStats
} from './utils.js';

// — LOGIN & PANELES —
const loginForm = document.getElementById('adminLoginForm');
const loginErr  = document.getElementById('loginError');
const loginCont = document.getElementById('loginContainer');
const adminPanel= document.getElementById('adminPanel');

loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  // Credenciales fijas: admin/admin
  if (u === 'admin' && p === 'admin') {
    loginCont.style.display = 'none';
    adminPanel.style.display = 'block';
    initializeAdmin();
  } else {
    loginErr.textContent = 'Credenciales inválidas';
  }
});

// — Inicialización después del Login —
function initializeAdmin() {
  loadMonthlyLimits();
  setupMonthlyLimitsForm();
  setupRebalance();
  setupTabs();
  loadShopTab();
  loadUsersTab();
  renderSalesChart();
}

// — LÍMITES MENSUALES —
function loadMonthlyLimits() {
  const cup = localStorage.getItem('monthlyLimitCUP') || '120000';
  const mlc = localStorage.getItem('monthlyLimitMLC') || '120000';
  document.getElementById('currentMonthlyLimitCUP').textContent = cup;
  document.getElementById('currentMonthlyLimitMLC').textContent = mlc;
}
function setupMonthlyLimitsForm() {
  document.getElementById('monthlyLimitsForm').addEventListener('submit', e => {
    e.preventDefault();
    const nCUP = document.getElementById('newLimitCUP').value;
    const nMLC = document.getElementById('newLimitMLC').value;
    localStorage.setItem('monthlyLimitCUP', nCUP);
    localStorage.setItem('monthlyLimitMLC', nMLC);
    loadMonthlyLimits();
    document.getElementById('monthlyLimitsMsg').textContent = 'Límites actualizados';
  });
}

// — REEQUILIBRAR MESAS —
function setupRebalance() {
  document.getElementById('rebalanceBtn').addEventListener('click', async () => {
    try {
      const res = await fetch('http://localhost:3000/api/tournaments/rebalance', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        credentials:'include',
        body:JSON.stringify({})
      });
      const data = await res.json();
      document.getElementById('rebalanceMsg').textContent = data.message;
    } catch {
      document.getElementById('rebalanceMsg').textContent = 'Error al reequilibrar';
    }
  });
}

// — TABS DE NAVEGACIÓN —
function setupTabs() {
  const btns = document.querySelectorAll('.tab-btn');
  btns.forEach(b => {
    b.addEventListener('click', () => {
      btns.forEach(x => x.classList.remove('active'));
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      b.classList.add('active');
      document.getElementById(b.dataset.tab).classList.add('active');
    });
  });
}

// — SHOP TAB —
function loadShopTab() {
  const tbody = document.querySelector('#shopTable tbody');
  function render() {
    tbody.innerHTML = '';
    getPackages().forEach(p => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.name}</td>
        <td>${p.price}</td>
        <td>${p.chips}</td>
        <td class="actions">
          <button data-id="${p.id}" class="editPkg">✏️</button>
          <button data-id="${p.id}" class="delPkg">🗑️</button>
        </td>`;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('.editPkg').forEach(btn => {
      btn.onclick = () => editPackage(+btn.dataset.id);
    });
    tbody.querySelectorAll('.delPkg').forEach(btn => {
      btn.onclick = () => {
        if (confirm('Eliminar paquete?')) {
          deletePackage(+btn.dataset.id);
        }
      };
    });
  }
  render();

  document.getElementById('addPackageBtn').onclick = () => {
    const name  = prompt('Nombre de paquete:');
    const price = prompt('Precio CUP:');
    const chips = prompt('Fichas:');
    if (!name||!price||!chips) return;
    const arr = getPackages();
    const id  = arr.length ? Math.max(...arr.map(x=>x.id))+1 : 1;
    arr.push({id,name,price:+price,chips:+chips});
    savePackages(arr);
    render(); renderSalesChart();
  };

  function editPackage(id) {
    const arr = getPackages();
    const pkg = arr.find(x=>x.id===id);
    const name  = prompt('Nombre:', pkg.name);
    const price = prompt('Precio CUP:', pkg.price);
    const chips = prompt('Fichas:', pkg.chips);
    if (name!=null) {
      pkg.name=name; pkg.price=+price; pkg.chips=+chips;
      savePackages(arr);
      render(); renderSalesChart();
    }
  }
  function deletePackage(id) {
    const arr = getPackages().filter(x=>x.id!==id);
    savePackages(arr);
    render(); renderSalesChart();
  }
}

// — USERS TAB —
function loadUsersTab() {
  const tbody = document.querySelector('#usersTable tbody');
  const search = document.getElementById('userSearch');
  function render(list) {
    tbody.innerHTML = '';
    list.forEach(u => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.name}</td>
        <td>${u.fichas}</td>
        <td>${u.cup}</td>
        <td><button data-name="${u.name}" class="editUsr">✏️</button></td>`;
      tbody.appendChild(tr);
    });
    tbody.querySelectorAll('.editUsr').forEach(b => {
      b.onclick = () => editUser(b.dataset.name);
    });
  }
  const allUsers = getUsers();
  render(allUsers);

  search.addEventListener('input', () => {
    const q = search.value.toLowerCase();
    render(allUsers.filter(u => u.name.toLowerCase().includes(q)));
  });

  function editUser(name) {
    const arr = getUsers();
    const usr = arr.find(x=>x.name===name);
    const newName = prompt('Nombre:', usr.name);
    const f = prompt('Fichas:', usr.fichas);
    const c = prompt('CUP:', usr.cup);
    if (newName!=null) {
      usr.name=newName; usr.fichas=+f; usr.cup=+c;
      saveUsers(arr);
      render(arr);
    }
  }
}

// — STATS TAB —
function renderSalesChart() {
  const data = getSalesStats();
  const ctx  = document.getElementById('salesChart').getContext('2d');
  new Chart(ctx, {
    type:'bar',
    data: {
      labels: data.map(x=>x.name),
      datasets: [{ label:'Ventas', data: data.map(x=>x.count), backgroundColor:'#00ff7f' }]
    },
    options: { plugins:{legend:{display:false}} }
  });
}
