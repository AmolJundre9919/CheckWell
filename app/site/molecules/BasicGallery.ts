import { BaseComponent } from "../BaseComponent";
import { Theme, defaultTheme } from "../theme/theme";

export interface BasicGalleryProps {
    images: string[];
    columns?: number;
    gap?: number;
    imageHeight?: number;
    borderRadius?: number;
    title?: string;
}

export class BasicGallery extends BaseComponent {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes(): string[] {
        return ['images', 'columns', 'gap', 'image-height', 'border-radius', 'title'];
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback() {
        this.render();
    }

    private getImagesArray(): string[] {
        const imagesAttr = this.getAttribute('images');
        try {
            return imagesAttr ? JSON.parse(imagesAttr) : [];
        } catch {
            return [];
        }
    }

    protected render() {
        const images = this.getImagesArray();
        const columns = Number(this.getAttribute('columns')) || 3;
        const gap = Number(this.getAttribute('gap')) || 16;
        const imageHeight = Number(this.getAttribute('image-height')) || 200;
        const borderRadius = Number(this.getAttribute('border-radius')) || 8;
        const title = this.getAttribute('title') || 'Image Gallery';

        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                        font-family: ${defaultTheme.typography.fontFamily};
                    }

                    .gallery-title {
                        font-size: 24px;
                        font-weight: 600;
                        margin-bottom: 16px;
                        color: ${defaultTheme.colors.text};
                    }

                    .gallery-container {
                        display: grid;
                        grid-template-columns: repeat(${columns}, 1fr);
                        gap: ${gap}px;
                        padding: 16px;
                        background: ${defaultTheme.colors.background};
                        border-radius: ${borderRadius}px;
                        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    }

                    .gallery-item {
                        position: relative;
                        aspect-ratio: 16/9;
                        overflow: hidden;
                        border-radius: ${borderRadius}px;
                        transition: transform 0.3s ease;
                    }

                    .gallery-item:hover {
                        transform: scale(1.02);
                    }

                    .gallery-item img {
                        width: 100%;
                        height: ${imageHeight}px;
                        object-fit: cover;
                        display: block;
                    }

                    .empty-message {
                        text-align: center;
                        padding: 32px;
                        color: ${defaultTheme.colors.text};
                        font-style: italic;
                    }

                    @media (max-width: 768px) {
                        .gallery-container {
                            grid-template-columns: repeat(2, 1fr);
                        }
                    }

                    @media (max-width: 480px) {
                        .gallery-container {
                            grid-template-columns: 1fr;
                        }
                    }
                </style>
                <div class="gallery-title">${title}</div>
                <div class="gallery-container">
                    ${images.length > 0 
                        ? images.map(src => `
                            <div class="gallery-item">
                                <img src="${src}" alt="Gallery image" loading="lazy" />
                            </div>
                        `).join('')
                        : '<div class="empty-message">Add images to the gallery</div>'
                    }
                </div>
            `;
        }
    }
}

customElements.define('ui-basic-gallery', BasicGallery); 