import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";

customElements.define(
  "me-img",
  class extends BaseElement {
    imgSrc = "/blog/assets/images/me/memoji.png";
    static get observedAttributes() {
      // return ["class"];
      return [];
    }

    render() {
      render(
        html` <img
          src=${this.imgSrc}
          class="inline-block w-full h-full bg-white rounded-full"
        />`,
        this
      );
    }
  }
);
