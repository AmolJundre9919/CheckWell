import React from 'react';
import { ComponentCategory, PropertyDefinition } from '../types/editor.types';
import { Image } from 'lucide-react';
import { PlacedComponent } from '../types/editor.types';
import {GoogleMapAtom} from '@/app/site/atoms/display/GoogleMapAtom';
import { defaultTheme } from '../../site/theme/theme';

// Update to create a wrapper that renders the custom element using React
const createUIComponent = (tag: string): React.ComponentType<any> => {
  return React.forwardRef((props: any, ref) => {
    const { children, text, ...rest } = props;
    return React.createElement(tag, { ...rest, ref }, children || text);
  });
};

// Update the ComponentDefinition interface
export interface ComponentDefinition {
  type: ComponentCategory;
  name: string;
  tagName: string;
  icon: React.ReactNode;
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
  tagName,
  icon: getComponentIcon(name),
  defaultProps: getDefaultProps(name),
  editableProps: getEditableProps(name)
});

const getComponentIcon = (name: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    Button: '🔘',
    Input: '📝',
    Badge: '🏷️',
    Avatar: '👤',
    Typography: '📄',
    Logo: '🎨',
    Card: '🗂️',
    SearchBar: '🔍',
    Header: '📑',
    Navigation: '🔗',
    NavigationLink: '🔗',
    Grid: '📏',
    Container: '📦',
    Divider: '➖',
    Image: React.createElement(Image),
    Icon: '🎨',
    Spinner: '🔄',
    Checkbox: '☑️',
    Switch: '🔘',
    Chip: '🏷️',
    Counter: '🔢',
    BasicGallery: '🖼️',
    Alert: '🔔',
    ReadMore: '📖',
  };
  return icons[name] || '📦';
};

const getDefaultProps = (name: string): Record<string, any> => {
  const defaults: Record<string, Record<string, any>> = {
    Icon: { name: '🎨', size: 'medium' },
    Button: { variant: 'primary', text: 'Button' },
    Input: { placeholder: 'Enter text...' },
    Badge: { variant: 'default', text: 'Badge' },
    Avatar: { alt: 'Avatar' },
    Typography: { variant: 'body', text: 'Text' },
    Logo: { alt: 'Logo' },
    Card: { title: 'Card Title', content: 'Card Content' },
    SearchBar: { placeholder: 'Search...' },
    Header: { title: 'Header' },
    Navigation: { icon: '🔗', label: 'Navigation Item' },
    NavigationLink: { href: '#', text: 'Link', active: false },
    Grid: { columns: '12', gap: 'md' },
    Container: { size: 'lg', padding: 'md' },
    Divider: { orientation: 'horizontal', thickness: 1, color: '#E5E7EB' },
    Image: {
      src: 'https://via.placeholder.com/300x200',
      alt: 'Placeholder image',
      size: 'medium',
      border: 'none',
      width: 300,
      height: 200
    },
    Spinner: { 
      size: 'medium',
      variant: 'circle'
    },
    Checkbox: { 
      label: 'Checkbox',
      checked: false
    },
    Switch: { 
      label: 'Switch',
      checked: false
    },
    Chip: {
      label: 'Chip Label',
      icon: '🔵',
      variant: 'default',
      size: 'medium'
    },
    Counter: {
      value: 0,
      min: 0,
      max: 100,
      step: 1,
      label: 'Counter',
      variant: 'default',
      size: 'medium'
    },
    BasicGallery: {
      images: JSON.stringify([
        'https://via.placeholder.com/400x300/FF5733/FFFFFF',
        'https://via.placeholder.com/400x300/33FF57/FFFFFF',
        'https://via.placeholder.com/400x300/5733FF/FFFFFF'
      ]),
      columns: 3,
      gap: 16,
      imageHeight: 200,
      borderRadius: 8,
      title: 'Image Gallery'
    },
    Alert: {
      message: 'This is an alert message',
      type: 'info',
      title: 'Alert Title',
      dismissible: true,
      icon: ''
    },
    ReadMore: {
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      maxLength: 150,
      expandText: 'Read More',
      collapseText: 'Show Less',
      expanded: false
    },
  };
  return defaults[name] || {};
};

const getEditableProps = (name: string): string[] => {
  const editableProps: Record<string, string[]> = {
    Icon: ['name', 'size', 'color'],
    Button: ['variant', 'text', 'disabled'],
    Input: ['placeholder', 'type', 'disabled', 'label', 'required'],
    Badge: ['variant', 'text'],
    Avatar: ['src', 'alt', 'size', 'initials'],
    Typography: ['variant', 'text', 'color', 'weight', 'align'],
    Logo: ['src', 'alt', 'width', 'height'],
    Card: ['title', 'content', 'variant', 'padding', 'elevation'],
    SearchBar: ['placeholder', 'variant', 'size', 'disabled', 'clearable'],
    Header: ['variant', 'sticky', 'logoSrc', 'logoAlt'],
    Navigation: ['icon', 'label', 'badgeText'],
    NavigationLink: ['href', 'text', 'active'],
    Grid: ['columns', 'gap'],
    Container: ['size', 'padding'],
    Divider: ['color', 'thickness', 'orientation', 'length'],
    Image: ['src', 'alt', 'size', 'border', 'width', 'height'],
    Spinner: ['size', 'variant'],
    Checkbox: ['label', 'checked'],
    Switch: ['label', 'checked'],
    Chip: ['label', 'icon', 'variant', 'size'],
    Counter: ['value', 'min', 'max', 'step', 'label', 'variant', 'size'],
    BasicGallery: ['images', 'columns', 'gap', 'image-height', 'border-radius', 'title'],
    Alert: ['message', 'type', 'title', 'dismissible', 'icon'],
    ReadMore: ['content', 'max-length', 'expand-text', 'collapse-text', 'expanded'],
  };
  return editableProps[name] || [];
};

// Create the registry of all available components
export const componentRegistry: ComponentDefinition[] = [
  // Atoms
  createComponentDefinition('Button', 'atoms', 'ui-button'),
  createComponentDefinition('Input', 'atoms', 'ui-input'),
  createComponentDefinition('Checkbox', 'atoms', 'ui-checkbox'),
  createComponentDefinition('Switch', 'atoms', 'ui-switch'),
  createComponentDefinition('Badge', 'atoms', 'ui-badge'),
  createComponentDefinition('Avatar', 'atoms', 'ui-avatar'),
  createComponentDefinition('Typography', 'atoms', 'ui-typography'),
  createComponentDefinition('Logo', 'atoms', 'ui-logo'),
  createComponentDefinition('Grid', 'atoms', 'ui-grid'),
  createComponentDefinition('Container', 'atoms', 'ui-container'),
  createComponentDefinition('NavigationLink', 'atoms', 'ui-nav-link'),
  createComponentDefinition('Navigation', 'atoms', 'ui-navigation'),
  createComponentDefinition('Divider', 'atoms', 'ui-divider'),
  createComponentDefinition('Image', 'atoms', 'ui-image'),
  createComponentDefinition('GoogleMap', 'atoms', 'ui-google-map'),
  createComponentDefinition('Spinner', 'atoms', 'ui-spinner'),
  createComponentDefinition('Icon', 'atoms', 'ui-icon'),

  // Molecules
  createComponentDefinition('Card', 'molecules', 'ui-card'),
  createComponentDefinition('SearchBar', 'molecules', 'ui-search-bar'),
  createComponentDefinition('Header', 'molecules', 'ui-header'),
  createComponentDefinition('Chip', 'molecules', 'ui-chip'),
  createComponentDefinition('Counter', 'molecules', 'ui-counter'),
  createComponentDefinition('BasicGallery', 'molecules', 'ui-basic-gallery'),
  createComponentDefinition('Alert', 'molecules', 'ui-alert'),
  createComponentDefinition('ReadMore', 'molecules', 'ui-read-more'),
];

export const getComponentsByCategory = (category: ComponentCategory) => {
  return componentRegistry.filter(comp => comp.type === category);
};

export const getComponentByName = (name: string) => {
  return componentRegistry.find(comp => comp.name === name);
};

// Add property definitions for the settings panel
export const getPropertyDefinitions = (componentName: string): PropertyDefinition[] => {
  const definitions: Record<string, PropertyDefinition[]> = {
    Image: [
      {
        name: 'src',
        type: 'string',
        label: 'Image URL',
        defaultValue: 'https://via.placeholder.com/300x200',
        required: true,
        control: 'text'
      },
      {
        name: 'alt',
        type: 'string',
        label: 'Alt Text',
        defaultValue: 'Placeholder image',
        required: true,
        control: 'text'
      },
      {
        name: 'size',
        type: 'string',
        label: 'Size',
        defaultValue: 'medium',
        control: 'select',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' }
        ]
      },
      {
        name: 'border',
        type: 'string',
        label: 'Border Style',
        defaultValue: 'none',
        control: 'select',
        options: [
          { label: 'None', value: 'none' },
          { label: 'Rounded', value: 'rounded' },
          { label: 'Circle', value: 'circle' }
        ]
      },
      {
        name: 'width',
        type: 'number',
        label: 'Width (px)',
        defaultValue: 300,
        control: 'number',
        min: 0,
        max: 1920
      },
      {
        name: 'height',
        type: 'number',
        label: 'Height (px)',
        defaultValue: 200,
        control: 'number',
        min: 0,
        max: 1080
      }
    ],
    GoogleMap: [
      {
        name: 'lat',
        type: 'number',
        label: 'Latitude',
        defaultValue: 0,
        required: true,
        control: 'number',
        min: -90,
        max: 90,
      },
      {
        name: 'lng',
        type: 'number',
        label: 'Longitude',
        defaultValue: 0,
        required: true,
        control: 'number',
        min: -180,
        max: 180,
      },
      {
        name: 'zoom',
        type: 'number',
        label: 'Zoom Level',
        defaultValue: 1,
        required: true,
        control: 'number',
        min: 1,
        max: 20,
      },
    ],
    Chip: [
      {
        name: 'label',
        type: 'string',
        label: 'Label',
        defaultValue: 'Chip Label',
        required: true,
        control: 'text'
      },
      {
        name: 'icon',
        type: 'string',
        label: 'Icon',
        defaultValue: '🔵',
        control: 'text'
      },
      {
        name: 'variant',
        type: 'string',
        label: 'Variant',
        defaultValue: 'default',
        control: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' },
          { label: 'Error', value: 'error' }
        ]
      },
      {
        name: 'size',
        type: 'string',
        label: 'Size',
        defaultValue: 'medium',
        control: 'select',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' }
        ]
      }
    ],
    Counter: [
      {
        name: 'value',
        type: 'number',
        label: 'Value',
        defaultValue: 0,
        required: true,
        control: 'number'
      },
      {
        name: 'min',
        type: 'number',
        label: 'Minimum',
        defaultValue: 0,
        control: 'number'
      },
      {
        name: 'max',
        type: 'number',
        label: 'Maximum',
        defaultValue: 100,
        control: 'number'
      },
      {
        name: 'step',
        type: 'number',
        label: 'Step',
        defaultValue: 1,
        control: 'number'
      },
      {
        name: 'label',
        type: 'string',
        label: 'Label',
        defaultValue: 'Counter',
        control: 'text'
      },
      {
        name: 'variant',
        type: 'string',
        label: 'Variant',
        defaultValue: 'default',
        control: 'select',
        options: [
          { label: 'Default', value: 'default' },
          { label: 'Primary', value: 'primary' },
          { label: 'Secondary', value: 'secondary' }
        ]
      },
      {
        name: 'size',
        type: 'string',
        label: 'Size',
        defaultValue: 'medium',
        control: 'select',
        options: [
          { label: 'Small', value: 'small' },
          { label: 'Medium', value: 'medium' },
          { label: 'Large', value: 'large' }
        ]
      }
    ],
    BasicGallery: [
      {
        name: 'images',
        type: 'string',
        label: 'Images (JSON array)',
        defaultValue: JSON.stringify([
          'https://via.placeholder.com/400x300/FF5733/FFFFFF',
          'https://via.placeholder.com/400x300/33FF57/FFFFFF',
          'https://via.placeholder.com/400x300/5733FF/FFFFFF'
        ]),
        control: 'textarea',
        required: true
      },
      {
        name: 'columns',
        type: 'number',
        label: 'Columns',
        defaultValue: 3,
        control: 'number',
        min: 1,
        max: 6
      },
      {
        name: 'gap',
        type: 'number',
        label: 'Gap (px)',
        defaultValue: 16,
        control: 'number',
        min: 0,
        max: 48
      },
      {
        name: 'image-height',
        type: 'number',
        label: 'Image Height (px)',
        defaultValue: 200,
        control: 'number',
        min: 100,
        max: 600
      },
      {
        name: 'border-radius',
        type: 'number',
        label: 'Border Radius (px)',
        defaultValue: 8,
        control: 'number',
        min: 0,
        max: 24
      },
      {
        name: 'title',
        type: 'string',
        label: 'Gallery Title',
        defaultValue: 'Image Gallery',
        control: 'text'
      }
    ],
    Alert: [
      {
        name: 'message',
        type: 'string',
        label: 'Message',
        defaultValue: 'This is an alert message',
        control: 'textarea',
        required: true
      },
      {
        name: 'type',
        type: 'string',
        label: 'Type',
        defaultValue: 'info',
        control: 'select',
        options: [
          { label: 'Info', value: 'info' },
          { label: 'Success', value: 'success' },
          { label: 'Warning', value: 'warning' },
          { label: 'Error', value: 'error' }
        ]
      },
      {
        name: 'title',
        type: 'string',
        label: 'Title',
        defaultValue: 'Alert Title',
        control: 'text'
      },
      {
        name: 'dismissible',
        type: 'boolean',
        label: 'Dismissible',
        defaultValue: true,
        control: 'checkbox'
      },
      {
        name: 'icon',
        type: 'string',
        label: 'Custom Icon',
        defaultValue: '',
        control: 'text'
      }
    ],
    ReadMore: [
      {
        name: 'content',
        type: 'string',
        label: 'Content',
        defaultValue: 'Lorem ipsum dolor sit amet...',
        control: 'textarea',
        required: true
      },
      {
        name: 'max-length',
        type: 'number',
        label: 'Max Length',
        defaultValue: 150,
        control: 'number',
        min: 50,
        max: 1000
      },
      {
        name: 'expand-text',
        type: 'string',
        label: 'Expand Button Text',
        defaultValue: 'Read More',
        control: 'text'
      },
      {
        name: 'collapse-text',
        type: 'string',
        label: 'Collapse Button Text',
        defaultValue: 'Show Less',
        control: 'text'
      },
      {
        name: 'expanded',
        type: 'boolean',
        label: 'Initially Expanded',
        defaultValue: false,
        control: 'checkbox'
      }
    ],
  };

  return definitions[componentName] || [];
}; 