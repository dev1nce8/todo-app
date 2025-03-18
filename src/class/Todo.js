export default class Todo {
  constructor({ title, description, due, priority }) {
    this.title = title;
    this.description = description;
    this.id = crypto.randomUUID();
    this.due = due;
    this.priority = priority;
    this.project = null;
  }
}
