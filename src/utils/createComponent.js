export default function createComponent(type, fn) {
  const el = document.createElement(type);

  function render() {
    el.innerHTML = "";
    const children = fn({ attr: attr(el) });
    if (children) {
      children.forEach((child) => {
        if (typeof child === "string" || typeof child === "number") {
          if (!el.innerText) el.innerText = ""; // prevent appending undefined
          el.innerText += child;
        } else {
          el.appendChild(child);
        }
      });
    }
  }

  render();

  return [el, render];
}

function attr(el) {
  return (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        for (const k in obj[key]) {
          el[key][k] = obj[key][k];
        }
      } else {
        el[key] = obj[key];
      }
    }
  };
}
