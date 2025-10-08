
(function bootstrapDemo() {
  if (!localStorage.getItem('users')) {
    const sampleUsers = [
      { id: 1, name: 'Admin User', email: 'admin@demo.com', phone: '', role: 'admin', password: 'admin', status: 'active' },
      { id: 2, name: 'John Doe', email: 'john@demo.com', phone: '', role: 'user', password: 'john', status: 'active' },
      { id: 3, name: 'Dr. Smith', email: 'drsmith@demo.com', phone: '', role: 'provider', password: 'doc', status: 'active' }
    ];
    localStorage.setItem('users', JSON.stringify(sampleUsers));
  }
  if (!localStorage.getItem('services')) {
    const sampleServices = [
      { id: 101, name: 'Doctor Consultation', desc: 'General health consultation', duration: 30, price: 25, provider: 'Dr. Smith', availability: [] },
      { id: 102, name: 'Hair Styling', desc: 'Men & women styling', duration: 45, price: 30, provider: 'Stylist Mary', availability: [] }
    ];
    localStorage.setItem('services', JSON.stringify(sampleServices));
  }
  if (!localStorage.getItem('appointments')) {
    const sampleApps = [
      { id: 201, userId: 2, userName: 'John Doe', serviceId: 101, serviceName: 'Doctor Consultation', provider: 'Dr. Smith', date: '2025-10-05', time: '10:30', status: 'Confirmed' }
    ];
    localStorage.setItem('appointments', JSON.stringify(sampleApps));
  }
})();


function read(key) { return JSON.parse(localStorage.getItem(key) || '[]'); }
function write(key, data) { localStorage.setItem(key, JSON.stringify(data)); }


function injectResponsiveTableStyles() {
  if (document.getElementById('responsive-table-styles')) return;
  const css = `
    .table-responsive { overflow-x: auto; -webkit-overflow-scrolling: touch; width: 100%; }
    .table-responsive table { width: 100%; max-width: 100%; border-collapse: collapse; }
    .table-responsive table td, .table-responsive table th { white-space: nowrap; }
    @media (max-width: 768px) {
      .table-responsive table { display: block; }
    }
  `;
  const style = document.createElement('style');
  style.id = 'responsive-table-styles';
  style.appendChild(document.createTextNode(css));
  document.head.appendChild(style);
}

function ensureTableResponsive(el) {
  if (!el) return;
  // if a tbody was passed, get its table
  const table = (el.tagName && el.tagName.toLowerCase() === 'table') ? el : (el.closest ? el.closest('table') : null);
  if (!table) return;
  // if already wrapped, nothing to do
  if (table.parentElement && table.parentElement.classList && table.parentElement.classList.contains('table-responsive')) return;
  // wrap table in a div.table-responsive
  const wrapper = document.createElement('div');
  wrapper.className = 'table-responsive';
  table.parentNode.insertBefore(wrapper, table);
  wrapper.appendChild(table);
}

// ----------------- Dashboard functions -----------------
function renderDashboard() {
  const users = read('users');
  const services = read('services');
  const appointments = read('appointments');

  // counts
  document.getElementById('card-users').innerText = users.length;
  document.getElementById('card-services').innerText = services.length;

  // upcoming next 7 days
  const now = new Date();
  const in7 = new Date(); in7.setDate(now.getDate() + 7);
  const upcoming = appointments.filter(a => {
    const d = new Date(a.date);
    return d >= now && d <= in7 && a.status !== 'Cancelled';
  });
  document.getElementById('card-appointments').innerText = upcoming.length;

  // ensure responsive styles are present
  injectResponsiveTableStyles();

  // recent activity (last 5 appointments + registrations)
  const recentDiv = document.getElementById('recent-activity');
  recentDiv.innerHTML = '';
  const recentUsers = users.slice(-5).reverse();
  const recentApps = appointments.slice(-5).reverse();
  // Build desktop tables
  let tableHtml = '<div class="recent-tables">';
  tableHtml += '<div class="table-responsive"><table border="1" cellpadding="5" cellspacing="0" style="width:100%; margin-top:10px;border:none;color:green;"><thead><tr><th>Name</th><th>Email</th><th>Phone</th></tr></thead><tbody>';
  if (recentUsers.length === 0) tableHtml += '<tr><td colspan="3">No registrations</td></tr>';
  recentUsers.forEach(u => tableHtml += `<tr><td>${u.name}</td><td>${u.email}</td><td>${u.phone}</td></tr>`);
  tableHtml += '</tbody></table></div>';

  tableHtml += '<strong style="margin-top:8px;display:block">Recent bookings:</strong>';
  tableHtml += '<div class="table-responsive"><table border="1" cellpadding="5" cellspacing="0" style="width:100%; margin-top:10px;color:skyblue;border:none"><thead><tr><th>User</th><th>Service</th><th>Date</th><th>Time</th></tr></thead><tbody>';
  if (recentApps.length === 0) tableHtml += '<tr><td colspan="4">No bookings</td></tr>';
  recentApps.forEach(a => tableHtml += `<tr><td>${a.userName}</td><td>${a.serviceName}</td><td>${a.date}</td><td>${a.time}</td></tr>`);
  tableHtml += '</tbody></table></div>';
  tableHtml += '</div>';

  // Build mobile stacked cards
  let cardHtml = '<div class="recent-cards" style="display:none">';
  cardHtml += '<div class="recent-users-cards">';
  cardHtml += '<h4>Recent registrations</h4>';
  if (recentUsers.length === 0) cardHtml += '<div class="recent-card">No registrations</div>';
  recentUsers.forEach(u => cardHtml += `<div class="recent-card"><strong>${u.name}</strong><div>${u.email}</div><div>${u.phone || '—'}</div></div>`);
  cardHtml += '</div>';
  cardHtml += '<div class="recent-bookings-cards" style="margin-top:8px">';
  cardHtml += '<h4>Recent bookings</h4>';
  if (recentApps.length === 0) cardHtml += '<div class="recent-card">No bookings</div>';
  recentApps.forEach(a => cardHtml += `<div class="recent-card"><strong>${a.userName}</strong><div>${a.serviceName}</div><div>${a.date} ${a.time}</div></div>`);
  cardHtml += '</div>';
  cardHtml += '</div>';

  recentDiv.innerHTML = tableHtml + cardHtml;
  // ensure the tables are wrapped (in case DOM structure changed elsewhere)
  // wrap tables inside the recently inserted content
  recentDiv.querySelectorAll('table').forEach(t => ensureTableResponsive(t));

}

// quick CSV export for appointments
function exportAppointmentsCSV() {
  const apps = read('appointments');
  if (apps.length === 0) { alert('No appointments to export'); return; }
  const headers = ['id', 'userName', 'serviceName', 'provider', 'date', 'time', 'status'];
  const rows = apps.map(a => headers.map(h => `"${(a[h] || '').toString().replace(/"/g, '""')}"`).join(','));
  const csv = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'appointments.csv'; a.click();
  URL.revokeObjectURL(url);
}
//Admin report generation


// generate simple report summary
function generateReport() {
  const users = read('users'), services = read('services'), apps = read('appointments');
  const serviceCounts = {};
  apps.forEach(a => { serviceCounts[a.serviceName] = (serviceCounts[a.serviceName] || 0) + 1; });
  let out = `<p><strong>Total users:</strong> ${users.length}</p>`;
  out += `<p><strong>Total services:</strong> ${services.length}</p>`;
  out += `<p><strong>Total appointments:</strong> ${apps.length}</p>`;
  out += '<p><strong>Service popularity:</strong></p><ul>';
  Object.keys(serviceCounts).forEach(s => out += `<li>${s}: ${serviceCounts[s]}</li>`);
  out += '</ul>';
  document.getElementById('report-output').innerHTML = out;
}

// ----------------- Service Management -----------------
function initServicePage() {
  // cache nodes
  const form = document.getElementById('service-form');
  const tb = document.getElementById('service-table');
  const providerSelect = document.getElementById('sv-provider');
  const svcName = document.getElementById('sv-name');

  // availability helpers
  let availList = [];
  const availUL = document.getElementById('availability-list');
  document.getElementById('add-availability').addEventListener('click', () => {
    const from = document.getElementById('sv-available-from').value;
    const to = document.getElementById('sv-available-to').value;
    const note = document.getElementById('sv-available-note').value;
    if (!from) { alert('Select at least a from date'); return; }
    availList.push({ from, to, note });
    renderAvail();
    // clear fields
    document.getElementById('sv-available-from').value = ''; document.getElementById('sv-available-to').value = ''; document.getElementById('sv-available-note').value = '';
  });

  function renderAvail() {
    availUL.innerHTML = '';
    availList.forEach((a, i) => {
      const li = document.createElement('li');
      li.innerHTML = `${a.from}${a.to ? (' → ' + a.to) : ''} ${a.note ? (' - ' + a.note) : ''} <button style="margin-left:8px" onclick="removeAvail(${i})">Remove</button>`;
      availUL.appendChild(li);
    });
    window.removeAvail = function (idx) { availList.splice(idx, 1); renderAvail(); };
  }

  // load providers (from users with role provider)
  function fillProviders() {
    const users = read('users');
    // create a non-selectable placeholder option
    providerSelect.innerHTML = '';
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.textContent = 'Select main provider (optional)';
    providerSelect.appendChild(placeholder);
    users.filter(u => u.role === 'provider').forEach(p => {
      const opt = document.createElement('option'); opt.value = p.name; opt.textContent = p.name;
      providerSelect.appendChild(opt);
    });
  }
  fillProviders();

  // render services list
  function renderServices() {
    const services = read('services');
    tb.innerHTML = services.map((s, i) => {
      const availSummary = (s.availability && s.availability.length) ? s.availability.map(a => `${a.from}${a.to ? ('-' + a.to) : ''}${a.note ? (' (' + a.note + ')') : ''}`).join(', ') : '—';
      return `<tr>
        <td>${s.name}</td>
        <td>${s.duration} min</td>
        <td>$${s.price}</td>
        <td>${s.provider || '—'}</td>
        <td>${availSummary}</td>
        <td class="actions">
          <button class="edit" onclick="editService(${s.id})">Edit</button>
          <button class="delete" onclick="deleteService(${s.id})">Delete</button>
        </td>
      </tr>`;
    }).join('');
    // ensure responsive table styles & wrapper
    injectResponsiveTableStyles();
    ensureTableResponsive(tb);
  }
  renderServices();

  // form submit - add service
  form.addEventListener('submit', e => {
    e.preventDefault();
    const services = read('services');
    const newService = {
      id: Date.now(),
      name: document.getElementById('sv-name').value,
      desc: document.getElementById('sv-desc').value,
      duration: parseInt(document.getElementById('sv-duration').value, 10),
      price: parseFloat(document.getElementById('sv-price').value),
      provider: document.getElementById('sv-provider').value,
      availability: availList.slice()
    };
  services.push(newService);
  write('services', services);
  // reset
  form.reset();
  availList = []; renderAvail();
  renderServices(); fillServiceFilterOptions(); fillProviders();
  // update dashboard counts
  try { renderDashboard(); } catch (e) { /* dashboard may not be on this page */ }
  alert('Service added');
  });

  // clear
  document.getElementById('clear-service').addEventListener('click', () => { form.reset(); availList = []; renderAvail(); });

  // expose functions to window for edit/delete (used in table)
  window.editService = function (serviceId) {
    const services = read('services');
    const s = services.find(x => x.id === serviceId);
    if (!s) return alert('Service not found');
    // simple edit via prompt for demo (you could implement modal)
    const name = prompt('Service name:', s.name); if (name === null) return;
    const duration = prompt('Duration (min):', s.duration); if (duration === null) return;
    const price = prompt('Price:', s.price); if (price === null) return;
    s.name = name; s.duration = parseInt(duration, 10) || s.duration; s.price = parseFloat(price) || s.price;
  write('services', services); renderServices(); fillServiceFilterOptions();
  try { renderDashboard(); } catch (e) { }
  alert('Service updated');
  };

  window.deleteService = function (serviceId) {
    if (!confirm('Delete this service?')) return;
  let services = read('services'); services = services.filter(s => s.id !== serviceId); write('services', services); renderServices(); fillServiceFilterOptions();
  try { renderDashboard(); } catch (e) { }
  };
  window.refreshProviders = fillProviders;
  fillServiceFilterOptions();
}
function fillServiceFilterOptions() {
  const services = read('services');
  // if appointments page exists, populate its select
  const sel = document.getElementById('filter-service');
  if (sel) {
    sel.innerHTML = '<option value="">All services</option>';
    services.forEach(s => sel.appendChild(Object.assign(document.createElement('option'), { value: s.id, textContent: s.name })));
  }
  // also fill any provider select
  const provSel = document.getElementById('filter-provider');
  if (provSel) {
    provSel.innerHTML = '<option value="">All providers</option>';
    // collect providers from services and users
    const providers = new Set();
    services.forEach(s => { if (s.provider) providers.add(s.provider); });
    providers.forEach(p => provSel.appendChild(Object.assign(document.createElement('option'), { value: p, textContent: p })));
  }
}

// ----------------- Appointment Management -----------------
function initAppointmentsPage() {
  fillServiceFilterOptions();
  renderAppointmentsTable();

  document.getElementById('apply-filters').addEventListener('click', renderAppointmentsTable);
  document.getElementById('reset-filters').addEventListener('click', () => { document.getElementById('filter-service').value = ''; document.getElementById('filter-provider').value = ''; document.getElementById('filter-date').value = ''; renderAppointmentsTable(); });
}

function renderAppointmentsTable() {
  const t = document.getElementById('appointments-table');
  if (!t) return;
  injectResponsiveTableStyles();
  const apps = read('appointments');
  const users = read('users');
  const services = read('services');

  const filterService = document.getElementById('filter-service').value;
  const filterProvider = document.getElementById('filter-provider').value;
  const filterDate = document.getElementById('filter-date').value;

  let filtered = apps.slice();
  if (filterService) filtered = filtered.filter(a => String(a.serviceId) === String(filterService));
  if (filterProvider) filtered = filtered.filter(a => a.provider === filterProvider);
  if (filterDate) filtered = filtered.filter(a => a.date === filterDate);

  t.innerHTML = filtered.map(a => {
    return `<tr>
      <td>${a.userName || (users.find(u => u.id === a.userId)?.name || '—')}</td>
      <td>${a.serviceName}</td>
      <td>${a.provider}</td>
      <td>${a.date}</td>
      <td>${a.time}</td>
      <td>${a.status}</td>
      <td class="actions">
        <button class="edit" onclick="rescheduleAppointment(${a.id})">Reschedule</button>
        <button class="delete" onclick="cancelAppointment(${a.id})">Cancel</button>
        <button class="status" onclick="changeAppointmentStatus(${a.id})">Mark</button>
      </td>
    </tr>`;
  }).join('');
  // if appointments table is inside a container where a full table tag exists, ensure responsiveness
  ensureTableResponsive(t);
}

// appointment actions used from table
window.rescheduleAppointment = function (id) {
  const apps = read('appointments');
  const app = apps.find(a => a.id === id); if (!app) return alert('Not found');
  const newDate = prompt('New date (YYYY-MM-DD):', app.date);
  if (!newDate) return;
  const newTime = prompt('New time (HH:MM):', app.time); if (!newTime) return;
  app.date = newDate; app.time = newTime; write('appointments', apps); renderAppointmentsTable(); alert('Rescheduled');
  try { renderDashboard(); } catch (e) { }
};

window.cancelAppointment = function (id) {
  if (!confirm('Cancel this appointment?')) return;
  const apps = read('appointments'); const app = apps.find(a => a.id === id);
  if (!app) return alert('Not found');
  app.status = 'Cancelled'; write('appointments', apps); renderAppointmentsTable(); alert('Cancelled');
  try { renderDashboard(); } catch (e) { }
};

window.changeAppointmentStatus = function (id) {
  const apps = read('appointments'); const app = apps.find(a => a.id === id);
  if (!app) return alert('Not found');
  const next = prompt('Set status (Confirmed / Completed / Cancelled):', app.status);
  if (!next) return;
  app.status = next; write('appointments', apps); renderAppointmentsTable(); alert('Status updated');
  try { renderDashboard(); } catch (e) { }
};

// ----------------- User Management -----------------
function initUsersPage() {
  renderUserTable();

  const form = document.getElementById('admin-add-user');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('admin-user-name').value;
    const email = document.getElementById('admin-user-email').value;
    const phone = document.getElementById('admin-user-phone').value;
    const role = document.getElementById('admin-user-role').value;
    const password = document.getElementById('admin-user-password').value || 'changeme';
    const users = read('users');
    if (users.some(u => u.email === email)) return alert('Email already exists');
  users.push({ id: Date.now(), name, email, phone, role, password, status: 'active' });
  write('users', users);
  form.reset(); renderUserTable(); window.refreshProviders && window.refreshProviders();
  try { renderDashboard(); } catch (e) { }
  alert('User added');
  });
}

function renderUserTable() {
  const t = document.getElementById('user-table'); if (!t) return;
  injectResponsiveTableStyles();
  const users = read('users');
  t.innerHTML = users.map(u => {
    return `<tr>
      <td>${u.name}</td>
      <td>${u.email}</td>
      <td>${u.phone || '—'}</td>
      <td>${u.role}</td>
      <td>${u.status || 'active'}</td>
      <td class="actions">
        <button class="edit" onclick="editUser(${u.id})">Edit</button>
        <button class="delete" onclick="deleteUser(${u.id})">Delete</button>
        <button class="status" onclick="toggleUserStatus(${u.id})">${u.status === 'deactivated' ? 'Activate' : 'Deactivate'}</button>
      </td>
    </tr>`;
  }).join('');
  ensureTableResponsive(t);
}

window.editUser = function (userId) {
  const users = read('users');
  const u = users.find(x => x.id === userId);
  if (!u) return alert('Not found');
  const name = prompt('Name:', u.name);
  if (name === null) return;
  const phone = prompt('Phone:', u.phone);
  if (phone === null) return;
  const role = prompt('Role (user/provider/admin):', u.role);
  if (role === null) return;
  u.name = name;
  u.phone = phone;
  u.role = role;
  write('users', users);
  renderUserTable();
  // refresh provider lists on other pages (if present)
  window.refreshProviders && window.refreshProviders();
  try { renderDashboard(); } catch (e) { }
  alert('User updated');
}

// delete user
window.deleteUser = function (userId) {
  if (!confirm('Delete this user?')) return;
  let users = read('users') || [];
  const idx = users.findIndex(u => u.id === userId);
  if (idx === -1) return alert('User not found');
  users.splice(idx, 1);
  write('users', users);
  renderUserTable();
  window.refreshProviders && window.refreshProviders();
  try { renderDashboard(); } catch (e) { }
  alert('User deleted');
};

// toggle user status (activate/deactivate)
window.toggleUserStatus = function (userId) {
  const users = read('users') || [];
  const u = users.find(x => x.id === userId);
  if (!u) return alert('User not found');
  u.status = (u.status === 'deactivated') ? 'active' : 'deactivated';
  write('users', users);
  renderUserTable();
  alert(`User ${u.status === 'deactivated' ? 'deactivated' : 'activated'}`);
};
// ====== LOGIN (general user) ======
// Attach a handler to a form with id="login-form" (if present). This is
// separate from the admin login form (which uses id="admin-login-form").
if (document.getElementById('login-form')) {
  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const email = (document.getElementById('login-email') || {}).value || '';
    const password = (document.getElementById('login-password') || {}).value || '';
    const errorBox = document.getElementById('login-error');

    const users = read('users') || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      if (errorBox) errorBox.textContent = 'Invalid credentials';
      else alert('Invalid credentials!');
      return;
    }

    if (user.status === 'deactivated') {
      if (errorBox) errorBox.textContent = 'Account is deactivated';
      else alert('Account is deactivated');
      return;
    }

    // Save current user and redirect to profile
    window.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));
    if (errorBox) errorBox.textContent = '';
    alert('Login successful!');
    window.location.href = 'profile.html';
  });
}
// ----------------- Admin Login -----------------
function initAdminLogin() {
  const form = document.getElementById('admin-login-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    const errorBox = document.getElementById('login-error');

    const users = read('users') || [];
    const admin = users.find(u => u.email === email && u.password === password && u.role === 'admin');

    if (!admin) {
      errorBox.textContent = 'Invalid admin credentials';
      return;
    }

    if (admin.status === 'deactivated') {
      errorBox.textContent = 'Admin account is deactivated';
      return;
    }

    // Save logged-in admin to localStorage using canonical keys
    localStorage.setItem('admin_loggedin', 'true');
    localStorage.setItem('currentAdmin', JSON.stringify(admin));
    // Redirect to admin dashboard
    window.location.href = 'Admindashboard.html';
  });
}

// ----------------- Mobile sidebar toggle -----------------
(function sidebarToggleInit(){
  // safe-guard DOM availability
  function qs(id){ return document.getElementById(id); }
  const toggle = qs('sidebarToggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = qs('overlay');
  if (!toggle || !sidebar || !overlay) return;

  function openSidebar(){ sidebar.classList.add('open'); overlay.classList.add('show'); document.body.style.overflow = 'hidden'; }
  function closeSidebar(){ sidebar.classList.remove('open'); overlay.classList.remove('show'); document.body.style.overflow = ''; }

  toggle.addEventListener('click', function(e){
    if (sidebar.classList.contains('open')) closeSidebar(); else openSidebar();
  });
  overlay.addEventListener('click', closeSidebar);
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') closeSidebar(); });
})();