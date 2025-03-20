import LIBRARY from "../helpers/lib";
import PubSub, { events } from "../helpers/PubSub";
import UI from "../class/UI";

export default function projectList() {
  const projectList = document.querySelector("#project-list");

  UI.render(projectList, renderProjects);

  PubSub.subscribe(events.projectUpdate, () => {
    UI.render(projectList, renderProjects);
  });

  function renderProjects() {
    return LIBRARY.projects.map((proj) => {
      const list = UI.create("li", {
        dataset: {
          id: proj.id,
        },
        className: `project ${proj.active ? "active" : ""} ${proj.id === 0 ? "project-zero" : ""}`,
      });
      const name = UI.create("h2", {
        innerText: proj.name,
        className: "title",
      });

      list.append(name);

      list.addEventListener("click", () => {
        LIBRARY.setActiveProject(proj.id);
        PubSub.publish(events.projectUpdate);
      });
      return list;
    });
  }
}
