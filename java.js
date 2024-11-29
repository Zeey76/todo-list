document.addEventListener("DOMContentLoaded", () => {
const taskInput = document.querySelector('input');
const addButton = document.querySelector('.add-task');
const taskBar = document.querySelector('.tasks-bar');
const taskList = document.querySelector('.task-list');

const allTasks = document.querySelector('.all-tasks');
const pendingTasks = document.querySelector('.pending-tasks');
const completedTasks = document.querySelector('.completed-tasks');
const clearTasks = document.querySelector('.clear-tasks');
const filterButtons = [allTasks, pendingTasks, completedTasks];

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let activeFilter = "all";

//add tasks
addButton.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({
            text: task,
            completed: false
        });
        taskInput.value = "";
        saveTasksToLocalStorage();
        renderTasks(activeFilter);
    }
});

//render tasks
function renderTasks(filter) {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        if (filter === 'pending' && task.completed === true) return; 
        if (filter === 'completed' && task.completed === false) return;
        
        const li = document.createElement("li");
        
        if (task.completed) {
            li.classList.add('completed');
        }
        li.setAttribute("data-index", index);

        const checkIcon = document.createElement("div");
        checkIcon.classList.add("check-icon");
        if (task.completed) {
        checkIcon.classList.add("ticked");
        }
        checkIcon.innerHTML = `<img src="./icons/icon-check.svg">`;
        checkIcon.onclick = () => toggleTask(index);
        const taskText = document.createElement("p");
        taskText.textContent = task.text;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("cross-icon");
        deleteButton.setAttribute("data-index", index);
        deleteButton.innerHTML = `<img src="./icons/icon-cross.svg">`;
        deleteButton.addEventListener("click", () => deleteTask(index));

        li.appendChild(checkIcon);
        li.appendChild(taskText);
        li.appendChild(deleteButton);
        li.querySelector("p").addEventListener("click", () => toggleTask(index));
        taskList.appendChild(li);
    });
    updateFilterButtons();
}

//delete task
window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasksToLocalStorage();
    renderTasks(activeFilter);
}

//toggle task
window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasksToLocalStorage();
    renderTasks(activeFilter);
}

//clear all tasks
clearTasks.addEventListener("click", () => {
    tasks = [];
    saveTasksToLocalStorage();
    renderTasks(activeFilter);
})

allTasks.addEventListener("click", () => {
    activeFilter = "all"
    renderTasks(activeFilter);
    updateFilterButtons();
});
pendingTasks.addEventListener("click", () => {
    activeFilter = "pending"
    renderTasks(activeFilter);
    updateFilterButtons();
});
completedTasks.addEventListener("click", () => {
    activeFilter = "completed"
    renderTasks(activeFilter);
    updateFilterButtons();
});

function updateFilterButtons() {
    allTasks.classList.remove("active");
    pendingTasks.classList.remove("active");
    completedTasks.classList.remove("active");

    if (activeFilter === "all") {
        allTasks.classList.add("active");
    } else if (activeFilter === "pending") {
        pendingTasks.classList.add("active");
    } else if (activeFilter === "completed") {
        completedTasks.classList.add("active");
    }
}

function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

renderTasks(activeFilter);
})

