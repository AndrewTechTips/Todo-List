<div align="center">
  <h1>✅ Glassmorphic Todo List</h1>
  
  <p>
    A sleek, <strong>minimalist task management app</strong> wrapped in a dark glassmorphism aesthetic. 
    Built to demonstrate <strong>Webpack Module Bundling</strong>, <strong>Local Storage Persistence</strong>, 
    and <strong>OOP principles in JavaScript</strong>.
  </p>
  <p>
    <img src="https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=black" alt="Webpack" />
    <img src="https://img.shields.io/badge/JavaScript-ES6_Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
    <img src="https://img.shields.io/badge/date--fns-770C56?style=for-the-badge&logo=npm&logoColor=white" alt="date-fns" />
    <img src="https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  </p>
  <h3>
    <a href="https://andrewtechtips.github.io/Todo-List/">📝 VIEW LIVE DEMO</a>
  </h3>
</div>

<br />

---

## ✨ Features

* **🔮 Glassmorphism Design:** Frosted glass UI with `backdrop-filter: blur()` for depth and modern aesthetics.
* **📂 Project Organization:** Create multiple projects to categorize your tasks (Work, Gym, Personal, etc.).
* **⚡ Priority Levels:** Assign Low, Medium, or High priority with color-coded borders.
* **💾 Persistent Storage:** All tasks and projects saved to `localStorage` - never lose your data.
* **📅 Date Formatting:** Human-readable dates powered by `date-fns` library.
* **🎯 Clean UX:** Minimal interface with floating action button and modal dialogs.

---

## 🧩 Architecture

This project uses **Object-Oriented Programming** with ES6 classes and a modular structure managed by Webpack.

### Class Structure

**Project Class** - Manages collections of todos
```javascript
class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
        this.id = Date.now().toString();
    }
    
    addTodo(todo) { /* ... */ }
    removeTodo(todoId) { /* ... */ }
}
```

**Todo Class** - Individual task with completion tracking
```javascript
class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.isComplete = false;
        // ...
    }
    
    toggleComplete() { /* ... */ }
}
```

### Module Pattern

**todoManager.js** - Singleton pattern for state management
```javascript
let projects = [];
let currentProjectId = null;

function save() {
    localStorage.setItem("myProjects", JSON.stringify(projects));
}

export default {
    initialize,
    getProjects,
    createProject,
    addTodoToCurrentProject
    // ...
};
```

**domController.js** - Handles all UI rendering with `date-fns` formatting
```javascript
import { format } from 'date-fns';

function renderTodos() {
    const currentProject = todoManager.getCurrentProject();
    currentProject.todos.forEach(todo => {
        const dateDisplay = format(new Date(todo.dueDate), "MMM do");
        // ...
    });
}
```

---

## 🛠️ Technologies Used

* **[Webpack 5](https://webpack.js.org/)** - Module bundler with dev server and HMR
* **[date-fns](https://date-fns.org/)** - Modern date utility library
* **[Poppins Font](https://fonts.google.com/specimen/Poppins)** - Clean, contemporary typography
* **localStorage API** - Client-side data persistence
* **CSS Custom Properties** - Dynamic theming with CSS variables

---

## 🚀 Getting Started

### Prerequisites
Node.js (v14+) and npm

### Quick Start

```bash
# Clone the repository
git clone https://github.com/AndrewTechTips/Todo-List.git
cd Todo-List

# Install dependencies
npm install

# Start development server (opens at localhost:8080)
npm start

# Build for production
npm run build
```

---

## 📦 Project Structure

```
src/
├── index.js              # Entry point & event listeners
├── style.css             # Glassmorphism styling
├── template.html         # HTML structure with dialogs
└── modules/
    ├── Project.js        # Project class
    ├── Todo.js           # Todo class
    ├── todoManager.js    # State management singleton
    └── domController.js  # UI rendering logic
```

---

## 📬 Contact

If you want to contact me, you can reach me at:

* **LinkedIn:** [linkedin.com/in/andrei-condrea-b32148346](https://www.linkedin.com/in/andrei-condrea-b32148346)
* **Email:** condrea.andrey777@gmail.com

<p align="center">
    <i>"Stay organized. Stay focused. Stay productive." ✨📋</i>
</p>