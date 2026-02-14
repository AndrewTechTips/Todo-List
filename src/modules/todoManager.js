import Project from "./Project.js";
import Todo from "./Todo.js";

//We re keeping projects list private, and it cannot be accessed from outside
let projects = [];
let currentProjectId = null;

//Initializing the default project 
function initialize() {
    const defaultProject = new Project("Inbox");
    projects.push(defaultProject);
    currentProjectId = defaultProject.id;

    const demoTodo = new Todo("Check engine oil", "Inspect and refill if needed", "2026-02-18", "high");
    defaultProject.addTodo(demoTodo);
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
}

function createProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
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
        return newTodo;
    }
}

//Now we re exporting just the necessary functions, and we keep the  others private

export default {
    initialize,
    getProjects,
    getCurrentProject,
    setCurrentProject,
    createProject,
    deleteProject,
    addTodoToCurrentProject
};

