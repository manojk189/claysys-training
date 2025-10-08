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
    // Redirect to admin dashboard automatically
    window.location.href = 'Admindashboard.html';
  });
}
