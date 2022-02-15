const toDoList = async () => {
  const allTasks = await getToDoListItems();
  const listOfTasks = document.getElementById('task-list');
  listOfTasks.innerHTML = '';
  allTasks.map((task) => {
    const item = document.createElement('li');
    const icon = document.createElement('i');
    const checkbox = document.createElement('input');
    const description = document.createElement('div');

    checkbox.className = 'checkbox';
    checkbox.setAttribute('type', 'checkbox');
    if (task.done === true) { 
      checkbox.setAttribute('checked', true);
      description.style.textDecoration = 'line-through';
    };

    checkbox.addEventListener('change', (event) => updateTaskItem(task._id, event.target.checked));

    icon.className = 'fas fa-trash-alt';
    icon.addEventListener('click', () => deleteTaskFromList(task._id));

    description.innerHTML = `${task.description}`;
    description.setAttribute('id', task._id);
    const enableEditing = () => description.setAttribute('contenteditable', true); 
    description.onclick = enableEditing();
    description.addEventListener('blur', (event) => editTaskItem(event.target.textContent, event.target.id));
  
    item.appendChild(checkbox);
    item.appendChild(description);
    item.appendChild(icon);
    listOfTasks.appendChild(item);
  });
};

toDoList();

const userInput = document.getElementById('user-input');
const updateList =  () => {
  const value = userInput.value;
  postTask(value, toDoList);
};

const submitBtn = document.getElementById('submit-button');
submitBtn.addEventListener('click', updateList);

const deleteTaskFromList = (id) => deleteTask(id, toDoList);

const updateTaskItem = (id, done) => putDone(id, done, toDoList);

const editTaskItem = (value, id) => updateTask(value, id, toDoList);