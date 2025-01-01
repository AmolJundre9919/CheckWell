import React, { useCallback } from 'react';
import { useEditor } from '../../context/EditorContext';
import { PlacedComponent } from '../../types/editor.types';
import { EditableComponent } from './EditableComponent';

export const WorkspaceContainer: React.FC = () => {
  const { 
    placedComponents, 
    setPlacedComponents, 
    selectedComponent, 
    setSelectedComponent 
  } = useEditor();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const componentData = e.dataTransfer.getData('component');
    
    if (componentData) {
      const component = JSON.parse(componentData);
      const rect = e.currentTarget.getBoundingClientRect();
      const newComponent: PlacedComponent = {
        ...component,
        id: `component-${Date.now()}`,
        position: {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
        size: {
          width: 200,
          height: 100,
        },
        props: component.defaultProps || {},
      };

      setPlacedComponents(prev => [...prev, newComponent]);
    }
  }, [setPlacedComponents]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const updateComponentPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setPlacedComponents(prev =>
      prev.map(component =>
        component.id === id
          ? { ...component, position }
          : component
      )
    );
  }, [setPlacedComponents]);

  const updateComponentSize = useCallback((id: string, size: { width: number; height: number }) => {
    setPlacedComponents(prev =>
      prev.map(component =>
        component.id === id
          ? { ...component, size }
          : component
      )
    );
  }, [setPlacedComponents]);

  return (
    <div
      className="relative w-full min-h-[600px] bg-white rounded-lg border"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      {placedComponents.map((component) => (
        <EditableComponent
          key={component.id}
          component={component}
          isSelected={component.id === selectedComponent}
          onSelect={() => setSelectedComponent(component.id)}
          onPositionChange={(position) => updateComponentPosition(component.id, position)}
          onSizeChange={(size) => updateComponentSize(component.id, size)}
        />
      ))}
    </div>
  );
}; 