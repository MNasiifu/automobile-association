/**
 * Enhanced Alert Hook for Top-Right Positioning
 * 
 * This hook provides a simplified interface for showing alerts
 * with sensible defaults for the IDP application.
 * 
 * Features:
 * - Default top-right positioning
 * - Consistent duration settings based on severity
 * - Type-safe API
 * - Easy integration with existing components
 * 
 * Usage:
 * const alert = useTopRightAlert();
 * 
 * alert.showSuccess('Operation completed!');
 * alert.showError('Something went wrong', 10000);
 * alert.showWarning('Please check your input');
 */
export const useTopRightAlert = () => {
  const showAlert = (
    message: string,
    severity: 'success' | 'warning' | 'error' | 'info' = 'success',
    options: {
      autoHideDuration?: number | null;
      position?: 'top-right' | 'top-center' | 'bottom-center';
      persistent?: boolean;
    } = {}
  ) => {
    const id = `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Default options for top-right positioning
    const defaultOptions = {
      position: 'top-right' as const,
      persistent: false,
      autoHideDuration: severity === 'error' ? 8000 : severity === 'warning' ? 6000 : 4000,
    };
    
    const finalOptions = { ...defaultOptions, ...options };
    
    return {
      id,
      message,
      severity,
      ...finalOptions,
      timestamp: Date.now(),
    };
  };
  
  return {
    showSuccess: (message: string, duration?: number) =>
      showAlert(message, 'success', { 
        position: 'top-right', 
        autoHideDuration: duration ?? 4000 
      }),
    
    showWarning: (message: string, duration?: number) =>
      showAlert(message, 'warning', { 
        position: 'top-right', 
        autoHideDuration: duration ?? 6000 
      }),
    
    showError: (message: string, duration?: number) =>
      showAlert(message, 'error', { 
        position: 'top-right', 
        autoHideDuration: duration ?? 8000 
      }),
    
    showInfo: (message: string, duration?: number) =>
      showAlert(message, 'info', { 
        position: 'top-right', 
        autoHideDuration: duration ?? 5000 
      }),
    
    // Generic show alert method
    show: showAlert,
  };
};

export default useTopRightAlert;
