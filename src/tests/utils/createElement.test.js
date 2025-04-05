/**
 * @jest-environment jsdom
 */
import createComponent from "../../utils/createComponent.js";

describe("Create Component", () => {
  it("returns el (element) and render (function)", () => {
    const [el, render] = createComponent("div", () => {});
    expect(el).toBeInstanceOf(HTMLElement);
    expect(render).toBeInstanceOf(Function);
  });

  it("attach attributes", () => {
    const attributes = {
      className: "div",
      id: "my-div",
    };
    const [el] = createComponent("div", ({ attr }) => {
      attr(attributes);
    });
    for (const key in attributes) {
      expect(el).toHaveProperty(key, attributes[key]);
    }
  });

  it("append children", () => {
    const children = [
      document.createElement("div"),
      document.createElement("div"),
    ];
    const [el] = createComponent("div", () => {
      return children;
    });
    expect(el.children.length).toBe(2);
  });

  it("append string and numbers instead if children are not an HTMLelement", () => {
    const children = ["Hello", 1];
    const [el] = createComponent("div", () => {
      return children;
    });
    expect(el.innerText).toBe("Hello1");
  });
});
