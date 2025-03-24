export default class Project {
  constructor(name, description, color) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.description = description;
    this.color = color;
    this.todos = [];
    this.active = false;
  }
}
