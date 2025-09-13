import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import { LinearProgressLoader } from '../components/atoms';

interface LoadingState {
  [key: string]: boolean | number;
}

interface LoadingConfiguration {
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  height?: number;
  zIndex?: number;
}

interface GlobalLoadingContextType {
  /**
   * Current loading states for all registered operations
   */
  loadingStates: LoadingState;
  
  /**
   * Check if any operation is currently loading
   */
  isAnyLoading: boolean;
  
  /**
   * Check if a specific operation is loading
   */
  isLoading: (key: string) => boolean;
  
  /**
   * Start loading for a specific operation with optional configuration
   */
  startLoading: (key: string, config?: LoadingConfiguration) => void;
  
  /**
   * Stop loading for a specific operation
   */
  stopLoading: (key: string) => void;
  
  /**
   * Set progress for a specific operation (0-100)
   * Also starts loading if not already started
   */
  setProgress: (key: string, progress: number, config?: LoadingConfiguration) => void;
  
  /**
   * Get progress for a specific operation
   */
  getProgress: (key: string) => number | undefined;
  
  /**
   * Execute an async operation with automatic loading management
   */
  withLoading: <T>(key: string, operation: () => Promise<T>, config?: LoadingConfiguration) => Promise<T>;
  
  /**
   * Execute an async operation with progress tracking
   */
  withProgress: <T>(
    key: string, 
    operation: (setProgress: (progress: number) => void) => Promise<T>,
    config?: LoadingConfiguration
  ) => Promise<T>;
  
  /**
   * Reset all loading states
   */
  resetAll: () => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextType | undefined>(undefined);

interface GlobalLoadingProviderProps {
  children: ReactNode;
  /**
   * Default configuration for the global loader
   */
  defaultConfig?: LoadingConfiguration;
}

/**
 * GlobalLoadingProvider
 * 
 * Provides global loading state management with a fixed LinearProgressLoader at the top of the app.
 * This eliminates the need to add LinearProgressLoader to every component that needs loading indication.
 * 
 * Features:
 * - Centralized loading state management
 * - Global LinearProgressLoader positioned at top of viewport
 * - Multiple concurrent loading operations
 * - Progress tracking with determinate/indeterminate modes
 * - Configurable appearance per operation
 * - Automatic cleanup and error handling
 * 
 * Usage:
 * ```tsx
 * // Wrap your app with the provider
 * <GlobalLoadingProvider>
 *   <App />
 * </GlobalLoadingProvider>
 * 
 * // Use in any component
 * const loading = useGlobalLoading();
 * 
 * // Start/stop loading
 * loading.startLoading('formSubmit');
 * loading.stopLoading('formSubmit');
 * 
 * // With progress tracking
 * loading.setProgress('upload', 50);
 * 
 * // Automatic management
 * await loading.withLoading('apiCall', async () => {
 *   return await api.fetchData();
 * });
 * ```
 */
export const GlobalLoadingProvider: React.FC<GlobalLoadingProviderProps> = ({ 
  children, 
  defaultConfig = {
    color: 'primary' as const,
    height: 4,
    zIndex: 1301
  }
}) => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});
  const [loadingConfigs, setLoadingConfigs] = useState<Record<string, LoadingConfiguration>>({});

  // Check if any operation is currently loading
  const isAnyLoading = Object.values(loadingStates).some(
    (state) => state === true || (typeof state === 'number' && state < 100)
  );

  // Check if a specific operation is loading
  const isLoading = useCallback((key: string): boolean => {
    const state = loadingStates[key];
    return state === true || (typeof state === 'number' && state < 100);
  }, [loadingStates]);

  // Start loading for a specific operation
  const startLoading = useCallback((key: string, config?: LoadingConfiguration) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }));
    if (config) {
      setLoadingConfigs((prev) => ({ ...prev, [key]: config }));
    }
  }, []);

  // Stop loading for a specific operation
  const stopLoading = useCallback((key: string) => {
    setLoadingStates((prev) => {
      const newStates = { ...prev };
      delete newStates[key];
      return newStates;
    });
    setLoadingConfigs((prev) => {
      const newConfigs = { ...prev };
      delete newConfigs[key];
      return newConfigs;
    });
  }, []);

  // Set progress for a specific operation
  const setProgress = useCallback((key: string, progress: number, config?: LoadingConfiguration) => {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    setLoadingStates((prev) => ({ ...prev, [key]: clampedProgress }));
    
    if (config) {
      setLoadingConfigs((prev) => ({ ...prev, [key]: config }));
    }
    
    // Auto-cleanup when progress reaches 100%
    if (clampedProgress >= 100) {
      setTimeout(() => {
        setLoadingStates((prev) => {
          const newStates = { ...prev };
          delete newStates[key];
          return newStates;
        });
        setLoadingConfigs((prev) => {
          const newConfigs = { ...prev };
          delete newConfigs[key];
          return newConfigs;
        });
      }, 500); // Small delay to show completion
    }
  }, []);

  // Get progress for a specific operation
  const getProgress = useCallback((key: string): number | undefined => {
    const state = loadingStates[key];
    return typeof state === 'number' ? state : undefined;
  }, [loadingStates]);

  // Execute an async operation with automatic loading management
  const withLoading = useCallback(async <T,>(
    key: string,
    operation: () => Promise<T>,
    config?: LoadingConfiguration
  ): Promise<T> => {
    try {
      startLoading(key, config);
      const result = await operation();
      return result;
    } finally {
      stopLoading(key);
    }
  }, [startLoading, stopLoading]);

  // Execute an async operation with progress tracking
  const withProgress = useCallback(async <T,>(
    key: string,
    operation: (setProgress: (progress: number) => void) => Promise<T>,
    config?: LoadingConfiguration
  ): Promise<T> => {
    try {
      setProgress(key, 0, config);
      const result = await operation((progress) => setProgress(key, progress));
      setProgress(key, 100);
      return result;
    } catch (error) {
      stopLoading(key);
      throw error;
    }
  }, [setProgress, stopLoading]);

  // Reset all loading states
  const resetAll = useCallback(() => {
    setLoadingStates({});
    setLoadingConfigs({});
  }, []);

  // Get the current active configuration (prioritize the most recent or first active)
  const getCurrentConfig = useCallback((): LoadingConfiguration => {
    const activeKeys = Object.keys(loadingStates).filter(key => isLoading(key));
    if (activeKeys.length === 0) return defaultConfig;
    
    // Use the configuration of the first active loading operation, fallback to default
    const activeKey = activeKeys[0];
    return { ...defaultConfig, ...loadingConfigs[activeKey] };
  }, [loadingStates, loadingConfigs, defaultConfig, isLoading]);

  // Calculate combined progress for multiple operations
  const getCombinedProgress = useCallback((): number | undefined => {
    const progressOperations = Object.entries(loadingStates)
      .filter(([_, state]) => typeof state === 'number')
      .map(([_, state]) => state as number);
    
    if (progressOperations.length === 0) return undefined;
    
    const totalProgress = progressOperations.reduce((sum, progress) => sum + progress, 0);
    return Math.round(totalProgress / progressOperations.length);
  }, [loadingStates]);

  const contextValue: GlobalLoadingContextType = {
    loadingStates,
    isAnyLoading,
    isLoading,
    startLoading,
    stopLoading,
    setProgress,
    getProgress,
    withLoading,
    withProgress,
    resetAll,
  };

  const currentConfig = getCurrentConfig();
  const combinedProgress = getCombinedProgress();

  return (
    <GlobalLoadingContext.Provider value={contextValue}>
      {children}
      
      {/* Global Linear Progress Loader */}
      <LinearProgressLoader
        loading={isAnyLoading}
        progress={combinedProgress}
        color={currentConfig.color}
        height={currentConfig.height}
        zIndex={currentConfig.zIndex}
        fixed={true}
      />
    </GlobalLoadingContext.Provider>
  );
};

/**
 * useGlobalLoading Hook
 * 
 * Hook to access the global loading context. Must be used within a GlobalLoadingProvider.
 * 
 * @throws {Error} If used outside of GlobalLoadingProvider
 * @returns {GlobalLoadingContextType} The global loading context
 */
export const useGlobalLoading = (): GlobalLoadingContextType => {
  const context = useContext(GlobalLoadingContext);
  if (context === undefined) {
    throw new Error('useGlobalLoading must be used within a GlobalLoadingProvider');
  }
  return context;
};

export default GlobalLoadingContext;
