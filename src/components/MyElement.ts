import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

// Registers the element
@customElement('my-element')
export class MyElement extends LitElement {
  static styles = css`
    span {
      color: green;
    }
  `;

  @property()
  mood = 'great';

  // Render the component's DOM by returning a Lit template
  render() {
    return html`Web Components are <span>${this.mood}</span>!`;
  }
}

