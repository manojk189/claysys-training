// ====== STORAGE ======
let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// ====== REGISTRATION ======
if (document.getElementById("registration-form")) {
  document.getElementById("registration-form").addEventListener("submit", e => {
    e.preventDefault();
    const user = {
      name: document.getElementById("reg-name").value,
      email: document.getElementById("reg-email").value,
      phone: document.getElementById("reg-phone").value,
      password: document.getElementById("reg-password").value
    };
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  });
}

// ====== LOGIN ======
if (document.getElementById("login-form")) {
  document.getElementById("login-form").addEventListener("submit", e => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Login successful!");
      window.location.href = "profile.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// ====== PROFILE ======
if (document.getElementById("profile-form")) {
  if (currentUser) {
    document.getElementById("profile-name").value = currentUser.name;
    document.getElementById("profile-email").value = currentUser.email;
    document.getElementById("profile-phone").value = currentUser.phone;
    document.getElementById("profile-password").value = currentUser.password;
  } else {
    window.location.href = "login.html";
  }

  document.getElementById("profile-form").addEventListener("submit", e => {
    e.preventDefault();
    currentUser.name = document.getElementById("profile-name").value;
    currentUser.phone = document.getElementById("profile-phone").value;
    currentUser.password = document.getElementById("profile-password").value;
    users = users.map(u => u.email === currentUser.email ? currentUser : u);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    alert("Profile updated!");
  });
}

// ====== BOOKING ======
if (document.getElementById("booking-form")) {
  if (!currentUser) window.location.href = "login.html";

  document.getElementById("booking-form").addEventListener("submit", e => {
    e.preventDefault();
    const booking = {
      user: currentUser.email,
      service: document.getElementById("service").value,
      provider: document.getElementById("provider").value,
      date: document.getElementById("date").value,
      time: document.getElementById("time").value,
      status: "Upcoming"
    };
    appointments.push(booking);
    localStorage.setItem("appointments", JSON.stringify(appointments));
    document.getElementById("booking-confirmation").innerHTML = `
      <h3>Booking Confirmed!</h3>
      <p>Service: ${booking.service}</p>
      <p>Provider: ${booking.provider}</p>
      <p>Date: ${booking.date}</p>
      <p>Time: ${booking.time}</p>
    `;
    e.target.reset();
  });
}

// ====== MANAGEMENT ======
if (document.getElementById("upcoming-appointments")) {
  if (!currentUser) window.location.href = "login.html";

  const upcomingDiv = document.getElementById("upcoming-appointments");
  const historyDiv = document.getElementById("appointment-history");

  function loadAppointments() {
    upcomingDiv.innerHTML = "";
    historyDiv.innerHTML = "";
    const userAppointments = appointments.filter(a => a.user === currentUser.email);
    userAppointments.forEach((appt, index) => {
      const card = document.createElement("div");
      card.className = "appointment-card";
      card.innerHTML = `
        <p><b>Service:</b> ${appt.service}</p>
        <p><b>Provider:</b> ${appt.provider}</p>
        <p><b>Date:</b> ${appt.date}</p>
        <p><b>Time:</b> ${appt.time}</p>
        <p><b>Status:</b> ${appt.status}</p>
      `;
      if (appt.status === "Upcoming") {
        const actions = document.createElement("div");
        actions.className = "actions";
        actions.innerHTML = `
          <button onclick="reschedule(${index})">Reschedule</button>
          <button onclick="cancelAppt(${index})">Cancel</button>
        `;
        card.appendChild(actions);
        upcomingDiv.appendChild(card);
      } else {
        historyDiv.appendChild(card);
      }
    });
}

  loadAppointments();

  window.reschedule = function (index) {
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newTime = prompt("Enter new time (HH:MM):");
    if (newDate && newTime) {
      appointments[index].date = newDate;
      appointments[index].time = newTime;
      localStorage.setItem("appointments", JSON.stringify(appointments));
      alert("Appointment rescheduled!");
      loadAppointments();
    }
  };

  window.cancelAppt = function (index) {
    appointments[index].status = "Cancelled";
    localStorage.setItem("appointments", JSON.stringify(appointments));
    alert("Appointment cancelled!");
    loadAppointments();
  };


  // Forgot Password
  if (document.getElementById("forgot-password")) {
    document.getElementById("forgot-password").addEventListener("click", e => {
      e.preventDefault();
      const email = prompt("Enter your registered email:");
      if (!email) return;

      const user = users.find(u => u.email === email);
      if (user) {
        const newPassword = prompt("Enter your new password:");
        if (newPassword) {
          user.password = newPassword;
          users = users.map(u => u.email === email ? user : u);
          localStorage.setItem("users", JSON.stringify(users));
          alert("Password updated successfully! Please log in again.");
        }
      } else {
        alert("No account found with that email.");
      }
    });
  }

}