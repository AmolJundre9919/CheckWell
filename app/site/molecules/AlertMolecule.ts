import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";

export interface AlertProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    title?: string;
    dismissible?: boolean;
    icon?: string;
}

export class AlertMolecule extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(): string[] {
        return ['message', 'type', 'title', 'dismissible', 'icon'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    protected render() {
        const type = (this.getAttribute('type') || 'info') as keyof typeof alertStyles;
        const message = this.getAttribute('message') || '';
        const title = this.getAttribute('title');
        const dismissible = this.hasAttribute('dismissible');
        const icon = this.getAttribute('icon') || alertStyles[type].icon;

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                        margin: 8px 0;
                    }

                    .alert {
                        display: flex;
                        align-items: flex-start;
                        padding: 16px;
                        border-radius: 8px;
                        background: ${alertStyles[type].background};
                        border: 1px solid ${alertStyles[type].border};
                        color: ${alertStyles[type].color};
                        font-family: ${defaultTheme.typography.fontFamily};
                        position: relative;
                    }

                    .icon {
                        font-size: 20px;
                        margin-right: 12px;
                        flex-shrink: 0;
                    }

                    .content {
                        flex: 1;
                    }

                    .title {
                        font-weight: 600;
                        margin-bottom: 4px;
                        font-size: 16px;
                    }

                    .message {
                        font-size: 14px;
                        line-height: 1.5;
                    }

                    .dismiss {
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        background: none;
                        border: none;
                        color: currentColor;
                        cursor: pointer;
                        padding: 4px;
                        font-size: 18px;
                        opacity: 0.7;
                        transition: opacity 0.2s;
                    }

                    .dismiss:hover {
                        opacity: 1;
                    }
                </style>
                <div class="alert" role="alert">
                    <div class="icon">${icon}</div>
                    <div class="content">
                        ${title ? `<div class="title">${title}</div>` : ''}
                        <div class="message">${message}</div>
                    </div>
                    ${dismissible ? `<button class="dismiss" aria-label="Dismiss">×</button>` : ''}
                </div>
            `;

            if (dismissible) {
                this.shadowRoot.querySelector('.dismiss')?.addEventListener('click', () => {
                    this.dispatchEvent(new CustomEvent('dismiss'));
                    this.remove();
                });
            }
        }
    }
}

const alertStyles = {
    success: {
        icon: '✅',
        background: '#f0fdf4',
        border: '#bbf7d0',
        color: '#166534'
    },
    error: {
        icon: '❌',
        background: '#fef2f2',
        border: '#fecaca',
        color: '#991b1b'
    },
    warning: {
        icon: '⚠️',
        background: '#fffbeb',
        border: '#fef3c7',
        color: '#92400e'
    },
    info: {
        icon: 'ℹ️',
        background: '#f0f9ff',
        border: '#bae6fd',
        color: '#075985'
    }
} as const;

customElements.define('ui-alert', AlertMolecule); 