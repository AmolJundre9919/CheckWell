import React, { useState } from 'react';
import { useEditor } from '../../context/EditorContext';
import { EditableComponent } from './EditableComponent';
import { PlacedComponent, ComponentData } from '../../types/editor.types';

export const WorkspaceContainer: React.FC = () => {
  const { 
    placedComponents, 
    setPlacedComponents,
    selectedComponent,
    setSelectedComponent,
    view 
  } = useEditor();

  const [dragOverY, setDragOverY] = useState<number | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const containerRect = e.currentTarget.getBoundingClientRect();
    const dropY = e.clientY - containerRect.top;

    // Check if this is an internal move
    const moveData = e.dataTransfer.getData('moveComponent');
    if (moveData) {
      const { id } = JSON.parse(moveData) as { id: string };
      handleComponentMove(id, dropY);
      return;
    }

    // Handle new component drop
    const componentData = JSON.parse(e.dataTransfer.getData('component')) as ComponentData;
    
    const replaceIndex = placedComponents.findIndex(comp => {
      const componentTop = comp.position.y;
      const componentBottom = comp.position.y + 100;
      return dropY >= componentTop && dropY <= componentBottom;
    });
    
    const newComponent: PlacedComponent = {
      id: crypto.randomUUID(),
      name: componentData.name,
      position: { 
        x: 0,
        y: replaceIndex !== -1 
          ? placedComponents[replaceIndex].position.y 
          : Math.max(0, dropY - 50)
      },
      size: { width: 100, height: 100 },
      props: componentData.defaultProps || {},
    };

    setPlacedComponents(prev => {
      const newComponents = [...prev];
      
      if (replaceIndex !== -1) {
        newComponents[replaceIndex] = newComponent;
      } else {
        newComponents.push(newComponent);
        newComponents.sort((a, b) => a.position.y - b.position.y);
      }

      return repositionComponents(newComponents);
    });
  };

  const handleComponentMove = (componentId: string, newY: number) => {
    setPlacedComponents(prev => {
      const components = [...prev];
      const moveIndex = components.findIndex(c => c.id === componentId);
      if (moveIndex === -1) return prev;

      const component = components[moveIndex];
      components.splice(moveIndex, 1);

      const insertIndex = components.findIndex(c => c.position.y > newY);
      if (insertIndex === -1) {
        components.push(component);
      } else {
        components.splice(insertIndex, 0, component);
      }

      return repositionComponents(components);
    });
  };

  const repositionComponents = (components: PlacedComponent[]): PlacedComponent[] => {
    return components.map((comp, index) => ({
      ...comp,
      position: {
        x: 0,
        y: index * 120
      }
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const containerRect = e.currentTarget.getBoundingClientRect();
    setDragOverY(e.clientY - containerRect.top);
  };

  const handleDragLeave = () => {
    setDragOverY(null);
  };

  return (
    <div 
      className={`
        relative
        min-h-screen
        bg-white
        ${view === 'mobile' ? 'max-w-md mx-auto' : 'w-full'}
      `}
    >
      <div 
        className={`
          relative
          w-full
          min-h-screen
          border-2
          border-dashed
          border-gray-200
          overflow-y-auto
        `}
        style={{ 
          padding: '2rem 0',
        }}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="relative space-y-6">
          {placedComponents.map((component) => (
            <EditableComponent
              key={component.id}
              component={component}
              isSelected={selectedComponent === component.id}
              onSelect={() => setSelectedComponent(component.id)}
              onPositionChange={(position) => {
                setPlacedComponents(prev => 
                  prev.map(comp =>
                    comp.id === component.id ? { ...comp, position } : comp
                  )
                );
              }}
              onSizeChange={(size) => {
                setPlacedComponents(prev => 
                  prev.map(comp =>
                    comp.id === component.id ? { ...comp, size } : comp
                  )
                );
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}; 