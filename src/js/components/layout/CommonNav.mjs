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
        return string.toLowerCase().replace(/\s+/g, "-");
      };

      const anchorTemplate = (path) => html`
        <li class="flex-1">
          <a
            class="block p-3 border-b-2 hover:border-primary hover:text-primary"
            href=${`/blog/site/${path}`}
            @click=${this.anchorHandler.bind(this)}
            >${path === "" ? "Root" : path.replace(/-/g, ' ')}</a
          >
        </li>
      `;

      const loadingTemplate = this.isLoading
        ? html`<div
            id="loading"
            class="fixed top-0 left-0 w-full h-full flex justify-center items-center"
          >
            ...Loading
          </div>`
        : "";

      const template = html`
        <div class="mb-4">
          <h4 class="text-lg text-white font-bold">📚 카테고리 바로가기</h4>
        </div>
        <nav class="shadow-md bg-white">
          <ul class="flex flex-col">
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
