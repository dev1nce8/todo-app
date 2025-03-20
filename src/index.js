import "./css/vars.css";
import "./css/reset.css";
import "./css/header.css";
import "./css/main.css";
import Library from "./class/Library.js";
import projectList from "./components/projectList.js";
import todoList from "./components/todoList.js";
import createProjectForm from "./components/createProjectForm.js";
import createTodoForm from "./components/createTodoForm.js";

/// INIT
export const LIBRARY = new Library();
projectList();
todoList();
createProjectForm();
createTodoForm();
