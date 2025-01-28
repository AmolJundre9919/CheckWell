import { BaseComponent } from "app/site/BaseComponent";
import { Theme, defaultTheme } from "app/site/theme/theme";

export class Accordion extends BaseComponent {
  private items: { title: string; content: string }[] = [];
  private multiExpand: boolean = false;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["items", "multiExpand"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "items":
        try {
          this.items = JSON.parse(newValue);
        } catch {
          console.error("Invalid items JSON format");
          this.items = [];
        }
        break;
      case "multiExpand":
        this.multiExpand = newValue !== null && newValue !== "false";
        break;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  private toggleSection = (index: number) => {
    const contentElements = this.shadowRoot?.querySelectorAll(
      ".accordion-content"
    );
    const headerElements = this.shadowRoot?.querySelectorAll(".accordion-header");

    if (!contentElements || !headerElements) return;

    contentElements.forEach((content, i) => {
      if (i === index) {
        const isExpanded = content.classList.contains("expanded");
        if (isExpanded) {
          content.classList.remove("expanded");
          content.setAttribute("aria-hidden", "true");
          headerElements[i].setAttribute("aria-expanded", "false");
        } else {
          if (!this.multiExpand) {
            this.collapseAll();
          }
          content.classList.add("expanded");
          content.setAttribute("aria-hidden", "false");
          headerElements[i].setAttribute("aria-expanded", "true");
        }
      }
    });
  };

  private collapseAll() {
    const contentElements = this.shadowRoot?.querySelectorAll(
      ".accordion-content"
    );
    const headerElements = this.shadowRoot?.querySelectorAll(".accordion-header");

    contentElements?.forEach((content) => {
      content.classList.remove("expanded");
      content.setAttribute("aria-hidden", "true");
    });

    headerElements?.forEach((header) => {
      header.setAttribute("aria-expanded", "false");
    });
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }

      .accordion-item {
        margin-bottom: 8px;
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
        overflow: hidden;
      }

      .accordion-header {
        background: ${theme.colors.background};
        padding: 12px;
        cursor: pointer;
        font-weight: bold;
        user-select: none;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: background-color 0.3s;
      }

      .accordion-header:hover {
        background: ${theme.colors.hover};
      }

      .accordion-content {
        max-height: 0;
        overflow: hidden;
        padding: 0 12px;
        background: ${theme.colors.lightBackground};
        transition: max-height 0.3s ease;
      }

      .accordion-content.expanded {
        max-height: 200px;
        padding: 12px;
      }

      .icon {
        transition: transform 0.3s ease;
      }

      .expanded .icon {
        transform: rotate(180deg);
      }
    `;
  }

  protected render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="accordion">
        ${this.items
          .map(
            (item, index) => `
          <div class="accordion-item">
            <div class="accordion-header" 
                 role="button" 
                 tabindex="0" 
                 aria-expanded="false" 
                 aria-controls="content-${index}" 
                 data-index="${index}">
              <span>${item.title}</span>
              <span class="icon">▼</span>
            </div>
            <div class="accordion-content" 
                 id="content-${index}" 
                 role="region" 
                 aria-hidden="true">
              ${item.content}
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners() {
    const headers = this.shadowRoot?.querySelectorAll(".accordion-header");

    headers?.forEach((header, index) => {
      header.addEventListener("click", () => this.toggleSection(index));
    });
  }
}

customElements.define("w-accordion", Accordion);
