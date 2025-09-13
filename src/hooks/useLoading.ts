import { useState, useCallback } from 'react';

interface LoadingState {
  [key: string]: boolean | number;
}

interface LoadingHookReturn {
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
   * Start loading for a specific operation
   */
  startLoading: (key: string) => void;
  
  /**
   * Stop loading for a specific operation
   */
  stopLoading: (key: string) => void;
  
  /**
   * Set progress for a specific operation (0-100)
   * Also starts loading if not already started
   */
  setProgress: (key: string, progress: number) => void;
  
  /**
   * Get progress for a specific operation
   */
  getProgress: (key: string) => number | undefined;
  
  /**
   * Toggle loading state for a specific operation
   */
  toggleLoading: (key: string) => void;
  
  /**
   * Reset all loading states
   */
  resetAll: () => void;
  
  /**
   * Execute an async operation with automatic loading management
   */
  withLoading: <T>(key: string, operation: () => Promise<T>) => Promise<T>;
  
  /**
   * Execute an async operation with progress tracking
   */
  withProgress: <T>(
    key: string, 
    operation: (setProgress: (progress: number) => void) => Promise<T>
  ) => Promise<T>;
}

/**
 * useLoading Hook
 * 
 * A comprehensive hook for managing loading states across the application.
 * Supports multiple concurrent loading operations with progress tracking.
 * 
 * Features:
 * - Multiple concurrent loading states
 * - Progress tracking (0-100)
 * - Automatic loading management for async operations
 * - Type-safe API
 * - Memory efficient state management
 * 
 * Usage:
 * ```tsx
 * const loading = useLoading();
 * 
 * // Basic loading management
 * loading.startLoading('formSubmit');
 * // ... perform operation
 * loading.stopLoading('formSubmit');
 * 
 * // With automatic management
 * await loading.withLoading('apiCall', async () => {
 *   const response = await api.fetchData();
 *   return response;
 * });
 * 
 * // With progress tracking
 * await loading.withProgress('upload', async (setProgress) => {
 *   return uploadFile(file, {
 *     onProgress: (progress) => setProgress(progress)
 *   });
 * });
 * ```
 */
const useLoading = (): LoadingHookReturn => {
  const [loadingStates, setLoadingStates] = useState<LoadingState>({});

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
  const startLoading = useCallback((key: string) => {
    setLoadingStates((prev) => ({ ...prev, [key]: true }));
  }, []);

  // Stop loading for a specific operation
  const stopLoading = useCallback((key: string) => {
    setLoadingStates((prev) => {
      const newStates = { ...prev };
      delete newStates[key];
      return newStates;
    });
  }, []);

  // Set progress for a specific operation
  const setProgress = useCallback((key: string, progress: number) => {
    const clampedProgress = Math.max(0, Math.min(100, progress));
    setLoadingStates((prev) => ({ ...prev, [key]: clampedProgress }));
    
    // Auto-cleanup when progress reaches 100%
    if (clampedProgress >= 100) {
      setTimeout(() => {
        setLoadingStates((prev) => {
          const newStates = { ...prev };
          delete newStates[key];
          return newStates;
        });
      }, 500); // Small delay to show completion
    }
  }, []);

  // Get progress for a specific operation
  const getProgress = useCallback((key: string): number | undefined => {
    const state = loadingStates[key];
    return typeof state === 'number' ? state : undefined;
  }, [loadingStates]);

  // Toggle loading state for a specific operation
  const toggleLoading = useCallback((key: string) => {
    if (isLoading(key)) {
      stopLoading(key);
    } else {
      startLoading(key);
    }
  }, [isLoading, startLoading, stopLoading]);

  // Reset all loading states
  const resetAll = useCallback(() => {
    setLoadingStates({});
  }, []);

  // Execute an async operation with automatic loading management
  const withLoading = useCallback(async <T>(
    key: string,
    operation: () => Promise<T>
  ): Promise<T> => {
    try {
      startLoading(key);
      const result = await operation();
      return result;
    } finally {
      stopLoading(key);
    }
  }, [startLoading, stopLoading]);

  // Execute an async operation with progress tracking
  const withProgress = useCallback(async <T>(
    key: string,
    operation: (setProgress: (progress: number) => void) => Promise<T>
  ): Promise<T> => {
    try {
      setProgress(key, 0);
      const result = await operation((progress) => setProgress(key, progress));
      setProgress(key, 100);
      return result;
    } catch (error) {
      stopLoading(key);
      throw error;
    }
  }, [setProgress, stopLoading]);

  return {
    loadingStates,
    isAnyLoading,
    isLoading,
    startLoading,
    stopLoading,
    setProgress,
    getProgress,
    toggleLoading,
    resetAll,
    withLoading,
    withProgress,
  };
};

export default useLoading;
