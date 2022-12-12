import { html, render } from "/blog/assets/libs/lit-html@2.5.0.min.mjs";
import { BaseElement } from "/blog/components/base/BaseElement.mjs";

import '/blog/components/common/MeImg.mjs';

customElements.define(
  "common-header",
  class extends BaseElement {
    constructor() {
      super();
    }

    render() {
      const template = html`
        <header class="flex justify-center w-full h-20 bg-blue-400">
          <me-img></me-img>
        </header>
      `;
      render(template, this);
    }
  }
);
