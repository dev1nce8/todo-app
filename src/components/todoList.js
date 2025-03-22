import LIBRARY from "../helpers/lib";
import UI from "../class/UI";
import PubSub, { events } from "../helpers/PubSub";

export default function todoList() {
  const todoList = document.querySelector("#project-view-todo-list");
  renderTodo(); // intially renders todo on first visit

  PubSub.subscribe(events.todoUpdate, renderTodo);

  function renderTodo() {
    UI.render(todoList, () => {
      return LIBRARY.getActiveProjectTodo().map((t) => {
        const list = UI.create("li", {
          dataset: {
            id: t.id,
          },
          className: t.priority,
        });
        const title = UI.create("p", {
          textContent: t.title,
          className: "title",
        });
        const due = UI.create("p", {
          textContent: t.due,
          className: "due",
        });
        list.append(title, due);
        return list;
      });
    });
  }
}
