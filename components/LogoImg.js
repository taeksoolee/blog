customElements.define('logo-img', class extends HTMLElement {
  // _img = null;
  // get src() {
  //   return this._img;
  // }

  // set src(source) {
  //   const imgs = this.getElementsByTagName('img');
  //   for(let i=0; i<imgs.length; i++) {
  //     delete imgs[i];
  //   }

  //   this._img = document.createElement('img');
  //   this._img.src = source;
  //   this.append(this._img);
  // }


  constructor() {
    super();
    // this.attachShadow({
    //   mode: 'open'
    // });
  }

  connectedCallback() {
    const img = document.createElement('img');
    img.src = this.getAttribute('src');
    this.append(img);
  }

  // attributeChangedCallback(name, oldValue, newValue) { 
  //   console.log(name, oldValue, newValue);
  // }

  disconnectedCallback() {
    
  }
});