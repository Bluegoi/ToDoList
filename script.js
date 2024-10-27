document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const timeInput = document.getElementById('timeInput');
    const dateInput = document.getElementById('dateInput');
    const categorySelect = document.getElementById('categorySelect');

    if (taskInput.value.trim() === '' || categorySelect.value === '') {
        alert('Digite uma tarefa e selecione uma categoria!');
        return;
    }

    const task = {
        text: taskInput.value.trim(),
        time: timeInput.value.trim(),
        date: dateInput.value,
        category: categorySelect.value,
        completed: false
    };

    const tasks = getTasks();
    tasks.push(task);
    saveTasks(tasks);

    taskInput.value = '';
    timeInput.value = '';
    dateInput.value = '';
    categorySelect.value = '';
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = getTasks();
    const categories = Array.from(new Set(tasks.map(task => task.category)));

    categories.forEach(category => {
        // Adiciona cabeçalho de categoria
        const header = document.createElement('li');
        header.classList.add('category-header');
        header.textContent = category;
        taskList.appendChild(header);

        // Filtra tarefas por categoria
        const tasksInCategory = tasks.filter(task => task.category === category);

        tasksInCategory.forEach((task, index) => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            li.innerHTML = `
                <span>${task.text} - ${task.date} ${task.time}</span>
                <button onclick="deleteTask(${index})">Excluir</button>
            `;

            li.classList.toggle('completed', task.completed); // Mantém a classe 'completed' se a tarefa estiver concluída

            taskList.appendChild(li);
        });
    });
}

function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    renderTasks();
}

function getTasks() {
    const tasksString = localStorage.getItem('tasks');
    return tasksString ? JSON.parse(tasksString) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    renderTasks();
}
