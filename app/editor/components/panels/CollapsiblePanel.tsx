import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsiblePanelProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const CollapsiblePanel: React.FC<CollapsiblePanelProps> = ({
  title,
  children,
  defaultOpen = true,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border rounded-lg bg-white shadow-sm">
      <button
        className="w-full flex items-center justify-between p-4 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      {isOpen && <div className="p-4 border-t">{children}</div>}
    </div>
  );
}; 