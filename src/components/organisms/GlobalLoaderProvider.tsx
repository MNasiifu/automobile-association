import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import useLoading from "../../hooks/useLoading";
import LinearProgressLoader from "../atoms/LinearProgressLoader";
import { Box } from "@mui/material";

interface GlobalLoaderContextType {
  /**
   * Loading hook instance for global operations
   */
  loading: ReturnType<typeof useLoading>;

  /**
   * Show a global loader for a specific operation
   */
  showLoader: (key: string) => void;

  /**
   * Hide a global loader for a specific operation
   */
  hideLoader: (key: string) => void;

  /**
   * Set progress for a global operation
   */
  setProgress: (key: string, progress: number) => void;

  /**
   * Execute an operation with global loading indicator
   */
  withGlobalLoading: (
    key: string,
    operation: () => Promise<any>
  ) => Promise<any>;
}

const GlobalLoaderContext = createContext<GlobalLoaderContextType | null>(null);

interface GlobalLoaderProviderProps {
  children: ReactNode;
}

/**
 * GlobalLoaderProvider
 *
 * Provides a global loading context that can be used throughout the application.
 * Automatically renders a linear progress loader at the top of the page when
 * any global operation is loading.
 *
 * Features:
 * - Centralized loading state management
 * - Automatic visual feedback with top-positioned loader
 * - Support for multiple concurrent operations
 * - Progress tracking capabilities
 * - Easy integration with async operations
 */
export const GlobalLoaderProvider: React.FC<GlobalLoaderProviderProps> = ({
  children,
}) => {
  const loading = useLoading();

  const showLoader = (key: string) => {
    loading.startLoading(key);
  };

  const hideLoader = (key: string) => {
    loading.stopLoading(key);
  };

  const setProgress = (key: string, progress: number) => {
    loading.setProgress(key, progress);
  };

  const withGlobalLoading = async (
    key: string,
    operation: () => Promise<any>
  ): Promise<any> => {
    return loading.withLoading(key, operation);
  };

  const contextValue: GlobalLoaderContextType = {
    loading,
    showLoader,
    hideLoader,
    setProgress,
    withGlobalLoading,
  };

  return (
    <GlobalLoaderContext.Provider value={contextValue}>
      {/* Global Linear Progress Loader */}
      <LinearProgressLoader
        loading={loading.isAnyLoading}
        color="primary"
        height={3}
        fixed={true}
        zIndex={1301}
      />
      {children}
    </GlobalLoaderContext.Provider>
  );
};

/**
 * useGlobalLoader Hook
 *
 * Access the global loader context from any component in the application.
 *
 * @throws {Error} If used outside of GlobalLoaderProvider
 *
 * Usage:
 * ```tsx
 * const globalLoader = useGlobalLoader();
 *
 * // Show/hide loader manually
 * globalLoader.showLoader('myOperation');
 * // ... perform operation
 * globalLoader.hideLoader('myOperation');
 *
 * // With automatic management
 * await globalLoader.withGlobalLoading('apiCall', async () => {
 *   const data = await fetchData();
 *   return data;
 * });
 *
 * // With progress tracking
 * globalLoader.setProgress('upload', 50);
 * ```
 */
export const useGlobalLoader = (): GlobalLoaderContextType => {
  const context = useContext(GlobalLoaderContext);

  if (!context) {
    throw new Error(
      "useGlobalLoader must be used within a GlobalLoaderProvider"
    );
  }

  return context;
};

export default GlobalLoaderProvider;
