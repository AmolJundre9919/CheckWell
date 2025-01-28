import { BaseComponent } from "../../BaseComponent";

type IconSize = "small" | "medium" | "large";
type IconShape = "square" | "circle" | "rounded";

interface IconBoxProps {
  icon: string; // Unicode, text, or icon name
  label?: string;
  size?: IconSize;
  shape?: IconShape;
  color?: string;
  backgroundColor?: string;
  border?: string; // Border style (e.g., "1px solid #000")
  padding?: string; // Padding inside the icon box
  margin?: string; // Margin around the icon box
  labelPosition?: "top" | "right" | "bottom" | "left"; // Position of the label
  labelColor?: string; // Color of the label text
  labelFontSize?: string; // Font size of the label
  hoverColor?: string; // Color of the icon on hover
  hoverBackgroundColor?: string; // Background color on hover
}

export class IconBox extends BaseComponent implements IconBoxProps {
  icon: string = "⭐";
  label?: string = undefined;
  size: IconSize = "medium";
  shape: IconShape = "square";
  color: string = "#000";
  backgroundColor: string = "#fff";
  border: string = "none";
  padding: string = "8px";
  margin: string = "0";
  labelPosition: "top" | "right" | "bottom" | "left" = "right";
  labelColor: string = "#000";
  labelFontSize: string = "14px";
  hoverColor: string = "#fff";
  hoverBackgroundColor: string = "#007bff";

  static get observedAttributes(): string[] {
    return [
      "icon",
      "label",
      "size",
      "shape",
      "color",
      "backgroundColor",
      "border",
      "padding",
      "margin",
      "labelPosition",
      "labelColor",
      "labelFontSize",
      "hoverColor",
      "hoverBackgroundColor",
    ];
  }

  constructor() {
    super();
    this.createStyles(`
      :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-family: Arial, sans-serif;
        cursor: pointer;
        margin: ${this.margin};
      }
      .icon-box {
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        padding: ${this.padding};
        border: ${this.border};
        transition: all 0.3s ease;
      }
      .icon-box.small {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }
      .icon-box.medium {
        width: 60px;
        height: 60px;
        font-size: 24px;
      }
      .icon-box.large {
        width: 80px;
        height: 80px;
        font-size: 32px;
      }
      .icon-box.square {
        border-radius: 0;
      }
      .icon-box.rounded {
        border-radius: 8px;
      }
      .icon-box.circle {
        border-radius: 50%;
      }
      .icon-box:hover {
        color: ${this.hoverColor};
        background-color: ${this.hoverBackgroundColor};
      }
      .label {
        color: ${this.labelColor};
        font-size: ${this.labelFontSize};
        margin: ${this.labelPosition === "top" || this.labelPosition === "bottom" ? "8px 0" : "0 8px"};
        order: ${this.labelPosition === "top" || this.labelPosition === "left" ? "-1" : "1"};
      }
      :host([labelPosition="top"]) .label {
        flex-direction: column-reverse;
      }
      :host([labelPosition="bottom"]) .label {
        flex-direction: column;
      }
      :host([labelPosition="left"]) {
        flex-direction: row-reverse;
      }
      :host([labelPosition="right"]) {
        flex-direction: row;
      }
    `);
  }

  protected render(): void {
    const sizeClass =
      this.size === "small"
        ? "small"
        : this.size === "large"
        ? "large"
        : "medium";

    const shapeClass =
      this.shape === "rounded"
        ? "rounded"
        : this.shape === "circle"
        ? "circle"
        : "square";

    const labelHTML = this.label
      ? `<span class="label" style="color: ${this.labelColor}; font-size: ${this.labelFontSize};">${this.label}</span>`
      : "";

    this._shadowRoot.innerHTML = `
      <div
        class="icon-box ${sizeClass} ${shapeClass}"
        style="color: ${this.color}; background-color: ${this.backgroundColor}; border: ${this.border}; padding: ${this.padding}; margin: ${this.margin};"
      >
        ${this.icon}
      </div>
      ${labelHTML}
    `;
  }
}

customElements.define("ui-icon-box", IconBox);
