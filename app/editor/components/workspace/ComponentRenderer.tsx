import React from 'react';
import { ComponentDefinition } from '../../types/editor.types';

interface ComponentRendererProps {
  definition: ComponentDefinition;
  props: Record<string, any>;
}

export const ComponentRenderer: React.FC<ComponentRendererProps> = ({ definition, props }) => {
  if (definition.isHTMLComponent) {
    // Render HTML component
    const Component = definition.component as string;
    return React.createElement(Component, {
      ...definition.defaultProps,
      ...props,
      className: `${props.className || ''} ui-component`,
    });
  } else {
    // Render site component
    const Component = definition.component as React.ComponentType<any>;
    return <Component {...definition.defaultProps} {...props} />;
  }
}; 