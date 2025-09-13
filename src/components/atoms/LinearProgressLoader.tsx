import React from 'react';
import { LinearProgress, Portal, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface LinearProgressLoaderProps {
  /**
   * Controls whether the loader is visible
   */
  loading: boolean;
  /**
   * Progress value for determinate progress (0-100)
   * If not provided, will show indeterminate progress
   */
  progress?: number;
  /**
   * Color variant of the progress bar
   */
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  /**
   * Height of the progress bar in pixels
   */
  height?: number;
  /**
   * Z-index for positioning above other elements
   */
  zIndex?: number;
  /**
   * Whether to show the loader at the top of the viewport (fixed positioning)
   * or relative to the parent container
   */
  fixed?: boolean;
  /**
   * Custom styles to apply to the container
   */
  sx?: object;
}

const LoaderContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'height' && prop !== 'zIndex' && prop !== 'fixed',
})<{ height: number; zIndex: number; fixed: boolean }>(({ height, zIndex, fixed }) => ({
  position: fixed ? 'fixed' : 'absolute',
  top: '1px',
  left: 0,
  right: 0,
  width: '100%',
  height: `${height}px`,
  zIndex,
  backgroundColor: 'transparent'
}));

const StyledLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== 'height',
})<{ height: number }>(({ theme }) => ({
  height: "6px",
  borderRadius: 0,
  '& .MuiLinearProgress-bar': {
    borderRadius: 0,
    transition: 'transform 0.3s ease-in-out',
  },
  '& .MuiLinearProgress-bar1Indeterminate': {
    animation: 'linear-progress-indeterminate 2s infinite linear',
  },
  '& .MuiLinearProgress-bar2Indeterminate': {
    animation: 'linear-progress-indeterminate2 2s infinite linear',
  },
  '@keyframes linear-progress-indeterminate': {
    '0%': {
      left: '-35%',
      right: '100%',
    },
    '60%': {
      left: '100%',
      right: '-90%',
    },
    '100%': {
      left: '100%',
      right: '-90%',
    },
  },
  '@keyframes linear-progress-indeterminate2': {
    '0%': {
      left: '-200%',
      right: '100%',
    },
    '60%': {
      left: '107%',
      right: '-8%',
    },
    '100%': {
      left: '107%',
      right: '-8%',
    },
  },
  // Enhanced styles for different colors
  '&.MuiLinearProgress-colorPrimary': {
    backgroundColor: `${theme.palette.primary.light}20`,
    '& .MuiLinearProgress-bar': {
      background: `linear-gradient(90deg, #76e2b4, #39ab48)`,
      boxShadow: `0 0 8px ${theme.palette.primary.main}50`,
    },
  },
  '&.MuiLinearProgress-colorSecondary': {
    backgroundColor: `${theme.palette.secondary.light}20`,
    '& .MuiLinearProgress-bar': {
      background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
      boxShadow: `0 0 8px ${theme.palette.secondary.main}50`,
    },
  },
  '&.MuiLinearProgress-colorSuccess': {
    backgroundColor: `${theme.palette.success.light}20`,
    '& .MuiLinearProgress-bar': {
      background: `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
      boxShadow: `0 0 8px ${theme.palette.success.main}50`,
    },
  },
  '&.MuiLinearProgress-colorWarning': {
    backgroundColor: `${theme.palette.warning.light}20`,
    '& .MuiLinearProgress-bar': {
      background: `linear-gradient(90deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
      boxShadow: `0 0 8px ${theme.palette.warning.main}50`,
    },
  },
  '&.MuiLinearProgress-colorError': {
    backgroundColor: `${theme.palette.error.light}20`,
    '& .MuiLinearProgress-bar': {
      background: `linear-gradient(90deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
      boxShadow: `0 0 8px ${theme.palette.error.main}50`,
    },
  },
  '&.MuiLinearProgress-colorInfo': {
    backgroundColor: `${theme.palette.info.light}20`,
    '& .MuiLinearProgress-bar': {
      background: `linear-gradient(90deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
      boxShadow: `0 0 8px ${theme.palette.info.main}50`,
    },
  },
}));

/**
 * LinearProgressLoader Component
 * 
 * A reusable linear progress loader that can be positioned at the top of the AppBar
 * or relative to a container. Provides smooth animations and customizable styling.
 * 
 * Features:
 * - Fixed positioning at top of viewport (below navigation)
 * - Determinate and indeterminate progress modes
 * - Multiple color variants with gradient effects
 * - Configurable height and z-index
 * - Portal rendering for fixed positioning
 * - Responsive design that adapts to navigation height
 * 
 * Usage:
 * ```tsx
 * // Basic indeterminate loader at top of page
 * <LinearProgressLoader loading={isLoading} />
 * 
 * // Determinate progress with custom color
 * <LinearProgressLoader 
 *   loading={isLoading} 
 *   progress={uploadProgress} 
 *   color="success" 
 * />
 * 
 * // Container-relative loader
 * <LinearProgressLoader 
 *   loading={isLoading} 
 *   fixed={false}
 *   height={6}
 * />
 * ```
 */
const LinearProgressLoader: React.FC<LinearProgressLoaderProps> = ({
  loading,
  progress,
  color = 'primary',
  height = 4,
  zIndex = 1301, // Above AppBar (1300) but below Modal (1300+)
  fixed = true,
  sx = {},
}) => {
  // Don't render anything if not loading
  if (!loading) {
    return null;
  }

  const progressBar = (
    <LoaderContainer
      height={height}
      zIndex={zIndex}
      fixed={fixed}
      sx={sx}
    >
      <StyledLinearProgress
        variant={progress !== undefined ? 'determinate' : 'indeterminate'}
        value={progress}
        color={color}
        height={height}
      />
    </LoaderContainer>
  );

  // Use Portal for fixed positioning to ensure it renders at the document root
  if (fixed) {
    return <Portal>{progressBar}</Portal>;
  }

  return progressBar;
};

export default LinearProgressLoader;
