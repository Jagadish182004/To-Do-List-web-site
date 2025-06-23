const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

function renderTasks() {
  taskList.innerHTML = '';
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'completed' : '';
    li.onclick = () => toggleComplete(index);
    li.ondblclick = () => deleteTask(index);
    taskList.appendChild(li);
  });
}

function addTask() {
  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  if (input.value.trim() !== '') {
    tasks.push({ text: input.value.trim(), completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    input.value = '';
    renderTasks();
  }
}

function toggleComplete(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

addBtn.onclick = addTask;
window.onload = renderTasks;