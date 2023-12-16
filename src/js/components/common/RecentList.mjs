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
            <div class="mb-2">
              <h4 class="text-lg text-white font-bold">🕰 최근 게시글</h4>
            </div>
            <div class="bg-white">
              ${this.list.map(item => html`
                <div 
                  class="p-3 cursor-pointer border-b-2 hover:border-primary hover:text-primary" 
                  @click=${() => {
                    location.href = `/blog/site/${item.dir.join('/')}/${item.file.fileName}`
                  }}
                >
                  ${item.file.title}
                </div>
              `)}
            </div>
            
            <!-- <h2 class="text-xl mt-4">인기 게시글</h2>
            <div>Development - evcaro 개발 후기</div> -->
          </div>
        `,
        this
      );
    }
  }
);
