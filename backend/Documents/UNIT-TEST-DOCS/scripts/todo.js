// Function to create the initial elements for the to-do list
function createTodoApp() {
    // Create input field for new tasks
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'taskInput';
    input.placeholder = 'Enter a new task';

    // Create add task button
    const addButton = document.createElement('button');
    addButton.innerText = 'Add Task';
    addButton.id = 'addTaskButton';

    // Create a list to hold the tasks
    const taskList = document.createElement('ul');
    taskList.id = 'taskList';

    // Append elements to the body
    document.body.appendChild(input);
    document.body.appendChild(addButton);
    document.body.appendChild(taskList);
}

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create a list item for the new task
    const listItem = document.createElement('li');

    // Create a span to hold the task text
    const taskSpan = document.createElement('span');
    taskSpan.innerText = taskText;
    taskSpan.className = 'task';

    // Create a button to mark the task as completed
    const completeButton = document.createElement('button');
    completeButton.innerText = 'Complete';
    completeButton.className = 'completeButton';

    // Create a button to remove the task
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'removeButton';

    // Append elements to the list item
    listItem.appendChild(taskSpan);
    listItem.appendChild(completeButton);
    listItem.appendChild(removeButton);

    // Append the list item to the task list
    const taskList = document.getElementById('taskList');
    taskList.appendChild(listItem);

    // Clear the input field
    taskInput.value = '';
}

// Function to handle task actions (complete and remove)
function handleTaskAction(event) {
    if (event.target.className === 'completeButton') {
        const taskSpan = event.target.parentNode.querySelector('.task');
        taskSpan.style.textDecoration = 'line-through';
    } else if (event.target.className === 'removeButton') {
        const listItem = event.target.parentNode;
        listItem.remove();
    }
}

// Function to add event listeners
function addEventListeners() {
    const addTaskButton = document.getElementById('addTaskButton');
    addTaskButton.addEventListener('click', addTask);

    const taskList = document.getElementById('taskList');
    taskList.addEventListener('click', handleTaskAction);
}

// Initialize the to-do app
function init() {
    createTodoApp();
    addEventListeners();
}

// Run the init function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
