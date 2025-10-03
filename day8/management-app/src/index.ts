interface User {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Guest" | "User";
}

class UserManager {
  private users: User[] = [];
  private nextId = 1;
  private editingId: number | null = null;

  private nameInput = document.querySelector("#name") as HTMLInputElement;
  private emailInput = document.querySelector("#email") as HTMLInputElement;
  private roleSelect = document.querySelector("#role") as HTMLSelectElement;
  private addBtn = document.querySelector("#add-user-btn") as HTMLButtonElement;
  private table = document.querySelector(".user-table") as HTMLTableElement;

  constructor() {
    this.addBtn.addEventListener("click", () => this.handleAddOrSave());
    this.render();
  }

  private handleAddOrSave(): void {
    const name = this.nameInput.value.trim();
    const email = this.emailInput.value.trim();
    const role = this.roleSelect.value as User["role"];

    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    if (this.editingId === null) {
      this.users.push({ id: this.nextId++, name, email, role });
    } else {
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

  private clearForm(): void {
    this.nameInput.value = "";
    this.emailInput.value = "";
    this.roleSelect.value = "Admin";
  }

  private startEdit(id: number): void {
    const u = this.users.find(x => x.id === id);
    if (!u) return;
    this.editingId = id;
    this.nameInput.value = u.name;
    this.emailInput.value = u.email;
    this.roleSelect.value = u.role;
    this.addBtn.textContent = "Save";
  }

  private deleteUser(id: number): void {
    this.users = this.users.filter(u => u.id !== id);
    if (this.editingId === id) {
      this.editingId = null;
      this.addBtn.textContent = "Add User";
      this.clearForm();
    }
    this.render();
  }

  private render(): void {
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
        const id = parseInt((e.target as HTMLElement).getAttribute("data-id")!);
        this.startEdit(id);
      });
    });

    this.table.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = parseInt((e.target as HTMLElement).getAttribute("data-id")!);
        this.deleteUser(id);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new UserManager();
});