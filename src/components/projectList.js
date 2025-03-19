import PubSub from "../helpers/PubSub";
import UI from "../class/UI";
import { LIBRARY } from "..";

export default function projectList() {
  const projectList = document.querySelector("#project-list");

  UI.render(projectList, renderProjects);

  PubSub.subscribe("project-update", () => {
    UI.render(projectList, renderProjects);
  });

  function renderProjects() {
    return LIBRARY.projects.map((proj) => {
      const list = UI.create("li", {
        dataset: {
          id: proj.id,
        },
        innerText: proj.name,
        className: `project ${proj.active ? "active" : ""}`,
      });

      list.addEventListener("click", () => {
        LIBRARY.setActiveProject(proj.id);
        PubSub.publish("project-update");
        PubSub.publish("todo-update");
      });
      return list;
    });
  }
}
