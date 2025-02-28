import React, { useCallback, useState } from 'react';
import { PlacedComponent } from '../../types/editor.types';
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

  const handleDragStart = (e: React.DragEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    // Store the component data for internal moves
    e.dataTransfer.setData('moveComponent', JSON.stringify({
      id: component.id,
      currentY: component.position.y
    }));
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

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

  return (
    <div
      className={`
        absolute 
        w-full
        px-4
        ${isDragging ? 'opacity-50' : ''}
      `}
      style={{
        top: component.position.y,
      }}
    >
      <div 
        className={`
          w-full
          min-h-[100px]
          bg-white
          border-2
          ${isSelected ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'}
          rounded-lg
          shadow-sm
          transition-all
          duration-200
          cursor-move
          p-4
        `}
        onClick={onSelect}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div 
          className="w-full h-full"
          dangerouslySetInnerHTML={{ __html: element.outerHTML }} 
        />
      </div>
    </div>
  );
}; 