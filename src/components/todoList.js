import LIBRARY from "../helpers/lib";
import UI from "../class/UI";
import PubSub, { events } from "../helpers/PubSub";
import todoComponent from "./todoComponent";

export default function todoList() {
  const todoList = document.querySelector("#project-view-todo-list");
  renderTodo(); // intially renders todo on first visit

  PubSub.subscribe(events.todoUpdate, renderTodo);

  function renderTodo() {
    UI.render(todoList, () => {
      return LIBRARY.getActiveProjectTodo().map((t) => {
        return todoComponent(t);
      });
    });
  }
}
