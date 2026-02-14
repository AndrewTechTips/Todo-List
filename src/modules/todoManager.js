import Project from "./Project.js";
import Todo from "./Todo.js";

//We re keeping projects list private, and it cannot be accessed from outside
let projects = [];
let currentProjectId = null;

//Functions save and load for local storage
function save() {
    localStorage.setItem("myProjects", JSON.stringify(projects));
    localStorage.setItem("currentProjectId", currentProjectId);
}

function load() {
    const projectsData = localStorage.getItem("myProjects");
    const activeIdData = localStorage.getItem("currentProjectId");

    if(projectsData) {

        const rawProjects = JSON.parse(projectsData);

        projects = rawProjects.map(projData => {
            const project = new Project(projData.name);
            project.id = projData.id;

            project.todos = projData.todos.map(todoData => {
                const todo = new Todo(todoData.title, todoData.description, todoData.dueDate, todoData.priority);
                todo.id = todoData.id;
                todo.isComplete = todoData.isComplete;
                return todo;
            });
            return project;
        });
    }

    if (activeIdData) {
        currentProjectId = activeIdData;
    }

}

//Initializing the default project 
function initialize() {
    load();

    if(projects.length === 0) {
        const defaultProject = new Project("Inbox");
        projects.push(defaultProject);
        currentProjectId = defaultProject.id;

        const demoTodo = new Todo("Check engine oil", "Inspect and refill if needed", "2026-02-18", "high");
        defaultProject.addTodo(demoTodo);

        save();
    } else {
        if(!projects.find(p => p.id === currentProjectId)) {
            currentProjectId = projects[0].id;
        }
    }
}

//Return projects list via getter 
function getProjects() {
    return projects;
}

function getCurrentProject() {
    return projects.find(p => p.id === currentProjectId);
}

//Here we set the current project only via setter
function setCurrentProject(projectId) {
    currentProjectId = projectId;
    save();
}

function createProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
    save();
    return newProject;
}

function deleteProject(projectId) {
    projects = projects.filter(p => p.id !== projectId);
}

function addTodoToCurrentProject(title, description, dueDate, priority) {
    const project = getCurrentProject();

    if(project) {
        const newTodo = new Todo(title, description, dueDate, priority);
        project.addTodo(newTodo);
        save();
        return newTodo;
    }
}

//Helper function for saving the data in localStorage in domController
function saveData() {
    save();
}

//Now we re exporting just the necessary functions, and we keep the  others private

export default {
    initialize,
    getProjects,
    getCurrentProject,
    setCurrentProject,
    createProject,
    deleteProject,
    addTodoToCurrentProject,
    saveDatas
};

