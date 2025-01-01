"use client"

import React, { createContext, useContext, useState } from 'react';
import { PlacedComponent, ViewMode } from '../types/editor.types';

interface EditorContextType {
  view: ViewMode;
  setView: (view: ViewMode) => void;
  placedComponents: PlacedComponent[];
  setPlacedComponents: (components: PlacedComponent[]) => void;
  selectedComponent: string | null;
  setSelectedComponent: (id: string | null) => void;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);


export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<ViewMode>('desktop');
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  return (
    <EditorContext.Provider value={{
      view,
      setView,
      placedComponents,
      setPlacedComponents,
      selectedComponent,
      setSelectedComponent,
      showGrid,
      setShowGrid,
    }}>
      {children}
    </EditorContext.Provider>
  );
};

export const useEditor = () => {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error('useEditor must be used within an EditorProvider');
  }
  return context;
}; 