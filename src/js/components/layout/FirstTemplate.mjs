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
      <snow-background>
      <main class="min-h-screen bg-sky-950">
        <div class="sticky top-0 z-50">
          <common-header></common-header>
        </div>
        <div class="flex justify-center flex-1 w-full h-full m-auto">
          <!-- 메뉴 -->
          <section class="px-4 py-10 mt-0 w-50">
            <div class="sticky top-16 w-48">
              <div class="mb-8 text-white">
                <p>안녕하세요. 개발자 이택수 입니다. 😊</p>
              </div>
              <div>
                <common-nav></common-nav>
              </div>
            </div>
          </section>
          <!-- 게시글 -->
          <section class="w-[800px] px-4 py-10 bg-white" style="min-height: calc(100vh - 42px);">
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
          <!-- 최근 작성 목록 -->
          <section class="hidden xl:block px-4 py-10 w-48">
            <div class="sticky top-16 w-48">
              <recent-list></recent-list>
            </div>
          </section>
        </div>
      </main>
      </snow-background>
      `;
      render(template, this);
    }
  }
);


