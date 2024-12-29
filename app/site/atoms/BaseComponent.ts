/// <reference lib="dom" />

import { Theme, defaultTheme } from '../theme/theme';

interface ComponentProps {
  [key: string]: any;
}

interface StyleSheet {
  replaceSync(cssText: string): void;
}

// Base class for all components
export abstract class BaseComponent extends HTMLElement {
  declare public _shadowRoot: ShadowRoot;
  protected theme: Theme = defaultTheme;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  // Utility method to set component properties
  protected setProps(props: ComponentProps): void {
    Object.entries(props).forEach(([key, value]) => {
      if (this[key as keyof this] !== value) {
        (this[key as keyof this] as any) = value;
        this.render();
      }
    });
  }

  // Abstract method to be implemented by child classes
  protected abstract render(): void;

  // Lifecycle method when component is added to DOM
  connectedCallback(): void {
    this.render();
  }

  get root(): ShadowRoot {
    return this._shadowRoot;
  }
  // Helper method to create styles
  protected createStyles(styles: string): void {
    const styleSheet = new CSSStyleSheet() as StyleSheet;
    styleSheet.replaceSync(styles);
    this._shadowRoot.adoptedStyleSheets = [styleSheet as any];
  }

  generatePreviewHTML(): string {
    return this._shadowRoot.innerHTML;
  }
}