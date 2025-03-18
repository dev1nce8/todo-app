export default class Project {
  constructor(name, id) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.todos = [];
    this.active = false;
  }
}
