// Get elements from the DOM
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTasks);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Create a new list item
    const li = document.createElement('li');

    // Add the task text
    li.textContent = taskText;

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks(); // Update localStorage after deleting a task
    });

    // Add an edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      editTask(li);
    });

    // Add a click event to mark the task as completed
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks(); // Update localStorage when a task is marked as completed
    });

    // Append the buttons to the list item
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Save tasks to localStorage
    saveTasks();

    // Clear the input field
    taskInput.value = '';
  } else {
    alert('Please enter a task!');
  }
}

// Function to edit a task
function editTask(taskItem) {
  const currentText = taskItem.textContent.replace('DeleteEdit', '').trim(); // Remove button text
  const newText = prompt('Edit your task:', currentText);

  if (newText !== null && newText.trim() !== '') {
    taskItem.textContent = newText.trim();

    // Re-add the buttons
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(taskItem);
      saveTasks(); // Update localStorage after deleting a task
    });

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      editTask(taskItem);
    });

    taskItem.appendChild(deleteBtn);
    taskItem.appendChild(editBtn);

    // Save tasks to localStorage
    saveTasks();
  }
}

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach((task) => {
    tasks.push({
      text: task.textContent.replace('DeleteEdit', '').trim(), // Remove the button text
      completed: task.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach((task) => {
    const li = document.createElement('li');

    // Add the task text
    li.textContent = task.text;

    // Add a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      taskList.removeChild(li);
      saveTasks(); // Update localStorage after deleting a task
    });

    // Add an edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', () => {
      editTask(li);
    });

    // Mark the task as completed if it was saved as completed
    if (task.completed) {
      li.classList.add('completed');
    }

    // Add a click event to mark the task as completed
    li.addEventListener('click', () => {
      li.classList.toggle('completed');
      saveTasks(); // Update localStorage when a task is marked as completed
    });

    // Append the buttons to the list item
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    // Append the list item to the task list
    taskList.appendChild(li);
  });
}

// Add event listener to the "Add Task" button
addTaskBtn.addEventListener('click', addTask);

// Allow pressing "Enter" to add a task
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});
