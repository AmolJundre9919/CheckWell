import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";

export class RatingMolecule extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(): string[] {
        return ['value', 'max', 'size', 'readonly', 'color'];
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    private setupListeners() {
        if (!this.shadowRoot || this.getAttribute('readonly') === 'true') return;

        const stars = this.shadowRoot.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                this.setAttribute('value', String(index + 1));
                this.dispatchEvent(new CustomEvent('change', { 
                    detail: { value: index + 1 } 
                }));
            });

            star.addEventListener('mouseover', () => {
                this.updateStarsDisplay(index + 1, true);
            });

            star.addEventListener('mouseout', () => {
                this.updateStarsDisplay(Number(this.getAttribute('value')) || 0, false);
            });
        });
    }

    private updateStarsDisplay(activeValue: number, isHover: boolean) {
        if (!this.shadowRoot) return;

        const stars = this.shadowRoot.querySelectorAll('.star');
        stars.forEach((star, index) => {
            star.classList.toggle('active', index < activeValue);
            star.classList.toggle('hover', isHover && index < activeValue);
        });
    }

    attributeChangedCallback() {
        this.render();
    }

    protected render() {
        const value = Number(this.getAttribute('value')) || 0;
        const max = Number(this.getAttribute('max')) || 5;
        const size = this.getAttribute('size') || 'medium';
        const readonly = this.getAttribute('readonly') === 'true';
        const color = this.getAttribute('color') || defaultTheme.colors.primary.main;

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: inline-block;
                    }
                    .rating {
                        display: flex;
                        gap: 4px;
                        align-items: center;
                    }
                    .star {
                        font-size: ${size === 'small' ? '16px' : size === 'medium' ? '24px' : '32px'};
                        cursor: ${readonly ? 'default' : 'pointer'};
                        color: #d4d4d4;
                        transition: color 0.2s ease;
                    }
                    .star.active {
                        color: ${color};
                    }
                    .star.hover {
                        color: ${color}aa;
                    }
                    .star::before {
                        content: '★';
                    }
                </style>
                <div class="rating">
                    ${Array.from({ length: max }, (_, i) => `
                        <span class="star ${i < value ? 'active' : ''}"></span>
                    `).join('')}
                </div>
            `;

            this.updateStarsDisplay(value, false);
        }
    }
}

customElements.define('ui-rating', RatingMolecule); 