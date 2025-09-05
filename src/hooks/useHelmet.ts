import { createContext, useContext } from 'react';
import { type HelmetDataContext } from '@dr.pogodin/react-helmet';

export const HelmetContext = createContext<HelmetDataContext | undefined>(undefined);

export const useHelmet = () => {
  const context = useContext(HelmetContext);
  if (!context) {
    throw new Error('useHelmet must be used within a HelmetProvider');
  }
  return context;
};
