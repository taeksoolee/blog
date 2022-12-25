import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";

function loadPrismJs() {
  const head = document.getElementsByTagName('head')[0];
  const script= document.createElement('script');
  script.type= 'text/javascript';
  script.src= '/blog/assets/libs/prism.js';
  head.appendChild(script);
}

customElements.define('code-box', class extends BaseElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ['type', 'url'];
  }

  render() {
    const type = this.getAttribute('type') ?? 'js';
    const url = this.getAttribute('url');
    
    fetch(url).then((res) => res.text())
      .then((codeText) => {
        // if (type === 'html') {
        //   codeText = codeText.replace(/\</g, '&lt;');
        //   codeText = codeText.replace(/\>/g, '&gt;');
        // }

        const template = html`
          <pre>
            <code class=${`language-${type}`}>${'\n' + codeText + '\n '}</code>
          </pre>
        `;
        render(template, this);

        loadPrismJs();
      });
  }
});