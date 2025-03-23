import LIBRARY from "../helpers/lib";
import PubSub, { events } from "../helpers/PubSub";

export default function createTodoForm() {
  const formCont = document.querySelector("#create-todo-form");
  const titleInput = document.querySelector("#todo-title-input");
  const dueInput = document.querySelector("#todo-due-input");
  const prioInput = document.querySelector("#todo-prio-select");
  const submitBtn = document.querySelector("#todo-submit-button");

  const closeBtn = document.querySelector("#todo-close-button");
  const button = document.querySelector("#create-todo-button");
  button.addEventListener("click", () => {
    formCont.classList.toggle("hidden");
  });

  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const title = titleInput.value;
    const due = dueInput.value;
    const priority = prioInput.value;
    if (!title || !due) return;
    console.log("clicked");
    LIBRARY.createTodo({ title, due, priority });
    PubSub.publish(events.todoUpdate);
    formCont.classList.add("hidden");
    resetInputs();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    formCont.classList.add("hidden");
    resetInputs();
  });

  function resetInputs() {
    titleInput.value = "";
    dueInput.value = "";
    prioInput.value = "regular";
  }
}
