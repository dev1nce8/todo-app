import { LIBRARY } from "..";
import UI from "../class/UI";
import PubSub from "../helpers/PubSub";

export default function todoList() {
  const todoList = document.querySelector("#todo-list");
  renderTodo(); // intially renders todo on first visit

  PubSub.subscribe("todo-update", renderTodo);
  function renderTodo() {
    UI.render(todoList, () => {
      return LIBRARY.getActiveProjectTodo().map((t) => {
        const list = UI.create("li", {
          dataset: {
            id: t.id,
          },
        });
        const title = UI.create("p", {
          textContent: t.title,
        });
        list.append(title);
        return list;
      });
    });
  }
}
