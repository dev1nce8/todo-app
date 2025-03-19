export default class UI {
  static create(type, attributes) {
    const element = document.createElement(type);
    Object.keys(attributes).forEach((key) => {
      if (typeof attributes[key] === "object") {
        Object.keys(attributes[key]).forEach((ik) => {
          element[key][ik] = attributes[key][ik];
        });
      } else {
        element[key] = attributes[key];
      }
    });
    return element;
  }

  static render(container, fn) {
    container.innerHTML = "";
    const item = fn();
    if (Array.isArray(item)) {
      item.forEach((i) => container.append(i));
    } else {
      container.append(items);
    }
  }
}
