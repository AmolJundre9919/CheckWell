import { BaseComponent } from "app/site/BaseComponent";
import { Theme, defaultTheme } from "app/site/theme/theme";

export class Tabs extends BaseComponent {
  private tabs: { label: string; content: string }[] = [];
  private activeTabIndex: number = 0;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["tabs", "activeTabIndex"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue === newValue) return;

    switch (name) {
      case "tabs":
        try {
          this.tabs = JSON.parse(newValue);
        } catch {
          console.error("Invalid tabs JSON format");
          this.tabs = [];
        }
        break;
      case "activeTabIndex":
        const index = parseInt(newValue, 10);
        if (!isNaN(index) && index >= 0 && index < this.tabs.length) {
          this.activeTabIndex = index;
        }
        break;
    }
    this.render();
  }

  connectedCallback() {
    this.render();
  }

  private selectTab(index: number) {
    if (index === this.activeTabIndex) return;

    this.activeTabIndex = index;
    this.setAttribute("activeTabIndex", index.toString());
    this.render();
  }

  private getStyles(theme: Theme = defaultTheme) {
    return `
      :host {
        display: block;
        font-family: ${theme.typography.base};
      }

      .tabs {
        display: flex;
        border-bottom: 2px solid ${theme.colors.border};
        margin-bottom: 16px;
      }

      .tab {
        padding: 12px 16px;
        cursor: pointer;
        user-select: none;
        font-weight: bold;
        text-align: center;
        transition: color 0.3s, background-color 0.3s;
        flex: 1;
      }

      .tab.active {
        color: ${theme.colors.text}; /* Replace activeText */
        background-color: ${theme.colors.lightBackground}; /* Replace active */
        border-bottom: 2px solid ${theme.colors.border};
      }

      .tab:not(.active):hover {
        background-color: ${theme.colors.hover};
      }

      .tab-content {
        padding: 16px;
        background: ${theme.colors.background};
        border: 1px solid ${theme.colors.border};
        border-radius: 4px;
      }
    `;
  }

  protected render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>${this.getStyles()}</style>
      <div class="tabs">
        ${this.tabs
          .map(
            (tab, index) => `
              <div 
                class="tab ${index === this.activeTabIndex ? "active" : ""}"
                role="tab"
                aria-selected="${index === this.activeTabIndex}"
                tabindex="0"
                data-index="${index}">
                ${tab.label}
              </div>
            `
          )
          .join("")}
      </div>
      <div class="tab-content" role="tabpanel">
        ${this.tabs[this.activeTabIndex]?.content || ""}
      </div>
    `;

    this.attachEventListeners();
  }

  private attachEventListeners() {
    const tabs = this.shadowRoot?.querySelectorAll(".tab");

    tabs?.forEach((tab, index) => {
      tab.addEventListener("click", () => this.selectTab(index));
    });
  }
}

customElements.define("w-tabs", Tabs);
