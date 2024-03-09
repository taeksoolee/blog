import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// Registers the element
@customElement('my-counter')
export class MyCounter extends LitElement {
  static styles = css`
    .container {
      @apply mx-auto px-4;
    }
  `;

  @property({type: Number})
  private count = 0;

  increase() {
    this.count++;
  }

  render() {
    return html`
    <div class="container">
      <h3>Counter</h3>
      <div class="text-red-400">${this.count}</div>
      <button class="text-red-400" @click=${this.increase}>+</button>
    </div>
    `;
  }

}