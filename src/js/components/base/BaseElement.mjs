export class BaseElement extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
    this.render();
  }
}