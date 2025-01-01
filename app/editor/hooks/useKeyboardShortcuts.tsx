import { useCallback, useEffect } from 'react';
import { useEditor } from '../context/EditorContext';
import { createComponentCopy } from '../utils/component.utils';
import { useToast } from './useToast';

export const useKeyboardShortcuts = () => {
  const { selectedComponent, placedComponents, setPlacedComponents, setSelectedComponent } = useEditor();
  const { showToast } = useToast();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedComponent) return;

    // Delete handling
    if (e.key === 'Delete' || e.key === 'Backspace') {
      e.preventDefault();
      setPlacedComponents(prev => prev.filter(c => c.id !== selectedComponent));
      setSelectedComponent(null);
      showToast('Component deleted');
    }

    // Copy handling
    if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
      const componentToCopy = placedComponents.find(c => c.id === selectedComponent);
      if (componentToCopy) {
        localStorage.setItem('copiedComponent', JSON.stringify(componentToCopy));
        showToast('Component copied');
      }
    }

    // Paste handling
    if (e.key === 'v' && (e.ctrlKey || e.metaKey)) {
      const copiedComponent = localStorage.getItem('copiedComponent');
      if (copiedComponent) {
        const newComponent = createComponentCopy(JSON.parse(copiedComponent));
        setPlacedComponents(prev => [...prev, newComponent]);
        setSelectedComponent(newComponent.id);
        showToast('Component pasted');
      }
    }
  }, [selectedComponent, placedComponents, setPlacedComponents, setSelectedComponent, showToast]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}; 