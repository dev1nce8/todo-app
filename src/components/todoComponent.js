import checkIcon from "../asset/check-icon.svg";
import UI from "../class/UI";

export default function todoComponent(todo) {
  const container = UI.create("div", {
    className: "info-container",
  });
  const list = UI.create("li", {
    dataset: {
      id: todo.id,
    },
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

  if (todo.isCompleted) {
    checkBox.innerHTML = `
      <img src=${checkIcon} alt=""/>
    `;
  }

  container.append(title, due);
  list.append(checkBox, container);

  return list;
}
