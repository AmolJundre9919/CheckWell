import React from 'react';
import { ComponentCategory } from '../types/editor.types';

// Update to create a wrapper that renders the custom element directly
const createUIComponent = (tag: string): React.ComponentType<any> => {
  return React.forwardRef((props: any, ref) => {
    const { children, text, ...rest } = props;
    const element = document.createElement(tag);
    
    // Set properties
    Object.entries(rest).forEach(([key, value]) => {
      element.setAttribute(key, String(value));
    });

    // Handle text content
    if (text) {
      element.textContent = text;
    }

    // Handle children
    if (children) {
      if (typeof children === 'string') {
        element.textContent = children;
      } else {
        element.appendChild(children);
      }
    }

    return element;
  });
};

// Update the ComponentDefinition interface
export interface ComponentDefinition {
  type: ComponentCategory;
  name: string;
  tagName: string;
  icon: string;
  defaultProps: Record<string, any>;
  editableProps: string[];
}

// Convert imported components into component definitions
const createComponentDefinition = (
  name: string, 
  category: ComponentCategory,
  tagName: string
): ComponentDefinition => ({
  type: category,
  name,
  tagName,  // Store the tag name instead of component
  icon: getComponentIcon(name),
  defaultProps: getDefaultProps(name),
  editableProps: getEditableProps(name)
});

const getComponentIcon = (name: string): string => {
  const icons: Record<string, string> = {
    Button: '🔘',
    Input: '📝',
    Badge: '🏷️',
    Avatar: '👤',
    Typography: '📄',
    Logo: '🎨',
    Card: '🗂️',
    SearchBar: '🔍',
    Header: '📑',
  };
  return icons[name] || '📦';
};

const getDefaultProps = (name: string): Record<string, any> => {
  const defaults: Record<string, Record<string, any>> = {
    Button: { variant: 'primary', text: 'Button' },
    Input: { placeholder: 'Enter text...' },
    Badge: { variant: 'default', text: 'Badge' },
    Avatar: { alt: 'Avatar' },
    Typography: { variant: 'body', text: 'Text' },
    Logo: { alt: 'Logo' },
    Card: { title: 'Card Title', content: 'Card Content' },
    SearchBar: { placeholder: 'Search...' },
    Header: { title: 'Header' },
    Grid: { columns: '12', gap: 'md' },
    Container: { size: 'lg', padding: 'md' }
  };
  return defaults[name] || {};
};

const getEditableProps = (name: string): string[] => {
  const editableProps: Record<string, string[]> = {
    Button: ['variant', 'children', 'disabled'],
    Input: ['placeholder', 'type', 'disabled'],
    Badge: ['variant', 'children'],
    Avatar: ['src', 'alt', 'size'],
    Typography: ['variant', 'children', 'color'],
    Logo: ['src', 'alt', 'width', 'height'],
    Card: ['title', 'content', 'variant'],
    SearchBar: ['placeholder'],
    Header: ['title', 'subtitle'],
  };
  return editableProps[name] || [];
};

// Create the registry of all available components
export const componentRegistry: ComponentDefinition[] = [
  // Atoms
  createComponentDefinition('Button', 'atoms', 'ui-button'),
  createComponentDefinition('Input', 'atoms', 'ui-input'),
  createComponentDefinition('Badge', 'atoms', 'ui-badge'),
  createComponentDefinition('Avatar', 'atoms', 'ui-avatar'),
  createComponentDefinition('Typography', 'atoms', 'ui-typography'),
  createComponentDefinition('Logo', 'atoms', 'ui-logo'),
  createComponentDefinition('Grid', 'atoms', 'ui-grid'),
  createComponentDefinition('Container', 'atoms', 'ui-container'),

  // Molecules
  createComponentDefinition('Card', 'molecules', 'ui-card'),
  createComponentDefinition('SearchBar', 'molecules', 'ui-search-bar'),
  createComponentDefinition('Header', 'molecules', 'ui-header')
];

export const getComponentsByCategory = (category: 'atoms' | 'molecules' | 'organisms') => {
  return componentRegistry.filter(comp => comp.type === category);
};

export const getComponentByName = (name: string) => {
  return componentRegistry.find(comp => comp.name === name);
}; 