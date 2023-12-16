import { html, render } from 'lit-html';
import { BaseElement } from "../base/BaseElement.mjs";

// import { siteData$ } from '../observables.mjs';

customElements.define(
  "snow-background",
  class extends BaseElement {

    connectedCallback() {
      super.connectedCallback();
      const MIN_DURATION = 10;
      function makeSnowflake() {
        const snowflakeBackground = document.querySelector('#snowflakeBackground');

        const snowflake = document.createElement('div');
        const delay = Math.random() * 20;
        const initialOpacity = Math.random() * 0.5;
        const duration = Math.random() * 20 + MIN_DURATION;

        snowflake.classList.add('snowflake');
        snowflake.style.left = `${Math.random() *  snowflakeBackground.offsetWidth}px`;
        snowflake.style.animation = `fall ${duration}s linear`;
        snowflake.style.animationDelay = `${delay}s`;
        snowflake.style.opacity = initialOpacity;

        snowflakeBackground.appendChild(snowflake);

        setTimeout(() => {
          snowflakeBackground.removeChild(snowflake);
          makeSnowflake();
        }, (duration + delay) * 1000);
      }

      function startSnowflake() {
        for(let i=0; i<300; i++) {
          makeSnowflake();
        }
      }
      setTimeout(() => {
        startSnowflake();
      }, 1000);
    }
    
    render() {

      render(html`
      <style>
        ${`
        @keyframes fall {
          from {}
          to {
            /* top: 100vh; */
            transform: translateY(100vh);
            /* opacity: 0; */
          }
        }

        .snowflake {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: white;
          box-shadow: .5px .5px 5px 1px #9A9A9A;
          position: fixed;
          top: -5px;
          z-index: 99999;
        }
        `}
      </style>
      <div id="snowflakeBackground" class="absolute top-0 w-screen">
      </div>
      ${this.children}
      `, this);
    }
  }
);