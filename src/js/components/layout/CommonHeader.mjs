import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";

customElements.define(
  "common-header",
  class extends BaseElement {
    constructor() {
      super();
    }

    _height = 42; // px

    connectedCallback() {
      super.connectedCallback();
      this.scrollHandler();
      window.addEventListener('scroll', this.scrollHandler.bind(this));
    }

    /**
     * @type {(e: Event) => void}
     */
    scrollHandler(e) {
      const clsList = this.querySelector('header').classList;
      if (window.scrollY > this._height) {
        clsList.remove('bg-blue-950');
        clsList.add('bg-transparent');

        clsList.remove('justify-center');
        clsList.add('justify-end');
      } else {
        clsList.remove('bg-transparent');
        clsList.add('bg-blue-950');

        clsList.remove('justify-end');
        clsList.add('justify-center');
      }

      clsList.remove('hidden');
      clsList.add('flex');
    }

    render() {
      const template = html`
        <header class="hidden bg-blue-950 flex-row justify-center w-full relative" style="height: ${this._height}px;">
          <div class="w-14 h-14 m-2">
            <me-img></me-img>
          </div>
        </header>
      `;
      render(template, this);
    }
  }
);
