// Theme System
interface Theme {
  palette: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };
  typography: {
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    body1: TypographyStyle;
    body2: TypographyStyle;
    button: TypographyStyle;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
    round: string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  shadows: {
    sm: string;
    md: string;
    lg: string;
  };
}

interface TypographyStyle {
  fontSize: string;
  fontWeight: string;
  lineHeight: string;
  fontFamily: string;
  letterSpacing?: string;
}

// Component System
interface ComponentProperty {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'object';
  required: boolean;
  default?: any;
  validation?: (value: any) => boolean;
}

interface CustomComponent {
  tag: string;
  properties: ComponentProperty[];
  defaultContent?: string;
  allowsNesting: boolean;
  allowedChildren?: string[];
  themeStyles?: (theme: Theme) => string;
  generateAIPrompt?: (description: string) => string;
}

// AI Service Interface
interface AIService {
  generateText(prompt: string): Promise<string>;
  generateImage(prompt: string): Promise<string>;
  generateTemplate(description: string): Promise<Template>;
  generateComponentContent(component: CustomComponent, description: string): Promise<any>;
}

// Template Types
interface Template {
  id: string;
  html: string;
  css: string;
  assets: Asset[];
  meta: {
    title: string;
    description: string;
    keywords: string[];
  };
}

interface Asset {
  id: string;
  type: 'image' | 'font' | 'icon' | 'video';
  url: string;
  alt?: string;
}

// Component Registry Implementation
class ComponentRegistry {
  private static instance: ComponentRegistry;
  private components: Map<string, CustomComponent>;

  private constructor() {
    this.components = new Map();
    this.registerDefaultComponents();
  }

  static getInstance(): ComponentRegistry {
    if (!ComponentRegistry.instance) {
      ComponentRegistry.instance = new ComponentRegistry();
    }
    return ComponentRegistry.instance;
  }

  private registerDefaultComponents() {
    // Layout Components
    this.registerComponent(this.createLayoutContainer());
    this.registerComponent(this.createLayoutGrid());
    this.registerComponent(this.createLayoutCard());

    // Navigation Components
    this.registerComponent(this.createNavMenu());
    this.registerComponent(this.createNavItem());

    // Content Components
    this.registerComponent(this.createHero());
    this.registerComponent(this.createFeatureSection());
    this.registerComponent(this.createTestimonial());
    this.registerComponent(this.createPricing());
    
    // Form Components
    this.registerComponent(this.createContactForm());
    this.registerComponent(this.createFormInput());
    this.registerComponent(this.createFormButton());
  }

  private createLayoutContainer(): CustomComponent {
    return {
      tag: 'layout-container',
      allowsNesting: true,
      properties: [
        { name: 'maxWidth', type: 'string', required: false, default: 'lg' },
        { name: 'padding', type: 'string', required: false, default: 'md' },
        { name: 'background', type: 'string', required: false }
      ],
      themeStyles: (theme: Theme) => `
        max-width: var(--container-${theme.breakpoints.lg});
        padding: ${theme.spacing.md};
        margin: 0 auto;
      `
    };
  }

  private createHero(): CustomComponent {
    return {
      tag: 'hero-section',
      allowsNesting: true,
      properties: [
        { name: 'title', type: 'string', required: true },
        { name: 'subtitle', type: 'string', required: false },
        { name: 'backgroundImage', type: 'string', required: false },
        { name: 'height', type: 'string', required: false, default: 'md' }
      ],
      generateAIPrompt: (description: string) => 
        `Generate a compelling hero section title and subtitle for a business described as: ${description}`,
      themeStyles: (theme: Theme) => `
        min-height: 60vh;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background-color: ${theme.palette.primary};
        color: ${theme.palette.background};
      `
    };
  }

  private createTestimonial(): CustomComponent {
    return {
      tag: 'testimonial-card',
      allowsNesting: false,
      properties: [
        { name: 'quote', type: 'string', required: true },
        { name: 'author', type: 'string', required: true },
        { name: 'role', type: 'string', required: false },
        { name: 'avatarUrl', type: 'string', required: false }
      ],
      generateAIPrompt: (description: string) =>
        `Generate a realistic testimonial for a business described as: ${description}`,
      themeStyles: (theme: Theme) => `
        padding: ${theme.spacing.lg};
        border-radius: ${theme.borderRadius.md};
        background: ${theme.palette.background};
        box-shadow: ${theme.shadows.md};
      `
    };
  }

  // ... other component creation methods

  registerComponent(component: CustomComponent) {
    this.components.set(component.tag, component);
  }

  getComponent(tag: string): CustomComponent | undefined {
    return this.components.get(tag);
  }
}

// Theme-aware Template Builder
class ThemeAwareTemplateBuilder {
  private registry: ComponentRegistry;
  private theme: Theme;
  private template: Template;
  private aiService: AIService;

  constructor(theme: Theme, aiService: AIService) {
    this.registry = ComponentRegistry.getInstance();
    this.theme = theme;
    this.aiService = aiService;
    this.template = this.initializeTemplate();
  }

  private initializeTemplate(): Template {
    return {
      id: crypto.randomUUID(),
      html: '',
      css: '',
      assets: [],
      meta: {
        title: '',
        description: '',
        keywords: []
      }
    };
  }

  async addComponentWithAI(tag: string, description: string, baseProps: Record<string, any> = {}) {
    const component = this.registry.getComponent(tag);
    if (!component) throw new Error(`Component ${tag} not found`);

    const aiContent = component.generateAIPrompt
      ? await this.aiService.generateComponentContent(component, description)
      : {};

    const props = { ...baseProps, ...aiContent };
    this.addComponent(tag, props);
  }

  private addComponent(tag: string, props: Record<string, any>) {
    const component = this.registry.getComponent(tag);
    if (!component) throw new Error(`Component ${tag} not found`);

    // Generate themed styles
    if (component.themeStyles) {
      const styles = component.themeStyles(this.theme);
      this.template.css += `
        ${tag} {
          ${styles}
        }
      `;
    }

    // Generate component HTML
    const propsString = Object.entries(props)
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ');

    this.template.html += `<${tag} ${propsString}></${tag}>\n`;
  }

  getTemplate(): Template {
    return this.template;
  }
}

// OpenAI Service Implementation
class OpenAIService implements AIService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateText(prompt: string): Promise<string> {
    // Implementation using OpenAI API
    return 'Generated text';
  }

  async generateImage(prompt: string): Promise<string> {
    // Implementation using OpenAI API
    return 'image_url';
  }

  async generateComponentContent(component: CustomComponent, description: string): Promise<any> {
    if (!component.generateAIPrompt) return {};

    const prompt = component.generateAIPrompt(description);
    const content = await this.generateText(prompt);
    
    // Parse and structure the content based on component type
    return this.parseAIContent(component.tag, content);
  }

  async generateTemplate(description: string): Promise<Template> {
    const builder = new ThemeAwareTemplateBuilder(defaultTheme, this);
    
    // Generate a complete website structure
    await builder.addComponentWithAI('hero-section', description);
    await builder.addComponentWithAI('feature-section', description);
    await builder.addComponentWithAI('testimonial-card', description);
    await builder.addComponentWithAI('contact-form', description);

    return builder.getTemplate();
  }

  private parseAIContent(componentType: string, content: string): any {
    // Implement parsing logic based on component type
    return { content };
  }
}

// Website Generator
class WebsiteGenerator {
  private aiService: AIService;
  private theme: Theme;

  constructor(aiService: AIService, theme: Theme) {
    this.aiService = aiService;
    this.theme = theme;
  }

  async generateWebsite(description: string): Promise<Template> {
    const template = await this.aiService.generateTemplate(description);
    return this.applyTheme(template);
  }

  private applyTheme(template: Template): Template {
    // Apply theme variables and styles
    const themeStyles = this.generateThemeStyles();
    template.css = `${themeStyles}\n${template.css}`;
    return template;
  }

  private generateThemeStyles(): string {
    return `
      :root {
        --primary: ${this.theme.palette.primary};
        --secondary: ${this.theme.palette.secondary};
        --background: ${this.theme.palette.background};
        --text: ${this.theme.palette.text};
        /* ... other theme variables ... */
      }
    `;
  }
}



export {
  WebsiteGenerator,
  ComponentRegistry,
  ThemeAwareTemplateBuilder,
  OpenAIService,
  type Theme,
  type CustomComponent,
  type Template
};