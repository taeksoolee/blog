function loadPrismCss() {
  const head= document.getElementsByTagName('head')[0];
  const link= document.createElement('link');
  link.rel= 'stylesheet';
  link.href= '../assets/libs/prism.css';
  head.appendChild(link);
}

function loadPrismJs() {
  const head= document.getElementsByTagName('head')[0];
  const script= document.createElement('script');
  script.type= 'text/javascript';
  script.src= '../assets/libs/prism.js';
  head.appendChild(script);
}

customElements.define('code-box', class extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const type = this.getAttribute('type') ?? 'js';
    const url = this.getAttribute('url');
    fetch(url).then((res) => res.text())
      .then((codeText) => {
        const pre = document.createElement('pre');
      
        const code = document.createElement('code');
        code.classList.add(`language-${type}`);
        // console.log(codeText);

        if (type === 'html') {
          codeText = codeText.replace(/\</g, '&lt;');
          codeText = codeText.replace(/\>/g, '&gt;');
        }

        code.innerHTML = 'text/' + type + '\n\n'
          + codeText;
        pre.appendChild(code);

        this.appendChild(pre);

        loadPrismCss();
        loadPrismJs();
      });
  }
});