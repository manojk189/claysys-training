const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add Task
function addTask(taskText) {
    if (taskText.trim() === "") return;

    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span class="task-text">${taskText}</span>
        <button class="delete-btn">Delete</button>
      `;
    taskList.appendChild(li);
    taskInput.value = "";
}

// Delete Task
function deleteTask(target) {
    const li = target.closest("li");
    if (li) taskList.removeChild(li);
}

// Toggle Completion
function toggleComplete(target) {
    const li = target.closest("li");
    li.classList.toggle("completed");
}

// Event Delegation
taskList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
        deleteTask(e.target);
    } else if (e.target.classList.contains("checkbox")) {
        toggleComplete(e.target);
    } else if (e.target.classList.contains("task-text")) {
        toggleComplete(e.target);
    }
});

// Add Task Button Click
addTaskBtn.addEventListener("click", () => {
    addTask(taskInput.value);
});

// Enter Key Adds Task
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask(taskInput.value);
    }
});