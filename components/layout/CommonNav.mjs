import { html, render } from "/blog/assets/libs/lit-html@2.5.0.min.mjs";
import { BaseElement } from "/blog/components/base/BaseElement.mjs";

customElements.define(
  "common-nav",
  class extends BaseElement {
    render() {
      const template = html`
        <nav>
          <ul class="flex flex-col w-40">
            <li class="flex-1">
              <a
                class="block p-5 border-2 hover:border-blue-400"
                href="/blog"
                >Home</a
              >
            </li>
            <li class="flex-1">
              <a
                class="block p-5 border-2 hover:border-blue-400"
                href="/blog/tech-product"
                >Tech Product</a
              >
            </li>
            <li class="flex-1">
              <a
                class="block p-5 border-2 hover:border-blue-400"
                href="/blog/development"
                >Development</a
              >
            </li>
          </ul>
        </nav>
      `;
      render(template, this);
    }
  }
);
