import React, { useCallback, useState } from 'react';
import { PlacedComponent } from '../../types/editor.types';
import { ResizeHandles } from './ResizeHandles';
import { getComponentByName } from '../../utils/component-registry';


interface EditableComponentProps {
  component: PlacedComponent;
  isSelected: boolean;
  onSelect: () => void;
  onPositionChange: (position: { x: number; y: number }) => void;
  onSizeChange: (size: { width: number; height: number }) => void;
}

export const EditableComponent: React.FC<EditableComponentProps> = ({
  component,
  isSelected,
  onSelect,
  onPositionChange,
  onSizeChange,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onSelect();
    setIsDragging(true);
    const rect = e.currentTarget.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, [onSelect]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;

    const parent = (e.target as HTMLElement).closest('.workspace-container');
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const newX = e.clientX - parentRect.left - dragOffset.x;
    const newY = e.clientY - parentRect.top - dragOffset.y;

    onPositionChange({ x: newX, y: newY });
  }, [isDragging, dragOffset, onPositionChange]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const componentDefinition = getComponentByName(component.name);
  if (!componentDefinition) return null;

  const element = document.createElement(componentDefinition.tagName);
  
  // Set properties
  const props = {
    ...componentDefinition.defaultProps,
    ...(component.props || {})
  };

  Object.entries(props).forEach(([key, value]) => {
    if (key === 'text') {
      element.textContent = String(value);
    } else {
      element.setAttribute(key, String(value));
    }
  });

  // Handle children
  if (component.children?.length) {
    component.children.forEach(child => {
      const childElement = document.createElement(getComponentByName(child.type)?.tagName || 'div');
      // Set child properties...
      element.appendChild(childElement);
    });
  }

  return (
    <div
      className={`absolute cursor-move ${isSelected ? 'outline outline-2 outline-blue-500' : ''}`}
      style={{
        left: component.position.x,
        top: component.position.y,
        width: component.size.width,
        height: component.size.height,
      }}
      onMouseDown={handleMouseDown}
      dangerouslySetInnerHTML={{ __html: element.outerHTML }}
    />
  );
}; 