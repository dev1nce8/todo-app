import LIBRARY from "../helpers/lib";
import PubSub, { events } from "../helpers/PubSub";
import UI from "../class/UI";
import projectView from "./projectView";

export default function projectList() {
  const projectListCont = document.querySelector("#project-list");
  const projectViewCont = document.querySelector("#project-view-cont");

  UI.render(projectListCont, renderProjects);

  PubSub.subscribe(events.projectUpdate, () => {
    UI.render(projectListCont, renderProjects);
  });

  function renderProjects() {
    return LIBRARY.projects.map((proj) => {
      const list = UI.create("li", {
        dataset: {
          id: proj.id,
        },
        className: `project ${proj.id === 0 ? "project-zero" : ""}`,
        style: {
          backgroundColor: proj.color,
        },
      });
      const name = UI.create("h2", {
        innerText: proj.name,
        className: "title",
      });

      list.append(name);

      list.addEventListener("click", () => {
        LIBRARY.setActiveProject(proj.id);
        PubSub.publish(events.todoUpdate);
        projectView(proj.id);
        projectViewCont.classList.remove("hidden");
      });

      return list;
    });
  }
}
