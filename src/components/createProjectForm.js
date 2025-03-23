import LIBRARY from "../helpers/lib";
import PubSub, { events } from "../helpers/PubSub";

export default function createProjectForm() {
  const formCont = document.querySelector("#create-project-form");
  const toggleButton = document.querySelector("#create-project-button");
  const nameInput = document.querySelector("#project-name-input");
  const descInput = document.querySelector("#project-desc-input");
  const submitButton = document.querySelector("#project-submit-button");
  const closeButton = document.querySelector("#project-close-button");

  toggleButton.addEventListener("click", () => {
    formCont.classList.toggle("hidden");
  });

  submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const nameValue = nameInput.value;
    const descValue = descInput.value;
    if (!nameValue || !descValue) return;
    LIBRARY.createProject(nameValue, descValue);
    PubSub.publish(events.projectUpdate);
    nameInput.value = "";
    formCont.classList.add("hidden");
  });

  closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    formCont.classList.add("hidden");
  });
}
