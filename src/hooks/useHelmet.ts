import { createContext, useContext } from 'react';
import { HelmetData } from 'react-helmet-async';

export const HelmetContext = createContext<HelmetData | undefined>(undefined);

export const useHelmet = () => {
  const context = useContext(HelmetContext);
  if (!context) {
    throw new Error('useHelmet must be used within a HelmetProvider');
  }
  return context;
};
