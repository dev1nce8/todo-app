import LS from "../helpers/LS.js";
import PubSub from "../helpers/PubSub.js";
import Project from "./Project.js";
import Todo from "./Todo.js";

const appName = "todo-app";

export default class Library {
  #items;
  constructor() {
    if (!this.#getStorage()) {
      LS.setItem(appName, {
        projects: [{ name: "All", id: 0, todos: [], active: true }],
        todos: [],
      });
    }
    this.#items = this.#getStorage(); //return {projects, todos}
  }

  get projects() {
    return this.#items.projects;
  }

  get todos() {
    return this.#items.todos;
  }

  createProject(name, descrption) {
    this.#updateStorage((items) => {
      items.projects.push(new Project(name, descrption));
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
            items.projects[0].todos.push(newTodo.id);
          }
          newTodo.project = proj.id;
          items.todos.push(newTodo);
        }
        return proj;
      });
    });
  }

  getActiveProject() {
    let project = null;
    this.#updateStorage((items) => {
      const { projects } = items;
      projects.some((proj) => {
        if (proj.active) {
          project = proj;
          return;
        }
      });
    });
    return project;
  }

  getActiveProjectTodo() {
    let todosResult = [];
    this.#updateStorage((items) => {
      const { todos } = items;
      const activeProjectId = this.getActiveProject().id;
      todosResult = todos.filter((todo) => {
        // returns todos of the active project or returns all if the active project's id is 0 (the default project)
        return todo.project === activeProjectId || activeProjectId === 0;
      });
    });
    return todosResult;
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
