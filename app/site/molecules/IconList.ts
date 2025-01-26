import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";

export class IconListMolecule extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(): string[] {
        return ['items', 'direction', 'size', 'variant', 'show-labels'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    private getItems() {
        try {
            return JSON.parse(this.getAttribute('items') || '[]');
        } catch {
            return [];
        }
    }

    protected render() {
        const direction = this.getAttribute('direction') || 'horizontal';
        const size = this.getAttribute('size') || 'medium';
        const variant = this.getAttribute('variant') || 'default';
        const showLabels = this.getAttribute('show-labels') !== 'false';
        const items = this.getItems();

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: inline-block;
                    }
                    .icon-list {
                        display: flex;
                        flex-direction: ${direction === 'vertical' ? 'column' : 'row'};
                        gap: 12px;
                        padding: 8px;
                    }
                    .icon-item {
                        display: flex;
                        flex-direction: ${direction === 'vertical' ? 'row' : 'column'};
                        align-items: center;
                        gap: 4px;
                        cursor: pointer;
                    }
                    .icon {
                        font-size: ${size === 'small' ? '20px' : size === 'medium' ? '24px' : '32px'};
                    }
                    .label {
                        font-size: 14px;
                        color: ${defaultTheme.colors.text};
                        ${showLabels ? '' : 'display: none;'}
                    }
                </style>
                <div class="icon-list">
                    ${items.map((item: { icon: string; label?: string }) => `
                        <div class="icon-item">
                            <span class="icon">${item.icon}</span>
                            ${item.label ? `<span class="label">${item.label}</span>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
}

customElements.define('ui-icon-list', IconListMolecule); 