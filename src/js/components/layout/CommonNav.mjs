import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";

customElements.define(
  "common-nav",
  class extends BaseElement {
    isLoading = false;
    anchorHandler() {
      this.isLoading = true;
      this.render();
    }

    render() {
      const convertToKebabCase = (string) => {
        return string.replace(/\s+/g, "-").toLowerCase();
      };

      const anchorTemplate = (path) => html`<li class="flex-1">
        <a
          class="block p-5 border-2 hover:border-blue-400"
          href=${`/blog/site/${path}`}
          @click=${this.anchorHandler.bind(this)}
          >${path === "" ? "Root" : convertToKebabCase(path)}</a
        >
      </li>`;

      const loadingTemplate = this.isLoading
        ? html`<div
            id="loading"
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center"
          >
            ...Loading
          </div>`
        : "";

      const template = html`
        <nav>
          <ul class="flex flex-col w-40">
            ${[
              "", 
              "tech-product", 
              "development"
            ].map((path) =>
              anchorTemplate(`${path}`)
            )}
          </ul>
        </nav>
        ${loadingTemplate}
      `;
      render(template, this);
    }
  }
);
