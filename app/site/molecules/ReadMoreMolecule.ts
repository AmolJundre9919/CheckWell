import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";

export interface ReadMoreProps {
    content: string;
    maxLength?: number;
    expandText?: string;
    collapseText?: string;
    expanded?: boolean;
}

export class ReadMoreMolecule extends BaseComponent {
    private expanded: boolean = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(): string[] {
        return ['content', 'max-length', 'expand-text', 'collapse-text', 'expanded'];
    }

    connectedCallback() {
        this.expanded = this.hasAttribute('expanded');
        this.render();
        this.setupListeners();
    }

    attributeChangedCallback() {
        this.render();
    }

    private setupListeners() {
        if (this.shadowRoot) {
            const toggleButton = this.shadowRoot.querySelector('.toggle-button');
            toggleButton?.addEventListener('click', () => {
                this.expanded = !this.expanded;
                this.render();
                this.dispatchEvent(new CustomEvent('toggle', { 
                    detail: { expanded: this.expanded } 
                }));
            });
        }
    }

    protected render() {
        const content = this.getAttribute('content') || '';
        const maxLength = Number(this.getAttribute('max-length')) || 150;
        const expandText = this.getAttribute('expand-text') || 'Read More';
        const collapseText = this.getAttribute('collapse-text') || 'Show Less';
        
        const shouldTruncate = content.length > maxLength;
        const displayText = this.expanded || !shouldTruncate 
            ? content 
            : content.slice(0, maxLength) + '...';

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                        font-family: ${defaultTheme.typography.fontFamily};
                    }

                    .container {
                        position: relative;
                    }

                    .content {
                        line-height: 1.6;
                        margin-bottom: ${shouldTruncate ? '8px' : '0'};
                        transition: max-height 0.3s ease-out;
                        font-size: 16px;
                        color: ${defaultTheme.colors.text};
                    }

                    .toggle-button {
                        background: none;
                        border: none;
                        color: ${(defaultTheme.colors['primary' as keyof typeof defaultTheme.colors] as { main: string })?.main || '#2563eb'};
                        cursor: pointer;
                        padding: 4px 8px;
                        font-size: 14px;
                        font-weight: 500;
                        transition: opacity 0.2s;
                        text-decoration: underline;
                    }

                    .toggle-button:hover {
                        opacity: 0.8;
                    }

                    .fade-overlay {
                        display: ${!this.expanded && shouldTruncate ? 'block' : 'none'};
                        position: absolute;
                        bottom: 0;
                        left: 0;
                        right: 0;
                        height: 40px;
                        background: linear-gradient(transparent, ${defaultTheme.colors.background});
                        pointer-events: none;
                    }
                </style>
                <div class="container">
                    <div class="content">${displayText}</div>
                    ${shouldTruncate ? `
                        <button class="toggle-button">
                            ${this.expanded ? collapseText : expandText}
                        </button>
                        <div class="fade-overlay"></div>
                    ` : ''}
                </div>
            `;
        }
    }
}

customElements.define('ui-read-more', ReadMoreMolecule); 