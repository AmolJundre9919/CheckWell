import React from 'react';

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Implementation of the ToastProvider
    return <div>{children}</div>;
};

export { useToast } from '../contexts/ToastContext'; 