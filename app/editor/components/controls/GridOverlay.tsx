import React from 'react';

interface GridOverlayProps {
  cellSize?: number;
  color?: string;
}

export const GridOverlay: React.FC<GridOverlayProps> = ({
  cellSize = 20,
  color = 'rgba(0, 0, 0, 0.1)',
}) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `
          linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    />
  );
}; 