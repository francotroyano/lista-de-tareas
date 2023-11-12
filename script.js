document.addEventListener('DOMContentLoaded', function() {
  loadTasks();
});

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach(function(task) {
    addTaskToList(task);
  });
}

function addTaskToList(task) {
  let taskList = document.getElementById('taskList');
  let li = document.createElement('li');
  li.innerHTML = `
    <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
    <button onclick="toggleTask(${task.id})">${task.completed ? 'Desmarcar' : 'Marcar'}</button>
    <button onclick="deleteTask(${task.id})">Eliminar</button>
  `;
  taskList.appendChild(li);
}

function addTask() {
  let taskInput = document.getElementById('taskInput');
  let taskText = taskInput.value.trim();

  if (taskText !== '') {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    let newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    };

    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    addTaskToList(newTask);
    taskInput.value = '';
  }
}

function toggleTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
  }
}

function deleteTask(taskId) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let updatedTasks = tasks.filter(task => task.id !== taskId);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  loadTasks();
}

function filterTasks() {
  let filterOption = document.getElementById('taskFilter').value;
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let filteredTasks = [];

  if (filterOption === 'active') {
    filteredTasks = tasks.filter(task => !task.completed);
  } else if (filterOption === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else {
    filteredTasks = tasks;
  }

  let taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  filteredTasks.forEach(function(task) {
    addTaskToList(task);
  });
}

// ... (resto del código)

// Agrega el siguiente bloque de código al final de script.js

document.getElementById('taskInput').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});
