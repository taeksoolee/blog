import { html, render } from "/blog/assets/libs/lit-html@2.5.0.min.mjs";
import { BaseElement } from "/blog/components/base/BaseElement.mjs";

customElements.define(
  "first-template",
  class extends BaseElement {
    connectedCallback() {
      const meta = document.getElementById('meta');
      
      if (meta) {
        const title = meta.getElementsByTagName('h1')[0].innerText;
        this.title = title;
      }

      super.connectedCallback();
    }

    render() {
      const template = html`
        <div class="sticky top-0 z-50">
          <common-header></common-header>
        </div>
        <div class="flex-1 flex w-4/5 mt-12 h-full m-auto">
          <section class="hidden lg:block px-4 py-10 w-48">
            <div class="sticky top-32">
              <common-nav></common-nav>
            </div>
          </section>
          <section class="flex-1 max-w-full px-4 py-10">
            <h1 class="text-3xl font-bold mt-8">${this.title}</h1>
            <article class="mt-10">
              ${this.children}
            </article>
          </section>
          <section class="min-h-full hidden lg:block px-4 py-10 w-48">
            <div class="sticky top-32">
              <h2 class="text-xl mt-4">최근 게시글</h2>
              <article>Tech Product - 드디어 샀다. Q45 헤드셋 후기</article>
              <h2 class="text-xl mt-4">인기 게시글</h2>
              <article>Development - evcaro 개발 후기</article>
            </div>
          </section>
        </div>
      `;
      render(template, this);
    }
  }
);


