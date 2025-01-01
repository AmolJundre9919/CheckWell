import React from 'react';
import { Monitor, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEditor } from '../../context/EditorContext';

export const ViewportControl: React.FC = () => {
  const { view, setView } = useEditor();

  return (
    <div className="flex gap-2 mb-4">
      <Button 
        variant={view === 'desktop' ? 'default' : 'outline'}
        onClick={() => setView('desktop')}
      >
        <Monitor className="mr-2 h-4 w-4" />
        Desktop
      </Button>
      <Button 
        variant={view === 'mobile' ? 'default' : 'outline'}
        onClick={() => setView('mobile')}
      >
        <Smartphone className="mr-2 h-4 w-4" />
        Mobile
      </Button>
    </div>
  );
}; 