export default class Project {
  constructor(name, description) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.description = description;
    this.todos = [];
    this.active = false;
  }
}
