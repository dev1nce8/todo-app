import LS from "../helpers/LS.js";
import PubSub from "../helpers/PubSub.js";
import Project from "./Project.js";
import Todo from "./Todo.js";

const appName = "todo-app";

export default class Library {
  #items;
  #activeProject = 0;
  constructor() {
    if (!this.#getStorage()) {
      LS.setItem(appName, {
        projects: [{ name: "All", id: 0, todos: [] }],
        todos: [],
      });
    }
    this.#items = this.#getStorage(); //return {projects, todos}
    this.#activeProject = null;
  }

  get projects() {
    return this.#items.projects;
  }

  get todos() {
    return this.#items.todos;
  }

  createProject(name) {
    this.#updateStorage((items) => {
      items.projects.push(new Project(name));
    });
  }

  createTodo({ title, description, priority, due }) {
    this.#updateStorage((items) => {
      const newTodo = new Todo({
        title,
        description,
        priority,
        due,
      });

      items.projects = items.projects.map((proj) => {
        if (proj.active) {
          proj.todos.push(newTodo.id);
          if (proj.id !== 0) {
            items.projects[0].push(newTodo.id);
          }
          newTodo.project = proj.id;
          items.todos.push(newTodo);
        }
        return proj;
      });
    });
  }

  getActiveProjectTodo() {
    let todos = [];
    this.#updateStorage((items) => {
      for (let i = 0; i < items.projects.length; i++) {
        const proj = items.projects[i];
        if (proj.active) {
          todos = items.todos.filter((todo) => {
            return todo.project === proj.id || proj.id === 0;
          });
        }
      }
    });
    return todos;
  }

  setActiveProject(id) {
    this.#updateStorage((items) => {
      items.projects = items.projects.map((proj) => {
        // activate the project and deactivate all others
        if (proj.id === id) proj.active = true;
        else proj.active = false;

        return proj;
      });
    });
  }

  #updateStorage(fn) {
    this.#items = this.#getStorage();
    fn(this.#items);
    LS.setItem(appName, this.#items);
  }

  #getStorage() {
    return LS.getItem(appName);
  }
}
