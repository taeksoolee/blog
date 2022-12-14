import { html, render } from 'lit-html';
// import { format as formatTimeago, cancel, register } from 'timeago.js';
import { displayDateFormatter } from '../../utils/format.js';
import { BaseElement } from "../base/BaseElement.mjs";

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
      const navigateStr = location.pathname
        .replace('/blog/site', '')
        .replace(/\//g, ' / ')
        .replace(/\/ $/, '')
        .replace('.html', '');

      const handleClick = () => {
        history.back();
      }

      const hiddenlastmodified = this.getAttribute('hidden-lastmodified') !== null;
      const modifedDateStr = hiddenlastmodified ? '' : displayDateFormatter.format(new Date(window.document.lastModified));
      // console.log(formatTimeago(new Date(window.document.lastModified), 'ko-kr'));

      const template = html`
        <div class="sticky top-0 z-50">
          <common-header></common-header>
        </div>
        <div class="flex justify-center flex-1 w-full mt-12 h-full m-0 lg:m-auto lg:w-8/12">
          <!--  -->
          <section class="hidden xl:block px-4 py-10 w-48">
            <div class="sticky top-32">
              <common-nav></common-nav>
            </div>
          </section>
          <!--  -->
          <section class="flex-1 w-4/5 px-4 py-10">
            <div>
              <span class="text-xl mr-5 text-gray-700 hover:text-blue-400 cursor-pointer">
                <i class="fa fa-arrow-left" @click=${handleClick}></i>
              </span>
              ${navigateStr.replace(/-/g, ' ')}
            </div>
            <div class="
              flex justify-between items-start flex-col
              lg:items-end lg:flex-row
            ">
              <h1 class="text-3xl font-bold mt-8">
                ${this.title}
              </h1>
            </div>
            <div class="text-sm mt-3 float-right">${modifedDateStr}</div>
            <article class="mt-20">
              ${this.children}
            </article>
          </section>
          <!--  -->
          <section class="min-h-full hidden xl:block px-4 py-10 w-48">
            <div class="sticky top-32">
              <recent-list></recent-list>
            </div>
          </section>
        </div>
      `;
      render(template, this);
    }
  }
);


