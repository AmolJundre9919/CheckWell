import { BaseComponent } from "../../BaseComponent";

interface ImageCarouselProps {
  images: { src: string; alt: string }[];
  autoPlay?: boolean;
  interval?: number;
}

export class ImageCarouselAtom extends BaseComponent implements ImageCarouselProps {
  images: { src: string; alt: string }[] = [];
  autoPlay: boolean = false;
  interval: number = 3000;
  currentIndex: number = 0;
  autoPlayTimer: any;

  static get observedAttributes(): string[] {
    return ['images', 'autoPlay', 'interval'];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: block;
        overflow: hidden;
        position: relative;
        width: 100%;
        max-width: 600px;
        height: 400px;
      }
      .carousel {
        display: flex;
        transition: transform 0.5s ease;
      }
      .carousel img {
        min-width: 100%;
        height: auto;
      }
      .controls {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .control-btn {
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border: none;
        cursor: pointer;
        padding: 0.5rem;
        font-size: 1.5rem;
      }
    `);
  }

  connectedCallback(): void {
    if (this.autoPlay) {
      this.autoPlayTimer = setInterval(
        () => this.nextSlide(),
        this.interval
      );
    }
  }

  disconnectedCallback(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
    }
  }

  protected render(): void {
    const carouselItems = this.images
      .map(
        (img, index) =>
          `<img src="${img.src}" alt="${img.alt}" ${
            this.currentIndex === index ? '' : 'style="display: none;"'
          } />`
      )
      .join('');

    this._shadowRoot.innerHTML = `
      <div class="carousel">
        ${carouselItems}
      </div>
      <div class="controls">
        <button class="control-btn prev" @click="${() =>
          this.prevSlide()}">◀</button>
        <button class="control-btn next" @click="${() =>
          this.nextSlide()}">▶</button>
      </div>
    `;
  }

  private prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.render();
  }

  private nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.render();
  }
}

customElements.define('ui-image-carousel', ImageCarouselAtom);
