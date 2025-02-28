"use client"

import React, { createContext, useContext, useState } from 'react';
import { PlacedComponent, ViewMode } from '../types/editor.types';

interface EditorContextType {
  placedComponents: PlacedComponent[];
  setPlacedComponents: React.Dispatch<React.SetStateAction<PlacedComponent[]>>;
  selectedComponent: string | null;
  setSelectedComponent: React.Dispatch<React.SetStateAction<string | null>>;
  view: ViewMode;
  setView: React.Dispatch<React.SetStateAction<ViewMode>>;
  showGrid: boolean;
  setShowGrid: (show: boolean) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [placedComponents, setPlacedComponents] = useState<PlacedComponent[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [view, setView] = useState<ViewMode>('desktop');
  const [showGrid, setShowGrid] = useState(true);

  return (
    <EditorContext.Provider
      value={{
        placedComponents,
        setPlacedComponents,
        selectedComponent,
        setSelectedComponent,
        view,
        setView,
        showGrid,
        setShowGrid,
      }}
    >
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