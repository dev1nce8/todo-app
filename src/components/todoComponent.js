import checkIcon from "../asset/check-icon.svg";
import UI from "../class/UI";
import LIBRARY from "../helpers/lib";
import PubSub, { events } from "../helpers/PubSub";

export default function todoComponent(todo) {
  const container = UI.create("div", {
    className: "info-container",
  });
  const list = UI.create("li", {
    className: todo.priority,
  });
  const title = UI.create("p", {
    textContent: todo.title,
    className: "title",
  });
  const due = UI.create("p", {
    textContent: todo.due,
    className: "due",
  });

  const checkBox = UI.create("div", {
    className: "check-box",
  });

  const buttonCont = UI.create("div", {
    className: "button-container",
  });

  const deleteButton = UI.create("button", {
    className: "btn delete",
    innerText: "Delete",
  });

  const editButton = UI.create("button", {
    className: "btn edit",
    innerText: "Edit",
  });

  list.classList.remove("completed");
  if (todo.isCompleted) {
    checkBox.innerHTML = `
      <img src=${checkIcon} alt=""/>
    `;
    list.classList.add("completed");
  }

  // buttons functionalities
  deleteButton.addEventListener("click", () => {
    LIBRARY.deleteTodo(todo.id);
    PubSub.publish(events.todoUpdate);
  });

  buttonCont.append(editButton, deleteButton);
  container.append(title, due);
  list.append(checkBox, container, buttonCont);

  checkBox.addEventListener("click", () => {
    LIBRARY.toggleTodoComplete(todo.id);
    PubSub.publish(events.todoUpdate);
  });

  return list;
}
