import LS from "../helpers/LS.js";
import Project from "./Project.js";
import Todo from "./Todo.js";

const appName = "todo-app";

export default class Library {
  #items;
  #activeProject;
  constructor() {
    if (!this.#getStorage()) {
      LS.setItem(appName, { projects: [], todos: [] });
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
          newTodo.project = proj.id;
          items.todos.push(newTodo);
        }
        return proj;
      });
    });
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
