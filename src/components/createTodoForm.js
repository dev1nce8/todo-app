import { LIBRARY } from "..";
import UI from "../class/UI";
import PubSub, { events } from "../helpers/PubSub";

export default function createTodoForm() {
  const form = document.querySelector("#create-todo-form");
  const titleInput = document.querySelector("#todo-title-input");
  const descInput = document.querySelector("#todo-desc-input");
  const dueInput = document.querySelector("#todo-due-input");
  const prioInput = document.querySelector("#todo-prio-select");
  const submitBtn = document.querySelector("#todo-submit-button");
  const button = document.querySelector("#create-todo-btn");
  button.addEventListener("click", () => {
    form.classList.toggle("hidden");
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const description = descInput.value;
    const due = dueInput.value;
    const priority = prioInput.value;
    if (!title || !due) return;
    LIBRARY.createTodo({ title, description, due, priority });
    PubSub.publish(events.todoUpdate);
    form.classList.add("hidden");
    resetInputs();
  });

  function resetInputs() {
    titleInput.value = "";
    descInput.value = "";
    dueInput.value = "";
    prioInput.value = "regular";
  }
}
