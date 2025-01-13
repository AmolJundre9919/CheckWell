import React from 'react';
import { useEditor } from '../../context/EditorContext';
import { CollapsiblePanel } from './CollapsiblePanel';
import { PlacedComponent } from '@/app/editor/types/editor.types';
import {GoogleMapAtom} from '@/app/site/atoms/display/GoogleMapAtom';


export const SettingsPanel: React.FC = () => {
  const { selectedComponent, placedComponents, setPlacedComponents } = useEditor();

  const selectedComponentData = placedComponents.find(
    (component) => component.id === selectedComponent
  );

  const updateComponentProp = (propName: string, value: any) => {
    if (!selectedComponent) return;

    setPlacedComponents((prev: PlacedComponent[]) => {
      return prev.map((component: PlacedComponent) => {
        if (component.id === selectedComponent) {
          return { 
            ...component, 
            props: { 
              ...component.props, 
              [propName]: value 
            } 
          } as PlacedComponent;
        }
        return component;
      });
    });
  };

  if (!selectedComponentData) {
    return (
      <div className="w-64 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">Select a component to edit its properties</p>
      </div>
    );
  }

  return (
    <div className="w-64 space-y-4">
      <CollapsiblePanel title="Component Properties">
        {Object.entries(selectedComponentData.props).map(([key, value]) => (
          <div key={key} className="mb-4">
            <label className="block text-sm font-medium mb-1">{key}</label>
            <input
              type="text"
              value={value as string}
              onChange={(e) => updateComponentProp(key, e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        ))}
      </CollapsiblePanel>

      {selectedComponentData.name === 'GoogleMap' && (
        <CollapsiblePanel title="Google Map Properties">
          <div>
            <label className="block text-sm font-medium mb-1">Latitude</label>
            <input
              type="number"
              value={selectedComponentData.props.lat}
              onChange={(e) => updateComponentProp('lat', parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Longitude</label>
            <input
              type="number"
              value={selectedComponentData.props.lng}
              onChange={(e) => updateComponentProp('lng', parseFloat(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Zoom Level</label>
            <input
              type="number"
              value={selectedComponentData.props.zoom}
              onChange={(e) => updateComponentProp('zoom', parseInt(e.target.value))}
              className="w-full p-2 border rounded"
            />
          </div>
        </CollapsiblePanel>
      )}

      <CollapsiblePanel title="Layout">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Position X</label>
            <input
              type="number"
              value={selectedComponentData.position.x}
              onChange={(e) =>
                updateComponentProp('position', {
                  ...selectedComponentData.position,
                  x: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Position Y</label>
            <input
              type="number"
              value={selectedComponentData.position.y}
              onChange={(e) =>
                updateComponentProp('position', {
                  ...selectedComponentData.position,
                  y: parseInt(e.target.value),
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      </CollapsiblePanel>
    </div>
  );
};

// Add this JavaScript snippet to handle property updates
document.getElementById('update-google-map')?.addEventListener('click', () => {
    const latInput = document.getElementById('map-lat') as HTMLInputElement | null;
    const lngInput = document.getElementById('map-lng') as HTMLInputElement | null;

    if (latInput && lngInput) {
        const lat = parseFloat(latInput.value);
        const lng = parseFloat(lngInput.value);
        
        const googleMapElement = document.querySelector('ui-google-map') as GoogleMap; // Cast to your GoogleMap class
        if (googleMapElement) {
            googleMapElement.updateCenter(lat, lng);
        }
    }
}); 