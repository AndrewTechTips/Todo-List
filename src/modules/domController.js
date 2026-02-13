import {format} from 'date-fns';
import todoManager from './todoManager';

//Helper function to empty a html element
function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

//Rendering the list
function renderProjects() {
    const projectsList = document.getElementById("projects-list");
    clearElement(projectsList);

    const projects = todoManager.getProjects();  //Pull the projects
    const currentProject = todoManager.getCurrentProject();

    projects.forEach(project => {
        const li = document.createElement("li");
        li.dataset.projectId = project.id;
        li.classList.add("project-item");

        if(currentProject && project.id === currentProject.id) {
            li.classList.add("active-project");
        }

        li.textContent = project.name;

        li.addEventListener("click", () => {
            todoManager.setCurrentProject(project.id);
            render();
        });

        projectsList.appendChild(li);
    });
}

//Render the tasks
function renderTodos() {
    const todosContainer = document.getElementById("todos-container");
    const projectTitle = document.getElementById("project-title");
    const taskCount = document.getElementById("task-count");

    clearElement(todosContainer);

    const currentProject = todoManager.getCurrentProject();

    if(!currentProject) return;

    projectTitle.textContent = currentProject.name;
    const todoCount = currentProject.todos.length;
    taskCount.textContent = `${todoCount} ${todoCount === 1 ? "task" : "tasks"} remaining`;

    //Message if there are no tasks remaining 

    if(taskCount === 0) {
        const emptyMsg = document.createElement("p");
        emptyMsg.textContent = "No tasks yet. Enjoy your day! ☀️";
        emptyMsg.style.opacity = "0.7";
        emptyMsg.style.textAlign = "center";
        emptyMsg.style.marginTop = "20px";
        todosContainer.appendChild(emptyMsg);
        return;
    }

    currentProject.todos.forEach(todo => {
        const todoCard = createTodoCard(todo);
        todosContainer.appendChild(todoCard);
    });
}

//Function to create a card
function createTodoCard(todo) {
    const card = document.createElement("div");
    card.classList.add("todo-card");

    card.classList.add(`priority-${todo.priority}`);

    //The left section checkbox and text
    const leftSection = document.createElement("div");
    leftSection.classList.add("todo-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.isComplete;
    checkbox.classList.add("todo-checkbox");

    checkbox.addEventListener("change", () => {
        todo.toggleComplete();
        renderTodos();
    });

    const infoDiv = document.createElement("div");
    infoDiv.classList.add("todo-info");

    const title = document.createElement("h3");
    title.textContent = todo.title;

    if(todo.isComplete) {
        title.classList.add.apply("completed-text")
    }

    const description = document.createElement("div");
    description.textContent = todo.description;

    infoDiv.appendChild(title);
    infoDiv.appendChild(description);

    leftSection.appendChild(checkbox);
    leftSection.appendChild(infoDiv);

    //The right section, date and buttons
    const rightSection = document.createElement("div");
    rightSection.classList.add("todo-date");
    
    const dateDisplay = document.createElement("span");
    dateDisplay.classList.add("todo-date");
    dateDisplay.textContent = format(new Date(todo.dueDate), "MMM do");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn-delete");

    //Delete a task

    deleteBtn.addEventListener("click", e => {
        e.stopPropagation();
        const currentProject = todoManager.getCurrentProject();
        currentProject.removeTodo(todo.id);
        render();
    });

    rightSection.appendChild(dateDisplay);
    rightSection.appendChild(deleteBtn);

    card.appendChild(leftSection);
    card.appendChild(rightSection);

    return card;
}

function render() {
    renderProjects();
    renderTodos();
}

export default render;
