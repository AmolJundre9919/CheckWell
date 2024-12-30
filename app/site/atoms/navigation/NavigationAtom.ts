import { BaseComponent } from "../BaseComponent";

interface NavigationProps {
  icon: string; // Assuming icon is a string (could be an SVG or icon name)
  label: string;
  badgeText?: string; // Optional badge text
}

class NavigationAtom extends BaseComponent implements NavigationProps {
  icon: string = '';
  label: string = '';
  badgeText?: string;

  static get observedAttributes(): string[] {
    return ['icon', 'label', 'badgeText'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.createStyles(`
      .navigation-item {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px;
        cursor: pointer;
      }
      .badge {
        background-color: red;
        color: white;
        border-radius: 12px;
        padding: 2px 6px;
        font-size: 0.75rem;
      }
    `);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (oldValue !== newValue) {
      this[name as keyof this] = newValue as any;
      this.render();
    }
  }

  public render(): void {
    console.log('Rendering NavigationAtom with:', this.icon, this.label, this.badgeText);
    this.shadowRoot.innerHTML = `
      <div class="navigation-item">
        <span class="icon">${this.icon}</span>
        <span class="label">${this.label}</span>
        ${this.badgeText ? `<span class="badge">${this.badgeText}</span>` : ''}
      </div>
    `;
  }
}

// Register the component
customElements.define('ui-navigation', NavigationAtom);

export default NavigationAtom; 