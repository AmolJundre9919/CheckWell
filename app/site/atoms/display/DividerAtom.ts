import { BaseComponent } from "../../BaseComponent";
import { Theme, defaultTheme } from "../../theme/theme";

interface Divider extends BaseComponent {
  type: 'divider';
  orientation: 'horizontal' | 'vertical';
  thickness: number;
}

interface DividerAtomProps {
  color?: string;
  thickness?: number;
  orientation?: 'horizontal' | 'vertical';
  length?: string;
}

export class DividerAtom extends BaseComponent implements Divider {
  protected theme: Theme = defaultTheme;
  type: 'divider' = 'divider';
  orientation: 'horizontal' | 'vertical' = 'horizontal';
  thickness: number = 1;
  
  props: DividerAtomProps = {
    color: '#E5E7EB',
    thickness: this.thickness,
    orientation: this.orientation,
    length: '100%'
  };

  static get observedAttributes(): string[] {
    return ['color', 'thickness', 'orientation', 'length'];
  }

  constructor() {
    super();
    this.createStyles(`
      .divider-atom {
        display: block;
      }
    `);
  }

  protected render(): void {
    const { color, thickness, orientation, length } = this.props;
    const style = orientation === 'horizontal'
      ? `width: ${length}; height: ${thickness}px;`
      : `height: ${length}; width: ${thickness}px;`;

    this._shadowRoot.innerHTML = `
      <div 
        class="divider-atom"
        style="background-color: ${color}; ${style}"
        data-orientation="${orientation}"
      ></div>
    `;
  }
}

customElements.define('ui-divider', DividerAtom); 