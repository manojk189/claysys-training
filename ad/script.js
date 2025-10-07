// --- Simple state + persistence ---
const STORAGE_KEY = 'admin_portal_v1';
let state = { users: [], services: [], appointments: [], activity: [] };

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) state = JSON.parse(raw);

  // seed admin user if none
  if (!state.users.find(u => u.username === 'admin')) {
    state.users.push({
      id: genId(),
      username: 'admin',
      email: 'admin@local',
      phone: '',
      role: 'admin',
      password: 'admin'
    });
  }
  save();
}
function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function genId() { return Math.random().toString(36).slice(2, 9); }

// --- Auth helpers ---
function checkLogin() {
  return localStorage.getItem('admin_loggedin') === 'true';
}

function tryLogin() {
  load();
  const u = document.getElementById('loginUser').value;
  const p = document.getElementById('loginPass').value;
  const found = state.users.find(x => x.username === u && x.password === p);

  if (found && (found.role === 'admin' || found.username === 'admin')) {
    localStorage.setItem('admin_loggedin', 'true');
    return true;
  } else {
    alert('Invalid credentials or not an admin');
    return false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) logoutBtn.onclick = () => {
    localStorage.removeItem('admin_loggedin');
    window.location.href = 'index.html';
  };
});

// --- Rendering functions ---
function renderOverview() {
  load();
  const upcoming = state.appointments.filter(a => a.status !== 'completed').slice(0, 5);
  document.getElementById('upcomingList').innerHTML =
    upcoming.length
      ? upcoming.map(a => `<div>${a.datetime} • ${a.service} • ${a.user}</div>`).join('')
      : '—';
  document.getElementById('serviceCount').innerText = state.services.length;
  document.getElementById('userCount').innerText = state.users.length;
  document.getElementById('recentActivity').innerHTML =
    state.activity.slice(-6).reverse().map(t => `<div>${t}</div>`).join('') ||
    'No recent activity';
}

function renderUsers() {
  load();
  const tbody = document.querySelector('#usersTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  state.users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.username}</td>
      <td>${u.email}</td>
      <td>${u.phone || '-'}</td>
      <td>${u.role || 'user'}</td>
      <td class="actions">
        <button onclick="editUser('${u.id}')">Edit</button>
        <button onclick="deleteUser('${u.id}')">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function renderServices() {
  load();
  const tbody = document.querySelector('#servicesTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  state.services.forEach(s => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.duration}</td>
      <td>${s.price}</td>
      <td>${s.providers || '-'}</td>
      <td class="actions">
        <button onclick="editService('${s.id}')">Edit</button>
        <button onclick="deleteService('${s.id}')">Delete</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

function renderAppointments() {
  load();
  const tbody = document.querySelector('#appointmentsTable tbody');
  if (!tbody) return;
  tbody.innerHTML = '';
  state.appointments.forEach(a => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${a.datetime}</td>
      <td>${a.service}</td>
      <td>${a.user}</td>
      <td>${a.provider || '-'}</td>
      <td>${a.status || 'confirmed'}</td>
      <td class="actions">
        <button onclick="reschedule('${a.id}')">Reschedule</button>
        <button onclick="cancelAppointment('${a.id}')">Cancel</button>
      </td>`;
    tbody.appendChild(tr);
  });
}

// --- CRUD operations (Users, Services, Appointments) ---
// (Keep your existing add/edit/delete logic here — they’re reusable)

// --- Modal helpers ---
function showModal(html) {
  document.getElementById('modalContent').innerHTML = html;
  const m = document.getElementById('modal');
  if (m) m.style.display = 'flex';
}
function closeModal() {
  const m = document.getElementById('modal');
  if (m) m.style.display = 'none';
}

// Initialize state on every page
load();
