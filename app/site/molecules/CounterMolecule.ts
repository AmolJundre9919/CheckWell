import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";

export interface CounterProps {
    value: number;
    min?: number;
    max?: number;
    step?: number;
    label?: string;
    variant?: 'default' | 'primary' | 'secondary';
    size?: 'small' | 'medium' | 'large';
}

export class CounterMolecule extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(): string[] {
        return ['value', 'min', 'max', 'step', 'label', 'variant', 'size'];
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
    }

    attributeChangedCallback() {
        this.render();
    }

    private setupListeners() {
        if (this.shadowRoot) {
            const decrementBtn = this.shadowRoot.querySelector('.decrement');
            const incrementBtn = this.shadowRoot.querySelector('.increment');

            decrementBtn?.addEventListener('click', () => this.handleDecrement());
            incrementBtn?.addEventListener('click', () => this.handleIncrement());
        }
    }

    private handleDecrement() {
        const currentValue = Number(this.getAttribute('value')) || 0;
        const step = Number(this.getAttribute('step')) || 1;
        const min = Number(this.getAttribute('min')) || Number.MIN_SAFE_INTEGER;
        
        const newValue = Math.max(currentValue - step, min);
        this.setAttribute('value', newValue.toString());
        this.dispatchEvent(new CustomEvent('change', { detail: { value: newValue } }));
    }

    private handleIncrement() {
        const currentValue = Number(this.getAttribute('value')) || 0;
        const step = Number(this.getAttribute('step')) || 1;
        const max = Number(this.getAttribute('max')) || Number.MAX_SAFE_INTEGER;
        
        const newValue = Math.min(currentValue + step, max);
        this.setAttribute('value', newValue.toString());
        this.dispatchEvent(new CustomEvent('change', { detail: { value: newValue } }));
    }

    protected render() {
        const value = Number(this.getAttribute('value')) || 0;
        const label = this.getAttribute('label') || 'Counter';
        const variant = this.getAttribute('variant') || 'default';
        const size = this.getAttribute('size') || 'medium';

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: inline-flex;
                        flex-direction: column;
                        gap: 8px;
                        font-family: ${defaultTheme.typography.fontFamily};
                    }

                    .label {
                        font-size: ${size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'};
                        color: ${(defaultTheme.colors[variant as keyof typeof defaultTheme.colors] as { main: string })?.main || defaultTheme.colors.default.main};
                    }

                    .counter-container {
                        display: inline-flex;
                        align-items: center;
                        gap: 12px;
                        background: ${defaultTheme.colors.background};
                        padding: 8px;
                        border-radius: 8px;
                        border: 1px solid ${(defaultTheme.colors[variant as keyof typeof defaultTheme.colors] as { main: string })?.main || defaultTheme.colors.default.main};
                    }

                    button {
                        width: ${size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px'};
                        height: ${size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px'};
                        border: none;
                        border-radius: 4px;
                        background: ${(defaultTheme.colors[variant as keyof typeof defaultTheme.colors] as { main: string })?.main || defaultTheme.colors.default.main};
                        color: ${(defaultTheme.colors[variant as keyof typeof defaultTheme.colors] as { contrastText: string })?.contrastText || defaultTheme.colors.default.contrastText};
                        cursor: pointer;
                        font-size: ${size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px'};
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    button:hover {
                        opacity: 0.9;
                    }

                    .value {
                        min-width: 40px;
                        text-align: center;
                        font-size: ${size === 'small' ? '14px' : size === 'medium' ? '16px' : '18px'};
                    }
                </style>
                <div class="label">${label}</div>
                <div class="counter-container">
                    <button class="decrement">-</button>
                    <span class="value">${value}</span>
                    <button class="increment">+</button>
                </div>
            `;
        }
    }
}

customElements.define('ui-counter', CounterMolecule); 