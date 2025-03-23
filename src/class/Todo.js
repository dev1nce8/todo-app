export default class Todo {
  constructor({ title, due, priority }) {
    this.title = title;
    this.id = crypto.randomUUID();
    this.due = due;
    this.priority = priority;
    this.project = null;
    this.isCompleted = false;
  }
}
