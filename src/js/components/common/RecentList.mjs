import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";
import { siteData$ } from '../observables.mjs';

customElements.define(
  "recent-list",
  class extends BaseElement {
    list = [];

    static get observedAttributes() {
      // return ["class"];
      return [];
    }

    connectedCallback() {
      super.connectedCallback();

      siteData$.subscribe({
        next: (siteData) => {
          const filted = siteData.filter(v => v.file.fileName !== 'index.html');
          filted.sort((a, b) => new Date(b.file.modifiedDate) - new Date(a.file.modifiedDate));
          
          this.list = filted.slice(0, 2);
          console.log(this.list);
          this.render();
        },
        complete: () => {},
      });
    }

    render() {
      render(
        html`
          <div class="mt-4 w-30">
            <h2 class="text-xl mb-4 font-bold">최근 게시글</h2>

            ${this.list.map(item => html`
              <div 
                class="mb-2 cursor-pointer hover:text-blue-400" 
                @click=${() => {
                  location.href = `/blog/site/${item.dir.join('/')}/${item.file.fileName}`
                }}
              >${item.file.title}</div>
            `)}
            
            <!-- <h2 class="text-xl mt-4">인기 게시글</h2>
            <div>Development - evcaro 개발 후기</div> -->
          </div>
        `,
        this
      );
    }
  }
);
