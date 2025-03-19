export default class PubSub {
  static events = {};

  static subscribe(event, fn) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(fn);
  }

  static publish(event, ...args) {
    this.events[event].forEach((fn) => {
      fn(...args);
    });
  }
}
