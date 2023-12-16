import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";

import { siteData$ } from '../observables.mjs';

customElements.define(
  "category-list",
  class extends BaseElement {
    list = [];
    static get observedAttributes() {
      // return ["class"];
      return [];
    }

    constructor() {
      super();
    }

    connectedCallback() {
      super.connectedCallback();
      const currRoot = this.getAttribute('root') ?? '';
      const currFile = this.getAttribute('file') ?? 'index.html';

      siteData$.subscribe({
        next: (siteData) => {
          window.siteData = siteData;
          const parseId = (val) => parseInt(val.split('-')[1]);

          this.list = siteData.filter(v => v.dir[0] === currRoot && v.file.fileName !== currFile);
          // 내림차순 정렬
          this.list.sort((a, b) => parseId(b.file.pageId) - parseId(a.file.pageId));
          this.render();
        },
        complete: () => {},
      });
    }

    render() {
      
        
      render(
        html`
          <ul class="" >
            ${this.list
                .map(item => html`
                  <li 
                    class="flex justify-between gap-2 items-end p-3 border-b-2 hover:border-primary hover:text-primary cursor-pointer"
                    @click=${() => {
                      location.href = `./${item.file.fileName}`;
                    }}
                  >
                    <p class="text-lg flex-1">
                      <strong class="font-bold">[${item.file.pageId}]</strong> ${item.file.title}
                    </p>
                    <span class="text-sm">
                      ${new Date(item.file.modifiedDate).toLocaleDateString('ko')}
                    </span>
                  </li>
                `)
            }
          </ul>
        `,
        this
      );
    }
  }
);
