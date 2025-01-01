import React from 'react';

interface ResizeHandlesProps {
  size: { width: number; height: number };
  onResize: (size: { width: number; height: number }) => void;
}

export const ResizeHandles: React.FC<ResizeHandlesProps> = ({ size, onResize }) => {
  const handleResize = (e: React.MouseEvent, direction: string) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      switch (direction) {
        case 'e':
          newWidth = startWidth + deltaX;
          break;
        case 's':
          newHeight = startHeight + deltaY;
          break;
        case 'se':
          newWidth = startWidth + deltaX;
          newHeight = startHeight + deltaY;
          break;
      }

      // Ensure minimum size
      newWidth = Math.max(50, newWidth);
      newHeight = Math.max(50, newHeight);

      onResize({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <>
      <div
        className="absolute w-2 h-2 bg-blue-500 right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 cursor-e-resize"
        onMouseDown={(e) => handleResize(e, 'e')}
      />
      <div
        className="absolute w-2 h-2 bg-blue-500 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 cursor-s-resize"
        onMouseDown={(e) => handleResize(e, 's')}
      />
      <div
        className="absolute w-2 h-2 bg-blue-500 bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 cursor-se-resize"
        onMouseDown={(e) => handleResize(e, 'se')}
      />
    </>
  );
}; 