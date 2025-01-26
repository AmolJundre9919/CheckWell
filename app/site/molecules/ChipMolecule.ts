import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";

export interface ChipProps {
    label: string;
    icon?: string;
    onDelete?: () => void;
    variant?: 'default' | 'primary' | 'secondary' | 'error';
    size?: 'small' | 'medium' | 'large';
}

export class ChipMolecule extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(): string[] {
        return ['label', 'icon', 'variant', 'size'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    protected render() {
        const label = this.getAttribute('label') || 'Chip';
        const icon = this.getAttribute('icon');
        const variant = (this.getAttribute('variant') || 'default') as keyof Theme['colors'];
        const size = this.getAttribute('size') || 'medium';

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: inline-flex;
                        align-items: center;
                        height: ${size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px'};
                        padding: 0 12px;
                        background: ${(defaultTheme.colors[variant] as { main: string })?.main || defaultTheme.colors.default.main};
                        color: ${(defaultTheme.colors[variant] as { contrastText: string })?.contrastText || defaultTheme.colors.default.contrastText};
                        border-radius: 16px;
                        font-family: ${defaultTheme.typography.fontFamily};
                        font-size: ${size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'};
                        cursor: default;
                        user-select: none;
                        gap: 8px;
                    }

                    .icon {
                        font-size: ${size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px'};
                    }

                    .delete-button {
                        cursor: pointer;
                        border: none;
                        background: none;
                        color: inherit;
                        padding: 2px;
                        margin-left: 4px;
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .delete-button:hover {
                        background: rgba(0, 0, 0, 0.1);
                    }
                </style>
                ${icon ? `<span class="icon">${icon}</span>` : ''}
                <span class="label">${label}</span>
                <button class="delete-button">✕</button>
            `;

            this.shadowRoot.querySelector('.delete-button')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.dispatchEvent(new CustomEvent('delete'));
            });
        }
    }
}

customElements.define('ui-chip', ChipMolecule); 