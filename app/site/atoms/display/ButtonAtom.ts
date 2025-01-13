import { BaseComponent } from "../../BaseComponent";

interface ButtonProps {
  text: string;
  onClick: () => void;
}

export class ButtonAtom extends BaseComponent implements ButtonProps {
  text: string = 'Button';
  onClick: () => void = () => {};

  static get observedAttributes(): string[] {
    return ['text'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: inline-block;
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <button class="bg-blue-500 text-white font-bold py-2 px-4 rounded" onclick="${this.onClick}">
        ${this.text}
      </button>
    `;
  }
}

customElements.define('ui-button', ButtonAtom); 