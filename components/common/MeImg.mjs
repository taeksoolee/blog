import { html, render } from "/blog/assets/libs/lit-html@2.5.0.min.mjs";
import { BaseElement } from "/blog/components/base/BaseElement.mjs";

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
          class="inline-block w-28 h-28 m-4 bg-white mar rounded-full"
        />`,
        this
      );
    }
  }
);