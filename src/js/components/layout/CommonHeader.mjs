import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";

customElements.define(
  "common-header",
  class extends BaseElement {
    constructor() {
      super();
    }

    scrollHandler() {
      // const y = 
    }

    render() {
      const template = html`
        <header class="bg-primary flex flex-row justify-center w-full h-20 relative">
          <div class="w-24 h-24 m-4">
            <me-img></me-img>
          </div>
        </header>
      `;
      render(template, this);
    }
  }
);
