import LIBRARY from "../helpers/lib";
import PubSub, { events } from "../helpers/PubSub";

export default function createProjectForm() {
  const form = document.querySelector("#create-project-form");
  const toggleButton = document.querySelector("#create-project-button");
  const nameInput = document.querySelector("#project-name-input");
  const submitButton = document.querySelector("#project-submit-button");
  toggleButton.addEventListener("click", () => {
    form.classList.toggle("hidden");
  });

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const nameValue = nameInput.value;
    if (nameValue.length === 0) return;
    LIBRARY.createProject(nameValue);
    PubSub.publish(events.projectUpdate);
    nameInput.value = "";
    form.classList.add("hidden");
  });
}
