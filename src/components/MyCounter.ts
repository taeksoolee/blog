import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// Registers the element
@customElement('my-counter')
export class MyCounter extends LitElement {
  static styles = css`
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
  `;

  @property({type: Number})
  private count = 0;

  increase() {
    this.count++;
  }

  render() {
    return html`
      <div>${this.count}</div>
      <button class="text-red-400" @click=${this.increase}>+</button>
    `;
  }

}