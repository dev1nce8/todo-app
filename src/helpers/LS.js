export default class LS {
  static setItem(storageName, item) {
    localStorage.setItem(storageName, JSON.stringify(item));
  }

  static getItem(storageName) {
    return JSON.parse(localStorage.getItem(storageName));
  }
}
