import createComponent from "./utils/createComponent";
const root = document.querySelector("#root");

let counter = 0;
const [h1, renderH1] = createComponent("h1", () => {
  return [counter];
});

const [button] = createComponent("button", ({ attr }) => {
  attr({
    onclick: () => {
      counter++;
      renderH1();
    },
  });
  return ["+1"];
});

root.append(h1, button);
