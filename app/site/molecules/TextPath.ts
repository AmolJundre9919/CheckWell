import { BaseComponent } from '../atoms/BaseComponent';
import { defaultTheme } from '../theme/theme';

export class TextPath extends BaseComponent {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return [
      'path',
      'text',
      'font-size',
      'fill',
      'text-align',
      'start-offset',
      'letter-spacing'
    ];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    const path = this.getAttribute('path') || 'M10 80 Q 95 10 180 80';
    const text = this.getAttribute('text') || 'Your curved text here';
    const fontSize = this.getAttribute('font-size') || '16';
    const fill = this.getAttribute('fill') || defaultTheme.colors.primary.main;
    const textAlign = this.getAttribute('text-align') || 'start';
    const startOffset = this.getAttribute('start-offset') || '0';
    const letterSpacing = this.getAttribute('letter-spacing') || '0';

    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          min-height: 100px;
        }
        svg {
          width: 100%;
          height: 100%;
          overflow: visible;
        }
      </style>
      <svg viewBox="0 0 200 100">
        <path
          id="curve"
          d="${path}"
          fill="transparent"
          stroke="transparent"
        />
        <text>
          <textPath
            href="#curve"
            startOffset="${startOffset}%"
            text-anchor="${textAlign}"
            font-size="${fontSize}px"
            letter-spacing="${letterSpacing}px"
            fill="${fill}"
          >
            ${text}
          </textPath>
        </text>
      </svg>
    `;
  }
}

customElements.define('ui-text-path', TextPath); 