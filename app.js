document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const incompleteTaskList = document.getElementById('incomplete-task-list');
    const completedTaskList = document.getElementById('completed-task-list');

    taskForm.innerHTML = `
        <label for="title">Title:</label>
        <input type="text" id="title" required>
        <label for="description">Description:</label>
        <textarea id="description"></textarea>
        <label for="due-date">Due Date:</label>
        <input type="date" id="due-date">
        <button onclick="addTask()">Add Task</button>
    `;

    // Load dark mode preference from local storage
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(isDarkMode);
    document.getElementById('dark-mode-switch').innerHTML = isDarkMode ? 'Light Mode' : 'Dark Mode';

    // Load tasks from local storage
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    displayTasks(storedTasks);
});

function addTask() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const dueDateInput = document.getElementById('due-date');

    const title = titleInput.value;
    const description = descriptionInput.value;
    const dueDate = dueDateInput.value;

    if (title && dueDate) {
        const newTask = { title, description, dueDate, completed: false };
        const tasks = [...storedTasks, newTask];
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks(tasks);

        // Clear input fields
        titleInput.value = '';
        descriptionInput.value = '';
        dueDateInput.value = '';
    } else {
        alert('Please enter both title and due date.');
    }
}

function displayTasks(tasks) {
    const incompleteTaskList = document.getElementById('incomplete-task-list');
    const completedTaskList = document.getElementById('completed-task-list');

    incompleteTaskList.innerHTML = '';
    completedTaskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.className = `task ${task.completed ? 'completed' : ''}`;

        taskElement.innerHTML = `
            <h2>${task.title}</h2>
            <p>${task.description}</p>
            <p id="due-date">Due Date: ${task.dueDate}</p>
            <button onclick="toggleTaskStatus(${index})">${task.completed ? 'Mark Incomplete' : 'Mark Completed'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;

        task.completed ? completedTaskList.appendChild(taskElement) : incompleteTaskList.appendChild(taskElement);
    });
}

function toggleTaskStatus(index) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks[index].completed = !storedTasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    displayTasks(storedTasks);
}

function deleteTask(index) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
    displayTasks(storedTasks);
}

function toggleDarkMode() {
    const isDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
    setDarkMode(!isDarkMode);
}

function setDarkMode(isDarkMode) {
    const body = document.body;
    isDarkMode ? body.classList.add('dark-mode') : body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    document.getElementById('dark-mode-switch').innerHTML = isDarkMode ? 'Light Mode' : 'Dark Mode';
}
