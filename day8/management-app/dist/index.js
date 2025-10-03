"use strict";
class UserManager {
    constructor() {
        this.users = [];
        this.nextId = 1;
        this.editingId = null;
        this.nameInput = document.querySelector("#name");
        this.emailInput = document.querySelector("#email");
        this.roleSelect = document.querySelector("#role");
        this.addBtn = document.querySelector("#add-user-btn");
        this.table = document.querySelector(".user-table");
        this.addBtn.addEventListener("click", () => this.handleAddOrSave());
        this.render();
    }
    handleAddOrSave() {
        const name = this.nameInput.value.trim();
        const email = this.emailInput.value.trim();
        const role = this.roleSelect.value;
        if (!name || !email) {
            alert("Please fill all fields");
            return;
        }
        if (this.editingId === null) {
            this.users.push({ id: this.nextId++, name, email, role });
        }
        else {
            const u = this.users.find(x => x.id === this.editingId);
            if (u) {
                u.name = name;
                u.email = email;
                u.role = role;
            }
            this.editingId = null;
            this.addBtn.textContent = "Add User";
        }
        this.clearForm();
        this.render();
    }
    clearForm() {
        this.nameInput.value = "";
        this.emailInput.value = "";
        this.roleSelect.value = "Admin";
    }
    startEdit(id) {
        const u = this.users.find(x => x.id === id);
        if (!u)
            return;
        this.editingId = id;
        this.nameInput.value = u.name;
        this.emailInput.value = u.email;
        this.roleSelect.value = u.role;
        this.addBtn.textContent = "Save";
    }
    deleteUser(id) {
        this.users = this.users.filter(u => u.id !== id);
        if (this.editingId === id) {
            this.editingId = null;
            this.addBtn.textContent = "Add User";
            this.clearForm();
        }
        this.render();
    }
    render() {
        this.table.innerHTML = ``;
        this.users.forEach(u => {
            const row = document.createElement("tr");
            row.innerHTML = `
        <td>${u.id}</td>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
          <button class="edit-btn" data-id="${u.id}">Edit</button>
          <button class="delete-btn" data-id="${u.id}">Delete</button>
        </td>
      `;
            this.table.appendChild(row);
        });
        this.table.querySelectorAll(".edit-btn").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = parseInt(e.target.getAttribute("data-id"));
                this.startEdit(id);
            });
        });
        this.table.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", e => {
                const id = parseInt(e.target.getAttribute("data-id"));
                this.deleteUser(id);
            });
        });
    }
}
document.addEventListener("DOMContentLoaded", () => {
    new UserManager();
});
//# sourceMappingURL=index.js.map