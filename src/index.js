import "./css/vars.css";
import "./css/reset.css";
import "./css/header.css";
import "./css/main.css";

import Library from "./class/Library.js";
import UI from "./class/UI.js";
import projectList from "./components/projectList.js";
import todoList from "./components/todoList.js";
import PubSub from "./helpers/PubSub.js";

/// INIT
export const LIBRARY = new Library();
projectList();
todoList();

const button = document.querySelector("#create-project-btn");
button.addEventListener("click", () => {
  LIBRARY.createProject("test");
  PubSub.publish("project-update");
});

const todoBtn = document.querySelector("#create-todo-btn");
todoBtn.addEventListener("click", () => {
  LIBRARY.createTodo({ title: "test-todo" });
  PubSub.publish("todo-update");
});
