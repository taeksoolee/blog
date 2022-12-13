import { html, render } from "/blog/assets/libs/lit-html@2.5.0.min.mjs";
import { StateElement } from "/blog/base/StateElement.js";

customElements.define(
  "my-counter",
  class extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this._count = 0;
      this.render();
    }

    static get observedAttributes() {
      return ['reset-num'];
    }

    attributeChangedCallback(property, oldValue, newValue) {
      // console.log(property, oldValue, newValue);
      if(oldValue === newValue) return;
      
      this[property] = newValue;
      this.render();
    }

    set count(val) {
      this._count = val;
      this.render();
    }

    get count() {
      return this._count;
    }

    handleClick() {
      const resetNum = parseInt(this['reset-num']);

      if (this.count + 1 > resetNum) {
        this.count = 0;
      }  else {
        this.count++;
      }
    }

    render() {
      const template = html`
        <button @click=${this.handleClick.bind(this)}>Add</button>
        <div>${this.count}</div>
      `;

      render(template, this);
    }
  }
);
