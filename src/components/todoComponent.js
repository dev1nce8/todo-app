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

  const projectNameCont = UI.create("div", {
    className: "project-container",
  });

  const buttonCont = UI.create("div", {
    className: "button-container",
  });

  const deleteButton = UI.create("button", {
    className: "btn delete",
    innerText: "Delete",
  });

  list.classList.remove("completed");
  if (todo.isCompleted) {
    checkBox.innerHTML = `
      <img src=${checkIcon} alt=""/>
    `;
    list.classList.add("completed");
  }

  if (LIBRARY.getActiveProject().id === 0) {
    const projectName = UI.create("p", {
      innerText: LIBRARY.getProjectName(todo.project),
      className: "project-name",
    });
    projectNameCont.append(projectName);
  }
  // buttons functionalities
  deleteButton.addEventListener("click", () => {
    LIBRARY.deleteTodo(todo.id);
    PubSub.publish(events.todoUpdate);
  });

  buttonCont.append(deleteButton);
  container.append(title, due);
  list.append(checkBox, container, projectNameCont, buttonCont);

  checkBox.addEventListener("click", () => {
    LIBRARY.toggleTodoComplete(todo.id);
    PubSub.publish(events.todoUpdate);
  });

  return list;
}
