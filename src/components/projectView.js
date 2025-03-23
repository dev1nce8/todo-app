import UI from "../class/UI";
import LIBRARY from "../helpers/lib";

export default function projectView() {
  const projectViewCont = document.querySelector("#project-view-cont");
  const title = document.querySelector("#project-view-name");
  const description = document.querySelector("#project-view-description");
  const projectList = document.querySelector("#project-view-todo-list");
  const backButton = document.querySelector("#project-view-back-button");

  const project = LIBRARY.getActiveProject();

  title.innerText = project.name;
  description.innerText = project.description;

  backButton.addEventListener("click", () => {
    projectViewCont.classList.add("hidden");
  });
}
