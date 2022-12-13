import { html, render } from "/blog/assets/libs/lit-html@2.5.0.min.mjs";
import { BaseElement } from "/blog/components/base/BaseElement.mjs";

import '/blog/components/common/MeImg.mjs';

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
        <header class="flex flex-row justify-center w-full h-20 bg-blue-400 relative">
          <div class="w-24 h-24 m-4">
            <me-img></me-img>
          </div>
        </header>
      `;
      render(template, this);
    }
  }
);
