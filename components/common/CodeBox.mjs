import { html, render } from "/blog/assets/libs/lit-html@2.5.0.min.mjs";
import { BaseElement } from "/blog/components/base/BaseElement.mjs";

function loadPrismCss() {
  const head= document.getElementsByTagName('head')[0];
  const link= document.createElement('link');
  link.rel= 'stylesheet';
  link.href= '../assets/libs/prism.css';
  head.appendChild(link);
}

function loadPrismJs() {
  const head = document.getElementsByTagName('head')[0];
  const script= document.createElement('script');
  script.type= 'text/javascript';
  script.src= '../assets/libs/prism.js';
  head.appendChild(script);
}

loadPrismCss();
loadPrismJs();
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
            <code class=${`language-${type}`}>
              ${'text/' + type + '\n\n' + codeText}
            </code>
          </pre>
        `;


        render(template, this);
      });
  }
});