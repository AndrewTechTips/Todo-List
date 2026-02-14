import './style.css';

import todoManager from './modules/todoManager';
import render from './modules/domController';

//Pulling the elements:

//Main buttons
const addProjectBtn = document.getElementById("add-project-btn");
const addTaskBtn = document.getElementById("add-task-btn");

//Dialogs
const dialogProject = document.getElementById("dialog-project");
const dialogTodo = document.getElementById("dialog-todo");

//Close buttons for dialogs
const closeProjectBtn = document.getElementById("close-project-modal");
const closeTodoBtn = document.getElementById("close-todo-modal");

//Forms
const projectForm = document.querySelector("#dialog-project form");
const todoForm = document.querySelector("#dialog-todo form");

todoManager.initialize();
render();

//Event listeners
addProjectBtn.addEventListener("click", () => dialogProject.showModal());

addTaskBtn.addEventListener("click", () => {
    document.getElementById("todo-date").valueAsDate = new Date();
    dialogTodo.showModal();
});

closeProjectBtn.addEventListener("click", () => dialogProject.close());

closeTodoBtn.addEventListener("click", () => dialogTodo.close());

//Form new project - logic
projectForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const projectNameInput = document.getElementById("project-name");
    const projectName = projectNameInput.value;

    if(projectName) {
        const newProject = todoManager.createProject(projectName);
        todoManager.setCurrentProject(newProject.id);

        render();

        projectForm.reset();
        dialogProject.close();
    }
});

//Form new task - logic
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("todo-title").value;
    const desc = document.getElementById("todo-desc").value;
    const date = document.getElementById("todo-date").value;
    const priority = document.getElementById("todo-priority").value;

    if(title && date) {
        todoManager.addTodoToCurrentProject(title, desc, date, priority);
        render();

        todoForm.reset();
        dialogTodo.close();
    }
});





