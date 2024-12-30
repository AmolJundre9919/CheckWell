# Web Component Development Guide

This guide explains how to create and add new components to our design system using Web Components (Custom Elements) with TypeScript.

## Directory Structure

```
app/site/
├── atoms/
│   ├── BaseComponent.ts
│   ├── inputs/
│   │   ├── ButtonAtom.ts
│   │   └── InputAtom.ts
│   └── display/
│       ├── BadgeAtom.ts
│       └── AvatarAtom.ts
├── molecules/
│   └── CardMolecule.ts
├── theme/
│   └── theme.ts
└── types/
    └── custom-elements.d.ts
```

## Adding New Components

### 1. Create a New Component

Create a new file in the appropriate directory (`atoms/` or `molecules/`). Use the following template:

```typescript
import { BaseComponent } from '../BaseComponent';

// Define component props interface
interface YourComponentProps {
  prop1: string;
  prop2: boolean;
  // ... other props
}

export class YourComponent extends BaseComponent implements YourComponentProps {
  // Define default values for props
  prop1: string = 'default';
  prop2: boolean = false;

  // Define observable attributes
  static get observedAttributes(): string[] {
    return ['prop1', 'prop2'];
  }

  constructor() {
    super();
    this.createStyles(`
      // Your component styles here
      :host {
        display: block;
      }
      
      .your-component {
        // Use theme variables
        color: ${this.theme.colors.primary};
        padding: ${this.theme.spacing.md};
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <div class="your-component">
        // Your component template here
        <slot></slot>
      </div>
    `;
  }
}

// Register the component
customElements.define('ui-your-component', YourComponent);
```

### 2. Update Type Definitions

Add your component to `types/custom-elements.d.ts`:

```typescript
declare namespace JSX {
  interface IntrinsicElements {
    'ui-your-component': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      prop1?: string;
      prop2?: boolean;
    }, HTMLElement>;
  }
}
```

### 3. Add to Component Registry

Update the component registry in `website-editor-viewport.tsx`:

```typescript
const componentRegistry: Record<string, ComponentDefinition> = {
  // ... existing components
  yourComponent: {
    type: 'atoms', // or 'molecules'
    name: 'Your Component',
    defaultProps: {
      prop1: 'default',
      prop2: false
    },
    editableProps: ['prop1', 'prop2']
  }
};
```

### 4. Export the Component

Add your component to `Components.ts`:

```typescript
export * from './atoms/your-component/YourComponent';
```

## Best Practices

1. **Naming Conventions**:
   - Files: PascalCase with Atom/Molecule suffix (e.g., `ButtonAtom.ts`)
   - Components: PascalCase (e.g., `class ButtonAtom`)
   - Custom element tags: kebab-case with 'ui-' prefix (e.g., `ui-button`)

2. **Component Organization**:
   - Atoms: Basic building blocks (buttons, inputs, badges)
   - Molecules: Combinations of atoms (cards, form groups)

3. **Theming**:
   - Always use theme variables from `theme.ts`
   - Access via `this.theme.colors` or `this.theme.spacing`

4. **Props and Attributes**:
   - Define clear interfaces for props
   - Use observedAttributes for reactive properties
   - Provide sensible defaults

5. **Styling**:
   - Use Shadow DOM for style encapsulation
   - Follow BEM naming convention for classes
   - Use CSS custom properties for theming

## Example: Adding a New Atom

Here's an example of adding a new Toggle component:

```typescript
// atoms/inputs/ToggleAtom.ts
import { BaseComponent } from '../BaseComponent';

interface ToggleProps {
  checked: boolean;
  disabled: boolean;
  label: string;
}

export class ToggleAtom extends BaseComponent implements ToggleProps {
  checked: boolean = false;
  disabled: boolean = false;
  label: string = '';

  static get observedAttributes(): string[] {
    return ['checked', 'disabled', 'label'];
  }

  constructor() {
    super();
    this.createStyles(`
      .toggle {
        display: flex;
        align-items: center;
        gap: ${this.theme.spacing.sm};
      }

      .switch {
        position: relative;
        width: 40px;
        height: 24px;
        background: ${this.theme.colors.secondary};
        border-radius: 12px;
        transition: background 0.2s;
      }

      .switch[checked] {
        background: ${this.theme.colors.primary};
      }

      .switch::after {
        content: '';
        position: absolute;
        width: 20px;
        height: 20px;
        background: white;
        border-radius: 50%;
        top: 2px;
        left: 2px;
        transition: transform 0.2s;
      }

      .switch[checked]::after {
        transform: translateX(16px);
      }
    `);
  }

  protected render(): void {
    this._shadowRoot.innerHTML = `
      <label class="toggle">
        <div 
          class="switch" 
          ?checked="${this.checked}"
          ?disabled="${this.disabled}"
        ></div>
        <span>${this.label}</span>
      </label>
    `;
  }
}

customElements.define('ui-toggle', ToggleAtom);
```

## Testing Components

1. Create a test page to preview your component
2. Test all props and interactions
3. Verify theme integration
4. Test accessibility
5. Test responsive behavior

## Troubleshooting

### Common Issues

1. **Component not rendering**:
   - Check if the component is properly registered with `customElements.define`
   - Verify the import path in `Components.ts`
   - Check browser console for errors

2. **Styles not applying**:
   - Verify the styles are properly defined in `createStyles`
   - Check if theme variables are correctly accessed
   - Ensure Shadow DOM is properly initialized

3. **Props not updating**:
   - Verify props are listed in `observedAttributes`
   - Check if the property is properly typed in the interface
   - Ensure the render method is called when props change

### Need Help?

- Check existing components for reference
- Review the theme documentation
- Follow TypeScript best practices
- Test thoroughly before committing

## Component Checklist

Before submitting a new component, ensure:

- [ ] Component extends BaseComponent
- [ ] Props interface is defined
- [ ] Types are added to custom-elements.d.ts
- [ ] Component is registered in registry
- [ ] Component is exported in Components.ts
- [ ] Styles use theme variables
- [ ] Tests are written and passing
- [ ] Documentation is updated 